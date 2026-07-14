---
name: developer-experience-improvement
description: Diagnoses and improves the friction developers hit in their daily loop — setup, build/test speed, feedback latency, local environments, tooling, and internal-platform ergonomics — measuring the friction before fixing it. Use when onboarding is painful, the inner loop is slow, tooling is fighting the team, or a platform/library's ergonomics need work. Not for CI/CD pipeline delivery mechanics (cicd-release-engineering), external API design (api-design), or docs alone (technical-documentation).
---

# Developer Experience Improvement

## Purpose

Reduce the cumulative time and frustration tax the team pays on its daily
loop, targeting the friction that actually costs the most — measured, not
guessed — so improvements compound across every developer, every day.

## Inputs

- The friction complaint or the loop under review: onboarding, build, test,
  local run, debug, review, or an internal tool/library others build on.
- Signals: setup time, build/test durations, how often developers wait,
  where new hires get stuck, what generates the most Slack "how do I..."
  questions. Gather these before prescribing.
- The team size and shape — DX improvements scale by number of developers ×
  frequency, so a 30-second daily annoyance across 50 devs outranks a
  one-time hour.

## Procedure

1. **Measure the friction before touching it.** Time the actual loop: clone-
   to-running-app, edit-to-feedback, test-suite duration, common-task steps.
   Count frequency (how often per developer per day). MUST quantify —
   "the build feels slow" becomes "the median edit-to-test-result is 90s,
   run ~40×/day/dev". DX is an optimization problem; without the baseline
   it's taste.
2. **Rank by total tax, not severity.** Friction cost = time-per-occurrence
   × frequency × developers affected. A frequent small annoyance usually
   beats a rare large one. The inner loop (edit→build→test→see-result) is
   highest-leverage because it runs constantly — weight it accordingly.
3. **Find the root friction, not the symptom.** Slow tests might be
   environment setup, not the tests; confusing onboarding might be missing
   defaults, not missing docs. Trace the friction to its cause (some of this
   is `debugging-root-cause-analysis` applied to process).
4. **Fix in leverage order:** eliminate the step (sensible defaults, automate
   the manual, remove the ceremony) → speed it up (incremental builds, test
   selection, caching, faster feedback) → make it discoverable (the paved
   path, good error messages that say what to do next) → document last (docs
   are the fallback when you couldn't remove the friction). Prefer making
   the easy thing the default over documenting the hard thing.
5. **Respect the escape hatch.** Improving the common path MUST NOT lock out
   the uncommon one — the developer who needs to do something unusual should
   be able to, even if it's less smooth. Golden paths that are cages breed
   workarounds.
6. **Measure the improvement.** Re-time the loop after the change; confirm
   the tax actually dropped and no new friction appeared (the setup tool that
   itself breaks). Report the before/after honestly, including changes that
   didn't help.
7. **Guard against regression.** Where possible, add a check that keeps the
   loop fast (build-time budget in CI, a smoke test of the setup script) so
   the improvement doesn't silently erode.

## Output Format

```markdown
# DX assessment: <loop/area>
## Measured friction (baseline)
| Friction point | Time/occurrence | Frequency | Devs affected | Total tax |
## Root causes (not symptoms)
## Improvements (leverage order: eliminate → speed → discoverable → document)
| Change | Expected tax reduction | Effort | Escape hatch preserved? |
## Before/after measurement
## Regression guard
## Assumptions and gaps
```

## Quality Checklist

- [ ] Friction measured (time × frequency × devs), not asserted.
- [ ] Ranked by total tax; inner loop weighted for its frequency.
- [ ] Root friction traced, not symptom-treated.
- [ ] Fixes prefer elimination/defaults over documentation.
- [ ] Escape hatch for uncommon needs preserved.
- [ ] Improvement re-measured; no-help changes reported.

## Failure Conditions

- **Taste-driven DX:** rebuilding tooling on preference with no friction
  measurement.
- **Severity over frequency:** fixing the dramatic rare pain, ignoring the
  constant small tax that costs more in aggregate.
- **Symptom treatment:** writing an onboarding doc for friction that better
  defaults would erase.
- **Golden cage:** a paved path that blocks legitimate uncommon workflows.
- **Unmeasured wins:** claiming improvement with no before/after.
- **New-friction blindness:** a DX tool that adds its own maintenance/failure
  burden exceeding the friction it removed.
- **Escalate / stop** when: the friction is really a fundamental
  architecture problem (slow tests because everything is coupled — route to
  `refactoring`/`system-architecture`); the fix needs org/process change
  outside engineering's control (surface it); or measuring requires
  instrumentation the user must set up.

## Related skills

- `cicd-release-engineering` — CI speed/reliability where that's the friction.
- `technical-documentation` — the paved-path docs, when docs are the right fix.
- `refactoring` — when DX friction traces to code structure (testability).
- `debugging-root-cause-analysis` — applied to process friction's root cause.
