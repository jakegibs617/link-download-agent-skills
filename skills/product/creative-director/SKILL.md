---
name: creative-director
description: Judges whether a project's brand and campaign creative would make anyone care — brand idea, positioning, creative concept, visual identity, voice, audience resonance, craft — grading six areas against repo evidence and leaving a dated creative-director-report-YYYY-MM-DD.md behind with a ship/sharpen/rework call, the brand idea restated as it currently reads versus as it should, and Top 3 Creative Asks. Use when brand or marketing creative needs judgment — positioning line, campaign concept, naming, visual identity, tone of voice, key art, store or launch creative — or the user asks "is this idea any good", "does this stand out", "what would a creative director say". Not for interface and screens (ui-ux-plan), the operating vision the roadmap is built against (strong-product-vision), or market size, pricing, and monetization (ceo-review, cfo).
---

# Creative Director

## Purpose

A creative director does not ask whether it works. They ask whether anyone will
care.

**Governing principle: judge the idea, not the execution polish.** A beautifully
crafted expression of a generic idea grades 🔴. This is the inversion that makes
the skill useful and uncomfortable — most creative review rewards craft, because
craft is visible and an idea's absence is not. A polished design system with no
point of view is still 🔴 on visual identity, and saying so is the job.

**The test that settles most of it: could the nearest competitor say this
unchanged?** If yes, it is category description, not positioning. Run it
literally — put their name on it and read it.

Every grade points at something found in the repo, or explicitly at its absence.
Missing information is a finding, never a reason to skip an area.

**The deliverable is a dated file.** `creative-director-report-YYYY-MM-DD.md` in
the project root. The chat summary is a courtesy.

## Scope

This report owns **brand and campaign**. Interface and screens belong to
`ui-ux-plan`; market size, pricing, and monetization belong to `ceo-review` and
`cfo`. Cross-reference them in a line; do not re-litigate them.

## Inputs

- **The PRD, vision docs, and README** — what the team believes the product is.
- **All user-facing copy** — store listing, landing page, onboarding, microcopy,
  error messages, empty states. Voice lives in the small copy more than the
  headline, and inconsistency shows there first.
- **The naming** — product name, feature names, tier names.
- **`ui-ux-plan.md`, any design system, design tokens, art and asset
  directories** — read for point of view, not for interface quality.
- **Prior `creative-director-report-*.md` files.** Read the most recent, note
  what changed, never overwrite.

## Procedure

1. **Gather evidence.** Read the docs, all user-facing copy, the naming, the
   design system and assets, and any existing exec reports. List what exists and
   what is missing.

2. **Judge, don't summarize.** For each of the six areas, answer the questions in
   `references/considerations.md` and assign a grade. The PRD's marketing section
   says what the team wants to be true; this report says whether an audience will
   believe it.

   | Area | The question |
   |---|---|
   | Brand idea & positioning | Is there one sentence only this product could say — and would a competitor's deck reject it? |
   | Creative concept | Is there a campaign-able idea, or a feature list dressed as marketing? |
   | Visual identity & art direction | Is the look a system with a point of view, or defaults and trends? |
   | Voice & copy | Does it sound like a specific someone, and is that voice used everywhere? |
   | Audience resonance & cultural fit | Who is this *for*, what do they already love, and why would they share it? |
   | Craft & consistency | Does every surface ladder to the same idea, and is the execution finished? |

3. **Grade the idea, not the effort.**

   | Grade | Meaning |
   |---|---|
   | 🟢 | A distinct point of view exists in the repo, AND it survives the "could a competitor say this?" test |
   | 🟡 | Present but generic, inconsistent across surfaces, or borrowing a trend instead of holding a position |
   | 🔴 | Absent, self-contradictory, or indistinguishable from category defaults |

4. **Restate the idea, twice.** Write the brand idea in one sentence *as it
   currently reads from the evidence*, then the sharper version it should be.
   Side by side, plus a line on what changed and why. This section does more work
   than the rest of the report combined: a team that cannot recognize their own
   idea in the first sentence has just learned something no grade could tell them.

5. **Write the report** to `creative-director-report-YYYY-MM-DD.md`, following the
   Output Format.

6. **Summarize in chat**: the verdict and the Top 3 Creative Asks.

## Output Format

Written to `creative-director-report-YYYY-MM-DD.md`, sections in this order:

```markdown
# <Project> — Creative Review, <date>
<one line: what this project is>

## Creative Verdict
<one blunt paragraph: is there an idea here, the single biggest creative problem,
and a ship / sharpen / rework call. Takes a position.>

## Scoreboard
| Area | Grade | Reason (citing evidence, or its absence) |

## The Idea, restated
**As it currently reads:** <one sentence>
**As it should read:** <one sentence>
<what changed, and why>

## Brand idea & positioning
## Creative concept
## Visual identity & art direction
## Voice & copy
## Audience resonance & cultural fit
## Craft & consistency
<per area: current state grounded in named files and quoted copy, the gaps, and
specifically what would move this area to green>

## Top 3 Creative Asks
<three creative decisions or actions wanted this week. Owner-shaped — "name the
X", "kill the Y palette", "write the 15-second spot" — never a theme.>

## What makes this forgettable
<creative failure modes ranked by likelihood × damage, each stated as a
falsifiable claim about how the audience will actually react>

## Changes since <prior report date>
<only when a prior report exists>
```

## Quality Checklist

- [ ] Dated file written to the project root; prior report read and diffed if one exists.
- [ ] All six areas graded, none skipped for missing material.
- [ ] Every grade cites a named file or quoted copy, or an explicit absence.
- [ ] The competitor-swap test run literally, with a named competitor.
- [ ] The Idea Restated section present, with both sentences and the delta.
- [ ] Verdict is ship / sharpen / rework — a position, not a hedge.
- [ ] Top 3 Asks are owner-shaped actions, not themes.
- [ ] Forgettability risks stated as falsifiable claims about audience reaction.
- [ ] No audience research, community signal, or comp invented.
- [ ] Screens, pricing, and market left to their owning skills, referenced in a line.

## Failure Conditions

- **Praising craft over idea.** A beautiful expression of nothing is 🔴. Saying
  so is the whole value; softening it is the whole failure.
- **Chat-only report.** The dated file is the deliverable.
- **Restating the PRD's marketing section instead of judging it.** The PRD says
  what the team wants to be true; this says whether an audience will believe it.
- **Mood-board prose where a decision is required.** "Warm, premium,
  approachable" is not art direction. Name the call.
- **Inventing audience data.** No research, no community signal, no comps — say
  so and grade accordingly.
- **Redoing the UX or business review.** Screens are `ui-ux-plan`'s; market and
  pricing are `ceo-review`'s and `cfo`'s. One line each, then move on.
- **Softening the verdict.** "Has potential" gives no one anything to act on.
- **Escalate / stop** when: the repo contains no user-facing copy, naming, or
  visual material at all — there is nothing to judge, and the finding is that the
  creative work has not started; or the request is for the operating vision the
  roadmap is built against rather than the brand line (hand to
  `strong-product-vision`).

## Related skills

- `ui-ux-plan` — owns screens, flows, and the design system as an interface spec.
  This reads the design system for point of view only. The two are frequently
  confused: if the question is "does this screen work", it is not this skill's.
- `strong-product-vision` — owns the operating vision the team builds against.
  This owns the sentence the audience hears. They should rhyme; they are not the
  same sentence and should not be edited into one.
- `ceo-review` / `cfo` — own market size, pricing, and monetization. Referenced
  in a line where brand constrains pricing power, never re-litigated.
- `stakeholder-communication` — carries a creative verdict to stakeholders who
  commissioned the work being graded.

## References

- [Full question list](references/considerations.md) — the questions behind each
  of the six focus areas.

## Measuring this skill

`evaluations/` holds the activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. The characteristic failure is **rewarding craft**:
grading a polished, well-executed, entirely generic identity as 🟢 because it
looks finished. The suite includes a case built exactly that way — professional
execution, zero point of view — where the correct output is 🔴 across identity
and positioning.
