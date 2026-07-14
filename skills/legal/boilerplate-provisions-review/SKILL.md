---
name: boilerplate-provisions-review
description: Reviews the "miscellaneous"/general provisions that get skimmed — entire-agreement/integration, amendment, waiver, notices, severability, counterparts/e-signature, survival, third-party beneficiaries, relationship of parties, order-of-precedence, and interpretation clauses — where quietly consequential terms hide. Use to review the boilerplate/general-provisions section. Not for governing law and dispute resolution (their own skills) or assignment (assignment-change-of-control-review).
---

# Boilerplate Provisions Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Some boilerplate
(notice formalities, e-signature validity, severability effects) has
jurisdiction-specific consequences; this skill flags them.

## Purpose

Give the "miscellaneous" section the scrutiny it never gets, because
consequential terms hide among the genuinely standard ones — an integration
clause that erases side agreements, a notices clause that makes valid
termination hard, an order-of-precedence rule that lets an exhibit override
the negotiated body. Separate the truly routine from the quietly load-bearing.

## Layered output principle

Separate: (1) **what the clause says** (cited), (2) **practical consequence**,
(3) **risk** (the ones that actually bite), (4) **missing info**, (5) **counsel
needed**. The whole value here is calling out which "standard" clauses aren't.

## Inputs

- The general-provisions/miscellaneous section and the whole contract
  (integration and precedence clauses reference the entire document and its
  exhibits; side letters and prior agreements matter).
- Whether any side agreements, prior deals, verbal promises, or purchase-
  order terms exist that the client is relying on (critical for the
  integration-clause analysis) — MUST ask if the client mentions reliance on
  anything outside the document.

## Procedure

Go clause by clause; for each, state whether it's routine here or
consequential, with the reason.

1. **Entire-agreement / integration.** Does it erase all prior/
   contemporaneous agreements and representations? If the client relies on
   any side letter, email promise, or PO term, the integration clause likely
   wipes it out — MUST flag this against the client's reliance. Check for a
   non-reliance clause (bars reliance on extra-contractual statements — a
   misrepresentation-defense tool worth flagging).
2. **Amendment and waiver.** Amendments only in a signed writing (protects
   against informal change — usually good), and no-oral-modification clauses;
   waiver clauses (a one-time indulgence isn't a permanent waiver; failure to
   enforce isn't waiver). Flag if amendments can happen too loosely (e.g. by
   the vendor's posted-terms update — a unilateral-amendment trap).
3. **Notices.** Method (email valid? certified mail only?), addresses, deemed-
   receipt timing, and — importantly — whether critical notices (termination,
   breach, indemnity claims) must follow the formal notice clause. A valid
   termination sent the "wrong" way can be ineffective; MUST flag onerous or
   trap-like notice formalities.
4. **Severability.** If a clause is unenforceable, is the rest preserved, and
   does the clause allow reformation/blue-penciling? Interacts with
   restrictive covenants; note but route enforceability to counsel.
5. **Counterparts / electronic signature.** E-signature and counterpart
   validity — usually routine, but flag if the deal has execution
   formalities that matter.
6. **Order of precedence.** When body, exhibits, SOWs, and incorporated terms
   conflict, which wins? A precedence clause letting an exhibit or a
   click-through override the negotiated body is a real trap — MUST check the
   precedence order against where the negotiated protections live.
7. **Third-party beneficiaries.** Expressly excluded (common) or granted?
   Affects who can enforce; note if affiliates/end-users are given (or denied)
   rights that matter to the deal.
8. **Relationship of the parties, further assurances, interpretation
   (headings, "including without limitation", singular/plural, construction-
   against-drafter waiver), survival cross-check, and any buried operative
   term masquerading as boilerplate** — the misfiled indemnity or fee tucked
   into "miscellaneous" is a classic; MUST scan for substance hiding here.
9. **Sort and rank (separate layer).** Routine vs consequential; the
   consequential ones ranked with their practical bite; asks to
   `contract-negotiation-strategy`. Cross-reference `drafting-defects-
   detection` for precedence/consistency issues that are really drafting bugs.

## Output Format

```markdown
# Boilerplate review: <contract>
## Consequential provisions (NOT actually standard) — ranked
| Clause | What it says (§) | Practical bite | Recommendation |
## Integration & reliance check (side agreements/promises at risk)
## Notices trap check (do critical notices have onerous formalities?)
## Order-of-precedence check (can an exhibit override the negotiated body?)
## Buried operative terms found in "miscellaneous"
## Genuinely routine (brief list, so the reader knows they were checked)
## Counsel-required items + information needed
```

## Quality Checklist

- [ ] Integration clause checked against the client's reliance on outside terms.
- [ ] Notices clause checked for termination/breach-notice traps.
- [ ] Order-of-precedence checked against where negotiated protections sit.
- [ ] Unilateral-amendment / posted-terms-update traps caught.
- [ ] "Miscellaneous" scanned for buried operative terms.
- [ ] Routine clauses listed as checked (not silently skipped) but not inflated.
- [ ] Consequential vs routine clearly separated.

## Failure Conditions

- **Boilerplate dismissal:** waving the whole section through as "standard" —
  the exact failure the skill exists to prevent.
- **Integration blindness:** missing that the integration clause kills a side
  promise the client is counting on.
- **Notices-trap miss:** overlooking formalities that can invalidate a
  termination or claim notice.
- **Precedence miss:** not catching that an exhibit/click-through overrides
  the negotiated body.
- **Substance-in-misc miss:** missing an operative obligation/fee buried in
  the miscellaneous section.
- **Over-flagging:** treating genuinely routine clauses as alarming, drowning
  the real issues.
- **Escalate to counsel** when: notice/execution formalities have
  jurisdiction-specific validity effects; severability/reformation interacts
  with restrictive covenants; or an integration/non-reliance clause bears on
  a potential misrepresentation position.

## Related skills

- `drafting-defects-detection` — precedence conflicts and cross-reference
  errors as drafting bugs.
- `governing-law-jurisdiction-review`, `dispute-resolution-review`,
  `assignment-change-of-control-review` — the "boilerplate" that has its own
  skills.
- `missing-protections-analysis` — boilerplate protections that are absent.
