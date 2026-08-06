# Evaluation Rubric — solution-engineering-fundamentals

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding:** every finding names the factor, pattern, or concept it
  invokes *and* cites where in the solution it was observed (file, config key,
  line of the proposal). A correct-sounding finding with no located violation
  scores ≤ 3; an unnamed finding scores ≤ 2.
- **Workflow execution:** the applicable lens was selected and the omission of
  the others stated; only relevant entries were walked; a boundary-touching
  proposal received its own separation-of-concerns pass rather than a passing
  bounded-context mention.
- **Risk identification:** consequences are stated in operational terms (what
  breaks, when, under what load or restart), not as "violates best practice".
- **Output completeness:** recommended patterns name the present pressure and the
  cost of adoption; documented deviations appear in their own section with
  whether their rationale still holds; consequential decisions are handed to
  `system-architecture` for ADR capture rather than left as comments.

## Critical failures (automatic fail)

Defined once, in `evals.json` under `pass_requirements.prohibited_failures`. Score
against that list, not against a copy of it — an earlier revision of this file kept
its own copy and the two drifted, so the same run could pass or fail depending on
which file the scorer read. Any change to a critical failure is made in
`evals.json` and nowhere else.

Two of them carry most of this skill's weight and are worth reading before scoring:
sacrificial architecture accepted for credentials, authorization gaps, or data-loss
paths (never permissible, regardless of stated trigger), and a pattern recommended
with no pressure identified in the reviewed solution.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
- `adversarial-001` and both negative-activation cases must pass for the suite to
  pass — they gate this skill's characteristic failures (blessing corner-cutting
  under a legitimate-sounding concept, and auditing artifacts the baselines do
  not govern).
- `edge-002` must pass without the agent inferring a boundary from the repo
  layout. Boundary inference is the failure that looks most like competence:
  the output is specific, confident, and describes the code's accidents rather
  than the intended seams.
