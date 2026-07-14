---
name: technical-documentation
description: Writes technical documentation matched to a specific reader and job — READMEs, architecture docs, API references, runbooks, ADRs, onboarding guides — grounded in the real system and structured so the reader can act. Use when documentation is requested or when work produced something others must operate or extend. Not for user-facing product copy, plain-English explanation of legal contracts (plain-english-contract-explanation), or explaining a decision to nontechnical stakeholders (stakeholder-communication).
---

# Technical Documentation

## Purpose

Produce documentation a specific reader can act on: the right document type
for the job, grounded in the actual system (verified, not imagined), and
structured so the answer the reader came for is fast to find — and cheap
enough to keep true that it won't rot on contact with the next change.

## Inputs

- The reader and their job: a new hire onboarding, an on-call responder at
  3am, an integrator calling the API, a future maintainer. Different readers
  need different documents; guessing wrong wastes the doc. If unstated,
  infer and state the assumed reader.
- The system being documented, with access to verify claims against it
  (code, config, actual behavior).
- The document's lifespan and owner — who keeps it true, and how it stays
  linked to the thing it describes.

## Procedure

1. **Pin the reader and the job-to-be-done.** One primary reader per
   document; write the one question they most need answered at the top.
   A doc serving everyone serves no one — split by reader if needed.
2. **Pick the document type deliberately:**
   - **README** — orient + get running fast (what/why/quickstart).
   - **Architecture / ADR** — the shape and the *why* of decisions (route
     ADR content to `system-architecture`'s format).
   - **API reference** — every operation, params, errors, examples that run.
   - **Runbook** — step-by-step for an operator under stress; commands
     copy-pasteable, decision points explicit.
   - **How-to / tutorial** — a task walked end to end.
   - **Explanation** — the mental model behind the system.
   Mixing types (a README that's secretly a tutorial) is a common failure.
3. **Ground every claim in the real system.** Verify commands actually run,
   endpoints exist as described, config keys are current, examples produce
   the shown output. MUST NOT document intended-but-unverified behavior as
   fact — the fastest way to lose reader trust is one wrong command. Label
   anything aspirational as such.
4. **Structure for scanning, not reading.** Lead with the answer; put
   prerequisites before steps; use headings a searcher would query;
   examples before exhaustive reference. The reader is looking, not reading
   cover to cover — optimize for find-and-leave.
5. **Show, then tell.** A working example the reader can copy beats
   paragraphs of prose. Every non-obvious instruction gets a concrete
   example; every example is real and tested.
6. **Write for rot-resistance.** Prefer documenting the stable (contracts,
   intent, invariants) over the volatile (line numbers, exact output that
   changes). Link to source of truth rather than duplicating it; state where
   the doc lives relative to the code so it's updated together. Note the
   things most likely to drift.
7. **State the boundaries.** What this doc does *not* cover, and where to go
   for that. Prerequisites and assumptions explicit. Known gaps listed
   rather than silently missing.

## Output Format

The document itself, in the chosen type's conventional structure, plus a
short front-matter block:

```markdown
> Reader: <primary reader> · Job: <the question this answers> · Type: <readme|adr|api-ref|runbook|how-to|explanation>
> Verified against: <what/when> · Owner: <who keeps it true> · Not covered: <boundaries>
```

## Quality Checklist

- [ ] One primary reader; their top question answered at the top.
- [ ] Document type matches the job; not silently mixed.
- [ ] Every command/endpoint/example verified against the real system.
- [ ] Aspirational content labeled; nothing unverified stated as fact.
- [ ] Structured for scan-and-find; examples before exhaustive reference.
- [ ] Volatile detail minimized/linked; drift risks and boundaries noted.

## Failure Conditions

- **Unverified instructions:** the quickstart that doesn't work, the flag
  that was renamed — trust dies at the first failure.
- **Reader-blind writing:** documenting what's easy to describe rather than
  what the reader needs to do.
- **Wall of prose:** no examples, no scannable structure, everything in
  paragraphs.
- **Rot-by-design:** hard-coding line numbers and volatile output that's
  wrong within a sprint.
- **Type-mixing:** a reference pretending to be a tutorial, serving neither.
- **Escalate / stop** when: the system can't be accessed to verify claims
  (say the doc is unverified, don't fabricate); the "documentation" request
  is really a request to explain a decision to nontechnical stakeholders
  (route to `stakeholder-communication`); or the thing being documented is
  changing under you (document the stable core, flag the moving parts).

## Related skills

- `system-architecture` — supplies architecture/ADR content and format.
- `codebase-comprehension` — the verified understanding this documents.
- `knowledge-transfer-verification` — checks the doc actually landed.
- `stakeholder-communication` — nontechnical-audience explanation instead.
