# Skill Catalog

Every skill in the library, grouped by profession and category. For each:
profession, category, what it does, when it triggers, its inputs and outputs,
and the skills it most often composes with. Full details live in each skill's
`SKILL.md`; this is the selection index.

Legend for paths: `engineering/<name>/`, `legal/<name>/`, and `product/<name>/`.

---

## Engineering (37 skills)

### Category: Understanding & Requirements

**requirements-analysis**
- Category: Understanding & Requirements
- Does: Turns vague/conflicting requests into testable, prioritized requirements with acceptance criteria; resolves or documents every ambiguity.
- Triggers: underspecified request, stakeholder disagreement, scope drift, before design.
- Inputs: the request, access to requester, system context, non-functional constraints.
- Outputs: requirements doc (problem statement, scope, requirements table, acceptance criteria, open questions, assumptions, conflicts).
- Related: first-principles-design, technical-planning-estimation, stakeholder-communication.

**codebase-comprehension**
- Category: Understanding & Requirements
- Does: Builds an evidence-cited mental model of an unfamiliar codebase (entry points, boundaries, data flow, conventions, where a change goes).
- Triggers: onboarding, "where/how does X work", before modifying unfamiliar code.
- Inputs: the repo, the comprehension goal, build/run capability.
- Outputs: codebase map with file:line citations, module map, conventions, unknowns.
- Related: system-architecture, technical-debt-assessment, debugging-root-cause-analysis, technical-documentation.

**decision-elicitation**
- Category: Understanding & Requirements
- Does: Builds a decision tree from a request, prunes it to only what blocks the first increment, walks those decisions one at a time with a recommendation and reason each, and terminates on an explicit completion test.
- Triggers: "grill me", "grill this", "interview me", "stress-test my thinking", several unmade or interdependent choices, implementation blocked because nobody decided something.
- Inputs: the thing to be built, the codebase and its conventions, the scope of the first increment, decisions already recorded.
- Outputs: mermaid decision tree with each node marked, running decision checklist with reasons, deferred decisions with triggers, implementation-ready spec.
- Related: requirements-analysis (runs after, on the settled problem), staff-architect (routes what the decisions imply), technical-planning-estimation, first-principles-design (widens options where this narrows them).

### Category: Design & Architecture

**first-principles-design**
- Category: Design & Architecture
- Does: Designs a component from real constraints; generates distinct candidates, scores against criteria fixed up front, recommends one with tradeoffs and revisit triggers.
- Triggers: new nontrivial component, forced-feeling approach, team anchored on first idea.
- Inputs: requirements/problem statement, constraints, existing code, scale figures.
- Outputs: design decision (invariants, criteria, candidates, matrix, recommendation, component skeleton).
- Related: requirements-analysis, system-architecture, dependency-evaluation, engineering-risk-analysis.

**system-architecture**
- Category: Design & Architecture
- Does: Defines or recovers whole-system architecture — boundaries, data ownership, contracts, cross-cutting concerns — recorded as ADRs.
- Triggers: multi-service/multi-team work, disputed boundaries, documenting as-built architecture.
- Inputs: quality attributes, code/config (as-built), team topology, growth.
- Outputs: component map, interaction contracts, ADRs, evolution plan.
- Related: first-principles-design, distributed-systems-design, legacy-system-modernization, codebase-comprehension.

**staff-architect**
- Category: Design & Architecture
- Does: Routes an architecture engagement — ranks which 3-4 lenses actually decide this project, classifies each decision's reversibility, and dispatches to the narrow skills that own the analysis. Owns the ranking and the handoff, not the analysis.
- Triggers: "think like an architect", "where do I start", scoping a system, planning before implementation, reviewing a design for gaps, writing a design doc/ADR/RFC.
- Inputs: the engagement and its mode (plan/review/document), the actual problem, hard constraints, ranked NFRs, decisions already recorded.
- Outputs: ranked lens table with routing, reversibility classification per decision, ordered engagement plan naming each executing skill, spikes.
- Related: decision-elicitation (run first when the blocker is unmade choices), first-principles-design and system-architecture (produce what this routes to), technical-review-auditor, COMPOSITION-WORKFLOWS.md (the chains it references).

**solution-engineering-fundamentals**
- Category: Design & Architecture
- Does: Vets a concrete solution against named, citable baselines (twelve-factor, Fowler's enterprise pattern catalog, Fowler's architecture concepts) so every finding traces to a source rather than to taste.
- Triggers: "12-factor", "enterprise patterns", "Fowler patterns", "architecture fundamentals", checking operational hygiene, choosing a data-access or domain-logic pattern, testing whether a boundary holds.
- Inputs: the solution (proposal, design doc, or running service), its deployment shape, a human-authored boundary definition, the record of accepted tradeoffs (ADRs, known issues).
- Outputs: findings table with the baseline each violates and where observed, applicable patterns with the pressure each addresses, accepted deviations, next actions.
- Related: system-architecture (receives consequential decisions as ADRs), design-pattern-application (code-level altitude), technical-review-auditor (what's missing vs. what's non-standard), production-readiness-review (consumes the findings).

**api-design**
- Category: Design & Architecture
- Does: Designs external API contracts (resources, errors, versioning, pagination, compatibility) for consumers who live with them for years.
- Triggers: creating/extending an API surface, reviewing a contract, breaking-change planning.
- Inputs: consumer picture, existing surface conventions, constraints, compatibility policy.
- Outputs: API contract (call examples, operation table, error contract, evolution rules, adversarial findings).
- Related: first-principles-design, security-engineering, database-design-optimization, technical-documentation.

**database-design-optimization**
- Category: Design & Architecture
- Does: Designs schemas and optimizes queries against real access patterns; indexing from plans; live-migration safety.
- Triggers: schema design, slow-query diagnosis, index strategy, migration review.
- Inputs: access patterns, engine/version, volumes, EXPLAIN output.
- Outputs: schema/DDL + invariants, plan analysis, migration-safety review.
- Related: performance-engineering, migration-planning, distributed-systems-design, code-implementation.

**design-pattern-application**
- Category: Design & Architecture
- Does: Selects, applies, or dismantles design patterns based on forces actually present in the code, adapted to the language idiom.
- Triggers: recurring structural problem, reviewing pattern-heavy code.
- Inputs: the code/design, language/framework, evidenced axis of change.
- Outputs: pattern decision with force evidence, idiomatic form, revisit trigger (or dismantlement audit).
- Related: first-principles-design, refactoring, code-change-review.

**distributed-systems-design**
- Category: Design & Architecture
- Does: Designs correct cross-process behavior — consistency, idempotency, delivery semantics, partitioning, backpressure — against network failure.
- Triggers: multi-service/multi-store work, queues/events, sharding, cross-service invariants.
- Inputs: the interaction + its invariant, load model, failure tolerance, infra.
- Outputs: distributed design (consistency choices, message-betrayal table, semantics, partitioning, backpressure, failure drills).
- Related: system-architecture, reliability-fault-tolerance, concurrency-correctness, database-design-optimization.

### Category: Implementation & Quality

**code-implementation**
- Category: Implementation & Quality
- Does: Implements a specified change idiomatically, handles edges, and verifies it works by execution before declaring done.
- Triggers: build/modify code against a clear spec, design, or fix direction.
- Inputs: the spec, the repo with build/test, the conventions.
- Outputs: the diff plus change summary, files touched, verification results, reviewer-attention note.
- Related: debugging-root-cause-analysis, refactoring, testing-strategy, code-change-review.

**refactoring**
- Category: Implementation & Quality
- Does: Restructures code without changing observable behavior, in small verified steps under test protection.
- Triggers: structure impedes a change, duplication/god-objects, seam prep.
- Inputs: refactoring goal + motivation, code + test suite, blast radius.
- Outputs: refactoring report (contract preserved, safety net, steps, follow-ups).
- Related: code-implementation, technical-debt-assessment, design-pattern-application, legacy-system-modernization.

**testing-strategy**
- Category: Implementation & Quality
- Does: Designs what to test and at which level, mapping risk to a proportionate test mix targeting behavior and edges.
- Triggers: planning tests, filling suite gaps, flaky/slow tests, reviewing test quality.
- Inputs: code + risk profile, existing suite, testability seams.
- Outputs: test plan (risk-ranked behaviors, cases by level, quality findings, deliberately-untested).
- Related: code-implementation, debugging-root-cause-analysis, refactoring, code-change-review.

**code-change-review**
- Category: Implementation & Quality
- Does: Reviews a diff/PR for correctness, safety, tests, and maintainability; severity-ranked findings with a merge verdict.
- Triggers: reviewing a PR/diff/patch before merge.
- Inputs: the diff + intent, surrounding code, conventions/CI.
- Outputs: review with verdict, ranked findings (blocker/major/minor), test adequacy, escalations.
- Related: code-implementation, security-engineering, concurrency-correctness, testing-strategy.

**concurrency-correctness**
- Category: Implementation & Quality
- Does: Analyzes concurrent code for races, deadlocks, atomicity, and visibility bugs by reasoning about interleavings, not passing tests.
- Triggers: shared mutable state across threads/tasks, race-smelling heisenbug, designing synchronization.
- Inputs: the code/design, concurrency + memory model, shared state, invariants.
- Outputs: concurrency analysis (state inventory, discipline per datum, atomicity/deadlock/memory findings, adversarial interleavings).
- Related: distributed-systems-design, debugging-root-cause-analysis, performance-engineering, code-change-review.

### Category: Operations & Reliability

**debugging-root-cause-analysis**
- Category: Operations & Reliability
- Does: Diagnoses defects by reproducing, forming falsifiable hypotheses, and bisecting to a proven root cause — not a patched symptom.
- Triggers: bugs, flaky tests, regressions, "works on my machine".
- Inputs: failure description, code + logs/traces/history, a way to run it.
- Outputs: RCA (discrepancy, reproduction, investigation log, cause chain, proof, blast radius, fix direction).
- Related: observability-incident-response, code-implementation, testing-strategy, concurrency-correctness.

**performance-engineering**
- Category: Operations & Reliability
- Does: Makes systems measurably faster/cheaper by profiling before changing, attacking the dominant cost, and proving each gain.
- Triggers: something slow, latency/throughput target, verifying a perf claim.
- Inputs: quantified target, measurement path, realistic workload.
- Outputs: perf report (baseline, profile, measured changes, collateral effects, regression guard).
- Related: database-design-optimization, concurrency-correctness, distributed-systems-design, observability-incident-response.

**reliability-fault-tolerance**
- Category: Operations & Reliability
- Does: Engineers graceful degradation — timeouts, retries, breakers, bulkheads, fallbacks — against an explicit SLO and failure-mode analysis.
- Triggers: hardening a service, setting SLOs, reviewing failure handling, post-outage.
- Inputs: SLO + source, dependency map, failure history, degradation preferences.
- Outputs: reliability design (SLO, failure-mode table, mechanism specs, degradation ladder, SPOF decisions).
- Related: observability-incident-response, distributed-systems-design, engineering-risk-analysis, production-readiness-review.

**observability-incident-response**
- Category: Operations & Reliability
- Does: Two modes — designs observability (SLOs, symptom alerts) and runs live incidents (mitigate first, diagnose second, blameless postmortem).
- Triggers: during/after a production incident, building monitoring, noisy/blind alerts.
- Inputs: (incident) symptom + impact + signals; (design) system + journeys + SLOs.
- Outputs: incident record or observability design.
- Related: debugging-root-cause-analysis, reliability-fault-tolerance, cicd-release-engineering.

**cicd-release-engineering**
- Category: Operations & Reliability
- Does: Designs/reviews build-test-deploy pipelines and release safety — trustworthy CI, progressive deploy, rollback, artifact integrity.
- Triggers: building/fixing a pipeline, release/rollout strategy, deployment-safety review.
- Inputs: current pipeline, deploy target, risk profile, tooling.
- Outputs: pipeline/release design (CI gates, artifact integrity, deploy strategy, rollback, un-rollbackable concerns).
- Related: testing-strategy, migration-planning, reliability-fault-tolerance, observability-incident-response.

**production-readiness-review**
- Category: Operations & Reliability
- Does: Gates a launch against a comprehensive readiness checklist with evidence, producing a go/no-go with blocking gaps.
- Triggers: before shipping a new service, high-risk launch, on-call handoff.
- Inputs: the system + blast radius, access to verify claims, launch constraints.
- Outputs: readiness verdict (GO/CONDITIONS/NO-GO) with dimension assessment, blockers, accepted risks.
- Related: reliability-fault-tolerance, security-engineering, observability-incident-response, migration-planning, knowledge-transfer-verification.

### Category: Security & Risk

**security-engineering**
- Category: Security & Risk
- Does: Threat-models and hardens software against abuse (authn/authz, input, crypto, supply chain) with evidence-grounded, ranked findings. Defensive/authorized use only.
- Triggers: security-sensitive features, reviewing auth/crypto/untrusted-input code, threat modeling.
- Inputs: asset/adversary picture, code + trust boundaries, existing controls.
- Outputs: security review (threat model, ranked findings with source→sink, fixes, suspected items).
- Related: code-change-review, dependency-evaluation, api-design, observability-incident-response.

**engineering-risk-analysis**
- Category: Security & Risk
- Does: Identifies, scores (likelihood/impact/detectability), and prioritizes risks in a plan/design/change into an owned register.
- Triggers: before a significant change/launch/migration, non-obvious downside decisions.
- Inputs: the plan/design under analysis, stakes/reversibility, history.
- Outputs: risk register (ranked by exposure, mitigations + triggers, accepted risks).
- Related: technical-planning-estimation, reliability-fault-tolerance, security-engineering, migration-planning, production-readiness-review.

**dependency-evaluation**
- Category: Security & Risk
- Does: Evaluates adopt/keep/replace/build for a library/framework/service — fit, health, security, license, lifecycle + exit cost.
- Triggers: choosing a dependency, build-vs-buy, auditing a dependency.
- Inputs: sharpened need, candidates (incl. build/reuse), access to inspect.
- Outputs: recommendation with conditions, candidate comparison, risks + mitigations, revisit triggers.
- Related: first-principles-design, security-engineering, migration-planning, technical-debt-assessment.

**technical-review-auditor**
- Category: Security & Risk
- Does: Adversarially audits a plan/doc/code artifact through four lenses — reversibility (one-way doors), rejected alternatives, NFR interrogation, riskiest assumption — naming what is absent rather than summarizing what is there.
- Triggers: "review this plan", "poke holes in this", "is this design sound", "what am I missing", "sanity check this spec"; a design doc shared for an opinion.
- Inputs: the artifact + its stated goal and audience; in Code mode, the code plus any design doc it claims to implement.
- Outputs: review (verdict, ≤5 blocking findings ranked by cost-of-being-wrong × cost-of-fixing-later, non-blocking findings, per-lens covered/missing, questions for the author).
- Related: engineering-risk-analysis (scores its findings into a register), code-change-review (line-level diff review it defers to), production-readiness-review, first-principles-design/system-architecture (produce what it reviews).
- Note: also carries a seeded-defect harness (`references/evaluation.md`, `evals/fixtures/`, `scripts/score_review.py`) measuring defect recall and uplift over a no-skill baseline.

**systems-thinking-auditor**
- Category: Security & Risk
- Does: Explains why a system produces the behavior it produces — boundary, operative vs. stated purpose, stocks and flows, loops that actually close, delays, incentives, information paths — then ranks interventions by leverage level with each one's unintended consequences.
- Triggers: "why does this keep happening", a problem that outlives its fixes, local fixes making the whole worse, a metric being hit while the outcome degrades, "where's the highest leverage here".
- Inputs: the system (product/PRD, architecture/code, workflow, or business process) + the behavior that prompted the audit + behavior-over-time evidence + who is measured on what.
- Outputs: systems audit (verdict, boundary and purpose gap, intended vs. observed behavior, structure producing it, ≤5 findings above medium ranked by severity × durability, leverage-ranked recommendations with levels and guardrails, validation plan).
- Related: technical-review-auditor (audits one artifact's missing decisions; this audits recurring behavior), debugging-root-cause-analysis (one defect's cause chain; this takes over when the class recurs), technical-debt-assessment (prices the stock; this audits the flows that refill it), engineering-risk-analysis (scores its loops and delays into a register), stakeholder-communication (carries incentive findings to whoever owns the incentive).
- Note: characteristic failure is over-application, so its eval suite requires the negative-activation and "no loop here" cases to pass.

### Category: Evolution & Modernization

**technical-debt-assessment**
- Category: Evolution & Modernization
- Does: Identifies, quantifies, and prioritizes debt by the cost it imposes, producing a ranked actionable register.
- Triggers: planning paydown, justifying refactoring, assessing codebase health.
- Inputs: codebase + history, forward plan, signals (churn/incidents).
- Outputs: debt register (ranked by leverage/interest, evidence, accept-and-leave items).
- Related: refactoring, legacy-system-modernization, codebase-comprehension, technical-planning-estimation.

**legacy-system-modernization**
- Category: Evolution & Modernization
- Does: Decides keep/wrap/rewrite/retire per capability, biased to incremental strangler-fig over big-bang rewrites.
- Triggers: valuable-but-hard-to-change system, a rewrite being proposed.
- Inputs: the legacy system + behavior, business context, real constraints.
- Outputs: modernization strategy (per-capability disposition, strangler phases, behavior preservation, sequencing).
- Related: codebase-comprehension, migration-planning, refactoring, engineering-risk-analysis.

**migration-planning**
- Category: Evolution & Modernization
- Does: Plans a data/platform/service migration as phased reversible steps with cutover, rollback, validation, and coexistence.
- Triggers: moving data/traffic between systems/schemas where the "how" matters.
- Inputs: source/target + volume + downtime tolerance, consumers, reversibility.
- Outputs: migration runbook (consumer inventory, coexistence, expand-migrate-contract, cutover/rollback, abort criteria).
- Related: legacy-system-modernization, database-design-optimization, cicd-release-engineering, engineering-risk-analysis.

### Category: Communication & Leadership

**technical-documentation**
- Category: Communication & Leadership
- Does: Writes reader-and-job-matched docs (README, ADR, API ref, runbook) grounded in the verified system, structured to act on.
- Triggers: docs requested, or work others must operate/extend.
- Inputs: reader + job, the system with verification access, lifespan/owner.
- Outputs: the document in its type's structure + front-matter (reader/job/verified-against/boundaries).
- Related: system-architecture, codebase-comprehension, knowledge-transfer-verification, stakeholder-communication.

**technical-planning-estimation**
- Category: Communication & Leadership
- Does: Breaks work into sequenced verifiable increments with uncertainty-ranged estimates and surfaced unknowns.
- Triggers: planning a feature/project, estimating effort, sequencing with dependencies.
- Inputs: goal + acceptance criteria, chosen design, constraints, definition of done.
- Outputs: plan (vertical increments, dependency graph/critical path, ranged estimates, spikes, risks).
- Related: requirements-analysis, first-principles-design, engineering-risk-analysis, stakeholder-communication.

**mentoring-technical-leadership**
- Category: Communication & Leadership
- Does: Grows another engineer via ask-before-tell teaching, calibrated challenge, preserved ownership, and actionable feedback.
- Triggers: helping someone grow/decide (not doing it for them), technical feedback, team direction.
- Inputs: who + their level, the situation, relationship context.
- Outputs: the interaction (diagnosis, drawing-out questions, transferable lesson, ownership calls, growth edge).
- Related: the specialist skills (for producing artifacts), stakeholder-communication, knowledge-transfer-verification.

**explain-for-audience**
- Category: Communication & Leadership
- Does: Calibrates a technical explanation to the altitude its audience can act from — how much detail, which vocabulary, what framing, what to omit — across six roles from developer to VP of product, closing with a "so what" in that role's terms.
- Triggers: explaining code, a design, a plan, an incident, or a tradeoff to a named role; an explanation that landed wrong and needs re-pitching; "explain this for a CTO / PM / tech lead".
- Inputs: what to explain, the audience's role (ask if absent), the goal, and their actual fluency where it diverges from the title.
- Outputs: audience, goal, calibrated explanation, a one-sentence "so what", and any decision needed with a recommendation.
- Related: stakeholder-communication (owns message structure where this owns altitude), technical-documentation (durable artifacts), mentoring-technical-leadership, ceo-review and cfo (business framing for exec altitudes).

**stakeholder-communication**
- Category: Communication & Leadership
- Does: Translates technical decisions/risks/status for non-technical audiences — outcome first, consequence over mechanism, honest uncertainty.
- Triggers: explaining eng work to execs/product/sales/customers; decision/status/incident comms.
- Inputs: audience + stake, the technical content, the purpose.
- Outputs: comms (bottom line, business impact, options+recommendation, honest risks, specific ask).
- Related: technical-documentation, mentoring-technical-leadership, technical-planning-estimation, engineering-risk-analysis.

**developer-experience-improvement**
- Category: Communication & Leadership
- Does: Diagnoses and fixes daily-loop friction (setup, build/test, tooling) by measuring the tax before fixing it.
- Triggers: painful onboarding, slow inner loop, tooling fighting the team.
- Inputs: the friction/loop, signals, team size/shape.
- Outputs: DX assessment (measured friction, root causes, leverage-ordered fixes, before/after, guard).
- Related: cicd-release-engineering, technical-documentation, refactoring, debugging-root-cause-analysis.

**knowledge-transfer-verification**
- Category: Communication & Leadership
- Does: Verifies a human actually understands implemented/handed-off work via application probes, then closes the gaps found.
- Triggers: after a nontrivial implementation, ownership handoff, explaining a system to operate/maintain.
- Inputs: the work + the person + their role, the stakes, the critical knowledge.
- Outputs: verification record (targets, probes + what they revealed, gaps closed + re-verified, residual risks).
- Related: mentoring-technical-leadership, technical-documentation, observability-incident-response.

---

## Product (5 skills)

> Product skills leave a **file artifact** behind rather than reporting only in
> the response: `ceo-review`, `cfo`, and `creative-director` write a dated report
> to the project root so successive reviews can be diffed; `ui-ux-plan` maintains
> one canonical `ui-ux-plan.md`. `strong-product-vision` returns in the response,
> because a vision rewrite is an edit to an existing document rather than a
> standing report.

### Category: Vision & Positioning

**strong-product-vision**
- Category: Vision & Positioning
- Does: Diagnoses a vision against five falsifiability tests (inversion, swap, name-the-loser, one-thing, bet), then rewrites it into a contract sentence naming the user, struggle, capability, accepted tradeoff, success signal, and non-goals. Always produces the rewrite, never only a critique.
- Triggers: writing or reviewing a vision, PRD vision section, mission statement, or positioning; a vision that sounds generic, targets "everyone", or reads as a feature list; "is my vision strong?"
- Inputs: the vision as it exists, the feature list or roadmap, any evidence behind the claims.
- Outputs: test results with quoted failures, per-slot questions, the rewritten vision draft (even when every slot is a TODO), feature trace with cut/park verdicts.
- Related: ceo-review (judges the business, not the statement), creative-director (owns the audience-facing line), ui-ux-plan and requirements-analysis (both consume the settled vision).

### Category: Business & Finance

**ceo-review**
- Category: Business & Finance
- Does: Grades five areas — vision/PMF, business model, market, execution, risk — against repo evidence, and issues a keep-funding verdict with Top 3 Asks and ranked existential risks.
- Triggers: "is this worth building", "should we keep funding this", "what would a CEO think", stakeholder health report, business-level project assessment.
- Inputs: the repo (PRD, vision, roadmap, README, prior reviews), git history as a momentum signal, prior dated reports, any real numbers that exist.
- Outputs: dated `ceo-report-YYYY-MM-DD.md` — verdict, scoreboard, per-area sections, Top 3 Asks, what could kill this, changes since the prior report.
- Related: cfo (owns every number this only grades), strong-product-vision, creative-director, ui-ux-plan, engineering-risk-analysis, stakeholder-communication.

**cfo**
- Category: Business & Finance
- Does: Translates the product into money terms — revenue model, unit economics, cost structure, burn and runway, pricing, break-even and scenarios, ranked financial risks — with every figure labeled `[sourced]` or `[estimate]`.
- Triggers: monetization, pricing, unit economics, costs, burn, runway, funding, "is this viable as a business?"
- Inputs: PRD/business plan/pitch, pricing docs, prior reviews, product code, business stage and burn (asked), business type (selects the question set).
- Outputs: dated `cfo-report-YYYY-MM-DD.md` — 11 required sections, financial verdict (viable / viable-with-conditions / not-viable-as-modeled / not-assessable), the 2-3 drivers that decide it.
- Related: ceo-review (owns the fund/kill call this never makes), strong-product-vision, dependency-evaluation, stakeholder-communication.

### Category: Brand & Experience

**creative-director**
- Category: Brand & Experience
- Does: Judges whether the brand and campaign creative would make anyone care, grading six areas on the idea rather than the execution polish, and restating the brand idea as it currently reads versus as it should.
- Triggers: brand idea, positioning line, campaign concept, naming, visual identity, tone of voice, key art, store/launch creative; "is this idea any good", "does this stand out".
- Inputs: PRD and vision docs, all user-facing copy, the naming, design system and assets (read for point of view), prior dated reports.
- Outputs: dated `creative-director-report-YYYY-MM-DD.md` — ship/sharpen/rework verdict, scoreboard, The Idea Restated, Top 3 Creative Asks, what makes this forgettable.
- Related: ui-ux-plan (owns screens; this owns brand), strong-product-vision (owns the operating vision; this the audience-facing line), ceo-review and cfo (own market and pricing).

**ui-ux-plan**
- Category: Brand & Experience
- Does: Turns a PRD or an existing app into one canonical design plan — UX principles that each exclude something, screen inventory and mermaid navigation map, critical flows with failure and empty states, a design system as tokens and scales, plus an audit in existing mode.
- Triggers: a PRD with no interface yet, an app whose UI needs auditing, requests for screens, user flows, navigation, a design system, or a UX review.
- Inputs: the PRD as binding constraints, existing UI source, an existing `ui-ux-plan.md` (making the run an update), the settled product vision.
- Outputs: `ui-ux-plan.md` — 8 required sections, section 6 in existing mode only.
- Related: creative-director (owns brand/voice), strong-product-vision, requirements-analysis, technical-planning-estimation, code-implementation.

---

## Legal (25 skills)

> All legal skills produce analysis to support a human reviewer, are **not legal
> advice**, and flag where licensed counsel is required. Each separates: what the
> contract says · practical consequence · risk · missing information ·
> counsel-required items.

### Category: Structural Review

**contract-structure-completeness**
- Category: Structural Review
- Does: Checks the sections/exhibits/references a contract of its type needs are present and wired; catches referenced-but-missing exhibits, blanks, unsigned blocks.
- Triggers: first pass on any contract; "is this structurally whole".
- Inputs: the contract (ideally with exhibits), contract type, deal context.
- Outputs: component inventory, unresolved references, mechanical defects, material gaps, counsel items.
- Related: defined-term-consistency, drafting-defects-detection, all substantive skills, signature-readiness-assessment.

**defined-term-consistency**
- Category: Structural Review
- Does: Audits defined terms — defined once, used consistently, no circular/undefined/unused — because term defects silently change meaning.
- Triggers: after structure review, before/with substantive review.
- Inputs: the full contract, definitions sections + inline definitions.
- Outputs: defined-term inventory, defects (dup/undefined/inconsistent/circular), material vs cosmetic, counsel items.
- Related: contract-structure-completeness, drafting-defects-detection, substantive skills.

**drafting-defects-detection**
- Category: Structural Review
- Does: Hunts internal contradictions and drafting bugs — conflicting clauses, broken cross-refs, ambiguities, inconsistent numbers, precedence conflicts.
- Triggers: technical consistency sweep of a contract.
- Inputs: the full contract incl. exhibits.
- Outputs: ranked defect register (contradictions, broken refs, numeric errors, consequential ambiguities), fixes, counsel items.
- Related: defined-term-consistency, contract-structure-completeness, boilerplate-provisions-review, redline-recommendations.

### Category: Rights, Obligations & Money

**rights-obligations-extraction**
- Category: Rights, Obligations & Money
- Does: Extracts who must/may do what, when, on what condition, with what consequence — a structured obligations matrix preserving modal force.
- Triggers: understanding/tracking commitments, building an obligations register, before negotiation.
- Inputs: the full contract, the client's party.
- Outputs: obligations matrix + rights, conditional obligations, subjective standards, interdependencies, risk layer.
- Related: payment-compensation-analysis, term-termination-analysis, missing-protections-analysis, contract-negotiation-strategy.

**payment-compensation-analysis**
- Category: Rights, Obligations & Money
- Does: Analyzes money terms — amounts, schedules, acceptance gates, set-off, late fees, taxes, escalation — surfacing cash-flow and one-sided mechanics.
- Triggers: reviewing compensation/payment provisions in a commercial/services contract.
- Inputs: contract + fee schedule/SOW, the client's party (payer/payee).
- Outputs: payment analysis (structure, timeline + acceptance gates, frictions, escalation, tax flags, net position).
- Related: rights-obligations-extraction, term-termination-analysis, equity-incentive-review, contract-negotiation-strategy.

**equity-incentive-review**
- Category: Rights, Obligations & Money
- Does: Analyzes equity/incentive comp — grant type, vesting, acceleration, exercise windows, repurchase/forfeiture, dilution — surfacing what's gained and lost. Refers tax/securities always.
- Triggers: option grants, RSUs, founder/advisor equity, offer-letter equity.
- Inputs: grant + plan document, holder context, cap-table basis.
- Outputs: equity review (vesting map, acceleration, exercise mechanics, take-back clauses, scenarios), tax/securities referrals.
- Related: payment-compensation-analysis, restrictive-covenants-review, assignment-change-of-control-review, contract-negotiation-strategy.

### Category: Risk Allocation

**liability-indemnification-review**
- Category: Risk Allocation
- Does: Maps who pays when things go wrong — caps, exclusions, carve-outs, consequential waivers, indemnity mechanics — and the real worst-case exposure.
- Triggers: reviewing liability/indemnity provisions, quantifying exposure.
- Inputs: full contract, the client's party, realistic damage scenarios.
- Outputs: liability review (cap architecture, carve-outs, indemnity dissection, scenario walk-throughs, net position).
- Related: warranty-representation-review, insurance-requirements-review, confidentiality-data-protection-review, contract-negotiation-strategy.

**warranty-representation-review**
- Category: Risk Allocation
- Does: Analyzes reps and warranties — scope, qualifiers, survival, disclaimers, and the remedy actually available on breach.
- Triggers: reviewing reps & warranties or disclaimer language.
- Inputs: full contract, the client's party + reliance needs.
- Outputs: warranty review (inventory at actual strength, disclaimer net, remedy trace, reliance-needs check, net position).
- Related: liability-indemnification-review, ip-ownership-review, missing-protections-analysis, contract-negotiation-strategy.

**insurance-requirements-review**
- Category: Risk Allocation
- Does: Analyzes required insurance — coverage/limits, additional-insured/subrogation/primary status, certificate mechanics — and whether it backs the risk allocation.
- Triggers: reviewing insurance clauses, checking insurance-indemnity alignment.
- Inputs: insurance clause + whole contract, realistic losses, the client's party.
- Outputs: insurance review (required program, risk-to-coverage match, endorsements, indemnity alignment, tail), broker referrals.
- Related: liability-indemnification-review, regulatory-compliance-review, contract-negotiation-strategy.

**force-majeure-review**
- Category: Risk Allocation
- Does: Analyzes excused-performance provisions — qualifying events, whose obligations (payment carve-out), notice/mitigation, duration, termination backstop.
- Triggers: reviewing force-majeure clauses, disruption/excused-performance risk.
- Inputs: FM clause + whole contract, realistic disruption scenarios, likely invoker.
- Outputs: FM review (trigger + standard, excused obligations, procedure, duration/exit, allocation, doctrine flags).
- Related: term-termination-analysis, regulatory-compliance-review, payment-compensation-analysis, contract-negotiation-strategy.

### Category: Term, Transfer & Exit

**term-termination-analysis**
- Category: Term, Transfer & Exit
- Does: Analyzes lifecycle and exits — term, renewal/auto-renewal traps, termination for cause/convenience, notice/cure, and post-termination consequences and survival.
- Triggers: reviewing term/termination provisions, exit-risk assessment.
- Inputs: full contract, the client's party.
- Outputs: term/termination analysis (term, renewal notice traps, termination rights by party, consequences, survival, exit risk).
- Related: payment-compensation-analysis, assignment-change-of-control-review, confidentiality-data-protection-review, contract-negotiation-strategy.

**assignment-change-of-control-review**
- Category: Term, Transfer & Exit
- Does: Analyzes assignment/delegation/CoC provisions — consents, what "change of control" captures, and M&A landmines like license death on acquisition.
- Triggers: anti-assignment clauses, M&A readiness, CoC triggers.
- Inputs: assignment/CoC provisions + whole contract, the client's plausible futures.
- Outputs: assignment/CoC review (architecture, CoC treatment, trigger consequences, successor mechanics, scenario walk-throughs).
- Related: term-termination-analysis, equity-incentive-review, ip-ownership-review, contract-negotiation-strategy.

### Category: IP, Confidentiality & People

**ip-ownership-review**
- Category: IP, Confidentiality & People
- Does: Analyzes ownership/use of every IP category — background IP, work product, licenses, assignment language, open-source, residuals.
- Triggers: IP provisions in development/employment/contractor/license/acquisition deals.
- Inputs: full contract + IP exhibits, the client's needs, nature of the assets.
- Outputs: IP review (category map, assignment type, license parameters, background-IP protection, OSS exposure, needs test).
- Related: confidentiality-data-protection-review, warranty-representation-review, worker-classification-review, contract-negotiation-strategy.

**confidentiality-data-protection-review**
- Category: IP, Confidentiality & People
- Does: Analyzes confidentiality (definition scope, exceptions, duration, residuals) and personal-data machinery (DPA, breach notice, deletion).
- Triggers: NDAs, confidentiality clauses, data-handling provisions.
- Inputs: full agreement + DPA exhibit, disclosure direction, whether personal data flows.
- Outputs: confidentiality/data review (definition scope tested vs disclosures, exceptions audit, duration, residuals, data machinery).
- Related: ip-ownership-review, term-termination-analysis, regulatory-compliance-review, restrictive-covenants-review.

**restrictive-covenants-review**
- Category: IP, Confidentiality & People
- Does: Analyzes noncompete/nonsolicit/no-hire/exclusivity — scope, triggers, consideration, bite — flagging enforceability is intensely jurisdiction-specific.
- Triggers: restrictive covenants in employment/contractor/sale-of-business/commercial agreements.
- Inputs: covenant language + whole contract, context, restricted party's market, jurisdiction.
- Outputs: covenants review (per-covenant parameters, definitional bite, consideration, practical consequence, structural enforceability flags).
- Related: confidentiality-data-protection-review, equity-incentive-review, worker-classification-review, contract-negotiation-strategy.

**worker-classification-review**
- Category: IP, Confidentiality & People
- Does: Reviews engagement terms + described reality against employee-vs-contractor factors, surfacing misclassification signals — never a determination.
- Triggers: contractor/consulting agreements, classification exposure.
- Inputs: the agreement + actual working arrangement, jurisdiction/purpose, the client's side.
- Outputs: classification signal analysis (label discounted, control/economic/relationship signals with direction, contract-vs-reality contradictions), counsel determination.
- Related: restrictive-covenants-review, ip-ownership-review, equity-incentive-review, regulatory-compliance-review.

### Category: Forum & Compliance

**dispute-resolution-review**
- Category: Forum & Compliance
- Does: Analyzes how disputes resolve — arbitration vs litigation, escalation ladders, class/jury waivers, fee-shifting, shortened limitations, injunctive carve-outs — and the leverage each creates.
- Triggers: reviewing dispute-resolution/arbitration/remedies provisions.
- Inputs: DR provisions + governing law, the client's size vs counterparty, realistic disputes.
- Outputs: DR review (mandatory path, forum architecture, mutuality, waivers, cost, dispute walk-throughs).
- Related: governing-law-jurisdiction-review, liability-indemnification-review, term-termination-analysis, contract-negotiation-strategy.

**governing-law-jurisdiction-review**
- Category: Forum & Compliance
- Does: Analyzes choice-of-law/forum/venue — which law governs, exclusivity, CISG handling, and the practical burden the choices impose. Never predicts rulings.
- Triggers: reviewing governing-law/venue clauses, cross-border exposure.
- Inputs: governing-law/forum clauses + DR clause, party locations/assets, the client's party.
- Outputs: law/jurisdiction review (choice-of-law scope, forum exclusivity classification, coherence, practical burden, mandatory-law flags).
- Related: dispute-resolution-review, regulatory-compliance-review, contract-negotiation-strategy.

**regulatory-compliance-review**
- Category: Forum & Compliance
- Does: Identifies regimes a deal plausibly touches and audits how the contract allocates compliance burden, cooperation, and change-risk — never a compliance determination.
- Triggers: reviewing compliance clauses, spotting regulatory exposure.
- Inputs: contract + deal facts (data types, industries, users, geography), the client's party.
- Outputs: compliance review (regimes flagged with triggering facts, clause audit, allocation map, change-risk), professional referrals.
- Related: confidentiality-data-protection-review, liability-indemnification-review, governing-law-jurisdiction-review, insurance-requirements-review.

### Category: Synthesis & Action

**boilerplate-provisions-review**
- Category: Synthesis & Action
- Does: Scrutinizes the "miscellaneous" section — integration, amendment/waiver, notices, precedence, third-party beneficiaries — separating routine from load-bearing.
- Triggers: reviewing the general-provisions/miscellaneous section.
- Inputs: general-provisions section + whole contract, any side agreements the client relies on.
- Outputs: boilerplate review (consequential provisions ranked, integration/reliance check, notice traps, precedence, buried operative terms).
- Related: drafting-defects-detection, governing-law-jurisdiction-review, dispute-resolution-review, assignment-change-of-control-review, missing-protections-analysis.

**missing-protections-analysis**
- Category: Synthesis & Action
- Does: Finds what the contract does NOT say that it should — absent clauses and silent risks for a party in the client's role and deal type.
- Triggers: after substantive review; "what's missing / what should we have asked for".
- Inputs: full contract + prior review outputs, the client's role + deal type, concerns.
- Outputs: gap analysis (expected-protections model diff, fact-driven gaps, acceptable silences, ranked material gaps), routing.
- Related: the substantive review skills, redline-recommendations, contract-negotiation-strategy, signature-readiness-assessment.

**contract-negotiation-strategy**
- Category: Synthesis & Action
- Does: Turns findings into a prioritized negotiation plan — issues ranked by materiality × leverage, positions (ideal/acceptable/walk-away), trades, sequencing.
- Triggers: preparing for negotiation once issues are identified.
- Inputs: review findings + client party, client priorities/BATNA/relationship goals, commercial context.
- Outputs: negotiation strategy (leverage assessment, priority map, trade packages, sequencing, relationship considerations).
- Related: the review skills + missing-protections-analysis, redline-recommendations, plain-english-contract-explanation, signature-readiness-assessment.

**redline-recommendations**
- Category: Synthesis & Action
- Does: Drafts specific proposed edits — exact replacement/insertion language, plain rationale, and a fallback — so findings become concrete redlines. Counsel must review.
- Triggers: turning identified issues into proposed contract language.
- Inputs: the findings + client position, the contract's style/defined terms, desired aggressiveness.
- Outputs: redlines (current text, proposed ideal + fallback, sendable rationale, conforming changes), counsel-review reminder.
- Related: contract-negotiation-strategy, missing-protections-analysis, defined-term-consistency/drafting-defects-detection, plain-english-contract-explanation.

**plain-english-contract-explanation**
- Category: Synthesis & Action
- Does: Translates a contract for a non-lawyer — obligations, what's given up, "what happens if" scenarios — without distorting substance or advising the decision.
- Triggers: briefing a client/owner/employee on what a contract means.
- Inputs: contract/clause + who the reader is, their key question.
- Outputs: plain-language explanation (bottom line, obligations, rights, risks flagged, scenarios, questions for a lawyer).
- Related: the review/analysis skills, contract-negotiation-strategy, signature-readiness-assessment, stakeholder-communication (eng).

**signature-readiness-assessment**
- Category: Synthesis & Action
- Does: Consolidates all findings into a go/no-go for signing — blockers verified resolved in the final text, residual risks explicitly accepted, execution mechanics correct.
- Triggers: final gate before signing, after substantive reviews.
- Inputs: prior review outputs + final post-negotiation version, client's risk decisions, counsel-review status.
- Outputs: readiness verdict (READY/CONDITIONS/NOT-READY) with consolidated register, verified blockers, residual-risk acceptance, mechanics check.
- Related: all prior review skills + missing-protections-analysis + drafting-defects-detection, contract-negotiation-strategy/redline-recommendations.

---

## Cross-profession analogues

Some capabilities mirror across the two libraries:

| Engineering | Legal | Shared shape |
| ----------- | ----- | ------------ |
| `stakeholder-communication` | `plain-english-contract-explanation` | Translate expert content for a lay decision-maker |
| `production-readiness-review` | `signature-readiness-assessment` | Final go/no-go gate consolidating prior reviews |
| `engineering-risk-analysis` | `missing-protections-analysis` | Surface what's absent/risky, ranked |
| `code-change-review` | the substantive legal reviews | Evidence-grounded, severity-ranked findings on a document |

Product mirrors them too: `ceo-review` and `cfo` split the same way
`production-readiness-review` and its inputs do — one issues the verdict, the
other supplies the evidence it rests on. And `staff-architect` is to the
engineering skills what `ceo-review` is to `product/`: the front door that ranks
what matters and routes, rather than a skill that answers.
