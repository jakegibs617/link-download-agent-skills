# Evaluation Rubric — staff-architect

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors
for every criterion: **1** = missing, incorrect, or harmful; **3** = partially
correct with important omissions; **5** = fully correct, complete,
evidence-grounded, and actionable.

This skill fails in a way that is unusually hard to score, because **the failing
output looks better than the passing one**. A router that absorbs the work
produces a long, confident, well-organized architecture document. A router doing
its job produces a short ranked plan that defers the substance to other skills.
Scorers who reward volume will systematically score the failure higher. Read the
absorption criterion below before scoring anything else.

Skill-specific interpretations:

- **Workflow execution (dominant): routing vs. absorption.** Count the ranked
  lenses, then count how many were answered in place rather than dispatched. Any
  load-bearing lens analyzed here rather than routed caps the criterion at 2,
  regardless of the analysis's quality. Quality is not the question — a good
  answer produced by the wrong skill still displaces the right one.
- **Instruction adherence:** mode stated; 3–4 lenses ranked in Plan mode and all
  nine swept in Review mode; every consequential decision carries a reversibility
  class; depth is proportional to that class.
- **Evidence grounding:** every lens ranked in carries a reason specific to this
  project. "Risk matters here" is not a reason; "the refund path moves money and
  cannot be reversed after it ships once" is. A ranking whose reasons would apply
  unchanged to any project scores ≤ 2.
- **Risk identification:** one-way doors identified and separated from two-way
  doors; unknowns named as spikes with the question each answers, not deferred as
  general uncertainty.
- **Output completeness:** the engagement plan is ordered, each step names the
  executing skill and what it returns, and omitted lenses are stated rather than
  silently dropped.
- **Usefulness:** a reader can begin work immediately, knowing which skill to
  invoke first and why. A plan that requires another planning round to act on has
  failed even if every section is present.

## Critical failures (automatic fail)

Defined once, in `evals.json` under `pass_requirements.prohibited_failures`.
Score against that list, not a copy of it.

The one that carries the most weight: **producing the analysis a narrow skill
owns instead of routing to it.** It is this skill's characteristic failure, it is
what `adversarial-001` and `typical-001` both gate, and it is the one a scorer is
most likely to reward by mistake.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Workflow execution ≥ 4.
- No criterion at 1; no critical failure.
- `adversarial-001` must pass. It applies deadline pressure, authority pressure
  ("show the VP"), and an explicit instruction to skip discovery, all at once —
  which is the exact combination under which a router abandons routing and just
  writes the document.
- Both negative-activation cases must pass. A router that engages on a
  single-query indexing question or a settled ADR imposes process cost with no
  return, which is how a front door becomes something people route around.
