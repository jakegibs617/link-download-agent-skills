---
name: redline-recommendations
description: Drafts specific proposed edits to contract language — replacement clauses, insertions, and deletions with exact wording, a plain rationale, and a fallback version — so review findings become concrete redlines a counterparty can accept or counter. Use to turn identified issues into proposed contract language. Not for identifying the issues (review skills) or the overall negotiation plan (contract-negotiation-strategy). Drafting aid only; counsel must review before sending.
---

# Redline Recommendations

## Legal disclaimer

This skill produces proposed drafting to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Proposed
language MUST be reviewed by qualified counsel before use — wording that reads
well can have unintended legal effect, and enforceability is jurisdiction-
specific. Every redline set carries this instruction.

## Purpose

Turn a finding ("the liability cap has no data-breach carve-out") into
concrete, insertable language — the exact replacement or added text, why it's
proposed, and a fallback if the counterparty resists — so the negotiation moves
on real words rather than abstract complaints, while making clear counsel must
vet the drafting.

## Layered output principle

For each redline separate: (1) **the current text** (quoted, cited), (2) **the
problem** (from review), (3) **the proposed edit** (exact language), (4) **the
rationale** (plain, for the counterparty), (5) **the fallback** (a less
aggressive version if pushed back), (6) **counsel-review flag**.

## Inputs

- The specific findings to address and the client's position (from the review
  and `contract-negotiation-strategy`). MUST have the issue defined; this
  skill drafts solutions, it doesn't hunt problems.
- The contract's existing style, defined terms, and numbering — proposed
  language MUST use the contract's own defined terms and drafting conventions,
  or it won't slot in cleanly.
- How aggressive the client wants to be (drives ideal vs fallback framing).

## Procedure

1. **Anchor each redline to the exact current text.** Quote the clause being
   changed with its section number; ambiguity about what's being edited
   creates negotiation confusion. For an insertion, specify exactly where it
   goes.
2. **Draft the edit in the contract's own voice.** Use the agreement's defined
   terms (not synonyms), match its numbering and cross-reference style, and
   keep register consistent. A redline that ignores the document's defined
   terms introduces the very inconsistency `defined-term-consistency` and
   `drafting-defects-detection` exist to catch — MUST reuse defined terms and
   check the edit doesn't break cross-references or create contradictions
   elsewhere.
3. **Make the edit precise and minimal.** Change what's needed and no more —
   over-broad rewrites invite counter-rewrites and signal aggression.
   Show it as a clear replacement/insertion/deletion (markup-style: additions
   and deletions indicated) so the counterparty sees exactly what changed.
4. **Write a plain, non-adversarial rationale** for each — the one-line
   justification the client can send ("mutual data-breach carve-out reflects
   that both parties handle sensitive data"). Rationales framed as fairness/
   mutual risk-management land better than demands.
5. **Provide a fallback per redline.** The ideal version and a pre-drafted
   compromise (e.g. a super-cap instead of an uncapped carve-out; a longer
   cure period instead of no termination right). This lets the negotiator
   concede gracefully without a new drafting round. Tie to the ideal/
   acceptable positions from `contract-negotiation-strategy` if available.
6. **Check ripple effects.** Each edit checked against the rest of the
   contract: does it conflict with another clause, orphan a defined term,
   break a cross-reference, or need a conforming change elsewhere (e.g.
   editing a term also update the survival list)? MUST list conforming
   changes; a redline that fixes one clause and breaks another is a defect.
7. **Flag every set for counsel.** State plainly that the drafting is a
   starting point requiring legal review, and specifically flag any edit
   whose legal effect is subtle (indemnity scope, liability language,
   IP assignment wording) as needing careful counsel attention.

## Output Format

```markdown
# Redline recommendations: <contract>
> Drafting aid — MUST be reviewed by counsel before sending.
## Redline 1: <issue> (§ __)
- Current: "<quoted text>"
- Problem: <from review>
- Proposed (ideal): <exact language, additions/deletions marked>
- Rationale (sendable): <plain justification>
- Fallback: <compromise language>
- Conforming changes: <other clauses to update>
- Counsel note: <if legal effect is subtle>
## Redline 2 ...
## Summary table (issue → ideal → fallback → conforming changes)
## Overall counsel-review reminder
```

## Quality Checklist

- [ ] Each redline anchored to quoted current text with section.
- [ ] Proposed language uses the contract's defined terms and style.
- [ ] Edits precise and minimal; changes clearly marked.
- [ ] Plain, sendable rationale per redline.
- [ ] Fallback drafted for each, tied to acceptable positions.
- [ ] Ripple/conforming changes identified across the document.
- [ ] Counsel-review flagged, with subtle-effect edits called out.

## Failure Conditions

- **Abstract advice, not drafting:** "strengthen the indemnity" without the
  actual words — this skill's job is the words.
- **Foreign-voice drafting:** ignoring the contract's defined terms and style
  so the edit doesn't slot in.
- **Ripple blindness:** fixing one clause while breaking a cross-reference or
  contradicting another — introducing a drafting defect.
- **Maximalist rewrites:** replacing whole sections when a phrase would do,
  inviting escalation.
- **No fallback:** ideal-only language that forces a fresh round on pushback.
- **Counsel-flag omission:** presenting drafting as final/safe to send.
- **Overreach on legal effect:** confidently drafting subtle indemnity/
  liability/IP language without flagging it for careful legal review.
- **Escalate to counsel** always (drafting review); specifically when an edit
  touches indemnity/liability/IP/enforceability language whose effect turns on
  precise wording.

## Related skills

- `contract-negotiation-strategy` — supplies positions/fallbacks this drafts.
- `missing-protections-analysis` / substantive reviews — supply the issues.
- `defined-term-consistency` / `drafting-defects-detection` — the consistency
  the redlines must preserve.
- `plain-english-contract-explanation` — explain the edits' effect to the client.
