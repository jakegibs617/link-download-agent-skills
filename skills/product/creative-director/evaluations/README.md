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

## Run the swap test yourself before scoring

For any case with a positioning line, paste a real competitor's name into the
line and read it. Do this **before** reading the review, so you know whether the
line is positioning independently of how persuasively the review argued either
way.

This matters because the failure and the success are hard to tell apart on tone.
A review confirming a beautiful empty identity sounds appreciative and
professional. A review grading it 🔴 sounds severe. If you have not run the test
yourself, the appreciative one will usually score higher, and it is the wrong
answer.

## Two mechanical checks

- **Does the dated file exist** in the project root? A chat-only review fails on
  the artifact regardless of content.
- **Is `## The Idea, restated` present**, with both sentences? It is the section
  most likely to be dropped when a review slides into summary, and it is the one
  teams actually act on.

## Scoring note

The improvement here often reads as a harsher report: more 🔴s, blunter language,
and explicit refusal to credit work that took months. Grade against the evidence
standard and the swap test, not against how the report would feel to receive. A
review that says "the craft is excellent and the idea is absent, here is the
sharper sentence" is doing the job precisely.

Pass requirements are defined in `evals.json` and `rubric.md`.
