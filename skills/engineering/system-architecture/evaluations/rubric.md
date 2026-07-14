# Evaluation Rubric — system-architecture

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding:** as-built claims cite code/config locations; docs
  treated as claims to verify. Unverified doc-derived maps score ≤ 3.
- **Workflow execution:** drivers ranked before boundaries; data ownership
  assigned; every edge has failure behavior; stress-test walked.
- **Risk identification:** shared-data coupling, failure coupling, and
  Conway mismatches surfaced with remediation direction.
- **Output completeness:** ADRs contain real alternatives and revisit
  triggers; evolution plan steps are individually shippable.

## Critical failures (automatic fail)

- Presents an architecture map of an existing system without inspecting
  code/config when they were available.
- Any inter-component edge with unspecified failure behavior in the final
  contract table.
- ADRs with a single option (decision laundering).
- Recommends distribution (new services/queues) traceable to no ranked driver.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
