# Antipattern and Detection Catalog

The audit checklist. Each entry: the symptom, why it bites *on Postgres specifically*, how to
detect it, and the fix. Detection queries are read-only and safe to run against a replica.

Where no connection is available, the "static cue" is what to grep for, and the finding is
reported `UNVERIFIED` with the detection query attached.

> Version gates are stated by major version; confirm against the release notes for the exact
> server version in use.

## Tier 1 — Correctness and integrity

### Foreign key with no `ON DELETE` action
Omitting it means `NO ACTION`, which is a decision nobody made. Deletes on the parent then
fail in production at the worst moment, or — with `CASCADE` chosen carelessly — remove far
more than intended.
**Static cue:** `REFERENCES` with no `ON DELETE`.
**Fix:** state the action explicitly, even when it is `NO ACTION`/`RESTRICT`.

### Unvalidated constraints left `NOT VALID` forever
`NOT VALID` constraints are enforced for new rows but the existing rows were never checked,
so the planner cannot use the constraint and the invariant is not actually true.
```sql
SELECT conrelid::regclass AS table, conname, contype
FROM pg_constraint WHERE NOT convalidated;
```
**Fix:** `ALTER TABLE ... VALIDATE CONSTRAINT ...` (`SHARE UPDATE EXCLUSIVE`, non-blocking).
If it fails, the data violates the invariant — report the violating rows, do not force it.

### `NOT IN` against a subquery that can return NULL
`x NOT IN (SELECT y ...)` returns no rows at all if any `y` is NULL, because `x <> NULL` is
unknown. Silently returns an empty set instead of erroring.
**Static cue:** `NOT IN (SELECT`.
**Fix:** `NOT EXISTS`, which also plans better as an anti-join.

### Nullable columns carrying meaning
Three-valued logic leaks: `WHERE NOT active` excludes NULL rows, `count(col)` skips them,
and `UNIQUE` permits unlimited NULL duplicates (**PG 15+** offers `NULLS NOT DISTINCT` when
that is not what you want).
**Fix:** `NOT NULL DEFAULT`, or model the third state explicitly.

### Uniqueness enforced in application code
Two concurrent requests both read "no existing row" and both insert. Only a `UNIQUE`
constraint prevents this; a check-then-insert is a race with a deadline.
**Fix:** unique index/constraint, and handle `23505` in the application.

### Sequence exhaustion on `int4` keys
```sql
SELECT c.relname, a.attname, pg_get_serial_sequence(c.relname, a.attname)
FROM pg_class c JOIN pg_attribute a ON a.attrelid = c.oid
JOIN pg_type t ON t.oid = a.atttypid
WHERE c.relkind = 'r' AND t.typname = 'int4' AND a.attnum > 0
  AND EXISTS (SELECT 1 FROM pg_index i WHERE i.indrelid = c.oid AND i.indisprimary
              AND a.attnum = ANY(i.indkey));
```
**Fix:** widen to `bigint` — a full rewrite under `ACCESS EXCLUSIVE`, so stage it well before
the ceiling, not after.

## Tier 2 — Concurrency and locking

### Unsafe DDL in migration files
Any statement from the `ACCESS EXCLUSIVE` column of `ddl-lock-safety.md` applied to a large
table with no `lock_timeout`, no `CONCURRENTLY`, and no `NOT VALID` split.
**Static cue in migration files:** `SET NOT NULL`, `ALTER COLUMN ... TYPE`,
`CREATE INDEX` without `CONCURRENTLY`, `ADD CONSTRAINT` without `NOT VALID`, `DROP COLUMN`.
**Fix:** see `ddl-lock-safety.md`. Note that `CREATE INDEX CONCURRENTLY` cannot run inside a
transaction block, which most migration frameworks wrap by default.

### Invalid indexes left behind by a failed concurrent build
They are not used by the planner but *are* maintained on every write.
```sql
SELECT indexrelid::regclass AS index, indrelid::regclass AS table
FROM pg_index WHERE NOT indisvalid;
```
**Fix:** `DROP INDEX CONCURRENTLY`, then rebuild.

### Missing timeouts
Without them one stuck statement or one leaked transaction blocks vacuum database-wide and
fills the lock queue.
```sql
SELECT name, setting FROM pg_settings
WHERE name IN ('statement_timeout','lock_timeout','idle_in_transaction_session_timeout');

SELECT pid, state, now() - xact_start AS open_for, query
FROM pg_stat_activity
WHERE state IN ('idle in transaction','active') AND now() - xact_start > interval '5 min';
```
**Fix:** set them per role or per connection; `lock_timeout` specifically around DDL.

### Unbounded backfill in a single `UPDATE`
Holds row locks for its whole duration, doubles the table through dead tuples, and blocks
`VACUUM` from reclaiming any of it until it commits.
**Fix:** batched, resumable, one transaction per batch (see `ddl-lock-safety.md`).

### Job queue polling with `FOR UPDATE` and no `SKIP LOCKED`
Workers serialise behind each other on the same rows and throughput collapses at concurrency.
**Fix:** `SELECT ... FOR UPDATE SKIP LOCKED LIMIT n`.

### Pooler-incompatible constructs behind pgbouncer transaction mode
Session-level advisory locks (`pg_advisory_lock`), `SET` outside a transaction, `LISTEN` /
`NOTIFY`, temporary tables, and `WITH HOLD` cursors all assume a stable session that
transaction pooling does not provide — the connection is handed to another client between
statements. This is the failure mode that works in every test and breaks only in production.
**Static cue:** those calls in application code plus `pool_mode = transaction` in
`pgbouncer.ini`.
**Fix:** `pg_advisory_xact_lock`, `SET LOCAL`, a polling table instead of `NOTIFY`, or
session pooling for the connections that need it.

### `SERIALIZABLE` or `REPEATABLE READ` with no retry loop
Postgres aborts conflicting transactions with `40001`; the retry is the application's job.
Without it the isolation level converts contention into user-visible errors.
**Fix:** bounded retry with jitter around the whole transaction.

## Tier 3 — Security and tenancy

### RLS enabled but not forced
`ENABLE ROW LEVEL SECURITY` does not apply to the table owner. If the application connects as
the owner — the common default — every policy is silently bypassed.
```sql
SELECT relname FROM pg_class
WHERE relrowsecurity AND NOT relforcerowsecurity AND relkind = 'r';
```
**Fix:** `ALTER TABLE ... FORCE ROW LEVEL SECURITY`, and connect as a non-owner, non-superuser,
non-`BYPASSRLS` role. Verify the role: `SELECT rolname, rolsuper, rolbypassrls FROM pg_roles;`

### Table with RLS policies but RLS never enabled
Policies exist and do nothing.
```sql
SELECT DISTINCT p.tablename FROM pg_policies p
JOIN pg_class c ON c.relname = p.tablename WHERE NOT c.relrowsecurity;
```

### `SECURITY DEFINER` function without a pinned `search_path`
The function runs with the owner's privileges and resolves unqualified names through the
*caller's* `search_path` — a caller who creates a same-named table or operator in a schema
earlier on the path executes their own code as the owner. This is privilege escalation.
```sql
SELECT n.nspname, p.proname, p.proconfig
FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE p.prosecdef AND (p.proconfig IS NULL
  OR NOT EXISTS (SELECT 1 FROM unnest(p.proconfig) c WHERE c LIKE 'search\_path=%'));
```
**Fix:** `SET search_path = pg_catalog, public` (or the minimal set) on the function, and
schema-qualify inside it.

### Broad `PUBLIC` grants
Every role inherits `PUBLIC`. **PG 15+** revoked `CREATE` on the `public` schema by default;
databases created earlier and upgraded in place keep the old permissive grant.
```sql
SELECT nspname, nspacl FROM pg_namespace WHERE nspname NOT LIKE 'pg\_%';
SELECT relname, relacl FROM pg_class WHERE relkind = 'r' AND relacl::text LIKE '%=%';
```
**Fix:** `REVOKE ALL ON SCHEMA public FROM PUBLIC`, grant to named roles, and set
`ALTER DEFAULT PRIVILEGES` so new objects inherit the intent.

### Application connecting as superuser or table owner
Defeats RLS, permits DDL from application code, and makes any SQL injection catastrophic.
**Fix:** a dedicated role with `SELECT/INSERT/UPDATE/DELETE` only on the tables it needs.

## Tier 4 — Structural performance

### Foreign key columns with no index
Postgres indexes the *referenced* side automatically (via the PK/unique constraint) and never
the referencing side. Every parent `DELETE` or key `UPDATE` then sequential-scans the child
table while holding locks, and joins in that direction have no index either.
```sql
SELECT c.conrelid::regclass AS table, a.attname AS column, c.conname
FROM pg_constraint c
JOIN unnest(c.conkey) WITH ORDINALITY AS k(attnum, ord) ON true
JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = k.attnum
WHERE c.contype = 'f'
  AND NOT EXISTS (
    SELECT 1 FROM pg_index i
    WHERE i.indrelid = c.conrelid AND i.indkey[0] = k.attnum AND k.ord = 1)
ORDER BY 1;
```
**Fix:** `CREATE INDEX CONCURRENTLY` on the referencing columns, leading column first.

### Unused and duplicate indexes
```sql
SELECT relname AS table, indexrelname AS index, idx_scan,
       pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes JOIN pg_index USING (indexrelid)
WHERE idx_scan = 0 AND NOT indisunique
ORDER BY pg_relation_size(indexrelid) DESC;
```
Interpret with care: `idx_scan` counts since the last `pg_stat_reset()`, so check
`stats_reset` in `pg_stat_database`, and never drop an index backing a constraint or a
quarterly report on the strength of a week of stats.

### `OFFSET` pagination at depth
`OFFSET 100000` reads and discards 100,000 rows every time. Cost grows linearly with page
number, and rows shift under concurrent writes so users see duplicates and gaps.
**Fix:** keyset pagination — `WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT n`
with a matching composite index.

### Implicit casts that defeat an index
`WHERE user_id = '42'` against a `bigint`, or `WHERE lower(email) = $1` with a plain index on
`email`, or a `text` parameter compared to a `varchar` column under a different collation.
**Detection:** the plan shows a sequential scan or a filter where an index scan was expected.
**Fix:** match the parameter type, or build the matching expression index.

### `SELECT count(*)` treated as free
Postgres has no stored row count; MVCC requires visibility checks, so an exact count is a
full scan (or index-only scan) every time.
**Fix:** `SELECT reltuples::bigint FROM pg_class WHERE relname = ...` for an estimate, a
maintained counter table for an exact one, or bound the count (`count(*) FROM (... LIMIT 1000)`).

### Bloat and stalled autovacuum
```sql
SELECT relname, n_live_tup, n_dead_tup,
       round(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 1) AS dead_pct,
       last_autovacuum, last_autoanalyze
FROM pg_stat_user_tables WHERE n_dead_tup > 10000 ORDER BY n_dead_tup DESC;
```
High dead-tuple percentage with an old `last_autovacuum` usually means a long-running
transaction is holding back the vacuum horizon, not that autovacuum needs tuning. Check
`pg_stat_activity` first. *(Tuning autovacuum itself is out of scope — that is
`production-readiness-review`.)*

### CTE materialization assumptions
Before **PG 12**, every `WITH` clause was an optimisation fence and was materialised.
From PG 12 they are inlined when possible, which changes plans on upgrade — usually for the
better, occasionally not.
**Fix:** be explicit: `WITH x AS MATERIALIZED (...)` or `AS NOT MATERIALIZED (...)` on PG 12+.

## Tier 5 — Conventions

- Consistent, lowercase, unquoted identifiers. A quoted `"MixedCase"` identifier must be
  quoted forever, everywhere.
- Plural or singular table names — consistently; the choice does not matter, the drift does.
- Predictable constraint and index names; migration tools generate awful ones that end up in
  error messages and runbooks.
- Every migration reversible or explicitly marked irreversible.
- Schema separation for logical boundaries (`app`, `audit`, `staging`) rather than table-name
  prefixes.
