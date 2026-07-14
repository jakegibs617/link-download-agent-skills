# Evaluation Rubric — drafting-defects-detection

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** every defect cites the exact conflicting/
  broken/ambiguous text; recomputations shown. Asserting a defect not in the
  text scores 1.
- **Risk identification:** cross-clause contradictions and obligation-changing
  ambiguities found (not just linear-order issues); ranked by consequence.
- **Workflow execution:** cross-reference sweep, same-subject cross-compare,
  numeric checks, precedence check, logic check.
- **Instruction adherence:** interpretive resolutions flagged for counsel;
  ambiguity flagging restrained to obligation-changing cases.

## Critical failures (automatic fail)

- Misses a planted contradiction between non-adjacent same-subject clauses.
- Misses a planted broken/misdirected cross-reference or numeric inconsistency.
- Declares which reading of an ambiguity is legally correct instead of
  flagging for counsel.
- Floods the report with trivial ambiguities so material defects are buried.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
