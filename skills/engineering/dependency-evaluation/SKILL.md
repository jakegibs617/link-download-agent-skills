---
name: dependency-evaluation
description: Evaluates whether to adopt, keep, replace, or remove a third-party library, framework, or service — weighing fit, maintenance health, security, licensing, and total lifecycle cost against building or reusing something in-house. Use when choosing a dependency, justifying build-vs-buy, or auditing an existing dependency's fitness. Not for the design that would use it (first-principles-design) or finding CVEs in code you already run (security-engineering).
---

# Dependency and Framework Evaluation

## Purpose

Produce a defensible adopt/keep/replace/build recommendation grounded in the
dependency's actual fit, health, and lifecycle cost — not its popularity or
its README — with the tradeoffs and the exit cost made explicit before the
lock-in happens.

## Inputs

- The need: the specific capability required, the must-have vs nice-to-have
  features, and the constraints (language, license policy, deployment,
  performance, compliance). Vague need → evaluate against a sharpened one.
- The candidates, including the always-present alternatives: build it,
  reuse something already in the stack, and do without.
- Access to inspect each candidate: source/repo, release history, issue
  tracker, license, docs. MUST look at these, not just recall reputation.

## Procedure

1. **Sharpen the need first.** List the capabilities you actually require
   and weight them. Evaluating before the need is crisp produces
   feature-count comparisons that miss the point. The "do without / it's a
   few lines" option MUST be considered — many dependencies replace trivial
   code with a supply-chain liability.
2. **Assess fit against the weighted need.** Does it do the must-haves
   natively, or only via extension/workaround? Where it doesn't fit, what's
   the workaround's cost? Prefer evidence (docs, a spike) over the marketing
   surface.
3. **Assess maintenance health with real signals:** release cadence and
   recency, open vs closed issue trends, number of active maintainers (bus
   factor), responsiveness to security issues, breaking-change history, and
   community size. A single-maintainer package with 400 open issues is a
   risk regardless of stars. Cite the signals; MUST NOT infer health from
   popularity alone.
4. **Check security and supply chain:** known-vuln history and response
   time, transitive dependency weight (what does adopting this pull in?),
   install-time script risk, and provenance. Version-specific CVE lookups
   hand off to `security-engineering`; here, assess the pattern and posture.
5. **Check the license and its obligations:** the actual license, its
   compatibility with the project's distribution model (copyleft reciprocity,
   attribution, patent clauses), and transitive-license surprises. License
   incompatibility is a blocker, not a footnote — flag it hard, and note
   that definitive licensing calls may need legal review.
6. **Cost the full lifecycle:** adoption cost (integration, learning),
   ongoing cost (upgrades, breaking changes, operational surface), and —
   critically — the exit cost (how deeply does it couple into the code; how
   hard to rip out?). Deep coupling to a risky dependency is the trap; a
   thin adapter is the mitigation.
7. **Compare against build/reuse honestly.** Building means you own it
   forever; buying means you inherit someone else's priorities and risk.
   State which liability is worse *for this need* — small, stable, core-to-
   your-domain capabilities often favor build; large, commodity, well-
   maintained capabilities favor buy.
8. **Recommend with conditions.** Adopt/keep/replace/build, the decisive
   factors, the mitigations (adapter layer, version pinning, fork-readiness),
   and the revisit trigger (maintainer goes dark, license changes, need
   outgrows it).

## Output Format

```markdown
# Dependency evaluation: <capability> — Recommendation: <adopt|keep|replace|build|avoid>
## Sharpened need (weighted must-haves)
## Candidates compared
| Candidate (incl. build/reuse) | Fit | Maintenance health (signals) | Security/supply chain | License | Lifecycle + exit cost |
## Decisive factors
## Risks and mitigations (adapter, pinning, fork-readiness)
## Revisit triggers
## Items needing legal/security sign-off
## Assumptions and gaps
```

## Quality Checklist

- [ ] Need sharpened and weighted before comparison.
- [ ] Build/reuse/do-without evaluated, not just external candidates.
- [ ] Health judged on cited signals (cadence, bus factor, issues), not stars.
- [ ] License identified and compatibility checked against the distribution model.
- [ ] Exit/coupling cost assessed, with a decoupling mitigation.
- [ ] Recommendation carries conditions and a revisit trigger.

## Failure Conditions

- **Popularity proxy:** "it has 30k stars" standing in for maintenance and
  fit analysis.
- **README trust:** believing the feature list without checking issues or
  trying it.
- **License blindness:** ignoring copyleft/attribution obligations until
  legal catches it at release.
- **Exit-cost omission:** recommending adoption without noting how hard it
  is to leave.
- **Feature-count comparison:** most features wins, regardless of the actual
  weighted need.
- **Escalate / stop** when: license compatibility is genuinely unclear
  (legal review, don't guess enforceability); a CVE-specific security
  question arises (route to `security-engineering`); or the "need" is so
  unclear that any evaluation would be theater (send back to
  `requirements-analysis`/`first-principles-design`).

## Related skills

- `first-principles-design` — owns the design that would consume the choice.
- `security-engineering` — CVE specifics and supply-chain deep dive.
- `migration-planning` — when the recommendation is to replace an entrenched
  dependency.
- `technical-debt-assessment` — an aging/abandoned dependency as debt.
