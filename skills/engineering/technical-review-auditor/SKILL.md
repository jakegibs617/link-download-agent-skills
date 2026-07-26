---
name: technical-review-auditor
description: Adversarially reviews a technical artifact before it is built or shipped — a plan, roadmap, design doc, RFC, ADR, spec, PR/FAQ, pull request, or existing module — through four lenses (reversibility, rejected alternatives, NFR interrogation, riskiest assumption), producing ranked findings and a verdict that names what is missing rather than summarizing what is there. Use when asked to "review this plan", "poke holes in this", "is this design sound", "what am I missing", or "sanity check this spec". Not for line-level correctness review of a diff (code-change-review), a scored risk register (engineering-risk-analysis), a launch checklist gate (production-readiness-review), or producing the design itself (first-principles-design / system-architecture).
---

# Technical Review Auditor

## Purpose

Adversarial review of technical plans, design documents, and code, applying
the judgment of a senior architect who has watched projects fail six months
in for reasons that were visible on day one.

**Governing principle: the job is to find what is missing, not to summarize
what is there.** A review that restates the artifact has failed — the author
already knows what they wrote. Value comes entirely from what they did not
write, did not consider, or assumed without noticing they were assuming.

Take the reviewer's seat, not the co-author's seat. MUST NOT rewrite the
document, soften findings to be agreeable, or offer to fix problems in the
same breath as raising them — that collapses the review into a drafting
session and the author stops thinking.

## Inputs

- The artifact under review: plan, roadmap, phased delivery or migration
  plan, design doc, RFC, ADR, spec, PR/FAQ, pull request, repo, or module.
- Its stated goal and audience. An artifact whose goal is unstated gets that
  flagged first — you cannot review against an unknown target.
- In Code mode: read access to the code itself, plus any design document it
  claims to implement. MUST read the code before judging it.
- Context the artifact assumes but does not state (scale figures, existing
  systems, team constraints). Where this is unavailable, findings that depend
  on it become questions, not assertions.

## Procedure

### 1. Select the mode and say which one is in use

| Mode | Artifact | Emphasis |
|------|----------|----------|
| **Plan** | roadmap, project plan, phased delivery, migration plan | riskiest assumption, sequencing |
| **Doc** | design doc, RFC, ADR, spec, PR/FAQ | rejected alternatives, NFRs |
| **Code** | repo, module, pull request | reversibility, NFRs as implemented |

All four lenses apply in every mode. Only the weighting changes.

### 2. Lens 1 — Reversibility (one-way doors)

Classify every consequential decision as **one-way** (expensive or impossible
to undo once shipped) or **two-way** (cheap to change later), then check
whether the rigor spent matches the classification.

Usually one-way once real data or real consumers exist:

- persisted data models, schemas, and anything requiring backfill to change
- public API contracts, event schemas, wire formats
- identity, tenancy, and authorization models
- ID schemes and key structure
- consistency and transaction boundaries
- where PII lives and which systems touch it
- vendor choices where data egress is hard or the format is proprietary

Commonly *mistaken* for one-way, actually reversible: language or framework
inside a bounded service, CI tooling, internal library choices, most
infrastructure-as-code decisions, cloud region within a provider.

Report each as: decision · classification · rigor present · rigor warranted.

The most valuable finding here is **inverted attention** — three pages
debating a two-way door while a one-way door passes in a single clause. Name
it explicitly when it appears, because it is invisible to the author.

### 3. Lens 2 — Rejected alternatives

Every consequential decision should name at least one real alternative that
was considered and lost, with the reason it lost.

Two failure modes to hunt:

- **Strawman alternatives.** If the rejected option is one no competent
  engineer would have chosen, no decision was actually made — a preference
  was decorated with justification. Say so.
- **Missing default alternatives.** Check specifically for these three,
  which get omitted far more than any others: do nothing / keep the current
  system; buy or adopt instead of build; extend what already exists rather
  than add a new component.

Absence of the do-nothing option is the single most common gap in
architecture documents. Ask for it every time it is missing. A decision with
no losing alternative is a rationalization, not a decision — that phrasing is
worth using.

### 4. Lens 3 — NFR interrogation

Walk the non-functional requirements and classify each as **specified**,
**vague**, or **absent**:

- latency — which percentile, measured at which boundary
- throughput and expected growth curve
- availability target, and what that target costs to hold
- durability, RPO, RTO
- consistency model and what staleness is acceptable
- scale horizon — what breaks first at 10x and at 100x
- cost ceiling and unit cost per request/tenant/record
- authorization model and blast radius of a compromised component
- data residency, retention, deletion, compliance obligations
- observability — what question can be answered at 3am, and from what signal
- operability — who is on call, what the runbook says, what the degraded
  mode is
- migration and backfill path, including rollback

**Vague is the dangerous category, not absent.** "Should be fast", "highly
available", "scales well" read as covered and get no further scrutiny. Absent
at least looks absent. Demand a number and a measurement point for anything
vague.

MUST NOT invent targets. If a requirement is missing, raise it as a question
— do not assume a value and then review against the assumption.

### 5. Lens 4 — Riskiest assumption

Identify the assumption that, if false, invalidates the most downstream work,
then check whether the plan tests it first. Most plans are sequenced by
dependency order or by what is easiest to start; neither front-loads risk.

Report:

- the assumption carrying the most weight
- whether anyone is currently treating it as an assumption at all
- what the first slice should prove
- what evidence would count as confirmation, and what would falsify it

The highest-value finding is the load-bearing belief stated as fact. Look for
confident present-tense claims about throughput, integration behavior,
third-party reliability, data quality, or user behavior that have no source
attached.

### 6. Code mode specifics

Read the code before judging it. Cite file and line for every finding. MUST
NOT assert a problem without pointing at the exact place it lives — an
unlocatable finding is unactionable and erodes trust in the rest of the
review.

The lenses map onto code as:

- **reversibility** — migrations, schema changes, published interfaces,
  serialized and persisted formats, feature flags that have quietly become
  permanent
- **rejected alternatives** — find the structural decision with no comment,
  ADR, or commit rationale, and ask why this shape rather than the obvious
  simpler one
- **NFRs as implemented** — timeouts, retry policy and retry storms,
  backpressure, pagination, unbounded queries and collections, N+1 access
  patterns, swallowed errors, missing instrumentation on the paths that
  matter
- **riskiest assumption** — the load-bearing assumptions encoded in code:
  assumed uniqueness, assumed ordering, assumed single writer, assumed small
  N, assumed clock synchronization, assumed idempotency

Where code and the design document disagree, report the divergence as a
finding in its own right. The divergence is often the correct choice; silent
divergence never is.

### 7. Rank, then write the verdict

Rank findings by **cost of being wrong × cost of fixing later** — not by how
easy they are to fix and not by the order they appear in the document. A
cheap fix to a one-way door outranks an expensive fix to a reversible one.

## Output Format

```markdown
# Review: <artifact name> — Mode: <plan | doc | code>

## Verdict
<proceed | proceed with conditions | rework before building> — one sentence on why.

## Blocking findings
### B1: <title> — what · why it matters · what would resolve it

## Non-blocking findings

## Lens results
Reversibility · Rejected alternatives · NFRs · Riskiest assumption
For each: what is covered, what is missing.

## Questions for the author
The ones that cannot be answered from the artifact itself.
```

## Quality Checklist

- [ ] Mode stated; all four lenses applied with mode-appropriate weighting.
- [ ] Every consequential decision classified one-way or two-way, with rigor
      present vs. rigor warranted; inverted attention named where present.
- [ ] Do-nothing / buy / extend-existing alternatives checked for explicitly.
- [ ] Each NFR marked specified, vague, or absent; no invented targets.
- [ ] Riskiest assumption named, with what the first slice should prove.
- [ ] Code-mode findings each cite file and line.
- [ ] Findings ranked by cost-of-being-wrong × cost-of-fixing-later.
- [ ] Blocking findings capped at roughly five.
- [ ] At least one thing done well is named, when one exists.
- [ ] Not stated vs. wrong distinguished; inference marked as inference.
- [ ] No rewriting — findings and questions only.

## Failure Conditions

- **Summarizing instead of auditing:** restating the artifact back to the
  author, who already knows what it says.
- **Co-authoring:** rewriting the document or drafting fixes inline, which
  ends the author's own thinking.
- **Blocking-list inflation:** if everything is blocking, nothing is — the
  author triages on their own judgment instead of yours, defeating the
  review. Cap blocking findings at roughly five.
- **Reflexive negativity:** a reviewer who never finds anything sound is
  discounted on the next document. Say plainly when something is well done —
  credibility is what makes the blocking findings land.
- **Gap labelled as error:** most gaps are gaps, not mistakes; calling a gap
  a mistake makes the author defensive over nothing.
- **Unmarked inference:** presenting what you read between the lines as
  something the artifact claims.
- **Invented NFR targets:** assuming a number and then reviewing against the
  assumption.
- **Unlocatable code findings:** asserting a problem without a file and line.
- **Escalate / stop** when: the artifact's goal is unstated (ask before
  reviewing); the artifact is too large to review meaningfully (request a
  scope split rather than skimming); or judging a decision needs
  domain/business context you lack (raise it as a question for the author).

## Related skills

- `code-change-review` — line-level correctness/test review of a specific
  diff before merge; this skill instead audits the structural decisions.
- `engineering-risk-analysis` — converts these findings into a scored, owned
  risk register with mitigations and triggers.
- `production-readiness-review` — the launch gate; consumes this review's
  NFR results.
- `first-principles-design` / `system-architecture` — produce the artifact
  this skill reviews; the author's next draft stays theirs.
- `technical-planning-estimation` / `migration-planning` — own the sequencing
  changes the riskiest-assumption lens argues for.

## Measuring this skill

Two evaluation layers exist, and they measure different things.

- `evaluations/` — the library-wide activation and rubric suite every skill
  in this catalog carries. Run it per `skills/EVALUATION-GUIDE.md`.
- `references/evaluation.md` — the seeded-defect harness specific to this
  skill: fixtures under `evals/fixtures/` with a known defect ledger, scored
  by `scripts/score_review.py` against a no-skill baseline. Read it when
  measuring or iterating on the skill itself, not when performing a review.
  MUST NOT design an ad-hoc scoring scheme instead — iteration numbers are
  only meaningful when the method is held fixed.
