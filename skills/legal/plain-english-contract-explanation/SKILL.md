---
name: plain-english-contract-explanation
description: Translates a contract (or a clause) into plain language a non-lawyer can act on — what they're agreeing to, what they must do, what they're giving up, and the realistic "what happens if" scenarios — without distorting the legal substance or crossing into legal advice. Use to brief a client/business owner/employee on what a contract actually means. Not for the technical legal analysis itself (the review skills) or negotiation planning (contract-negotiation-strategy).
---

# Plain-English Contract Explanation

## Legal disclaimer

This skill produces a plain-language explanation to help a non-lawyer
understand a contract. It is **not legal advice** and does not replace a
licensed attorney. The explanation summarizes; it does not resolve legal
questions or recommend whether to sign — those require counsel. This
disclaimer is part of every explanation.

## Purpose

Make a contract genuinely understandable to the person bound by it: what they
are agreeing to, what they must do and by when, what they are giving up or
risking, and what happens in the situations they'll actually face — in language
they can act on, while preserving the legal substance and staying clear of
advising them what to do.

## Layered output principle

Keep visibly separate: (1) **what the contract says** (translated, accurate),
(2) **what it means practically** ("so in practice, you..."), (3) **what to
watch out for** (risks, flagged not decided), (4) **questions for a lawyer**.
The reader must never mistake a plain-English summary for a green light.

## Inputs

- The contract or clause, and who the reader is (business owner, employee,
  consumer, founder) and their sophistication — the explanation's depth and
  framing follow the audience.
- What they most need to understand or the decision they face (what do I have
  to do? what am I giving up? can I get out?) — focuses the explanation.

## Procedure

1. **Lead with the bottom line.** Open with what this contract is and the 3–5
   things that matter most for this reader, in one short paragraph — not a
   clause-by-clause march. The reader who stops after the summary should have
   the essential picture.
2. **Translate, don't just simplify — and never distort.** Replace legal
   terms with their meaning ("indemnify" → "you'd have to cover their losses
   and legal costs if..."), but preserve the actual substance including the
   qualifiers that matter (a "best efforts" obligation is not a guarantee;
   say so). MUST NOT sand off legally significant nuance to make it read
   cleaner — simplify the language, keep the truth. Where a term genuinely
   can't be simplified without loss, explain it rather than dropping it.
3. **Make obligations concrete and time-bound.** "You must do X, by when, or
   else Y" in the reader's terms. Turn abstract duties into what the reader
   will actually have to do. Same for their rights ("you can cancel, but only
   if... and you have to...").
4. **Walk the "what happens if" scenarios that matter to this reader.** The
   real questions: what if I want to leave early? what if they don't pay? what
   if the project runs late? what if I get sued by a third party? Walk each
   through the contract's actual terms, concretely. Scenarios teach more than
   clause summaries.
5. **Surface the risks honestly, as flags not verdicts.** Point out the terms
   that could bite (the auto-renewal, the uncapped exposure, the broad
   non-compete) in plain terms and why they matter — but frame them as "things
   to be aware of / ask a lawyer about", not "this is bad, don't sign". MUST
   NOT tip from explaining into advising the decision.
6. **Separate what you're confident about from what needs a lawyer.** Where
   meaning is genuinely ambiguous, or the reader's real question is a legal
   judgment (is this enforceable? should I sign?), say clearly that it needs
   counsel rather than guessing. MUST route decisions and legal conclusions to
   a lawyer.
7. **Match tone to the reader.** Respectful, not condescending; plain, not
   dumbed-down. Use analogies where they clarify and don't mislead. Keep it as
   short as the reader's need allows.

## Output Format

```markdown
# What this contract means: <contract> (for: <reader>)
> Plain-language summary — not legal advice; consult a lawyer before deciding.
## Bottom line (what this is + the few things that matter most)
## What you're agreeing to do (concrete obligations, timing)
## What you're getting / your rights
## What you're giving up or risking (flagged, not judged)
## "What happens if..." (the reader's realistic scenarios, walked through the terms)
## Things to ask a lawyer about (ambiguities, enforceability, the sign/don't-sign call)
```

## Quality Checklist

- [ ] Opens with a bottom-line summary, not a clause march.
- [ ] Legal terms translated to meaning; significant qualifiers preserved.
- [ ] No legally significant nuance distorted for readability.
- [ ] Obligations/rights made concrete and time-bound.
- [ ] Reader's realistic "what if" scenarios walked through actual terms.
- [ ] Risks flagged as awareness items, not sign/don't-sign verdicts.
- [ ] Ambiguities and decisions routed to a lawyer.

## Failure Conditions

- **Simplification into inaccuracy:** making it readable by quietly dropping a
  qualifier or overstating a protection — the cardinal failure; readable but
  wrong is worse than accurate but dense.
- **Clause-by-clause drone:** restating the contract in slightly simpler words
  with no bottom line and no scenarios.
- **Advising the decision:** "this is a bad deal, don't sign" / "you're fully
  protected, go ahead" — crosses from explaining into legal advice.
- **False confidence on ambiguity:** giving a clean answer where the contract
  is genuinely unclear instead of flagging it.
- **Jargon passthrough:** leaving "indemnify", "liquidated damages",
  "subrogation" untranslated.
- **Condescension** or over-dumbing that loses substance.
- **Escalate to counsel** when: the reader's real question is enforceability
  or whether to sign; meaning is genuinely ambiguous; or the stakes are high
  and the reader is treating the explanation as the decision.

## Related skills

- The review/analysis skills — supply the accurate substance this translates;
  this skill does not perform the legal analysis itself.
- `contract-negotiation-strategy` — if the reader then wants to change terms.
- `signature-readiness-assessment` — the go/no-go consolidation (still counsel-
  gated).
- `stakeholder-communication` (engineering) — the analogous skill for technical
  audiences.
