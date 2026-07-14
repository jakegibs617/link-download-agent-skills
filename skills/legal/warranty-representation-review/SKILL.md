---
name: warranty-representation-review
description: Analyzes what each party promises to be true (representations) and guarantees about performance (warranties) — scope, qualifiers, survival periods, disclaimers, and the remedies actually available on breach. Use to review reps & warranties or disclaimer language in any contract. Not for the liability caps that price a breach (liability-indemnification-review), IP ownership promises specifically (ip-ownership-review), or general obligation extraction (rights-obligations-extraction).
---

# Warranty and Representation Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. The legal
effect of disclaimers (including implied-warranty disclaimers) is
jurisdiction-specific; this skill flags such points for counsel.

## Purpose

Make explicit what each party is actually promising, how strongly, for how
long, and what happens when a promise turns out false — including what has
been quietly disclaimed away — because a warranty section's real content is
often defined by its qualifiers and disclaimers, not its headlines.

## Layered output principle

Separate: (1) **what is promised/disclaimed** (cited fact), (2) **practical
consequence** (what you can rely on and what remedy you'd actually get),
(3) **risk** (hollow warranties, one-sided reps, disclaimer overreach),
(4) **missing info**, (5) **counsel needed**.

## Inputs

- The full contract — warranties interact with remedies, liability caps,
  indemnities, and acceptance provisions elsewhere in the document.
- Which party you represent, and what the client actually needs to rely on
  (product works? counterparty owns the IP? data is accurate? authority to
  sign?).

## Procedure

1. **Inventory every rep and warranty, per party.** Mutual/basic (authority,
   no-conflict, compliance with law) and deal-specific (performance to spec,
   non-infringement, no open-source contamination, data accuracy, condition
   of assets, financial statements). Cite each. Note which party gives which
   — a one-way warranty section is itself a finding.
2. **Read each promise at its actual strength.** Qualifiers change everything:
   knowledge qualifiers ("to Seller's knowledge" — and is knowledge defined as
   actual vs constructive?), materiality qualifiers ("in all material
   respects"), time limits ("as of the Effective Date" vs continuing), and
   scope carve-outs ("except as disclosed in Schedule X" — is the schedule
   attached?). MUST record the qualified promise, not the headline.
3. **Map the disclaimers.** The AS-IS / implied-warranty disclaimer
   (merchantability, fitness for purpose, non-infringement), its
   conspicuousness, and exactly which express warranties survive it. A broad
   disclaimer following a narrow warranty section can leave almost nothing
   promised — compute the net. Whether an implied-warranty disclaimer is
   effective is jurisdiction-specific → counsel flag.
4. **Find the remedy for breach — the part that matters.** Exclusive-remedy
   clauses ("sole and exclusive remedy shall be repair or replacement"),
   warranty claim periods (report within X days), and how the remedy
   interacts with the liability cap and indemnities. A warranty with a
   repair-only exclusive remedy and a short claim window is weaker than it
   looks — MUST trace promise → breach → actual remedy.
5. **Check survival.** How long do reps/warranties survive (closing,
   termination, a stated period)? Expired warranties are no warranties;
   survival mismatched to when defects surface is a real gap.
6. **Test against the client's reliance needs.** For each thing the client
   must be able to rely on: is there a warranty covering it, at what
   strength, with what remedy? Absences route to
   `missing-protections-analysis`.
7. **Assess the net position (separate layer):** what is genuinely promised
   vs. theater; asymmetries; disclaimer overreach; ranked issues.

## Output Format

```markdown
# Warranty & representation review: <contract>
## Rep/warranty inventory
| Promise | Given by | Qualifiers (knowledge/materiality/time/schedule) | Survival | § |
## Disclaimers (what's disclaimed; net of express warranties vs disclaimer) [cited]
## Remedy trace (promise → breach → actual available remedy, incl. exclusive-remedy and claim windows)
## Reliance-needs check (client's needs vs coverage; gaps → missing-protections-analysis)
## Net position & ranked issues (separate layer)
## Counsel-required items (disclaimer effectiveness, implied warranties) + information needed
```

## Quality Checklist

- [ ] Every rep/warranty inventoried with its giver and citation.
- [ ] Qualifiers (knowledge/materiality/time/schedule) preserved, not dropped.
- [ ] Disclaimer net computed against the express warranties.
- [ ] Remedy traced end-to-end incl. exclusive-remedy and claim windows.
- [ ] Survival periods checked against when breaches would surface.
- [ ] Referenced disclosure schedules confirmed attached or flagged.
- [ ] Facts, remedy math, and risk judgment in separate layers.

## Failure Conditions

- **Headline reading:** reporting "vendor warrants performance" while a
  knowledge qualifier, short claim window, and repair-only remedy hollow it out.
- **Qualifier erasure:** dropping "to Seller's knowledge" or "material" and
  overstating the promise — the mirror error of headline reading.
- **Disclaimer skim:** missing that the AS-IS clause swallows the implied
  warranties the client assumed it had.
- **Remedy blindness:** analyzing promises without the exclusive-remedy
  clause that defines their worth.
- **Schedule trust:** accepting "except as disclosed in Schedule X" without
  checking Schedule X exists.
- **Enforceability opinions** on disclaimers — counsel's call.
- **Escalate to counsel** when: implied-warranty disclaimer effectiveness or
  consumer-protection statutes are in play (jurisdiction-specific); a rep
  approaches a fraud/misrepresentation question; or the client intends to
  rely on something no warranty covers in a high-stakes deal.

## Related skills

- `liability-indemnification-review` — the caps/indemnities that price a
  warranty breach; remedies interact.
- `ip-ownership-review` — non-infringement/ownership warranties in depth.
- `missing-protections-analysis` — absent warranties the client's position needs.
- `contract-negotiation-strategy` — turning hollow warranties into asks.
