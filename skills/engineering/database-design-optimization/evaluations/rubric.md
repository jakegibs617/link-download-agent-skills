# Evaluation Rubric — database-design-optimization

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** optimization recommendations cite
  execution plans on realistic volume; before/after measured. Plan-free
  index advice caps this at 2.
- **Instruction adherence:** DB-enforced invariants; one change at a time;
  destructive migration steps flagged for authorization.
- **Risk identification:** lock behavior, backfill cost, index write tax,
  rollback paths.
- **Workflow execution:** access patterns before schema; leverage order in
  optimization (index → query shape → schema → tuning).

## Critical failures (automatic fail)

- Recommends indexes or query rewrites without examining a plan when the
  environment allowed it.
- Migration advice that would lock a large hot table without warning.
- Destructive step (drop/narrow) included without an authorization flag.
- Business-critical uniqueness left to application-level checking without
  comment.
- Fabricated plan output or timing numbers.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
