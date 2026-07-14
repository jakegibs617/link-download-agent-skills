---
name: confidentiality-data-protection-review
description: Analyzes confidentiality and data-protection obligations — what information is protected, from whom, for how long, with what exceptions, plus personal-data processing terms (DPA presence, security standards, breach notice, deletion/return). Use to review NDAs, confidentiality clauses, or data-handling provisions in any agreement. Not for IP ownership of the information (ip-ownership-review), trade-secret litigation strategy (counsel), or regulatory compliance programs broadly (regulatory-compliance-review).
---

# Confidentiality and Data-Protection Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Data-protection
law (GDPR, CCPA, sector rules) and trade-secret preservation requirements are
jurisdiction-specific; this skill flags such points for counsel.

## Purpose

Establish exactly what information is protected and how leaky the protection
is — the definition's real scope after exceptions, the obligations' strength
and duration, and whether personal-data handling has the machinery law and
prudence require — because confidentiality clauses fail at their edges, not
their headlines.

## Layered output principle

Separate: (1) **what the contract protects and requires** (cited), (2)
**practical consequence** (what can actually leak or be demanded), (3)
**risk** (asymmetries, gaps, trade-secret hazards), (4) **missing info**,
(5) **counsel needed** (data-protection law, trade-secret preservation).

## Inputs

- The full agreement (confidentiality interacts with IP, term/survival, and
  liability carve-outs elsewhere) plus any DPA/security exhibit — flag if a
  referenced DPA is missing.
- Which party you represent and the direction of disclosure (one-way or
  mutual; who discloses the crown jewels).
- Whether personal data is processed under the deal (triggers the data-
  protection half of this review).

## Procedure

### Confidentiality

1. **Pin the definition's real scope.** What counts as Confidential
   Information: marked-only (a trap — oral disclosures and unmarked docs fall
   out unless there's a catch-up mechanism), defined-by-nature, or broad with
   exceptions. Check whether the client's actual sensitive information
   (source code, pricing, customer lists, oral know-how) falls inside the
   definition as written. MUST test the definition against what the client
   will actually disclose.
2. **Audit the standard exceptions** (publicly available, already known,
   independently developed, rightfully received) for overbreadth — e.g.
   "known to recipient" without a written-records requirement, or an
   independent-development exception with no burden of proof. Check the
   compelled-disclosure carve-out has notice-and-cooperation mechanics.
3. **Assess the obligations' strength:** standard of care (reasonable care
   vs strict), permitted use (evaluation-purpose-only vs broad), permitted
   disclosees (employees/affiliates/advisors — with flow-down obligations?),
   and no-reverse-engineering where relevant.
4. **Check duration and survival.** Term of obligations; whether trade
   secrets are protected indefinitely or the clause time-limits everything
   (a fixed 2-year limit on trade-secret confidentiality can be a serious
   hazard — flag for counsel); survival after termination
   (coordinate with `term-termination-analysis`).
5. **Check return/destruction mechanics** at termination or on request:
   certification, archival/backup carve-outs, and the residuals clause
   (unaided-memory carve-outs can swallow know-how protection — coordinate
   with `ip-ownership-review`).
6. **Check symmetry.** In mutual NDAs, are definitions, exceptions, and
   durations actually mirror-image, or asymmetric in one party's favor?

### Data protection (when personal data is in scope)

7. **Verify the machinery exists:** a DPA or processing terms (roles —
   controller/processor), processing scope and purpose limits,
   security-measures standard (specific vs "appropriate"), subprocessor
   rules, breach-notification obligation with a timeframe, deletion/return
   at end, cross-border transfer mechanics, and audit rights. Missing
   machinery where personal data flows is a material, counsel-level gap —
   flag it; MUST NOT opine on statutory compliance itself.

## Output Format

```markdown
# Confidentiality & data-protection review: <agreement>
## Direction (one-way/mutual) and what the client actually discloses
## Definition scope (marked-only? oral? tested against client's real disclosures) [cited]
## Exceptions audit (overbreadth, proof burdens, compelled-disclosure mechanics)
## Obligations (care standard, use limits, disclosees, flow-down)
## Duration & survival (trade-secret time-limit hazard flagged)
## Return/destruction & residuals
## Symmetry check (mutual NDAs)
## Data protection (if in scope): machinery checklist (DPA, roles, security, breach notice, deletion, transfers, audit) — gaps flagged
## Risk layer: ranked issues
## Counsel-required items + information needed
```

## Quality Checklist

- [ ] Definition tested against what the client will actually disclose.
- [ ] Marked-only traps and oral-disclosure gaps caught.
- [ ] Exceptions audited for overbreadth and proof burdens.
- [ ] Duration checked incl. the trade-secret time-limit hazard.
- [ ] Residuals/return mechanics reviewed.
- [ ] Symmetry verified, not assumed, for mutual NDAs.
- [ ] Personal-data machinery checked when data is in scope; gaps flagged for counsel.
- [ ] Facts separated from risk judgment.

## Failure Conditions

- **Headline reading:** "there's a confidentiality clause" without testing
  whether the client's actual disclosures fall inside the definition.
- **Marked-only miss:** overlooking that unmarked/oral disclosures are
  unprotected as written.
- **Trade-secret time-bomb:** missing that a blanket time limit ends trade-
  secret protection.
- **Symmetry assumption** in a mutual NDA that isn't.
- **Compliance opinions:** declaring GDPR/CCPA compliance — counsel's call;
  the skill checks presence of machinery, not legal sufficiency.
- **Residuals skim.**
- **Escalate to counsel** when: personal data flows without a DPA;
  trade-secret preservation or statutory data-protection sufficiency is the
  question; or compelled-disclosure/regulatory demands are anticipated.

## Related skills

- `ip-ownership-review` — residuals and ownership of disclosed materials.
- `term-termination-analysis` — survival coordination.
- `regulatory-compliance-review` — broader regulatory exposure.
- `restrictive-covenants-review` — non-solicit/non-compete companions to NDAs.
