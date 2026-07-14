---
name: contract-structure-completeness
description: Reviews a contract for structural completeness — that the sections, exhibits, schedules, defined terms, and cross-references a contract of its type needs are present and wired together, and that nothing referenced is missing. Use as the first pass on any contract before substantive review, or when asked whether a contract is structurally whole. Not for whether individual clauses are favorable (the substantive review skills) or whether defined terms are used consistently (defined-term-consistency).
---

# Contract Structure and Completeness Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Enforceability
and jurisdiction-specific requirements require qualified counsel; this skill
flags where such review is needed.

## Purpose

Establish whether the contract is structurally whole before substance is
reviewed: the expected components for its type are present, every referenced
exhibit/schedule/defined term actually exists, and the document hangs
together — so substantive review isn't built on a document with holes.

## Layered output principle

Every finding MUST separate: (1) **What the document shows** (fact —
present/absent/referenced-but-missing), (2) **Practical consequence** (what
the gap means operationally), (3) **Risk** (legal/commercial exposure),
(4) **Missing information** needed to judge, and (5) whether **licensed
counsel** is required. Never blur what the contract says with what it should
say.

## Inputs

- The contract, ideally complete with all exhibits/schedules/attachments —
  MUST note if provided incomplete, since absence-in-the-file ≠ absence-in-
  the-deal.
- The contract type (NDA, MSA, SOW, employment, lease, SaaS, etc.) — this
  determines the expected component set.
- The deal context if available (what the parties intend), to judge whether a
  missing component is actually needed here.

## Procedure

1. **Identify the contract type and its expected skeleton.** For the type,
   list the components a complete instance normally has: parties/recitals,
   definitions, core obligations, term/termination, payment (if applicable),
   IP, confidentiality, warranties, liability, indemnity, dispute resolution,
   governing law, boilerplate, signature blocks, and the type-specific
   exhibits (SOW, fee schedule, DPA, etc.). MUST base this on the type, not
   a generic list.
2. **Inventory what's actually present.** Map the document's sections against
   the expected skeleton. Mark each expected component present / absent /
   partial. Cite section numbers — findings are grounded in the document.
3. **Resolve every internal reference.** For each "as defined in", "set forth
   in Exhibit __", "pursuant to Section __", "Schedule __ attached hereto":
   confirm the target exists and is populated. Referenced-but-missing
   exhibits and dangling cross-references are high-signal defects — an
   MSA referencing an SOW that isn't attached may be unenforceable-as-applied.
   MUST list every unresolved reference.
4. **Check the mechanical completeness:** blanks and placeholders ("[___]",
   "TBD", "[Company Name]"), unsigned/undated signature blocks, missing party
   details, unattached required exhibits, and defined terms that are declared
   but the definition is blank.
5. **Judge each gap's materiality against the deal type.** A missing DPA in a
   contract processing personal data is material; a missing exhibit for an
   unused option may not be. Distinguish "absent and needed" from "absent and
   not applicable here" — MUST NOT flag every omission as a problem.
6. **Route substance onward, don't do it here.** Where a component exists but
   its adequacy is a substantive question, note it and name the skill that
   owns it (e.g. "liability cap present → liability-indemnification-review").
   This skill answers "is it there and wired up", not "is it good".

## Output Format

```markdown
# Structure & completeness review: <contract> (type: <type>)
## Document provided: complete / incomplete (what's missing from the file)
## Component inventory
| Expected component (for type) | Present? | Section | Materiality if absent |
## Unresolved references (referenced but missing/blank)
| Reference (at §) | Target | Status |
## Mechanical defects (blanks, placeholders, unsigned, unattached)
## Material structural gaps (absent AND needed for this deal)
## Present-but-needs-substantive-review (→ named skill)
## Counsel-required items
## Information needed to complete this review
```

## Quality Checklist

- [ ] Expected skeleton derived from the actual contract type.
- [ ] Every component marked present/absent/partial with a section citation.
- [ ] Every internal reference resolved or listed as unresolved.
- [ ] Blanks/placeholders/unsigned blocks caught.
- [ ] Gaps judged material vs. non-applicable for this deal, not flagged blanket.
- [ ] Facts (what's present) kept separate from substantive adequacy.

## Failure Conditions

- **Substance creep:** critiquing whether clauses are favorable — that's the
  substantive skills' job; this skill checks presence and wiring.
- **Generic checklist:** applying an MSA skeleton to an NDA and flagging
  "missing" components the type never has.
- **Reference blindness:** missing a referenced-but-unattached exhibit — a
  top structural defect.
- **Incompleteness confusion:** treating exhibits missing from the *file* as
  missing from the *deal* without flagging the ambiguity.
- **Over-flagging:** marking every absent optional component as a gap
  regardless of the deal.
- **Fabricated sections:** asserting the contract "should have" a clause
  without grounding it in the type's norms.
- **Escalate to counsel** when: a missing/incomplete component bears on
  enforceability or triggers a legal requirement (e.g. required consumer
  disclosures, a mandated DPA) — flag; do not opine on enforceability.

## Related skills

- `defined-term-consistency` — next structural pass (are defined terms used
  consistently once present).
- `drafting-defects-detection` — deeper contradiction/cross-reference sweep.
- All substantive review skills — consume this inventory to know what exists.
- `signature-readiness-assessment` — final gate that this feeds.
