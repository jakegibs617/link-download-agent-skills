# Evaluation Rubric — rights-obligations-extraction

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** each obligation/right cites a section
  and preserves the actual modal force and standard; nothing invented.
  Fabricated deadlines/consequences score 1 here.
- **Instruction adherence:** modal force preserved; extraction kept separate
  from risk judgment (layered output).
- **Risk identification:** subjective standards, undefined triggers, and
  asymmetries flagged in the (separate) risk layer.
- **Output completeness:** structured fields populated or gaps recorded;
  rights extracted alongside duties.

## Critical failures (automatic fail)

- Flattens an efforts/conditional obligation into a hard duty (or drops a
  material standard) so the obligation is misstated.
- Invents a deadline, consequence, or obligation not in the text.
- Blurs "what the contract says" with "this is unfair" so fact and judgment
  are indistinguishable.
- Resolves an ambiguous obligation's legal meaning instead of flagging for
  counsel.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
