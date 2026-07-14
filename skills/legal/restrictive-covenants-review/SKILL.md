---
name: restrictive-covenants-review
description: Analyzes noncompete, nonsolicitation (customers and employees), no-hire, and exclusivity provisions — their scope (activity, geography, duration), triggers, consideration, and practical bite — flagging that enforceability is intensely jurisdiction-specific. Use to review restrictive covenants in employment, contractor, sale-of-business, or commercial agreements. Not for confidentiality obligations (confidentiality-data-protection-review) or worker classification (worker-classification-review). Never a substitute for counsel on enforceability.
---

# Noncompete, Nonsolicitation, and Restrictive Covenants Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Restrictive-
covenant enforceability is among the most jurisdiction-variable areas in
contract law (some jurisdictions ban noncompetes outright; others blue-pencil;
others void overbroad ones entirely) — every enforceability question MUST go
to counsel in the relevant jurisdiction.

## Purpose

Make each restrictive covenant's actual reach explicit — what activity, where,
for how long, triggered by what, against whom — and assess its practical
consequence for the restricted party's livelihood or the beneficiary's
protection, while routing every "will it hold up" question to counsel.

## Layered output principle

Separate: (1) **what the covenant says** (scope parameters, cited),
(2) **practical consequence** (what the restricted party actually can't do;
what the beneficiary actually gains), (3) **risk** (overbreadth, vagueness,
one-sidedness), (4) **missing info** (jurisdiction, consideration,
role facts), (5) **counsel required** (enforceability — always, when it
matters).

## Inputs

- The covenant language and the full agreement (covenants interact with
  termination triggers, consideration, and garden-leave/severance terms).
- The context: employment vs contractor vs sale-of-business vs commercial
  (the analysis and typical tolerance differ sharply — sale-of-business
  covenants are generally tolerated far more broadly).
- The restricted party's actual work/market, and the governing
  law/jurisdiction — MUST ask for jurisdiction if absent; almost nothing
  here can be assessed without it.

## Procedure

1. **Identify each covenant type separately:** noncompete (working for/
   starting a competitor), customer nonsolicit (and does it cover accepting
   unsolicited business?), employee nonsolicit/no-hire (solicit vs hire —
   different reach), exclusivity/noncircumvention, and any non-disparagement
   riding along. MUST NOT analyze them as one blob; each has different scope
   and different typical treatment.
2. **Extract each covenant's full parameter set:** restricted activity
   (defined how? "any business competitive with the Company" vs a named
   field), geographic scope (defined area vs "anywhere the Company does
   business" — potentially global), duration, trigger (any termination vs
   termination for cause only vs during engagement), and who it binds/
   protects (affiliates too?).
3. **Test definitional bite.** Vague cores ("competitive", "Company
   business" defined by whatever the company does at any time) make the
   covenant's reach unknowable — a risk in both directions. Check whether
   the restricted activity maps to what the person actually does or sweeps
   far beyond it.
4. **Check consideration and conditions.** What the restricted party gets:
   employment itself, a raise/bonus, equity vesting, garden-leave pay
   during the restriction (some jurisdictions require compensation for the
   restricted period — counsel flag). Note covenants triggered even on
   termination without cause, and forfeiture-for-competition terms attached
   to equity (coordinate with `equity-incentive-review`).
5. **Assess practical consequence for the client's side.** For a restricted
   individual: can they realistically keep working in their field? For the
   beneficiary: does the covenant actually protect the interest at stake
   (customer relationships, trade secrets, workforce), or is it broader than
   the interest — a fact counsel will care about?
6. **Flag enforceability structurally — and stop there.** Note the features
   that commonly draw scrutiny (overbroad activity/geography/duration
   relative to the protectable interest, no consideration, application to
   low-level roles, bans in certain jurisdictions), and route every
   enforceability determination to counsel in the governing jurisdiction.
   MUST NOT predict "this will/won't hold up".
7. **Rank and hand off.** Material issues ranked; negotiation asks
   (narrowing activity, carve-outs for prior clients, shorter duration,
   compensation during restriction) to `contract-negotiation-strategy`.

## Output Format

```markdown
# Restrictive covenants review: <agreement> (context: employment/contractor/sale/commercial)
## Jurisdiction (stated / MISSING — required for any enforceability discussion)
## Covenants found
| Type | Restricted activity (as defined) | Geography | Duration | Trigger | Binds/Protects | § |
## Definitional-bite findings (vagueness, moving-target definitions)
## Consideration & conditions (incl. compensation during restriction, equity forfeiture)
## Practical consequence (restricted party's real options / beneficiary's real protection)
## Structural enforceability flags (→ counsel in governing jurisdiction; no prediction)
## Ranked issues & negotiation directions
## Counsel-required items + information needed
```

## Quality Checklist

- [ ] Each covenant type analyzed separately with full parameters.
- [ ] Solicit-vs-hire and solicit-vs-accept distinctions preserved.
- [ ] Vague/moving-target definitions flagged with their consequence.
- [ ] Consideration and restriction-period compensation checked.
- [ ] Context (employment vs sale-of-business) reflected in the analysis.
- [ ] Jurisdiction obtained or its absence flagged as blocking.
- [ ] No enforceability prediction; counsel routing explicit.

## Failure Conditions

- **Enforceability prediction:** "this noncompete is unenforceable" /
  "will hold up" — the cardinal failure; jurisdiction-specific counsel work.
- **Covenant blending:** analyzing noncompete and nonsolicits as one clause,
  missing their different scopes.
- **Parameter skim:** reporting "2-year noncompete" without the activity
  definition and geography that determine its reach.
- **Trigger blindness:** missing that the covenant applies even on
  termination without cause, or attaches to equity forfeiture.
- **Context flattening:** applying employment-covenant instincts to a
  sale-of-business covenant or vice versa.
- **Jurisdiction-free analysis** presented as complete.
- **Escalate to counsel** always for enforceability; urgently when the
  client is about to accept a role/deal in reliance on a covenant being
  "probably fine", or a dispute is already brewing.

## Related skills

- `confidentiality-data-protection-review` — the NDA companion protecting
  the same interests.
- `equity-incentive-review` — forfeiture-for-competition equity terms.
- `worker-classification-review` — covenants bearing on classification.
- `contract-negotiation-strategy` — narrowing asks.
