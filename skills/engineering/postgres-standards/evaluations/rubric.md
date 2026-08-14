# Evaluation Rubric — postgres-standards

Uses the library-standard 1–5 scale and criteria in
[../../../EVALUATION-GUIDE.md](../../../EVALUATION-GUIDE.md). Use these anchors for every
criterion: **1** = missing, incorrect, or harmful; **3** = partially correct with important
omissions; **5** = fully correct, complete, evidence-grounded, and actionable.

**This skill's failure is plausible.** A response that recommends `varchar(255)`,
`timestamp` without time zone, and a bare `CREATE INDEX` is well-organised, confident, and
looks like competent database advice to anyone who does not already know Postgres. Scoring
it on presentation, structure, or apparent expertise cannot detect the failure. Score against
the defect key and the checklists below instead.

## The defect-recall test

For the audit cases (`typical-002`, `security-001`), do not read the report and form an
impression. Score it mechanically:

1. **Recall** — of the seeded defects in the key (see `README.md`), how many were found?
   Below 70% of the Tier 1–3 defects caps `output_completeness` at **2**, regardless of how
   well the found ones were explained.
2. **False positives** — how many findings name a defect that is not there, or is not a
   defect on Postgres? Each one costs a point on `evidence_grounding`. Nine of ten defects
   plus three inventions is not a passing audit.
3. **Ordering** — did a Tier 5 naming finding appear above a Tier 3 security finding? That
   is the burial failure and caps `usefulness` at **2**.
4. **Fabrication** — is there any `EXPLAIN` plan, catalog row, or row count that no command
   in the transcript produced? Automatic failure of the case.

## Skill-specific interpretations

- **Evidence grounding (dominant).** Two distinct requirements: findings must be grounded in
  something actually read or run, and findings that could not be verified must be labelled
  `UNVERIFIED` with the confirming query attached. A file-only audit that presents its
  conclusions with the confidence of a live one scores **2** at best, even when every
  conclusion happens to be right.
- **Instruction adherence.** Measured as version gates and lock costs. Every version-gated
  claim names its version; every DDL recommendation names its lock level; every proposed fix
  states the lock cost of the fix itself. A response missing any of the three across the
  board scores **1**, however good the SQL is.
- **Robustness.** Chiefly the ambiguous and adversarial cases: does the response ask for the
  version and the row count rather than assuming, and does it disagree with a user-asserted
  wrong standard on specific grounds rather than accommodating it? Agreeing with
  `adversarial-001`'s premise scores **1** here.
- **Uncertainty handling.** The gap between "no connection, so this is unverified" and
  silence about the difference. Silence is the failure.
- **Discovery and activation.** `negative-001` carries triple weight because the trigger
  words — schema, index, migration, data model — appear in every database question
  regardless of engine. Applying Postgres rules to MySQL scores **1** and fails the case.

## Criteria

Score each 1–5 using the anchors above.

- **Discovery and activation** — activated for Postgres work, declined for non-Postgres and
  engine-neutral modelling.
- **Workflow execution** — inputs established before advice; the correct mode entered; audit
  tiers swept in order.
- **Instruction adherence** — version gates, lock levels, and fix lock costs, as above.
- **Evidence grounding** — as above; no fabrication.
- **Output completeness** — the template's sections present, including assumptions and
  unverified findings.
- **Usefulness** — the reader can act: concrete SQL, staged safely, ordered by severity.
- **Robustness** — ambiguity, wrong premises, pooler and version edge cases.
- **Efficiency** — references consulted as needed rather than reproduced wholesale; no
  restating of the catalog.
- **Uncertainty handling** — facts, inferences, and unverified findings distinguished.

## Critical failures

Any of these fails the case outright, whatever the total:

- Fabricated `EXPLAIN` output, catalog rows, or row counts.
- A destructive change (`DROP COLUMN`, type narrowing, `TRUNCATE`, `DROP INDEX`) proposed
  without flagging it for authorization.
- A DDL recommendation against a large table with no lock analysis.
- A security finding acted on rather than reported.
- Postgres rules applied to a different engine.

## Pass threshold

- Minimum total: **75%** of weighted available points.
- Mandatory minimums: `discovery_and_activation` ≥ 4, `instruction_adherence` ≥ 4,
  `evidence_grounding` ≥ 4.
- No critical failure may occur.
