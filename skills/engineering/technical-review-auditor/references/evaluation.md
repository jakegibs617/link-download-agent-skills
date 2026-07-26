# Evaluating this skill

Read this only when measuring or iterating on the skill itself, not when performing a review.

Requires a runtime with subagents (Claude Code or Cowork). On Claude.ai there are no subagents — run the configurations sequentially in separate conversations instead, and accept that the reviewer and the author are the same context, which weakens the result.

## The measurement problem

Review quality looks subjective, so the usual instinct is to skip quantitative scoring and rely on eyeballing outputs. That is a mistake here, and it is avoidable.

Two things make this measurable:

**Seeded defects.** Fixtures are artifacts with a known ledger of deliberately planted flaws. Scoring becomes: did the review find the things we know are there. This converts a subjective task into a recall problem.

**Baseline comparison.** Absolute detection rate says almost nothing — a capable model reviewing a design document catches obvious problems with no skill at all. The only number that means anything is the **uplift over baseline**: the same fixture, same prompt, no skill. A skill scoring 70% detection where baseline scores 68% is not doing meaningful work regardless of how good the output reads.

## Fixture format

Each fixture is a directory under `evals/fixtures/`:

```
fixture-01-notification-service/
├── artifact.md      the plan, doc, or code under review
└── ledger.json      the planted defects
```

`ledger.json`:

```json
{
  "fixture_id": "fixture-01-notification-service",
  "mode": "doc",
  "defects": [
    {
      "id": "D1",
      "lens": "reversibility",
      "severity": "critical",
      "must_be_blocking": true,
      "description": "Event schema published to external consumers with no versioning strategy",
      "detection_criteria": "Review must identify the event schema as a one-way door or raise the absence of versioning"
    }
  ]
}
```

`severity` is one of `critical`, `major`, `minor`. `must_be_blocking` marks defects that must appear in the review's blocking section, not merely somewhere in the text — this is what tests the ranking discipline rather than just recall.

`detection_criteria` matters more than `description`. Write it as the condition a grader can check, and make it permissive about wording — you are testing whether the problem was found, not whether it was phrased your way.

### Building good fixtures

Plant defects across all four lenses and all three severities. A fixture where every defect is a missing NFR only measures one lens.

Include defects that are genuinely subtle — if baseline catches everything, the fixture has no headroom and cannot show uplift. Roughly: one third obvious, one third moderate, one third subtle.

Include at least one fixture that is largely sound, with only minor defects. This is the only way to measure whether the skill manufactures findings under pressure to produce them. A skill that scores well on flawed fixtures and invents blocking issues on a good one is worse than no skill.

## Metrics

| Metric | Definition | Why |
|---|---|---|
| `critical_recall` | critical defects caught / critical total | The headline. Missing a critical one-way door is the failure the skill exists to prevent |
| `detection_rate` | severity-weighted defects caught / total | Overall coverage |
| `blocking_precision` | must-be-blocking defects present in blocking section / total blocking findings | Tests ranking, not just recall |
| `noise_rate` | findings matching no real problem / total findings | Guards the failure mode the skill's own discipline section warns about |
| `format_compliance` | deterministic structural checks | Cheap, and catches drift when the skill body is edited |
| `tokens`, `duration_ms` | cost | A skill that doubles quality and quintuples cost is a real tradeoff |

Severity weights: critical 3, major 2, minor 1.

### Composite

```
composite = 0.40 * critical_recall
          + 0.20 * detection_rate
          + 0.20 * blocking_precision
          + 0.15 * (1 - noise_rate)
          + 0.05 * format_compliance
```

Critical recall dominates deliberately. A review that finds every minor NFR gap and misses the unversioned public schema has failed at the thing that matters, and a flat average would hide that.

`uplift = composite(with_skill) - composite(baseline)`. Report uplift as the primary result. Report raw composite as secondary.

## Run protocol

1. **Spawn both configurations in the same turn** — with-skill and baseline together, per fixture. Launching baselines later invites drift in prompt or conditions.
2. **Three runs per configuration per fixture.** Variance between identical runs is substantial. A single-run delta of a few points is noise, not signal.
3. **Identical prompts.** The only difference between configurations is skill access.
4. **Grade with an independent subagent.** The grader receives the review output and the ledger. It must **not** receive the skill, and must not know which configuration produced the output. A grader that has read the skill will credit reviews for using its vocabulary rather than for finding defects.
5. **Capture `total_tokens` and `duration_ms`** from each run notification as it arrives — this data is not persisted anywhere else.

Grader output per run, saved as `grading.json`:

```json
{
  "config": "with_skill",
  "fixture_id": "fixture-01-notification-service",
  "defects": [
    {"id": "D1", "caught": true, "in_blocking": true, "evidence": "quoted line from the review"}
  ],
  "findings_total": 9,
  "findings_spurious": 1,
  "blocking_total": 4
}
```

`evidence` is not optional. It forces the grader to point at the text and makes disputed calls reviewable by a human later.

## Scoring

```bash
python scripts/score_review.py score  --grading <run-dir>/grading.json --review <run-dir>/review.md --out <run-dir>/score.json
python scripts/score_review.py aggregate <workspace>/iteration-N --history <workspace>/history.json
```

`aggregate` computes mean and standard deviation per configuration, uplift, and appends the iteration to `history.json` so the trend across iterations is visible in one place.

## Iteration hygiene

This is the part that gets skipped, and skipping it makes every number after iteration two meaningless.

**Freeze the fixtures.** Once scoring has begun, do not edit an artifact or its ledger. Changed fixtures make iterations incomparable, and the temptation to adjust a ledger after seeing a review disagree with it is strong and always wrong. Add new fixtures instead; retire old ones explicitly and note it in history.

**Hold out a subset.** Reserve roughly 40% of fixtures and do not read those outputs while editing the skill. Report train and held-out scores separately. If train improves while held-out is flat, the skill is being tuned to catch those specific planted defects rather than getting better at review — the standard overfitting failure, and it is easy to do unknowingly across five or six iterations.

**Compare against variance, not against the last number.** Compute the standard deviation across the three runs. A delta smaller than roughly one standard deviation is not evidence of improvement. Most apparent gains at iteration three are this.

**Log every iteration, including the ones that got worse.** `history.json` should record what changed in the skill, the scores, and whether the change was kept. Reverted experiments are the most useful entries — without them the same idea gets retried three iterations later.

**Watch the cost column.** Skills tend to grow monotonically because adding instructions is easier than removing them. If composite rises 2 points while tokens rise 60%, that is usually a bad trade, and it also means the skill body is drifting toward the 500-line limit where it stops being loaded reliably.

## Known limits of this method

Seeded defects measure recall of problems someone already thought of. They cannot measure the reviewer finding something nobody planted — which is a large part of what makes a review valuable. Read a sample of outputs qualitatively every iteration; do not let the composite become the only thing looked at.

Fixtures also drift out of relevance as the real work changes. Revisit whether the planted defects still resemble the failures actually being hit.
