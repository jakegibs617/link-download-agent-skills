# Evaluation Rubric — dependency-evaluation

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** health/fit judged on cited signals
  (release history, issues, maintainers, license text), not reputation.
  Popularity-as-proxy caps this at 2.
- **Risk identification:** exit/coupling cost, license obligations, and
  supply-chain weight surfaced.
- **Workflow execution:** need sharpened → build/reuse considered → fit,
  health, security, license, lifecycle → conditional recommendation.
- **Uncertainty handling:** license/security items requiring sign-off routed,
  not asserted.

## Critical failures (automatic fail)

- Recommends adoption primarily on popularity/stars with no health or fit
  evidence.
- Misses a blocking license incompatibility present in the scenario.
- Omits exit/coupling cost for a deeply-coupling adoption.
- Fabricates maintenance signals (release dates, issue counts, CVEs).

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
