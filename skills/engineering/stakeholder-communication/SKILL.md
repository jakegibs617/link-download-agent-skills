---
name: stakeholder-communication
description: Translates technical decisions, risks, tradeoffs, and status into terms a nontechnical audience can act on — leading with the decision and its business impact, framing options by consequence not implementation, and being honest about uncertainty. Use when explaining engineering work to execs, product, sales, customers, or cross-functional partners, or writing decision/status/incident comms for them. Not for engineer-to-engineer docs (technical-documentation) or coaching another engineer (mentoring-technical-leadership).
---

# Communicating Technical Decisions to Nontechnical Stakeholders

## Purpose

Get a nontechnical audience to understand what matters and decide or act
correctly — by leading with the outcome and its business impact, translating
mechanism into consequence, and representing uncertainty and risk honestly,
without either drowning them in detail or hiding the truth to sound reassuring.

## Inputs

- The audience and their stake: what decision they own, what they care about
  (cost, timeline, risk, customers, revenue), and their fluency. Different
  stakeholders need different framings of the same facts.
- The technical content: the decision/status/risk/tradeoff to convey, and
  what's actually certain vs. uncertain.
- The purpose: are you informing, seeking a decision, managing expectations,
  or delivering bad news? The structure follows the purpose.

## Procedure

1. **Lead with the answer and its impact.** First sentence: the decision,
   status, or ask, and what it means for what they care about ("we should
   delay launch two weeks; shipping now risks charging customers twice").
   MUST front-load the bottom line — the exec who reads only the first line
   should get the essential message. No build-up, no suspense.
2. **Translate mechanism into consequence.** Replace implementation with its
   business effect: not "the database isn't sharded" but "above ~10k orders/
   day the system slows and customers see errors". Use analogy only when it
   clarifies and doesn't distort. Jargon MUST be cut or defined in-line; if
   a technical term survives, it's because they need it, defined once.
3. **Frame options by their consequences, not their internals.** For a
   decision, present 2–3 options as tradeoffs the audience can weigh in
   their terms (cost, time, risk, customer impact) — with a clear
   recommendation and why. They're choosing between outcomes, not
   architectures. MUST make a recommendation, not just lay out a menu.
4. **Be honest about uncertainty and risk.** State confidence levels and
   ranges plainly ("2–3 weeks, likely 3" not "3 weeks"). MUST NOT project
   false certainty to sound competent, or bury a real risk to avoid a hard
   conversation — the credibility cost of a hidden risk surfacing later is
   far higher. Distinguish what you know from what you're estimating.
5. **Right-size the detail.** Give the level that supports the decision and
   no more; offer depth as available on request ("happy to go deeper on the
   why"), don't force it. Respect their time — a decision-maker's attention
   is the scarce resource.
6. **Match the register to the purpose.** Bad news: direct, own it, lead with
   impact and the plan, no burying. Status: what changed, what's next, what
   you need. Decision ask: the recommendation up top, the tradeoffs, the
   deadline. Anticipate the questions they'll actually ask (cost? when? risk
   to customers? what do you need from me?) and answer them preemptively.
7. **End with the specific ask or next step.** What you need from them, by
   when, or what happens next — never leave the action ambiguous.

## Output Format

Adapts to the medium (email, slide, verbal brief, doc), but structured as:

```markdown
## Bottom line (decision/status/ask + business impact) — first, always
## What this means for [what they care about]
## Options as tradeoffs (if a decision) + recommendation
## Certainty and risks (honest ranges; risks not buried)
## The ask / next step (specific, with a deadline)
## (Optional) Deeper detail available on request
```

## Quality Checklist

- [ ] Bottom line in the first sentence; readable if they stop there.
- [ ] Mechanism translated to business consequence; jargon cut or defined.
- [ ] Options framed by outcome, with an explicit recommendation.
- [ ] Uncertainty as honest ranges; no false certainty, no buried risk.
- [ ] Detail right-sized to the decision; depth offered not forced.
- [ ] Specific ask/next step with a deadline.

## Failure Conditions

- **Bottom-line burial:** making them read three paragraphs of context to
  find the point.
- **Jargon fog:** unexplained technical terms that make them nod without
  understanding.
- **False reassurance:** projecting certainty you don't have, or omitting a
  risk to keep the meeting smooth — the highest-cost failure when it surfaces.
- **Menu without a recommendation:** listing options and making the
  nontechnical audience pick blind.
- **Detail dump:** the architecture lecture a decision-maker didn't ask for.
- **Accuracy sacrificed for simplicity:** a simplification that's actually
  wrong — simplify the expression, never the truth.
- **Escalate / stop** when: the honest message is one you're being pressured
  to soften into something misleading (hold the line — surfacing the real
  risk is the job); the decision genuinely requires technical depth the
  audience must engage with (bring in the right people rather than
  over-simplifying a critical call); or you don't actually know the answer
  they need (say so, don't improvise confidence).

## Related skills

- `explain-for-audience` — owns the *altitude*: how much detail, whose
  vocabulary, what to omit, across six roles including technical ones. This
  skill owns the *structure and honesty* of a consequential message — bottom
  line first, options as tradeoffs, honest ranges, no buried risk, a specific
  ask. They compose: pick the altitude there, structure the message here. Use
  that one when the task is landing an explanation at the right level; use this
  one when the message is a decision ask, a status, an incident, or bad news.
- `technical-documentation` — for technical (engineer) audiences instead.
- `mentoring-technical-leadership` — coaching/influencing other engineers.
- `technical-planning-estimation` / `engineering-risk-analysis` — supply the
  estimates and risks this communicates; this skill translates them.
