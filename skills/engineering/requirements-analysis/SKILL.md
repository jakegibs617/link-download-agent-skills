---
name: requirements-analysis
description: Turns vague or conflicting feature requests into testable, prioritized requirements by extracting the underlying goal, resolving or explicitly documenting every ambiguity, and producing acceptance criteria. Use before design or implementation begins, when a request is underspecified, when stakeholders disagree, or when scope keeps shifting. Not for choosing the technical design (first-principles-design) or estimating the work (technical-planning-estimation).
---

# Requirements Analysis and Ambiguity Resolution

## Purpose

Produce a requirements document precise enough that (a) an implementer who
never spoke to the requester would build the right thing, and (b) every
requirement can be objectively verified as done or not done.

## Inputs

- The request in whatever form exists (ticket, chat log, one-liner, PRD).
- Access to whoever made the request, if available; otherwise say so.
- Relevant existing system context: current behavior, constraints, prior art
  in the codebase or docs.
- Known non-functional constraints (deadlines, compliance, performance,
  budget) — ask for them if absent; do not invent them.

## Procedure

1. **Restate the goal, not the ask.** MUST identify the problem behind the
   requested solution ("users abandon checkout" vs. "add a progress bar").
   If the request specifies a solution, record the implied problem as an
   inference, labeled as such, and confirm it if a requester is reachable.
2. **Inventory what is actually known.** Read the source material and the
   relevant parts of the existing system before writing anything. Every
   requirement MUST trace to a source: quoted request text, observed system
   behavior, or a named assumption. MUST NOT promote an assumption to a fact.
3. **Enumerate actors and cases.** For each user/system actor: normal flow,
   error flows, empty/zero states, concurrent use, permission boundaries,
   and lifecycle edges (first use, migration of existing data, deletion).
   Cases judged out of scope MUST be listed as explicit exclusions.
4. **Hunt ambiguity deliberately.** For each requirement ask: could two
   reasonable engineers implement this differently and both claim success?
   If yes, it is ambiguous. Resolve by (in order): asking the requester,
   citing existing system behavior, or documenting a decision with rationale
   in the Open Questions/Decisions table. MUST NOT silently pick an
   interpretation.
5. **Separate functional from non-functional.** Capture performance,
   security, accessibility, compliance, and operability requirements
   explicitly, each with a measurable threshold or an explicit "no
   requirement" marker.
6. **Detect conflicts.** Check each requirement pairwise against the others
   and against known constraints. Conflicts MUST be surfaced with the
   tradeoff stated, not quietly resolved.
7. **Write acceptance criteria.** Each requirement gets at least one
   criterion in Given/When/Then or equivalent verifiable form. A criterion
   that cannot be objectively checked MUST be rewritten or the requirement
   flagged as untestable.
8. **Prioritize.** Mark each requirement MUST / SHOULD / MAY for this
   iteration, with a one-line reason for anything demoted from the original
   ask.
9. **Self-check** against the Quality Checklist before finalizing.

## Output Format

```markdown
# Requirements: <feature>

## Problem statement
<goal behind the ask; label inferred parts>

## In scope / Out of scope
<bulleted, with exclusions explicit>

## Requirements
| ID | Requirement | Priority | Source | Acceptance criteria |

## Non-functional requirements
| ID | Category | Requirement | Threshold |

## Open questions and decisions
| # | Question | Options | Status (open / decided: rationale) | Owner |

## Assumptions
<numbered; each marked SAFE-TO-PROCEED or BLOCKS-IMPLEMENTATION>

## Conflicts and tradeoffs
<each conflict + recommended resolution>
```

## Quality Checklist

- [ ] Every requirement has a source (quote, observation, or labeled assumption).
- [ ] Every requirement has a verifiable acceptance criterion.
- [ ] Error, empty, permission, and lifecycle cases addressed or excluded explicitly.
- [ ] No open question was silently answered by the analysis itself.
- [ ] Non-functional categories each have a threshold or explicit "none".
- [ ] Someone could implement from this document without talking to the requester.

## Failure Conditions

- **Solution laundering:** restating the requester's proposed solution as
  the requirement without surfacing the underlying problem.
- **Phantom precision:** inventing thresholds ("under 200ms") with no source
  — hallucination risk; thresholds without sources MUST appear as open questions.
- **Ambiguity burial:** resolving an ambiguity by picking silently instead of
  documenting the decision.
- **Scope mirroring:** listing only the cases the requester mentioned.
- **Escalate / stop** when: the problem statement cannot be confirmed and the
  interpretations diverge materially; two stakeholders' requirements directly
  conflict and no priority owner exists; or a BLOCKS-IMPLEMENTATION
  assumption cannot be resolved. Hand off to `first-principles-design` only
  once blocking questions are answered or explicitly deferred by the requester.

## Related skills

- `first-principles-design` — consumes this output to design the solution.
- `technical-planning-estimation` — consumes this output to slice and estimate.
- `stakeholder-communication` — when requirements decisions must be explained
  to non-engineers.
