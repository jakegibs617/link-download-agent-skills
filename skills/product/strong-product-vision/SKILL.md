---
name: strong-product-vision
description: Diagnoses a product vision against five falsifiability tests — inversion, swap, name-the-loser, one-thing, bet — then rewrites it into a contract sentence that names the user, the struggle, the unique capability, the accepted tradeoff, the success signal, and the non-goals. Always produces the rewritten draft, never only a critique. Use when writing or reviewing a vision, PRD vision section, mission statement, or positioning; when a vision sounds generic, targets "everyone", or reads like a feature list; or when the user asks "is my vision strong?" Not for judging whether the business behind the vision is viable (ceo-review), pricing and unit economics (cfo), brand lines and campaign creative (creative-director), or turning a settled vision into testable requirements (requirements-analysis).
---

# Strong Product Vision

## Purpose

Turn an aspiration into a set of falsifiable choices. A strong vision commits to
something that could turn out to be wrong; a weak one describes an outcome nobody
would argue with.

**Governing principle: if a statement's opposite is absurd, the statement says
nothing.** "Make fitness fun" — nobody sets out to make it miserable. "Empower
teams to do their best work" — as opposed to their worst. These are not visions,
they are the absence of one wearing a vision's grammar, and they survive review
because disagreeing with them feels like disagreeing with virtue.

**The deliverable is always a rewritten vision, never only a diagnosis.** A
critique that leaves the user holding five failed tests and no sentence has moved
them backwards — they now know it is broken and still cannot fix it. The rewrite
ships even when every slot in it is a `[TODO]`; the half-written sentence is what
makes the gaps concrete and assignable.

## Inputs

- **The vision as it currently exists** — a PRD section, a mission statement, a
  pitch paragraph, a README opener, or a sentence the user says out loud. If
  there is no written vision, the current de facto vision is whatever the feature
  list implies; reconstruct it and say you did.
- **The feature list or roadmap**, for the trace in Procedure 4. Features are
  where a vision's real commitments show — a vision that excludes nobody but a
  roadmap that serves one persona means the roadmap is the honest document.
- **Any evidence behind the claims** — research, comps, waitlists, community
  signal, usage data. Its absence is a finding, not a blocker.
- **Who the vision is for.** A vision written for a funding round and one written
  to decide what to build next quarter fail differently; the second is what this
  skill assumes unless told otherwise.

## Procedure

### 1. Run the five tests

Each test gets a pass/fail and, on failure, **the quoted sentence that failed
it.** Quoting is what makes the diagnosis arguable instead of a verdict.

| Test | Method | Fails when |
|---|---|---|
| **Inversion** | Reverse each claim | The reversal is absurd — nobody would claim the opposite, so the claim is filler |
| **Swap** | Replace the product name with the nearest competitor's | It still reads true — the vision describes the category, not this product |
| **Name-the-loser** | Name a user it will NOT serve, and a plausible feature it will NOT build | Neither can be named — it targets everyone, which is nobody |
| **One-thing** | Name the single experience that must be great in v1 | More than about three features are claimed as essential |
| **Bet** | State the riskiest assumption as a falsifiable bet, and how the MVP tests it | No bet is identifiable — it is a plan to exist, not a vision |

The swap test is the one teams argue with most and lose most often. Run it
literally: paste the competitor's name in and read the sentence aloud.

### 2. Fill the vision contract

> For **[specific person]** who **[concrete struggle]**, **[product]** is a
> **[category]** that **[unique capability]**. Unlike **[named alternative]**, we
> **[deliberate tradeoff we accept]**. We'll know it's working when
> **[measurable signal]**. We will NOT **[non-goals]**.

Every slot is REQUIRED. Fill what the material supports.

**MUST NOT invent facts about the user's market, users, or competitors to fill a
slot.** A fabricated `[named alternative]` or an invented `[measurable signal]`
produces a vision that reads finished and is founded on nothing — worse than the
generic one it replaced, because it is now confidently wrong. Where a slot cannot
be filled from the material, ask for that slot specifically, and if it goes
unanswered leave it as `[TODO: Q#]`.

A slot the user cannot answer **is the finding.** It names the work to do before
building, and it is more valuable than a filled slot would have been.

### 3. Write the rewritten draft

Produce the contract sentence with every fillable slot filled and the rest marked
`[TODO: Q#]`. This section appears **unconditionally** — including when every
slot is a TODO.

### 4. Trace the features

Map each feature to the contract slot it serves. Features mapping to no slot are
cut-or-park candidates for v1; say which. This is where a vision stops being a
document and starts making decisions — and where a team discovers that half the
roadmap serves a persona the vision does not name.

### 5. Self-check against the Quality Checklist.

## Output Format

```markdown
## Test results
| Test | Pass/Fail | Quoted evidence (on failure) |

## Slot questions
<one focused question per contract slot that cannot be filled from the material —
numbered, so the draft's TODOs can reference them>

## Rewritten Vision (draft)
<the contract sentence — REQUIRED, even when every slot is [TODO: Q#]>

## Feature trace
| Feature | Slot it serves | Verdict |
<unmapped features marked cut / park for v1>
```

## Quality Checklist

- [ ] All five tests run, each with a pass/fail.
- [ ] Every failure quotes the sentence that failed it.
- [ ] The swap test was run literally, with a named competitor.
- [ ] No slot filled with an invented market, user, competitor, or metric.
- [ ] Every unfillable slot has a specific numbered question.
- [ ] The rewritten draft is present — including when every slot is a TODO.
- [ ] Success signal is a named behavior or number, not "users love it".
- [ ] Non-goals are explicit and would actually disappoint someone.
- [ ] Every feature traced to a slot, or marked cut/park.

## Failure Conditions

- **Diagnosing without rewriting.** Five failed tests and no sentence. The most
  common failure, and the one that makes the skill feel harsh rather than useful.
- **Inventing the user's facts to finish the sentence.** A confident vision built
  on a fabricated competitor or an imagined retention number. Ask; unanswered
  slots are findings, not blanks to fill.
- **Adjectives as differentiation.** "Delightful", "seamless", "intuitive",
  "powerful" — none of these exclude anything. Only capabilities and accepted
  tradeoffs differentiate.
- **A vision that excludes no one.** If name-the-loser cannot be answered, the
  positioning does not exist yet, whatever the document says.
- **Success as sentiment.** "Users love it" is not a signal. Retention at a named
  interval, paid conversion, a specific repeated behavior — those are.
- **Grading the prose.** A well-written vision that fails the swap test is still
  a failure. Fluency is not commitment.
- **Escalate / stop** when: there is no vision and no feature list to reconstruct
  one from (ask for either); the user wants a tagline or a campaign line rather
  than an operating vision (hand to `creative-director`); or the vision is
  already validated and the real question is whether the business works (hand to
  `ceo-review`).

## Related skills

- `ceo-review` — judges whether the business behind the vision is viable and
  fundable. This skill judges whether the *statement* commits to anything. A
  vision can pass all five tests and still describe a business that cannot work.
- `creative-director` — owns the brand line, positioning copy, and campaign idea.
  This owns the operating vision the team builds against. The two rhyme and are
  not the same sentence: one is written for an audience, this one for a roadmap.
- `cfo` — receives the vision's monetization implications once the vision is
  settled.
- `ui-ux-plan` — consumes the settled vision as the binding constraint on
  personas and design pillars.
- `requirements-analysis` — turns the settled vision into testable requirements.
  Runs after this, never before: requirements derived from a vision that fails the
  swap test inherit its emptiness.

## Measuring this skill

`evaluations/` holds the activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. Two failures are scored hardest, in opposite
directions: **omitting the rewrite** (diagnosis only), and **fabricating slot
content** to make the rewrite look finished. The suite includes a case where the
material supports almost no slots, and the correct output is a draft that is
mostly TODOs.
