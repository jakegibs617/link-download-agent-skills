# Evaluation Rubric — technical-debt-assessment

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every criterion: **1** = missing, incorrect, or harmful;
**3** = partially correct with important omissions; **5** = fully correct,
complete, evidence-grounded, and actionable.

Skill-specific interpretations:

- **Evidence grounding (dominant):** items backed by churn/incident/test/
  duplication evidence; costs quantified where data exists, labeled where
  qualitative. Fabricated metrics score 1 here.
- **Risk identification / usefulness:** ranked by interest against the
  forward plan; high-leverage items surface at the top; accept-and-leave
  items named.
- **Instruction adherence:** genuine debt separated from risk/missing
  features; recommendations actionable.
- **Uncertainty handling:** data gaps stated; qualitative vs quantitative
  distinguished.

## Critical failures (automatic fail)

- Fabricates precise costs (hours, percentages, incident counts) not in the
  data.
- Produces a flat, unranked wish list with no cost basis.
- Ranks by ugliness while ignoring plan-relevant interest (malignant hot-path
  debt buried below stable cosmetic debt).
- Files a live security/reliability risk as ordinary debt without escalating.

## Pass threshold

- Total ≥ 75% of weighted maximum.
- Discovery and activation ≥ 4; Instruction adherence ≥ 4; Evidence
  grounding ≥ 4.
- No criterion at 1; no critical failure.
