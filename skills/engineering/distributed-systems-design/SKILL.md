---
name: distributed-systems-design
description: Designs correct behavior across process boundaries — consistency models, idempotency, exactly/at-least-once semantics, partitioning, backpressure, and coordination — where networks fail, clocks skew, and messages duplicate. Use when work spans multiple services/stores, introduces queues or events, shards data, or when cross-service invariants must hold. Not for whole-system topology (system-architecture), single-node performance (performance-engineering), or intra-process races (concurrency-correctness).
---

# Scalability and Distributed Systems Design

## Purpose

Produce distributed designs whose failure behavior is specified, whose
consistency guarantees are explicit and minimal, and whose scaling mechanism
is matched to a sourced load model — with every "it depends on the network
behaving" assumption eliminated or named.

## Inputs

- The cross-boundary interaction to design, and the invariant it must
  preserve ("an order is charged exactly once").
- The load model: request rates, data volume, growth, burst shape — sourced
  or explicitly assumed.
- The failure tolerance from the business side: what may be stale, what may
  be retried visibly, what must never happen twice, RPO/RTO if relevant.
- Existing infrastructure (queues, stores, service mesh) — reuse before
  introducing new moving parts.

## Procedure

1. **State the invariant and its consistency requirement.** For each
   cross-boundary invariant, decide: does it need linearizability, or is
   eventual consistency with a convergence bound acceptable? MUST derive
   this from business consequence, not engineering comfort — strong
   consistency is a cost paid in availability and latency (CAP is a budget,
   not trivia).
2. **Assume the network is out to get you.** For every message/call in the
   design, answer the standard betrayals: it's lost (timeout → then what?),
   it's duplicated (is the receiver idempotent? via what key?), it's
   reordered (does order matter? enforced how?), it's delayed past its
   relevance (staleness bound?), and the sender dies mid-sequence (what
   state is orphaned?). A design MUST answer all five per edge or document
   the accepted risk.
3. **Choose delivery semantics honestly.** At-least-once + idempotent
   consumer is the workhorse; exactly-once claims MUST be reduced to their
   actual mechanism (dedupe keys, transactional outbox, idempotency
   windows). Dual-writes without an outbox/CDC are flagged as a defect.
4. **Design the coordination floor.** Prefer designs needing no
   coordination (partition by key, single-writer per aggregate, CRDTs where
   merge semantics are honest). Where coordination is unavoidable, name the
   mechanism (transaction, lock service, saga with compensations) and its
   failure modes — a saga MUST list every compensation and what happens
   when compensation itself fails.
5. **Scale by partitioning, deliberately.** Partition key chosen against
   the access pattern (hot-key analysis MUST be done — celebrity/tenant
   skew), rebalancing story, and cross-partition operations enumerated
   (they're the expensive ones; minimize or batch them).
6. **Design backpressure end to end.** Every queue has a bound and a
   full-behavior (shed, block, degrade); every retry has a budget with
   jittered exponential backoff and a circuit breaker where fan-out
   amplifies; unbounded anything is a finding. Trace the overload path from
   ingress to the slowest dependency — where does load shedding happen first?
7. **Walk the failure drills on paper:** one replica of each component
   down; a full partition between two halves; the queue at 100x normal
   depth; a poison message; clock skew of minutes between nodes. Record
   what the design does in each, and what the operator sees.
8. **Specify the observability hooks:** correlation IDs across boundaries,
   lag/staleness metrics for every async edge, and dead-letter handling
   with an owner.

## Output Format

```markdown
# Distributed design: <interaction>
## Invariants and chosen consistency (with business-consequence rationale)
## Message/call table
| Edge | Lost | Duplicated | Reordered | Delayed | Sender dies |
## Delivery semantics and idempotency mechanisms
## Partitioning and hot-key analysis
## Backpressure and retry budget map
## Failure drills (scenario → behavior → operator view)
## Observability hooks
## Accepted risks and assumptions
```

## Quality Checklist

- [ ] Consistency choice justified by business consequence per invariant.
- [ ] All five network betrayals answered for every edge.
- [ ] Exactly-once claims reduced to a named mechanism; no dual-writes.
- [ ] Sagas list all compensations, incl. compensation failure.
- [ ] Hot-key/skew analysis done for every partition key.
- [ ] No unbounded queue or retry loop; overload path traced.

## Failure Conditions

- **Happy-path distribution:** designs specified only for delivered,
  ordered, single-copy messages.
- **Exactly-once mythology:** claiming exactly-once without a dedupe
  mechanism (hallucination-adjacent; the mechanism MUST be named).
- **Coordination maximalism:** distributed transactions where a partition
  key would do.
- **Retry storms:** retries without budgets/jitter amplifying outages.
- **Clock trust:** correctness resting on synchronized wall clocks.
- **Escalate / stop** when: the business demands an invariant that
  physically requires strong coordination it also refuses to pay for
  (surface the contradiction); the load model can't be sourced and the
  design flips on it; or the required consistency crosses an ownership/
  vendor boundary you can't change.

## Related skills

- `system-architecture` — owns where the boundaries are; this skill makes
  behavior across them correct.
- `reliability-fault-tolerance` — availability mechanics (timeouts,
  bulkheads, degradation) within and around these designs.
- `concurrency-correctness` — same reasoning inside one process.
- `database-design-optimization` — per-store schema/consistency mechanics.
