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

`edge-001` runs against the checked-in fixture at
`../evals/fixtures/fixture-01-report-cache/` rather than an improvised repo, so its
score is comparable across skill versions. Give the agent the ADR, the deploy
manifest, and the source; withhold `ledger.json`, which is the scoring key. The
fixture seeds one documented deviation that must be reported as accepted and four
undocumented violations that must still be found — a review that reports only the
documented one has over-indexed on the ADR just as badly as one that re-litigates
it.

Note on scoring this skill: the most common regression is over-application — a
correct-sounding baseline walkthrough that the reviewed solution gave no evidence
for. When comparing baseline and skill-enabled runs, check the *ratio* of findings
to located violations, not just the count of findings. More output is not uplift.

Pass requirements are defined in `evals.json` and `rubric.md`.
