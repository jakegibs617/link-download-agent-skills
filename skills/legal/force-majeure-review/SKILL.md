---
name: force-majeure-review
description: Analyzes force-majeure and excused-performance provisions — what events qualify, whose obligations are excused (and which are never excused, like payment), notice and mitigation duties, duration limits, and the termination right when a force-majeure event persists. Use to review force-majeure clauses or assess disruption/excused-performance risk. Not for general termination mechanics (term-termination-analysis) or broad regulatory-change risk (regulatory-compliance-review), though both interact.
---

# Force Majeure Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Whether a
specific event qualifies as force majeure, and how doctrines like frustration
or impossibility interact, are jurisdiction- and fact-specific questions for
counsel; this skill maps the clause and flags them.

## Purpose

Make explicit exactly when performance is excused, whose and which
obligations, for how long, and what each party must do during and after the
event — because force-majeure clauses are ignored until a pandemic, war,
disaster, or supply shock arrives, and then the precise wording decides who
bears a catastrophic disruption.

## Layered output principle

Separate: (1) **what the clause says** (cited), (2) **practical consequence**
(who's excused from what under realistic disruptions), (3) **risk**
(asymmetries, gaps, over/under-breadth), (4) **missing info**, (5) **counsel
needed** (qualification of events, doctrine interactions).

## Inputs

- The force-majeure clause and the whole contract (payment, termination,
  and notice provisions interact).
- The deal's realistic disruption scenarios (supply-chain, pandemic,
  regulatory shutdown, cyberattack, key-personnel loss) and which party is
  more likely to invoke excuse — usually the performing/supplying party.

## Procedure

1. **Extract the trigger definition and its structure.** Enumerated-events
   list, general catch-all ("any event beyond the reasonable control of the
   affected party"), or both. Check whether the catch-all is standalone or
   limited by ejusdem-generis to the listed categories — MUST note whether
   modern risks (pandemic/epidemic, cyberattack, government action, supply-
   chain failure) are expressly listed or left to an argued catch-all.
2. **Test the causation and foreseeability standard.** Must the event
   actually *prevent* performance, or merely *hinder/delay* or make it
   *more expensive* (usually not excused — cost increases rarely qualify)?
   Beyond-reasonable-control + unforeseeable + unavoidable-by-mitigation are
   the usual gates; extract which apply. Flag events expressly excluded.
3. **Identify whose and which obligations are excused — and which are not.**
   MUST check that payment obligations are carved OUT of force majeure (the
   near-universal and critical rule — money is almost never excused; a clause
   that excuses payment is a major red flag). Check symmetry: does the clause
   protect both parties or effectively only the supplier?
4. **Map the procedure and duties.** Notice (timing, method — is prompt
   notice a condition of the excuse?), the duty to mitigate/work around, the
   duty to resume promptly, and any obligation to provide alternative
   performance or sources. A missed notice condition can forfeit the excuse.
5. **Analyze duration and the exit.** Is relief indefinite while the event
   continues, or does prolonged force majeure give either party a
   termination right after X days? Without a termination backstop, a party
   can be locked into a dead contract indefinitely — flag the presence/
   absence and whose right it is.
6. **Check allocation during the event:** who bears costs incurred,
   suspension vs extension of the term, effect on exclusivity/minimums, and
   whether the customer may source elsewhere while performance is suspended
   (critical for supply deals).
7. **Assess against scenarios and doctrine (separate layer).** Walk the
   deal's realistic disruptions through the clause; flag that even a silent
   or narrow clause may leave common-law doctrines (frustration,
   impossibility, impracticability) in play — a counsel question, MUST NOT
   opine on the doctrine's outcome. Ranked issues; asks to
   `contract-negotiation-strategy`.

## Output Format

```markdown
# Force majeure review: <contract>
## Trigger (enumerated/catch-all/both; modern risks listed?; catch-all scope) [cited]
## Causation & foreseeability standard (prevent vs hinder vs cost; exclusions)
## Excused obligations — and payment carve-out check; symmetry
## Procedure & duties (notice-as-condition, mitigate, resume)
## Duration & termination backstop (whose right; after how long)
## Cost/term/sourcing allocation during the event
## Scenario walk-throughs + doctrine flags (frustration/impossibility → counsel)
## Ranked issues & negotiation directions (separate layer)
## Counsel-required items + information needed
```

## Quality Checklist

- [ ] Trigger structure and catch-all scope analyzed; modern risks checked.
- [ ] Causation standard (prevent vs hinder vs cost) extracted.
- [ ] Payment-carve-out confirmed present (or flagged if payment is excused).
- [ ] Notice-as-condition and mitigation/resume duties identified.
- [ ] Duration limit and termination backstop presence/owner checked.
- [ ] During-event sourcing/cost/term allocation covered.
- [ ] Doctrine interactions flagged for counsel, not resolved.

## Failure Conditions

- **Payment-excuse blindness:** not flagging a clause that excuses payment
  obligations (or not confirming the carve-out) — a critical check.
- **Catch-all credulity:** assuming a general catch-all covers pandemics/
  cyber without checking listing and ejusdem-generis limits.
- **Cost-equals-excuse:** treating mere cost increase or hindrance as
  qualifying when the clause requires prevention.
- **No-exit miss:** overlooking the absence of a termination backstop for
  prolonged events.
- **Notice-condition miss:** missing that late notice forfeits the excuse.
- **Doctrine opinions:** predicting whether frustration/impossibility would
  apply — counsel's call.
- **Escalate to counsel** when: an event's qualification is genuinely
  contestable; common-law excuse doctrines may fill gaps; or a disruption is
  live and a party is about to invoke or refuse the clause.

## Related skills

- `term-termination-analysis` — the termination backstop's mechanics.
- `regulatory-compliance-review` — government-action/illegality overlap.
- `payment-compensation-analysis` — payment obligations that survive.
- `contract-negotiation-strategy` — clause-rebalancing asks.
