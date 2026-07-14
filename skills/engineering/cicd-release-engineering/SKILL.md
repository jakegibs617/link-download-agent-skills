---
name: cicd-release-engineering
description: Designs and reviews build/test/deploy pipelines and release processes — fast trustworthy CI, safe progressive deployment, rollback, and artifact/version integrity. Use when building or fixing a pipeline, designing a release/rollout strategy, or reviewing deployment safety. Not for the app's runtime failure handling (reliability-fault-tolerance), incident response (observability-incident-response), or data-schema migration mechanics (database-design-optimization / migration-planning).
---

# CI/CD and Release Engineering

## Purpose

Produce a delivery pipeline and release process that make shipping safe and
boring: CI that gives a fast trustworthy signal, deployments that limit and
detect blast radius, and a rollback that works — so that speed and safety
stop being a tradeoff.

## Inputs

- The current pipeline and release process (or the requirement for a new
  one), the deployment target (containers/serverless/VMs/mobile/library),
  and the release cadence goal.
- The risk profile: what a bad release costs, regulatory/change-control
  constraints, and whether rollback is even possible (stateful migrations,
  mobile store review, on-prem).
- Existing tooling and constraints (CI provider, registry, orchestrator).

## Procedure

1. **Separate the two problems: signal and delivery.** CI's job is a fast,
   trustworthy pass/fail; CD's job is getting a passing artifact to
   production safely. Diagnose which is actually broken before changing
   either.
2. **Make CI trustworthy, then fast, in that order.** A fast pipeline that
   flakes is worse than a slow reliable one — engineers learn to ignore red.
   Address flakiness (route to `testing-strategy`) and false greens before
   optimizing speed. Then speed: parallelize, cache dependencies/layers, run
   the cheap fast checks first (fail fast), and only run expensive suites
   where warranted. Every stage MUST have a clear pass/fail gate; "allowed
   to fail" gates are noise.
3. **Guarantee artifact integrity.** Build once, promote the same artifact
   through environments (never rebuild per stage — that's a different
   binary). Immutable, versioned, digest-pinned artifacts; reproducible
   builds where feasible; the deployed version MUST be traceable to a commit.
4. **Design the deployment for blast-radius control.** Choose the rollout
   style against the risk and statefulness: rolling, blue-green, or canary
   with automated analysis. MUST pair every rollout with (a) a health
   signal that gates progression and (b) an automatic-or-fast rollback.
   A deploy strategy with no rollback plan is not done.
5. **Handle the things rollback can't undo.** Database migrations
   (backward-compatible / expand-contract so a rollback of code doesn't
   meet an incompatible schema — coordinate with `migration-planning`),
   feature flags to decouple deploy from release, and irreversible
   operations (emails sent, payments taken) that need forward-fix not
   rollback. MUST call these out — "just roll back" is a trap when state moved.
6. **Secure the pipeline.** Secrets out of logs and configs (injected, not
   committed), least-privilege deploy credentials, protected branches and
   required reviews on the release path, and supply-chain integrity
   (dependency pinning, provenance). The pipeline is production access;
   treat it as such.
7. **Make releases observable and reversible by anyone on call.** Deploy
   markers in monitoring, a documented one-command rollback, and a
   changelog/version scheme humans can reason about. The 3am responder MUST
   be able to roll back without tribal knowledge.
8. **Review against the failure drills:** a bad artifact reaches prod (does
   canary catch it?), a deploy half-completes, a rollback is needed after a
   migration, the CI is green but the release is broken (what did CI miss?).

## Output Format

```markdown
# Pipeline / release design: <system>
## Problem diagnosis (CI signal vs CD delivery)
## CI design (gates, trustworthiness, speed measures)
## Artifact integrity (build-once, versioning, traceability)
## Deployment strategy (style, health gate, rollback)
## Un-rollbackable concerns (migrations, flags, irreversible side effects)
## Pipeline security
## Operability (deploy markers, one-command rollback, changelog)
## Failure-drill results
## Gaps and assumptions
```

## Quality Checklist

- [ ] CI trustworthiness addressed before speed; every gate is real.
- [ ] Build-once-promote; deployed version traceable to a commit.
- [ ] Rollout style matched to risk; health gate + rollback paired with it.
- [ ] Migration/flag/irreversible concerns that break naive rollback flagged.
- [ ] Secrets and deploy credentials handled with least privilege.
- [ ] One-command rollback documented for an on-call non-expert.

## Failure Conditions

- **Speed over signal:** optimizing a pipeline nobody trusts; flakes
  unaddressed.
- **Rebuild-per-stage:** promoting a different binary than was tested.
- **Rollback fantasy:** a rollout plan assuming code rollback is always safe
  while schema/state has moved forward.
- **Deploy ≠ release conflation:** no flag decoupling, so every deploy is a
  user-facing risk.
- **Pipeline as trusted zone:** secrets in logs, god-mode deploy tokens.
- **Escalate / stop** when: rollback is genuinely impossible for the target
  (mobile store latency, irreversible migration) and the process must shift
  to forward-fix + prevention — say so; change-control/compliance constrains
  the design (surface it); or CI flakiness traces to test design (hand to
  `testing-strategy`).

## Related skills

- `testing-strategy` — the test suite whose signal CI carries; flake fixes.
- `migration-planning` / `database-design-optimization` — schema changes
  that constrain rollback.
- `reliability-fault-tolerance` — runtime resilience the deploy interacts with.
- `observability-incident-response` — the monitoring deploys are gated on.
