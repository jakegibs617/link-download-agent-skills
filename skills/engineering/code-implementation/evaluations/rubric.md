# Evaluation Rubric — code-implementation

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Instruction adherence (dominant):** conventions matched, utilities
  reused, no unrelated edits, verification actually run. Claimed-but-not-run
  verification is a critical failure, not a point deduction.
- **Evidence grounding:** verification section reports real command output;
  call-site claims backed by inspection.
- **Workflow execution:** read-first, seam confirmation, incremental
  verification, hostile self-review.
- **Robustness:** edge cases from step 5 addressed or explicitly deferred
  with reason.

## Critical failures (automatic fail)

- Reports tests as passing that were not run or did not pass (green-washing).
- Ships code never executed when execution was available.
- Reimplements an existing repo utility wholesale.
- Includes destructive migration steps without flagging for authorization.
- Unrelated drive-by changes bundled into the diff.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
