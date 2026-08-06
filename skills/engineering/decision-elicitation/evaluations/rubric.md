# Evaluation Rubric — decision-elicitation

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors
for every criterion: **1** = missing, incorrect, or harmful; **3** = partially
correct with important omissions; **5** = fully correct, complete,
evidence-grounded, and actionable.

**Question count is a scored metric, and fewer is better.** This is the inversion
that makes this rubric different from most in the library. A run that asks four
questions and stops scores above an otherwise-identical run that asks eleven and
covers more ground. Thoroughness is not the goal; reaching buildable with the
least of the user's attention is. Scorers who reward coverage will systematically
score the failure higher.

Skill-specific interpretations:

- **Workflow execution (dominant): termination.** Check the three completion
  tests against the transcript at the point the run actually stopped. A run that
  continued past the point where all three held caps the criterion at 2, however
  useful the extra questions were. A run that stopped before they held, leaving a
  blocking decision open inside a spec presented as ready, fails outright.
- **Instruction adherence:** tree rendered before the first question; every node
  marked; exactly one decision per message throughout — a single batched message
  is a critical failure, not a deduction; deferrable nodes never asked.
- **Evidence grounding:** every "already answered" node cites what settles it (a
  file, a convention, a line of the spec). An unsourced "already answered" is
  indistinguishable from a decision quietly skipped, and scores ≤ 2. Every
  recommendation carries a reason of a named type — first-principles argument,
  named tradeoff, or concrete consequence.
- **Uncertainty handling:** a blocking decision nobody can answer becomes a named
  spike and stops the run. Guessing at it to keep momentum is the failure
  `edge-001` gates.
- **Output completeness:** deferred decisions each carry a trigger; the spec is
  presented for confirmation rather than acted on.
- **Usefulness:** the emitted spec is buildable by someone who was not in the
  conversation. A spec that requires re-deriving the decisions from the
  transcript has failed.

## Scoring the question count

Record three numbers per run: questions asked, blocking nodes identified, and
facts asked that were discoverable. The healthy shape is questions ≈ blocking
nodes, and facts-asked = 0. Questions materially exceeding blocking nodes means
either pruning did not happen or deferrable nodes were walked — check which,
because the fixes differ.

## Critical failures (automatic fail)

Defined once, in `evals.json` under `pass_requirements.prohibited_failures`.
Score against that list, not a copy of it.

The two that carry the most weight: **continuing past the completion test**
(the characteristic failure, gated by `typical-002`) and **asking a fact the
codebase answers** (the fastest way this skill loses the user, gated by
`typical-001` and `ambiguous-001`).

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Workflow execution ≥ 4.
- No criterion at 1; no critical failure.
- `ambiguous-001` must pass **by asking zero questions.** A run that asks even one
  question there has manufactured a decision to justify its own invocation, which
  is the failure mode that makes users stop invoking it.
- `typical-002` must pass by stopping early. The case is built so that
  interesting, legitimate questions remain unasked at the stopping point — that
  discomfort is the test.
- Both negative-activation cases must pass.
