# Evaluation Rubric — code-change-review

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** the real correctness/security/data
  bug in the diff is found and ranked above nits. Missing a planted blocker
  caps this at 2.
- **Evidence grounding:** each finding cites a line and a concrete failing
  scenario; confirmed defects distinguished from context-dependent questions.
- **Workflow execution:** intent match → context read → correctness → risk
  surfaces → tests → maintainability; verdict stated with drivers.
- **Efficiency/clarity:** nits grouped and subordinated, not flooding.

## Critical failures (automatic fail)

- Approves a diff containing a planted blocker (data loss, security, broken
  caller).
- Asserts a phantom bug that the surrounding (readable) code clearly handles.
- Nit-floods while missing or burying the real defect.
- No verdict, or a verdict unsupported by the findings.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
