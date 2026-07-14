---
name: defined-term-consistency
description: Audits a contract's defined terms — that each is defined once, used consistently, actually used, not used before definition, and free of circular or conflicting definitions — because defined-term defects silently change meaning. Use after structural review and before or alongside substantive review. Not for whether a definition's substance is favorable (the substantive skills) or general contradiction hunting beyond terms (drafting-defects-detection).
---

# Defined-Term Consistency Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Where a
defined-term defect could change legal meaning or obligations, it is flagged
for counsel.

## Purpose

Ensure the contract's vocabulary is airtight: every capitalized defined term
means exactly one thing, everywhere, and the machinery of definitions
(cross-references, scope, capitalization) doesn't silently create ambiguity —
because in a contract, a term that shifts meaning shifts obligations.

## Layered output principle

Separate: (1) **what the text does** (the term usage observed, cited),
(2) **practical consequence** (how the defect could change meaning),
(3) **risk**, (4) **missing info**, (5) **counsel needed**. A defined-term
finding is a fact about the document first; its legal effect is a separate,
often counsel-level, judgment.

## Inputs

- The full contract (definitions are cross-cutting; a partial document
  produces false findings — flag if incomplete).
- The definitions section(s) and any inline "(the "Term")" definitions
  scattered through the body.

## Procedure

1. **Build the defined-term inventory.** Extract every defined term: the
   definitions section plus inline definitions ("... (the "Services")",
   "hereinafter "Disclosing Party""). Record where each is defined. MUST
   capture inline definitions, not just the definitions article.
2. **Check each term is defined exactly once.** Flag terms defined twice
   (especially with differing wording — a latent conflict) and terms used as
   if defined (capitalized, quoted-style) but never actually defined
   ("undefined defined terms").
3. **Check usage consistency.** For each defined term, scan usage: is the
   capitalized term used to mean the defined thing throughout, and is the
   same concept sometimes written lowercase/undefined (splitting one meaning
   across a defined and undefined form)? Both directions are defects —
   "Confidential Information" vs "confidential information" used
   interchangeably can gut a confidentiality clause. Cite instances.
4. **Check definitions aren't used before defined** where the drafting order
   matters, and that forward references ("as defined below") resolve.
5. **Check for circular and nested-definition problems.** Term A defined
   using Term B defined using Term A; definitions that reference
   undefined-or-later terms; definitions whose scope is internally
   inconsistent (defined broadly, used as if narrow).
6. **Check defined-but-unused terms.** Terms defined but never used often
   signal a deleted clause left an orphan — or that a substantive protection
   was removed. Flag them; the *why* may be a substantive gap for another skill.
7. **Assess meaning impact, don't overstate it.** For each defect, state
   whether it plausibly changes an obligation/right (material) or is
   cosmetic. MUST NOT treat every capitalization slip as a substantive
   landmine, nor dismiss one that guts a protection. Where meaning turns on
   it, flag for counsel.

## Output Format

```markdown
# Defined-term consistency review: <contract>
## Document complete? (partial → findings provisional)
## Defined-term inventory (term → where defined; inline flagged)
## Defects
| # | Type (dup/undefined/inconsistent-usage/circular/used-before-def/unused) | Term | Instances (cited) | Meaning impact (material/cosmetic) |
## Material defects (could change an obligation or right)
## Orphaned/unused terms (possible removed-clause signal → route)
## Counsel-required items (where legal meaning turns on the defect)
## Information needed
```

## Quality Checklist

- [ ] Inline definitions captured, not just the definitions article.
- [ ] Each term checked for single definition; duplicates/undefined flagged.
- [ ] Usage scanned both ways (defined-used-lowercase and undefined-used-capitalized).
- [ ] Circular/used-before-defined/forward references checked.
- [ ] Unused terms flagged as possible removed-clause signals.
- [ ] Meaning impact rated material vs cosmetic; not all-or-nothing.

## Failure Conditions

- **Definitions-section myopia:** only auditing the definitions article,
  missing inline definitions and body usage.
- **Cosmetic inflation:** flagging every capitalization slip as a critical
  legal defect, drowning the one that matters.
- **Material miss:** overlooking a term used in two senses that changes an
  obligation (the dangerous failure).
- **Substance drift:** critiquing whether a definition's content is favorable —
  route that to the owning substantive skill.
- **Partial-document false positives:** reporting "undefined" terms whose
  definitions are simply not in the excerpt.
- **Escalate to counsel** when: the defect plausibly alters legal meaning
  (scope of a license, confidentiality, indemnity trigger) — flag the legal
  significance for an attorney rather than resolving it.

## Related skills

- `contract-structure-completeness` — precedes this; confirms definitions
  exist before consistency is checked.
- `drafting-defects-detection` — broader contradiction/cross-reference sweep
  beyond defined terms.
- The substantive skills — own the *content* of the definitions this audits.
