# Architecture Concepts

Source: Martin Fowler's architecture writing at
[martinfowler.com/architecture](https://martinfowler.com/architecture), plus the
Domain-Driven Design vocabulary he documents.

These are ideas for structuring and evolving whole systems, not individual
classes. Use them to reframe a question when the finding is not "this violates a
factor" or "this needs a pattern" but "this is the wrong shape, or the right shape
arrived at too early".

---

## Separation of concerns / service boundaries

Each service, module, or layer owns one coherent responsibility, and a change to
one does not force changes in unrelated others.

This is the umbrella concept. Bounded context (below) is its DDD-flavored special
case for domain modeling, but the concern applies just as much to non-domain
seams: ingestion versus orchestration versus publication, read paths versus write
paths, product logic versus platform capability.

**Give this its own pass.** When reviewing a multi-service proposal, check
separation of concerns explicitly and separately from bounded context — a passing
mention of "bounded context" is not a boundaries review. Weigh the proposal
against the human-authored boundary definition supplied as input: does it respect
the boundaries as defined, or does it leak a concern across one?

*Violation signatures:*
- Two components must be changed together for most features (a distributed
  monolith).
- One component reaches into another's data store directly.
- A "shared" module that every service depends on and every team edits.
- A boundary drawn around a technology (all the caching, all the queues) rather
  than a responsibility.

## Bounded context

Each service or module owns a well-defined part of the domain model with its own
ubiquitous language. The same word may mean different things in different
contexts, and that is correct — forcing one canonical model across the whole
system is what produces the shared schema nobody can change.

*Use it for:* deciding whether a set of services' domain-model ownership makes
sense; spotting a single entity being co-owned by two teams with different
definitions of it.

*Violation signature:* one shared model or schema leaking across every service; a
core entity whose meaning has to be negotiated between teams before any change.

## Evolutionary architecture

Design for the architecture itself to change incrementally, guided by **fitness
functions** — automated checks that a given architectural characteristic still
holds (performance budget, dependency direction, module boundaries, security
posture) — rather than by a single correct upfront design.

*Use it when:* the system's shape is still shifting, and a review keeps producing
"it depends on where this goes next". The answer is often to add the fitness
function that will catch the drift, not to pick the final shape now.

*Violation signature:* an architecture with no automated guard on the property it
was designed for. Boundaries that exist only in a document erode within a quarter.

## Monolith first

Start new systems as a monolith even when microservices are the eventual goal.
Service boundaries are hard to get right before the domain is understood, and
splitting too early draws boundaries around implementation accidents rather than
domain seams — which are then expensive to move because they are network calls.

*Use it against:* a greenfield proposal that opens with a service topology, a team
count smaller than the proposed service count, or a "ready for scale" justification
with no traffic figures behind it.

*Counter-consideration:* an existing, well-understood domain with clear seams and
independent teams is not the case this argues against. Say which case you are in.

## Strangler fig application

Replace a legacy system incrementally: route a growing share of functionality to
the new system behind a façade until the old one can be switched off, rather than
a big-bang rewrite.

*Use it when:* "should we rewrite this" comes up. The fuller playbook —
sequencing, cutover, data migration, rollback — belongs to
`legacy-system-modernization`; cite the concept here and hand off.

*Violation signature:* a rewrite plan with a single cutover date, no intermediate
state where both systems run, and no way to route a fraction of traffic.

## Conway's law

System boundaries tend to mirror the communication structures of the organization
that built them. A mismatch between team structure and desired architecture is a
real constraint, not just a technical inconvenience — either the architecture will
drift toward the org chart, or the org chart has to move.

*Use it when:* a proposal draws boundaries no existing team can own, or splits one
team's work across three services, or gives one team components with conflicting
mandates.

## Sacrificial architecture

A first version may be deliberately incomplete or imperfect **if its explicit
purpose is to prove something out** — validate an approach, unblock a demo, learn
what the real requirements are — with an intent to revisit once that purpose is
served.

**This is not a license to skip hygiene.** It applies only when both hold:

1. The team has explicitly named *what* is being sacrificed and *why*; and
2. There is a real revisit trigger — a date, a milestone, a usage threshold — not
   a vague "we'll fix it later".

Absent both, corner-cutting is a defect to flag, not sacrificial architecture in
action. And some things are not sacrificeable at all regardless of the trigger:
credentials in source control, missing authorization checks, data loss paths, and
anything that cannot be undone after it ships once. When someone invokes this
concept to get a pass on those, the correct response is to say the concept does
not cover them.

*Review question:* "What is being sacrificed, and what event causes us to revisit
it?" If neither answer exists, the finding stands.

---

## Applying this in review

- These concepts reframe; they rarely produce a line-item finding on their own.
  Pair each with a concrete observation from the solution.
- When one of them implies a consequential, hard-to-reverse decision — split this,
  don't split this, rewrite, strangle — hand it to `system-architecture` for ADR
  capture. A reframing left in a review comment does not survive the quarter.
- Cite at most the one or two that actually change the recommendation. Listing all
  seven is the structural version of a checklist dump.
