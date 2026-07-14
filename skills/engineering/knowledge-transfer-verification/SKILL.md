---
name: knowledge-transfer-verification
description: Verifies that a human actually understands implemented or explained work — probing for genuine comprehension of the why and the failure modes, not surface acknowledgment, and closing the specific gaps found. Use after delivering a nontrivial implementation, handing off ownership, or explaining a system someone must now maintain or operate. Not for teaching a stuck engineer (mentoring-technical-leadership) or writing the reference itself (technical-documentation).
---

# Verifying That Humans Understand Implemented Work

## Purpose

Confirm — with evidence, not a nod — that the person who now owns, maintains,
or must operate the work genuinely understands it: what it does, why it's
built this way, how it fails, and how to change it safely. Then close the
specific gaps that verification exposes.

## Why this skill exists

"Makes sense" and "yep, got it" are not comprehension. Unverified handoffs
produce the 3am outage where the on-call owner can't operate the system they
"understood", or the next change that breaks an invariant nobody knew was
load-bearing. This skill treats understanding as a claim to be tested.

## Inputs

- The work and the person: what was implemented/explained, who must now own
  it, and what they'll need to do with it (extend, operate, debug, review).
- The stakes: what the cost is if their understanding is wrong (drives how
  rigorously to verify). Low-stakes handoffs need a light touch; a solo
  on-call owner of a payment system needs real verification.
- The critical knowledge: the invariants, failure modes, and non-obvious
  decisions that matter most for their job — verify these, not trivia.

## Procedure

1. **Define what they actually need to understand for their job.** Not
   everything — the load-bearing parts: the why behind key decisions, the
   invariants that must not break, the failure modes they'll face, and the
   safe-change boundaries. MUST target verification at what their role
   requires, not an exhaustive quiz.
2. **Probe for understanding, don't ask if they understand.** Replace "does
   that make sense?" (which invites a reflexive yes) with tasks that can
   only be done with real comprehension: "walk me through what happens when
   X fails", "if you needed to add Y, where would you start and what would
   you be careful of?", "why did we do it this way instead of Z?". MUST use
   application/explanation prompts, not yes/no checks.
3. **Listen for the difference between recall and understanding.** Repeating
   your words back is recall; explaining the why in their own words,
   predicting a consequence you didn't state, or correctly reasoning about a
   novel case is understanding. Surface-fluency that collapses on a "what
   if" is the gap to catch.
4. **Probe the failure modes and edges specifically.** People absorb the
   happy path and miss the failure handling — which is exactly what they'll
   need at 3am. MUST verify they can reason about what breaks it and what to
   do, not just what it does when healthy.
5. **Find the gaps precisely.** When a probe reveals a hole, locate exactly
   what's missing — a specific decision's rationale, a failure mode, an
   invariant — rather than concluding "they don't get it". Precise gaps are
   closeable.
6. **Close the gap and re-verify.** Fill the specific hole (explain, or point
   to `technical-documentation`/`mentoring-technical-leadership` as fits),
   then re-probe that spot — closing a gap you don't re-check is assuming the
   fix worked. Loop until the job-critical understanding is demonstrated.
7. **Make it safe to not-understand.** Verification MUST NOT feel like an
   exam that punishes gaps — that produces false "I got it"s, the exact
   failure it's meant to prevent. Frame it as jointly de-risking the handoff;
   reward surfaced confusion.

## Output Format

Usually an interaction; when a record is needed:

```markdown
## Handoff verification: <work> → <owner>
## Job-critical understanding required (the targets)
## Probes used and what they revealed (understood / recall-only / gap)
## Gaps found (specific: which decision/failure-mode/invariant)
## Gaps closed and re-verified
## Residual risks (what remains unverified and why) + follow-up owner
```

## Quality Checklist

- [ ] Verification targeted at what the person's role requires, not trivia.
- [ ] Probes were application/explanation tasks, not yes/no checks.
- [ ] Recall distinguished from genuine understanding.
- [ ] Failure modes and edges probed, not just the happy path.
- [ ] Gaps located precisely, then closed and re-verified.
- [ ] Psychological safety preserved so gaps surface honestly.

## Failure Conditions

- **The reflexive yes:** accepting "makes sense" as verification — the core
  failure this skill exists to prevent.
- **Recall mistaken for understanding:** satisfied by the person parroting
  your explanation back.
- **Happy-path-only verification:** never probing failure modes, leaving the
  owner unable to operate under stress.
- **Exam anxiety:** a interrogation that pressures false confidence and
  hides the real gaps.
- **Gap-close without re-check:** explaining the missing piece and assuming
  it landed.
- **Over-verification:** quizzing trivia irrelevant to their job, wasting
  time and signaling distrust.
- **Escalate / stop** when: verification reveals the person can't yet own the
  work safely and the gap is too large to close in the handoff (surface it —
  the handoff isn't ready, don't rubber-stamp it); the missing knowledge is
  organizational (only one person knows, and they're leaving — that's a
  bus-factor risk to raise); or understanding is fine but the work itself is
  the problem (route to the relevant skill).

## Related skills

- `mentoring-technical-leadership` — teaching a gap once found (this verifies;
  that develops).
- `technical-documentation` — durable reference to close recurring gaps.
- `observability-incident-response` — the 3am scenario this verification
  prepares the owner for.
