---
name: performance-engineering
description: Makes systems measurably faster or cheaper by profiling before changing anything, attacking the dominant cost, and proving each improvement against a stable baseline — covering latency, throughput, memory, and startup across the stack. Use when something is slow, a latency/throughput target must be met, or a performance claim needs verification. Not for database query plans specifically (database-design-optimization), horizontal-scaling architecture (distributed-systems-design), or availability failures (reliability-fault-tolerance).
---

# Performance Engineering

## Purpose

Deliver verified performance improvements: a measured baseline, a profile
identifying where the time/memory actually goes, targeted changes to the
dominant cost, and after-measurements proving the gain — never optimization
by folklore.

## Inputs

- The performance complaint or target, made quantitative: which operation,
  what percentile, under what load, against what budget. "It's slow" MUST
  be converted to numbers before work starts.
- A way to measure: profiler, benchmark harness, APM traces, or at minimum
  reproducible timing. No measurement path → build one first; that is the
  work.
- The workload's realism: production-like data sizes, cache states, and
  concurrency. Note every way the measurement environment differs from
  production.

## Procedure

1. **Define the budget and the baseline.** Target metric (p50/p95/p99
   latency, rps, MB, startup ms) with its source. Measure current state
   with enough runs to see variance — a baseline without variance bounds
   can't detect improvement. Record environment and inputs for repeatability.
2. **Profile before touching code.** CPU profile, allocation profile, or
   distributed trace as appropriate. Identify the dominant cost with
   numbers ("62% of wall time in JSON serialization"). MUST NOT change code
   before a profile names the target — intuition-directed optimization is
   the canonical failure.
3. **Classify the dominant cost:** algorithmic (complexity class — fix the
   algorithm before micro-tuning it), I/O-bound (batching, parallelism,
   caching candidacy), allocation/GC, serialization, lock contention
   (hand to `concurrency-correctness` if correctness-entangled), or
   simply-doing-unnecessary-work (the most common: repeated computation,
   over-fetching, chatty loops).
4. **Fix in leverage order:** don't do the work at all (cache, precompute,
   skip) → do it once (dedupe, batch) → do it better (algorithm) → do it
   in parallel → micro-optimize. Caching entries MUST come with an
   invalidation story and a staleness bound, or they're bugs on a delay.
5. **One change, one measurement.** Re-run the identical benchmark per
   change; keep only changes that beat the baseline beyond its variance.
   Report regressions and no-ops honestly — discarded attempts are findings.
6. **Check the collateral:** memory traded for speed, cold-start impact,
   behavior under the *next* load level (does the fix cliff at 2x?), and
   readability cost of any micro-optimization (justify or revert).
7. **Guard the gain.** Where infrastructure allows, add a regression check
   (benchmark in CI, alert threshold) so the win survives the next quarter.

## Output Format

```markdown
# Performance report: <operation>
## Target and baseline
<metric, budget with source, baseline ± variance, environment notes>
## Profile findings
<dominant costs with % figures, profiler evidence>
## Changes
| # | Change | Hypothesis | Result vs baseline | Kept? |
## Collateral effects
<memory/startup/complexity tradeoffs, behavior at next load level>
## Remaining budget gap and next candidates
## Regression guard added
```

## Quality Checklist

- [ ] Target quantified with source; baseline measured with variance.
- [ ] Profile evidence names the dominant cost before any change.
- [ ] Changes applied and measured one at a time; no-ops/regressions reported.
- [ ] Every cache has an invalidation story and staleness bound.
- [ ] Collateral costs (memory, complexity, next-load-level) assessed.
- [ ] Measurement-vs-production differences disclosed.

## Failure Conditions

- **Folklore optimization:** applying famous tricks (object pooling, string
  builders, `for` vs `map`) with no profile showing they matter here.
- **Benchmark theater:** measuring warm-cache dev-laptop microbenchmarks
  and claiming production wins.
- **Percentile blindness:** improving the mean while p99 (the complaint)
  worsens.
- **Cache-and-pray:** caching without invalidation semantics.
- **Unreported regressions:** silently dropping attempts that made things
  worse.
- **Escalate / stop** when: the budget is physically unreachable (speed of
  light, data volume) — renegotiate the target with evidence; the dominant
  cost is in a dependency or platform (report upstream, consider
  `dependency-evaluation`); or the fix requires an architecture change
  (hand the evidence to `system-architecture`/`distributed-systems-design`).

## Related skills

- `database-design-optimization` — when the profile points into the database.
- `concurrency-correctness` — lock contention and parallelization safety.
- `distributed-systems-design` — when one machine can't meet the budget.
- `observability-incident-response` — production performance regressions
  found via alerts.
