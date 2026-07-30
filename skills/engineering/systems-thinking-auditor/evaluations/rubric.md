# Evaluation Rubric — systems-thinking-auditor

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors
for every criterion: **1** = missing, incorrect, or harmful; **3** = partially
correct with important omissions; **5** = fully correct, complete,
evidence-grounded, and actionable.

This skill fails in two opposite directions, and the rubric must catch both.
**Under-application** stops at events and per-instance fixes. **Over-application**
names loops, stocks, and archetypes the evidence does not support, and reads as
sophisticated analysis while being invention. Over-application is the more
dangerous failure because it is harder to spot, and it is scored at least as
harshly.

Skill-specific interpretations:

- **Evidence grounding (dominant):** every structural claim traces to cited
  material — a metric series, a repeated episode, a file, a quoted policy — and
  carries one of `evidenced` / `inferred` / `speculative` / `unknown`. Naming a
  loop that does not close, or asserting a pattern over time from a snapshot,
  caps this at 2. A correct structural diagnosis stated without its evidence
  caps it at 3.
- **Workflow execution:** boundary stated with its exclusions and horizon →
  stated vs. operative purpose separated → behavior-over-time established or its
  absence declared → stocks judged on flows → only closing loops named → delays
  identified → archetypes tested adversarially → goals, incentives, rules, and
  information examined → recommendations ranked by leverage with levels stated →
  verdict. Skipping the boundary or the incentive examination caps this at 3.
- **Risk identification:** the long invisible delay and the cost-bearer who
  lacks authority are found, and each recommendation's unintended consequence is
  named. A recommendation set with no unintended consequences and no guardrails
  caps this at 2.
- **Usefulness / actionability:** the leverage levels are not all the same
  number. All recommendations at levels 1–2 for a structurally generated problem,
  or a level 10–11 prescription with no implementable step beneath it, each cap
  this at 2. Recommendations name who must act.
- **Uncertainty handling:** missing operational evidence produces an explicit
  unknown plus the observation that would resolve it. `insufficient evidence` is
  a correct verdict when the evidence is absent, and using it there scores 5,
  not 3.
- **Clarity:** on `adversarial-001`, the plain cause appears early and is not
  buried under structural analysis. Report length is proportionate to the
  evidence; padding the extended registers with thin content caps this at 3.

## Critical failures (automatic fail)

- Names a feedback loop whose chain does not close back on an earlier variable,
  or presents a one-directional causal chain as feedback.
- Declares a system archetype without applying its discriminating test, or
  without recording contradicting evidence.
- Asserts a pattern over time from a single snapshot, with no time-series or
  repeated-episode evidence and no acknowledgment of the gap.
- Recommends only parameter and capacity changes (levels 1–2) for a problem the
  audit itself identified as structurally generated.
- Recommends only goal or paradigm changes (levels 10–11) with no implementable
  step at a lower level.
- Omits the boundary, or states a boundary without naming what was excluded.
- Audits against the stated purpose when the incentives in evidence point
  elsewhere.
- Manufactures structure on `adversarial-001` to satisfy the request's framing,
  or withholds the evidenced parameter cause.
- Delivers recommendations with no unintended consequences and no guardrail
  metrics.
- No verdict, or a verdict the findings do not support.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence grounding
  ≥ 4; Usefulness / actionability ≥ 4.
- No criterion at 1; no critical failure.
- Both `should_activate: false` cases and `adversarial-001` must pass for the
  suite to pass. These three are the over-application guard; a suite that passes
  without them is measuring enthusiasm for systems vocabulary rather than
  systems analysis.

## Scoring note on baseline comparison

A bare agent asked "why does this keep happening" will often produce
loop-shaped prose unprompted, so uplift on the typical cases shows up less in
whether structure is mentioned and more in whether it is **evidenced, closed,
and converted into levelled recommendations with guardrails**. Score those
attributes specifically rather than crediting the presence of the vocabulary,
in both the baseline and the skill-enabled run.
