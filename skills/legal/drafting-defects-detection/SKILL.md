---
name: drafting-defects-detection
description: Systematically hunts internal contradictions and drafting defects — clauses that conflict, broken cross-references, ambiguous pronouns/scope, inconsistent numbers/dates, undefined-but-capitalized terms, and precedence conflicts — that create interpretation disputes regardless of the deal terms. Use as a technical consistency sweep of a contract. Not for whether terms are favorable (substantive skills) or defined-term-usage consistency specifically (defined-term-consistency, which this complements).
---

# Internal Contradictions and Drafting-Defects Detection

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. How a court
would resolve an ambiguity or contradiction is a jurisdiction-specific
interpretive question for counsel; this skill locates the defects and flags
them.

## Purpose

Find the drafting bugs — the places where the contract contradicts itself, points
to things that aren't there, or can be read two ways — because these create
disputes and unintended obligations independent of whether the business terms
are good, and they are cheap to fix before signing and expensive to litigate
after.

## Layered output principle

Separate: (1) **the defect** (the exact conflicting/ambiguous/broken text,
cited), (2) **practical consequence** (the interpretation dispute or wrong
result it enables), (3) **risk** (severity — does it change an obligation?),
(4) **the fix direction**, (5) **counsel needed** (where resolution is an
interpretive legal call). This skill reports facts about the text; it does not
decide which reading is "correct."

## Inputs

- The full contract including exhibits/schedules — MUST have the complete
  document; cross-reference and precedence checks are meaningless on excerpts
  (flag if partial).

## Procedure

1. **Sweep cross-references.** Every "Section X", "Exhibit Y", "as defined in
   Z", "subject to the terms of __": confirm the target exists, is correctly
   numbered, and actually says what the reference implies. Renumbering during
   drafting routinely breaks these — a reference to "Section 8.2 (Indemnity)"
   pointing at the payment section is a real bug. List every broken/misdirected
   reference.
2. **Detect contradictions between clauses.** Compare provisions that govern
   the same subject for conflict: two different notice periods, a warranty
   promising what a disclaimer takes back, a term saying "net 30" and a
   schedule saying "net 60", exclusivity in one clause and a non-exclusive
   grant in another, survival lists inconsistent with the clauses they name.
   MUST actively cross-compare same-subject clauses, not read linearly.
3. **Check numbers, dates, and amounts for internal consistency.** Percentages
   that don't total, a cap referenced as two different figures, dates in the
   wrong order (a term that ends before it begins), defined periods used
   inconsistently, currency mismatches. Recompute where the contract implies
   arithmetic.
4. **Find ambiguities that matter.** Ambiguous pronouns and antecedents ("it",
   "such party", "the Agreement" when two are in play), scope ambiguity from
   misplaced modifiers and unclear "and/or", lists where it's unclear if
   qualifiers apply to all items or the last, and undefined-but-capitalized
   terms (coordinate with `defined-term-consistency`). Flag only ambiguities
   that could change an obligation — MUST NOT list every theoretically
   ambiguous word.
5. **Check order-of-precedence coherence.** Where body, exhibits, and
   incorporated documents overlap, do they conflict, and does a precedence
   clause resolve it? Conflicts with no precedence rule are high-severity.
6. **Check logical and structural integrity.** Conditions referencing
   undefined triggers, obligations with no corresponding right,
   defined-then-never-used terms suggesting a deleted clause, "including"
   lists that contradict the general term, and template artifacts (wrong party
   names, leftover placeholders, clauses for a different deal type).
7. **Rank by consequence, not count.** A contradiction that flips a payment
   obligation outranks a broken reference to a recital. Cluster trivial
   typos separately. For each material defect, give the fix direction; where
   the "right" reading is a legal-interpretation question, flag for counsel
   rather than asserting the resolution.

## Output Format

```markdown
# Drafting-defects report: <contract>
## Document complete? (partial → cross-ref/precedence checks limited)
## Material defects (ranked by consequence)
| # | Type (contradiction/broken-ref/ambiguity/number/precedence/logic) | Location(s) [cited] | Consequence | Fix direction | Counsel? |
## Broken/misdirected cross-references (full list)
## Numeric/date inconsistencies
## Consequential ambiguities (only those that could change an obligation)
## Precedence conflicts
## Minor/cosmetic (clustered)
## Counsel-required interpretive calls
```

## Quality Checklist

- [ ] Every cross-reference resolved; broken ones listed.
- [ ] Same-subject clauses actively cross-compared for contradiction.
- [ ] Numbers/dates/amounts checked for internal consistency (recomputed).
- [ ] Only obligation-changing ambiguities flagged, not every vague word.
- [ ] Precedence conflicts identified.
- [ ] Defects ranked by consequence; fixes given.
- [ ] Interpretive resolutions flagged for counsel, not asserted.

## Failure Conditions

- **Linear reading:** reviewing top to bottom and missing that clause 3 and
  clause 19 contradict — contradictions require cross-comparison.
- **Broken-reference blindness:** not verifying that section/exhibit
  references point where they claim.
- **Ambiguity flooding:** listing every imaginable ambiguity, burying the
  handful that change obligations.
- **Silent arithmetic:** not recomputing percentages/caps/dates that don't
  add up.
- **Resolution overreach:** declaring which reading of an ambiguity is
  legally correct — that's interpretation for counsel.
- **Excerpt overconfidence:** running precedence/cross-ref checks on a partial
  document as if complete.
- **Escalate to counsel** when: a contradiction's resolution is a legal-
  interpretation question with real stakes; a precedence conflict has no
  resolving rule and the clauses point opposite ways; or a defect may render a
  provision unenforceable/void.

## Related skills

- `defined-term-consistency` — the defined-term slice of consistency (this
  complements it).
- `contract-structure-completeness` — missing components (this finds broken
  wiring among present ones).
- `boilerplate-provisions-review` — precedence clauses in depth.
- `redline-recommendations` — turning the fixes into edits.
