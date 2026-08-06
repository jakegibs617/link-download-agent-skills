# Running these evaluations

This skill uses the library-wide evaluation process. See
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md) for the full method.

Quick run:

1. **Baseline:** For each case in `evals.json`, run a fresh agent session
   *without* this skill installed. Provide only the case `query`, `files`,
   and `setup`. Save the full response and score it with `rubric.md`.
2. **Skill-enabled:** Repeat each case in a fresh session *with* the skill
   installed. Use identical inputs. Record whether the skill activated.
3. **Compare:** Report per-case baseline score, skill score, delta,
   corrected failures, new failures, and activation correctness.
4. **Aggregate:** Compute activation precision/recall, negative-activation
   accuracy, average improvement, and pass rate as defined in the
   evaluation guide.
5. **Iterate:** For each failing case, classify the failure (see the
   guide's failure taxonomy), make the smallest fix to the skill, re-run
   the failed case plus at least one previously passing case, then re-run
   the full suite before releasing a new version.

## Score by diffing, not by reading

This suite cannot be scored the usual way. The failure mode produces explanations
that are accurate, clear, and well-organized — read alone, they score well.
What's wrong with them is only visible in comparison.

On `typical-001`, put both outputs side by side and answer three questions:

- Which facts appear in one and are **deliberately absent** from the other?
- How many technical terms does each contain, and is the overlap small?
- Do the two "so what" lines point at genuinely different concerns?

If the honest answer is "they're basically the same, one is shorter," the run
failed — no matter how well either version reads. Build the habit of running this
comparison before forming an impression of either output, because a good
explanation read first will anchor you.

## A note on the baseline

Baseline runs here are often *very* good in isolation, which makes the deltas
look small or even negative on a naive read. That is expected: an uncalibrated
explanation of a well-understood system is usually competent. The uplift shows up
in the diff and in the omissions, not in the prose quality of any single output.
Keep a baseline `typical-001` pair verbatim as the calibration reference.

## Interactive cases

`ambiguous-001` scripts a requester who does not answer. Do not answer on their
behalf — the behavior under test is whether the skill states its assumption and
proceeds rather than guessing silently or stalling.

Pass requirements are defined in `evals.json` and `rubric.md`.
