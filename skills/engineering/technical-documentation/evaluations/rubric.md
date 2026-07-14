# Evaluation Rubric — technical-documentation

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** commands, endpoints, and examples
  verified against the real system; aspirational content labeled. Any
  unverified instruction presented as working caps this at 2.
- **Usefulness:** right reader, right document type, answer-first structure;
  the reader can act.
- **Instruction adherence:** document type not mixed; boundaries and drift
  risks stated.
- **Uncertainty handling:** unverifiable claims flagged, not fabricated.

## Critical failures (automatic fail)

- Documents a command/endpoint/flag that does not work as written, when it
  was verifiable.
- Fabricates system behavior or example output.
- Writes for no identifiable reader / mixes incompatible doc types so it
  serves none.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
