---
name: term-termination-analysis
description: Analyzes how a contract begins, renews, and ends — initial term, renewal/auto-renewal, termination for cause and convenience, notice and cure, and the consequences of termination (wind-down, transition, survival, refunds, return of assets). Use to review term/termination provisions or assess exit risk. Not for general obligations (rights-obligations-extraction), payment refunds in isolation (payment-compensation-analysis), or change-of-control triggers (assignment-change-of-control-review).
---

# Term and Termination Analysis

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Enforceability
of termination rights and notice requirements is jurisdiction-specific and
requires counsel; this skill flags such points.

## Purpose

Make the full lifecycle and every exit explicit: how long the parties are
bound, how the contract renews, every way each party can get out (and how
hard), and — most importantly — what happens *after* termination, because the
wind-down terms are where exit pain hides.

## Layered output principle

Separate: (1) **what the contract says** (cited), (2) **practical
consequence** (what it means to be stuck in or exiting), (3) **risk**
(lock-in, asymmetric exit, painful wind-down), (4) **missing info**,
(5) **counsel needed**.

## Inputs

- The full contract (termination consequences reference survival clauses,
  payment, IP, and confidentiality across the document).
- Which party you represent — exit asymmetry favors one side; analyze both.

## Procedure

1. **Map the term.** Initial term length, commencement trigger (signing vs
   effective date vs go-live), and any minimum commitment period. Note if
   perpetual/evergreen.
2. **Analyze renewal — carefully.** Auto-renewal vs express renewal; the
   renewal term length; and the **non-renewal notice window** (e.g. "unless
   either party gives 90 days' notice"). Auto-renewal with a long/early notice
   window is a classic lock-in trap — miss the window and you're bound another
   full term. MUST surface the exact notice mechanics and deadline.
3. **Inventory every termination right, per party:**
   - **For cause:** what counts as cause (material breach — defined?),
     the **cure period** (and whether it applies), and whether cause is
     symmetric. Insolvency/bankruptcy triggers.
   - **For convenience:** can either party exit without cause? On what
     notice? Is it one-sided (only the stronger party may)? A convenience
     right for one side only is a major asymmetry.
   - **Special triggers:** change of control (→ coordinate with
     `assignment-change-of-control-review`), failure to meet SLAs, regulatory.
   MUST distinguish cause vs convenience and check symmetry.
4. **Analyze notice and cure mechanics.** How notice must be given (method,
   to whom), notice periods, cure periods and whether repeated breaches
   shorten them. Defective-notice risk (wrong method = ineffective
   termination) is real.
5. **Analyze the consequences of termination — the core.** Wind-down/
   transition assistance (obligation? for how long? paid?), return or
   deletion of data/property/confidential information, effect on licenses
   granted, refund or acceleration of fees, and any termination fees/
   penalties. What each party must do at exit, and what it costs.
6. **Check survival.** Which clauses survive termination (confidentiality,
   IP, indemnity, liability limits, dispute resolution). A missing survival
   clause can mean confidentiality evaporates at termination — flag both
   over- and under-survival.
7. **Assess exit risk (separate layer).** Overall: how locked-in is your
   side, how clean is the exit, is termination symmetric? Rank material
   issues; hand asks to `contract-negotiation-strategy`.

## Output Format

```markdown
# Term & termination analysis: <contract>
## Term (length, commencement, minimum commitment, evergreen?)
## Renewal (auto/express, term, NON-RENEWAL notice window + deadline)
## Termination rights
| Party | Cause / Convenience | Trigger | Notice | Cure | Symmetric? | § |
## Notice & cure mechanics (method, defect risk)
## Consequences of termination (transition, data return, refunds, fees, license effect)
## Survival (what survives; gaps flagged)
## Exit-risk assessment & ranked issues (separate layer)
## Counsel-required items + information needed
```

## Quality Checklist

- [ ] Term, commencement, and any minimum commitment identified.
- [ ] Auto-renewal and the exact non-renewal notice window/deadline surfaced.
- [ ] Every termination right mapped by party, cause-vs-convenience, symmetry.
- [ ] Cure periods and notice-method defect risk addressed.
- [ ] Post-termination consequences (transition, data, refunds, fees) covered.
- [ ] Survival clause checked for over/under-survival.
- [ ] Facts separated from exit-risk judgment.

## Failure Conditions

- **Renewal-trap blindness:** missing the auto-renew + early-notice window
  lock-in — the most common costly oversight.
- **Cause/convenience conflation:** treating a convenience right as a for-cause
  right or missing that only one party has convenience exit.
- **Consequence neglect:** analyzing how to terminate but not what happens
  after (data, transition, fees) — where the real pain is.
- **Survival miss:** overlooking that confidentiality/IP doesn't survive.
- **Fabricated cure period:** inventing a cure window the contract doesn't grant.
- **Fact/opinion blur.**
- **Escalate to counsel** when: enforceability of a termination/penalty term
  is in question; notice/termination formalities are jurisdiction-specific;
  or auto-renewal is subject to consumer auto-renewal statutes (flag — these
  are jurisdiction-specific).

## Related skills

- `payment-compensation-analysis` — refund/acceleration mechanics overlap.
- `assignment-change-of-control-review` — change-of-control termination triggers.
- `confidentiality-data-protection-review` / `ip-ownership-review` — what
  survives and data-return obligations.
- `contract-negotiation-strategy` — exit-term asks.
