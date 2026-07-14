---
name: testing-strategy
description: Designs what to test and at which level — mapping risk to a proportionate mix of unit, integration, contract, property, and end-to-end tests, targeting behavior and edges rather than coverage percentages. Use when planning tests for a feature, filling gaps in a suite, fixing flaky/slow tests, or reviewing test quality. Not for writing the production code (code-implementation) or diagnosing a specific failure (debugging-root-cause-analysis).
---

# Testing Strategy

## Purpose

Produce a test plan (or a critique of an existing one) where the tests that
matter exist, sit at the cheapest level that can catch their failure class,
verify behavior rather than implementation, and give a trustworthy signal —
maximizing caught bugs per unit of maintenance, not coverage percentage.

## Inputs

- The code or feature under test and its risk profile: what breaks badly if
  wrong (money, data loss, security, correctness) vs cosmetically.
- The existing test suite and its pain points (flaky, slow, brittle, thin).
- The system's testability seams: what can be tested in isolation vs what
  needs integration; where the real external dependencies are.

## Procedure

1. **Rank the behaviors by risk.** List what the code must do and what
   happens if each is wrong. High-risk behaviors (silent data corruption,
   auth, money math) earn thorough testing; low-risk (a label's wording)
   earn little. MUST drive the plan from this, not from uniform coverage.
2. **Assign each behavior to the cheapest sufficient level:**
   - **Unit** — pure logic, algorithms, edge/boundary math, error mapping.
     Fast, many, isolated.
   - **Integration** — real interactions with DB, queue, filesystem; the
     wiring unit tests mock away. Where most "passed unit tests, broke in
     prod" bugs actually live.
   - **Contract** — the promise between a provider and its consumers (API
     schemas, event shapes) so both sides can't drift.
   - **Property-based** — invariants over generated inputs (round-trips,
     idempotence, ordering) where example tests can't cover the space.
   - **End-to-end** — a few critical user journeys, no more; expensive and
     flaky, so reserved for what only a full stack can prove.
   MUST avoid pushing to E2E what a unit/integration test covers (the
   inverted pyramid — slow, flaky, uninformative).
3. **Design the cases, not just the counts.** For each behavior: the happy
   path, the boundaries (empty, one, many, max, off-by-one), the error
   paths (and that the *right* error surfaces), and the nasty inputs
   (unicode, nulls, huge, malicious, concurrent). Enumerate them; a "we'll
   test the function" line is not a test design.
4. **Test behavior, not implementation.** Assert on observable outputs and
   effects, not internal calls/private state — tests coupled to structure
   break on every refactor and catch nothing new. Mock only true external
   boundaries; over-mocking tests the mocks. Flag any existing test that
   asserts implementation detail.
5. **Make the signal trustworthy.** Every test must be deterministic (no
   real clock/network/random without control), isolated (order-independent,
   own data), and fail with a message that localizes the fault. Diagnose
   flakiness to a cause (shared state, timing, ordering) — MUST NOT "fix"
   flakes with retries or sleeps.
6. **Cover the regression.** For a bug-driven plan, the regression test MUST
   fail on the buggy code and pass on the fixed code — verify both
   directions, not just that it's green now.
7. **State what's deliberately not tested** and why (cost, low risk,
   covered elsewhere) so gaps are decisions, not oversights.

## Output Format

```markdown
# Test plan: <feature/suite>
## Risk-ranked behaviors
| Behavior | Blast radius if wrong | Test level | Priority |
## Test design by level
### Unit / Integration / Contract / Property / E2E
<per level: the specific cases incl. boundaries and error paths>
## Test-quality findings (for existing suites)
<implementation-coupled, flaky, over-mocked, or false-confidence tests>
## Deliberately untested (with rationale)
## Determinism/isolation notes
```

## Quality Checklist

- [ ] Plan driven by risk ranking, not a coverage number.
- [ ] Each behavior at the cheapest sufficient level; no inverted pyramid.
- [ ] Boundary and error cases enumerated per behavior, not implied.
- [ ] Assertions target behavior/effects, not internals.
- [ ] Flakiness addressed by cause, never by retry/sleep.
- [ ] Regression tests verified to fail-then-pass across the fix.
- [ ] Untested areas listed as explicit decisions.

## Failure Conditions

- **Coverage worship:** chasing a % with assertion-free or trivial tests
  that execute lines without checking behavior.
- **Inverted pyramid:** everything as slow, flaky E2E.
- **Change-detector tests:** assertions on mock call counts and private
  state that break on refactor and catch no bugs.
- **Happy-path-only** suites.
- **Flake laundering:** retries/sleeps masking real nondeterminism.
- **Green-but-useless:** a test that passes on broken code (never verified
  to fail).
- **Escalate / stop** when: the code is structurally untestable (no seams) —
  a testability-refactor is the prerequisite, hand to `refactoring`; the
  correct behavior itself is undefined (that's `requirements-analysis`); or
  meaningful testing needs environments/data the user must provide.

## Related skills

- `code-implementation` — writes the code and the immediate tests; this
  skill sets the broader strategy.
- `debugging-root-cause-analysis` — supplies the bug whose regression test
  this designs.
- `refactoring` — creates seams when code resists testing.
- `code-change-review` — where weak tests in a diff get flagged.
