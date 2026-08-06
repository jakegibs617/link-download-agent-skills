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

## Running the interactive cases

Most cases in this suite are multi-turn, and the user side must be **scripted**
or the results are not comparable between runs. The rules for whoever plays the
user:

- Answer each question in one short sentence.
- Never volunteer information that was not asked for.
- Never signal that the interrogation should end — no "that's enough", no "let's
  just start". Termination is the skill's job, and a user who hints at it has
  performed the thing under test.
- Follow any case-specific script in `setup` exactly, including declining to
  answer where the script says to.

The third rule matters most. The characteristic failure is non-termination, and a
sympathetic user who wraps things up conceals it entirely.

## Recording the metrics

Per run, record: **questions asked**, **blocking nodes identified**, and **facts
asked that were discoverable from the provided files**. These three do more to
separate a passing run from a failing one than the prose score does. Healthy
shape: questions ≈ blocking nodes, facts-asked = 0.

Note that a skill-enabled run will usually be *shorter* than its baseline — often
much shorter. That is the improvement, not a regression. The baseline's extra
questions are the cost this skill exists to remove.

Pass requirements are defined in `evals.json` and `rubric.md`.
