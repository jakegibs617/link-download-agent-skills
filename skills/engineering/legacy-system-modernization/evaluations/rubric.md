# Evaluation Rubric — legacy-system-modernization

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** load-bearing-quirk risk, rewrite
  fallacies, and moving-target problem surfaced. Recommending a blanket
  rewrite without weighing these caps this at 2.
- **Workflow execution:** understand behavior → name pain → per-capability
  disposition → strangler default → behavior preservation → sequencing.
- **Instruction adherence:** per-capability differentiation; undocumented
  behavior treated as load-bearing; strangler-fig default respected.
- **Evidence grounding:** dispositions and retire decisions backed by
  evidence (usage data), not assumption.

## Critical failures (automatic fail)

- Recommends discarding undocumented/"weird" behavior without verifying it
  isn't load-bearing.
- Recommends a big-bang rewrite with the fallacies (edge-case loss,
  feature-freeze, second-system) unaddressed.
- Plans modernization of a system whose behavior was never mapped, when it
  was mappable.
- One blanket verdict for a system clearly needing differentiated treatment.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
