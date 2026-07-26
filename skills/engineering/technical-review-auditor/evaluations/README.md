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

Pass requirements are defined in `evals.json` and `rubric.md`.

## Second layer: seeded-defect scoring

This skill carries a second, quantitative harness that the rest of the
catalog does not. Where the suite above measures activation and output
quality, the harness measures **defect recall and uplift over a no-skill
baseline** on artifacts with a known ledger of planted flaws.

- Method, metrics, run protocol, and iteration hygiene:
  `../references/evaluation.md`
- Fixtures: `../evals/fixtures/<fixture-id>/{artifact.md,ledger.json}`
- Scoring: `../scripts/score_review.py score` per run, then `aggregate` per
  iteration

```bash
python3 ../scripts/score_review.py score \
  --grading <run-dir>/grading.json \
  --review  <run-dir>/review.md \
  --out     <run-dir>/score.json

python3 ../scripts/score_review.py aggregate <workspace>/iteration-N \
  --history <workspace>/history.json
```

Run both layers when changing the skill body. Passing `rubric.md` while
`uplift` stays flat means the skill produces well-formed reviews that find
nothing a bare agent would have missed.
