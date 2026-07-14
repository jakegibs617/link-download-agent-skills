---
name: technical-debt-assessment
description: Identifies, quantifies, and prioritizes technical debt by tying each item to the concrete cost it imposes and the risk it carries, producing a ranked, actionable register rather than a wish list. Use when planning debt paydown, justifying refactoring investment, or assessing a codebase's health. Not for executing a specific refactor (refactoring), mapping how code works (codebase-comprehension), or whole-system redesign (legacy-system-modernization).
---

# Technical Debt Assessment

## Purpose

Produce a debt register where every item is justified by the measurable cost
it imposes now or the risk it poses, ranked so that the highest-leverage
paydown is obvious — turning "the code is bad" into a prioritized,
defensible investment case.

## Inputs

- The codebase or subsystem, with ability to inspect it and, ideally, its
  history (git churn, incident logs, cycle-time data).
- The forward plan: what the team intends to build next — debt only matters
  where it taxes future work or threatens production. Debt in frozen code is
  usually not worth paying down; say so.
- Signals if available: change-failure rate, time-to-change hotspots,
  on-call pain, onboarding friction.

## Procedure

1. **Define debt as cost, not ugliness.** Debt is a present structure that
   makes future change slower, riskier, or more error-prone. Aesthetic
   preference without a cost is not debt. Each candidate MUST be tied to a
   cost class: change amplification, defect risk, operational toil,
   security/compliance exposure, onboarding drag, or scaling ceiling.
2. **Gather evidence, don't editorialize.** For each item, cite the
   evidence: churn × complexity hotspots (files changed often AND hard to
   change), bug clusters, duplicated logic that drifts, missing tests around
   risky code, TODO/HACK density where it correlates with incidents,
   dependency staleness with security implications. MUST NOT rank on
   gut feel where a signal is obtainable.
3. **Quantify the cost as concretely as available data allows.** Prefer
   real numbers (this module caused N of the last M incidents; a change here
   touches K files; onboarding takes weeks here). Where only qualitative
   assessment is possible, label it qualitative and bound the uncertainty —
   MUST NOT fabricate precise costs.
4. **Assess the interest rate.** Debt compounds differently: some is stable
   (ugly but isolated, rarely touched — low interest), some is malignant
   (in a hot path you're about to build on — high interest). Rank by
   interest against the forward plan, not by how bad it looks.
5. **Distinguish debt from risk from missing capability.** A security hole
   is risk (route to `security-engineering`); a missing feature is not debt;
   a scaling ceiling is a capacity risk. Keep the register to genuine debt
   and cross-reference the rest.
6. **Prioritize by leverage.** Rank each item by (cost × probability of
   incurring it given the plan) ÷ paydown effort. The top of the list should
   be high-cost, soon-to-be-hit, cheap-to-fix items; the bottom, low-cost
   stable items to consciously *not* fix.
7. **Make each item actionable.** Per item: the paydown approach (sketch,
   not full plan), rough effort tier, the trigger that makes it urgent, and
   the consequence of continued deferral. Explicitly list debt recommended
   to accept and leave.

## Output Format

```markdown
# Technical debt assessment: <scope>
## Method and evidence sources
## Debt register (ranked by leverage)
| # | Item | Cost class | Evidence | Cost (quantified/qualitative) | Interest vs plan | Paydown effort | Recommendation |
## Top paydown candidates (with why-now triggers)
## Consciously accepted debt (leave it, and why)
## Cross-references (risk → security, capacity → architecture, etc.)
## Assumptions and data gaps
```

## Quality Checklist

- [ ] Every item tied to a concrete cost class, not aesthetics.
- [ ] Evidence cited (churn/incidents/tests/duplication), not asserted.
- [ ] Costs quantified where data exists; qualitative items labeled as such.
- [ ] Ranked by interest against the forward plan, not by ugliness.
- [ ] Non-debt (risk, missing features) separated and cross-referenced.
- [ ] Accept-and-leave items explicitly listed.

## Failure Conditions

- **Taste masquerading as debt:** flagging style/paradigm preferences with
  no cost.
- **Undifferentiated wish list:** a flat list of everything imperfect,
  unranked, unactionable — the reader learns nothing about where to spend.
- **Fabricated metrics:** invented percentages and hours to sound rigorous.
- **Ugliness bias:** ranking the ugliest code top when it's stable and never
  touched, while the malignant hot-path debt sits mid-list.
- **Scope confusion:** filing security holes and missing features as "debt".
- **Escalate / stop** when: quantifying requires data (incident history,
  churn) the user can provide but hasn't (ask); an item is actually a live
  security/reliability risk (route immediately, don't queue it as debt); or
  the "debt" reflects a disputed architectural direction, not agreed-bad code.

## Related skills

- `refactoring` — executes paydown of a specific item.
- `legacy-system-modernization` — when the debt is system-wide, not localized.
- `codebase-comprehension` — supplies the map this assessment annotates.
- `technical-planning-estimation` — turns the register into scheduled work.
