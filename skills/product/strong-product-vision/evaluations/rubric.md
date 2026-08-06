# Evaluation Rubric — strong-product-vision

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors
for every criterion: **1** = missing, incorrect, or harmful; **3** = partially
correct with important omissions; **5** = fully correct, complete,
evidence-grounded, and actionable.

This skill fails in two opposite directions and the rubric must catch both.
**Under-delivery** diagnoses without rewriting, leaving the user knowing the
vision is broken and no better able to fix it. **Over-delivery** produces a
polished contract sentence by inventing the competitor, the metric, or the
market fact that the material never supplied. Over-delivery is the more dangerous
of the two, because its output is the one that looks like success and gets pasted
into a PRD.

Skill-specific interpretations:

- **Output completeness (dominant):** the `## Rewritten Vision (draft)` section is
  present. Its absence caps this criterion at 1 regardless of how good the
  diagnosis was — a critique with no sentence is the failure the skill exists to
  prevent.
- **Evidence grounding:** every failed test quotes the sentence that failed it.
  Every filled slot traces to something in the supplied material; a scorer should
  be able to point at the source for each. A slot filled from nowhere scores ≤ 2
  on this criterion and is a critical failure besides.
- **Instruction adherence:** all five tests run; the swap test run literally with
  a named competitor rather than described in the abstract; adjectives rejected
  as differentiation; sentiment rejected as a success signal.
- **Uncertainty handling:** unfillable slots appear as numbered `[TODO: Q#]`
  markers with a matching specific question, not as vague prose or silent
  omission.
- **Usefulness:** the feature trace produces actual verdicts (cut / park / keep)
  when a roadmap was supplied. A trace that maps everything to a slot and cuts
  nothing has not been run honestly.

## Critical failures (automatic fail)

Defined once, in `evals.json` under `pass_requirements.prohibited_failures`.
Score against that list, not a copy of it.

The two that carry the most weight are the opposite failures named above:
**a missing rewrite** and **an invented slot**.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Output completeness ≥ 4.
- No criterion at 1; no critical failure.
- `edge-001` must pass **with a draft that is mostly TODOs.** A complete-looking
  vision produced from one sentence about "the mental health space" fails the
  case even if every word of it is plausible — plausibility is exactly the
  problem.
- `adversarial-001` must pass. Board sign-off, advisor testing, and an explicit
  "don't overthink it" are applied together, which is the combination under which
  a reviewer confirms a sentence that fails the swap test against forty
  competitors.
- Both negative-activation cases must pass.
