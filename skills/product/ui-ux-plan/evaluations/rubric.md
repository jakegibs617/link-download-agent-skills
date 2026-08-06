# Evaluation Rubric — ui-ux-plan

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors
for every criterion: **1** = missing, incorrect, or harmful; **3** = partially
correct with important omissions; **5** = fully correct, complete,
evidence-grounded, and actionable.

This skill's failures **pass a structural check**. All eight sections can be
present, well organized, and readable while the principles constrain nothing and
the design system specifies nothing. A section-count review will score that plan
highly. Two active tests are therefore required before scoring anything else.

## The two tests, run before reading

**Invert every principle.** Take each of the 4–6 UX principles and state its
opposite. If the opposite is absurd — nobody would ever build the reverse — the
principle is filler and is a critical failure. "The interface is intuitive"
inverts to "the interface is confusing", which nobody would choose, so it says
nothing. "No interaction requires two hands" inverts to "interactions may require
two hands", which is a real position a different product would take. Only the
second is a principle.

**Hand section 5 to an imaginary new designer.** Could they produce an on-brand
screen from it without asking a question? A type scale, semantic color roles with
light and dark values, a spacing scale, and named components pass. "Warm,
approachable, with a modern feel" fails, however pleasant it reads.

## Skill-specific interpretations

- **Instruction adherence (dominant):** principles exclude something; sections 3
  and 4 are valid mermaid; flows carry empty, error, and failure states; no
  question asked that the inputs answer; an existing plan updated rather than
  regenerated.
- **Output completeness:** all eight sections, with section 6 present in existing
  mode. Its absence in existing mode is a critical failure — the audit is the
  reason existing mode exists.
- **Evidence grounding:** every section traceable to a PRD constraint, or the
  divergence stated. A plan that contradicts the PRD's stated non-goals without
  saying so scores ≤ 2.
- **Uncertainty handling:** everything guessed appears in section 7. A confident
  plan with an empty Open questions section, built on inputs that did not settle
  everything, is hiding its assumptions rather than lacking them.
- **Usefulness:** section 8's handoff order is specific enough to start on, and
  the reasoning for the order is given.

## Critical failures (automatic fail)

Defined once, in `evals.json` under `pass_requirements.prohibited_failures`.
Score against that list, not a copy of it.

The two that carry the most weight are the ones the two tests above catch:
**a principle that excludes nothing**, and **a mood-board design system**.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Output completeness ≥ 4.
- No criterion at 1; no critical failure.
- `ui-ux-plan.md` exists, and on `edge-001` the prior content was read and
  carried forward rather than regenerated.
- `adversarial-001` must pass **with the mermaid and the design system intact.**
  The user explicitly declines both and cites a Monday deadline; complying
  produces precisely the screen-list-plus-vibe-paragraph this skill replaces.
- `ambiguous-001` must pass **without producing a plan.** Eight sections invented
  from "I want to build a habit tracker" describe a generic habit tracker, not
  this one, and the fluency of the result is what makes it dangerous.
- Both negative-activation cases must pass.
