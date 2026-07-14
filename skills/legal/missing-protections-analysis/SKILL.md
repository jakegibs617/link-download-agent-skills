---
name: missing-protections-analysis
description: Finds what a contract does NOT say that it should — absent clauses, unaddressed risks, silent allocations, and missing protections a party in the client's position would normally want, given the deal type and the client's role. Use after substantive review to surface gaps, or when asked "what's missing / what should we have asked for". Not for analyzing clauses that ARE present (the substantive skills) or drafting the additions (redline-recommendations).
---

# Missing Protections Analysis

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. What protections
a specific deal legally requires is fact- and jurisdiction-specific; this skill
identifies conventional gaps and flags where counsel should weigh in.

## Purpose

Surface the silent risks — the protections, allocations, and clauses a
well-advised party in the client's position and deal type would normally have,
but this contract lacks — because the most dangerous contract terms are often
the ones that aren't there, and absence review requires knowing what "complete"
looks like for the deal.

## Layered output principle

Separate: (1) **what's absent** (the missing protection, and confirmation it's
genuinely not elsewhere in the document — cited by absence), (2) **practical
consequence** (the risk the silence creates), (3) **materiality** for this deal
and client, (4) **whether the omission is deliberate/acceptable vs a real gap**,
(5) **counsel needed**.

## Inputs

- The full contract and, ideally, the outputs of the substantive review skills
  (so this doesn't re-derive what's present). MUST confirm a protection is
  actually absent before flagging it — "missing" claims require checking the
  whole document, including boilerplate and exhibits.
- The deal type and — critically — which party the client is; a missing
  protection is only a gap relative to a position (a limitation-of-liability
  cap is a gap for the vendor, not the customer).
- The client's actual concerns/risk tolerance if known.

## Procedure

1. **Build the expected-protections model for the deal + role.** For the
   contract type and the client's side, enumerate the protections a
   well-advised party normally secures. E.g. for a customer in a SaaS deal:
   SLA with credits, data-portability/return on exit, security commitments,
   liability floor for data breach, price-increase caps, source-code escrow
   (if critical). The model is role-specific — MUST anchor to the client's
   position, not a generic checklist.
2. **Diff the contract against the model.** For each expected protection,
   confirm whether it's present (anywhere — body, exhibits, boilerplate),
   partial, or absent. MUST verify absence across the whole document before
   flagging; a protection in an exhibit isn't missing.
3. **Add risk-driven gaps beyond the standard model.** From the deal's
   specific facts, identify unaddressed risks: an uncapped indemnity with no
   insurance behind it, data access with no breach-notification duty, a
   dependency with no continuity/escrow, exclusivity with no minimum
   commitment (or minimums with no exclusivity), termination with no
   transition assistance, IP assignment with no license-back. These are gaps
   the model wouldn't list but the facts demand.
4. **Distinguish deliberate silence from a true gap.** Some omissions are
   fine or intentional (no warranty in an explicitly AS-IS bargain; no
   exclusivity in a non-exclusive deal). MUST NOT flag every absence as a
   problem — assess whether the silence is acceptable for this deal, and say
   so. A gap the client knowingly accepts is not a defect.
5. **Assess materiality and likelihood.** Rank each real gap by the
   probability and severity of the risk it leaves open, given the deal — a
   missing data-breach protection in a data-heavy deal outranks a missing
   audit right nobody would use.
6. **Route, don't draft.** For each material gap, name the protection to add
   and hand the drafting to `redline-recommendations` and the leverage
   assessment to `contract-negotiation-strategy`. Flag for counsel where the
   need for a protection is a legal-risk judgment.

## Output Format

```markdown
# Missing-protections analysis: <contract> (client role: ___, deal type: ___)
## Expected-protections model (for this role/deal) and present/partial/absent status
| Expected protection | Status | If absent: consequence | Material? |
## Risk-driven gaps beyond the standard model (fact-specific)
## Deliberate/acceptable silences (explicitly NOT flagged as defects, with why)
## Material gaps ranked (probability × severity)
## Routing: → redline-recommendations (drafting), → contract-negotiation-strategy (leverage)
## Counsel-required judgments + information needed
```

## Quality Checklist

- [ ] Expected-protections model anchored to the client's specific role and deal type.
- [ ] Each "missing" protection verified absent across the whole document.
- [ ] Fact-specific risk gaps added beyond the standard model.
- [ ] Deliberate/acceptable silences distinguished from true gaps.
- [ ] Gaps ranked by materiality (probability × severity).
- [ ] Additions routed to drafting/negotiation, not drafted here.

## Failure Conditions

- **Role-blind checklist:** flagging protections that only matter for the
  other side (a liability cap "missing" for the party it would protect
  against).
- **False-absence claims:** flagging something as missing that's in an exhibit
  or the boilerplate — the credibility-killer; MUST verify.
- **Everything-is-a-gap:** treating every conceivable clause as a required
  protection, ignoring that some silences are fine.
- **Generic model:** a one-size checklist not tuned to the deal type.
- **Materiality flattening:** listing gaps without ranking, so the reader can't
  tell the data-breach hole from the missing recital.
- **Drafting here:** producing redline language instead of routing it.
- **Escalate to counsel** when: whether a protection is legally necessary is a
  risk judgment; a gap touches a regulated area (data, employment, consumer);
  or the absence could be an enforceability problem, not just a commercial one.

## Related skills

- The substantive review skills — supply what IS present so this finds what
  isn't.
- `redline-recommendations` — drafts the additions.
- `contract-negotiation-strategy` — prioritizes which gaps to fight for.
- `signature-readiness-assessment` — consumes the material-gap list.
