---
name: legacy-system-modernization
description: Decides how to modernize a legacy system — what to keep, wrap, rewrite, or retire — grounded in the system's real behavior and business value, favoring incremental strangler-fig evolution over big-bang rewrites unless evidence justifies otherwise. Use when a system is hard to change but still valuable, or when a rewrite is being proposed. Not for the step-by-step cutover mechanics (migration-planning), localized cleanup (refactoring), or debt inventory (technical-debt-assessment).
---

# Legacy System Modernization

## Purpose

Produce a modernization strategy that preserves the legacy system's hard-won
correctness and business value while removing the constraints that make it
hard to change — biased toward incremental, reversible evolution, with a
big-bang rewrite chosen only when the evidence genuinely demands it.

## Inputs

- The legacy system, with enough access to learn what it actually does
  (behavior, not just code) — invoke `codebase-comprehension` if the system
  isn't yet understood. MUST NOT plan modernization of a system whose
  behavior is a mystery.
- The business context: what value the system delivers, what it costs to run
  and change, why modernization is being considered now, and the appetite
  for risk and investment.
- The real constraints: it can't stop serving users during the work; data
  can't be lost; some behaviors are load-bearing even if they look like bugs.

## Procedure

1. **Establish what the system actually does and is worth.** Map its
   behaviors and, crucially, which are business-critical, which are
   accidental, and which are undocumented-but-depended-on (the "weird" logic
   is often years of encoded edge cases). MUST assume undocumented behavior
   is load-bearing until proven otherwise — the discarded quirk that was
   actually a tax rule is the classic rewrite disaster.
2. **Name the actual pain, precisely.** Why modernize? Slow to change?
   Can't hire for the stack? Scaling ceiling? Unsupported dependency?
   Reliability? The pain determines the strategy — "it's old" is not a
   reason; "we can't patch a critical CVE because the framework is EOL" is.
3. **Decide per capability, not for the whole system:** for each subsystem,
   choose keep (it works, low pain), wrap/encapsulate (stable behind a new
   interface), rewrite (high pain, well-understood), or retire (unused —
   verify with data, not assumption). A blanket verdict for the whole system
   is almost always wrong; the value is in the differentiation.
4. **Default to the strangler fig.** Prefer incrementally routing capability
   from old to new behind a facade, so value ships continuously and each
   step is reversible. Big-bang rewrite MUST clear a high bar: the system is
   small enough, OR incremental is genuinely impossible (name why), AND the
   team can maintain both feature-freeze and rewrite simultaneously (usually
   they can't — the moving target problem sinks most rewrites).
5. **Confront the rewrite fallacies explicitly if a rewrite is on the table:**
   the second-system effect, the two-years-of-no-features gap, the loss of
   encoded edge-case knowledge, and the fact that the new system starts with
   zero of the old one's battle-tested bug fixes. If recommending a rewrite,
   MUST show these were weighed, not ignored.
6. **Protect behavior during change.** Characterization/golden-master tests
   pinning current behavior before anything moves (route to
   `testing-strategy`); parallel-run and comparison where correctness is
   critical; data migration treated as its own risk (hand mechanics to
   `migration-planning`).
7. **Sequence for early value and reversibility.** Front-load a
   thin-but-real slice that proves the approach and delivers value, not the
   easiest or the hardest part. Each phase leaves a working, shippable
   system. Define the abort criteria — when to stop and reassess.
8. **State the target state and the path**, with the keep/wrap/rewrite/retire
   decision per capability, the sequencing, and the risks (deep-dive to
   `engineering-risk-analysis`).

## Output Format

```markdown
# Modernization strategy: <system>
## What the system does and its business value (incl. suspected load-bearing quirks)
## The actual pain driving modernization
## Per-capability disposition
| Capability | Disposition (keep/wrap/rewrite/retire) | Rationale | Evidence |
## Strategy: strangler-fig phases (or rewrite justification if chosen)
## Behavior-preservation plan (characterization tests, parallel run)
## Sequencing (first real slice, phase gates, abort criteria)
## Risks and dependencies (→ engineering-risk-analysis, migration-planning)
## Assumptions and unknowns
```

## Quality Checklist

- [ ] System behavior understood before strategy; undocumented behavior treated as load-bearing.
- [ ] Specific pain named as the driver, not age.
- [ ] Disposition decided per capability, not one blanket verdict.
- [ ] Strangler-fig default; any rewrite clears the high bar with fallacies weighed.
- [ ] Behavior-preservation (characterization/parallel-run) planned.
- [ ] Phased, reversible sequencing with a real first slice and abort criteria.

## Failure Conditions

- **Rewrite reflex:** recommending a full rewrite because the code is old/
  ugly, ignoring the value and edge cases it encodes.
- **Quirk discard:** planning to drop "weird" behavior without verifying it
  isn't load-bearing — the highest-consequence failure.
- **Blanket verdict:** one keep/rewrite decision for a system that needs
  differentiated treatment.
- **Big-bang optimism:** a rewrite plan assuming feature-freeze and a
  static target that reality won't grant.
- **Understanding-free planning:** strategizing over a system nobody has
  actually mapped.
- **Escalate / stop** when: the system's behavior genuinely can't be
  recovered (no docs, no tests, no experts, obfuscated) — that itself
  reshapes the strategy toward careful wrapping, and must be surfaced; the
  modernization is really a business-capability decision (is this worth
  keeping at all?) above the engineering call; or a rewrite is mandated
  despite the evidence (document the risks clearly for the decider).

## Related skills

- `codebase-comprehension` — recovers the system behavior this depends on.
- `migration-planning` — the step-by-step cutover and data migration.
- `refactoring` — in-place improvement for capabilities marked "keep/wrap".
- `technical-debt-assessment` / `engineering-risk-analysis` — inputs and
  risk deep-dive.
