---
name: ip-ownership-review
description: Analyzes who owns and who may use every category of intellectual property a contract touches — pre-existing/background IP, newly created work product, licenses granted and their scope, invention assignments, open-source implications, and residual rights. Use to review IP provisions in development, employment, contractor, license, or acquisition agreements. Not for confidentiality obligations (confidentiality-data-protection-review) or the non-infringement warranty/indemnity mechanics (warranty-representation-review / liability-indemnification-review).
---

# Intellectual Property Ownership Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney.
Work-made-for-hire doctrine, assignment formalities, moral rights, and
invention-assignment statutes are jurisdiction-specific; this skill flags
such points for counsel.

## Purpose

Answer precisely: for each piece of IP the deal touches — who owns it, who
can use it, for what, for how long, and with what dependencies — because the
gap between "we paid for it" and "we own it" is where IP disputes are born.

## Layered output principle

Separate: (1) **what the contract says** about ownership/licenses (cited),
(2) **practical consequence** (what each party can actually do and depends
on), (3) **risk** (ownership gaps, overreach, contamination), (4) **missing
info**, (5) **counsel needed**.

## Inputs

- The full contract including IP exhibits (background-IP schedules, prior
  inventions lists) — MUST flag if referenced schedules are missing.
- Which party you represent and what they need: to own outright? to use
  freely? to keep their pre-existing assets clean?
- The nature of the work/assets (software, content, inventions, data,
  trademarks) — different IP regimes attach.

## Procedure

1. **Categorize the IP in play.** Background/pre-existing IP (each party's),
   newly created work product/deliverables, third-party components
   (including open source), tools and generic know-how, feedback/
   improvements, and data. Each category gets its own ownership answer —
   MUST NOT collapse them into one "IP clause" reading.
2. **Determine ownership of new work product exactly.** Assignment language:
   present assignment ("hereby assigns") vs promise to assign ("shall
   assign") — the difference matters and is a counsel-level nuance to flag.
   Work-made-for-hire recitals alone don't cover everything (jurisdiction-
   and category-specific → counsel flag). Check timing (on creation vs on
   payment — ownership conditioned on full payment is a common and
   consequential term). Moral-rights waivers where relevant.
3. **Map every license granted, with its full parameter set:** scope
   (what IP, what uses), exclusivity, territory, duration/perpetuity,
   revocability, sublicensability, transferability, and royalty. An
   undefined parameter is a gap, not a default — record it. Check the
   licenses each party needs back: does the client retain a license to its
   own background IP embedded in deliverables it assigned away? Does the
   vendor get a license to client materials it needs to do the work?
4. **Check background-IP protection.** Is pre-existing IP excluded from
   assignment, and is the exclusion self-executing or dependent on a
   schedule that's blank/missing? Broad assignments with no background-IP
   carve-out can sweep in the client's crown jewels — or, for contractors,
   their reusable toolkit.
5. **Assess third-party and open-source exposure.** Does the contract
   address open-source use in deliverables (disclosure obligations, copyleft
   restrictions)? Deliverables with copyleft components can undermine the
   ownership the client thinks it's buying — flag for
   `dependency-evaluation`-style license analysis and counsel where material.
6. **Check the edges:** feedback/improvement ownership (does feedback
   assign the client's ideas to the vendor?), residual-rights clauses
   (memory carve-outs that can swallow confidentiality of know-how), data
   ownership and derived-data rights, and trademark usage limits.
7. **Test against the client's needs (separate layer).** Can the client do
   what it plans (resell, modify, open-source, take in-house)? What does it
   still depend on the counterparty for? Ranked issues; asks to
   `contract-negotiation-strategy`.

## Output Format

```markdown
# IP ownership review: <contract>
## IP category map
| Category | Owned by (post-deal) | Assignment language (present/promise/WMFH) | Conditions (e.g. payment) | § |
## Licenses granted
| Licensor → Licensee | Scope | Excl. | Territory | Duration | Revocable | Sublicense/Transfer | § |
## Background-IP protection (carve-outs, schedules attached?)
## Third-party / open-source exposure
## Edge findings (feedback, residuals, data, improvements)
## Needs test: what the client can/cannot do; residual dependencies (separate layer)
## Counsel-required items (assignment formalities, WMFH, moral rights) + information needed
```

## Quality Checklist

- [ ] IP categorized; each category has its own ownership answer.
- [ ] Present-assignment vs promise-to-assign vs WMFH distinguished and flagged.
- [ ] Ownership conditions (payment-triggered) surfaced.
- [ ] Every license mapped with its full parameter set; gaps recorded as gaps.
- [ ] Background-IP carve-outs and their schedules verified.
- [ ] Open-source/third-party contamination addressed.
- [ ] Feedback/residuals/data edges checked.
- [ ] Facts separated from the needs-test judgment.

## Failure Conditions

- **Category collapse:** one verdict for "the IP" when background, work
  product, and third-party components each have different answers.
- **Assignment-language blindness:** treating "shall assign" or a bare WMFH
  recital as completed present ownership.
- **Payment-condition miss:** overlooking that ownership doesn't transfer
  until final payment.
- **License-parameter gaps:** reporting "customer gets a license" without
  scope/duration/exclusivity — the parameters are the license.
- **Residuals/feedback skim:** missing the clause that quietly licenses away
  know-how or ideas.
- **Ownership opinions beyond the text:** declaring WMFH status or assignment
  validity — jurisdiction-specific counsel calls; flag them.
- **Escalate to counsel** when: assignment formalities/WMFH/moral rights
  determine the outcome; invention-assignment statutes may limit employee
  assignments; or the deal's value rests on an ownership question the text
  leaves ambiguous.

## Related skills

- `confidentiality-data-protection-review` — know-how protection and
  residuals interact.
- `warranty-representation-review` / `liability-indemnification-review` —
  non-infringement promises and their teeth.
- `worker-classification-review` — classification affects IP default rules.
- `contract-negotiation-strategy` — ownership/license asks.
