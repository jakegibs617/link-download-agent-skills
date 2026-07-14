# Evaluation Rubric — distributed-systems-design

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Risk identification (dominant):** the five betrayals answered per edge;
  hot keys, retry storms, unbounded queues, dual-writes caught. A design
  with an unexamined edge caps this at 3.
- **Instruction adherence:** consistency derived from business consequence;
  exactly-once reduced to mechanism; saga compensations complete.
- **Evidence grounding:** load model sourced or labeled assumed; no
  invented rates.
- **Workflow execution:** invariant → betrayals → semantics → partitioning
  → backpressure → drills, all present.

## Critical failures (automatic fail)

- Exactly-once semantics claimed with no dedupe/outbox mechanism named.
- Dual-write across store + queue endorsed without outbox/CDC or explicit
  accepted-risk.
- Unbounded queue or retry-without-budget in the final design.
- Correctness depending on synchronized clocks without acknowledgment.
- Fabricated load figures presented as sourced.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Risk
  identification ≥ 4.
- No criterion at 1; no critical failure.
