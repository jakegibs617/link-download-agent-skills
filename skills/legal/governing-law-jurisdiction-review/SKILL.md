---
name: governing-law-jurisdiction-review
description: Analyzes choice-of-law, forum-selection, and venue provisions — which law governs, where disputes must be brought, exclusivity of the forum, service-of-process terms, and the practical burden the choices impose on each party. Use to review governing-law/venue clauses or assess cross-border contract exposure. Not for the dispute mechanism itself (dispute-resolution-review) or substantive local-law compliance (regulatory-compliance-review). Never predicts how a court would rule.
---

# Governing Law and Jurisdiction Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Whether a
choice-of-law or forum clause will be honored, and what mandatory local rules
override it, are jurisdiction-specific determinations for counsel; this skill
flags them.

## Purpose

Make explicit which law and which courts the parties are choosing, how
airtight those choices are drafted, and what practical burden they place on
each side — because "governed by the laws of X, courts of Y" quietly decides
travel costs, home-field advantage, and which party can realistically afford
to enforce anything.

## Layered output principle

Separate: (1) **what the clause chooses** (cited), (2) **practical
consequence** (whose home field, what burden to sue/defend there), (3)
**risk** (gaps, non-exclusive forums, law/forum mismatches), (4) **missing
info**, (5) **counsel needed** (mandatory local law, enforceability of the
choices, treaty/recognition issues).

## Inputs

- The governing-law and forum/venue clauses, plus the dispute-resolution
  clause (arbitration seats interact — coordinate with
  `dispute-resolution-review`).
- The parties' locations, assets, and where performance happens (the
  practical-burden analysis depends on them).
- Which party you represent.

## Procedure

1. **Extract the choice of law precisely.** Which jurisdiction's law; whether
   the clause excludes conflict-of-laws principles (renvoi language); whether
   it excludes specific bodies of law (e.g. the CISG for international sales
   of goods — its silent applicability is a classic trap; MUST check for a
   CISG exclusion in cross-border goods deals); and whether the choice covers
   non-contractual/tort claims arising from the relationship or only the
   contract itself (scope wording matters).
2. **Extract the forum selection and test its exclusivity.** Exclusive
   ("shall be brought only in") vs non-exclusive ("submit to the
   jurisdiction of") — non-exclusive consent clauses permit suit there but
   don't prevent suit elsewhere; the difference is routinely misread. MUST
   classify the clause correctly and note asymmetric forms (exclusive for
   one party's claims, non-exclusive for the other's).
3. **Check law/forum coherence.** Forum in one place applying another
   place's law is workable but adds cost/expert-proof friction; forum with
   no rational connection to the parties may face enforceability questions
   (counsel flag). Arbitration seat vs governing law vs institutional rules —
   check the triangle is consistent.
4. **Assess the practical burden per party.** For each side: distance,
   language, cost, and pace of the chosen forum; where the counterparty's
   assets are (a judgment you can't enforce where the assets sit is
   decorative — recognition/enforcement across borders is a counsel-level
   flag); and any waiver of sovereign/forum objections.
5. **Check the supporting mechanics:** service-of-process provisions
   (agent appointment for foreign parties), waiver of inconvenient-forum
   objections, and language of proceedings.
6. **Flag what the choices cannot do.** Choice of law generally can't
   contract around mandatory local protections (consumer, employment,
   data-protection, franchise rules) — where the deal touches such areas,
   flag the mandatory-law question for counsel. MUST NOT assert which
   mandatory rules apply; flag the exposure.
7. **Assess net position (separate layer):** whose home field, what it costs
   the client to enforce or defend, missing/gap findings ranked; asks to
   `contract-negotiation-strategy`.

## Output Format

```markdown
# Governing law & jurisdiction review: <contract>
## Choice of law (jurisdiction, conflicts exclusion, CISG handling, tort-claim scope) [cited]
## Forum selection (exclusive vs non-exclusive — classified; asymmetries) [cited]
## Law/forum/seat coherence check
## Practical burden per party (distance, cost, language, assets/enforcement reach → counsel for recognition)
## Supporting mechanics (service of process, objections waivers)
## Mandatory-law exposure flags (consumer/employment/data — → counsel)
## Net position & ranked issues (separate layer)
## Counsel-required items + information needed
```

## Quality Checklist

- [ ] Choice of law extracted with scope (tort claims?) and CISG handling
      checked for cross-border goods.
- [ ] Forum clause classified exclusive vs non-exclusive correctly.
- [ ] Asymmetric law/forum rights flagged.
- [ ] Practical burden assessed from each party's actual location/assets.
- [ ] Enforcement/recognition of judgments flagged for counsel where cross-border.
- [ ] Mandatory-local-law limits flagged, not adjudicated.
- [ ] No prediction of how a court would treat the clauses.

## Failure Conditions

- **Exclusivity misread:** treating a non-exclusive submission clause as
  preventing suit elsewhere (or vice versa) — the classic error.
- **CISG blindness:** missing that an unexcluded CISG may govern a
  cross-border goods contract.
- **Burden abstraction:** analyzing the clauses without the parties'
  real locations and assets.
- **Enforceability prediction:** declaring the forum clause will/won't be
  honored, or which mandatory laws override — counsel calls.
- **Scope skim:** missing that the clause covers only contractual claims,
  leaving tort claims to conflicts rules.
- **Escalate to counsel** when: mandatory local protections may override;
  cross-border judgment recognition matters; the forum has no rational
  connection to the deal; or a dispute is imminent.

## Related skills

- `dispute-resolution-review` — the mechanism running inside this forum/law
  frame.
- `regulatory-compliance-review` — the substantive local-law exposure.
- `contract-negotiation-strategy` — home-field rebalancing asks.
