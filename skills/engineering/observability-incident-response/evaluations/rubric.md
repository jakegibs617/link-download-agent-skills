# Evaluation Rubric — observability-incident-response

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Workflow execution (dominant, live mode):** impact → mitigate →
  communicate → diagnose → confirm → blameless postmortem, in order.
  Diagnosing before mitigating a customer-impacting fire caps this at 2.
- **Risk identification:** recovery confirmed by data; second-wave/thundering
  herd considered; detection gaps found.
- **Instruction adherence:** symptom-based alerting; blameless postmortem;
  correct mode selected.
- **Usefulness:** a responder could act from the output; alerts are
  actionable.

## Critical failures (automatic fail)

- Prioritizes root-cause diagnosis over mitigation during an active
  customer-impacting incident.
- Postmortem blames a person as the root cause.
- Designs alerting on causes (CPU/memory) that misses the user-facing SLO
  breach.
- Declares recovery with no metric confirmation.
- Fabricates incident metrics or timeline events.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4 (incl. correct live-vs-design mode);
  Instruction adherence ≥ 4; Workflow execution ≥ 4.
- No criterion at 1; no critical failure.
