---
name: debugging-root-cause-analysis
description: Diagnoses defects by reproducing the failure, forming falsifiable hypotheses, and bisecting the cause chain with evidence until the root cause is proven — not just the proximate symptom patched. Use for bugs, flaky tests, regressions, and "works on my machine" mysteries. Not for live-incident stabilization (observability-incident-response owns mitigation first) or for implementing the fix once found (code-implementation).
---

# Debugging and Root-Cause Analysis

## Purpose

Produce a proven root cause: a cause chain from trigger to symptom where each
link is backed by observed evidence, plus a minimal reproduction and a fix
direction that closes the class of bug, not just the instance.

## Inputs

- The failure description: expected vs actual, when it started, frequency.
- Access to the code, and ideally: logs, stack traces, the failing input,
  environment details, and recent-change history (git log).
- A way to run the system or its tests. If no reproduction path exists at
  all, say so — evidence-free debugging is guessing.

## Procedure

1. **Pin down the discrepancy.** State expected behavior (with its source —
   spec, test, docs) and actual behavior (with its evidence — log, trace,
   screenshot). If "expected" has no source, that's a requirements question,
   not a bug; escalate.
2. **Reproduce before theorizing.** Get the smallest deterministic
   reproduction you can. For intermittent failures, establish frequency
   under repetition (run it N times, report the rate) before touching code.
   MUST NOT propose fixes for a failure never observed firsthand, except
   when reproduction is impossible — then label everything downstream as
   unverified-hypothesis work.
3. **Gather the cheap evidence first.** Stack trace, exact error text, recent
   commits touching the area (`git log`), environment diffs. A regression
   with a known-good version MUST be bisected (git bisect or manual) —
   bisection beats cleverness.
4. **Form falsifiable hypotheses.** Write each as "if H, then observation O
   under test T". Rank by likelihood × cheapness-to-test. MUST test
   hypotheses by changing one variable at a time; record each result,
   including eliminations — eliminated hypotheses are progress and MUST
   appear in the output.
5. **Follow the chain past the first cause.** When a hypothesis confirms,
   ask why that condition existed (bounded five-whys: stop at the deepest
   cause you can support with evidence — process speculation without
   evidence is out of scope). Distinguish: trigger, proximate cause, root
   cause, and contributing conditions.
6. **Prove it.** The root cause is proven when you can (a) predict the
   failure ("removing X reproduces it") and (b) make it disappear
   ("restoring X fixes it") — demonstrate both when feasible. A fix that
   works for unknown reasons is a flag, not a finish.
7. **Scope the blast radius.** Check where else the same defect pattern
   exists (same misuse, same API, same copy-paste family) and whether data
   was corrupted while the bug lived. Data-corruption findings escalate
   immediately.
8. **Hand off the fix.** Minimal repro, root cause, suggested fix direction,
   and a regression-test description. Implementation belongs to
   `code-implementation`; if asked to also fix, still produce this record.

## Output Format

```markdown
# RCA: <symptom>

## Discrepancy
Expected (source) vs Actual (evidence)
## Reproduction
<steps/command, determinism rate for flaky cases>
## Investigation log
| # | Hypothesis | Test | Result (confirmed/eliminated) | Evidence |
## Cause chain
Trigger → proximate cause → root cause (+ contributing conditions), each link cited
## Proof
<predict + eliminate demonstrations>
## Blast radius
<other instances of the pattern; data-integrity impact>
## Fix direction and regression test
## Confidence and open questions
```

## Quality Checklist

- [ ] Failure reproduced (or impossibility stated and downstream labeled hypothesis).
- [ ] Every eliminated hypothesis recorded with its disproving evidence.
- [ ] One variable changed per experiment.
- [ ] Cause chain distinguishes trigger / proximate / root.
- [ ] Root cause proven by predict-and-eliminate, or confidence explicitly lowered.
- [ ] Blast radius and data-integrity checked.

## Failure Conditions

- **Symptom patching:** fixing where it crashed instead of why (null-check
  bandaging a corrupted upstream value).
- **First-hypothesis lock-in:** confirming a pet theory by only running tests
  that can't falsify it.
- **Correlation leaps:** "it started after deploy X, so X caused it" without
  bisection or mechanism.
- **Fix-by-mystery:** shipping a change that makes the symptom vanish for
  unexplained reasons.
- **Multi-variable experiments** that make results unattributable.
- **Escalate / stop** when: evidence indicates ongoing data corruption or a
  security breach (stop debugging, report immediately — see
  `security-engineering` / `observability-incident-response`); reproduction
  requires production access you don't have; or the failure sits in a
  third-party dependency (document the minimal repro against the dependency
  and hand to `dependency-evaluation` for replace/patch decisions).

## Related skills

- `observability-incident-response` — owns live-incident mitigation; this
  skill runs after (or alongside) stabilization.
- `code-implementation` — implements the fix.
- `testing-strategy` — turns the regression test description into coverage.
- `concurrency-correctness` — for race conditions; hand off when timing is the variable.
