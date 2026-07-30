---
name: systems-thinking-auditor
description: Audits why a system behaves the way it does — a product or PRD, an architecture or codebase, a team workflow, or a business process — by reconstructing its stocks, flows, closed feedback loops, delays, incentives, and information paths, then ranking interventions by leverage and naming the unintended consequences of each. Use when a problem keeps coming back after being fixed, when local fixes make the whole worse, when a metric is being hit while the outcome it stands for degrades, or when asked "why does this keep happening", "what's the root cause at the system level", or "where is the highest leverage here". Not for auditing one artifact's missing decisions (technical-review-auditor), scoring discrete failure modes into a register (engineering-risk-analysis), proving a single bug's cause chain (debugging-root-cause-analysis), or defining component topology and contracts (system-architecture).
---

# Systems Thinking Auditor

## Purpose

Explain why a system produces the behavior it produces, and where intervening
would change that behavior durably rather than temporarily.

**Governing principle: the deliverable is a causal explanation, not a
description.** "The build failed" is an event. "Build failures cluster before
release because late changes bypass validation, teams are measured on ship
dates, and a failure's cost lands after the date is already met" is a
structure. Only the second tells anyone what to change.

Climb the ladder deliberately, and say which rung each finding sits on:

```text
Events             what happened once
Patterns           what happens repeatedly, and its direction over time
Structures         the arrangement that makes that pattern the normal output
Goals & paradigms  what the system actually optimizes, and the beliefs that
                   make that goal look inevitable
```

A finding that stops at Events or Patterns is not finished. Structures are the
minimum useful altitude; goals and paradigms are where durable change lives.

MUST NOT force the vocabulary. A system with no loop that closes gets no loop
section. Naming a stock, loop, or archetype the evidence does not support is
worse than plain prose — it launders a guess as analysis.

## Inputs

- The system under audit, and which mode it is. If the request spans two modes
  (a PRD plus the team that will build it), audit both and say where the
  boundary between them sits.
- The behavior that prompted the audit. If nothing prompted it, ask what would
  count as an improvement first — an audit with no target behavior produces an
  inventory, not a finding.
- **Behavior over time**: incident history, metric series, ticket ages, queue
  depth, churn, git history, retro notes. Without at least one time series or
  one account of a repeated episode, this becomes a structural review of the
  design as written and MUST say so — a pattern cannot be asserted from a
  snapshot.
- Who participates, and what each is measured on. Incentives are usually the
  highest-leverage finding and are almost never in the technical material.
  Where unavailable, incentive findings become questions.
- Which constraints are genuinely fixed, and which dependencies belong to
  someone outside the boundary.

## Procedure

### 1. Draw the boundary first, and state it

| Mode | System | Emphasis |
|------|--------|----------|
| **Product** | PRD, feature proposal, roadmap, pricing | operative goal, metric gaming, adoption loops |
| **Architecture** | service, codebase, data platform | stocks and queues, failure propagation, debt flows |
| **Workflow** | team process, on-call, review pipeline | decision rights, feedback latency, local optima |
| **Process** | acquisition, onboarding, support, billing | capacity constraints, growth and churn, delayed cost |

Every phase applies in every mode; only weighting changes.

State three sets explicitly: what is **inside** the boundary (you could change
it), what is **outside but influential** (it acts on the system and you
cannot), and what you **deliberately excluded**. Then state the time horizon
the audit judges against, and what "working" looks like at that horizon.

**Boundary error is this skill's dominant failure, in both directions.** Too
wide produces a report about the industry that no one can act on. Too narrow
puts the real cause outside the frame and leaves you recommending a threshold
change. Naming the exclusions is what makes the boundary reviewable.

### 2. Separate the stated purpose from the operative purpose

A system's operative goal is what it reliably produces, not what its
documentation says it is for. Establish both.

Translate every vague goal into observable behavior before auditing against
it. "Improve engagement", "increase reliability", "make it easier", "scale
it", "use AI", "modernize the architecture" are not goals — for each, ask what
would be observably different, measured how, at which boundary, by when.

Where stated and operative purpose diverge, that gap is a finding in its own
right, and usually the most consequential one, because it is invisible from
inside the system.

### 3. Establish behavior over time

Label which register each claim comes from: **documented** (what the material
says), **implemented** (what the code or policy does), **observed** (what
operational evidence shows), **assumed** (what participants believe without
checking). Divergence between registers is a finding, and silent divergence
always is.

For each behavior that matters: which direction it moves over time, whether it
oscillates, whether it is trending, and whether it resets after intervention
and then returns.

### 4. Identify what accumulates and what drains

Find the stocks — anything that builds up or depletes rather than happening
once. Candidate stocks per mode, their flows, and the field template are in
`references/systems-concepts.md`.

Per stock that matters: level, inflows, outflows, what constrains each flow,
how it is measured today, and the risk at both extremes.

**Judge inflow against outflow, not level.** A recommendation that reduces a
stock without changing the flows buys time and nothing else. Whenever a
proposal is stock-reduction only — a debt sprint, a bug bash, a backlog purge
— say so explicitly and estimate how long until the level returns.

### 5. Map only the loops that close

A loop exists when the causal chain returns to affect an earlier variable in
the same chain. Trace it back to the starting variable before naming it. **A
causal chain is not a loop**; if it does not close, report it as a chain and
stop.

Per loop: name, type (reinforcing or balancing), the chain with the direction
of each link, evidence per link, the delay around the loop, strength *now*
rather than in principle, the conditions under which it breaks or reverses,
and what it produces if left alone.

Balancing loops are the ones people forget to look for. When a reinforcing
loop has not run away, something is holding it — find that, because removing
it accidentally is a common consequence of otherwise sensible changes.

### 6. Find the delays

Delay is what makes competent people mismanage systems they understand. Look
between action and visible result, defect and failure, hiring and
productivity, release and adoption, weakness and exploitation, policy change
and behavioral adaptation, cost creation and cost recognition,
dissatisfaction and churn.

Per delay: the action, the delayed outcome, how long, whether anyone can
currently see it, and what overreaction and underreaction each look like.

**Report a long invisible delay even when nothing has gone wrong yet** — by
construction its evidence arrives after the decision that caused it.

### 7. Test for archetypes, adversarially

Check the observed pattern against: fixes that fail, shifting the burden,
success to the successful, tragedy of the commons, limits to growth,
escalation, growth and underinvestment, eroding goals, accidental adversaries.

Per candidate, record the pattern, supporting evidence, **contradicting
evidence**, confidence, and the long-term consequence if real. Recording
contradicting evidence is mandatory — a candidate with no disconfirming search
behind it is a label, not a diagnosis.

MUST NOT name an archetype because the name sounds apt.
`references/archetypes.md` gives each one's signature, the discriminating
observation separating it from the archetypes it is confused with, and the
intervention it implies. Apply the discriminating test or drop the claim.

### 8. Examine goals, rules, incentives, and information

- **Goals** — stated, operative, whether local goals sum to the system goal,
  and which metric is functioning as the real goal.
- **Rules** — who decides, which approvals exist, which constraints are formal
  versus cultural, and which exceptions are granted so routinely that they are
  the actual rule.
- **Incentives** — what is rewarded, who captures the benefit, who absorbs the
  cost, whether teams are rewarded for local optimization.
- **Information** — who knows what and when, what is missing, what is filtered
  on the way up, and whether decision-makers experience the consequences of
  their decisions.

Two questions produce more findings than the rest of the audit combined:
**does whoever bears the cost of the behavior have the authority to change
it?** and **what would a rational actor do given how they are measured?**

For every metric acting as a goal, name the cheapest way to move it without
producing the outcome it stands for. If that path is cheaper than the real
work, treat it as predicted behavior, not a hypothetical risk.

### 9. Rank interventions by leverage, then justify the level

Levels, shallow to deep: 1 parameters · 2 buffers and capacity · 3 structure
and ownership · 4 delays · 5 balancing loops · 6 reinforcing loops · 7
information flows · 8 rules and incentives · 9 self-organization · 10 goals ·
11 paradigms. Levels 1–2 are cheapest and most reversible; 7–8 are usually
where a recurring problem is actually solvable; 9–11 are rarely yours to move.
`references/leverage-points.md` gives each level's typical form, its
characteristic failure, and the per-recommendation field template.

**Recommend the highest *justified* level, not the highest level.** Two
failure directions, both common: parameter-only recommendations that suppress
the symptom while the structure keeps generating it, and paradigm-level
recommendations no one can implement, which therefore excuse everyone from
acting. State the leverage level of every recommendation so the reader can see
which way you leaned.

Every recommendation carries its unintended consequences, and high-leverage
interventions have high-leverage side effects. Per recommendation: mechanism,
benefit, time to effect, dependencies and who must act, tradeoff, what it
could break, reversibility, and evidence strength.

### 10. Label confidence, rank, then write the verdict

Every claim carries one of: **evidenced** (shown in the material, cited),
**inferred** (follows from cited evidence by a stated reasoning step),
**speculative** (plausible mechanism, no evidence), **unknown** (cannot be
determined from what you have).

MUST NOT convert a missing time series into a confident pattern claim.
Correlation supports a loop only when the mechanism is also named — otherwise
it is inferred at best. Missing operational evidence produces an explicit
unknown plus the observation that would resolve it, never an invented
conclusion.

Rank findings by **severity × durability** — how badly the system misses its
purpose, times how long the structure keeps producing the miss unaddressed.
Severity is `critical` (likely to fail its primary purpose, cause severe harm,
or enter a self-reinforcing failure cycle), `high` (structural flaw producing
recurring incidents, major waste, or unsustainable operation), `medium`
(functions, but a pattern degrades quality, speed, or resilience), `low`
(localized and reversible), or `observation` (context, no action implied).

Cap findings above `medium` at roughly five. Past that the reader triages on
their own judgment and the ranking has done nothing.

## Output Format

```markdown
# Systems audit: <system> — Mode: <product | architecture | workflow | process>

## Verdict
<proceed | proceed with conditions | rework the structure | run a bounded
experiment first | insufficient evidence> — one sentence on why.

## Boundary and purpose
Inside · outside-but-influential · excluded · horizon · stated vs. operative
purpose and the gap.

## Evidence and limits
Material reviewed · time series available · what could not be validated ·
which findings change if a stated assumption is wrong.

## Behavior: intended vs. observed
| Area | Intended | Observed or implied | Gap | Basis |

## Structure producing that behavior
Stocks · loops that close · delays · archetypes with their contradicting
evidence and discriminating-test results.

## Findings (ranked by severity × durability)
### F1: <title> — severity
Claim · evidence · mechanism · who bears the cost · short- vs. long-term
effect · confidence · what would disprove this.

## Goals, incentives, and information
Operative goal · cheapest way to game each goal-metric · cost-bearer vs.
authority-holder · what decision-makers cannot see.

## Leverage-ranked recommendations
| # | Intervention | Level | Mechanism | Time to effect | Unintended consequence | Reversible? | Confidence |
Grouped: contain now · restructure next · redesign later · experiment first ·
defer deliberately.

## Validation plan
Per recommendation: hypothesis · signal · guardrail metric · review date ·
stop condition · rollback.

## Verdict rationale
Which findings drove it, and the one thing that would change it.
```

Field templates for every element live in `references/`. Append the extended
assumption, tradeoff, and risk registers from `references/report-template.md`
only when the audit is a standing decision document for people outside the
conversation, or when the system spans more than one mode. Otherwise the report
above is the whole deliverable — fifteen sections nobody reads is a failure
mode of this skill, not thoroughness.

## Quality Checklist

- [ ] Mode stated; boundary given as inside / outside-but-influential /
      excluded, with the horizon and what "working" means at it.
- [ ] Stated and operative purpose both named; every vague goal converted into
      observable, measurable behavior.
- [ ] Behavior-over-time evidence cited, or its absence declared and the scope
      narrowed to the design as written.
- [ ] Documented / implemented / observed / assumed labeled per claim; every
      claim also labeled evidenced / inferred / speculative / unknown.
- [ ] Stocks judged on inflow vs. outflow; any stock-reduction-only proposal
      named as such with a time-to-return estimate.
- [ ] Every loop closes back on an earlier variable; unclosed chains reported
      as chains. Material delays carry visibility and reaction-risk.
- [ ] Each archetype claim carries contradicting evidence and passes its
      discriminating test; unsupported candidates dropped, not softened.
- [ ] Metric-gaming path named per goal-metric; cost-bearer vs.
      authority-holder asked explicitly.
- [ ] Every recommendation states its leverage level, its unintended
      consequences, and who must act — and the levels are not all 1–2.
- [ ] Findings above medium capped at roughly five; each has a falsifiable
      signal and a stop condition.
- [ ] Verdict issued, with what would change it.

## Failure Conditions

- **Boundary sprawl:** modeling the industry, the org, and the codebase at
  once, producing a report that describes everything and guides nothing.
- **Vocabulary theater:** loops, stocks, and archetypes named because the words
  are available, not because the evidence closes. The most common way this
  skill fails while looking successful.
- **Diagram as conclusion:** a map that explains no behavior and supports no
  decision, or a one-directional chain presented as feedback because it has
  three arrows in it. Every structural element must earn its place by
  explaining an observed pattern or changing a recommendation.
- **Stated goal accepted as the operative goal:** auditing against the
  documentation while the incentives point elsewhere, which makes every
  downstream finding measure the wrong target.
- **Parameter-only recommendations:** thresholds, staffing, and timeouts
  adjusted while the structure generating the problem is untouched. This is
  what "we fixed it and it came back" is made of.
- **Paradigm-only recommendations:** a level-10 or level-11 prescription with
  no implementable step, which reads as profound and functions as an excuse.
- **Technical-only reading:** auditing the machine and omitting the people
  whose incentives and decision rights determine how it is used.
- **Time-blindness:** recommending what helps this quarter and worsens the
  structure next year, without saying so.
- **False certainty:** a confident pattern claim built on a snapshot, or a
  mechanism inferred from correlation alone and reported as evidenced.
- **Escalate / stop** when: no behavior-over-time evidence exists and the
  question requires a pattern claim (say what to collect and for how long); the
  boundary cannot be settled because the sponsor and the affected team disagree
  on what system is being audited (surface the disagreement — it is frequently
  the finding); the highest-leverage intervention sits outside the boundary or
  above the requester's authority (name it anyway, addressed to whoever can
  act); or acting on a recommendation would touch production data or live
  traffic (recommend, do not execute — human authorization is required).

## Related skills

- `technical-review-auditor` — audits one artifact for what it fails to
  decide; this audits why a system keeps producing an outcome. That one for a
  plan or design doc, this one when the problem outlives its fixes.
- `debugging-root-cause-analysis` — proves one defect's cause chain with a
  reproduction; this takes over when the class recurs and the chain terminates
  in a structure rather than a line of code.
- `engineering-risk-analysis` — scores discrete failure modes into an owned
  register; consumes this skill's loops and delays as risk sources.
- `technical-debt-assessment` — inventories and prices the debt stock; this
  audits the flows that generate it, and is the answer to why the register
  refills.
- `system-architecture` / `first-principles-design` — define structure; this
  judges whether the structure can produce the intended behavior.
  `developer-experience-improvement` overlaps at level 4 and owns the
  remediation once this skill locates the delay.
- `stakeholder-communication` — carries an operative-goal or incentive finding
  to whoever owns the incentive, who is usually not an engineer.

## References

Read these when the audit reaches them, not up front.

- `references/systems-concepts.md` — stock and flow catalog, loop mechanics,
  delay taxonomy, constraint-vs-policy test, field templates.
- `references/archetypes.md` — the nine archetypes: signature, discriminating
  test, implied intervention.
- `references/leverage-points.md` — the eleven levels, each one's typical form
  and characteristic failure, per-recommendation template.
- `references/report-template.md` — full report with the extended assumption,
  tradeoff, and risk registers.

## Measuring this skill

`evaluations/` holds the library-wide activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. Its cases deliberately include a system where
the correct answer is "no loop here" and the correct recommendation is a
parameter change. This skill's characteristic failure is over-application, and
a suite that only rewarded finding structure would select for it.
