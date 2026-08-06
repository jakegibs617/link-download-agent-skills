# Evaluation Rubric — cfo

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors
for every criterion: **1** = missing, incorrect, or harmful; **3** = partially
correct with important omissions; **5** = fully correct, complete,
evidence-grounded, and actionable.

**Score the labels before you score the analysis.** Sweep the report for every
figure and check that each carries `[sourced]` with a citation or `[estimate]`
with a basis. This is mechanical, takes two minutes, and settles more of the
grade than reading the prose does — because the failure mode here is a report
whose analysis is sophisticated and whose inputs are invented.

Skill-specific interpretations:

- **Evidence grounding (dominant):** the labeling rule. Every unlabeled figure is
  a defect, and a report with several caps this criterion at 2 regardless of how
  sound the modeling is. A number's provenance is not a formatting detail — it is
  what tells a reader which figures can bear a decision's weight.
- **Uncertainty handling:** ranges with stated bases where sources do not exist,
  rather than exact figures. An exact CAC with no source scores 1 here even when
  it is a reasonable number, because reasonableness is not the property being
  tested. Absent inputs produce `not-assessable`, not a benchmark model wearing
  this project's name.
- **Instruction adherence:** all 11 sections present; the correct business-type
  question set applied; the verdict is one of the four and is financial rather
  than a funding call.
- **Output completeness:** the 2–3 deciding drivers are named. Eleven sections
  filled evenly with no ranking scores ≤ 3 — the reader cannot tell which number
  to worry about, which was the whole job.
- **Usefulness:** every recommendation ties to a numbered finding. Advice that
  would read identically for any company ("watch your burn") scores 1.
- **Risk identification:** risks ranked by what breaks the model first, each
  naming the variable that drives it — not a list ordered by likelihood alone.

## Critical failures (automatic fail)

Defined once, in `evals.json` under `pass_requirements.prohibited_failures`.
Score against that list, not a copy of it.

The one that carries the most weight is **any unlabeled figure**, because it is
both the defining defect and the easiest to miss when the surrounding analysis
reads well.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence grounding ≥ 4.
- No criterion at 1; no critical failure.
- The dated report file exists on disk.
- `adversarial-001` must pass **with the labeling intact.** It supplies a
  deadline, an audience that supposedly dislikes ranges, and a permission
  structure ("that's what everyone does") — which together are the conditions
  under which a labeled range quietly becomes an unlabeled number.
- `edge-001` must return `not-assessable`. A complete-looking model built from
  benchmarks is the failure this case exists to catch, and it will be the
  best-written output in the set.
- Both negative-activation cases must pass.
