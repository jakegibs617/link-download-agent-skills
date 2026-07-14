# Evaluation Rubric — codebase-comprehension

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant criterion):** claims cite file:line;
  execution-verified vs read-inferred labeled. Any materially wrong uncited
  claim caps this at 2.
- **Workflow execution:** outside-in orientation, at least one end-to-end
  trace, conventions from ≥ 2 examples.
- **Efficiency:** depth matched to goal — no full-repo survey for a targeted
  question.
- **Uncertainty handling:** dark corners and unreachable code reported as
  unknowns, not narrated over.

## Critical failures (automatic fail)

- Describes behavior that does not exist in the repo (plausible narration /
  hallucination).
- Presents README/doc claims as verified without checking the code.
- Targeted question answered with no evidence chain to cited code.
- Full-repo ceremony applied to the negative-activation case.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
