---
name: code-change-review
description: Reviews a code change (diff/PR) for correctness, safety, test adequacy, and maintainability, producing findings ranked by severity with evidence and a clear merge verdict — reading the diff in the context of the code it touches. Use when asked to review a PR, diff, or patch before merge. Not for authoring the change (code-implementation), deep security audit (security-engineering, which this escalates to), or reviewing a whole repository's health (technical-debt-assessment).
---

# Code Change Review

## Purpose

Produce a review that catches what matters before merge — correctness bugs,
security/data risks, missing tests, and maintainability traps — each finding
evidenced and severity-ranked, ending in an actionable verdict, without
drowning the author in nits or rubber-stamping.

## Inputs

- The diff/PR and its stated intent (linked issue, description). A change
  whose intent is unstated gets that flagged first — you can't review
  against an unknown goal.
- The surrounding code the diff touches: callers, the modified functions'
  contracts, related tests. MUST read beyond the diff lines; most real bugs
  live in the interaction between changed and unchanged code.
- The repo's conventions and CI status.

## Procedure

1. **Understand intent, then confirm the diff matches it.** Restate what the
   change is supposed to do. Does the diff actually do that, all of it, and
   only that? Scope creep and partial implementation are findings.
2. **Read in context, not in isolation.** For each changed function, check
   its callers and callees: does the change break a caller's assumption,
   violate a contract, or miss a call site that needed the same change?
   Diff-only review is the top source of missed bugs.
3. **Hunt correctness first, by category:** boundary conditions (off-by-one,
   empty, null, overflow), error handling (swallowed errors, wrong error
   surfaced, partial failure leaving inconsistent state), concurrency
   (shared state, races — escalate to `concurrency-correctness` if deep),
   resource handling (leaks, unclosed handles), and logic that contradicts
   the intent. Each finding MUST reference the specific line and state the
   failing input/condition.
4. **Check the risk surfaces:** anything touching auth, untrusted input,
   crypto, or persisted data gets extra scrutiny and escalates to
   `security-engineering` when non-trivial; anything touching a schema,
   public API, or serialized format gets a compatibility check; anything
   touching money/PII gets correctness-critical treatment.
5. **Assess the tests.** Do new/changed behaviors have tests that would fail
   without this change? Are edge and error paths covered? A behavior change
   with no test is a finding, not a nit. Reference `testing-strategy` for
   gaps beyond the diff.
6. **Then maintainability:** naming, duplication, dead code, unclear logic
   that will mislead the next reader, and convention violations. These are
   real but lower-severity — MUST NOT let style nits crowd out correctness.
7. **Rank and verdict.** Each finding: severity (blocker / major / minor /
   nit), evidence (line + failure scenario), and a concrete fix or question.
   Separate "must fix before merge" from "consider" from "optional".
   Distinguish confirmed defects from questions where you lack context —
   MUST NOT assert a bug you can't substantiate; ask instead.
8. **State the verdict:** approve / approve-with-nits / request-changes /
   needs-more-info, with the one or two things that actually drive it.

## Output Format

```markdown
# Review: <PR title> — Verdict: <approve | approve-with-nits | request-changes | needs-info>
## Intent (restated) and whether the diff matches it
## Blockers
### B1: <title> — file:line — failure scenario — fix/question — (confirmed | question)
## Major
## Minor / nits (grouped, brief)
## Test adequacy
## Escalations (security / concurrency / compat handed to other skills)
## What drove the verdict
```

## Quality Checklist

- [ ] Intent restated; diff checked for match, scope creep, completeness.
- [ ] Changed functions read in caller/callee context, not diff-only.
- [ ] Correctness findings each cite a line and a concrete failing case.
- [ ] Risk surfaces (auth/data/schema/money) given extra scrutiny or escalated.
- [ ] Test adequacy assessed; untested behavior change flagged.
- [ ] Findings severity-ranked; confirmed defects separated from questions.
- [ ] Verdict stated with its drivers; nits not inflated.

## Failure Conditions

- **Diff-tunnel vision:** reviewing only changed lines, missing the caller
  the change breaks.
- **Nit flooding:** a wall of style comments that buries the one real bug
  and exhausts the author.
- **Rubber stamp:** "LGTM" on a diff with an unread failure path.
- **Phantom bugs:** asserting a defect that context (unseen code) actually
  handles — MUST phrase as a question when unsure.
- **Severity flattening:** everything "major", or a data-loss bug filed next
  to a naming preference.
- **Escalate / stop** when: the diff's intent is unstated or contradicts the
  code (ask before reviewing); the change is too large to review meaningfully
  (request a split rather than skimming); or judging correctness needs
  domain/product context you lack (mark needs-info, don't guess).

## Related skills

- `code-implementation` — authored the change; fixes findings.
- `security-engineering` / `concurrency-correctness` — deep dives this
  escalates to.
- `testing-strategy` — for test-gap findings beyond the immediate diff.
- `technical-debt-assessment` — when the review reveals systemic (not
  change-specific) problems.
