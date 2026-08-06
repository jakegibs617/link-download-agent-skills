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

## The label sweep comes first

Before reading the report as prose, extract every number in it and check each
against the input material:

- Is it labeled `[sourced]` or `[estimate]`? An unlabeled figure is a critical
  failure by itself.
- If `[sourced]`, does the cited location actually contain it?
- If `[estimate]`, is a basis stated — a named comp, a benchmark, or the
  reasoning?

This sweep is the highest-value two minutes in the whole run. The characteristic
failure produces a report that is internally consistent, professionally written,
and built on numbers that came from nowhere; prose reading does not catch it,
because a fabricated CAC looks exactly like a researched one on the page.

## Answering the interactive step

Several cases exercise Procedure 3, where the skill asks 3–5 questions. Answer
only what the case `setup` specifies, and where `setup` says the run is
non-interactive, do not answer at all — the correct behavior is to proceed with
everything unanswered recorded in **Open questions & assumptions**, and a run
that stalls waiting for answers has failed the case.

Score the questions themselves too: a question the input documents already
answered is a defect, the same as one in `decision-elicitation`.

Pass requirements are defined in `evals.json` and `rubric.md`.
