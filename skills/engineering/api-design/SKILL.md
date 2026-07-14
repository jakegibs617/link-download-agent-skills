---
name: api-design
description: Designs the external contract of an API — resources, operations, naming, errors, versioning, pagination, and compatibility rules — for REST, RPC, GraphQL, or library surfaces, optimizing for consumers who will live with the contract for years. Use when creating or extending an API surface, reviewing a proposed contract, or planning a breaking change. Not for the implementation behind the contract (code-implementation) or internal component interfaces (first-principles-design).
---

# API Design

## Purpose

Produce an API contract that consumers can use correctly without reading the
implementation: predictable, consistent with its platform's conventions,
evolvable without breakage, and explicit about errors and edge behavior.

## Inputs

- The consumer picture: who calls this, from what languages/contexts, and
  which operations dominate. If consumers are unknown, say so — an API with
  no known consumer is speculation.
- Existing API surface and its conventions (an extension MUST match the
  house style even where the style is imperfect; consistency beats local
  perfection).
- Constraints: auth model, rate limits, payload-size realities, compliance
  (PII in URLs, audit requirements).
- Compatibility policy: what the platform considers a breaking change.

## Procedure

1. **Design from call sites.** Write the 3–5 dominant consumer interactions
   as literal example calls + responses *first*, before any schema. If the
   examples feel awkward, the design is wrong — fix it now, not after GA.
2. **Model resources and operations.** Name the nouns (resources/entities)
   and verbs; check names against the existing surface for consistency
   (same concept = same name everywhere; different concepts ≠ shared name).
   Identify identifier strategy (opaque vs natural, who mints them).
3. **Specify behavior at the edges, per operation:** not-found vs
   no-permission (leaking existence is a security decision — make it
   consciously), empty collections, idempotency (retries on writes MUST be
   addressed: idempotency keys, PUT semantics, or documented at-least-once),
   partial failure on batch operations, and concurrent modification
   (ETags/versions or documented last-write-wins).
4. **Design the error contract.** A machine-readable error shape (stable
   code, human message, correlation id), the full status/code table per
   operation, and the retry guidance per error class. "500 with a string"
   is not an error contract.
5. **Handle collections deliberately.** Pagination (cursor vs offset —
   choose for the data's mutation rate), ordering guarantees, filtering
   grammar bounded to what's indexed, and maximum page sizes.
6. **Define the evolution rules.** What you may add without breaking
   (fields? enum values? — decide and document, because consumers will
   assume), the versioning mechanism, and the deprecation path (signal,
   window, migration doc). Every field marked required is a forever
   promise; default to optional-with-semantics where honest.
7. **Adversarial pass.** Walk the contract as: a retrying client with a
   flaky network, a pathological caller (maximum page size, deepest filter,
   unicode keys), and a malicious caller (IDOR probing, enumeration via
   error-shape differences). Findings go to the contract, and to
   `security-engineering` when they exceed contract design.
8. **Write it down as spec + examples.** The contract artifact (OpenAPI/
   schema/signatures) plus the example calls from step 1, kept in sync.

## Output Format

```markdown
# API design: <surface>
## Consumers and dominant call patterns (the step-1 examples)
## Resource and operation table
| Operation | Shape | Idempotency | Auth | Notes |
## Error contract
<error shape + per-operation status/code table + retry guidance>
## Collection semantics (pagination, ordering, filtering, limits)
## Evolution and compatibility rules
<what may be added, versioning, deprecation path>
## Edge-behavior decisions
<404-vs-403, batch partial failure, concurrency — each decided and justified>
## Adversarial findings
## Open questions / decisions needed
```

## Quality Checklist

- [ ] Example calls written before schema; awkwardness fixed at design time.
- [ ] Names consistent with the existing surface (checked, not assumed).
- [ ] Every write operation has explicit retry/idempotency semantics.
- [ ] Error contract machine-readable with retry guidance.
- [ ] 404-vs-403 existence-leak decision made consciously.
- [ ] Compatibility rules state what "non-breaking" means for this API.

## Failure Conditions

- **Implementation leakage:** contract mirrors internal tables/models,
  exporting your schema as your API.
- **Happy-path spec:** operations defined only for success.
- **Breaking-change blindness:** renames/type changes/semantics shifts
  shipped as "minor"; when reviewing a change, MUST diff against the live
  contract and classify every difference as breaking/non-breaking.
- **Convention fork:** new endpoints that pluralize/case/paginate
  differently from the existing surface.
- **Escalate / stop** when: the requested change is breaking and consumers
  can't be enumerated; auth/tenancy semantics are undefined (that's a
  security decision, not a naming one); or two consumer groups need
  contradictory semantics from one operation (split the operation or
  escalate the product question).

## Related skills

- `first-principles-design` — decides the component this API fronts.
- `security-engineering` — authz model, abuse cases beyond contract shape.
- `database-design-optimization` — when filtering/pagination promises
  depend on what can be indexed.
- `technical-documentation` — consumer-facing docs from the contract.
