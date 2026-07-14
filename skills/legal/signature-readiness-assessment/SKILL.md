---
name: signature-readiness-assessment
description: Consolidates all prior review findings into a single go/no-go recommendation for signing — confirming blockers are resolved, open items closed, execution mechanics correct, and residual risks explicitly accepted — producing a signature-readiness verdict with the outstanding items that gate it. Use as the final gate before a contract is signed, after substantive reviews are done. Not a substitute for counsel sign-off; the decision to sign remains the client's and their lawyer's.
---

# Signature-Readiness Assessment

## Legal disclaimer

This skill produces a readiness consolidation to support a human decision. It
is **not legal advice** and does not replace a licensed attorney or authorize
signing. The recommendation is "ready / not ready from a review standpoint";
the decision to sign, and final legal sign-off, remain with the client and
their counsel. This is stated in every assessment.

## Purpose

Be the final checkpoint: pull together everything the review process found,
confirm the blocking issues are actually resolved (not just noted), verify the
document is mechanically ready to execute, and force every remaining risk to be
either fixed or consciously accepted — so nothing signs with an open blocker or
an unnoticed hole, while making clear the sign decision is counsel's and the
client's.

## Layered output principle

Separate: (1) **the consolidated findings** (from prior reviews, with status),
(2) **what's resolved vs still open**, (3) **residual risks and their
acceptance status**, (4) **execution-mechanics check**, (5) **the readiness
verdict** (review-standpoint), (6) **counsel sign-off still required**.

## Inputs

- The outputs of the prior review skills (substantive, structural, missing-
  protections, drafting-defects) and the negotiation outcome — the current,
  post-negotiation contract version. MUST assess the final version that would
  actually be signed, not an earlier draft; version mismatch is a top failure.
- The client's risk decisions on flagged items (what they've chosen to accept
  vs fix) — MUST obtain these; the skill can't accept risks on the client's
  behalf.
- Confirmation of whether counsel has reviewed.

## Procedure

1. **Confirm you're assessing the final version.** Verify the document under
   review is the one to be signed, reflecting the negotiated changes. If
   redlines were exchanged, confirm they're incorporated and no new issues
   were introduced in the latest turn (a counterparty's "clean" version can
   contain silent changes — MUST check for them, not assume).
2. **Consolidate all findings with current status.** Pull every material issue
   from the prior reviews into one register, each marked: resolved (how?),
   accepted-by-client (documented?), still-open (blocker?), or not-yet-
   addressed. MUST NOT mark an issue resolved without evidence it actually was.
3. **Verify blockers are truly closed.** For each item previously flagged as a
   blocker/must-fix: confirm the fix is in the final text (cite it), not just
   promised. A blocker "agreed to be fixed" but absent from the signing
   version is still a blocker — this catch is the skill's core value.
4. **Force residual-risk acceptance to be explicit.** Every unresolved
   non-blocker risk must be either fixed or consciously accepted by the client
   with the consequence understood. MUST NOT let a risk pass as "probably
   fine" — either it's accepted (documented, by someone with authority) or
   it's still open. Unowned residual risk = not ready.
5. **Run the execution-mechanics check:** correct legal party names and
   signatory authority, all exhibits/schedules attached and populated, blanks/
   placeholders filled, effective date, counterpart/e-signature terms,
   initials where required, and that referenced documents exist. A perfect
   deal with a blank exhibit or wrong signing entity isn't ready.
6. **Confirm the counsel gate.** State whether legal review has occurred and,
   if the deal warrants it (materiality, novelty, regulated area, high value),
   that counsel sign-off is required before signing. MUST NOT issue a "ready"
   that reads as substituting for needed legal review.
7. **Issue the verdict:** READY (from a review standpoint) / READY-WITH-
   CONDITIONS (the specific conditions listed) / NOT-READY (the specific
   blockers). Specific and honest — no vague "looks mostly fine". Under
   deadline pressure, MUST hold a genuine blocker as a blocker.

## Output Format

```markdown
# Signature-readiness assessment: <contract> — Verdict: <READY | READY-WITH-CONDITIONS | NOT-READY>
> Review-standpoint only — not legal advice; counsel sign-off and the decision to sign remain with the client.
## Version confirmed (is this the final, to-be-signed text? latest-turn changes checked?)
## Consolidated findings register
| Issue | Source review | Status (resolved/accepted/open/blocker) | Evidence (§) |
## Blockers — resolution verified in final text (or still open)
## Residual risks — acceptance status (accepted-by-whom / still unowned)
## Execution mechanics (parties, authority, exhibits, blanks, dates, signatures)
## Counsel gate (reviewed? sign-off required?)
## Verdict + the exact outstanding items that gate it
```

## Quality Checklist

- [ ] Assessing the final, to-be-signed version; latest-turn changes checked.
- [ ] Every material finding consolidated with an evidenced status.
- [ ] Each blocker's fix verified present in the final text, not just promised.
- [ ] Every residual risk either fixed or explicitly, ownedly accepted.
- [ ] Execution mechanics checked (parties, authority, exhibits, blanks, dates).
- [ ] Counsel gate stated; verdict doesn't substitute for needed sign-off.
- [ ] Verdict specific, with the exact gating items.

## Failure Conditions

- **Blocker-slip:** marking a must-fix resolved because it was agreed, without
  confirming it's in the signing version — the highest-consequence failure.
- **Stale-version assessment:** signing off on a draft that isn't the final
  text, or missing silent changes in the counterparty's latest turn.
- **Risk-by-default acceptance:** letting an unresolved risk pass as "probably
  fine" without the client actually accepting it.
- **Mechanics oversight:** a substantively-clean contract with a blank exhibit,
  wrong entity, or unsigned schedule waved through.
- **Deadline capitulation:** downgrading a real blocker to a condition because
  signing is scheduled.
- **Verdict-as-legal-clearance:** a "READY" that reads as authorizing the
  signature or replacing counsel sign-off.
- **Vague verdict:** "mostly ready" with no specific gating items.
- **Escalate to counsel** when: a blocker's resolution turns on a legal
  judgment; the deal warrants sign-off that hasn't happened; or the client is
  treating this readiness check as the legal decision itself.

## Related skills

- All prior review skills + `missing-protections-analysis` +
  `drafting-defects-detection` — supply the findings this consolidates.
- `contract-negotiation-strategy` / `redline-recommendations` — the negotiation
  whose outcome this verifies landed in the final text.
- `production-readiness-review` (engineering) — the analogous launch-gate skill.
