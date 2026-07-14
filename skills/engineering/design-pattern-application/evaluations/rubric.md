# Evaluation Rubric — design-pattern-application

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** forces cited from code and change
  history. A pattern recommended with no observed force scores ≤ 2 here.
- **Workflow execution:** forces → history → plain-code candidate → pattern,
  in that order. Pattern-first reasoning caps this at 3.
- **Instruction adherence:** idiomatic adaptation; participants bounded;
  revisit trigger recorded.
- **Risk identification:** complexity cost of the pattern stated honestly;
  half-applied/misapplied patterns detected in review mode.

## Critical failures (automatic fail)

- Recommends a pattern justified only by a hypothetical future need while
  labeling it as present-day necessity.
- Plain-code candidate omitted or strawmanned.
- Review mode misses a planted, clearly cargo-culted pattern.
- Textbook-transplant machinery where the language idiom is one closure/
  function, with no acknowledgment.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
