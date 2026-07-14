---
name: rights-obligations-extraction
description: Extracts and organizes who must do what, who may do what, and by when — building a structured obligations matrix (obligor, obligee, trigger, deadline, condition, consequence) from the contract's operative language. Use to understand or track a contract's commitments, build a compliance/obligations register, or before negotiation. Not for judging whether obligations are fair (substantive review skills) or specifically payment terms (payment-compensation-analysis) or termination mechanics (term-termination-analysis).
---

# Rights and Obligations Extraction

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Interpretation
of ambiguous obligations and their enforceability requires counsel; this skill
flags such points.

## Purpose

Convert the contract's prose into a precise, structured map of every
commitment — who is bound, to whom, to do what, triggered by what, by when,
conditioned on what, with what consequence for breach — so nothing owed or
owned is buried in the text.

## Layered output principle

Separate: (1) **what the contract says** (the extracted obligation, quoted/
cited — fact), (2) **practical consequence** (what complying/not-complying
means operationally), (3) **risk** (where the obligation is onerous,
ambiguous, or one-sided), (4) **missing info** (undefined triggers/standards),
(5) **counsel needed**. Extraction is fact; risk assessment is a separate,
labeled layer.

## Inputs

- The full contract (obligations are spread across operative clauses,
  exhibits, and incorporated documents — a partial doc yields a partial map;
  flag it).
- The party you represent, if given, to frame the matrix (our obligations vs.
  theirs) — but MUST extract both sides regardless.

## Procedure

1. **Distinguish obligation language precisely.** Map the modal verbs to
   their force: "shall/must/agrees to" = obligation; "may/is entitled to" =
   right/discretion; "will" = often obligation but check; "should/may endeavor"
   = weaker/aspirational. MUST NOT flatten "shall use commercially reasonable
   efforts" into "shall deliver" — the standard of the obligation is part of it.
2. **Extract each commitment into structured fields:** obligor (who must),
   obligee (owed to whom), the act (what, at its actual standard), trigger
   (what starts it), timing/deadline (by when), conditions/prerequisites,
   and consequence of breach (cure period? penalty? termination right?).
   Cite the section for each. Missing fields are recorded as gaps, not
   invented.
3. **Capture rights and discretions, not just duties.** What each party MAY
   do (terminate, audit, assign, suspend, use), and any conditions on those
   rights. Rights are as important as obligations for understanding leverage.
4. **Catch conditional and contingent obligations.** "If X, then Party must
   Y" — the trigger and its own definedness matter. Flag triggers that are
   undefined or subjective ("if Provider deems necessary").
5. **Identify standards and their measurability.** "Reasonable", "best
   efforts", "industry standard", "to the Company's satisfaction" — extract
   the standard and flag whether it's objectively measurable or a latent
   dispute. MUST surface subjective standards; they're where obligations
   quietly become unenforceable or one-sided.
6. **Note interdependencies.** Obligations conditioned on the other party's
   performance (your duty to pay triggered by their delivery + your
   acceptance). These chains determine what actually has to happen and in
   what order.
7. **Assess (as a separate layer) which obligations are onerous, vague, or
   asymmetric** — but keep this distinct from the extraction. Deep fairness
   judgment and negotiation hand to the substantive/negotiation skills.

## Output Format

```markdown
# Rights & obligations matrix: <contract>
## Document complete? (partial → matrix partial)
## Obligations
| # | Obligor | Obligee | Act (at its standard) | Trigger | Deadline | Conditions | Breach consequence | § |
## Rights / discretions
| # | Holder | Right | Conditions | § |
## Conditional/contingent obligations (trigger definedness flagged)
## Subjective/unmeasurable standards (flagged)
## Interdependency chains
## Risk layer (onerous/vague/asymmetric — separate from extraction)
## Counsel-required interpretations + information needed
```

## Quality Checklist

- [ ] Modal force preserved (shall vs may vs will vs efforts standards).
- [ ] Each obligation has obligor/obligee/act/trigger/timing/consequence or a recorded gap.
- [ ] Rights and discretions extracted, not just duties.
- [ ] Subjective/unmeasurable standards flagged.
- [ ] Interdependency chains identified.
- [ ] Extraction (fact) kept separate from risk assessment (judgment).
- [ ] Every entry cites a section; nothing invented.

## Failure Conditions

- **Modal flattening:** turning best-efforts/conditional obligations into
  hard duties (or vice versa) — the core extraction error.
- **Duty-only tunnel vision:** listing obligations, missing the rights that
  set leverage.
- **Trigger blindness:** stating an obligation without its trigger/condition,
  making it look absolute when it's contingent.
- **Standard erasure:** dropping "reasonable"/"material" qualifiers that
  change what's actually owed.
- **Extraction/opinion blur:** mixing "the contract says" with "this is
  unfair" so the reader can't tell fact from judgment.
- **Invention:** filling a missing deadline/consequence with a plausible
  guess instead of a gap.
- **Escalate to counsel** when: an obligation's meaning is genuinely
  ambiguous, or its enforceability/interpretation is the question — flag,
  don't resolve.

## Related skills

- `payment-compensation-analysis`, `term-termination-analysis`,
  `confidentiality-data-protection-review`, etc. — own the deep analysis of
  specific obligation categories this maps.
- `missing-protections-analysis` — uses this matrix to find what's absent.
- `contract-negotiation-strategy` — uses the risk layer to prioritize asks.
