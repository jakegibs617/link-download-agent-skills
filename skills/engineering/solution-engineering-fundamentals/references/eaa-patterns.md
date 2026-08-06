# Enterprise Application Patterns

Source: Martin Fowler, *Patterns of Enterprise Application Architecture* and the
companion catalog at [martinfowler.com/eaaCatalog](https://martinfowler.com/eaaCatalog)
(plus the index at
[martinfowler.com/articles/enterprisePatterns.html](https://martinfowler.com/articles/enterprisePatterns.html)).
Entries that come from Fowler's later writing rather than the book catalog say so
in place, so a citation can always be traced to what actually says it.

**How to use this file.** It is indexed by the *pressure* each pattern relieves,
not by book chapter. A pattern is justified only when its pressure is present and
observable in the solution under review. Every entry lists what it costs, because
the cost is what makes "simplest sufficient pattern" a real decision rather than a
slogan. Recommending a pattern whose pressure you cannot point to in this
solution is a finding against you, not against the code.

---

## Organizing domain logic

The pressure: business rules have to live somewhere, and the wrong home either
buries them in procedure or wraps trivial logic in ceremony.

**Transaction Script** — one procedure per request or use case, start to finish.
- *Pressure:* logic is simple, largely per-operation, and doesn't share rules.
- *Cost:* duplication grows as rules recur across operations; degrades badly once
  logic gets genuinely complex.
- *Good fit:* CRUD endpoints, individual pipeline stages, ingestion steps.

**Domain Model** — an object graph carrying both data and behavior.
- *Pressure:* rich, interacting rules — validation, state machines, computed
  behavior, invariants spanning several entities.
- *Cost:* mapping to the database becomes a real problem (see Data Mapper); the
  team must maintain the model's conceptual integrity.
- *Overkill signal:* the "model" is anemic — data with getters and no behavior.
  That is Transaction Script wearing a costume.

**Table Module** — one instance handling the business logic for all rows of a
table, typically over a record-set.
- *Pressure:* tabular data with logic that is uniform across rows.
- *Cost:* awkward when behavior varies per instance.

**Service Layer** — a boundary of coarse-grained operations that orchestrate the
domain and coordinate responses.
- *Pressure:* several entry points (API, background worker, CLI, scheduled job)
  need the same orchestration and would otherwise duplicate it.
- *Cost:* an extra layer that becomes a pass-through if there is only one caller.
- *Overkill signal:* every method forwards a single call to a single repository.

**CQRS** — separate models for reading and for writing, rather than one model
serving both. Not from *PoEAA*; Fowler documents it at
[martinfowler.com/bliki/CQRS.html](https://martinfowler.com/bliki/CQRS.html), and
notes there that it should be applied to a bounded portion of a system rather than
system-wide.
- *Pressure:* the read and write paths genuinely diverge — different shapes,
  different load profiles, or different scaling needs. A reporting surface with
  hundreds of times the traffic of the write path, or a write model whose
  invariants make every read a multi-join reconstruction.
- *Cost:* two models to keep coherent, plus the synchronization between them, plus
  eventual consistency that every caller and every UI must now handle. Where the
  models are kept in sync asynchronously, "read your own write" stops being free.
- *Overkill signal:* separate read and write models over the same tables with
  substantially the same shape, in an application with no read/write asymmetry in
  either load or model. Different DTOs for a request and a response is not CQRS
  and does not need the machinery.
- *Note:* the pressure is usually local to one context. System-wide CQRS proposed
  ahead of any observed asymmetry is the clearest instance of this file's opening
  rule — the pattern arrived before the pressure.

---

## Getting data in and out

The pressure: the domain must reach the database without the database's shape
dictating the domain's shape — or, when the domain is simple, without ceremony
that buys nothing.

**Table Data Gateway** — one object gateway per table, holding the SQL.
- *Pressure:* you want SQL in one place per table without a full domain model.
- *Cost:* little; it is the low-ceremony option.

**Row Data Gateway** — one object per row, persistence only, no domain logic.
- *Pressure:* same as above, but callers work with single records.

**Active Record** — an object wrapping a row that carries both domain logic and
its own persistence methods.
- *Pressure:* domain structure closely matches table structure; speed of
  development matters.
- *Cost:* couples domain logic to the schema; testing requires a database or heavy
  fakes; refactoring the schema ripples into business rules.
- *Overkill signal in reverse:* using Data Mapper machinery when Active Record
  would do is the more common waste.

**Data Mapper** — a layer that moves data between objects and the database while
keeping each ignorant of the other.
- *Pressure:* the domain model's structure genuinely diverges from the schema, or
  the domain must stay persistence-free for testing or portability.
- *Cost:* the mapping layer itself, plus the identity and lazy-loading problems it
  brings with it (below).

**Repository** — a collection-like interface over the domain objects, hiding the
query mechanism behind it.
- *Pressure:* callers should express *what* they need, not how it is fetched;
  data access needs to be substitutable in tests.
- *Cost:* the abstraction leaks under querying pressure and tends to grow a method
  per query. A repository whose interface is `GetAll`/`Add`/`Remove` over an ORM
  that already provides exactly that is pure indirection.
- *Overkill signal:* the persistence framework already provides a
  collection-like abstraction and there is no second implementation, real or
  planned.

**Unit of Work** — tracks the objects touched by a business transaction and
coordinates writing changes and resolving concurrency as one atomic operation.
- *Pressure:* a single logical transaction spans multiple objects or repositories
  and must commit or roll back together.
- *Cost:* modest, and usually already provided by the ORM's session/context.
- *Note:* pair Repository with Unit of Work rather than reinventing transaction
  management inside each repository — a repository that opens its own transaction
  makes atomic multi-entity writes impossible.

---

## Object-relational friction

Reach for these only when the specific mismatch actually shows up. Each solves a
narrow problem created by mapping objects to tables.

- **Identity Map** — ensures each record is loaded once per session, so two reads
  of the same row yield the same object. *Pressure:* duplicate in-memory copies
  diverging, or repeat reads of the same row.
- **Lazy Load** — defers loading associated data until it is used. *Pressure:*
  loading an aggregate pulls far more than callers need. *Cost:* the N+1 query
  problem and loads triggered outside the session's lifetime.
- **Inheritance mappers** — Single Table, Class Table, and Concrete Table
  Inheritance for mapping a class hierarchy onto tables. *Pressure:* a real
  polymorphic hierarchy in the domain; each option trades table sprawl against
  nullable columns.
- **Foreign Key Mapping / Association Table Mapping** — one-to-many and
  many-to-many relationships between objects and their table representation.
- **Optimistic Offline Lock** — detects conflicting changes at commit via a
  version check. *Pressure:* a business transaction spans multiple requests and
  conflicts are rare.
- **Pessimistic Offline Lock** — prevents conflicts by locking the record for the
  duration. *Pressure:* conflicts are common and losing work is expensive.
  *Cost:* lock lifetime management, and deadlock or abandonment handling.

---

## Crossing process boundaries

The pressure: a network hop is expensive and unreliable, and the shape of the
domain is a bad shape for a wire contract.

**Remote Facade** — a coarse-grained façade over fine-grained objects, so one call
does what would otherwise take many.
- *Pressure:* a chatty interaction across an expensive boundary — a service
  calling another service, or a client calling an API.
- *Cost:* an extra layer to keep in sync with the domain behind it.

**Data Transfer Object (DTO)** — an object carrying data across a process
boundary, decoupled from the domain object.
- *Pressure:* remote calls are expensive; wire contracts must evolve independently
  of internal models.
- *Overkill signal:* DTOs that are field-for-field copies of domain objects inside
  a single process, mapped mechanically. Inside one process, this is overhead.
  Across a published contract, it is what stops a schema change from becoming a
  breaking API change.

**Gateway** — an object encapsulating access to an external system so the rest of
the app never sees that system's API.
- *Pressure:* a third-party API, an external CMS, a payment provider, an LLM
  provider, or any dependency whose interface you don't control and may replace.
- *Cost:* nearly none, and it buys testability plus a single place to handle that
  system's retries, auth, and quirks. This is the highest-value pattern in the
  catalog for most services.

**Mapper** — sets up communication between two independent objects, with neither
aware of the other.
- *Pressure:* two subsystems must interoperate without a dependency in either
  direction.

---

## Base patterns

Small, structural, cheap. Cite them when they name what the code is already doing,
or when a small piece of structure resolves a real coupling.

- **Layer Supertype** — a common supertype for all types in a layer, holding what
  they all need.
- **Separated Interface** — the interface defined in one package, implemented in
  another, so the caller depends on neither the implementation nor its package.
  *Pressure:* dependency direction needs inverting across a module boundary.
- **Registry** — a well-known object others use to find common objects or
  services. *Cost:* global state; prefer explicit injection where feasible.
- **Value Object** — a small object whose equality is by value, not identity.
  *Pressure:* primitive obsession — money, ranges, identifiers, quantities passed
  as bare strings or numbers.
- **Money** — the specific Value Object for currency amounts, with rounding and
  currency handled explicitly. *Pressure:* any monetary arithmetic in floats.
- **Special Case** — a subclass supplying behavior for a particular case, so
  callers stop branching (Null Object being the common instance).

---

## Review heuristics

- Name the pressure before the pattern. If you cannot point at the pressure in
  this solution, do not recommend the pattern.
- Count the layers a single read passes through. Controller → service →
  repository → mapper → ORM → database, in an application with no domain logic, is
  five layers of ceremony around a `SELECT`.
- The common failure in reviewed code is *too many* patterns, not too few. A
  well-known pattern applied without its pressure is indistinguishable from
  cargo cult, and costs the same as one that was needed.
- Patterns already correctly applied deserve naming too — telling a team that what
  they built is a textbook Gateway is a finding, because it gives the structure a
  name the next reader can look up.
