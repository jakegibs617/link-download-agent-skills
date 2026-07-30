# Running these evaluations

This skill uses the library-wide evaluation process. See
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md) for the full method.

Quick run:

1. **Baseline:** For each case in `evals.json`, run a fresh agent session
   *without* this skill installed. Provide only the case `query`, `files`,
   and `setup`. Save the full response and score it with `rubric.md`.
2. **Skill-enabled:** Repeat each case in a fresh session *with* the skill
   installed. Use identical inputs. Record whether the skill activated, and
   which reference files were read.
3. **Compare:** Report per-case baseline score, skill score, delta,
   corrected failures, new failures, and activation correctness.
4. **Aggregate:** Compute activation precision/recall, negative-activation
   accuracy, average improvement, and pass rate as defined in the
   evaluation guide.
5. **Iterate:** For each failing case, classify the failure (see the
   guide's failure taxonomy), make the smallest fix to the skill, re-run
   the failed case plus at least one previously passing case, then re-run
   the full suite before releasing a new version.

Pass requirements are defined in `evals.json` and `rubric.md`.

## Watch the over-application cases specifically

`adversarial-001`, `negative-001`, and `negative-002` are the guard against this
skill's characteristic failure: producing systems-shaped analysis where none is
warranted. All three must pass for the suite to pass.

When scoring, the question on the typical cases is not whether the response
mentions loops, stocks, and leverage — a capable bare agent often will. It is
whether each loop closes, each claim is cited and confidence-labeled, and each
recommendation states a leverage level, an unintended consequence, and a
guardrail. Score those attributes in the baseline run too, or the uplift number
will be measuring vocabulary rather than analysis.

## Judging a report's length

Two of the cases (`ambiguous-001`, `adversarial-001`) should produce **short**
outputs. A long report on thin evidence is a failure of this skill, not
thoroughness — the extended registers in `references/report-template.md` are
conditional, and padding them counts against Clarity.
