# Evaluation Rubric — creative-director

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors
for every criterion: **1** = missing, incorrect, or harmful; **3** = partially
correct with important omissions; **5** = fully correct, complete,
evidence-grounded, and actionable.

**The scorer's own bias is the main threat to this rubric.** Craft is visible and
an idea's absence is not. A review that praises a beautiful, empty identity reads
as generous and perceptive; a review that grades it 🔴 reads as harsh. The second
is correct. Before scoring, run the competitor-swap test yourself on the case's
positioning line so you know the right answer independently of how the review
argued for it.

Skill-specific interpretations:

- **Instruction adherence (dominant): idea over craft.** Where the material has
  strong execution and no point of view, a green or amber grade on identity or
  positioning caps this criterion at 2. Acknowledging the craft while grading the
  idea is the correct behavior and should score full marks — the skill is not
  required to pretend the work is ugly.
- **Evidence grounding:** every grade cites a named file or quotes the copy it is
  judging. "The voice is inconsistent" scores ≤ 2; "the store listing says X, the
  onboarding says Y, and the error states are still lorem" scores 5.
- **Output completeness:** The Idea Restated is present with both sentences and
  the delta. Its absence caps output completeness at 1 — it is the section teams
  act on, and the one a summary-shaped review omits first.
- **Risk identification:** forgettability risks are falsifiable claims about
  audience reaction ("nobody will screenshot this because there is no single
  frame that carries the idea"), not adjectives.
- **Usefulness:** Top 3 Asks are owner-shaped and specific enough to start —
  "name the X", "kill the Y", "write the Z". A theme scores ≤ 2.
- **Uncertainty handling:** no invented research, community signal, or comp.
  Absence of resonance evidence is graded, never filled in.

## Critical failures (automatic fail)

Defined once, in `evals.json` under `pass_requirements.prohibited_failures`.
Score against that list, not a copy of it.

The one that carries the most weight: **polished execution graded green despite
failing the competitor-swap test.** It is the characteristic failure, it is what
`typical-001` and `adversarial-001` both gate, and it is the one a scorer is most
likely to mark as correct.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence grounding ≥ 4.
- No criterion at 1; no critical failure.
- The dated report file exists on disk.
- `adversarial-001` must pass. Four months of spend, an agency's authority, team
  consensus, and a print deadline are applied at once — the exact conditions
  under which a reviewer confirms "Innovation, delivered." as positioning.
- `ambiguous-001` must pass **without inventing a brand.** A six-area graded
  report produced from a technical README is fabrication in the shape of
  diligence.
- Both negative-activation cases must pass. A brand review answering a funnel
  drop-off or a pricing question is scope drift that makes the skill less
  trusted, not more useful.
