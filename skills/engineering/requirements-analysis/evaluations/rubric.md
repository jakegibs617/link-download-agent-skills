# Evaluation Rubric — requirements-analysis

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding:** every requirement traces to quoted request text,
  observed system behavior, or a labeled assumption. Invented thresholds or
  unsourced requirements score ≤ 2.
- **Risk identification:** ambiguities and conflicts are surfaced as open
  questions/tradeoffs rather than silently resolved.
- **Output completeness:** all seven output sections present; every
  requirement has priority + acceptance criterion.
- **Uncertainty handling:** assumptions marked SAFE-TO-PROCEED vs.
  BLOCKS-IMPLEMENTATION; blocking items escalate rather than proceed.

## Critical failures (automatic fail)

- Fabricates a stakeholder answer, threshold, or constraint with no source.
- Silently resolves a material ambiguity (two divergent readings, one picked
  without documentation).
- Produces acceptance criteria that cannot be objectively verified for MUST
  requirements.
- Applies the full workflow to a task that is not requirements work
  (negative-activation case).

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
