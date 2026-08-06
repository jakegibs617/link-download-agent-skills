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

## Scoring note: check every filled slot against the source

The regression that matters here is **fabrication**, and it does not look like a
failure on the page. A rewritten vision naming a plausible competitor and a
plausible retention target reads as the strongest possible output — and if the
supplied material never mentioned either, it is the worst one, because a
fabricated vision is now sitting in a PRD with the authority of having been
reviewed.

For every filled slot in the draft, point at the line of the input that supports
it. If you cannot, it was invented. Run this check before scoring anything else;
it is faster than re-reading and it catches the failure the prose score misses.

The complementary check is trivial and should never be skipped: **is the
`## Rewritten Vision (draft)` section there at all?**

Pass requirements are defined in `evals.json` and `rubric.md`.
