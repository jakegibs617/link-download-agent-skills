---
name: engineering-risk-analysis
description: Systematically identifies, assesses, and prioritizes the risks in a technical plan, design, or change — failure modes, their likelihood and impact, detectability, and mitigations — producing a ranked risk register with owners and triggers. Use before a significant change, launch, or migration, or when a decision has non-obvious downside. Not for security-specific threat modeling (security-engineering), availability mechanics (reliability-fault-tolerance), or estimation uncertainty alone (technical-planning-estimation).
---

# Engineering Risk Analysis

## Purpose

Produce a prioritized risk register that turns "what could go wrong" from an
anxious hunch into a ranked, owned, mitigated list — so the team spends worry
on the risks that are actually likely, impactful, and hard to detect, and
consciously accepts the rest.

## Inputs

- The plan, design, change, or decision under analysis, with enough detail
  to reason about failure. A vague target yields vague risks.
- The context: what's at stake (users, money, data, reputation, compliance),
  reversibility, and blast radius.
- History where available: past incidents, near-misses, and how similar
  changes went — the best predictor of risk.

## Procedure

1. **Frame what "going wrong" means here.** Enumerate the assets/outcomes at
   risk (data integrity, availability, cost, timeline, correctness,
   compliance, reputation). Risk is relative to what you're protecting; name
   it before listing failure modes.
2. **Enumerate failure modes structurally, not by imagination.** Walk
   categories so the search is systematic, not vibes: technical (design
   flaws, integration, performance cliffs, data), operational (deploy,
   rollback, capacity, on-call), dependency/external (vendors, other teams,
   third parties), human/process (misconfig, knowledge gaps, coordination),
   and second-order (the mitigation's own risks, cascading failures). MUST
   cover categories deliberately — the risk you didn't imagine is the one
   that bites.
3. **Assess each on three axes, not two.** Likelihood, impact, and
   **detectability** — a high-impact risk you'd catch instantly differs from
   an equally impactful one that fails silently for weeks. Silent/slow-to-
   detect risks MUST be scored up; they're the dangerous class.
4. **Ground the assessment.** Base likelihood on evidence (history, base
   rates, complexity) not optimism; base impact on the actual blast radius.
   Label each assessment's basis (evidenced / estimated / speculative).
   MUST NOT rank a risk high or low without a reason.
5. **Prioritize by exposure.** Rank by likelihood × impact ÷ detectability
   (conceptually). The register's top should be the likely, high-impact,
   hard-to-detect risks — those get the mitigation budget.
6. **Mitigate deliberately, per risk:** avoid (change the plan), reduce
   (lower likelihood or impact), transfer (redundancy, insurance-style),
   or accept (consciously, documented). Each mitigation gets an owner and —
   critically — its own risk checked (mitigations add complexity and new
   failure modes). Add a **detection/trigger**: the early signal that this
   risk is materializing, so it's caught early.
7. **Define the accepted risks and the tripwires.** What the team is
   knowingly accepting, and the leading indicators that should trigger
   re-evaluation. Unstated accepted risk is just an unmanaged risk.
8. **Separate risk from certainty and from FUD.** Distinguish genuine risks
   (uncertain, consequential) from certainties (will happen — plan for them,
   not a probability) and from vague anxiety (name the mechanism or drop it).

## Output Format

```markdown
# Risk analysis: <subject>
## What's at stake (assets/outcomes)
## Risk register (ranked by exposure)
| # | Risk | Category | Likelihood | Impact | Detectability | Basis | Mitigation (type, owner) | Trigger/early signal |
## Top risks (the ones that get the budget)
## Consciously accepted risks + tripwires for re-evaluation
## Mitigation second-order risks
## Assumptions and analysis gaps
```

## Quality Checklist

- [ ] Assets at stake named before failure modes listed.
- [ ] Failure modes enumerated by category, not ad hoc.
- [ ] Detectability scored alongside likelihood and impact.
- [ ] Each assessment's basis labeled (evidenced/estimated/speculative).
- [ ] Ranked by exposure; top risks get concrete owned mitigations.
- [ ] Mitigations' own risks checked; triggers defined.
- [ ] Accepted risks explicit with re-evaluation tripwires.

## Failure Conditions

- **Risk theater:** a long list where everything is "medium", nothing
  ranked, no owners — indistinguishable from no analysis.
- **Detectability blindness:** treating a silent data-corruption risk the
  same as a loud crash of equal impact.
- **Optimism bias:** scoring likelihood low because the plan is yours.
- **Imagination-bounded search:** only listing risks that came to mind, with
  no category sweep.
- **Mitigation blind spot:** adding mitigations without their new risks.
- **FUD inflation:** vague dread with no mechanism padding the register.
- **Escalate / stop** when: a risk is a security threat (route to
  `security-engineering` for proper threat modeling); the top risk is
  severe and unmitigable within the plan (escalate the go/no-go decision,
  don't bury it); or assessing likelihood needs data/history only the user
  has (ask rather than guess).

## Related skills

- `technical-planning-estimation` — surfaces schedule risk this deepens.
- `reliability-fault-tolerance` — availability-specific failure handling.
- `security-engineering` — adversarial/security risk specifically.
- `migration-planning` / `production-readiness-review` — consume this
  analysis as a gate input.
