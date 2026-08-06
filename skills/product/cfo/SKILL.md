---
name: cfo
description: Translates a product into money terms and makes every financial assumption explicit — revenue model, unit economics, cost structure, burn and runway, pricing, break-even and scenarios, ranked financial risks — leaving a dated cfo-report-YYYY-MM-DD.md behind in which every figure is labeled [sourced] or [estimate]. Use when a project, PRD, business plan, or pitch needs financial scrutiny, or the user asks about monetization, pricing, unit economics, costs, burn, runway, funding, or "is this viable as a business?" Not for the keep-funding-it verdict (ceo-review), judging the vision statement (strong-product-vision), brand and campaign (creative-director), or writing code or changing the product plan.
---

# CFO Review

## Purpose

Turn the product into money terms, and make every financial assumption explicit
so viability is defensible instead of vibes.

**Governing principle: every figure carries its provenance.** Each number in the
report is labeled **[sourced]** — from the input documents or the user, with the
location cited — or **[estimate]**, with the basis stated (a comp, a benchmark, or
the reasoning). **An unlabeled number is a defect**, because a reader cannot tell
which figures are load-bearing facts and which are the analyst's guesses, and
those two things carry entirely different weight in a decision.

A range with stated reasoning beats an exact fabricated number every time.
Precision that is not earned is worse than an honest range, because it invites
confidence the underlying evidence cannot support.

**The deliverable is a dated file.** `cfo-report-YYYY-MM-DD.md` in the project
root, using today's date. The review exists in the file; chat carries only the
verdict and the top recommendations.

**This skill ends at the reviewed report.** It never writes code and never
rewrites the product plan. Product and engineering changes appear only as
recommendations tied to numbered financial findings.

## Inputs

- **The product material** — PRD, business plan, pitch, pricing or monetization
  docs, prior reviews (architecture, UX, CEO), and the product code.
- **Prior `cfo-report-*.md` files.** Read the most recent and note what changed.
  Never overwrite a previous dated report.
- **Business stage and funding situation**, team size, and monthly burn — usually
  not in the documents. Ask; see Procedure 3.
- **The business type**, which selects the question set: SaaS, mobile game / F2P,
  marketplace, hardware, or services. Each has different economics and different
  ways of being wrong.

## Procedure

1. **Detect inputs.** Search for a PRD or business plan (`prd*.md`, `*plan*.md`,
   `*pitch*`, `docs/**`), pricing and monetization docs, prior reviews, and
   product code. If no inputs exist at all, ask what to base the review on rather
   than inventing a business.

2. **Ingest.** Read everything fully. Extract the stated revenue model and
   pricing, target market and platform (with its fees or rev-share), cost signals
   (team, content scope, infrastructure, licensing), stage and funding signals,
   and any existing metrics or gates. Pull the matching business-type question
   set from `references/considerations.md`.

3. **Ask before writing.** Ask 3–5 questions via `AskUserQuestion`, **only for
   what the inputs do not answer**: business stage and funding, team size and
   monthly burn, revenue-model intent where the docs say TBD, time horizon and
   runway target, and risk tolerance (lifestyle business versus venture-scale).
   Running non-interactively, or getting no answer, is fine — every unanswered
   item goes into Open questions & assumptions. It is never silently assumed.

4. **Write the report** to `cfo-report-YYYY-MM-DD.md`, following the Output
   Format. Every section is required. Where the inputs give a section nothing,
   the section states what is missing and what would fill it — a section is never
   dropped for lack of data, because the gap is the finding.

5. **Rank.** Name the **2–3 financial drivers that actually decide viability for
   this project** in the executive summary. Eleven sections filled evenly and no
   ranking is a checklist, not an assessment — the reader cannot tell which
   number to worry about.

6. **Issue the financial verdict, not the funding verdict.** This skill answers
   *do the numbers work as modeled*: **viable / viable-with-conditions /
   not-viable-as-modeled / not-assessable**, with the blocking gaps named.
   **MUST NOT** issue a keep-funding-or-kill call — that is `ceo-review`'s, and it
   weighs strategy, market timing, and portfolio fit that this review does not
   look at. A model can be sound for a business not worth building, and unsound
   for one worth funding anyway.

7. **Self-review, then gate.** Re-read the written file fresh for: unlabeled
   numbers, placeholder sections, a verdict hedged into meaninglessness,
   recommendations not tied to numbered findings. Fix inline. Then tell the user
   the report is written and that the verdict and open questions need their eyes,
   and wait before any follow-on work.

## Output Format

Written to `cfo-report-YYYY-MM-DD.md`, these sections in this order:

1. **Executive summary & verdict** — 3–6 sentences ending in one verdict:
   viable / viable-with-conditions / not-viable-as-modeled / not-assessable.
   Names the 2–3 drivers that decide it.
2. **Business model & revenue streams** — how money comes in, ranked by expected
   contribution.
3. **Unit economics** — pricing/ARPU, CAC, LTV, contribution margin, payback period.
4. **Cost structure** — fixed vs. variable; build cost, headcount,
   COGS/infrastructure, platform fees, licensing, standing opex.
5. **Cash flow, burn & runway** — monthly burn, runway to next milestone,
   tranche or gate structure where staged funding fits.
6. **Pricing & monetization assessment** — is the pricing defensible against
   comps and willingness-to-pay; what is deliberately left on the table and what
   that costs.
7. **Scenario & break-even analysis** — base, upside, and downside cases, and
   what break-even requires in each.
8. **Financial risks & sensitivities** — ranked by what breaks the model first,
   each with the variable that drives it.
9. **KPIs to track** — metric, target threshold, and why it gates spend.
10. **Open questions & assumptions** — everything guessed or unanswered.
11. **Recommendations** — prioritized, each tied to a numbered finding above.

Every figure in every section carries **[sourced]** (cite where) or
**[estimate]** (state the basis).

## Quality Checklist

- [ ] Dated file written to the project root; prior report read and diffed if one exists.
- [ ] Every number labeled [sourced] with a citation, or [estimate] with a basis.
- [ ] All 11 sections present; none dropped for missing data.
- [ ] The 2–3 deciding drivers named in the executive summary.
- [ ] Verdict is one of the four, and is financial — not a funding call.
- [ ] Business-type question set applied (SaaS / F2P / marketplace / hardware / services).
- [ ] Every unanswered question from step 3 appears in Open questions & assumptions.
- [ ] Every recommendation ties to a numbered finding.
- [ ] No product or engineering redesign proposed.
- [ ] Self-review pass done against the written file.

## Failure Conditions

- **Unlabeled numbers.** The defining defect. A reader who cannot separate
  sourced facts from the analyst's estimates cannot use the report to decide
  anything.
- **Fabricating precision.** An exact CAC with no source. Give a labeled range
  with its basis instead — the range is more honest and more useful.
- **Chat-only report.** The dated file is the deliverable.
- **Generic MBA advice.** "Watch your burn rate", "focus on retention" — advice
  that would be identical for any company means this project's documents were
  never read.
- **Flat checklist.** All 11 sections filled, no ranking of which 2–3 drivers
  decide viability.
- **Issuing the funding verdict.** Viability of the model is this skill's; keep
  or kill is `ceo-review`'s.
- **Scope sprawl.** Redesigning the product or the architecture. Financial
  findings and recommendations only.
- **Escalate / stop** when: there are no financial inputs of any kind and the
  user cannot supply them (say the review is not-assessable and name exactly what
  is needed, rather than modeling an imagined business); or the real question is
  whether the project should exist at all (hand to `ceo-review`).

## Related skills

- `ceo-review` — owns the keep-funding verdict and grades the business model at
  scoreboard depth only, handing the modeling here. The division is strict:
  that skill says whether to fund, this says whether the numbers work.
- `strong-product-vision` — settles what is being sold and to whom, upstream of
  any pricing question.
- `creative-director` — owns positioning and brand; referenced here only where
  brand constrains pricing power.
- `dependency-evaluation` — supplies build-versus-buy cost inputs when a vendor
  decision materially moves the cost structure.
- `stakeholder-communication` — carries the verdict to an audience that will not
  read eleven sections.

## References

- [Full question bank](references/considerations.md) — questions per report
  section, plus the business-type-specific sets.

## Measuring this skill

`evaluations/` holds the activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. The characteristic failure is **fabricated
precision** — a confident, unlabeled, entirely invented CAC — so scoring begins
with a mechanical sweep for unlabeled figures before any prose is read. The suite
includes a case with almost no financial input, where the correct verdict is
`not-assessable` with the gaps named, and any complete-looking model is a failure.
