# Evaluation Guide

How to run, score, compare, and iterate on evaluations for every skill in this
library. Each skill's `evaluations/` directory contains its cases
(`evals.json`), its criteria and pass threshold (`rubric.md`), and a pointer
back to this guide.

## 1. Running evaluations

Every run compares a **baseline** (no skill) against a **skill-enabled** agent
on identical inputs.

### Phase 1 — Baseline

For each case in `evals.json`:

1. Start a fresh agent session **without** the skill installed.
2. Provide only the case's `query`, `files`, and `setup`. Nothing else.
3. Save the complete response transcript.
4. Score it with the skill's `rubric.md`.
5. Record observed failures in the failure taxonomy below.

### Phase 2 — Skill-enabled

Repeat every case in a fresh session **with** the skill installed, identical
inputs. Additionally record:

- Whether the skill activated (and whether it should have — `should_activate`).
- Which skill files the agent read, where observable.

### Phase 3 — Comparison

Per case, report: baseline score, skill score, delta, baseline failures
corrected, new failures introduced, unexpected behavior, activation
correctness.

### Phase 4 — Aggregates

```text
Activation precision        = correct relevant activations / all activations
Activation recall           = correct relevant activations / cases that should activate
Negative-activation accuracy = correct non-activations / cases that should not activate
Average improvement          = mean(skill scores) − mean(baseline scores)
Pass rate                    = passing skill-enabled cases / total cases
```

## 2. Scoring

All rubrics use the library-standard **1–5 scale**:

| Score | Meaning |
| ----: | ------- |
| 1 | Missing, incorrect, harmful, or unusable |
| 2 | Major failures; limited useful behavior |
| 3 | Partially correct but with important omissions |
| 4 | Correct and useful with only minor issues |
| 5 | Fully correct, complete, evidence-grounded, and reliable |

The 1, 3, and 5 rows are the required anchors. Scorers use 2 or 4 only when
the result falls meaningfully between adjacent anchors; they must not use a
middle score merely to avoid making a judgment.

Standard criteria (each rubric interprets them for its domain and may add
skill-specific ones):

1. **Discovery and activation** — activates when relevant, stays silent when not.
2. **Workflow execution** — required steps, correct order.
3. **Instruction adherence** — MUST / MUST NOT compliance.
4. **Evidence grounding** — conclusions cite the artifact under analysis;
   facts, inferences, and assumptions are labeled.
5. **Output completeness** — all required deliverables present, in format.
6. **Usefulness / actionability** — a reader can act or decide from the output.
7. **Risk identification** — material risks and edge cases surfaced, ranked.
8. **Robustness** — sane handling of ambiguity, conflicts, tool failure.
9. **Uncertainty handling** — unknowns surfaced, not papered over; escalation
   triggers honored.
10. **Clarity** — precise language, findings not buried.

Scoring rules:

- Score each criterion independently; do not average first and rationalize after.
- A **critical failure** listed in the rubric fails the case outright,
  regardless of total score.
- Pass thresholds live in each skill's `evals.json` under
  `pass_requirements`. Do not substitute a global average for them.

## 3. Minimum passing thresholds

Library defaults (a skill's `evals.json` may set stricter values, never looser):

- Total score ≥ **75%** of the maximum for the case's weighted criteria.
- Discovery and activation ≥ 4, Instruction adherence ≥ 4.
- No criterion at 1; no mandatory criterion below its stated minimum.
- No critical failure occurred.
- The negative-activation case **must** pass for the suite to pass.

## 4. Comparing revisions

When a skill changes:

1. Tag the run with the skill version (bump `version` in `evals.json`).
2. Re-run the **full suite**, not just changed cases.
3. Compare per-case scores against the previous version's recorded scores.
4. Accept the revision only if: no previously passing case now fails, and the
   motivating case improves.

## 5. Detecting regressions

A regression is any of:

- A previously passing case now failing.
- Any criterion dropping ≥ 2 points on any case.
- A new activation error (false positive or false negative).
- A new critical failure.

Keep a per-skill results log (case × version matrix of scores) so regressions
are mechanical to spot, not impressionistic.

## 6. Adding new evaluation cases

Add a case whenever: a real-world failure occurs that no case catches, the
skill's scope changes, or a reviewer disagrees with a score and the rubric
can't settle it.

New cases must: use a representative task (not a trick), define observable
`expected_behavior` and `must_not` lists, avoid leaking the ideal answer into
the skill, and state `baseline_risks` — the specific failure the case exists
to catch. Every suite must retain ≥ 5 cases including one ambiguous-input case
and one `should_activate: false` case.

## 7. Weak skill vs. weak model execution

Before editing a skill after a failure, classify the failure:

| Symptom | Likely cause | Fix |
| ------- | ------------ | --- |
| Baseline fails the same way | Model limitation or missing domain context | Add domain knowledge or a validator to the skill; if it still fails, the task may exceed the model |
| Skill-enabled fails, instruction exists but was ignored | `instruction-visibility` | Move the rule up, make it a MUST, or add a checklist gate |
| Skill-enabled fails, instruction ambiguous | `instruction-ambiguity` | Rewrite the rule to be observable/verifiable |
| Fails only on one phrasing of the task | `discovery` issue | Fix the frontmatter description, not the body |
| Fails across many differently-worded cases despite clear rules | Weak model execution | Add a feedback loop (produce → validate → revise), or reduce degrees of freedom |
| Scorers disagree on whether it failed | `evaluation-gap` | Fix the rubric or the case, not the skill |

Full failure taxonomy (from `authoring-agent-skills`): `discovery-false-negative`,
`discovery-false-positive`, `instruction-ambiguity`, `instruction-visibility`,
`missing-domain-context`, `workflow-omission`, `workflow-ordering`,
`validation-gap`, `output-contract-gap`, `tool-assumption`, `overconstraint`,
`underconstraint`, `evaluation-gap`.

Rule of thumb: **one clean failure → smallest possible skill edit; scorer
disagreement → rubric edit; baseline-matching failure → domain-context edit.**
Never fix a failure by weakening the case.
