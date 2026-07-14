# Evaluation Rubric — developer-experience-improvement

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** friction measured (time × frequency ×
  devs) before prescribing; improvement re-measured. Taste-driven,
  unmeasured DX caps this at 2.
- **Workflow execution:** measure → rank by total tax → root cause →
  leverage-ordered fixes → re-measure.
- **Instruction adherence:** elimination/defaults preferred over docs;
  escape hatch preserved.
- **Risk identification:** new friction from the fix, golden-cage lockout
  considered.

## Critical failures (automatic fail)

- Prescribes tooling/process changes with no friction measurement.
- Ranks a rare dramatic pain over a far larger aggregate small tax.
- Recommends a golden path that blocks legitimate uncommon workflows without
  an escape hatch.
- Claims improvement with no before/after evidence.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
