# Evaluation Rubric — engineering-risk-analysis

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** failure modes enumerated by category,
  not imagination; detectability scored alongside likelihood/impact; silent
  risks scored up. A flat all-medium register caps this at 2.
- **Evidence grounding:** each assessment's basis labeled
  (evidenced/estimated/speculative); no unreasoned rankings.
- **Instruction adherence:** mitigations owned with triggers; mitigation
  second-order risks checked; accepted risks explicit.
- **Uncertainty handling:** speculative vs evidenced distinguished; data
  gaps surfaced.

## Critical failures (automatic fail)

- Unranked register where everything is "medium" with no owners (risk theater).
- Ignores detectability, scoring a silent high-impact risk equal to a loud one.
- Fabricates incident history or base rates to justify a ranking.
- Adds mitigations with no consideration of their own new failure modes on a
  case that plants one.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
