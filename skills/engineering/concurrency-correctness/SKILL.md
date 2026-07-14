---
name: concurrency-correctness
description: Analyzes and designs concurrent code for correctness — data races, deadlocks, atomicity violations, memory-visibility, and ordering bugs within a single process or shared-memory system — reasoning about interleavings rather than trusting that tests pass. Use when code shares mutable state across threads/tasks, when a heisenbug smells like a race, or when designing locking/synchronization. Not for cross-service distributed coordination (distributed-systems-design) or general debugging (debugging-root-cause-analysis).
---

# Concurrency Correctness

## Purpose

Establish whether concurrent code is correct under all interleavings — not
just the ones that happened to run — by reasoning explicitly about shared
state, the memory model, and adversarial scheduling, then designing
synchronization that is correct and as simple as the problem allows.

## Why tests aren't enough

Concurrency bugs are probabilistic: a race can pass 10,000 test runs and fail
in production under different timing, load, or hardware. "The tests pass" is
near-worthless evidence for concurrency correctness. Correctness here is
established by reasoning about interleavings, then optionally stressed —
never by green tests alone. MUST NOT declare concurrent code correct on the
strength of passing tests.

## Inputs

- The concurrent code or design, the concurrency model (threads, async tasks,
  actors, goroutines), and the language's memory model (visibility/ordering
  guarantees are language-specific — Java != C++ != Go).
- The shared mutable state: every piece of data touched by more than one
  thread of execution. Identifying this completely is the whole game.
- The invariants that must hold (what "correct" means for this data).

## Procedure

1. **Inventory shared mutable state exhaustively.** Every variable, field,
   collection, or resource reachable by two concurrent executions. Include
   the non-obvious: lazy initialization, caches, memoization, shared library
   state, static/global fields, and "read-only" data that's actually mutated
   once. A missed shared variable is a missed race — MUST be thorough here.
2. **For each shared datum, establish the synchronization discipline.** What
   protects it: a lock (which one?), atomics, confinement to one thread,
   immutability, or a channel/queue. State the discipline explicitly. Data
   with no discipline and concurrent access is a data race — flag it. MUST
   verify every access obeys the stated discipline (the one unlocked access
   is the bug).
3. **Check atomicity of compound operations.** Individually-safe operations
   compose into races: check-then-act (if-absent-put), read-modify-write
   (counter++), and multi-variable invariants updated non-atomically. A lock
   per operation doesn't make a sequence atomic — verify the invariant's
   scope, not just individual accesses.
4. **Hunt deadlock and liveness.** Lock-ordering (two locks acquired in
   different orders → deadlock; establish a global order), lock held across
   a blocking/external call, re-entrancy assumptions, and lost wakeups
   (wait without a loop/condition recheck). Also livelock and starvation
   where relevant. MUST check lock acquisition order across the whole code
   path, not one function.
5. **Respect the memory model.** Visibility (a write by one thread isn't
   guaranteed visible to another without a happens-before edge) and
   reordering (compiler/CPU reorder absent barriers). Don't assume
   sequential consistency. Flag reliance on unsynchronized reads "seeing"
   another thread's writes.
6. **Prefer designs that remove the hazard over ones that manage it.**
   Immutability, confinement (don't share), and message-passing eliminate
   classes of bug that locks only manage. Recommend the simplest correct
   model; a lock-free scheme MUST justify its complexity against a
   demonstrated need — clever concurrent code is where subtle bugs hide.
7. **Reason adversarially, then stress.** Walk the worst interleaving for
   each hazard by hand (thread A between line X and Y, thread B runs). Where
   a bug is suspected, propose the stress/injection test (many threads,
   randomized delays, thread sanitizer / race detector) — but as
   confirmation of the reasoning, not a substitute for it.

## Output Format

```markdown
# Concurrency analysis: <target>
## Shared mutable state inventory (each item + who accesses it)
## Synchronization discipline per datum (+ any unprotected access = race)
## Atomicity findings (compound-operation races)
## Deadlock/liveness findings (lock-order, held-across-blocking, lost wakeups)
## Memory-model findings (visibility/ordering)
## Adversarial interleavings walked (hazard → bad schedule → outcome)
## Recommended design (simplest correct model; justify any lock-free scheme)
## Suggested stress/race-detector tests (to confirm, not to prove)
```

## Quality Checklist

- [ ] Shared mutable state inventoried exhaustively, including non-obvious.
- [ ] Every shared datum has a stated discipline; every access checked against it.
- [ ] Compound-operation atomicity checked, not just individual accesses.
- [ ] Lock ordering checked across whole paths; held-across-blocking flagged.
- [ ] Memory-model visibility/ordering considered, not sequential-consistency assumed.
- [ ] Correctness argued by interleaving reasoning, not passing tests.
- [ ] Simplest correct model preferred; lock-free complexity justified.

## Failure Conditions

- **Tests-pass fallacy:** declaring race-free because the suite is green.
- **Incomplete state inventory:** missing a shared variable (static, cache,
  lazy init) and thus its race.
- **Per-access lock myopia:** locking each access but missing the compound
  operation's non-atomicity.
- **Single-function lock analysis:** checking lock order in isolation,
  missing the cross-path inversion that deadlocks.
- **Sequential-consistency assumption:** trusting unsynchronized writes to be
  visible/ordered.
- **Cleverness for its own sake:** a lock-free algorithm where a mutex would
  be correct and obvious.
- **Escalate / stop** when: the correct design requires cross-process/
  distributed coordination (route to `distributed-systems-design`); the
  language's memory model guarantees needed aren't documented/available
  (flag the assumption); or a suspected race can't be confirmed by reasoning
  and needs a race detector the user must run (say so, don't declare it safe).

## Related skills

- `distributed-systems-design` — the same hazards across process boundaries.
- `debugging-root-cause-analysis` — general debugging; hands timing-dependent
  bugs here.
- `performance-engineering` — when lock contention is a perf (not correctness)
  problem.
- `code-change-review` — escalates concurrency-touching diffs to this skill.
