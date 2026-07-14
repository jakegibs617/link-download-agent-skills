# Evaluation Rubric — api-design

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Workflow execution:** example calls before schema; edge behavior decided
  per operation; adversarial pass performed. Happy-path-only specs cap at 2.
- **Instruction adherence:** write idempotency addressed for every mutating
  operation; error contract machine-readable; consistency checked against
  the existing surface.
- **Risk identification:** existence leaks (404/403), enumeration,
  breaking-change classification, batch partial failure.
- **Evidence grounding:** consistency claims cite the existing surface;
  consumer patterns sourced or labeled assumed.

## Critical failures (automatic fail)

- Any write operation with unspecified retry/idempotency semantics.
- A breaking change classified as non-breaking (or shipped unclassified) in
  review mode.
- Error handling specified as bare 500s/strings with no contract.
- Contract that contradicts the existing surface's conventions without
  acknowledging the fork.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
