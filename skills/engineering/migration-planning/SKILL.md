---
name: migration-planning
description: Plans the execution of a migration — data, platform, service, or dependency — as phased, reversible steps with cutover, rollback, validation, and coexistence handled explicitly. Use when moving data or traffic from one system/schema/platform to another and the how of the transition matters. Not for deciding whether/what to modernize (legacy-system-modernization), the deploy pipeline generally (cicd-release-engineering), or single-schema change mechanics (database-design-optimization).
---

# Migration Planning

## Purpose

Produce a migration runbook where every phase is reversible or explicitly
point-of-no-return, data integrity is verified not assumed, the old and new
systems coexist safely during transition, and cutover and rollback have
concrete, tested criteria — so a high-stakes move becomes a controlled
sequence instead of a leap.

## Inputs

- The source and target (schemas, systems, platforms), the data volume, and
  the consistency/downtime tolerance (zero-downtime changes everything).
- The consumers of the thing being migrated — every reader/writer that must
  keep working across the transition. Missing one is how migrations break
  production.
- The reversibility reality: which steps can be undone, which can't, and
  what data loss (if any) is acceptable.

## Procedure

1. **Inventory dependencies and consumers first.** Everything that reads or
   writes the source: services, jobs, reports, external integrations,
   humans. Each MUST be accounted for in the plan — the forgotten nightly
   job writing to the old schema is the classic failure.
2. **Choose the coexistence strategy.** Almost every safe migration runs old
   and new in parallel for a window: dual-write, change-data-capture,
   read-from-new/fall-back-to-old, or shadow traffic. Decide how the two
   stay consistent during coexistence and how divergence is detected —
   silent drift between systems is the migration's core risk.
3. **Phase it as expand → migrate → contract.** Expand: add the new
   path/schema additively, non-breaking, deployed and dormant. Migrate:
   backfill and move traffic incrementally (by cohort/percentage), validating
   at each step. Contract: remove the old path only after the new one is
   proven and a rollback is no longer needed. Each phase MUST leave a working
   system and, until contract, a rollback path.
4. **Make data migration a first-class, verified activity.** Backfill must
   be batched, resumable, throttled, and idempotent (re-runnable after
   failure). Validation MUST compare source and target (counts,
   checksums/reconciliation, spot-diffs on real records) — "the script
   finished" is not "the data is correct". Plan for records that fail
   migration (a quarantine, not a silent drop).
5. **Define cutover and rollback concretely.** Cutover criteria (what must
   be true to flip), the flip mechanism (flag, routing, DNS — prefer the
   fastest-to-reverse), and a rollback with its own criteria and tested
   procedure. MUST identify the point of no return (usually when the old
   system's data goes stale or is deleted) and treat everything before it as
   reversible, everything after as forward-only.
6. **Rehearse.** Dry-run on production-like data; test the rollback, not just
   the forward path (an untested rollback is a second outage). Where stakes
   are high, migrate a canary cohort first and hold before proceeding.
7. **Plan the human factors:** communication to consumers, the freeze window
   if any, who runs it, who decides go/no-go at each gate, and the
   observability to watch during the move (deploy markers, divergence
   metrics, error rates).
8. **State abort criteria per phase** — the signals that stop the migration
   and trigger rollback or pause.

## Output Format

```markdown
# Migration plan: <source> → <target>
## Consumers/dependencies inventory (each addressed)
## Coexistence strategy (dual-write/CDC/shadow) + divergence detection
## Phases: expand → migrate → contract
| Phase | Steps | Reversible? | Validation | Gate to proceed |
## Data migration: backfill (batched/resumable/idempotent) + reconciliation + failed-record handling
## Cutover: criteria, mechanism, point-of-no-return
## Rollback: criteria, procedure, tested?
## Rehearsal plan (dry-run, canary cohort)
## Human factors (comms, freeze, decision owners)
## Abort criteria per phase
```

## Quality Checklist

- [ ] Every consumer/reader/writer of the source inventoried and handled.
- [ ] Coexistence strategy chosen with divergence detection.
- [ ] Expand-migrate-contract phasing; each phase leaves a working system.
- [ ] Backfill batched/resumable/idempotent; source↔target reconciliation defined.
- [ ] Failed-record handling planned (quarantine, not silent drop).
- [ ] Cutover + rollback criteria concrete; point of no return identified.
- [ ] Rollback procedure tested, not just the forward path.
- [ ] Per-phase abort criteria stated.

## Failure Conditions

- **Consumer blindness:** the unmigrated job/integration still hitting the
  old system after cutover.
- **Big-bang flip:** all-at-once cutover with no incremental validation or
  coexistence.
- **Verify-by-completion:** trusting that the backfill finished = data is
  correct, with no reconciliation.
- **Untested rollback:** a rollback plan that's never been run, discovered
  broken mid-incident.
- **Silent drift:** dual-write/coexistence with no divergence detection.
- **Point-of-no-return denial:** treating an irreversible step as reversible.
- **Escalate / stop** when: zero-downtime is required but a step
  fundamentally needs a window (surface the conflict for a business
  decision); reconciliation reveals the source data is already corrupt
  (stop; fix before migrating corruption); or a consumer can't be migrated
  in time and would break at cutover (the plan isn't ready — say so).

## Related skills

- `legacy-system-modernization` — decides what/whether to migrate; this
  plans the how.
- `database-design-optimization` — single-schema change mechanics and
  lock-safe DDL.
- `cicd-release-engineering` — the deploy/rollback machinery cutover uses.
- `engineering-risk-analysis` — risk deep-dive on the migration.
