# Running the authoring-agent-skills evaluation suite

This suite measures whether the `authoring-agent-skills` Skill actually improves an agent's ability to create, review, and evaluate other Skills, compared to an agent with no Skill at all.

Cases live in [evals.json](evals.json). Scoring criteria live in [rubric.md](rubric.md).

## Phase 1: Baseline

For each case in `evals.json`:

1. Start a fresh agent session with the Skill **not installed**.
2. Provide only the case's `query`, `files`, and `setup` — nothing else.
3. Save the full response verbatim.
4. Score it against `rubric.md`.
5. Record which `expected_behavior` items were missing and which `must_not` items were violated.

## Phase 2: Skill-enabled test

For each case:

1. Start a new fresh agent session with `authoring-agent-skills` installed.
2. Provide the identical `query`, `files`, and `setup`.
3. Save the full response verbatim.
4. Score it against the same rubric.
5. Record whether the Skill activated (it should for every case except `negative-001`).
6. Record which Skill files the agent actually read (SKILL.md, examples, references) when observable from tool calls.

## Phase 3: Comparison

For each case, report a row:

| Case | Baseline score | Skill score | Δ | Baseline failures corrected | New failures introduced | Activation correct? |

## Phase 4: Aggregate

```
Activation precision = correct relevant activations / all activations
Activation recall = correct relevant activations / all cases with should_activate: true
Negative activation accuracy = correct non-activations / all cases with should_activate: false
Average baseline score = sum(baseline scores) / 7
Average Skill score = sum(Skill scores) / 7
Average improvement = average Skill score - average baseline score
Pass rate = passing Skill-enabled cases / 7
```

Pass requirements are defined in `evals.json` under `pass_requirements`.

## Phase 5: Iterate

When a case fails:

1. Classify the failure using the categories in `SKILL.md` ("Failure classification").
2. Identify the smallest change to `SKILL.md` that plausibly fixes it — prefer clarifying existing language over adding new sections.
3. Re-run the failed case.
4. Re-run at least one previously passing case (`typical-001` is the standard regression check) to confirm no regression.
5. Re-run the full 7-case suite before treating a new version as released.

## Notes on this specific suite

- `negative-001` and `negative-002` are both negative/boundary cases but differ: `negative-001` should not activate the Skill at all; `negative-002` should activate but only in review mode, not full-package-creation mode. Keep these scored separately — collapsing them hides discovery-precision bugs.
- `adversarial-001` tests compliance with an explicit user override, not resistance to it. The Skill should let the user skip the evaluation suite but must not silently claim the result is complete.
- `destructive-001` is the highest-signal case for whether the "match specificity to task fragility" principle actually changes produced output, versus being inert prose in `SKILL.md`.
