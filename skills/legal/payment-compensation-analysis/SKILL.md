---
name: payment-compensation-analysis
description: Analyzes the money terms of a contract — amounts, schedules, invoicing, acceptance gates, late fees, set-off, taxes, expenses, adjustments, and the conditions on getting paid or having to pay — surfacing cash-flow risk and one-sided mechanics. Use to review compensation/payment provisions in any commercial or services contract. Not for equity/incentive compensation (equity-incentive-review), general obligation mapping (rights-obligations-extraction), or liability caps (liability-indemnification-review).
---

# Payment and Compensation Analysis

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal, tax, or accounting advice** and does not replace a licensed
attorney or tax professional. Tax treatment and enforceability of payment
terms require qualified advisors; this skill flags such points.

## Purpose

Make the money mechanics fully legible: exactly how much, when, on what
conditions, with what frictions and risks to actually getting paid (or being
forced to pay) — so cash-flow exposure and one-sided payment terms are visible
before signing.

## Layered output principle

Separate: (1) **what the contract says** about money (cited fact),
(2) **practical/cash-flow consequence**, (3) **risk** (one-sided or onerous
mechanics), (4) **missing info** (undefined amounts, unstated tax treatment),
(5) **counsel/tax advisor needed**.

## Inputs

- The full contract plus any fee schedule/SOW/pricing exhibit (money terms
  often live in an exhibit — MUST note if it's missing).
- Which party you represent (payer vs payee frames the risk), but analyze
  both directions.

## Procedure

1. **Extract the price and how it's set.** Fixed, time-and-materials,
   milestone, subscription, usage-based, or a mix; the actual numbers or the
   formula. Flag "TBD"/blank amounts and rates that reference an unattached
   schedule.
2. **Map the payment timeline and conditions.** Invoicing mechanics
   (who invoices, when, required detail), payment due (net-30/45/60 from what
   event — invoice date vs delivery vs acceptance), and — critically —
   **acceptance gates**: is payment conditioned on the other party's
   acceptance, and is that acceptance objective or discretionary? A
   discretionary acceptance gate on payment is a major payee risk. MUST
   surface it.
3. **Find the friction and leverage clauses:** late-payment interest/fees
   (and whether reciprocal), set-off/withholding rights (can they deduct
   disputed amounts?), retainage/holdback, suspension-for-nonpayment rights,
   most-favored-pricing, minimum commitments, and true-ups. Note which party
   each favors.
4. **Handle price changes over time.** Escalation/CPI clauses, renewal
   price-increase mechanics (auto-increase with notice?), and caps on
   increases. Uncapped renewal increases are a common buried cost.
5. **Cover taxes, expenses, currency.** Who bears which taxes (VAT/GST/sales/
   withholding — "plus applicable taxes" vs silent), expense reimbursement
   scope and caps, currency and FX risk, and payment method/fees. Tax
   allocation MUST be flagged for a tax advisor where it's material or unclear.
6. **Check refund/clawback and disputed-amounts handling.** Are fees
   refundable? Pro-rated on early termination? Is there a mechanism (and
   deadline) to dispute an invoice, and does disputing suspend the payment
   obligation or just the disputed part?
7. **Assess the net position (separate layer).** Overall: is the payment
   structure balanced, or does one side bear cash-flow, acceptance, and
   set-off risk? Rank the material issues. Negotiation asks hand to
   `contract-negotiation-strategy`.

## Output Format

```markdown
# Payment & compensation analysis: <contract>
## Fee schedule present? (missing exhibit → provisional)
## Price and structure (amount/formula, cited)
## Payment timeline & conditions (invoicing, due date, acceptance gate)
## Friction/leverage clauses (late fees, set-off, holdback, suspension — who each favors)
## Price changes over time (escalation, renewal increases, caps)
## Taxes / expenses / currency (allocation, gaps → tax advisor)
## Refunds / clawback / disputed-amount handling
## Net position & ranked material issues (separate risk layer)
## Counsel/tax-advisor-required items + information needed
```

## Quality Checklist

- [ ] Price/formula extracted with citations; blanks and missing schedules flagged.
- [ ] Due-date event identified (invoice vs delivery vs acceptance).
- [ ] Acceptance gate on payment surfaced and its objectivity assessed.
- [ ] Set-off, holdback, suspension, late fees mapped by who they favor.
- [ ] Renewal/escalation increases and any caps caught.
- [ ] Tax allocation addressed or flagged for a tax advisor.
- [ ] Facts kept separate from the net-position risk judgment.

## Failure Conditions

- **Amount tunnel vision:** reporting the price, ignoring the mechanics
  (acceptance gates, set-off, holdback) that decide whether it's actually paid.
- **Acceptance-gate miss:** overlooking that payment hinges on discretionary
  acceptance — the classic payee trap.
- **Renewal-increase blindness:** missing an uncapped auto-escalation.
- **Tax overreach:** opining on tax treatment instead of flagging for a tax
  professional.
- **Fabricated numbers:** inventing amounts/rates from an unattached schedule.
- **Fact/opinion blur:** merging "the contract says net-60" with "net-60 is
  bad for you" without separation.
- **Escalate to counsel/tax** when: tax allocation is material or ambiguous;
  a payment mechanic's enforceability is in question (e.g. penalty vs
  liquidated damages); or usury/consumer-payment regulation may apply
  (jurisdiction-specific — flag).

## Related skills

- `rights-obligations-extraction` — the general obligation map this deepens
  for money.
- `term-termination-analysis` — refund/pro-ration on termination overlaps; coordinate.
- `equity-incentive-review` — equity/options compensation instead.
- `contract-negotiation-strategy` / `redline-recommendations` — turn issues
  into asks.
