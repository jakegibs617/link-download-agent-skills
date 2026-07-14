---
name: refactoring
description: Restructures existing code without changing observable behavior — improving names, boundaries, duplication, and coupling in small, individually verified steps under test protection. Use when code structure impedes a change, when duplication or god-objects accumulate, or to prepare a seam before a feature. Not for behavior changes (code-implementation), fixing defects (debugging-root-cause-analysis), or whole-system replatforming (legacy-system-modernization).
---

# Refactoring

## Purpose

Deliver structurally better code whose observable behavior is provably
unchanged — every step small enough to verify, every improvement motivated
by a concrete cost the old structure imposed.

## Inputs

- The refactoring goal, ideally motivated by a real impediment ("adding
  payment method #4 requires touching 9 files"). Aesthetic-only motivation
  is a yellow flag — record who bears the current cost.
- The code and its test suite. Test coverage over the affected behavior is
  the precondition; measure or probe it before starting.
- The blast radius: who calls this code, including reflection/serialization/
  external consumers that static analysis misses.

## Procedure

1. **Establish the behavioral contract.** Identify the observable behavior
   that must not change: outputs, side effects, error types/messages that
   callers depend on, performance characteristics if load-bearing,
   serialization formats, public API shapes. Anything persisted or crossing
   a process boundary is part of the contract by default.
2. **Verify the safety net.** Run the existing tests over the affected code
   and check they actually exercise the behavior being preserved (mutate a
   line, see a failure — spot-check, don't assume). Where coverage is
   missing, MUST add characterization tests (pinning current behavior,
   including current bugs) before restructuring. Discovered bugs are
   recorded and reported, NOT fixed in the refactor — fixing changes behavior.
3. **Plan the step sequence.** Decompose into steps where each leaves the
   code compiling and tests green (extract, rename, move, inline, introduce
   parameter — the standard catalog). MUST NOT plan a step whose
   intermediate state can't be verified.
4. **Execute one step at a time.** After each step: build + run the relevant
   tests. On unexpected red: revert the step, don't debug forward on a
   broken base. Commit (or checkpoint) at each green state when the
   environment allows.
5. **Watch the contract edges.** Renames and moves that touch anything
   reflective, serialized, string-referenced (routes, DI containers, config
   keys, DB columns, public API) MUST be individually verified — these are
   where "safe" refactors break production.
6. **Stop at the goal.** The refactor is done when the motivating impediment
   is gone. Improvements beyond that are new proposals, not silent additions.
   Resist cascade temptation ("while I'm here...") — log follow-ups instead.
7. **Verify the whole.** Full relevant suite green; behavior spot-checked
   end-to-end where feasible; diff reviewed to confirm zero intentional
   behavior change (and any unavoidable observable difference — e.g. log
   text — explicitly listed).

## Output Format

```markdown
## Refactoring report: <goal>
## Motivation
<the concrete impediment, who paid its cost>
## Behavioral contract preserved
<what was pinned, incl. serialization/API edges checked>
## Safety net
<coverage found, characterization tests added, bugs discovered-not-fixed>
## Steps executed
| # | Step | Verification result |
## Observable differences (should be none; list any)
## Follow-ups logged (not done)
```

## Quality Checklist

- [ ] Motivating impediment stated; refactor stops when it's resolved.
- [ ] Coverage verified by probe, not assumed; characterization tests added where thin.
- [ ] Discovered bugs reported, not silently fixed.
- [ ] Each step independently verified green; no debugging-forward on red.
- [ ] Reflection/serialization/string-reference edges individually checked.
- [ ] Diff contains no behavior change and no unrelated "improvements".

## Failure Conditions

- **Refactor-plus:** bundling behavior changes or bug fixes into the
  refactor, destroying the reviewability guarantee.
- **Big-bang restructure:** one giant unverifiable diff.
- **Coverage assumption:** trusting tests that don't actually pin the behavior.
- **String-reference blindness:** renaming something referenced by route
  table, ORM mapping, or config and shipping the break.
- **Cascade addiction:** the refactor that never ends.
- **Escalate / stop** when: the behavior can't be pinned (no tests, no way
  to add them safely — e.g. untestable I/O tangle) — propose a seam-creation
  plan instead of proceeding blind; the contract itself is disputed (callers
  depend on behavior that looks like a bug — product decision needed); or the
  needed restructuring crosses team ownership boundaries.

## Related skills

- `code-implementation` — for the behavior change the refactor was preparing.
- `technical-debt-assessment` — to prioritize which refactors are worth doing.
- `design-pattern-application` — when the target structure is a named pattern.
- `legacy-system-modernization` — when the scope outgrows in-place refactoring.
