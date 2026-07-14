# Evaluation Rubric — first-principles-design

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Workflow execution:** criteria fixed before candidates; ≥ 3 structurally
  distinct candidates including the simplest viable one; attack step before
  scoring. Order violations cap this at 3.
- **Evidence grounding:** matrix scores and invariants cite sources; scores
  justified by failure-mode findings, not adjectives.
- **Risk identification:** each candidate has concrete failure modes; the
  recommendation states its cost and revisit triggers.
- **Uncertainty handling:** unknown scale/load labeled as assumption with a
  verification path, never silently assumed large or small.

## Critical failures (automatic fail)

- Strawman alternatives (candidates that share the winner's structure or
  receive no genuine attack).
- Fabricated load figures, benchmark numbers, or constraints.
- Recommendation with no stated tradeoff or revisit trigger.
- Producing a full design decision document for a task that needed none
  (negative-activation case).

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Workflow
  execution ≥ 4.
- No criterion at 1; no critical failure.
