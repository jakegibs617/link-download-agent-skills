# Evaluation Rubric — explain-for-audience

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors
for every criterion: **1** = missing, incorrect, or harmful; **3** = partially
correct with important omissions; **5** = fully correct, complete,
evidence-grounded, and actionable.

**This skill's failure is never wrong, only mispitched.** Every criterion here
has to work around that. A competent, accurate, well-written explanation
delivered at the explainer's default altitude will read as a good answer in
isolation — and it is the failure. Scoring one output on its own merits cannot
detect it. **Diff the outputs instead.**

## The diff test

For any case producing two personas' explanations from the same source, put them
side by side and check:

1. **Do different facts survive?** Not "is one shorter" — is a fact present in
   one and deliberately absent from the other?
2. **Is the vocabulary actually different?** Count the technical terms in each. A
   shared term list across an engineer and a VP is the tell.
3. **Do the "so what" lines point at different things?** They should be about
   different concerns entirely, not the same concern restated.

Two outputs that differ only in length score **1** on instruction adherence,
however good each one reads. That is the characteristic failure and this is the
only reliable way to see it.

## Skill-specific interpretations

- **Instruction adherence (dominant):** the persona's omissions were actually
  applied. Omission is the hard half — adding detail is easy and cutting it is
  what the personas are for. An explanation containing everything, ordered well,
  has not been calibrated.
- **Usefulness / actionability:** the "so what" is present and expressed in that
  role's terms. Its absence caps this criterion at 2 — it is the sentence that
  converts an explanation into something the listener can act on, and it is the
  most commonly dropped element.
- **Clarity:** no jargon the audience must translate before acting. Check against
  the persona's stated vocabulary column, not against general readability.
- **Robustness:** where the title and the evidence about fluency disagree, the
  person wins and the divergence is stated. Mechanical persona application
  against contrary evidence scores ≤ 2 — it reads as condescending to the
  recipient and is a real failure, not a technicality.
- **Uncertainty handling:** an undetermined persona is stated as an assumption,
  never guessed silently.
- **Evidence grounding:** every claim traces to the supplied source material.
  Simplification of expression is correct; simplification into a false statement
  is a critical failure, and it is most tempting at the two product personas.

## Critical failures (automatic fail)

Defined once, in `evals.json` under `pass_requirements.prohibited_failures`.
Score against that list, not a copy of it.

The one that carries the most weight: **two personas receiving substantively the
same explanation.** It is what `typical-001` exists to catch, and it is invisible
without the diff test.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Usefulness ≥ 4.
- No criterion at 1; no critical failure.
- `typical-001` must pass **the diff test**, not merely produce two readable
  explanations.
- `adversarial-001` must pass **without inflating and without refusing.** Both
  failure directions are available there: padding a one-line change into
  architecture prose, or declining the task rather than finding the honest
  framing. The correct output is short, true, and genuinely useful to a CTO.
- Both negative-activation cases must pass. The boundary against
  `stakeholder-communication` is the one most likely to blur in practice, since
  both skills touch nontechnical audiences — `negative-001` is the test of
  whether the carve holds.
