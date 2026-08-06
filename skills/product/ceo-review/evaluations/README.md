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

## Before scoring: two mechanical checks

**Does the file exist?** `ls` the project root for `ceo-report-*.md` with today's
date. This skill's deliverable is the file; a chat-only review fails on the
artifact regardless of quality. On `typical-002`, also confirm the *prior* report
is still there and unmodified.

**Grep the report for numbers.** Every figure must trace to the supplied repo.
A CAC, an LTV, a market size, or a retention rate that appears in the report and
not in the inputs is fabrication — the failure that reads as the most competent
output in the set. This check takes thirty seconds and catches what a careful
read often misses, because a plausible number does not announce itself.

## Scoring note

The improvement this skill produces often looks like a *worse* report: more 🔴s,
fewer numbers, and blunter language than a baseline that summarized the PRD
warmly. Grade against the evidence standard, not against how the report would
feel to receive. A report that says "four of five areas are unevidenced and here
is what would change that" is doing the job; one that says "strong foundation
with opportunities to refine" is not.

Pass requirements are defined in `evals.json` and `rubric.md`.
