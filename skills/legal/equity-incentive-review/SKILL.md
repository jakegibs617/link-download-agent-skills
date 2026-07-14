---
name: equity-incentive-review
description: Analyzes equity and incentive compensation terms — grant type, vesting (cliffs, acceleration), exercise windows and pricing, repurchase/forfeiture rights, dilution exposure, and the plan documents the grant depends on — surfacing what the holder actually gets and can lose. Use to review option grants, RSU agreements, founder/advisor equity, or offer-letter equity terms. Not for cash compensation (payment-compensation-analysis), and never tax or securities advice — those always go to specialists.
---

# Equity and Incentive Compensation Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal, tax, or securities advice** and does not replace a licensed
attorney or tax advisor. Option taxation, securities-law treatment, and
83(b)-style elections are jurisdiction- and situation-specific and MUST go
to qualified tax/securities professionals; this skill flags every such point.

## Purpose

Make the equity's real mechanics explicit: what is granted, when it's truly
owned, what events change or destroy it, what exercising costs and when the
window slams shut, and what the promised percentage actually means after the
documents it references — because equity terms fail people at the exact
moments (departure, acquisition, funding round) they were counting on them.

## Layered output principle

Separate: (1) **what the documents say** (cited), (2) **practical
consequence** (scenario outcomes: leaving, being fired, acquisition),
(3) **risk** (forfeiture hooks, short windows, repurchase at cost),
(4) **missing documents/info** (the plan, the cap table), (5) **tax/
securities/counsel referral** — always explicit.

## Inputs

- The grant agreement AND the plan document it incorporates — the plan
  usually controls and is usually not attached; MUST flag its absence as a
  first-order gap. Offer-letter equity language alone is a promise summary,
  not the terms.
- The holder's context: employee/founder/advisor, jurisdiction, and what
  they're trying to understand (what do I really have? what if I leave?).
- Cap-table context if percentage claims are being evaluated (fully-diluted
  basis or not).

## Procedure

1. **Identify the instrument precisely.** Options (and their tax flavor —
   flag for tax advisor rather than assuming), RSUs, restricted stock,
   phantom/SAR, profits interests. Different instruments have different
   risk points; MUST NOT analyze "equity" generically.
2. **Map vesting exactly:** schedule, cliff, vesting-commencement date (vs
   start date), and any performance/milestone conditions (defined
   objectively or at board discretion?). Check what happens to unvested
   equity on each termination flavor: resignation, termination without
   cause, for cause (and how "cause" is defined — a broad cause definition
   is an equity-destruction lever), death/disability.
3. **Analyze acceleration.** Single-trigger (on change of control) vs
   double-trigger (CoC + termination) vs none; what counts as a qualifying
   termination and CoC. For anyone valuing the equity as an acquisition
   payoff, absence of double-trigger acceleration is a material fact.
4. **Scrutinize exercise mechanics (options):** strike price and how set
   (fair-market-value process), the post-termination exercise window (a
   90-day window can force a costly exercise-or-forfeit decision at the
   worst time — MUST surface it and its cash/tax implications
   conceptually), expiration, and early-exercise availability (an 83(b)-
   election timing point → tax advisor flag, never advice).
5. **Hunt the destruction and take-back clauses:** repurchase rights (at
   FMV or at cost? — at-cost repurchase of vested shares can nullify the
   equity), forfeiture-for-competition or bad-leaver clauses (coordinate
   with `restrictive-covenants-review`), clawbacks, and plan-amendment
   powers that can change terms unilaterally.
6. **Assess dilution and the percentage's meaning.** "1% of the company":
   of what — fully-diluted including the pool? As of when? Anti-dilution
   or pool-expansion effects; information rights the holder does/doesn't
   get to even know their current percentage.
7. **Run the scenarios (separate layer).** Walk the concrete outcomes:
   leave voluntarily at 18 months; fired without cause at 3.9 years
   (pre-cliff-4 cliff edges); company acquired at year 2; company
   repurchases after departure. Each scenario cites the clauses that drive
   it. Then: ranked issues, tax/securities referrals, negotiation asks to
   `contract-negotiation-strategy`.

## Output Format

```markdown
# Equity & incentive review: <grant> (holder: employee/founder/advisor)
## Documents reviewed / MISSING (plan document attached? cap-table basis known?)
## Instrument (precise type; tax flavor → tax advisor)
## Vesting map (schedule, cliff, commencement, per-termination-flavor outcomes; 'cause' definition breadth)
## Acceleration (single/double/none; qualifying-event definitions)
## Exercise mechanics (strike, post-termination window + its consequence, expiration, early exercise → tax flag)
## Destruction/take-back clauses (repurchase at cost/FMV, bad-leaver, clawback, plan-amendment power)
## Dilution & percentage meaning (fully-diluted basis, information rights)
## Scenario walk-throughs (leave / fired / acquired / repurchase) [cited]
## Ranked issues + negotiation directions
## Tax / securities / counsel referrals (mandatory section) + information needed
```

## Quality Checklist

- [ ] Plan document obtained or its absence flagged as first-order.
- [ ] Instrument identified precisely; tax flavor referred, not advised.
- [ ] Every termination flavor's vesting outcome mapped; "cause" breadth checked.
- [ ] Post-termination exercise window and its practical squeeze surfaced.
- [ ] Repurchase-at-cost / bad-leaver / plan-amendment powers hunted.
- [ ] Percentage claims tied to a stated basis or flagged as unverifiable.
- [ ] Concrete scenarios walked with citations.
- [ ] Tax/securities questions referred every time, never answered.

## Failure Conditions

- **Tax advice:** opining on option taxation, elections, or timing — the
  cardinal failure; refer every time.
- **Grant-only review:** analyzing the grant letter while the controlling
  plan document is unread/unattached and unflagged.
- **Headline vesting:** reporting "4-year vest, 1-year cliff" without the
  termination-flavor outcomes and cause-definition breadth that determine
  what's actually kept.
- **Window blindness:** missing the post-termination exercise squeeze.
- **Repurchase miss:** overlooking an at-cost repurchase right that guts
  vested equity.
- **Percentage credulity:** repeating "you get 1%" without the basis.
- **Escalate to tax/securities counsel** always for taxation, elections,
  and securities treatment; to counsel urgently when a departure or
  acquisition is imminent and terms are ambiguous.

## Related skills

- `payment-compensation-analysis` — the cash side of the package.
- `restrictive-covenants-review` — forfeiture-for-competition hooks.
- `assignment-change-of-control-review` — CoC definitions the acceleration
  depends on.
- `contract-negotiation-strategy` — the asks (double-trigger, longer window,
  FMV repurchase).
