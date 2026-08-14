# Composition Workflows

Worked multi-skill workflows for common scenarios. Each stage names the skill
to invoke and what its output feeds into. Stages marked **(gate)** must pass
before the workflow continues.

Conventions: skill names are directories under `engineering/` or `legal/`.
Outputs referenced between stages are the structured sections defined in each
skill's Output Format.

---

## 1. Understanding an unfamiliar repository

1. `codebase-comprehension` — map entry points, module boundaries, data flow,
   and conventions; output: repo map + evidence-cited findings.
2. `system-architecture` — recover the as-built architecture from the repo
   map; output: component/dependency view with identified seams.
3. `technical-debt-assessment` — rank debt hotspots found during mapping;
   output: prioritized debt register.
4. Optional: `technical-documentation` — write the missing onboarding doc from
   stages 1–3 so the next reader starts warm.

## 2. Designing and implementing a new feature

0. `staff-architect` **(front door, optional)** — when the engagement is broad or
   its shape is unclear, rank which 3–4 lenses actually decide this project and
   route. Skip it when the work is already scoped to one skill: the router adds
   nothing there and costs a round trip. If the blocker turns out to be choices
   nobody has made rather than analysis nobody has done, it hands to
   `decision-elicitation` first.
1. `requirements-analysis` — resolve ambiguity, produce testable acceptance
   criteria. **(gate: open questions either answered or explicitly deferred)**
2. `first-principles-design` — candidate designs with tradeoffs; pick one.
3. As needed in parallel: `api-design` (external surface),
   `database-design-optimization` (schema/queries — hand off to
   `postgres-standards` for the Postgres-specific types, indexes, lock levels,
   and RLS decisions once the engine is settled),
   `distributed-systems-design` (if cross-service).
4. `solution-engineering-fundamentals` — vet the chosen design against the named
   baselines before anyone builds it; output: findings citing the specific
   twelve-factor factor, enterprise pattern, or architecture concept each one
   departs from. Cheapest here — an operational-hygiene miss found at design time
   costs a paragraph, and the same miss found at launch costs a rework.
   Consequential findings go to `system-architecture` for ADR capture.
5. `technical-planning-estimation` — slice into increments with estimates.
6. `code-implementation` — build increment by increment.
7. `testing-strategy` — define and fill the test pyramid for the feature.
8. `code-change-review` **(gate)** — review the diff before merge.
9. `knowledge-transfer-verification` — confirm the humans who own this code
   next actually understand it.

## 3. Diagnosing a production incident

1. `observability-incident-response` — stabilize first: assess impact,
   mitigate, communicate; output: timeline + mitigation state. **(gate:
   user impact stopped or bounded)**
2. `debugging-root-cause-analysis` — reproduce, bisect, and prove the root
   cause with evidence; output: cause chain, not just the proximate trigger.
3. `code-implementation` — implement the fix; `code-change-review` before
   deploy.
4. `reliability-fault-tolerance` — harden the failure path (retries,
   timeouts, isolation) so the class of failure, not the instance, is closed.
5. `observability-incident-response` (postmortem mode) — blameless
   postmortem with tracked action items.
6. If this is the third postmortem with substantially the same action items, or
   if action items are closed and the incident rate is not falling, escalate to
   workflow 6 — `systems-thinking-auditor`. Recurrence across postmortems is a
   structural signal, and per-incident remediation cannot reach it.

## 4. Reviewing a pull request

1. `code-change-review` — correctness, tests, security-sensitive paths;
   output: findings ranked by severity with evidence.
2. Escalate targeted concerns to specialists as findings warrant:
   `security-engineering` (auth/crypto/input handling),
   `performance-engineering` (hot paths), `concurrency-correctness`
   (shared state), `database-design-optimization` (query/schema changes),
   `postgres-standards` (Postgres DDL, migration lock safety, RLS and grants).
3. `stakeholder-communication` — only if the review outcome (e.g. "this
   needs a redesign") must be explained to non-engineers.

## 5. Planning a legacy-system migration

1. `codebase-comprehension` — map the legacy system as it actually is.
2. `legacy-system-modernization` — assess what to keep, wrap, rewrite, or
   retire; output: target state + strangler-fig seams.
3. `migration-planning` — phased plan with reversible steps, data migration
   strategy, cutover and rollback criteria. **(gate: every phase has a
   rollback path)**
4. `engineering-risk-analysis` — enumerate failure modes per phase; feed
   mitigations back into the plan.
5. `stakeholder-communication` — translate the plan, cost, and risk for
   decision-makers.
6. During execution, per phase: `code-implementation` → `code-change-review`
   → `production-readiness-review` **(gate)**.

## 6. Auditing a problem that survives its fixes

Use when the same class of failure, waste, or missed outcome recurs after each
remediation — the signal that the cause is a structure, not an instance.

1. `systems-thinking-auditor` — boundary, operative vs. stated purpose, stocks
   and flows, loops that close, delays, incentives; output: findings ranked by
   severity × durability plus leverage-ranked recommendations with levels.
   **(gate: behavior-over-time evidence exists, or the audit's scope is
   narrowed to the design as written and says so)**
2. Route by where the leverage landed:
   - level 3 structural → `system-architecture` (boundaries, ownership) or
     `legacy-system-modernization` if the structure is the legacy system.
   - level 4 delays in the developer loop → `developer-experience-improvement`.
   - level 5–6 loops in the failure path → `reliability-fault-tolerance`;
     `observability-incident-response` where the missing loop is a signal.
   - level 7 information flows → `technical-documentation` or the observability
     work that closes the signal to the deciding actor.
   - level 8 incentives and rules → `stakeholder-communication`, because the
     owner of the incentive is usually not an engineer.
3. `engineering-risk-analysis` — score the audit's loops and delays into an
   owned register with triggers, so the deferred findings have tripwires.
4. `technical-planning-estimation` — sequence the structural work, keeping the
   containment items labeled as containment.
5. Re-run stage 1 at the review date set in the audit's validation plan, against
   the guardrail metrics rather than impressions.

Handoff note: if the recurrence has not yet been established as a pattern, run
`debugging-root-cause-analysis` on one instance first. If the artifact under
suspicion is a single plan or design doc, `technical-review-auditor` is the
narrower fit.

## 7. Reviewing an independent-contractor agreement

1. `contract-structure-completeness` — inventory what's present/missing.
2. `defined-term-consistency` — verify the defined terms actually work.
3. Substantive fan-out: `worker-classification-review` (misclassification
   risk), `ip-ownership-review` (work product actually assigned?),
   `payment-compensation-analysis`, `term-termination-analysis`,
   `restrictive-covenants-review`, `confidentiality-data-protection-review`.
4. `missing-protections-analysis` — what a contractor/client in this position
   should have but doesn't.
5. `redline-recommendations` — concrete edits ranked by importance.
6. `plain-english-contract-explanation` — client-readable summary, with
   counsel-required items flagged.

## 8. Reviewing a software-development agreement

1. `contract-structure-completeness` → `defined-term-consistency`.
2. Substantive fan-out: `ip-ownership-review` (deliverables, background IP,
   licenses), `rights-obligations-extraction` (who must do what, when),
   `payment-compensation-analysis` (milestones, acceptance, holdbacks),
   `warranty-representation-review`, `liability-indemnification-review`
   (caps vs. IP-infringement carve-outs), `term-termination-analysis`
   (what happens to work-in-progress), `confidentiality-data-protection-review`.
3. `drafting-defects-detection` — cross-reference and contradiction sweep.
4. `missing-protections-analysis` → `contract-negotiation-strategy` →
   `redline-recommendations`.
5. `signature-readiness-assessment` **(gate)** — consolidated go/no-go with
   counsel-required items.

## 9. Reviewing an employment or equity agreement

1. `contract-structure-completeness` — including referenced-but-missing
   documents (plan documents, handbooks, prior inventions exhibits).
2. Substantive fan-out: `payment-compensation-analysis`,
   `equity-incentive-review` (vesting, acceleration, exercise windows,
   repurchase), `restrictive-covenants-review`, `ip-ownership-review`
   (invention assignment scope), `term-termination-analysis` (cause
   definitions, severance triggers), `assignment-change-of-control-review`.
3. `missing-protections-analysis` — from the employee's position.
4. `plain-english-contract-explanation` — what the person is actually
   agreeing to, with tax/securities questions flagged as counsel-required.

## 10. Preparing a contract negotiation brief

1. Inputs: completed substantive reviews (any subset of the legal skills)
   plus client goals and constraints.
2. `missing-protections-analysis` — gaps become potential asks.
3. `contract-negotiation-strategy` — rank issues by leverage and materiality;
   define walk-away points, trade packages, and fallback positions per issue.
4. `redline-recommendations` — proposed language for each negotiating
   position, primary and fallback.
5. `plain-english-contract-explanation` — brief the client on the strategy in
   plain language.
6. `signature-readiness-assessment` — re-run after the counterparty responds,
   to confirm what was actually won or conceded.

---

## 11. Reviewing a product, not a codebase

Run when the question is whether the thing is worth building, not whether it is
built well. Each of these leaves a file artifact behind, so the sequence produces
a set of dated documents that can be re-run and diffed a quarter later.

1. `strong-product-vision` — does the vision commit to anything falsifiable?
   Everything downstream inherits its vagueness, so it goes first. Output: the
   rewritten contract sentence, plus the slots nobody can fill — which are the
   findings.
2. In parallel, once the vision is settled:
   - `ui-ux-plan` — screens, flows, and the design system as a spec.
   - `creative-director` — brand idea, positioning, voice; judged on the idea
     rather than the craft.
3. `cfo` — the numbers: unit economics, cost structure, burn, pricing,
   break-even. Every figure labeled `[sourced]` or `[estimate]`. Issues a
   financial verdict, never a funding one.
4. `ceo-review` **(gate)** — consumes the above and issues the keep-funding
   verdict. It grades business model at scoreboard depth only and defers to
   step 3 for the modeling, so run `cfo` first where the numbers matter.

The division between steps 3 and 4 is the one people collapse: a model can be
sound for a business not worth building, and unsound for one worth funding
anyway. Keep the financial verdict and the funding verdict in separate
documents, written by separate skills.

Handing off to engineering: `ceo-review`'s Top 3 Asks and `ui-ux-plan`'s section
8 are both written as owner-shaped actions, which is what workflow 2 consumes at
step 0 or 1.

## Composition rules

- **Structure first, substance second, synthesis last.** In legal workflows,
  structural skills (1–2) run before substantive fan-out; synthesis skills
  (`missing-protections-analysis`, `signature-readiness-assessment`) run last
  because they consume the others' outputs.
- **Gates stop the pipeline.** A failed gate produces findings, not a pass —
  loop back to the producing stage.
- **Don't re-derive; hand off.** Each stage consumes the prior stage's output
  format. If a stage's needed input is missing, invoke the producing skill
  rather than improvising the analysis inline.
- **Escalation is part of the pipeline.** Counsel-required items (legal) and
  human-authorization items (engineering) accumulate across stages and must
  appear in the final deliverable, whichever workflow produced them.
