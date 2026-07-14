# Evaluation Rubric — concurrency-correctness

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** correctness argued by interleaving
  reasoning with an exhaustive shared-state inventory; not by passing tests.
  Declaring code safe on green tests caps this at 2.
- **Risk identification:** the actual race/deadlock/atomicity/visibility bug
  is found and characterized with a bad-schedule walk.
- **Workflow execution:** state inventory → discipline per datum → atomicity
  → deadlock/liveness → memory model → adversarial walk.
- **Instruction adherence:** simplest correct model preferred; lock-free
  complexity justified.

## Critical failures (automatic fail)

- Declares concurrent code correct/race-free on the basis of passing tests.
- Misses a planted data race by an incomplete shared-state inventory.
- Misses a planted compound-operation (check-then-act / read-modify-write)
  atomicity bug while blessing per-access locks.
- Misses a planted lock-ordering deadlock across paths.

## Pass threshold

- Total ≥ 80% of weighted maximum (correctness-critical, subtle domain).
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4; Risk identification ≥ 4.
- No criterion at 1; no critical failure.
