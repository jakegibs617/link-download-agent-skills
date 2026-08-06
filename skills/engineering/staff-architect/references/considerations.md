# The Architect's Lens — Full Considerations

Each category works two ways: **generatively** in Plan mode (ask these to build
the design) and as a **gap-checklist** in Review mode (a relevant question with no
answer in the design is a finding).

**How to use this file.** These questions establish whether a lens is
load-bearing for this project — they are not the analysis. Once a lens is ranked
in, the questions go to the owning skill named under each heading, which answers
them properly. Answering them here, at the depth this file supports, is the
absorption failure described in `SKILL.md`.

---

## 1. Problem & requirements

*Routes to:* `requirements-analysis` — or `strong-product-vision` when the problem
is an unvalidated product bet rather than an under-specified requirement.

- What is the actual problem? Is the stated solution the problem, or one guess at
  solving it?
- Who are the stakeholders, and what does success look like for each? What metric
  moves?
- What are the non-functional requirements — performance targets, expected scale
  (now and 10x), availability, security/compliance obligations, cost ceiling?
- Which NFRs are load-bearing and which are nice-to-have? Force a ranking.
- What is explicitly out of scope (non-goals)?

## 2. Constraints

*Routes to:* elicit directly, or `decision-elicitation` when the constraints
depend on choices the user has not made yet.

- Team: how many people, what do they already know, what would they have to learn?
- Timeline: is the deadline real (contract, launch event) or aspirational?
- Budget: build cost and run cost — what's the ceiling for each?
- Existing systems: what must this integrate with, and what contracts or formats
  are already fixed?
- Org standards: mandated languages, clouds, vendors, security policies?
- Which of these are hard constraints vs. negotiable with the right argument?

## 3. Solution space

*Routes to:* `dependency-evaluation` for adopt/build calls;
`first-principles-design` for candidate generation.

- Does an off-the-shelf product, SaaS, or library already solve this? What would
  disqualify it?
- What existing code, services, or patterns in this org or codebase can be reused
  or extended?
- Buy vs. build vs. adapt: compare on total cost of ownership, not just build cost.
- Is the boring option (proven tech the team knows) genuinely insufficient, or
  just unexciting?

## 4. System design

*Routes to:* `system-architecture` first; then `api-design`,
`database-design-optimization`, or `distributed-systems-design` as the shape
demands.

- Where are the system boundaries? What owns what data, and what are the
  interfaces between parts?
- What is the data model, and how does data flow through the system end to end?
- What consistency does each piece of state actually need (strong, eventual, none)?
- Where is coupling tight, and is it justified? Can components change
  independently?
- What are the integration points with external systems, and what happens when
  each is slow or down?

## 5. Trade-offs & decisions

*Routes to:* `technical-review-auditor` for the adversarial pass;
`system-architecture` for ADR capture.

- For each significant decision: what are the drivers, ranked? The top driver
  should decide ties.
- What alternatives were considered? Every alternative gets honest cons —
  including the winner.
- Is this decision a one-way door (data model, public API, vendor lock-in, wire
  format) or a two-way door? Spend analysis proportional to reversibility.
- What would have to be true for the rejected option to have been right? If
  nothing, the comparison wasn't honest.

## 6. Risk & failure

*Routes to:* `engineering-risk-analysis` for the register;
`reliability-fault-tolerance` for failure handling; `security-engineering` for
the abuse surface.

- What are the failure modes? For each: likelihood, blast radius, detection,
  recovery.
- Where are the single points of failure — technical (one DB, one queue) and
  human (one person who understands it)?
- Where does this hit scaling limits first, and at what load?
- What is the security surface — who can reach what, what data is sensitive,
  what's the worst leak?
- What are the known unknowns? Each becomes a spike with a specific question to
  answer before committing.

## 7. Delivery

*Routes to:* `technical-planning-estimation`; `migration-planning` when replacing
something; `cicd-release-engineering` for the deploy path.

- What is the smallest slice that delivers real value? Ship it first.
- What is the riskiest assumption? Prove or kill it as early as possible — never
  phase 4.
- If replacing something: what is the migration path, and can old and new run
  side by side?
- What is the rollback story at each phase?
- What are the cross-team or external dependencies, and are they on the critical
  path?

## 8. Operations & ownership

*Routes to:* `observability-incident-response` for the seeing-inside-it half;
`production-readiness-review` for the launch gate.

- How do we know it's working — metrics, logs, traces, alerts? What page wakes
  someone at 3am?
- How does it deploy, and how long does a fix take to reach production?
- What are the SLOs, and who is accountable for them?
- What does it cost to run per month at expected load? At 10x?
- Who maintains this in a year? Does the design match that team's size and skills?

## 9. Evolution

*Routes to:* `solution-engineering-fundamentals` to vet the shape against named
baselines; `legacy-system-modernization` when replacement is on the table;
`technical-debt-assessment` for the debt taken on knowingly.

- Which likely future changes are cheap under this design, and which are
  expensive? Is that the right bet?
- Where are the deliberate extension points — and where have we deliberately
  *not* generalized?
- What tech debt is being taken on knowingly? Record it, with the trigger for
  paying it down.
- If requirements double in one dimension (users, data, features, teams), what
  breaks first?
