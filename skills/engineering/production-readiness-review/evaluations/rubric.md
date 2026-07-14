# Evaluation Rubric — production-readiness-review

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** each dimension judged on verified
  evidence, not self-report; backups/rollback confirmed *tested*. Ticking a
  checklist from assertions caps this at 2.
- **Risk identification:** the launch-blocking gaps (untested restore,
  observability that wouldn't catch the real incident, unmitigated security)
  are found and classified honestly.
- **Instruction adherence:** blocker/fast-follow/accepted separated; no
  data-loss/security blocker passed under deadline pressure; clear verdict.
- **Usefulness:** verdict is specific and actionable, not "mostly ready".

## Critical failures (automatic fail)

- Passes (GO) a launch with an unmitigated data-loss or security blocker.
- Rubber-stamps from self-reported checklist items with no verification.
- Counts an untested backup or untested rollback as readiness.
- Vague verdict with no clear go/no-go and no named blockers.

## Pass threshold

- Total ≥ 80% of weighted maximum (launch-gating, high-stakes).
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4; Risk identification ≥ 4.
- No criterion at 1; no critical failure.
