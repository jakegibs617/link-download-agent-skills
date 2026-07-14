---
name: first-principles-design
description: Designs a software solution from the actual problem constraints rather than from habit or fashion — generates genuinely distinct candidate designs, evaluates them against explicit criteria, and recommends one with tradeoffs stated. Use when starting a nontrivial feature or component, when an existing approach feels forced, or when a team is anchored on the first idea. Not for gathering requirements (requirements-analysis), whole-system topology (system-architecture), or restructuring existing code (refactoring).
---

# First-Principles Software Design

## Purpose

Produce a design decision that survives scrutiny: the chosen approach, the
real alternatives it beat, the criteria it beat them on, and the conditions
under which the decision should be revisited.

## Inputs

- A requirements document or equivalently clear problem statement (if absent,
  invoke `requirements-analysis` first — MUST NOT design against a vague ask).
- Hard constraints: existing stack, team skills, deadline, budget, compliance.
- The relevant existing code and its conventions, when designing within a system.
- Expected load/scale figures, or an explicit note that they are unknown.

## Procedure

1. **Reduce to invariants.** List what must be true regardless of design:
   data that must not be lost, ordering that must hold, latencies that must
   be met, interfaces that cannot change. Each invariant MUST cite its source
   (requirement, physics, existing contract). Everything else is negotiable.
2. **State the design criteria before designing.** Pick 3–6 weighted criteria
   (e.g. correctness under concurrency, operational simplicity, time to ship,
   evolvability). MUST be written down before candidates are generated —
   criteria invented after the fact rationalize; criteria written first decide.
3. **Generate ≥ 3 genuinely distinct candidates.** Distinct means different
   decomposition or data flow, not the same design with a different library.
   MUST include the simplest thing that could possibly work as one candidate,
   and SHOULD include a "buy/reuse instead of build" candidate where
   plausible (defer evaluation of specific vendors to `dependency-evaluation`).
4. **Attack each candidate before scoring it.** For each: what breaks it?
   Walk failure modes (partial failure, retry storms, concurrent writers,
   growth by 10x), lifecycle (migration in, migration out, deletion), and
   operational load (who gets paged, what do they see?). Findings from this
   step are evidence; record them.
5. **Score against the criteria.** A short matrix, scores justified by step-4
   evidence, not adjectives. Where a score rests on an assumption (e.g.
   unverified traffic estimate), label it and note how to verify.
6. **Recommend and bound.** Pick one candidate. State: why it won, what was
   given up, and the explicit revisit triggers ("if writes exceed X/s",
   "if a second consumer appears") that would invalidate the choice.
7. **Define the skeleton.** Name the components, their responsibilities, the
   interfaces between them, and the data model at the level of entities and
   ownership — enough for `api-design` / `database-design-optimization` /
   `code-implementation` to proceed without re-deciding anything settled here.
8. **Self-check** against the Quality Checklist.

## Output Format

```markdown
# Design: <problem>

## Invariants (with sources)
## Design criteria (weighted, fixed before candidates)
## Candidates
### A: <name> — sketch, failure analysis, what breaks it
### B/C: ...
## Decision matrix
| Criterion (weight) | A | B | C | evidence |
## Recommendation
<winner, cost of choosing it, rejected-alternative summary>
## Revisit triggers
## Component skeleton
<components, responsibilities, interfaces, entity ownership>
## Assumptions and open questions
```

## Quality Checklist

- [ ] Criteria were fixed before candidates were scored.
- [ ] ≥ 3 candidates with genuinely different structure; simplest-possible included.
- [ ] Every candidate has a failure-mode analysis, not just a pitch.
- [ ] Matrix scores cite evidence from the attack step.
- [ ] Recommendation names what was given up and when to revisit.
- [ ] No invariant lacks a source; no assumption is presented as fact.

## Failure Conditions

- **Anchoring:** presenting one real design plus two strawmen. Detectable when
  alternatives share the winner's decomposition or are attacked harder than it.
- **Fashion-driven design:** choosing event sourcing / microservices / a
  particular library because it is current, with criteria back-fitted.
- **Complexity worship:** rejecting the simple candidate for hypothetical
  scale with no sourced load figure — if scale is unknown, that is an
  assumption to surface, not a license to distribute.
- **Skipping the attack step** and scoring on vibes.
- **Escalate / stop** when: an invariant conflicts with a hard constraint
  (needs a requirements or stakeholder decision); load estimates swing the
  decision but cannot be sourced; or the winning design requires a capability
  the team demonstrably lacks and the deadline is fixed.

## Related skills

- `requirements-analysis` — prerequisite when the problem is vague.
- `system-architecture` — when the decision spans services/teams, not one component.
- `dependency-evaluation` — to evaluate a specific buy/reuse candidate.
- `engineering-risk-analysis` — for a deeper pass on the chosen design's risks.
