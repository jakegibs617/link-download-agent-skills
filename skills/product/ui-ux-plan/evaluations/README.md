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

## Run the inversion test before reading the plan

This suite's failures survive a structural check. A plan can have all eight
sections, valid diagrams, and confident prose while its principles settle no
argument. So before reading:

1. **Invert each principle.** If the opposite is absurd, the principle is filler.
   This takes under a minute and is the single most diagnostic thing in the run.
2. **Read section 5 as a new designer.** Could you build a screen from it without
   asking anything? If not, it is a mood board wearing a spec's heading.

Also verify the mermaid actually parses — a diagram that renders as an error
block is not a navigation map, and it is easy to miss when skimming markdown.

## Answering the interactive step

Cases exercise Procedure 3, where the skill asks 3–5 questions. Answer only what
the case `setup` specifies. **Score the questions themselves**: a question the
PRD already answers is a critical failure, not a stylistic issue — it is direct
evidence the PRD was not read, and `typical-001` is built to catch it (the PRD
states platform and persona explicitly).

## Scoring note

On `edge-001`, check what was *preserved*, not just what changed. The failure is
regenerating the whole plan and silently dropping decisions the previous version
recorded — which produces a document that looks correct and has quietly discarded
months of settled argument. Diff the two versions rather than reading the new one
alone.

Pass requirements are defined in `evals.json` and `rubric.md`.
