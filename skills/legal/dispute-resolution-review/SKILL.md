---
name: dispute-resolution-review
description: Analyzes how disputes under a contract get resolved — arbitration vs litigation, escalation ladders, class-action and jury waivers, fee-shifting, injunctive-relief carve-outs, and the practical cost/leverage each mechanism creates. Use to review dispute-resolution, arbitration, or remedies provisions. Not for governing law and forum selection (governing-law-jurisdiction-review, though they interact) or the substantive claims themselves (the relevant substantive skills).
---

# Dispute Resolution Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Enforceability
of arbitration clauses, class waivers, and jury waivers is jurisdiction-
specific; this skill flags such points for counsel.

## Purpose

Make explicit how a fight under this contract would actually play out — in
what forum, through what mandatory steps, at whose cost, with what waived —
and who the mechanism structurally favors, because dispute clauses allocate
leverage long before any dispute exists.

## Layered output principle

Separate: (1) **what the clause requires** (cited), (2) **practical
consequence** (the path, cost, and speed of an actual dispute), (3) **risk/
leverage** (who the mechanism favors), (4) **missing info**, (5) **counsel
needed** (enforceability, jurisdiction interactions).

## Inputs

- The dispute-resolution provisions and the full contract (carve-outs,
  indemnity procedures, and termination interact), plus the governing-law
  clause (coordinate with `governing-law-jurisdiction-review`).
- Which party you represent, their size/resources relative to the
  counterparty, and the realistic dispute types (payment, IP, data breach,
  termination) — leverage depends on who would likely be suing whom.

## Procedure

1. **Map the mandatory path.** Escalation ladder (negotiation → executives →
   mediation → arbitration/litigation): each step's trigger, timeline, and
   whether it's a condition precedent. Check the ladder can't be weaponized
   for delay (no deadlines = a stall tool). Note carve-outs that skip the
   ladder (injunctive relief, IP, payment collection).
2. **If arbitration: extract the full architecture.** Institution and rules
   (named? existing?), seat, number/selection of arbitrators, language,
   confidentiality, discovery scope, and who pays (fee allocation matters
   enormously for smaller parties). Check what's excluded from arbitration
   and whether the clause is mutual — a clause forcing one party to
   arbitrate while the other may litigate is a leverage asymmetry to flag.
3. **Inventory the waivers.** Class-action waiver, jury-trial waiver,
   waiver of appeal (inherent in most arbitration), and any shortened
   limitations period for bringing claims ("no claim more than 1 year after
   the event" — a quiet claims-killer; MUST surface it). Enforceability of
   each waiver → counsel flag.
4. **Analyze fee-shifting and cost allocation:** loser-pays vs each-own-costs
   vs one-way fee-shifting (only the drafter recovers fees — a classic
   asymmetry). Model what a realistic dispute would cost the client to
   pursue or defend under the mechanism; a right that costs more to enforce
   than it's worth is decorative.
5. **Check the injunctive-relief carve-out** — who can seek emergency/
   equitable relief, in what court, and whether the carve-out is mutual.
   For confidentiality/IP-heavy deals the carve-out's presence and shape is
   material.
6. **Test against realistic disputes (separate layer).** For the 2–3 likely
   dispute types: walk the path end-to-end (steps, forum, time, cost,
   waivers in play) from the client's seat. Who does the architecture favor
   in each? Ranked issues; asks to `contract-negotiation-strategy`.

## Output Format

```markdown
# Dispute resolution review: <contract>
## Mandatory path (ladder steps, deadlines, condition-precedent status, carve-outs)
## Forum architecture (arbitration: institution/rules/seat/arbitrators/discovery/fees | litigation: courts)
## Mutuality check (may both parties use the same doors?)
## Waivers (class, jury, appeal, shortened limitations period) [each cited → counsel]
## Cost & fee-shifting (allocation; realistic cost to enforce a claim from the client's seat)
## Injunctive-relief carve-out (scope, mutuality)
## Dispute walk-throughs (2–3 realistic disputes end-to-end; who's favored) [separate layer]
## Ranked issues & negotiation directions
## Counsel-required items + information needed
```

## Quality Checklist

- [ ] Full mandatory path mapped with deadlines and carve-outs.
- [ ] Arbitration architecture extracted completely (institution through fees).
- [ ] Mutuality checked; one-way mechanisms flagged.
- [ ] All waivers found, including shortened limitations periods.
- [ ] Enforcement cost modeled from the client's seat, not abstractly.
- [ ] Injunctive carve-out analyzed for scope and mutuality.
- [ ] Realistic disputes walked end-to-end; facts separate from leverage judgment.
- [ ] Waiver/clause enforceability routed to counsel.

## Failure Conditions

- **Mechanism-label review:** "disputes go to arbitration" without the
  architecture (rules, seat, fees, discovery) that determines what that means.
- **Limitations-period miss:** overlooking a shortened claims deadline — a
  buried claims-killer.
- **Mutuality assumption:** missing one-way arbitration or one-way
  fee-shifting.
- **Cost blindness:** analyzing rights without what they cost to enforce for
  this client's size.
- **Enforceability verdicts** on waivers/arbitration clauses — counsel's call.
- **Ladder-as-decoration:** not noticing an undeadlined escalation ladder is
  a delay weapon.
- **Escalate to counsel** when: waiver/clause enforceability matters
  (jurisdiction-specific, esp. consumer/employment contexts); a dispute is
  already live or imminent (procedure becomes strategy — counsel now); or
  cross-border arbitration/enforcement is involved.

## Related skills

- `governing-law-jurisdiction-review` — the law/forum layer this interacts with.
- `liability-indemnification-review` — indemnity procedures that ride the
  dispute path.
- `term-termination-analysis` — termination disputes and their triggers.
- `contract-negotiation-strategy` — rebalancing asks.
