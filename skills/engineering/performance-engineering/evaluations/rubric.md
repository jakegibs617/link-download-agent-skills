# Evaluation Rubric — performance-engineering

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** profile named the target before
  changes; every kept change has a measured delta beyond baseline variance.
  Unprofiled optimization caps this at 2.
- **Workflow execution:** quantify → baseline → profile → leverage-ordered
  fixes → one-change-one-measurement.
- **Instruction adherence:** caches carry invalidation stories; regressions
  and no-ops reported; measurement gaps disclosed.
- **Risk identification:** collateral costs and next-load-level behavior
  assessed.

## Critical failures (automatic fail)

- Code changed for performance before any profile/measurement identified
  the cost, when measurement was available.
- Fabricated timings, profile percentages, or benchmark results.
- Cache introduced with no invalidation semantics.
- Claimed improvement not supported by the reported measurements (or
  variance ignored to manufacture a win).

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
