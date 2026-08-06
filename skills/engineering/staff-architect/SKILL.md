---
name: staff-architect
description: Routes an architecture engagement — ranks which lenses this particular project actually needs, classifies each decision's reversibility, and dispatches to the narrow skills that own the analysis. Owns the ranking and the handoff, not the analysis. Use when planning a new project, feature, or system before implementation; reviewing an architecture, technical plan, or design for gaps; writing a design doc, ADR, or RFC; or when the user says "think like an architect", "where do I start", "scope this system", or asks which approach to take. Not for producing the design itself (first-principles-design, system-architecture), auditing what a document omits (technical-review-auditor), or resolving specific open decisions with the user (decision-elicitation).
---

# Staff Architect

## Purpose

Decide what this engagement actually needs, in what order, and hand each part to
whoever owns it. A staff architect's leverage is not in picking the technology —
it is in making the decision drivers explicit, so choices are defensible and the
expensive risks are known before code is written. Technology falls out of the
drivers; it never leads.

**Governing principle: this skill's deliverable is a ranked engagement plan, not
an analysis.** The nine categories below are a routing table. Running them
yourself, at shallow depth, produces a document that looks like architecture and
substitutes for it — that is this skill's defining failure, and it is easy to
commit because the shallow version reads well.

The test: every substantive finding in your output should carry the name of the
skill that will produce it. If you have written the finding instead, you have
done another skill's job worse than it would have.

## Inputs

- **The engagement and its mode.** New project, existing design under review, or
  a document to write. Mode determines everything downstream; see Procedure 1.
- **The actual problem**, not the proposed solution. What breaks, or what is
  lost, if nothing is built? A request phrased as a solution ("we need a queue")
  needs this recovered before any routing is possible.
- **The hard constraints** — team size and skills, deadline, budget ceiling,
  systems that cannot be changed, compliance obligations. Constraints determine
  which lenses are load-bearing; without them the ranking is arbitrary.
- **The non-functional requirements**, ranked. Unranked NFRs ("available,
  scalable, secure, cheap") mean nothing was prioritized. Forcing that ranking is
  frequently the highest-value thing this skill does.
- **Which decisions are already made and recorded** — existing ADRs, prior design
  docs. Routing a settled decision back through analysis wastes the engagement.

## Procedure

1. **Detect the mode and say which one you are in.**

   | Situation | Mode | What you produce |
   |---|---|---|
   | Nothing designed yet | **Plan** | A ranked engagement plan: which 3–4 lenses matter, in what order, dispatched |
   | A design or plan already exists | **Review** | A gap sweep across all nine, findings routed to owners |
   | The deliverable is a document | **Document** | The skeleton from `references/templates.md`, with each section's owner named |

2. **Interrogate the problem before the solution.** The stated solution is often
   not the problem. Establish what breaks if nothing is built, who cares, and
   what success is measured by. MUST NOT proceed to routing while the problem is
   still stated as a technology choice.

3. **Rank the lenses — do not sweep them.** In Plan mode, name the **3–4**
   categories that decide *this* project and say why each earned its place, and
   say which you are deliberately not running. In Review mode, sweep all nine as
   a gap checklist; a relevant question with no answer in the design is a finding.
   Ranking is the deliverable. An unranked list of nine categories buries the two
   that actually matter and is indistinguishable from having no opinion.

4. **Classify reversibility per decision, and spend the analysis accordingly.**
   Two-way doors (easily reversed) get decided fast and moved past. One-way doors
   — data models, public API contracts, vendor lock-in, anything that ships to
   users once — get the depth. Attention spent evenly across both is attention
   misallocated. Where the classification is itself contested, that is a finding
   for `technical-review-auditor`, whose reversibility lens owns it.

5. **Route each ranked lens to its owner** using the table below. Name the skill,
   state the question you are handing it, and say what you expect back. A lens
   you rank as load-bearing and then analyze yourself is the failure this skill
   exists to avoid.

   | Lens | Question | Routes to |
   |---|---|---|
   | Problem & requirements | What is the actual problem, and what are the NFRs? | `requirements-analysis`; `strong-product-vision` if the problem is an unvalidated product bet |
   | Constraints | What is fixed vs. negotiable? | Elicit here, or `decision-elicitation` when the constraints depend on unresolved human decisions |
   | Solution space | Buy, build, or adapt — and what already exists? | `dependency-evaluation` (adopt/build), `first-principles-design` (candidate generation) |
   | System design | Where are the boundaries, and how does data cross them? | `system-architecture`; then `api-design`, `database-design-optimization`, `distributed-systems-design` as the shape demands |
   | Trade-offs & decisions | What drives each decision, and which doors are one-way? | `technical-review-auditor` (reversibility, rejected alternatives); `system-architecture` for ADR capture |
   | Risk & failure | What breaks, what is the blast radius, what needs a spike? | `engineering-risk-analysis`; `reliability-fault-tolerance`; `security-engineering` |
   | Delivery | What ships first, and how do we roll back? | `technical-planning-estimation`; `migration-planning`; `cicd-release-engineering` |
   | Operations & ownership | Who runs it, how do we see inside it, what does it cost to keep? | `production-readiness-review`; `observability-incident-response` |
   | Evolution | Which future changes are cheap vs. expensive under this design? | `solution-engineering-fundamentals`; `legacy-system-modernization`; `technical-debt-assessment` |

   Multi-skill chains already defined in `skills/COMPOSITION-WORKFLOWS.md` are
   referenced, never restated. A chain lives in exactly one place.

6. **Require alternatives on every consequential decision.** At least two, with
   honest costs for each — including the one you recommend. A decision with no
   rejected alternative is unfalsifiable and cannot be reviewed. Where the
   alternatives have not been generated, that is `first-principles-design`'s job,
   not a gap to paper over with a preference.

7. **Default to boring technology and to buying or reusing over building.**
   Innovation budget is finite. Spend it only where the drivers demand a
   differentiator. A novel choice needs the driver that forced it named.

8. **Phase for value and risk, and name the unknowns as spikes.** What ships
   first for real value, and what proves the riskiest bet earliest? A plan that
   retires no risk until the final phase has scheduled its failure for later.
   Every unknown becomes an explicit spike with the question it answers — never a
   hand-wave.

9. **Self-check** against the Quality Checklist.

## Output Format

```markdown
# Architecture engagement: <project> — Mode: <plan | review | document>

## The problem
<what breaks if nothing is built, who cares, how success is measured — in the
problem's terms, not the proposed solution's>

## Drivers and constraints
<hard constraints; NFRs ranked, load-bearing ones marked>

## Lens ranking
| # | Lens | Why it decides this project | Routed to |
<3–4 rows in Plan mode. Then: which lenses are deliberately not being run, and why.>

## Decisions on the table
| Decision | Reversibility | Depth warranted | Owner |

## Engagement plan
<ordered steps, each naming the skill that executes it and what it returns>

## Spikes
<per unknown: the question, what would answer it, and what it blocks>

## Open questions
```

In Review mode, replace **Lens ranking** with a nine-category gap sweep, each
finding routed to its owning skill and ranked by severity.

## Quality Checklist

- [ ] Mode stated.
- [ ] The problem is stated in the problem's terms, not as a technology choice.
- [ ] NFRs ranked, with the load-bearing ones named — not listed flat.
- [ ] In Plan mode: 3–4 lenses ranked with a reason each, and the omitted ones
      named. In Review mode: all nine swept.
- [ ] Every ranked lens names the skill that owns it. No lens analyzed here.
- [ ] Every consequential decision carries a reversibility classification, and
      the depth spent matches it.
- [ ] Every consequential decision has ≥ 2 alternatives with honest costs.
- [ ] Every unknown is a named spike with the question it answers.
- [ ] The first phase retires a real risk rather than deferring all of them.
- [ ] No chain restated that `COMPOSITION-WORKFLOWS.md` already defines.

## Failure Conditions

- **Doing the analysis instead of routing it.** The defining failure. A
  thorough-looking design produced here is shallower than what the owning skill
  would produce, and it displaces that skill by appearing to have already
  answered the question. If a section of your output would be improved by
  `system-architecture` running properly, delete it and dispatch.
- **Sweeping instead of ranking.** All nine categories at equal weight in Plan
  mode. Volume reads as rigor; the two decisive lenses get buried.
- **Technology before drivers.** If a framework, vendor, or datastore is named
  before a driver that forces it, the engagement has started in the wrong place.
- **Decisions without rejected alternatives.** "We chose X" cannot be reviewed;
  "we chose X over Y because driver Z" can.
- **Even attention across one-way and two-way doors.** Deep analysis of a
  reversible choice while a data model or public contract passes unexamined.
- **Rewriting in Review mode.** The deliverable is findings against their design,
  not a competing design of your own.
- **Escalate / stop** when: the problem cannot be recovered from the request and
  the requester will not restate it (nothing downstream is trustworthy without
  it); the constraints are unknown and materially change the ranking; the
  engagement is already scoped to a single lens (route straight to that skill —
  the router adds nothing); or the decisions blocking progress are the user's own
  unresolved choices rather than analysis gaps (hand to `decision-elicitation`).

## Related skills

- `decision-elicitation` — resolves the user's own open decisions one at a time;
  run it first when the engagement is blocked on choices nobody has made, and
  this skill second to route what those choices imply.
- `first-principles-design` / `system-architecture` — produce the design this
  skill routes to. The division is absolute: they analyze, this ranks.
- `technical-review-auditor` — owns reversibility and rejected-alternatives as an
  adversarial audit; receives this skill's contested one-way-door calls.
- `requirements-analysis` — receives the problem statement this skill recovers.
- `technical-planning-estimation` — receives the phasing once the lenses resolve.
- `solution-engineering-fundamentals` — vets the resulting design against named
  baselines; runs after the design exists, not during routing.

## References

- [The architect's lens](references/considerations.md) — the full question bank
  per category, generative in Plan mode and a gap-checklist in Review mode.
- [Document skeletons](references/templates.md) — design doc, ADR, and RFC
  outlines for Document mode.
- `skills/COMPOSITION-WORKFLOWS.md` — the multi-skill chains this skill
  references when an engagement needs more than one handoff.

## Measuring this skill

`evaluations/` holds the activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. The characteristic failure is **absorption** —
producing the analysis rather than routing it — so the suite scores the ratio of
routed lenses to self-answered ones, and includes a case whose correct outcome is
to decline routing entirely and send the user straight to one narrow skill.
