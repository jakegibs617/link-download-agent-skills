---
name: system-architecture
description: Defines or recovers the architecture of a whole system — service and module boundaries, data ownership, communication contracts, and cross-cutting concerns — and records decisions as ADRs. Use when work spans multiple services or teams, when boundaries are disputed, or when documenting the as-built architecture of an existing system. Not for single-component design (first-principles-design) or code-level structure (refactoring).
---

# System Architecture

## Purpose

Produce an architecture description that answers, with evidence: what the
parts are, which part owns which data, how parts communicate and fail
together, and why each boundary sits where it does — so teams can build
independently without re-negotiating the seams.

## Inputs

- The system's goals and quality attributes (availability, latency,
  compliance, team topology). If unstated, extract candidates and confirm.
- For existing systems: the code, deploy config, and infra definitions —
  MUST be inspected directly; diagrams and docs are claims to verify, not facts.
- Team structure and ownership map (Conway's law is a real input).
- Expected growth in traffic, data, and team size, or explicit "unknown".

## Procedure

1. **Establish the drivers.** Rank the top 3–5 quality attributes with
   sources. "Everything is critical" is not an architecture input; force
   ranking or escalate. Every later decision MUST trace to a driver.
2. **Inventory reality first (as-built systems).** Map actual components,
   dependencies, data stores, and communication paths from code and config —
   record each edge with where it was observed (import, HTTP call site,
   queue binding, IAM rule). Divergence between docs and reality is a finding.
3. **Draw boundaries around data ownership.** Each entity gets exactly one
   owning component; all other access goes through that owner's contract.
   Shared-database edges MUST be flagged as coupling debt with a remediation
   direction.
4. **Choose interaction styles deliberately.** For each edge: sync vs async,
   request/response vs event, with the failure-coupling consequence stated
   (what happens to A when B is down or slow?). MUST NOT leave an edge's
   failure behavior unspecified.
5. **Address cross-cutting concerns once.** AuthN/Z, tenancy, observability,
   configuration, data retention/deletion — each handled at a named layer,
   not per-service improvisation.
6. **Stress the design.** Walk: a region/dependency outage, 10x one
   dimension of load, a new team taking a component, a compliance audit
   demanding data deletion, and the most likely product pivot. Record what
   breaks and what absorbs it.
7. **Record decisions as ADRs.** Each significant decision: context, options
   considered, decision, consequences (including negative ones), revisit
   trigger. Alternatives seriously considered MUST appear — an ADR with one
   option is a memo, not a decision record.
8. **Define the evolution path.** Current state → target state as ordered,
   independently shippable steps; each step leaves the system working.
9. **Self-check** against the Quality Checklist.

## Output Format

```markdown
# Architecture: <system>

## Drivers (ranked, sourced)
## Component map
<components, responsibilities, owned data; for as-built: evidence per edge>
## Interaction contracts
| Edge | Style | Contract | Failure behavior when callee degrades |
## Cross-cutting concerns
## Stress-test findings
## ADRs
### ADR-1: <title> — context / options / decision / consequences / revisit trigger
## Evolution plan (ordered, shippable steps)
## Risks, assumptions, open questions
```

## Quality Checklist

- [ ] Drivers ranked and sourced; every boundary decision traces to one.
- [ ] Every entity has exactly one owner; shared-DB edges flagged.
- [ ] Every inter-component edge has explicit failure behavior.
- [ ] As-built maps cite where each edge was observed in code/config.
- [ ] Each ADR contains ≥ 2 genuinely considered options and a revisit trigger.
- [ ] Evolution steps are individually shippable, not a big-bang.

## Failure Conditions

- **Diagram-as-architecture:** boxes and arrows with no contracts, failure
  behavior, or ownership — pretty but undecidable.
- **Doc trust:** describing the intended architecture from stale docs without
  verifying against code/config (hallucination risk on as-built work).
- **Distribution by default:** introducing service boundaries no driver asked
  for; every network edge added MUST be justified by a ranked driver.
- **Conway denial:** boundaries that no existing team can own.
- **Escalate / stop** when: quality attributes cannot be ranked by any
  stakeholder; two teams claim ownership of the same data and no decider
  exists; or the as-built inventory reveals undocumented components whose
  purpose nobody can explain (surface, don't guess).

## Related skills

- `first-principles-design` — for the internals of a single component.
- `distributed-systems-design` — for the mechanics of specific distributed interactions.
- `legacy-system-modernization` / `migration-planning` — when the evolution
  plan implies replatforming.
- `codebase-comprehension` — feeds the as-built inventory.
