---
name: database-design-optimization
description: Designs schemas and optimizes queries against real access patterns — normalization decisions, indexing from execution plans, migration safety on live tables, and integrity enforced in the database. Use for schema design, slow-query diagnosis, index strategy, or reviewing migrations. Not for engine-specific standards and their version gates when the engine is PostgreSQL (postgres-standards), choosing the overall persistence architecture (system-architecture), application-level caching strategy (performance-engineering), or cross-store consistency (distributed-systems-design).
---

# Database Design and Query Optimization

## Purpose

Deliver schemas and queries where correctness is enforced by the database,
performance conclusions come from execution plans on realistic data, and
every migration is safe to run on a live production table.

## Inputs

- The access patterns: the actual queries (or planned ones) with their
  frequencies and latency needs. Schema design without access patterns is
  guessing — obtain or derive them first.
- The engine and version (advice is engine-specific: MVCC behavior, index
  types, lock semantics differ).
- Data volumes and growth rates — current and projected, or explicit unknown.
- For optimization: the slow query, its `EXPLAIN (ANALYZE)` output (or
  engine equivalent), and table/index definitions. MUST NOT optimize a
  query whose plan you haven't seen.

## Procedure

### Schema design

1. **Model the truth first.** Entities, relationships, cardinalities, and
   the invariants that must never be violated (uniqueness, referential
   integrity, value constraints). Every invariant that the database can
   enforce MUST be enforced in the database (constraints, FKs, checks) —
   application-only enforcement is a race condition with a deadline.
2. **Normalize by default; denormalize by evidence.** Start at 3NF-ish.
   Each denormalization MUST name the query it serves, the write-side
   update cost it creates, and the mechanism keeping the copy consistent.
3. **Choose keys deliberately.** Surrogate vs natural, ID generation
   (sequence vs UUID — note index-locality cost of random UUIDs at scale),
   and which business-level uniqueness rules get real constraints.
4. **Design for the lifecycle:** soft-delete vs hard-delete (and its query
   tax), retention/archival, multi-tenancy isolation strategy, and time
   (UTC storage, timezone at edges, temporal history if audited).

### Query optimization

5. **Reproduce the slowness.** Run the query on realistic volume (dev-sized
   tables lie — plans flip with cardinality). Capture the plan; identify
   the dominant cost node (seq scan on large table, misestimated rows,
   nested-loop explosion, sort spill).
6. **Fix causes in order of leverage:** missing/wrong index (covering,
   composite order matching the predicate+sort, partial for skewed
   predicates) → query shape (N+1s batched, SELECT * trimmed, OR-splits,
   pagination via keyset not OFFSET at depth) → schema (from step 2 rules)
   → engine tuning last, with each change re-measured against the same
   plan. One change at a time; MUST show before/after plans.
7. **Count the index cost.** Every index taxes writes and space; new indexes
   on hot-write tables MUST state the tradeoff, and unused-index candidates
   spotted along the way get reported.

### Migrations

8. **Every migration gets a live-safety review:** lock behavior on the
   target engine/version (table rewrite? blocking index build? — use
   CONCURRENTLY/online DDL where available), backfill strategy for large
   tables (batched, resumable, throttled), and a rollback path. Expand-
   migrate-contract for anything a deployed app version still reads.
   Destructive steps (dropping columns/tables, type narrowing) MUST be
   flagged for human authorization and separated from additive steps.

## Output Format

```markdown
## <Schema design | Query optimization | Migration review>: <subject>
## Access patterns considered (with source)
## Design / Diagnosis
<schema DDL + invariant table, or plan analysis with dominant cost identified>
## Changes recommended
| Change | Evidence (plan/pattern) | Cost/tradeoff | Before→after measurement |
## Migration safety
<lock analysis, backfill plan, rollback, destructive steps flagged>
## Assumptions and open questions
```

## Quality Checklist

- [ ] Access patterns sourced before schema/index decisions.
- [ ] DB-enforceable invariants enforced in the DB.
- [ ] Optimization claims backed by before/after plans on realistic volume.
- [ ] Composite index column order justified by predicates + sort.
- [ ] Index write-cost stated for hot tables.
- [ ] Migrations analyzed for locks, backfill, rollback; destructive steps flagged.

## Failure Conditions

- **Plan-free optimization:** recommending indexes from the query text alone.
- **Dev-volume conclusions:** "it's fast now" on 1k rows.
- **ORM blindness:** tuning SQL while the ORM emits N+1s above it.
- **Constraint outsourcing:** uniqueness "checked in the service layer".
- **Migration optimism:** ALTER TABLE on a 100M-row table at noon.
- **Escalate / stop** when: a migration requires downtime and the window is
  a business decision; data corruption is discovered (integrity violations
  in existing rows — report before constraining); or the access pattern
  fundamentally mismatches the engine (analytical scans on the OLTP store —
  that's an architecture conversation, not an index).

## Related skills

- `postgres-standards` — takes over once the engine is PostgreSQL. This skill
  owns the engine-neutral method (access patterns before design, no tuning
  without a plan, migration review process); that one owns the Postgres-specific
  rules and their version gates — which type, which index type, which lock each
  DDL statement takes, RLS and role hygiene, pooler constraints. Compose in that
  order: decide *an index is needed* here, decide *what it is and how to build
  it safely on this server version* there.
- `performance-engineering` — owns the system-wide latency budget this
  feeds; caching decisions live there.
- `migration-planning` — for multi-phase data/system migrations beyond one
  schema change.
- `distributed-systems-design` — cross-store consistency, sharding.
- `code-implementation` — applies the schema/query changes.
