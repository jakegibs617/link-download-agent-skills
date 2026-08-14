# DDL Lock Safety

What each statement locks, what that lock blocks, and the safe rewrite. Read this before
recommending any DDL against a table with live traffic.

> **Version gates are stated by major version.** Confirm against the release notes for the
> exact server version in use before relying on a gate — minor versions and vendor forks
> (RDS, Aurora, Cloud SQL, CockroachDB-compatible layers) diverge.

## The lock levels that matter

| Lock | Blocks | Taken by |
|---|---|---|
| `ACCESS EXCLUSIVE` | Everything, including `SELECT` | Most `ALTER TABLE` forms, `DROP TABLE`, `TRUNCATE`, `VACUUM FULL`, `CLUSTER`, non-concurrent `REINDEX` |
| `SHARE ROW EXCLUSIVE` | Writes; reads proceed | `ADD FOREIGN KEY`, `CREATE TRIGGER` |
| `SHARE` | Writes; reads proceed | `CREATE INDEX` (non-concurrent) |
| `SHARE UPDATE EXCLUSIVE` | Other DDL and `VACUUM`; reads and writes proceed | `CREATE INDEX CONCURRENTLY`, `VALIDATE CONSTRAINT`, `ANALYZE`, `ALTER TABLE SET (fillfactor)` |
| `ROW EXCLUSIVE` | Nothing that matters here | Ordinary `INSERT`/`UPDATE`/`DELETE` |

**The queue is the real hazard.** A pending `ACCESS EXCLUSIVE` request waits behind any
open transaction holding a conflicting lock — including a long-running `SELECT` or an
`idle in transaction` session — and every query arriving after it queues behind *it*. A
"one second" `ALTER TABLE` becomes a full outage this way, and the table it took down was
not the one being altered. Always:

```sql
SET lock_timeout = '3s';
ALTER TABLE orders ADD COLUMN status text;   -- retry in a loop on 55P03 (lock_not_available)
```

Fail fast and retry rather than joining the queue.

## Statement reference

| Statement | Lock | Rewrites table? | Notes and version gate |
|---|---|---|---|
| `ADD COLUMN` (no default) | `ACCESS EXCLUSIVE` | No | Brief catalog-only change; still queues. |
| `ADD COLUMN ... DEFAULT <constant>` | `ACCESS EXCLUSIVE` | No, **PG 11+** | PG 11 stores the default in the catalog. On PG 10 and earlier this rewrites the whole table — add the column, backfill in batches, then `SET DEFAULT`. |
| `ADD COLUMN ... DEFAULT <volatile fn>` | `ACCESS EXCLUSIVE` | **Yes**, every version | `now()`, `random()`, `gen_random_uuid()` force a rewrite. Split into add → batched backfill → `SET DEFAULT`. |
| `ADD COLUMN ... NOT NULL` (no default) | `ACCESS EXCLUSIVE` | No | Fails outright on a non-empty table. Use the `SET NOT NULL` route below. |
| `DROP COLUMN` | `ACCESS EXCLUSIVE` | No | Catalog-only; the space is not reclaimed until the rows are rewritten. **Destructive** — requires explicit authorization and expand/contract staging. |
| `SET NOT NULL` | `ACCESS EXCLUSIVE` | No, but **full scan** | **PG 12+**: add `CHECK (col IS NOT NULL) NOT VALID`, `VALIDATE CONSTRAINT` (`SHARE UPDATE EXCLUSIVE`, no blocking), then `SET NOT NULL` — the planner uses the valid CHECK and skips the scan. On PG 11 and earlier there is no shortcut; the scan holds `ACCESS EXCLUSIVE` throughout. |
| `DROP NOT NULL` | `ACCESS EXCLUSIVE` | No | Instant. |
| `SET DEFAULT` / `DROP DEFAULT` | `ACCESS EXCLUSIVE` | No | Instant, catalog-only. |
| `ALTER COLUMN TYPE` | `ACCESS EXCLUSIVE` | **Usually yes** | No rewrite for binary-coercible changes: `varchar(n)` → `varchar(m>n)` or → `text`, `numeric` precision increases. **PG 12+**: `timestamp` → `timestamptz` avoids the rewrite only when the session `TimeZone` is UTC. Everything else — including any narrowing — rewrites and takes the table out for the duration. Narrowing is **destructive**. |
| `ADD CONSTRAINT ... CHECK` | `ACCESS EXCLUSIVE` | No, but **full scan** | Add `NOT VALID` first (instant, still enforced for new rows), then `VALIDATE CONSTRAINT` under `SHARE UPDATE EXCLUSIVE`. |
| `ADD CONSTRAINT ... FOREIGN KEY` | `SHARE ROW EXCLUSIVE` on **both** tables | No, but **full scan** | Blocks writes on the referenced table too — easy to miss when that table is hot. Same `NOT VALID` → `VALIDATE` split applies. |
| `VALIDATE CONSTRAINT` | `SHARE UPDATE EXCLUSIVE` | No | Reads and writes proceed. This is the whole point of `NOT VALID`. |
| `ADD PRIMARY KEY` | `ACCESS EXCLUSIVE` | No | Build the unique index `CONCURRENTLY` first, then `ADD PRIMARY KEY USING INDEX` — the `ACCESS EXCLUSIVE` window shrinks to a catalog update. |
| `CREATE INDEX` | `SHARE` | No | Blocks all writes for the build. Never correct on a live table. |
| `CREATE INDEX CONCURRENTLY` | `SHARE UPDATE EXCLUSIVE` | No | Two table passes, slower, **cannot run inside a transaction block** (breaks migration tools that wrap everything). On failure it leaves an `INVALID` index that keeps taxing writes — `DROP INDEX CONCURRENTLY` it and retry. Check `pg_index.indisvalid` afterwards. |
| `DROP INDEX` | `ACCESS EXCLUSIVE` | No | Use `DROP INDEX CONCURRENTLY`. **Destructive** and hard to undo quickly — rebuilding takes as long as the original build. |
| `REINDEX` | `ACCESS EXCLUSIVE` | Rebuilds index | **PG 12+**: `REINDEX CONCURRENTLY` takes `SHARE UPDATE EXCLUSIVE` instead. |
| `TRUNCATE` | `ACCESS EXCLUSIVE` | Yes | **Destructive.** Not `DELETE`; not MVCC-friendly for concurrent readers. |
| `CREATE TRIGGER` | `SHARE ROW EXCLUSIVE` | No | Blocks writes. |
| `ATTACH PARTITION` | `SHARE UPDATE EXCLUSIVE` on parent, **PG 12+** | No | PG 11 took `ACCESS EXCLUSIVE` on the parent. A matching `CHECK` constraint on the partition lets Postgres skip the validation scan. |
| `DETACH PARTITION` | `ACCESS EXCLUSIVE` | No | **PG 14+**: `DETACH PARTITION ... CONCURRENTLY` avoids it. |
| `VACUUM FULL` / `CLUSTER` | `ACCESS EXCLUSIVE` | Yes | Never on a live table. Use `pg_repack`-style online rewrites or partition rotation. |

## Expand → migrate → contract

Any change a currently deployed application version still reads or writes MUST be staged:

1. **Expand** — add the new column/table/index alongside the old. Additive only; safe to
   deploy and safe to roll back.
2. **Migrate** — dual-write from the application, backfill existing rows in batches
   (bounded by primary key, resumable, throttled, each batch its own transaction), then
   switch reads.
3. **Contract** — drop the old structure, in a *separate* deploy, only after no running
   version references it. This step is destructive and needs explicit authorization.

Batched backfill shape:

```sql
-- repeat until zero rows affected; each iteration commits
WITH batch AS (
  SELECT id FROM orders WHERE status IS NULL ORDER BY id LIMIT 5000 FOR UPDATE SKIP LOCKED
)
UPDATE orders o SET status = 'legacy' FROM batch WHERE o.id = batch.id;
```

A single unbounded `UPDATE` over a large table holds row locks for its whole duration,
bloats the table by rewriting every row version, and blocks `VACUUM` from reclaiming
anything until it commits.

## Long transactions block more than you think

An open transaction — including an idle one holding a snapshot — prevents `VACUUM` from
removing dead tuples newer than its snapshot, across the whole database. Bloat accumulates,
plans degrade, and any queued `ACCESS EXCLUSIVE` request waits behind it. Every application
connection should set:

```sql
SET statement_timeout = '30s';
SET idle_in_transaction_session_timeout = '60s';
```

Their absence is a Tier 2 audit finding on its own.
