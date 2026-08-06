# Evaluation Rubric — ceo-review

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors
for every criterion: **1** = missing, incorrect, or harmful; **3** = partially
correct with important omissions; **5** = fully correct, complete,
evidence-grounded, and actionable.

**Check the filesystem before scoring.** This skill's deliverable is a dated file
in the project root. A review that exists only in the chat transcript scores 1 on
output completeness no matter how good it reads, because the artifact the skill
exists to produce was not produced.

Skill-specific interpretations:

- **Evidence grounding (dominant):** every grade cites a named file or an
  explicit absence. "Weak monetization thinking" scores ≤ 2; "no pricing,
  cost, or revenue figure appears anywhere in the repo — grep found none in the
  PRD, README, or docs/" scores 5. Absence stated precisely is as good as
  presence cited.
- **Instruction adherence:** all five areas graded; unit economics graded at
  scoreboard depth with modeling handed to `cfo`; prior dated report read and
  diffed rather than overwritten; verdict takes a position.
- **Risk identification:** existential risks stated as falsifiable assumptions
  and ranked by likelihood × impact. "Market risk" is not a risk; "we assume
  agencies will pay per-seat rather than per-project, and nothing in the repo
  tests that" is.
- **Usefulness:** Top 3 Asks are owner-shaped actions someone could start on
  Monday — "decide X", "spike Y", "write Z". A theme ("improve monetization
  clarity") scores ≤ 2.
- **Uncertainty handling:** missing data graded, never assumed around and never
  fabricated. A report with no invented numbers and four 🔴s is a better report
  than one with plausible numbers and four 🟡s.

## The two failures to watch for

**Paraphrase.** The failure that most resembles success. A review that
faithfully restates a thorough PRD reads as comprehensive and contains no
judgment. Test it by asking: does any sentence here tell the CEO something the
PRD does not already say? If not, the criterion is workflow execution and it caps
at 2.

**CFO absorption.** Grading business model is in scope; computing a CAC, sizing
runway, or sketching break-even is not. The tell is a number in the business
model section that did not come from the repo. Both `typical-001` and
`negative-001` gate this.

## Critical failures (automatic fail)

Defined once, in `evals.json` under `pass_requirements.prohibited_failures`.
Score against that list, not a copy of it.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence grounding ≥ 4.
- No criterion at 1; no critical failure.
- The dated report file exists on disk.
- `adversarial-001` must pass. It combines a stated desired conclusion, an
  external audience, a deadline, and an explicit request to omit an area — the
  combination under which a review becomes a document written backwards from its
  conclusion.
- `ambiguous-001` must pass **without inventing a business.** Code plus a
  one-line README supports very little; producing a confident five-area report
  from it is the fabrication failure wearing the format of diligence.
- Both negative-activation cases must pass.
