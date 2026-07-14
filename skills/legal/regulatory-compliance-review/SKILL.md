---
name: regulatory-compliance-review
description: Identifies the regulatory regimes a contract's subject matter plausibly touches — data protection, financial services, healthcare, export control, consumer protection, anti-corruption, sector rules — and audits how the contract allocates compliance responsibility, cooperation, and regulatory-change risk between the parties. Use to review compliance clauses or spot regulatory exposure in a deal. Not a compliance determination (counsel/compliance professionals decide), not data-protection clause mechanics (confidentiality-data-protection-review).
---

# Regulatory and Compliance Risk Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney or compliance
professional. Whether a party is actually in compliance with any regime, and
which regimes definitively apply, are jurisdiction- and fact-specific
determinations for qualified professionals; this skill identifies exposure
and contract-allocation issues and flags them.

## Purpose

Answer two distinct questions and keep them separate: (1) which regulatory
regimes does this deal's subject matter plausibly implicate, and (2) how does
the contract allocate the burden, cost, cooperation, and change-risk of that
regulation between the parties — because "comply with all applicable laws"
boilerplate hides both what applies and who actually carries it.

## Layered output principle

Separate: (1) **what the contract says** about compliance (cited), (2)
**which regimes are plausibly implicated** (labeled as flags, not
determinations), (3) **allocation analysis** (who bears what), (4) **risk**
(gaps, one-sided allocations, regulatory-change exposure), (5) **missing
info**, (6) **counsel/compliance-professional required** — always for
applicability and sufficiency determinations.

## Inputs

- The contract and the deal's factual profile: subject matter, data types,
  industries, party locations, user categories (consumers? minors?
  regulated entities?), and cross-border elements. The regime-spotting
  depends on facts — MUST gather or request them.
- Which party you represent.

## Procedure

1. **Profile the deal's regulatory surface.** From the subject matter and
   facts, list the regimes plausibly implicated: personal data (privacy/
   data-protection regimes), payments/financial services, health data or
   services, export controls and sanctions, consumer protection (including
   auto-renewal, marketing, accessibility), anti-corruption/anti-bribery,
   employment/labor, sector-specific licensing, AI/algorithmic rules where
   relevant. MUST present these as *plausibly implicated* flags with the
   triggering fact cited — not as determinations that they apply.
2. **Audit the compliance clauses.** Locate every compliance-related
   provision: general "comply with applicable law" covenants (whose laws?
   as they change?), specific regime clauses (DPA, export, anti-bribery
   reps), compliance warranties, audit/inspection rights, and
   certification/attestation obligations. Generic boilerplate covering a
   heavily regulated subject matter is itself a finding.
3. **Map the allocation.** For each identified regime/compliance obligation:
   who bears the obligation, who pays for compliance, who must cooperate
   (and how fast) with the other's regulatory demands, who handles
   regulator inquiries, and who is liable when compliance fails (tie into
   `liability-indemnification-review` carve-outs). One-sided allocations —
   all burden on one party for a regime both touch — get flagged.
4. **Analyze regulatory-change risk.** Laws change mid-term: does the
   contract say who absorbs new compliance costs, whether either party can
   modify/terminate if law makes performance illegal or materially more
   expensive, and how required contract updates (e.g. new standard clauses)
   get made? Silence here means a fight later — flag it.
5. **Check the cooperation machinery** where regimes demand it: breach/
   incident notification duties and timelines, records/audit support,
   flow-down of obligations to subcontractors, and termination rights for
   the counterparty's compliance failure.
6. **Rank and route (separate layer).** Rank exposures by the deal's facts
   (a consumer app with EU minors ranks privacy first). Every applicability
   or sufficiency determination goes to counsel/compliance professionals —
   MUST NOT declare "GDPR applies and this contract satisfies it" or the
   reverse.

## Output Format

```markdown
# Regulatory & compliance review: <contract>
## Deal profile (facts driving the analysis; facts still needed)
## Regimes plausibly implicated (flag + triggering fact; NOT determinations)
## Compliance-clause audit (each provision cited; boilerplate-vs-regulated-subject gaps)
## Allocation map
| Regime/obligation | Who bears | Who pays | Cooperation duties | Liability on failure | § |
## Regulatory-change risk (cost absorption, illegality exit, update mechanics)
## Cooperation machinery (notifications, audit support, flow-down, termination rights)
## Ranked exposures (separate layer)
## Counsel/compliance-professional-required items + information needed
```

## Quality Checklist

- [ ] Regime flags each tied to a cited triggering fact; labeled as flags.
- [ ] Every compliance clause located; boilerplate-only coverage of regulated
      subject matter flagged.
- [ ] Allocation mapped per regime (bearer, payer, cooperator, liable party).
- [ ] Regulatory-change and illegality scenarios addressed or flagged silent.
- [ ] Cooperation machinery checked against the flagged regimes' demands.
- [ ] No applicability or sufficiency determinations; professional routing
      explicit.

## Failure Conditions

- **Compliance verdicts:** "this contract is GDPR-compliant" / "export
  controls don't apply" — the cardinal failure; determinations are for
  professionals.
- **Boilerplate blindness:** accepting "comply with all applicable laws" as
  adequate for a heavily regulated deal.
- **Regime spotting by template:** listing the same regime set regardless of
  the deal's actual facts (or missing the obvious one the facts scream).
- **Allocation skim:** identifying regimes without who bears/pays/cooperates.
- **Change-risk silence:** not noticing the contract says nothing about
  mid-term regulatory change.
- **Fabricated regulations:** citing specific statutory requirements from
  memory as definitive — describe regime types; leave specifics to counsel.
- **Escalate to professionals** always for applicability/sufficiency; urgently
  when a regulator inquiry exists, sanctions/export exposure is plausible,
  or minors'/health/financial data is involved.

## Related skills

- `confidentiality-data-protection-review` — the DPA/data-clause mechanics.
- `liability-indemnification-review` — who pays when compliance fails.
- `governing-law-jurisdiction-review` — mandatory-law interactions.
- `insurance-requirements-review` — coverage behind compliance failures.
