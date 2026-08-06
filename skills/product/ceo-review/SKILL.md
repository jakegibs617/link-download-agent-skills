---
name: ceo-review
description: Assesses a project the way a CEO would — whether it should exist, whether it can make money, and what could kill it — grading five areas against repo evidence and leaving a dated ceo-report-YYYY-MM-DD.md behind with a funding verdict, a scoreboard, Top 3 Asks, and ranked existential risks. Use when the user wants a business-level or CEO-level assessment of a project's state, a stakeholder health report, or asks "is this worth building", "should we keep funding this", or "what would a CEO think". Not for modeling the numbers themselves (cfo), judging whether the vision statement commits to anything (strong-product-vision), brand and campaign creative (creative-director), or interface design (ui-ux-plan).
---

# CEO Review

## Purpose

Answer three questions a CEO actually asks: should this exist, can it make money,
and what kills it. Not how it is built — that is never the question at this
altitude, and a review that drifts into architecture has stopped being a CEO
review.

**Governing principle: evidence over optimism.** Every grade points at something
found in the repo, or explicitly at its absence. Missing information is a finding
in its own right, never a reason to skip an area — "no monetization numbers
anywhere in the repo" is one of the most useful sentences this review can produce.

**The deliverable is a dated file.** `ceo-report-YYYY-MM-DD.md` in the project
root, using today's date. The chat summary is a courtesy; the file is the review.
Dated rather than overwritten, because the value compounds — two reports three
months apart show whether anything actually moved, which no single report can.

## Inputs

- **The repo**, whatever is in it: PRD, vision, roadmap, README, design docs,
  prior reviews, and the code itself.
- **Git history**, as a momentum signal. Commit cadence, whether work is
  concentrated in one person, whether the last six weeks touched the core bet or
  the periphery. No git repo is itself worth noting.
- **Prior `ceo-report-*.md` files.** Read the most recent one and report what
  changed since. Never overwrite a previous dated report.
- **Any real numbers that exist** — users, retention, revenue, costs, budget,
  runway. Their absence is graded, not assumed around.

## Procedure

1. **Gather evidence.** Read the PRD, vision, roadmap, README, any architecture
   or design reviews, and recent git history. List what exists and what is
   missing. The missing list is half the review.

2. **Judge, don't summarize.** For each of the five areas, answer the questions
   in `references/considerations.md` and assign a grade. The PRD states what the
   team believes; this report states whether a CEO should believe it. A review
   that paraphrases the documents back has produced nothing.

   | Area | The question |
   |---|---|
   | Vision & product-market fit | Is the vision specific and falsifiable, and is there evidence anyone wants this? |
   | Business model & unit economics | How does this make money, and do the numbers plausibly work? |
   | Market & competition | How big is the market, who else is fighting for it, and why win now? |
   | Execution | Is there a credible path from today's reality to a shippable slice? |
   | Risk | What assumption, if wrong, kills the project? |

3. **Grade on evidence, not effort.**

   | Grade | Meaning |
   |---|---|
   | 🟢 | Evidence exists in the repo that this is thought through, AND the thinking survives scrutiny |
   | 🟡 | Partially addressed, or addressed with unvalidated assumptions doing load-bearing work |
   | 🔴 | Absent, contradictory, or the thinking does not survive scrutiny |

   A beautifully written PRD with no monetization numbers is still 🔴 on unit
   economics. Effort is not evidence.

4. **Stay at scoreboard depth on the money.** Grade business model and unit
   economics with a colour and a one-line reason, then stop. **MUST NOT** build
   the model — pricing, CAC, LTV, contribution margin, burn, runway, break-even,
   and scenario analysis all belong to `cfo`, which exists to do them properly.
   The CEO review says "the unit economics are unevidenced and that is the
   biggest hole"; the CFO review says what the numbers are. Producing a shallow
   version of the CFO's work here is worse than deferring: it looks answered.

5. **Form your own judgment.** An architecture review or a prior assessment in
   the repo is evidence to weigh, not a report to paraphrase. Where you disagree
   with an existing review, say so and say why.

6. **Write the report** to `ceo-report-YYYY-MM-DD.md` in the project root,
   following the Output Format exactly.

7. **Summarize in chat**: the verdict and the Top 3 Asks. Don't make the user
   open a file to learn the headline.

## Output Format

Written to `ceo-report-YYYY-MM-DD.md`, sections in this order:

```markdown
# <Project> — CEO Review, <date>
<one line: what this project is>

## CEO Verdict
<one blunt paragraph: overall health, the single biggest problem, and whether to
keep funding this. Takes a position.>

## Scoreboard
| Area | Grade | Reason (citing evidence, or its absence) |

## Vision & product-market fit
## Business model & unit economics
## Market & competition
## Execution
## Risk
<per area: current state grounded in named files, the gaps, and specifically what
would move this area to green>

## Top 3 Asks
<the three decisions or actions wanted this week. Each is an owner-shaped action
— "decide X", "spike Y", "write Z" — never a theme.>

## What could kill this
<existential risks ranked by likelihood × impact, each stated as a falsifiable
assumption>

## Changes since <prior report date>
<only when a prior ceo-report-*.md exists>
```

## Quality Checklist

- [ ] Dated file written to the project root; prior report read and diffed if one exists.
- [ ] All five areas graded, none skipped for missing information.
- [ ] Every grade cites a named file or an explicit absence.
- [ ] Verdict takes a position on continued funding — no hedge.
- [ ] Unit economics graded at scoreboard depth only, with modeling handed to `cfo`.
- [ ] Top 3 Asks are owner-shaped actions, not themes.
- [ ] Existential risks stated as falsifiable assumptions, ranked.
- [ ] No metric invented; every number traced to the repo or marked absent.
- [ ] Own judgment formed, not a paraphrase of an existing review in the repo.
- [ ] Chat summary carries the verdict and the Asks.

## Failure Conditions

- **Chat-only report.** The dated file is the deliverable. No file means the
  skill was not followed.
- **Restating the docs instead of judging them.** The most common failure. The
  PRD says what the team believes; this says whether to believe it.
- **Doing the CFO's job badly.** Inventing a CAC, sketching a break-even, or
  modeling pricing here. Grade it, name the hole, hand it over.
- **Deferring to an existing review.** An architecture review in the repo is one
  input. Paraphrasing it is not an assessment.
- **Inventing metrics.** No retention data, no CAC, no budget — say so and grade
  accordingly. Absence of data is a finding; a fabricated number is a defect.
- **Softening the verdict.** "Promising but needs work" gives a CEO nothing to
  act on. Take a position.
- **Grading the writing, not the business.** Well-documented is not viable.
- **Altitude drift.** Ruling on frameworks, schemas, or code quality. If a
  technical decision matters at this altitude it matters as a cost, a risk, or a
  timeline — never as a technical opinion.
- **Escalate / stop** when: the repo contains no product or business material at
  all and the review would be entirely invention (ask what to base it on); or the
  question is really "do the numbers work" rather than "should this exist" (hand
  straight to `cfo`).

## Related skills

- `cfo` — owns every number this review only grades: pricing, unit economics,
  cost structure, burn, runway, break-even, scenarios. This review issues the
  fund/kill verdict; `cfo` never does. Run `cfo` when this one grades business
  model 🟡 or 🔴 and the team needs to know how bad.
- `strong-product-vision` — judges whether the vision *statement* commits to
  anything falsifiable. This judges whether the business behind it works. A
  vision can pass all five of that skill's tests and still be a bad business.
- `creative-director` — owns brand, positioning copy, and campaign. Referenced
  here in one line, never re-litigated.
- `ui-ux-plan` — owns screens and flows. Same rule.
- `engineering-risk-analysis` — receives technical risks this review surfaces at
  business altitude, for scoring into an owned register.
- `stakeholder-communication` — carries this report to an audience that did not
  commission it.

## References

- [Full question list](references/considerations.md) — the questions behind each
  of the five focus areas.

## Measuring this skill

`evaluations/` holds the activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. Two failures are scored hardest: **paraphrase**
(restating the PRD rather than judging it) and **CFO absorption** (modeling the
numbers instead of grading and handing off). The suite includes a case whose repo
contains a polished PRD and no financial data at all, where the correct output is
🔴 on unit economics plus a handoff — not an invented model.
