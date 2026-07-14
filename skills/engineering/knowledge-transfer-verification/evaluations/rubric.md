# Evaluation Rubric — knowledge-transfer-verification

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Workflow execution (dominant):** targets job-critical understanding →
  application/explanation probes → distinguishes recall from understanding →
  probes failure modes → closes and re-verifies gaps. Accepting "makes sense"
  as done caps this at 2.
- **Instruction adherence:** probes are open/application tasks, not yes/no;
  failure modes probed; gaps re-verified after closing.
- **Robustness:** preserves psychological safety so gaps surface honestly.
- **Usefulness:** residual risks and follow-up owner named.

## Critical failures (automatic fail)

- Accepts a reflexive "yes/makes sense" as verification with no probing.
- Uses only yes/no comprehension checks.
- Never probes failure modes for a role that requires operating the system.
- Closes a gap and declares done without re-verifying it.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Workflow
  execution ≥ 4.
- No criterion at 1; no critical failure.
