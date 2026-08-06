---
name: explain-for-audience
description: Calibrates a technical explanation to the altitude a specific audience needs — how much detail, which vocabulary, what framing, and what to leave out — across six roles from developer to VP of product, closing with a "so what" matched to that role's concerns. Use when explaining code, a design, a plan, an incident, or a tradeoff to a developer, tech lead, engineering manager, director of engineering, CTO, director of product, or VP of product, or when an explanation landed wrong and needs re-pitching. Not for structuring a high-stakes decision, status, or bad-news message to a nontechnical decision-maker (stakeholder-communication), writing durable technical artifacts like READMEs, ADRs, or runbooks (technical-documentation), or coaching an engineer's growth (mentoring-technical-leadership).
---

# Explain for Audience

## Purpose

Pitch a technical explanation at the altitude its recipient can act from.

**Governing principle: the right explanation is defined by what the listener can
do with it, not by what is true about the system.** Every fact in this skill's
output is accurate at every altitude — the variable is which facts survive, in
whose vocabulary, and what they are framed as. A correct explanation aimed at the
wrong altitude fails exactly as completely as a wrong one, and costs more, because
it is hard to argue with and easy to nod along to.

Misaligned explanations waste time, stall decisions, and erode trust in the
explainer's judgment — an engineer who hears business abstractions concludes you
do not know the details, and an executive who hears implementation mechanics
concludes you cannot see the point.

## Inputs

- **What to explain** — the code, design, plan, incident, or tradeoff.
- **The audience's role.** If it was not given, ask. Guessing the persona is the
  one error that invalidates everything downstream, because every subsequent
  choice inherits it.
- **The goal** — what this person needs to decide, do, or understand afterward.
  An explanation with no goal has no stopping condition and drifts toward
  completeness, which is the wrong target for every persona above developer.
- **Their actual fluency**, where it diverges from the title. Titles are a
  starting hypothesis, not a fact: plenty of VPs of product read code, and plenty
  of directors of engineering have not in years. Calibrate to the person when you
  have evidence, to the role when you do not.

## Audience personas

| Role | Cares about | Vocabulary | Frame as | Omit |
|---|---|---|---|---|
| **Developer / Engineer** | Correctness, implementation, APIs, edge cases, tradeoffs, performance | Technical terms, exact names, stack-specific patterns | How it works, why this approach over alternatives, what to watch out for | Business context, unless it explains a constraint |
| **Engineering Manager / Tech Lead** | Team impact, scope, risk, maintainability, velocity, dependencies | Mostly technical, light business framing | What changes, what breaks, how long, who owns it, what could go wrong | Low-level implementation, unless it drives a risk or an estimate |
| **Director of Engineering** | Technical strategy alignment, cross-team dependencies, hiring and resourcing, debt vs. velocity, reliability | System-level, org-aware, some business | Architectural implications, org impact, what this unblocks or forecloses | Line-level code; keep to system and team effects |
| **CTO** | Strategic fit, build-vs-buy, scalability ceiling, security posture, vendor risk, what it enables in 2–3 years | Systems, capabilities, and risks — not code | Decision context (what we chose, why, what we gave up), strategic upside, key risks | Implementation mechanics; lead with the so-what |
| **Director of Product** | What the change makes possible, timeline, user impact, delivery dependencies, what is and isn't feasible | Capabilities, user flows, timelines, constraints; minimal jargon | What users can now do, what changed for them, what we can or can't build next | How it works internally, unless it gates a product decision |
| **VP of Product / CPO** | Business outcomes, competitive positioning, resource tradeoffs, roadmap fit, risk to commitments | Business outcomes, user value, market position, cost, timeline | What this means for the product and the business, what it costs to do or not do | All technical mechanics; translate every technical fact into a business consequence |

The table is a starting altitude, not a script. Two adjacent personas often want
the same facts in different frames — a tech lead and a director of engineering
both need to know a migration is risky, one to plan the work and one to plan the
quarter.

## Procedure

1. **Identify the persona.** Ask if it was not given.
2. **Identify the goal** — the decision, action, or understanding this must
   produce. Write it down before drafting; it is the stopping condition.
3. **Validate the persona assumption before drafting.** Ask what would help
   most, or what decision they need to make. This is the cheapest step and the
   highest-leverage one: everything downstream inherits this guess, and a
   thirty-second question beats a well-crafted explanation of the wrong thing.
   Where asking is not possible, state the assumption in the output so the reader
   can correct it.
4. **Read the source material** — the code, plan, doc, or description. Calibrating
   an explanation of something you have not read produces confident vagueness,
   which every persona detects and only some will say so.
5. **Select the altitude** from the persona table.
6. **Draft using that persona's framing, vocabulary, and omissions.** Length and
   format follow the audience: executives get a headline and bullets, developers
   get prose and specifics.
7. **Close with a "so what"** in one sentence, matched to what that role cares
   about. MUST NOT end on "and that's how it works" — the implication is the part
   that makes the explanation actionable, and it is the part most often dropped.
8. **If a decision is needed, name it and recommend.** State what must be decided
   and what you would do. A menu with no recommendation pushes the judgment back
   onto someone with less context than you.
9. **Self-check** against the Quality Checklist.

## Output Format

```markdown
**Audience:** <role — and the assumption, if it was not confirmed>
**Goal:** <what they need to do, decide, or understand>

**Explanation**
<calibrated content; length and format matched to the persona>

**So what:** <one sentence, in this role's terms>

**Decision needed** *(if applicable)*
<what must be decided, and your recommendation>
```

## Quality Checklist

- [ ] Persona identified, and the assumption validated or stated as unconfirmed.
- [ ] Goal named before drafting.
- [ ] Source material actually read.
- [ ] Vocabulary matches what that role uses day-to-day.
- [ ] The explanation answers the question that role would actually ask.
- [ ] Low-value detail for this audience cut, not merely shortened.
- [ ] Closes with a "so what" in their terms.
- [ ] Any needed decision named, with a recommendation.
- [ ] No jargon the audience must translate before they can act.
- [ ] Nothing simplified into inaccuracy — see the last failure condition.

## Failure Conditions

Each carries its recognition cue — the observable signal that you have already
committed it.

- **Code vocabulary to a nontechnical audience.** Implementation terms with
  product or executive audiences who need capabilities and implications.
  *Recognition:* your explanation uses "API", "async", "cache", "race condition"
  to someone who never uses those words.
- **Business abstractions to engineers.** "Simplifies operations", "improves
  efficiency", hand-waving where specifics and tradeoffs are needed.
  *Recognition:* the engineer asks "but what actually changes?" or "what's the
  performance impact?"
- **Missing so-what.** Facts stated with no implication for *that person*.
  *Recognition:* it ends with "and that's how it works" rather than "so you can
  decide X".
- **One-size-fits-all.** Identical content for every audience. *Recognition:* you
  sent the same text to an engineer and a director, and one of them ignored it.
- **Over-explaining upward.** Implementation detail and low-level tradeoffs where
  strategic fit and key risks in two sentences were needed. *Recognition:* "I
  just needed a yes or no."
- **Under-explaining downward.** Glossing over alternatives, constraints, or
  failure modes with engineers who will spot the gap. *Recognition:* "okay, but
  what about X?" — a case they would have caught and you skipped.
- **Simplifying into inaccuracy.** Simplify the expression, never the truth. An
  analogy that distorts is worse than the jargon it replaced, because the
  audience now confidently believes something false and will repeat it.
- **Escalate / stop** when: the persona cannot be determined and nobody can be
  asked (state the assumption explicitly and offer a second framing rather than
  guessing silently); the decision genuinely requires technical depth the
  audience must engage with (bring in the right people rather than
  over-simplifying a critical call); or you do not actually know the answer
  (say so — improvised confidence at any altitude is the failure that costs
  the most later).

## If your audience pushes back

| They say | What went wrong | Fix |
|---|---|---|
| "That's too much detail" | You targeted an executive and addressed them like an engineer | Ask what decision they need to make; reframe to two sentences plus bulleted context |
| "I need specifics, not hand-waving" | You talked down, or assumed they'd accept a constraint unexplained | Show the tradeoff explicitly — X is faster, Y is cheaper, we chose Y because Z |
| "I don't understand what this means for us" | You skipped the so-what | Close with the implication for *that* role: what to do, decide, or understand next |

Pushback is data about the persona, not about the content. Re-calibrate the
altitude before rewriting the substance — the facts are usually fine.

## Related skills

- `stakeholder-communication` — owns the *structure and honesty* of a high-stakes
  message to a nontechnical decision-maker: bottom line first, options as
  tradeoffs, honest ranges, no buried risk, a specific ask. This skill owns the
  *altitude*. They compose: pick the altitude here, structure the consequential
  message there. Use that one when the message is a decision ask, a status
  update, an incident, or bad news; use this one when the task is landing an
  explanation at the right level.
- `technical-documentation` — durable written artifacts for technical readers
  (README, ADR, API reference, runbook). This skill is for the explanation, not
  the document.
- `mentoring-technical-leadership` — when a developer or tech lead needs the
  reasoning and tradeoffs behind your judgment in order to grow, not just the
  answer.
- `ceo-review` / `cfo` — supply the business framing when a VP-of-product or CTO
  explanation needs to land in money terms rather than capability terms.
- `technical-planning-estimation` / `engineering-risk-analysis` — supply the
  estimates and risks that get translated at whatever altitude is chosen.

## Measuring this skill

`evaluations/` holds the activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. The characteristic failure is **single-altitude
output**: a competent, accurate explanation delivered at the explainer's own
default level regardless of who asked. It is hard to score because the output is
never wrong, only mispitched — so the suite pairs the same source material across
two personas and scores whether the two outputs actually differ in vocabulary and
omissions, rather than in length alone.
