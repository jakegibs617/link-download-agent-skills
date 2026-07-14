---
name: worker-classification-review
description: Reviews an engagement's terms against employment-vs-independent-contractor classification factors — control, integration, exclusivity, tools, payment structure, benefits language — surfacing misclassification risk signals in the contract and the described working reality. Use when reviewing contractor/consulting agreements or assessing classification exposure. Not a classification determination (jurisdiction-specific tests differ; counsel decides), not covenant analysis (restrictive-covenants-review), and not IP terms (ip-ownership-review).
---

# Employment / Independent-Contractor Classification Review

## Legal disclaimer

This skill produces structured analysis to support a human reviewer. It is
**not legal advice** and does not replace a licensed attorney. Classification
tests differ by jurisdiction and by purpose (tax, labor law, benefits), and
the determination turns on facts, not labels — final classification judgments
belong to counsel and, ultimately, to regulators/courts.

## Purpose

Surface every signal in the contract (and the described working arrangement)
that bears on employment-vs-contractor classification, organized by the
factor families the common tests share — so the client sees the risk profile
clearly and counsel gets an organized factual record, without this skill
pretending to make the call.

## Layered output principle

Separate: (1) **what the contract says / the facts described** (cited),
(2) **which classification factor it bears on and in which direction**,
(3) **risk** (accumulated signals, contradictions between contract and
reality), (4) **missing facts**, (5) **counsel required** — the determination
itself is always counsel's.

## Inputs

- The agreement, and — critically — the described actual working arrangement
  (the label and the reality often diverge; the reality controls). MUST ask
  about actual practice where the contract is silent or the risk turns on it.
- The jurisdiction(s) and the purpose lens if known (tax vs labor vs
  benefits), noting different tests may apply.
- Which side the client is (company or worker) — the exposure differs
  (back taxes/penalties/benefits vs lost protections).

## Procedure

1. **Never rest on the label.** The recital "Contractor is an independent
   contractor" is a factor of near-zero weight everywhere. MUST analyze the
   substance regardless of the label, and say so.
2. **Extract the control signals** — the heart of most tests: who directs
   *how* the work is done (methods, hours, location), required attendance/
   schedules, supervision/reporting cadence, required training, whether the
   company can assign additional tasks at will, and rights to control that
   exist on paper even if unexercised.
3. **Extract the economic-reality signals:** payment structure (hourly/
   salary-like retainer vs per-project/deliverable), who provides tools/
   equipment/expenses, opportunity for profit or loss, worker's investment,
   whether the worker can subcontract/delegate, and exclusivity (full-time
   for one company vs a genuine independent business with other clients).
4. **Extract the relationship/integration signals:** whether the work is
   core to the company's business, engagement duration and indefiniteness,
   benefits-like perks (PTO, insurance, equipment stipends), termination
   at-will vs project-completion, title/email/org-chart integration, and
   invoicing mechanics.
5. **Compare contract to described reality.** A contract drafted for
   independence wrapped around an employee-shaped reality is the classic
   exposure — flag every contract-vs-practice contradiction explicitly
   (e.g. contract says "sets own hours", client says 9–5 required).
6. **Organize, weigh direction, don't verdict.** Present each signal with
   the direction it points (toward employment / toward independence /
   neutral) and note density and pattern — MUST NOT total them into a
   classification verdict; different jurisdictions weigh differently
   (some apply strict ABC-style tests where one prong can decide —
   note this variability and route to counsel).
7. **State the stakes for the client's side** (generally: companies face
   back-taxes, penalties, benefits, and wage claims; workers face lost
   protections and benefits) and the immediate hygiene fixes to the
   *contract* — while being clear that fixing paper doesn't fix a
   misaligned reality.

## Output Format

```markdown
# Worker-classification review: <engagement> (client: company/worker)
## Jurisdiction & test lens (stated / MISSING) — determination is counsel's
## Label vs substance note
## Signal analysis
| Signal (cited: contract § or stated fact) | Factor family (control/economic/relationship) | Direction |
## Contract-vs-reality contradictions (flagged individually)
## Pattern summary (density and direction of signals — NOT a verdict)
## Stakes for the client's side
## Contract-hygiene fixes (and their limits vs reality)
## Missing facts needed + counsel-required determination
```

## Quality Checklist

- [ ] Label explicitly discounted; substance analyzed.
- [ ] Control, economic-reality, and relationship families each covered.
- [ ] Actual practice asked about / compared where the contract is silent.
- [ ] Contract-vs-reality contradictions flagged individually.
- [ ] Signals given direction, not totaled into a verdict.
- [ ] Jurisdiction/test variability stated; determination routed to counsel.
- [ ] Client-side stakes and paper-vs-reality limits stated.

## Failure Conditions

- **Verdict rendering:** "this is misclassification" / "you're safe" — the
  cardinal failure; the tests are jurisdiction- and fact-specific.
- **Label deference:** treating the independent-contractor recital as
  meaningful protection.
- **Paper-only review:** analyzing the contract while ignoring the described
  (or unasked-about) working reality.
- **Single-factor tunnel:** deciding everything on one signal when the tests
  are multi-factor patterns (while missing that some tests DO have decisive
  prongs — variability itself must be flagged).
- **Hygiene overpromise:** implying contract edits cure an employee-shaped
  reality.
- **Escalate to counsel** always for the determination; urgently when an
  audit/claim is pending, when the arrangement spans jurisdictions, or when
  the signal pattern is dense in the risky direction and the client is
  scaling the arrangement to many workers.

## Related skills

- `restrictive-covenants-review` — covenants whose presence is itself a
  classification signal.
- `ip-ownership-review` — classification affects IP default rules.
- `equity-incentive-review` — equity grants to contractors raise their own
  flags.
- `regulatory-compliance-review` — broader regulatory exposure.
