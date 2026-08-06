# Document Skeletons

Skeletons, not forms — drop sections that genuinely don't apply, but say so
rather than deleting silently.

Document mode produces the skeleton and names each section's owner. The sections
themselves are filled by the skills that own the analysis; a design doc written
entirely here is the absorption failure in document form.

## Solution design doc

```markdown
# <Title>

## Problem
What's broken or missing, for whom, and what happens if we do nothing.

## Goals & non-goals
Goals: measurable outcomes. Non-goals: explicitly out of scope (prevents scope
creep and false expectations).

## Constraints
Hard limits this design must live within — team, timeline, budget, existing
systems, compliance.

## Proposed design
The design at the level of boundaries, data flow, and interfaces. Diagrams over
prose where structure matters.

## Alternatives considered
One subsection per alternative: what it was, its honest pros, and the driver that
killed it.

## Risks & mitigations
Each risk: likelihood, blast radius, and either a mitigation or an explicit
acceptance.

## Phasing
What ships when. Phase 1 delivers real value; the riskiest assumption is tested
earliest.

## Open questions
Unknowns needing a spike or a decision-maker, each with an owner.
```

Section owners: Problem → `requirements-analysis`. Proposed design →
`system-architecture`. Alternatives → `first-principles-design`. Risks →
`engineering-risk-analysis`. Phasing → `technical-planning-estimation`.

## ADR (Architecture Decision Record)

```markdown
# ADR-NNN: <Decision as a statement, e.g. "Use Postgres for game state">

## Status
Proposed | Accepted | Superseded by ADR-NNN

## Context
The situation forcing a decision, and the drivers ranked (the top driver decides
ties).

## Decision
What we're doing, in one or two sentences.

## Alternatives
Each option considered, with honest cons for all — including the chosen one.

## Consequences
What becomes easier, what becomes harder, what debt or lock-in we accept. Include
the reversibility class (one-way / two-way door).
```

`system-architecture` owns ADR capture. Route consequential decisions there
rather than recording them here.

## RFC (proposal circulated for comment)

An RFC is a design doc plus an explicit decision process. Use it when the
decision needs agreement from people outside the authoring team.

```markdown
# RFC-NNN: <Proposal>

## Summary
The proposal in three sentences, readable by someone who will not read further.

## Motivation
The problem, and why now. What forces a decision in this cycle rather than later.

## Proposal
The design, at the depth a reviewer needs to disagree with it specifically.

## Alternatives considered
Including do-nothing, which is always a real option and is frequently the right
one.

## Impact
Who is affected, what they must change, and what it costs them.

## Decision process
Who decides, who must be consulted, what the comment window is, and what
happens if no consensus forms.

## Unresolved questions
Explicitly deferred, each with the person or event that resolves it.
```

The **Decision process** section is what distinguishes an RFC from a design doc.
An RFC without it is a design doc with a wider distribution list, and tends to
collect comments that never resolve.
