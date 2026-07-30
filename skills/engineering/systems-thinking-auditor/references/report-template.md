# Full report template

Read this when the audit is a standing decision document — a deliverable for
people who were not in the conversation, a system spanning more than one mode,
or an audit whose recommendations need a paper trail. For a scoped single-mode
audit, the core Output Format in `SKILL.md` is the whole deliverable.

**Do not pad.** Every section here must earn its place by explaining an observed
behavior or changing a decision. A section with nothing evidenced in it gets one
line stating that and what would populate it — not filler. Producing fifteen
sections of thin content is a failure mode of this skill, not thoroughness.

Sections A, B, C, D, F, L, M, and O are load-bearing; the registers (I, J, K)
matter most when the audit will be revisited later or handed to another owner.

---

## A. Executive assessment

Five answers, one short paragraph each, before any analysis:

1. What is the system trying to achieve — stated, and operatively?
2. Is the current structure capable of achieving it?
3. What are the most important systemic risks?
4. Where is the strongest justified leverage point?
5. What decision should be made next, and by whom?

## B. System definition

Purpose · boundary (inside / outside-but-influential / deliberately excluded) ·
stakeholders and what each is measured on · inputs · outputs · fixed constraints
· external dependencies · time horizon the audit judges against.

## C. Evidence and limitations

Materials reviewed · time-series and operational evidence available · missing
evidence and why it matters · assumptions the audit rests on · overall
confidence · what could not be validated, and the observation that would
validate it.

## D. Intended versus observed behavior

| Area | Intended behavior | Observed or implied behavior | Gap | Basis |
| ---- | ----------------- | ---------------------------- | --- | ----- |

Basis is `documented` / `implemented` / `observed` / `assumed`, plus the
confidence label. A row where documented and observed disagree is a finding.

## E. Stocks and flows

| Stock | Level | Inflows | Outflows | Binding constraint | Measured? | Risk | Basis |
| ----- | ----- | ------- | -------- | ------------------ | --------- | ---- | ----- |

Note explicitly which stocks nobody measures.

## F. Feedback loops

Per loop, only loops that close:

```text
Loop:
Type: reinforcing | balancing
Chain (with direction of each link), closing back on:
Delay around the loop:
Evidence per link:
Strength now, and which loop currently dominates:
What it produces if left alone:
Failure or reversal conditions:
Basis:
```

Causal chains that do not close go in a separate short list, labeled as chains.

## G. Systemic patterns and archetypes

| Pattern | Archetype | Discriminating test result | Supporting | Contradicting | Confidence | Consequence |
| ------- | --------- | -------------------------- | ---------- | ------------- | ---------- | ----------- |

If nothing matches, one line saying so.

## H. Goals, incentives, rules, and information

Stated goal · apparent operative goal · incentive conflicts · for each
goal-metric, the cheapest way to move it without producing the outcome ·
decision-right problems (who bears the cost vs. who holds the authority) ·
information asymmetries and what decision-makers cannot see.

## I. Assumption register

| # | Assumption | Evidence | Confidence | Impact if false | Validation method |
| - | ---------- | -------- | ---------- | --------------- | ----------------- |

Include the audit's own assumptions, not only the system's.

## J. Tradeoff register

| Decision | Benefit | Cost | Who benefits | Who bears the cost | Time horizon |
| -------- | ------- | ---- | ------------ | ------------------ | ------------ |

Rows where the beneficiary and the cost-bearer differ are the ones to read
first.

## K. Risk register

| Risk | Cause (structure) | Trigger | Consequence | Early signal | Mitigation | Owner |
| ---- | ----------------- | ------- | ----------- | ------------ | ---------- | ----- |

Where this register is the primary deliverable rather than a supporting one,
hand off to `engineering-risk-analysis`, which scores exposure properly.

## L. Leverage-point analysis

| # | Intervention | Level | Impact | Effort | Time to effect | Unintended consequence | Reversible? | Confidence |
| - | ------------ | ----- | ------ | ------ | -------------- | ---------------------- | ----------- | ---------- |

Full per-recommendation fields are in `leverage-points.md`. If every row sits at
level 1–2, the audit has not found a structure.

## M. Recommendations

Grouped, in this order:

- **Immediate containment** — labeled as containment, with what it buys time for.
- **Near-term structural improvements** — sequenced, with owners.
- **Long-term system redesign** — with what must be true before it starts.
- **Experiments required before commitment** — where a mechanism is inferred or
  speculative and a bounded test would settle it.
- **Decisions to defer deliberately** — with the tripwire that reopens each.

## N. Validation plan

Per major recommendation:

```text
Hypothesis (what changes, and by what mechanism):
Expected signal (specific, with direction and rough magnitude):
Measurement method:
Guardrail metric (what must NOT get worse):
Review period:
Stop condition:
Rollback method:
```

A recommendation with no falsifiable signal is an opinion. A recommendation with
no guardrail is how a high-leverage intervention causes its own incident.

## O. Final verdict

One of:

```text
Proceed
Proceed with conditions
Rework the structure
Run a bounded experiment first
Insufficient evidence
```

Followed by the findings that drove it and the single thing that would change
it. `Insufficient evidence` is a legitimate verdict and MUST be used rather
than inventing confidence — pair it with exactly what to collect and for how
long.

---

## Findings format

Used in the core report and here. Every finding above `low` gets the full form:

```text
Finding:
Severity: critical | high | medium | low | observation
Claim:
Evidence (cited to the material, file:line, metric, or quoted source):
Reasoning (the step from evidence to claim):
System mechanism (which stock, loop, delay, or rule produces this):
Affected stakeholders (and who bears the cost):
Short-term effect:
Long-term effect at the audit's horizon:
Confidence: evidenced | inferred | speculative | unknown
What would disprove this:
Recommended action, with leverage level:
```

Severity definitions:

- **critical** — the system is likely to fail its primary purpose, cause severe
  harm, or enter a self-reinforcing failure cycle.
- **high** — a structural flaw likely to cause recurring incidents, major waste,
  poor adoption, or unsustainable operation.
- **medium** — the system functions, but a pattern degrades quality, speed,
  maintainability, or resilience.
- **low** — localized, reversible, unlikely to alter system behavior.
- **observation** — relevant context that does not currently justify action.

Cap findings above `medium` at roughly five. `What would disprove this` is
mandatory on every finding at `high` or `critical`; a structural claim that
cannot be falsified should not be driving a structural change.
