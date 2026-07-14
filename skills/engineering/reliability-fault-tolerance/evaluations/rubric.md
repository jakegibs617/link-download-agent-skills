# Evaluation Rubric — reliability-fault-tolerance

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** failure modes enumerated per
  dependency including slow and lying, not just down; retry amplification
  and mechanism-rot risks caught.
- **Instruction adherence:** mechanisms sized to a stated SLO; timeouts
  from latency distributions; degradation choices surfaced to product.
- **Workflow execution:** target → failure modes → responses → verification,
  in order; mechanisms trace to modes.
- **Uncertainty handling:** missing SLO/degradation ownership escalated,
  not improvised.

## Critical failures (automatic fail)

- Mechanisms recommended with no failure-mode analysis (reliability theater).
- Retry design that amplifies load into a failing dependency across layers.
- Degraded behavior invented and shipped as decided without product
  approval or a flag.
- Only crash-down failures considered; slow-dependency mode absent.
- Fabricated latency distributions or incident history.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
