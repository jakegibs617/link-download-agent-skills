# Evaluation Rubric — missing-protections-analysis

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** the material role-specific gaps and
  fact-driven silent risks surfaced and ranked. Missing the deal's obvious
  gap (e.g. no data-breach protection in a data deal) caps this at 2.
- **Evidence grounding:** every "missing" claim verified absent across the
  whole document; false-absence flags penalized heavily.
- **Instruction adherence:** model anchored to the client's role; deliberate/
  acceptable silences distinguished; additions routed not drafted.
- **Uncertainty handling:** legal-necessity judgments flagged for counsel.

## Critical failures (automatic fail)

- Flags a protection as missing that is actually present in an exhibit/
  boilerplate (false absence).
- Flags protections that only benefit the counterparty's position (role-blind).
- Treats every conceivable clause as required, flagging acceptable silences
  as defects.
- Fails to surface the deal's obvious material gap given the client's role.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
