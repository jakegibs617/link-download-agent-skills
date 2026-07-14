---
name: mentoring-technical-leadership
description: Guides another engineer's growth or a technical decision through teaching, feedback, and delegation that build the other person's capability — asking before telling, calibrating challenge to level, and preserving ownership. Use when helping someone debug/design/grow rather than doing it for them, giving technical feedback, or shaping a team's technical direction. Not for producing the artifact yourself (the specialist skills) or explaining decisions to nontechnical stakeholders (stakeholder-communication).
---

# Mentoring and Technical Leadership

## Purpose

Increase another engineer's (or a team's) capability through an interaction —
so they can solve the next instance of the problem without you — rather than
just producing the answer. The deliverable is their growth and a sound
outcome, not your solution.

## When this skill applies vs. just solving it

Use this skill when the goal includes the *person's* development or ownership:
a teammate stuck on a bug, a design review of someone's proposal, feedback on
work, coaching a decision. When the user wants the artifact produced directly
and no growth goal exists, use the relevant specialist skill instead — MUST
NOT turn a "just fix this" request into a Socratic seminar.

## Inputs

- Who you're helping and their level: what they know, where their edge is,
  and whether this is a learning moment or a deadline-critical bail-out
  (the calculus differs — sometimes you just unblock them).
- The technical situation (the bug, design, decision).
- The relationship context: is direct feedback welcome, is this a report/
  peer/senior, what ownership do they hold.

## Procedure

1. **Diagnose the person, not just the problem.** Where are they actually
   stuck — knowledge, approach, or confidence? The intervention differs.
   MUST calibrate: a struggling junior needs different support than a
   senior second-guessing. Match challenge to just above their current
   level (productive struggle, not drowning or boredom).
2. **Ask before telling.** Draw out their current thinking with real
   questions ("what have you ruled out?", "what would you expect if...")
   before supplying answers. This diagnoses their model and builds the
   skill of reasoning through it. But time-box it — when they're genuinely
   stuck or the deadline is real, switch to teaching directly. Socratic
   questioning past its usefulness is just withholding.
3. **Teach the transferable thing.** Aim the lesson at the pattern, not just
   this instance: the debugging method, the design principle, the heuristic —
   so it generalizes. Point to how you'd approach it, not just what the
   answer is.
4. **Preserve their ownership.** If it's their task/design/decision, they
   keep the pen. Offer options and tradeoffs, let them choose, and let them
   own reversible mistakes (that's how judgment forms) — while catching the
   irreversible or high-blast-radius ones. MUST distinguish "I'd do it
   differently" (let them) from "this will cause an outage" (intervene).
5. **Give feedback that can be acted on.** Specific, behavioral, and kind:
   what you observed, its impact, and a concrete alternative. Separate
   preference from correctness. Praise the reasoning, not just the result.
   MUST NOT dress up a real correctness/safety problem as an optional
   suggestion — clarity is kindness when stakes are real.
6. **For team-level direction:** build alignment through shared principles
   and rationale, not decree; make the reasoning visible so people can apply
   it themselves; and model the standards (thoroughness, honesty about
   uncertainty) you want propagated. Influence scales through others'
   understanding, not through being the bottleneck.
7. **Close the loop on growth.** Where appropriate, name what they did well
   and the one thing to work on next — a growth edge they can act on, not a
   list that overwhelms.

## Output Format

Usually conversational, not a document. Structure the interaction as:

```markdown
## (Internal framing) Person's level and where they're stuck
## Questions to draw out their thinking (asked, not front-loaded with answers)
## The transferable lesson (pattern, not just this instance)
## Ownership: what they decide vs. what I'd flag as must-fix
## Feedback: observed → impact → concrete alternative (if feedback is the task)
## Growth edge: one thing to build next
```

## Quality Checklist

- [ ] Diagnosed where the person is stuck (knowledge/approach/confidence).
- [ ] Asked before telling — but didn't withhold past usefulness/deadline.
- [ ] Taught the transferable pattern, not only the one answer.
- [ ] Preserved ownership; let reversible mistakes stand, caught irreversible ones.
- [ ] Feedback specific and behavioral; correctness not disguised as preference.
- [ ] Challenge calibrated to just above their level.

## Failure Conditions

- **Just doing it for them:** solving the problem and handing it over,
  teaching nothing — the default failure that feels helpful and isn't.
- **Socratic overkill:** questioning a genuinely stuck or time-pressed person
  who needs a direct answer.
- **Ownership theft:** taking the pen on someone else's task, or overriding a
  reasonable reversible choice because you'd do it differently.
- **Preference-as-mandate / mandate-as-preference:** conflating "I prefer" with
  "this is wrong", in either direction — the dangerous version is softening a
  real safety problem into a suggestion.
- **Uncalibrated challenge:** drowning a junior or boring a senior.
- **Escalate / stop** when: the person is being set up to fail by
  circumstances outside the interaction (surface the systemic issue); a
  performance problem exceeds mentoring (a management conversation, not a
  coaching one); or you're asked to endorse a decision you believe is a
  genuine safety/correctness error (say so plainly — this skill does not
  mean agreeing to keep the peace).

## Related skills

- The specialist skills (`debugging-root-cause-analysis`, `first-principles-
  design`, `code-change-review`, etc.) — for producing the artifact directly
  when growth isn't the goal.
- `stakeholder-communication` — influencing/explaining to nontechnical
  audiences.
- `knowledge-transfer-verification` — confirming understanding actually landed.
