---
name: code-implementation
description: Implements a specified change in production code — locating the right seams, matching the codebase's conventions, handling errors and edge cases, and verifying the change actually works before declaring done. Use when the task is to write or modify code against a reasonably clear spec, design, or bug diagnosis. Not for deciding what to build (requirements-analysis / first-principles-design), restructuring without behavior change (refactoring), or diagnosing why something fails (debugging-root-cause-analysis).
---

# Code Implementation

## Purpose

Deliver a working, verified change that a maintainer would accept: correct
against the spec, idiomatic to the codebase, safe at its edges, and proven by
execution — not merely code that plausibly compiles.

## Inputs

- The spec: requirements, design decision, or RCA fix direction. If the spec
  leaves a material behavioral choice open, resolve it via the codebase's
  existing behavior or surface it — MUST NOT invent product behavior.
- The repository, with the ability to build and run tests.
- The codebase's conventions (discover them; see step 1).

## Procedure

1. **Read before writing.** Locate where the change belongs and read the
   surrounding code, its callers, and one or two analogous implementations
   in the same repo. Match their conventions — naming, error handling,
   layering, test style — even when you'd personally choose differently.
   Existing utilities MUST be reused over reimplementation; search first.
2. **Confirm the seam.** Verify the chosen insertion point is the one that
   makes callers correct: check every call site of anything whose behavior
   you change. A change that's right locally and wrong for one caller is wrong.
3. **State the plan in one paragraph** (files touched, behavior change,
   migration/compat implications). If the plan touches data schemas, public
   APIs, or persisted formats, flag compatibility explicitly before coding.
4. **Implement in small verifiable increments.** After each increment, run
   the narrowest relevant check (compile, targeted test). MUST NOT accumulate
   a large unverified diff.
5. **Handle the edges deliberately.** For each new code path: empty/null
   inputs, boundary sizes, error propagation (what does the caller see when
   this fails?), concurrent invocation if the context allows it, and i18n/
   timezone where relevant. Silently swallowed errors are forbidden;
   error handling MUST follow the repo's established pattern.
6. **Write the tests the change deserves.** At minimum: one test that fails
   without the change and passes with it, plus edge cases from step 5 that
   are cheap to cover. Follow the repo's test conventions. If the repo has
   no test infrastructure, note it — don't silently skip verification.
7. **Verify end to end.** Run the full relevant test suite and, where
   feasible, exercise the actual behavior (run the CLI, hit the endpoint).
   Report actual results — MUST NOT claim tests pass without running them,
   and MUST report failures verbatim rather than explaining them away.
8. **Review your own diff** as a hostile reviewer: dead code, debug leftovers,
   unrelated drive-by edits (revert them), TODOs without owners, comments
   that narrate instead of explain. The diff should be minimal and coherent.
9. **Report:** what changed, why, how it was verified, and anything a
   reviewer should look at skeptically.

## Output Format

The primary artifact is the diff itself. Accompany it with:

```markdown
## Change summary
<what and why, 2-4 sentences>
## Files touched
<path: one-line reason each>
## Behavior and compatibility notes
<user-visible changes, migration/compat flags, or "none">
## Verification
<commands run and their actual results; manual checks performed>
## Reviewer attention
<the riskiest part of this diff and why>
```

## Quality Checklist

- [ ] Analogous existing code read; conventions matched; utilities reused.
- [ ] All call sites of changed behavior checked.
- [ ] At least one test fails without the change, passes with it.
- [ ] Error paths follow the repo pattern; nothing swallowed.
- [ ] Full relevant suite run; results reported honestly.
- [ ] Diff contains no unrelated changes, debug leftovers, or dead code.

## Failure Conditions

- **Plausible-code syndrome:** shipping code that was never executed —
  the dominant failure; "it should work" is not verification.
- **Convention deafness:** imposing foreign idioms on a consistent codebase.
- **Reimplementation:** writing a helper the repo already has.
- **Scope creep:** "improving" neighboring code inside a targeted change.
- **Green-washing:** reporting success while tests fail, are skipped, or
  were never run — a critical integrity failure.
- **Escalate / stop** when: the spec demands behavior that contradicts
  existing documented behavior (product decision needed); the change
  requires a destructive migration (human authorization needed); or tests
  were already failing before your change (report the pre-existing state;
  don't absorb it).

## Related skills

- `debugging-root-cause-analysis` — when implementation uncovers a defect
  with a non-obvious cause.
- `refactoring` — when the seam you need doesn't exist and structure must
  change first (do it as a separate, behavior-preserving step).
- `testing-strategy` — for coverage design beyond the change at hand.
- `code-change-review` — reviews this skill's output before merge.
