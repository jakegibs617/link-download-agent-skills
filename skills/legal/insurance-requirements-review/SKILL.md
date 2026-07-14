---
name: insurance-requirements-review
description: Analyzes contractual insurance requirements — coverage types and limits, additional-insured and waiver-of-subrogation status, primary/non-contributory language, certificate and notice mechanics — and whether the required coverage actually stands behind the contract's risk allocation. Use to review insurance clauses or check insurance-indemnity alignment. Not for the indemnities themselves (liability-indemnification-review) and not insurance-purchasing or coverage-opinion advice (brokers/coverage counsel).
---

# Insurance Requirements Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and not insurance/broker advice. Whether specific
policies actually cover specific losses is a coverage question for brokers
and coverage counsel; this skill analyzes what the contract requires and how
it aligns with the deal's risks, flagging coverage questions to specialists.

## Purpose

Determine whether the insurance the contract requires actually backs the
risks the contract allocates — the right coverage types at plausible limits,
with the status endorsements (additional insured, primary/non-contributory,
subrogation waiver) that make the counterparty's insurance reachable —
because an indemnity from a thinly-capitalized counterparty is only as good
as the insurance behind it.

## Layered output principle

Separate: (1) **what the contract requires** (coverage/limits/endorsements,
cited), (2) **practical consequence** (what would actually respond to the
deal's realistic losses), (3) **risk** (misalignment with indemnities, hollow
mechanics), (4) **missing info**, (5) **broker/coverage-counsel referral**.

## Inputs

- The insurance clause and the whole contract — the requirements only make
  sense against the indemnities and liability allocation (coordinate with
  `liability-indemnification-review`).
- The deal's realistic loss scenarios (bodily injury? data breach?
  professional errors? property damage?) and which party you represent
  (requiring coverage vs being required to carry it).

## Procedure

1. **Extract the required program.** Each required coverage type — CGL,
   professional liability/E&O, cyber/privacy, workers' comp/employer's
   liability, auto, umbrella/excess, crime/fidelity — with its limits
   (per-occurrence vs aggregate — the distinction matters and MUST be
   preserved), required policy form notes (occurrence vs claims-made), and
   duration (including post-termination tail for claims-made lines).
2. **Match coverage to the deal's actual risks.** Software/services deal
   with data access but no cyber/E&O requirement; onsite work without CGL;
   professional advice without E&O — mismatches between what the deal can
   break and what must be insured are the core finding. Conversely flag
   requirements irrelevant to the work (cost without protection) when
   representing the carrying party.
3. **Check the status endorsements — where clauses go hollow:**
   additional-insured status (on which policies, for ongoing and completed
   operations?), primary-and-non-contributory language, waiver of
   subrogation, and notice-of-cancellation obligations. A high limit
   without additional-insured/primary status may leave the client chasing
   rather than claiming — MUST assess the mechanics, not just the numbers.
4. **Align insurance with the indemnity.** Does required coverage plausibly
   stand behind the indemnification obligations (types and limits vs the
   indemnified risks)? An uncapped data-breach indemnity backed by no cyber
   requirement is a paper indemnity from a small counterparty — flag the
   gap (limit-adequacy specifics → broker referral).
5. **Audit the verification mechanics.** Certificates of insurance required
   (noting a COI evidences but doesn't confer coverage — endorsements do),
   renewal evidence, the right to request policies, and consequences of
   lapse (breach? termination right? right to procure at their cost?).
   Requirements with no verification or lapse consequence are aspirational.
6. **Claims-made tail check.** For claims-made lines (E&O, cyber), is
   coverage required to continue for a period after the work ends? Claims
   surface late; a policy that lapses at termination can leave the loss
   window uncovered — flag it.
7. **Assess net position (separate layer):** ranked gaps/misalignments;
   negotiation asks to `contract-negotiation-strategy`; adequacy-of-limits
   and coverage-scope questions referred to brokers/coverage counsel.

## Output Format

```markdown
# Insurance requirements review: <contract> (client: requiring / carrying)
## Required program
| Coverage | Limits (per-occ / aggregate) | Form (occurrence/claims-made) | Duration/tail | § |
## Risk-to-coverage match (deal's realistic losses vs required types; mismatches)
## Status endorsements (AI status, primary/non-contributory, subrogation waiver, cancellation notice)
## Insurance-indemnity alignment (gaps where indemnities lack backing)
## Verification & lapse mechanics (COI limits noted; consequences of lapse)
## Claims-made tail findings
## Net position & ranked issues (separate layer)
## Broker / coverage-counsel referrals + information needed
```

## Quality Checklist

- [ ] All required coverages extracted with per-occurrence vs aggregate
      limits preserved.
- [ ] Coverage types matched against the deal's realistic loss scenarios.
- [ ] Status endorsements checked, not just limits.
- [ ] Indemnity-insurance alignment analyzed.
- [ ] COI-vs-endorsement distinction maintained.
- [ ] Claims-made tail addressed.
- [ ] Coverage/adequacy opinions referred to brokers/coverage counsel.

## Failure Conditions

- **Limits-only review:** checking the dollar amounts while missing the
  absent additional-insured/primary status that makes them reachable.
- **Type mismatch blindness:** a data-heavy deal with no cyber requirement
  passing unremarked.
- **COI credulity:** treating a certificate requirement as coverage.
- **Indemnity orphaning:** analyzing insurance in isolation from the
  indemnities it should back.
- **Coverage opinions:** declaring "this policy would cover that loss" —
  broker/coverage-counsel territory.
- **Tail blindness** on claims-made lines.
- **Escalate to broker/coverage counsel** for limit adequacy, policy-form
  specifics, and any actual-coverage question; to counsel when the insurance
  clause conflicts with the indemnity/liability architecture.

## Related skills

- `liability-indemnification-review` — the risk allocation this program
  should back.
- `regulatory-compliance-review` — statutory insurance minimums (flagged
  there, verified by professionals).
- `contract-negotiation-strategy` — program-rebalancing asks.
