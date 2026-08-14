---
name: postgres-standards
description: Applies PostgreSQL-specific standards when designing SQL and audits existing SQL against them — type and index selection, constraints the engine enforces, DDL lock levels and migration safety, RLS and role/search_path hygiene, isolation and locking idioms, and the constraints a transaction-mode pooler imposes. Every rule is stated with its server-version gate and every proposed fix with its own lock cost. Use for Postgres schema design, DDL and migration review, SQL or schema audits, psql/EXPLAIN investigation, RLS and multi-tenancy decisions, or pgbouncer-related breakage. Not for engine-neutral method — deriving access patterns, plan-driven query tuning, migration process (database-design-optimization), system-wide latency budgets and caching (performance-engineering), or server tuning, replication, and backups (production-readiness-review).
---

# PostgreSQL Standards

## Purpose

Produce Postgres SQL that is correct *on Postgres*, and find the places where existing SQL
is not.

**Governing principle: a Postgres rule is not a standard until it carries its version gate
and its lock cost.** Advice that is correct on PG 16 can be an outage on PG 11, and every
DDL recommendation is also a lock request that queues in front of live traffic. Generic SQL
advice — `varchar(255)`, `timestamp` without time zone, `float` for money, `serial` keys, a
foreign key with no index, a bare `SET NOT NULL` on a large table — reads correct, passes
review, and fails in production. That plausibility is the whole risk this skill exists to
manage.

## Inputs

- **Server major version.** Obtain it before any version-sensitive claim: `SELECT version()`,
  or the image tag in `docker-compose.yml` / Dockerfile / CI config / Terraform, or ask. If it
  cannot be obtained, state the assumed version in the output and mark every gated rule as
  conditional. MUST NOT state a gated rule with no version named.
- **Mode:** design (authoring new DDL/SQL) or audit (reviewing what exists). Both are below.
- **Workload shape:** OLTP, analytics, job queue, or multi-tenant. Each changes the right
  answer on keys, indexes, and isolation.
- **Pooler and its mode.** pgbouncer in transaction mode forbids session-level advisory
  locks, `SET` outside a transaction, `LISTEN/NOTIFY`, and unnamed-protocol prepared
  statements below server-side support. A design that is correct direct-to-Postgres can break
  only behind the pooler.
- **Volumes** for any table a migration touches, or explicit unknown. "Small enough to lock"
  is a number, not a feeling.
- **Connection availability** — whether `psql` (or equivalent) can reach a representative
  database. Everything still works without one; findings are labelled differently.

## References

Load the one the current step needs; do not read all three up front.

- [references/ddl-lock-safety.md](references/ddl-lock-safety.md) — statement → lock level →
  what it blocks → safe rewrite, with version gates. Read before recommending any DDL.
- [references/types-and-indexes.md](references/types-and-indexes.md) — type selection and
  index-type selection tables. Read during design step 2 and audit tier 1.
- [references/antipatterns.md](references/antipatterns.md) — the audit catalog: symptom, why
  it bites on Postgres, the detection query or static cue, and the fix. Read during audits.

## Design mode

Work in this order; each step's decisions constrain the next.

1. **Invariants first.** List what must never be true, then enforce every DB-enforceable one
   in the DB: `FOREIGN KEY` (with an explicit `ON DELETE` action — omitting it means
   `NO ACTION`, which is a decision made by default), `UNIQUE`, `CHECK`, `EXCLUDE` for
   overlap rules (ranges, scheduling), `DEFERRABLE` only where a real cycle requires it.
   Application-only enforcement of a uniqueness rule is a race condition with a deadline.
2. **Types**, from `references/types-and-indexes.md`. The defaults that survive review:
   `text` over `varchar(n)` unless a real limit exists, `timestamptz` always, `numeric` for
   money, `jsonb` only for genuinely open-ended attributes, `identity` over `serial`,
   `boolean` over nullable flags. Name what each choice costs.
3. **Keys and identity.** Surrogate vs natural; sequence/identity vs UUID. If UUID, state
   the index-locality consequence — random v4 keys scatter B-tree inserts and inflate WAL —
   and prefer a time-ordered UUID (v7; built in as `uuidv7()` on PG 18+, otherwise an
   extension or application-side generator).
4. **Access control and tenancy.** Schema and role layout, `GRANT`s scoped to a role not to
   `PUBLIC`, `search_path` pinned on every `SECURITY DEFINER` function, and an explicit
   decision on row-level security: if RLS is the tenancy boundary it MUST be `ENABLE` **and**
   `FORCE ROW LEVEL SECURITY`, and the application MUST NOT connect as the table owner or a
   `BYPASSRLS` role. If application-level filtering is the boundary instead, say so
   explicitly — an unstated choice here is how tenants read each other's rows.
5. **Concurrency.** Isolation level, and if `REPEATABLE READ` or `SERIALIZABLE`, the
   serialization-failure (`40001`) retry loop is part of the design, not an operational
   detail. Job queues use `FOR UPDATE SKIP LOCKED`. Advisory locks: transaction-scoped
   (`pg_advisory_xact_lock`) unless the pooler mode permits session scope.
6. **Migration shape.** Expand → migrate → contract for anything a deployed application
   version still reads. Wrap DDL in a `lock_timeout` and retry; add constraints `NOT VALID`
   then `VALIDATE`; build indexes `CONCURRENTLY`; backfill in batches with a resumable
   cursor. Check every statement against `references/ddl-lock-safety.md` before proposing it.

## Audit mode

Findings are reported in severity tiers so a naming nit never buries a security hole.

1. **Inventory and evidence.** State what is being audited (schema dump, migration files,
   ORM models, live database) and which evidence is available. This determines how every
   finding is labelled.
2. **Sweep the tiers in order**, using `references/antipatterns.md`:
   - **Tier 1 — Correctness and integrity:** missing constraints, wrong types, nullable
     columns that carry meaning, FK actions, `NOT IN` with NULLs, unvalidated constraints.
   - **Tier 2 — Concurrency and locking:** unsafe DDL in migration files, long transactions,
     lock ordering, missing `statement_timeout` / `idle_in_transaction_session_timeout`,
     pooler-incompatible constructs.
   - **Tier 3 — Security and tenancy:** RLS enabled but not forced, table-owner or
     `BYPASSRLS` connections, `SECURITY DEFINER` without `SET search_path`, `PUBLIC` grants,
     secrets or PII in columns with no access control.
   - **Tier 4 — Structural performance:** un-indexed FK columns, wrong index type, redundant
     or unused indexes, invalid indexes, `OFFSET` pagination at depth, implicit casts that
     defeat an index, sequence exhaustion on `int4` keys.
   - **Tier 5 — Conventions:** naming, schema organisation, migration file hygiene.
3. **Ground each finding.**
   - With a connection: run the read-only detection query from the reference and quote its
     output. Plans come from `EXPLAIN (ANALYZE, BUFFERS)` on realistic volume.
   - Without one: mark the finding `UNVERIFIED` and give the query that would confirm it.
   - MUST NOT present an `EXPLAIN` plan, catalog row, or row count that was not actually
     produced. Fabricated evidence is worse than no evidence, because it survives review.
4. **Every finding gets a fix, and every fix gets its own lock cost.** A remediation that
   would itself take `ACCESS EXCLUSIVE` on a 200M-row table is not a fix until it is staged.

## Output Format

**Design:**

```markdown
## Postgres design: <subject>
**Server version:** <version — or assumed, and why> · **Workload:** <shape> · **Pooler:** <mode or none>

### DDL
<the SQL, with constraints inline>

### Decisions
| Decision | Choice | Postgres-specific reason (+ version gate) | Cost accepted |

### Access control and tenancy
<roles, grants, RLS decision stated explicitly either way>

### Migration plan
<ordered statements, each with its lock level and a lock_timeout/retry wrapper>

### Assumptions and open questions
```

**Audit:**

```markdown
## Postgres audit: <subject>
**Server version:** <version or assumed> · **Evidence:** <live connection | files only> · **Scope:** <what was read>

| Finding | Severity | Evidence | Postgres-specific reason (+ version gate) | Fix | Lock cost of the fix |

### Assumptions and unverified findings
<every UNVERIFIED finding, with the query that would confirm it>
```

Severity: **Blocking** (data loss, corruption, outage, or security hole) · **High** ·
**Medium** · **Nit**. Order the table by severity, always.

## Quality Checklist

- [ ] Server version established, or the assumption stated and gated rules marked.
- [ ] Every version-gated claim names its version.
- [ ] Every DDL recommendation names its lock level and what that lock blocks.
- [ ] Every proposed fix states the lock cost of the fix itself.
- [ ] Type choices justified against `references/types-and-indexes.md`, not habit.
- [ ] Every FK has an explicit `ON DELETE` action and an index on the referencing columns.
- [ ] Tenancy boundary stated explicitly — RLS forced, or application filtering, named either way.
- [ ] No `EXPLAIN` output, catalog row, or count presented that was not actually run.
- [ ] Unverified findings labelled `UNVERIFIED` with the confirming query given.
- [ ] Findings ordered by severity; Tier 1–3 swept before conventions are mentioned.

## Failure Conditions

Each carries its recognition cue — the observable signal the failure has already happened.

- **Version-blind advice.** A gated rule stated flatly. *Recognition:* the output says
  "`SET NOT NULL` is safe now" or "just use `uuidv7()`" with no version anywhere in it.
- **Generic SQL in Postgres clothing.** *Recognition:* `varchar(255)` appears; `datetime`,
  `AUTO_INCREMENT`, or `utf8mb4` thinking leaks in; `SELECT count(*)` is costed as free.
- **Fabricated evidence.** *Recognition:* a plan with node costs, or a row count, that no
  command in the transcript produced. Automatic failure.
- **Lock-blind DDL.** *Recognition:* a migration is recommended and the words "lock",
  "blocks", or "CONCURRENTLY" appear nowhere near a large table.
- **Style-only audit.** *Recognition:* the report leads with naming conventions while an
  un-indexed FK, an unforced RLS policy, or a `SECURITY DEFINER` function with an unpinned
  `search_path` went unmentioned.
- **Unstaged remediation.** *Recognition:* the fix column says "change the column type" with
  no note that it rewrites the table.
- **Escalate / stop** when: existing rows violate a constraint about to be added (report the
  violating rows before constraining — a failed `VALIDATE` at 3am is the alternative); the
  only safe fix requires downtime (that is a business decision, not a technical one);
  suspected data corruption; or a discovered RLS bypass, over-broad grant, or exposed
  superuser connection string — report it before changing anything else.

## Related skills

- `database-design-optimization` — owns the **engine-neutral method**: sourcing access
  patterns before designing, refusing to tune a query without its plan, the migration review
  process, index write-cost tradeoffs. This skill owns the **Postgres-specific rules and
  their version gates**. They compose in that order: that skill decides *an index is needed
  here*; this one decides it is a partial GIN, built `CONCURRENTLY`, and that the idiom
  requires PG 12+.
- `performance-engineering` — owns the system-wide latency budget and caching strategy that
  a query fix feeds into.
- `migration-planning` — for multi-phase data or system migrations larger than one schema
  change.
- `security-engineering` — owns the threat model; this skill owns its enforcement in
  `GRANT`s, roles, and RLS policies.
- `production-readiness-review` / `observability-incident-response` — server configuration,
  autovacuum tuning, replication, backup and PITR, pooler deployment. Out of scope here.
- `code-implementation` — applies the resulting schema and query changes.

## Measuring this skill

`evaluations/` holds the activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. The characteristic failure is **plausible generic-SQL advice**:
output that is well-organised, confident, and wrong only in the Postgres-specific particulars
a reader would have to already know to catch. Reading a single response cannot detect it, so
the suite scores the audit case by **seeded-defect recall** against a fixture with a known
defect list (`evals/fixtures/`), paired with a false-positive count — finding nine of ten
defects while inventing three that are not there is not a passing audit.
