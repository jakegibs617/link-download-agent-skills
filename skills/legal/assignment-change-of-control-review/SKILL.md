---
name: assignment-change-of-control-review
description: Analyzes assignment, delegation, and change-of-control provisions — who can transfer the contract or their duties, what consents are required, what a "change of control" captures, and what happens (consent rights, termination triggers, acceleration) when ownership changes. Use to review anti-assignment clauses, M&A readiness of a contract, or CoC triggers. Not for the termination mechanics generally (term-termination-analysis) or equity acceleration terms themselves (equity-incentive-review), though both interact.
---

# Assignment and Change-of-Control Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Whether an
anti-assignment clause reaches a particular transaction structure is a
jurisdiction- and doctrine-specific question for counsel; this skill maps the
provisions and flags the questions.

## Purpose

Establish exactly how transferable this contract is — by assignment,
delegation, merger, or acquisition of a party — and what rights the other
side gains when a transfer or ownership change happens, because these
clauses sit dormant until a financing, reorganization, or exit, and then
they decide whether the deal (or the company sale) has a landmine in it.

## Layered output principle

Separate: (1) **what the clauses say** (cited), (2) **practical consequence**
(what transactions are blocked, consent-gated, or trigger rights), (3)
**risk** (asymmetries, M&A landmines, silent gaps), (4) **missing info**,
(5) **counsel needed** (doctrine on transaction structures, remedies for
violation).

## Inputs

- The assignment/CoC provisions and the whole agreement (termination,
  license grants, and exclusivity interact).
- Which party you represent and their plausible futures: fundraising,
  acquisition, reorganization, divestiture, IP transfer to an affiliate —
  the review is against these scenarios. MUST ask if unknown.

## Procedure

1. **Extract the anti-assignment architecture.** Who may/may not assign;
   consent standard (absolute discretion vs "not to be unreasonably
   withheld, conditioned, or delayed" — the qualifier is the substance);
   carve-outs (affiliates, successors, merger/asset-sale exceptions,
   assignment to acquirers of substantially-all assets); and whether the
   clause is mutual or one-sided. Check assignment of the *agreement* vs
   assignment of *rights* vs delegation of *duties* — many clauses cover
   only some of these; the gap is a finding.
2. **Determine what "assignment" captures — the CoC question.** Does the
   clause deem a change of control to BE an assignment (express CoC
   language)? If silent, whether a merger/stock-sale triggers a bare
   anti-assignment clause is a doctrine-and-structure question — flag for
   counsel, MUST NOT assert the answer. Extract any standalone CoC
   definition: ownership threshold, board control, direct/indirect,
   single-transaction vs creeping.
3. **Map what a trigger produces.** On assignment-without-consent or CoC:
   void transfer? breach? counterparty termination right (with what
   window)? fee acceleration? license termination? For licenses especially,
   check whether the license survives an acquisition of the licensee — an
   IP license that dies at acquisition is an M&A landmine. Coordinate
   termination mechanics with `term-termination-analysis` and equity
   acceleration with `equity-incentive-review`.
4. **Check the successor/binding language.** "Binding upon successors and
   permitted assigns" — does the contract bind and benefit successors, and
   does a permitted assignment release the assignor or keep it on the hook
   (novation vs assignment; secondary liability)?
5. **Run the client's scenarios.** For each plausible future (raise, sale,
   reorg, affiliate transfer): what does this contract require, block, or
   trigger? For a company with many contracts, this clause pattern is
   diligence-critical — flag consent requirements that would sit on an
   acquisition's critical path.
6. **Assess symmetry and leverage (separate layer).** One party freely
   assignable, the other locked, is leverage; a customer CoC-termination
   right against a vendor is exit optionality. Ranked issues; asks to
   `contract-negotiation-strategy`.

## Output Format

```markdown
# Assignment & change-of-control review: <contract>
## Anti-assignment architecture (who, consent standard, carve-outs, rights-vs-duties coverage, mutuality) [cited]
## CoC treatment (express CoC-as-assignment? standalone definition and thresholds? silence → counsel flag)
## Trigger consequences (void/breach/termination/acceleration; license survival on acquisition)
## Successor & release mechanics (binding language, assignor liability post-assignment)
## Scenario walk-throughs (client's plausible futures vs these clauses)
## Symmetry & leverage assessment (separate layer) + ranked issues
## Counsel-required items (doctrine on structures, remedies) + information needed
```

## Quality Checklist

- [ ] Consent standard extracted with its qualifier (or absence) preserved.
- [ ] Agreement-vs-rights-vs-duties coverage distinguished.
- [ ] CoC-as-assignment presence/absence identified; silence flagged for
      counsel, not resolved.
- [ ] Trigger consequences mapped, including license survival on acquisition.
- [ ] Assignor-release/novation question addressed.
- [ ] Client's plausible transactions walked against the clauses.
- [ ] Mutuality/asymmetry assessed; facts separate from leverage judgment.

## Failure Conditions

- **Silence resolution:** asserting that a merger does/doesn't trigger a
  bare anti-assignment clause — doctrine- and structure-specific; counsel's
  call.
- **Qualifier erasure:** reporting "assignment requires consent" without
  whether consent may be unreasonably withheld.
- **Landmine miss:** overlooking a license that terminates on the client's
  acquisition, or a consent right sitting on an exit's critical path.
- **Coverage blur:** not distinguishing assignment of rights from delegation
  of duties when the clause covers only one.
- **Scenario-free review:** analyzing the clause in the abstract with no
  reference to the client's plausible futures.
- **Escalate to counsel** when: a transaction is contemplated or in
  progress (structure-specific doctrine now matters); the clause's remedy
  (void vs breach) is outcome-determinative; or many contracts share the
  pattern in a diligence context.

## Related skills

- `term-termination-analysis` — CoC termination rights' mechanics.
- `equity-incentive-review` — CoC definitions driving acceleration.
- `ip-ownership-review` — license survival across transfers.
- `contract-negotiation-strategy` — carve-out and standard asks.
