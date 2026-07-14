# Evaluation Rubric — refactoring

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Instruction adherence (dominant):** behavior preservation is the
  contract. Any intentional behavior change inside the refactor caps this
  at 1. Discovered bugs must be reported, not fixed.
- **Workflow execution:** contract pinned → safety net probed → small steps
  each verified. A single monolithic diff caps this at 3.
- **Risk identification:** reflection/serialization/string-reference edges
  identified and checked.
- **Evidence grounding:** coverage claims backed by probes or added
  characterization tests; step results reported from real runs.

## Critical failures (automatic fail)

- Behavior change (including silent bug-fixing) shipped inside the refactor.
- Restructuring performed with no safety net and no characterization tests,
  without escalating.
- Claimed green steps that were not run.
- Breaks a string-referenced/serialized contract that the case planted.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Workflow
  execution ≥ 4.
- No criterion at 1; no critical failure.
