---
name: reliability-fault-tolerance
description: Makes systems degrade gracefully instead of failing completely — timeouts, retries, circuit breakers, bulkheads, fallbacks, redundancy, and graceful degradation, engineered against explicit availability targets and failure-mode analysis. Use when hardening a service, setting SLOs, reviewing failure handling, or after an outage exposes brittleness. Not for diagnosing a live incident (observability-incident-response), cross-service consistency design (distributed-systems-design), or defect diagnosis (debugging-root-cause-analysis).
---

# Reliability and Fault Tolerance

## Purpose

Deliver failure handling that is designed rather than accreted: every
dependency has a failure plan, every degradation is chosen (not discovered),
and reliability spending is matched to an explicit target — because a nine
you don't need is money you burned.

## Inputs

- The availability/latency target (SLO) and its source; if none exists,
  deriving a proposed SLO from user impact is the first deliverable.
- The dependency map: everything this system calls, with each dependency's
  own reliability track record where known.
- Failure history: past incidents, known brittle paths.
- The degradation preferences from the product side: what may be stale,
  hidden, queued, or refused when things fail — or a note that nobody has
  decided (that's a finding).

## Procedure

1. **Set the target before the mechanisms.** Confirm or propose the SLO
   with an error budget. MUST size mechanisms to the target: a 99.5%
   internal tool doesn't get multi-region failover, and a 99.99% payment
   path doesn't get "we'll restart it".
2. **Enumerate failure modes dependency-by-dependency.** For each dependency
   and resource: slow (the dangerous one — slower-than-timeout eats threads),
   down, erroring, lying (200s with bad data), and flapping. For each, the
   consequence at this system's boundary MUST be stated.
3. **Design the failure response per mode, from the standard kit:**
   - **Timeouts:** every network call has one, set from the callee's actual
     latency distribution (p99 + margin), not folklore round numbers; total
     request budget allocated across the call chain so upstream timeouts
     don't fire before downstream ones.
   - **Retries:** only for idempotent operations, budgeted, jittered,
     and never multiplied across layers (retry amplification MUST be
     checked end-to-end).
   - **Circuit breakers:** on dependencies whose failure is contagious;
     define trip/half-open/reset criteria and the open-state fallback.
   - **Bulkheads:** isolate pools per dependency/tenant so one failure
     can't exhaust shared resources.
   - **Fallbacks/degradation:** the chosen degraded behavior per feature
     (stale cache, default value, hidden section, queued write, honest
     error) — each approved by the degradation preferences from Inputs.
4. **Remove single points of failure worth removing.** Redundancy where the
   budget requires it (instances, zones, regions — in cost order), with the
   failover mechanism tested, not assumed: an untested failover is a
   second failure mode.
5. **Check the failure handling's own failure modes.** Fallback paths that
   are never exercised rot; circuit breakers misconfigured cause outages
   themselves; health checks that check the wrong thing route traffic to
   corpses. Every mechanism added MUST have a verification story
   (test, chaos drill, or scheduled exercise).
6. **Make failures observable:** every breaker trip, retry exhaustion,
   fallback activation, and degraded mode emits a metric/event an operator
   will actually see (ties into `observability-incident-response`).
7. **Validate against history and drills.** Replay past incidents against
   the new design on paper; where feasible, propose fault-injection tests
   for the top three failure modes.

## Output Format

```markdown
# Reliability design: <system>
## Target
<SLO + error budget, source, and what it rules in/out>
## Failure-mode table
| Dependency | Mode (slow/down/error/lying/flap) | Consequence | Response | Verified how |
## Mechanism specs
<timeouts w/ budget allocation, retry budgets, breaker criteria, bulkhead pools>
## Degradation ladder
<per feature: full → degraded → refused, with product sign-off status>
## SPOF and redundancy decisions (with cost rationale)
## Observability of failure handling
## Gaps, accepted risks, and proposed drills
```

## Quality Checklist

- [ ] Mechanisms sized to an explicit SLO; nothing gold-plated past the target.
- [ ] Every network call has a distribution-derived timeout; budget allocated across the chain.
- [ ] Retry amplification checked across layers; retries idempotent-only.
- [ ] Every degraded behavior is a product-approved choice or flagged for one.
- [ ] Every mechanism has a verification story.
- [ ] Failure handling emits operator-visible signals.

## Failure Conditions

- **Reliability theater:** breakers and retries sprinkled without failure-
  mode analysis — mechanisms MUST trace to modes.
- **Timeout folklore:** 30s everywhere, upstream firing before downstream.
- **Retry amplification:** 3 retries × 3 layers = 27 requests into a
  struggling dependency.
- **Untested failover / rotting fallbacks.**
- **Slow-failure blindness:** designing only for crash-down, not for slow.
- **Escalate / stop** when: no one will own an SLO decision (reliability
  spending is unboundable without it); the degradation choice is a product
  decision nobody has made; or the budget demands redundancy the
  infrastructure can't provide.

## Related skills

- `observability-incident-response` — detection and response when these
  mechanisms fire in anger.
- `distributed-systems-design` — consistency implications of retries,
  failover, and queueing.
- `engineering-risk-analysis` — broader risk register beyond availability.
- `production-readiness-review` — consumes this as launch-gate evidence.
