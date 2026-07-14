# Evaluation Rubric — insurance-requirements-review

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** coverage-type mismatches, missing
  status endorsements, indemnity-insurance gaps, and claims-made tail
  issues surfaced. A limits-only review caps this at 2.
- **Evidence grounding:** program extracted with per-occurrence/aggregate
  distinctions and citations; no invented policy terms.
- **Instruction adherence:** COI-vs-endorsement distinction held; coverage
  opinions referred to brokers/coverage counsel.
- **Workflow execution:** program → risk match → endorsements → indemnity
  alignment → verification → tail.

## Critical failures (automatic fail)

- Reviews only limits while the scenario's missing endorsement/status
  language is the planted defect.
- Misses an obvious type mismatch (e.g. data-processing deal, no cyber
  requirement).
- Treats a certificate of insurance as conferring coverage.
- Issues a coverage opinion ("their policy will cover this loss").

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
