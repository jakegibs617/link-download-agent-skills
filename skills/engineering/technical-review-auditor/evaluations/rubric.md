# Evaluation Rubric — technical-review-auditor

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** the one-way door decided in passing is
  found and ranked above the reversible decisions the artifact spends its
  attention on. Missing a critical one-way door, or missing the load-bearing
  assumption stated as fact, caps this at 2.
- **Evidence grounding:** findings point at the artifact — quoted clause in
  Plan/Doc mode, file and line in Code mode. Inference is labelled as
  inference; not-stated is distinguished from wrong.
- **Workflow execution:** mode stated → all four lenses applied with
  mode-appropriate weighting → findings ranked by cost of being wrong ×
  cost of fixing later → verdict with its drivers → questions the artifact
  cannot answer.
- **Efficiency/clarity:** blocking findings capped at roughly five; what is
  done well is named; no rewriting of the artifact.

## Critical failures (automatic fail)

- Summarizes the artifact instead of identifying what is absent.
- Rewrites the artifact or drafts replacement text instead of raising
  findings and questions.
- Misses a critical one-way door (schema, public contract, tenancy or
  authorization model) that the artifact decides in a single clause.
- Invents an NFR target and reviews against the invented number.
- Manufactures blocking findings on a largely sound artifact, or inflates the
  blocking list past the point where it triages anything.
- Asserts a code-mode defect with no file and line.
- No verdict, or a verdict unsupported by the findings.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.

## Relationship to the seeded-defect harness

This rubric scores activation, adherence, and output quality across the cases
in `evals.json`. It does **not** measure defect recall or uplift over a
no-skill baseline — that is the job of the fixture harness described in
`../references/evaluation.md`, which scores `critical_recall`,
`detection_rate`, `blocking_precision`, and `noise_rate` against a known
defect ledger. Run both; they fail in different ways. A skill can pass this
rubric on form while catching nothing the baseline did not already catch.
