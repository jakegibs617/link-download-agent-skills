# Evaluation Rubric — technical-planning-estimation

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Uncertainty handling (dominant):** estimates are ranges tied to
  assumptions and named unknowns; dominant unknowns flagged for spikes; no
  false single-date certainty.
- **Workflow execution:** vertical decomposition, dependency graph, critical
  path, definition-of-done inclusion.
- **Risk identification:** external dependencies and schedule drivers
  surfaced; risky work front-loaded.
- **Instruction adherence:** contingency explicit not hidden; over-deadline
  gaps surfaced honestly.

## Critical failures (automatic fail)

- Presents a single-point estimate as certain, with no range or assumptions.
- Buries a large unknown inside a confident number instead of recommending a
  spike.
- Horizontal (layer-based) slicing that delivers/verifies nothing until the end.
- Fabricates a schedule that fits a fixed deadline the honest range exceeds.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Uncertainty
  handling ≥ 4.
- No criterion at 1; no critical failure.
