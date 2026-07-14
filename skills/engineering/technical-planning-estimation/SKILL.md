---
name: technical-planning-estimation
description: Breaks work into a sequenced, dependency-aware plan with honest, uncertainty-ranged estimates and identified risks — decomposing to verifiable increments and exposing the unknowns that drive schedule. Use when planning a feature/project, estimating effort, or sequencing work with dependencies. Not for the technical design itself (first-principles-design / system-architecture), risk analysis in depth (engineering-risk-analysis), or multi-system migration sequencing (migration-planning).
---

# Technical Planning and Estimation

## Purpose

Produce a plan that sequences work into independently verifiable increments,
surfaces the dependencies and unknowns that actually drive the schedule, and
gives estimates as honest ranges tied to explicit assumptions — so decisions
are made on real uncertainty, not a false single number.

## Inputs

- The goal and its acceptance criteria (from `requirements-analysis`) and
  the chosen design (from `first-principles-design`/`system-architecture`).
  Planning without these estimates fiction — flag if missing.
- The constraints: deadline, team size/skills, hard dependencies (other
  teams, vendors, approvals).
- The definition of done: tested? deployed? documented? — because that's
  what's being estimated.

## Procedure

1. **Decompose into vertical increments.** Slice by deliverable user/system
   value, not by layer (not "build all the DB, then all the API"). Each
   increment should be independently shippable or at least verifiable, and
   small enough to estimate with some confidence (multi-week opaque blocks
   hide the risk). MUST decompose to where each piece is understood.
2. **Map dependencies and order.** Build the dependency graph: what must
   precede what, what's parallelizable, what's blocked on someone else.
   The critical path — not the sum of tasks — determines the timeline.
   External dependencies (other teams, approvals, procurement) MUST be
   called out; they're the usual schedule-killers and aren't in your control.
3. **Estimate with ranges and drivers.** For each increment give a range
   (optimistic / likely / pessimistic), not a point. The spread reflects
   uncertainty; a wide spread is a signal to investigate, not to average
   away. MUST tie each estimate to its assumptions and name the biggest
   unknown driving its spread. Estimate the definition-of-done work
   (testing, review, deploy, docs), not just the happy-path coding.
4. **Surface the unknowns as first-class.** Separate "known work" from
   "unknowns that need investigation". Where an unknown dominates the
   estimate, recommend a timeboxed spike to collapse it before committing —
   estimating around a large unknown is guessing with decimals.
5. **Account for the non-coding reality.** Integration friction, review
   cycles, environment/CI issues, meetings, context-switching, and the
   near-certainty of discovered work. Padding hidden inside task estimates
   is dishonest; an explicit contingency tied to the risk level is not.
6. **Identify the plan's risks and sequencing hedges.** Front-load the
   riskiest/most-uncertain increments (fail early, learn early) unless a
   dependency forbids it. Note where the plan branches on an unknown's
   outcome. Deep risk analysis hands to `engineering-risk-analysis`.
7. **State confidence and what would change it.** Give the overall estimate
   as a range with a confidence level, the assumptions it rests on, and the
   top three things that would move it. MUST NOT present a single date as
   certain.

## Output Format

```markdown
# Plan: <goal>
## Assumptions and definition of done
## Increments (vertical, verifiable)
| # | Increment | Depends on | Estimate (opt/likely/pess) | Key unknown |
## Dependency graph and critical path
## External dependencies (owner, needed-by)
## Unknowns and recommended spikes (timeboxed)
## Sequencing rationale (what's front-loaded and why)
## Overall estimate: <range> at <confidence>; top schedule drivers
## Risks (summary; deep-dive → engineering-risk-analysis)
```

## Quality Checklist

- [ ] Work sliced into vertical, verifiable increments, not layers.
- [ ] Dependency graph built; critical path identified, not task-sum.
- [ ] External dependencies named with owners.
- [ ] Estimates are ranges tied to assumptions and named unknowns.
- [ ] Definition-of-done work included, not just coding.
- [ ] Dominant unknowns flagged for spikes; contingency explicit not hidden.
- [ ] Overall estimate given as a range with confidence, never a false point.

## Failure Conditions

- **False precision:** "6 weeks" with no range, no assumptions, no unknowns.
- **Horizontal slicing:** all-DB-then-all-API increments that deliver nothing
  until the end and hide integration risk.
- **Happy-path estimation:** counting coding, ignoring review/test/deploy/
  discovered work.
- **Unknown laundering:** burying a giant unknown inside a confident number
  instead of spiking it.
- **Critical-path blindness:** summing all tasks instead of finding the
  binding sequence.
- **Padding by stealth:** inflating tasks silently instead of an honest
  contingency.
- **Escalate / stop** when: the design or requirements aren't settled enough
  to estimate (send back); an unknown is large enough that any estimate is
  fiction until a spike runs (say so, estimate the spike, not the work); or
  the deadline is fixed and the honest range exceeds it (surface the gap and
  scope tradeoffs — don't fabricate a fitting number).

## Related skills

- `requirements-analysis` / `first-principles-design` — the inputs planning
  depends on.
- `engineering-risk-analysis` — deeper analysis of the risks this surfaces.
- `migration-planning` — for multi-system, phased migration sequencing.
- `stakeholder-communication` — presenting the estimate and its uncertainty
  to decision-makers.
