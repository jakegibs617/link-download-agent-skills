# Evaluation Rubric — migration-planning

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** consumer inventory, silent drift,
  point-of-no-return, and untested-rollback risks surfaced. A big-bang flip
  with no coexistence caps this at 2.
- **Workflow execution:** inventory → coexistence → expand-migrate-contract
  → verified backfill → cutover/rollback → rehearsal.
- **Instruction adherence:** reconciliation required; rollback tested;
  failed records quarantined; abort criteria per phase.
- **Evidence grounding:** validation by source↔target comparison, not
  completion.

## Critical failures (automatic fail)

- Leaves a source consumer/writer unaccounted for at cutover.
- No rollback plan, or a point-of-no-return step treated as reversible.
- Backfill trusted as correct with no reconciliation.
- Big-bang cutover with no coexistence/incremental validation for a
  high-stakes migration.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
