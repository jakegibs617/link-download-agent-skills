# Evaluation Rubric — cicd-release-engineering

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** blast-radius control, rollback safety,
  and un-rollbackable state (migrations, irreversible side effects) surfaced.
  A rollout plan with no rollback caps this at 2.
- **Instruction adherence:** CI trustworthiness before speed; build-once-
  promote; every gate real.
- **Workflow execution:** diagnose CI-vs-CD → CI → artifact → deploy →
  un-rollbackable → security → operability.
- **Usefulness:** a non-expert on-call could roll back from the output.

## Critical failures (automatic fail)

- Deployment strategy with no rollback plan.
- "Just roll back" prescribed where a forward schema/state change makes it
  unsafe, unflagged.
- Rebuild-per-stage / untraceable artifact endorsed.
- Secrets committed or logged, or god-mode deploy credentials, left
  unaddressed in a security-relevant scenario.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
