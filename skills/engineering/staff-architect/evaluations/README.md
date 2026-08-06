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

**Note on scoring this skill: longer output is usually the worse output.** The
characteristic failure is absorption — producing the analysis rather than routing
it — and absorption produces a document that is longer, more confident, and more
immediately satisfying than a correct ranked engagement plan. The measure that
matters is the ratio of lenses routed to lenses answered in place. A
skill-enabled run that is half the length of its baseline and names six skills to
invoke has almost certainly improved, even though it reads as less work.

Baseline runs on `typical-001` and `adversarial-001` are worth keeping verbatim:
they show what an unrouted architecture answer looks like, which is the thing
scorers need calibrated before they can score the routed version fairly.

Pass requirements are defined in `evals.json` and `rubric.md`.
