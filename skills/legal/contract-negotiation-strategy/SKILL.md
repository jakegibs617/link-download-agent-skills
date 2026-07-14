---
name: contract-negotiation-strategy
description: Turns review findings into a prioritized negotiation plan — ranking issues by materiality and leverage, defining positions (ideal/acceptable/walk-away) with rationale and fallback trades, and sequencing the asks realistically. Use to prepare for a contract negotiation once the substantive issues are identified. Not for identifying the issues (the review skills) or drafting the actual clause language (redline-recommendations).
---

# Contract Negotiation Strategy

## Legal disclaimer

This skill produces strategy analysis to support a human decision-maker. It is
**not legal advice** and does not replace a licensed attorney. Whether a
position is legally sound or a term enforceable is for counsel; this skill
organizes the commercial/legal findings into a negotiation plan and flags
where counsel input is needed.

## Purpose

Convert a pile of review findings into a plan a negotiator can execute:
which issues to fight for and in what order, what each position's fallback is,
what to trade against what, and where the real leverage lies — because
negotiating every issue with equal force wins nothing, and the party who has
prioritized beats the party who hasn't.

## Layered output principle

Separate: (1) **the issue** (from review, cited), (2) **why it matters**
(materiality to the client), (3) **positions** (ideal / acceptable / walk-away),
(4) **leverage assessment** (grounded, not wishful), (5) **counsel-required
inputs**. Positions are recommendations for a human to adopt or override.

## Inputs

- The review findings (from the substantive and missing-protections skills)
  and which party the client is. Strategy without findings is guessing —
  MUST have the substantive issues identified first.
- The client's actual priorities, risk tolerance, BATNA (walk-away
  alternative), and relationship goals (one-off vs long-term partner) — MUST
  ask for these; leverage and walk-away points depend entirely on them and
  can't be invented.
- The commercial context: relative bargaining power, time pressure, market
  alternatives for both sides.

## Procedure

1. **Rank issues by materiality × leverage.** For each finding, assess how
   much it matters to the client and how much leverage the client has to
   change it. This creates the priority map: high-materiality/high-leverage
   issues are the ones to press; high-materiality/low-leverage need creative
   trades or acceptance; low-materiality are trading chips. MUST NOT treat all
   findings as equally worth fighting.
2. **Set positions per priority issue.** For each: the **ideal** ask, the
   **acceptable** landing zone, and the **walk-away** point (if any) — each
   with a rationale grounded in the client's stated priorities and BATNA. A
   walk-away asserted without a real alternative is a bluff; be honest about
   which issues are truly deal-breakers vs strong preferences.
3. **Assess leverage honestly.** Ground leverage in facts: who needs the deal
   more, switching costs, time pressure, competitive alternatives, precedent.
   MUST NOT inflate the client's leverage to sound encouraging — a plan built
   on imagined leverage fails at the table. Where the client is the weaker
   party, say so and strategize accordingly (focus fire, seek non-price
   concessions, accept-with-mitigation).
4. **Design trades.** Map what the client can give (low-cost-to-us,
   high-value-to-them concessions) against what it wants. Package linked
   issues ("we'll accept your liability cap if you carve out data breach").
   Interest-based, not just positional: understand what the counterparty
   actually needs and find non-zero-sum moves. Identify the low-cost gives
   that buy goodwill on the issues that matter.
5. **Sequence realistically.** What to raise first (often align on
   easy/mutual wins, or lead with a well-justified priority), what to bundle,
   what to hold in reserve, and what not to raise at all (raising a
   non-issue can create one). Consider anchoring effects and who should make
   the first move on price.
6. **Preserve the relationship where it matters.** For long-term deals, frame
   asks as mutual risk-management, not adversarial; distinguish the tone for
   a partner from a one-off. Flag where hard-lining costs more relationally
   than the issue is worth.
7. **Flag counsel and decision points.** Positions resting on legal risk or
   enforceability go to counsel; the client owns the final call on
   priorities and walk-aways — MUST present the plan as recommendations, not
   decisions made for them.

## Output Format

```markdown
# Negotiation strategy: <contract> (client: ___, relationship: one-off/long-term)
## Leverage assessment (honest; who needs this more, BATNA, pressures)
## Priority map
| Issue [from review] | Materiality | Leverage | Ideal | Acceptable | Walk-away? | Rationale |
## Trade packages (give X ↔ get Y; linked issues)
## Low-cost gives / goodwill chips
## Sequencing plan (raise first / bundle / hold / don't raise)
## Relationship considerations
## Counsel-required inputs + information still needed from the client
```

## Quality Checklist

- [ ] Issues ranked by materiality × leverage, not treated equally.
- [ ] Ideal/acceptable/walk-away set per priority issue with rationale.
- [ ] Leverage grounded in facts, not inflated.
- [ ] Trades designed around the counterparty's actual interests.
- [ ] Sequencing includes what NOT to raise.
- [ ] Relationship context reflected in tone/approach.
- [ ] Plan framed as recommendations; client's priorities/BATNA sourced, not assumed.

## Failure Conditions

- **Equal-weight negotiating:** a flat list of demands with no prioritization —
  the strategy failure.
- **Leverage inflation:** building the plan on bargaining power the client
  doesn't have; walk-aways with no BATNA.
- **Positional tunnel vision:** only trading on price/the obvious axis, missing
  the interest-based trades that unlock value.
- **Assumed priorities:** setting walk-away points without the client's actual
  risk tolerance and alternatives.
- **Relationship-blind aggression:** hard-lining every point on a deal the
  client needs to preserve.
- **Raising non-issues:** creating problems by negotiating things that were fine.
- **Deciding for the client:** presenting walk-aways as fixed rather than as
  recommendations for the client to own.
- **Escalate to counsel** when: a position's viability is a legal-risk call;
  the walk-away analysis needs enforceability input; or regulatory limits
  constrain what can be negotiated.

## Related skills

- The review skills + `missing-protections-analysis` — supply the issues.
- `redline-recommendations` — drafts the language for each position.
- `plain-english-contract-explanation` — briefs the client on the stakes.
- `signature-readiness-assessment` — re-checks the deal after negotiation.
