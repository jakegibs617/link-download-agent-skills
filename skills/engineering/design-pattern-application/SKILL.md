---
name: design-pattern-application
description: Selects, applies, or removes design patterns based on the forces actually present in the code — matching problem to pattern, adapting it to the language's idioms, and recognizing when a pattern is overkill or when an existing misapplied pattern should be dismantled. Use when structuring code around a recurring problem (variation, construction, notification, traversal), or when reviewing pattern-heavy code. Not for whole-component design (first-principles-design) or mechanical restructuring (refactoring executes what this skill decides).
---

# Design Pattern Application

## Purpose

Make pattern decisions that reduce total complexity: the right named pattern
when its forces are present, plain code when they aren't, and dismantlement
when a pattern was cargo-culted — each decision justified by forces observed
in the code, not by vocabulary.

## Inputs

- The problem context: the code (or design) with the recurring structure,
  variation, or coupling problem.
- The language/framework, because patterns are language-relative (Strategy
  is a first-class function in most modern languages; Observer is often the
  platform's event system; Singleton is usually the DI container's job).
- The expected axis of change — patterns buy flexibility on one axis and pay
  complexity on all others; the axis MUST be sourced (roadmap, history of
  changes), not hypothesized.

## Procedure

1. **Name the forces, not the pattern.** From the code, identify what
   actually varies, what must stay stable, and who needs to be decoupled
   from whom. Cite the evidence (e.g. "3 switch statements on `type` across
   these files" — the classic polymorphism force). MUST NOT start from a
   pattern and hunt for a justification.
2. **Check the change history.** A pattern pays off only on an axis that
   changes. `git log` the area: has this axis actually changed repeatedly?
   One hypothetical future variant is not a force; two shipped variants are.
3. **Consider plain code first.** The null candidate — a function, a small
   conditional, a data table — MUST be evaluated before any pattern. State
   what the plain version costs on the observed axis of change.
4. **Select and adapt.** If a pattern wins: use the language-idiomatic form,
   not the textbook diagram (no interface + factory + impl triple where a
   closure serves). Follow the codebase's existing pattern conventions if
   the pattern already appears elsewhere in the repo.
5. **Bound the pattern.** Define exactly which classes/modules participate
   and keep the pattern's machinery invisible to non-participants. A pattern
   that leaks its scaffolding into callers has failed.
6. **For existing pattern review:** identify each pattern present, test it
   against its forces (step 1–2). Verdicts: justified / overkill (dismantle
   to plain code) / misapplied (wrong pattern for the force) / incomplete
   (pattern half-applied, worst of both). Dismantling is executed via
   `refactoring` with behavior preserved.
7. **Record the decision** with its force evidence and the revisit trigger
   ("if a third payment provider ships, introduce Strategy here").

## Output Format

```markdown
## Pattern decision: <problem area>
## Forces observed (with code citations and change-history evidence)
## Candidates
| Option (incl. plain code) | Complexity cost | Fit to observed forces |
## Decision and idiomatic form
<the chosen structure, adapted to this language/codebase, participants bounded>
## Rejected because
## Revisit trigger
## (Review mode) Pattern audit
| Pattern found | Location | Verdict | Evidence | Action |
```

## Quality Checklist

- [ ] Forces identified from code evidence before any pattern was named.
- [ ] Change history consulted; speculative axes labeled speculative.
- [ ] Plain-code candidate genuinely evaluated, not strawmanned.
- [ ] Chosen form is idiomatic to the language, consistent with repo precedent.
- [ ] Participants bounded; no scaffolding leak.
- [ ] Decision recorded with revisit trigger.

## Failure Conditions

- **Pattern-first thinking:** choosing the pattern, then finding the problem.
- **Speculative generality:** Strategy for one strategy, Factory for one
  product — complexity purchased for a change that never comes.
- **Textbook transplant:** Java-shaped pattern machinery in a language with
  first-class functions.
- **Vocabulary inflation:** renaming existing code to pattern names without
  structural benefit.
- **Half-applied pattern:** e.g. Observer where some updates still go direct
  — both indirection and coupling.
- **Escalate / stop** when: the observed forces genuinely conflict (two axes
  of variation demanding incompatible structures — surface the tradeoff to
  `first-principles-design`); or the "pattern problem" is actually a domain-
  model problem (wrong entities, not wrong wiring).

## Related skills

- `first-principles-design` — owns the component-level decision this skill
  serves; invoke it when the question outgrows one structure.
- `refactoring` — executes pattern introduction/dismantlement behavior-preserved.
- `code-change-review` — where pattern misuse in a diff gets caught.
