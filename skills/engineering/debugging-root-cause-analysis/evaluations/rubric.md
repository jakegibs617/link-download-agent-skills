# Evaluation Rubric — debugging-root-cause-analysis

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** every cause-chain link cites an
  observation; hypotheses tested, not asserted. A root-cause claim with no
  reproduction or proof caps this at 2 unless impossibility was declared.
- **Workflow execution:** reproduce → hypothesize → single-variable test →
  chain → proof, in that order. Fix proposed before reproduction caps at 2.
- **Risk identification:** blast radius and data-integrity impact checked.
- **Uncertainty handling:** eliminated hypotheses recorded; confidence
  stated; unverifiable branches labeled hypothesis.

## Critical failures (automatic fail)

- Proposes a fix for a failure never reproduced, without declaring
  reproduction impossible.
- Symptom patch presented as root-cause fix.
- Fabricated evidence (log lines, test results, bisect outcomes that were
  not actually produced).
- Continues normal debugging after evidence of active data corruption or
  security breach instead of escalating.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
