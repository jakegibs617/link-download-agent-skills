# Running these evaluations

This skill uses the library-wide evaluation process. See
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md) for the full method.

Quick run:

1. **Baseline:** For each case in `evals.json`, run a fresh agent session *without* this
   skill installed. Provide only the case `query`, `files`, and `setup`. Save the full
   response and score it with `rubric.md`.
2. **Skill-enabled:** Repeat each case in a fresh session *with* the skill installed. Use
   identical inputs. Record whether the skill activated and which reference files were read.
3. **Compare:** Report per-case baseline score, skill score, delta, corrected failures, new
   failures, and activation correctness.
4. **Aggregate:** Compute activation precision/recall, negative-activation accuracy, average
   improvement, and pass rate as defined in the evaluation guide.
5. **Iterate:** For each failing case, classify the failure, make the smallest fix to the
   skill, re-run the failed case plus at least one previously passing case, then re-run the
   full suite before releasing a new version.

## Score audits by defect recall, not by reading

The characteristic failure of a Postgres reviewer is a report that reads well and misses the
things only a Postgres specialist would catch. Reading the response and judging its quality
reproduces exactly the blind spot being tested. Use the defect key below: count found,
count missed, count invented. The mechanics are in `rubric.md`.

## Fixture

`typical-002` audits `evals/fixtures/fixture-01-orders-schema/` — `schema.sql` plus
`migrations/0007_add_status.sql`, presented as a 240-million-row production `orders` table on
PostgreSQL 15, with no database connection available.

**Do not paste this key into the session under test, and never into `SKILL.md`.** It exists
for the scorer.

### Defect key — `schema.sql`

**Tier 1 — correctness and integrity**

| # | Defect | Expected severity |
|---|---|---|
| 1 | `serial` primary keys on all four tables; should be `GENERATED ALWAYS AS IDENTITY` | High |
| 2 | `int4` primary key on `orders` and `order_lines` — sequence exhaustion at 2.1B, fixable only by a full rewrite | High |
| 3 | `varchar(255)` on `name`, `email`, `full_name`, `sku` | Medium |
| 4 | `timestamp` without time zone on `tenants.created_at`, `customers.created_at`, `orders.placed_at` | High |
| 5 | `float8` for `orders.total` and `order_lines.unit_price` | Blocking (money cannot be represented exactly) |
| 6 | `json` rather than `jsonb` for `orders.metadata` | Medium |
| 7 | Four foreign keys with no explicit `ON DELETE` action | Medium |
| 8 | `customers_email_idx` is globally unique, so two tenants cannot share a customer email address | High |
| 9 | `char(3)` for `currency` — blank-padded, no upside over `text` | Nit |

**Tier 3 — security and tenancy**

| # | Defect | Expected severity |
|---|---|---|
| 10 | RLS enabled on `orders` but not `FORCE`d — bypassed entirely if the application connects as the table owner | Blocking |
| 11 | No RLS on `customers`, `order_lines`, or `tenants`; tenant data is reachable through them | Blocking |
| 12 | `recalculate_order_total` is `SECURITY DEFINER` with no `SET search_path` — privilege escalation via a caller-controlled path | Blocking |
| 13 | `GRANT ALL ON ALL TABLES IN SCHEMA public TO PUBLIC` | Blocking |
| 14 | Policy uses one-argument `current_setting('app.tenant_id')`, which raises rather than returning no rows when the GUC is unset | Medium |

**Tier 4 — structural performance**

| # | Defect | Expected severity |
|---|---|---|
| 15 | No index on any foreign key referencing column: `customers.tenant_id`, `orders.tenant_id`, `orders.customer_id`, `order_lines.order_id` | High |
| 16 | Tenant-scoped queries have no `(tenant_id, ...)` leading index; `orders_placed_at_idx` does not serve them | Medium |

### Defect key — `migrations/0007_add_status.sql`

**Tier 2 — concurrency and locking**

| # | Defect | Expected severity |
|---|---|---|
| 17 | The entire migration runs in one transaction, holding `ACCESS EXCLUSIVE` on `orders` across a 240M-row `UPDATE` — an outage, not a migration | Blocking |
| 18 | Unbounded `UPDATE` over 240M rows: row locks held throughout, table doubled by dead tuples, `VACUUM` blocked until commit | Blocking |
| 19 | Bare `ALTER COLUMN status SET NOT NULL` — `ACCESS EXCLUSIVE` plus a full scan; on PG 15 the `CHECK ... NOT VALID` → `VALIDATE` → `SET NOT NULL` route avoids the scan | Blocking |
| 20 | `CREATE INDEX` without `CONCURRENTLY` takes `SHARE` and blocks all writes for the whole build | Blocking |
| 21 | `CREATE INDEX CONCURRENTLY` cannot run inside a transaction block, so the fix requires restructuring the migration, not just adding a keyword | High |
| 22 | `ADD CONSTRAINT ... CHECK` without `NOT VALID` — `ACCESS EXCLUSIVE` plus a full scan on `order_lines`, and it fails outright if any existing row violates it | High |
| 23 | No `lock_timeout` anywhere; every `ALTER` queues behind open transactions and blocks all traffic arriving after it | High |
| 24 | `status` added as `varchar(255)` free text with no `CHECK` or lookup table | Medium |

Note: `ADD COLUMN ... DEFAULT 'pending'` is a **non-defect** on PostgreSQL 11+ — the constant
default is stored in the catalog and does not rewrite the table. A report that flags it as a
rewrite on PG 15 is a **false positive** and costs a point on `evidence_grounding`. This is
the deliberate trap for version-blind pattern matching.

### Recall thresholds

- Tier 1–3 defects (items 1–14, 17–23): **≥ 70%** found, or `output_completeness` caps at 2.
- All four Blocking security items (10–13) must be found, or `security-001`-equivalent
  scoring applies: the case fails.
- False positives are counted separately and are not offset by recall.

## Validating the package

```bash
python3 skills/scripts/validate_skill.py skills/engineering/postgres-standards
```
