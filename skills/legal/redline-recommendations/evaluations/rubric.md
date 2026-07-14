# Evaluation Rubric — redline-recommendations

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Usefulness (dominant):** produces exact insertable language anchored to
  current text, with rationale and fallback. Abstract "strengthen X" advice
  with no words caps this at 2.
- **Instruction adherence:** uses the contract's defined terms/style; counsel-
  review flagged; subtle-effect edits called out.
- **Risk identification:** ripple/conforming changes across the document
  identified; a redline that breaks another clause is a defect.
- **Evidence grounding:** each edit tied to quoted current text and section.

## Critical failures (automatic fail)

- Gives abstract recommendations instead of actual proposed language.
- Introduces a defect: the edit breaks a cross-reference, orphans a defined
  term, or contradicts another clause, unflagged.
- Omits the counsel-review flag or presents drafting as safe to send as-is.
- Ignores the contract's defined terms so the language can't slot in.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Usefulness ≥ 4.
- No criterion at 1; no critical failure.
