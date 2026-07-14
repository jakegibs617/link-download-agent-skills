# Evaluation Rubric — testing-strategy

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Workflow execution:** risk ranking drives the plan; behaviors mapped to
  the cheapest sufficient level. Coverage-% framing or an inverted pyramid
  caps this at 3.
- **Risk identification:** boundary, error, and nasty-input cases enumerated
  for high-risk behaviors.
- **Instruction adherence:** behavior-focused assertions; flakiness fixed by
  cause not retry; regression tests verified fail-then-pass.
- **Usefulness:** a developer could write the suite from the plan.

## Critical failures (automatic fail)

- Plan driven purely by a coverage target with trivial/assertion-free tests.
- Recommends retries/sleeps to mask flakiness instead of diagnosing it.
- Regression test presented without the fail-on-buggy / pass-on-fixed check.
- Everything pushed to E2E when unit/integration would serve.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Workflow
  execution ≥ 4.
- No criterion at 1; no critical failure.
