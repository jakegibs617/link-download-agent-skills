---
name: liability-indemnification-review
description: Analyzes who pays when things go wrong — limitation-of-liability caps and exclusions, carve-outs, consequential-damages waivers, and indemnification obligations (scope, triggers, procedure, caps) — mapping the real worst-case exposure for each party. Use to review liability/indemnity provisions or quantify exposure under a contract. Not for insurance requirements (insurance-requirements-review), warranty content (warranty-representation-review), or general obligations (rights-obligations-extraction).
---

# Liability and Indemnification Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Enforceability
of liability limits and indemnities is jurisdiction-specific (some exclusions
are void by statute); this skill flags such points for counsel.

## Purpose

Answer, with citations: if things go badly, who pays, how much, for what, and
through what mechanics — reconstructing the actual worst-case exposure each
party faces after the caps, exclusions, carve-outs, and indemnities interact,
because the headline cap is rarely the real number.

## Layered output principle

Separate: (1) **what the contract says** (cap/exclusion/indemnity language,
cited), (2) **practical consequence** (the real exposure math and mechanics),
(3) **risk** (asymmetries, uncapped exposures, hollow indemnities),
(4) **missing info**, (5) **counsel needed** (enforceability, statutory limits).

## Inputs

- The full contract — liability interacts with warranties, indemnities,
  insurance, and confidentiality across the document; MUST read the
  interacting clauses, not the liability section alone.
- Which party you represent, and the deal's realistic damage scenarios (data
  breach, IP claim, personal injury, pure economic loss) to test the
  provisions against.

## Procedure

1. **Extract the limitation-of-liability architecture.** The cap (fixed sum,
   fees-paid multiple, or fees-in-trailing-12-months — compute what it
   actually is), the consequential/indirect/special/punitive damages waiver,
   and whether limits are mutual or one-sided. MUST state the cap as a real
   number/formula, not just quote it.
2. **Map the carve-outs — where the real exposure lives.** What is excluded
   from the cap and/or the consequential waiver: indemnification obligations,
   confidentiality breach, IP infringement, gross negligence/willful
   misconduct, data breach, payment obligations. For each carve-out: is the
   exposure then *uncapped*, or subject to a super-cap? Whose obligations do
   the carve-outs mostly expose? Asymmetric carve-outs are the classic trap —
   MUST check symmetry carve-out by carve-out.
3. **Dissect each indemnity.** For every indemnification clause: indemnitor →
   indemnitee, covered claims (third-party only, or first-party too?),
   trigger (alleged vs finally adjudicated), scope (losses, defense costs,
   settlements), the defense/control-of-defense and settlement-consent
   procedure, notice requirements, and any exclusions (e.g. IP indemnity void
   if the customer modified the product). An indemnity with a hostile
   procedure or broad exclusions can be hollow — assess the mechanics, not
   just the existence.
4. **Run the interaction math.** Is the indemnity inside or outside the
   liability cap? Does the consequential waiver gut the indemnity (third-party
   damages are often "consequential")? Do warranty disclaimers cut off the
   claims the indemnity would cover? MUST trace at least the top 2–3 realistic
   damage scenarios end-to-end: what could our side actually recover / owe?
5. **Check the statutory red flags — and route them.** Exclusions that some
   jurisdictions void (death/personal injury from negligence, fraud, statutory
   consumer rights); "gross negligence" carve-outs whose meaning varies by
   jurisdiction. Flag for counsel; MUST NOT opine on enforceability.
6. **Assess the net position (separate layer).** Each party's realistic
   worst case per scenario; asymmetries ranked; hollow protections named.
   Negotiation asks hand to `contract-negotiation-strategy`.

## Output Format

```markdown
# Liability & indemnification review: <contract>
## Cap architecture (cap as computed number/formula; waiver; mutuality) [cited]
## Carve-outs
| Carve-out | From cap / from waiver | Resulting exposure (uncapped? super-cap?) | Whose risk | § |
## Indemnities
| Indemnitor → Indemnitee | Claims covered | Trigger | Procedure/control | Exclusions | Inside cap? | § |
## Scenario walk-throughs (top 2–3 realistic damages, end-to-end recovery/exposure)
## Statutory/enforceability flags (→ counsel)
## Net position: each party's realistic worst case; ranked asymmetries
## Counsel-required items + information needed
```

## Quality Checklist

- [ ] Cap computed as a real number/formula, not just quoted.
- [ ] Every carve-out mapped with its resulting exposure and symmetry checked.
- [ ] Each indemnity's procedure and exclusions analyzed, not just its existence.
- [ ] Indemnity-vs-cap and waiver-vs-indemnity interactions traced.
- [ ] At least two realistic damage scenarios walked end-to-end.
- [ ] Enforceability questions flagged for counsel, not answered.
- [ ] Facts, exposure math, and risk judgment kept in separate layers.

## Failure Conditions

- **Headline-cap myopia:** reporting "liability capped at fees paid" while a
  carve-out leaves the client's main exposure uncapped.
- **Symmetry assumption:** missing that the carve-outs exempt *their*
  favorite claims and cap *yours*.
- **Existence-equals-protection:** treating an indemnity as protective without
  checking its trigger, procedure, and exclusions.
- **Interaction blindness:** analyzing the cap and the indemnity separately
  when the question is how they compose.
- **Enforceability opinions:** declaring an exclusion void/enforceable —
  that's counsel's call; flag it.
- **Fabricated exposure figures:** inventing damage estimates with no basis.
- **Escalate to counsel** when: statutory limits on exclusions may apply;
  the indemnity/cap interaction is genuinely ambiguous; or exposure could be
  existential for the client (bet-the-company terms deserve a lawyer).

## Related skills

- `warranty-representation-review` — the promises whose breach these clauses
  price; disclaimers interact with indemnities.
- `insurance-requirements-review` — whether insurance actually stands behind
  the indemnities.
- `confidentiality-data-protection-review` — data-breach liability specifics.
- `contract-negotiation-strategy` / `redline-recommendations` — turning
  asymmetries into asks.
