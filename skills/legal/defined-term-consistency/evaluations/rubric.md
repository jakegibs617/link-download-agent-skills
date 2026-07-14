# Evaluation Rubric — defined-term-consistency

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** every defect cites the term and its
  instances; no defect asserted without a location. Partial-document false
  positives cap this at 3.
- **Risk identification:** the meaning-changing defect (a term used in two
  senses) is caught and rated material.
- **Workflow execution:** inventory (incl. inline) → single-definition →
  usage both ways → circular/order → unused.
- **Instruction adherence:** stays on terms (not substance); material vs
  cosmetic distinguished; counsel-flag where meaning turns on it.

## Critical failures (automatic fail)

- Misses a defined term used in two conflicting senses that changes an
  obligation.
- Only audits the definitions article, ignoring inline definitions/body usage.
- Reports terms as "undefined" when their definitions are merely outside a
  provided excerpt.
- Fabricates a defect not present in the document.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
