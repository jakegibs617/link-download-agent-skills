---
name: solution-engineering-fundamentals
description: Vets a concrete solution — a service proposal, design doc, or existing implementation — against named, citable industry baselines — the twelve-factor app methodology, Fowler's enterprise application pattern catalog, and Fowler's architecture concepts. Use when checking operational hygiene, choosing a data-access or domain-logic pattern, testing whether a service boundary holds or mirrors the org chart, or when the user says "12-factor", "enterprise patterns", "Fowler patterns", "bounded context", "strangler fig", "Conway's law", or "architecture fundamentals". Requires a solution already on the table. Not for adversarial review of what a document omits (technical-review-auditor), launch gating (production-readiness-review), code-level pattern selection (design-pattern-application), or producing the design itself (first-principles-design, system-architecture).
---

# Solution Engineering Fundamentals

## Purpose

Find what a proposed or existing solution gets wrong, and cite the named baseline
that says so — "this violates twelve-factor's Config factor", "this is a textbook
Gateway", "this splits a bounded context down the middle" — so every finding is
checkable and disputable by someone who disagrees.

**Governing principle: a finding with no named baseline is an opinion; a named
baseline with no observed violation is a checklist dump.** Both are failures of
this skill, and the second is the more common one. The deliverable is the
intersection: the specific places this solution departs from a well-known
standard, each one traceable to its source.

This skill supplies the *baseline*. Other skills own the *process* of designing
(`first-principles-design`, `system-architecture`) or interrogating
(`technical-review-auditor`) a solution. It always operates on something concrete
— a proposal, a design doc, a running service. Given a bare problem statement, it
has nothing to check, and MUST say so rather than inventing a design to review.

## Inputs

- **The solution under review.** A written proposal, a design doc, or an existing
  service's code and deploy config. MUST NOT be a blank problem statement; see
  Failure Conditions for the handoff.
- **Its runtime and deployment shape** — language, process model, how it is
  deployed and scaled. Twelve-factor findings depend on this: a factor that binds
  a long-running horizontally scaled service does not bind a scheduled batch job.
- **Which lens applies.** Operational hygiene → `references/twelve-factor.md`.
  A data-access, domain-logic, or integration structure choice →
  `references/eaa-patterns.md`. A structural or evolution question (should this
  be split, rewritten, or left alone) → `references/architecture-concepts.md`.
  Load only what the question needs.
- **A human-authored definition of service boundaries**, for any review that
  touches one. Boundary definitions are opinionated and MUST come from a person —
  inferring them from directory structure or generated context files produces a
  boundary map that describes the code's accidents rather than the intended
  seams. If none exists, ask for one before a boundary-sensitive review.
- **The record of accepted tradeoffs** — ADRs, design docs, known-issues lists.
  Without this, every deliberate decision looks like a fresh defect.

## Procedure

1. **Select the lens.** Identify which of the three references the question
   actually needs, and say which one you are applying. "Should this setting live
   in a committed config file or the environment" needs one factor, not the whole
   methodology. MUST NOT run all three references against every question.
2. **Establish what the solution actually does.** For an existing service, read
   the code and deploy config; for a proposal, read what it commits to. Findings
   cite where the violation lives (file, config key, or the line of the proposal).
   A finding you cannot locate is a hypothesis, and MUST be labeled as one.
3. **Check against the relevant entries only.** Each reference lists, per entry,
   the violation signature to look for. Walk those, not the summary.
4. **Name the baseline behind every finding.** Factor, pattern, or concept, by
   name. This is what makes the advice arguable instead of vibes.
5. **Separate defect from accepted tradeoff.** Before flagging, check the ADRs and
   known-issues record. A documented, deliberate decision gets reported as an
   accepted deviation with its stated rationale — not re-litigated as a fresh
   miss. If the rationale has expired (the condition it assumed no longer holds),
   that expiry is the finding.
6. **Prefer the simplest sufficient pattern.** The catalog is a menu, not a
   mandate. Before recommending a pattern, name the pressure it relieves and
   confirm that pressure is present in this solution. Reaching for a pattern
   because it is well-known is its own defect.
7. **Run a dedicated boundaries pass** whenever the solution adds, moves, or
   crosses a service boundary — new service, new integration, a new call between
   existing components. Check separation of concerns against the human-authored
   boundary definition explicitly and separately. MUST NOT let a passing mention
   of "bounded context" stand in for this pass; they answer different questions
   (bounded context is about domain-model ownership, separation of concerns
   covers non-domain seams too).
8. **Hand off decisions, don't bury them.** When a finding implies a
   consequential, hard-to-reverse choice, hand it to `system-architecture` for
   ADR capture rather than leaving it as a review comment.
9. **Self-check** against the Quality Checklist.

## Output Format

When applied inline alongside other work, skip the report: fold the citation
directly into the recommendation being made ("move this to an env var —
twelve-factor Config"). When asked for a standalone review, produce:

```markdown
# Baseline review: <solution>

## Scope
<what was reviewed, which lens(es) applied and why the others were not>

## Findings
| # | Finding | Baseline violated | Where observed | Why it's a miss | Severity |

## Patterns
<applicable pattern(s), the pressure each addresses, and what adopting it costs>

## Structural notes
<any architecture concept that reframes the question — boundaries, evolution
path, monolith-first, strangler fig — or "none applicable">

## Accepted deviations
<documented, deliberate departures found; rationale and whether it still holds>

## Risks, assumptions, open questions
## Next actions (prioritized)
```

## Quality Checklist

- [ ] Every finding names the specific factor, pattern, or concept it invokes.
- [ ] Only the lenses relevant to the question were applied; the omission is stated.
- [ ] Each finding cites where it was observed, or is labeled a hypothesis.
- [ ] Every recommended pattern names the present pressure that justifies it, and
      a simpler alternative was considered first.
- [ ] Documented, deliberate deviations were reported as accepted, not re-flagged.
- [ ] A boundary-touching proposal got its own separation-of-concerns pass.
- [ ] Any invocation of sacrificial architecture named what is being sacrificed,
      why, and the trigger for revisiting it.

## Failure Conditions

- **Checklist dump:** walking all twelve factors or the whole pattern catalog
  when the question touched two of them. Volume reads as rigor and isn't.
- **Pattern by reputation:** recommending Repository, Unit of Work, or CQRS
  because they are well-known rather than because the pressure they relieve is
  present. Ceremony is a cost, not a default.
- **Misapplied scope:** citing twelve-factor against something that is not a
  deployable service — a one-off script, a library, a local dev tool. Most
  factors are meaningless there.
- **Re-litigation:** flagging a decision the team made deliberately and
  documented. Check the record first.
- **Design smuggling:** treating this as a way to design a solution. It vets what
  already exists.
- **Altitude drift:** ruling on framework-level implementation detail (routing
  style, controller shape). That is a level below solution engineering.
- **Escalate / stop** when: there is no concrete solution to review (hand to
  `requirements-analysis` for the problem statement, or `first-principles-design`
  to produce a design first); a boundary review is requested with no
  human-authored boundary definition (ask, don't infer); or the solution's
  deployment shape is unknown and determines whether the factors apply.

## Related skills

- `system-architecture` — owns boundaries, contracts, and ADR capture; receives
  the consequential decisions this skill surfaces.
- `design-pattern-application` — code-level pattern selection and removal; this
  skill stops at the enterprise/data-layer altitude.
- `distributed-systems-design` — the mechanics behind the backing-services and
  disposability factors once a design is genuinely distributed.
- `legacy-system-modernization` — the full playbook when strangler fig comes up.
- `technical-review-auditor` — adversarial review of what an artifact omits; run
  alongside when the question is "what's missing", not "what's non-standard".
- `production-readiness-review` — the launch gate; consumes these findings.

## References

- [Twelve-factor checks](references/twelve-factor.md) — the twelve factors, each
  with its violation signature and the consequence of ignoring it.
- [Enterprise application patterns](references/eaa-patterns.md) — Fowler's
  catalog, indexed by the pressure each pattern relieves.
- [Architecture concepts](references/architecture-concepts.md) — boundaries,
  evolutionary architecture, monolith-first, bounded context, strangler fig,
  Conway's law, sacrificial architecture.

## Measuring this skill

`evaluations/` holds the library-wide activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. This skill's characteristic failure is
over-application — a fluent baseline walkthrough the reviewed solution gave no
evidence for — so the suite carries two `should_activate: false` cases (a one-off
local script, a contained diff) and both must pass for the suite to pass. When
comparing a baseline run against a skill-enabled one, judge the *ratio* of
findings to located violations, not the count of findings. More output is not
uplift.
