---
name: prd-stress-test
description: Stress-tests a PRD by sorting every assertion in it into one of three settlement paths — provable from a named artifact, settled only by the PM saying yes, or an unexamined assumption — then sweeping for contradictions inside the document and, when a transcript or meeting notes are supplied, for drift between what was agreed and what was written. Leaves a dated prd-stress-test-YYYY-MM-DD.md with every bullet on one line. Use when asked to "stress test this PRD", "poke holes in this PRD", "what's unproven here", "what needs sign-off", "what are we assuming", or "does this PRD match the transcript". Not for turning a settled PRD into testable acceptance criteria (requirements-analysis), reviewing a technical design or RFC (technical-review-auditor), judging whether the vision statement commits to anything (strong-product-vision), or assessing business viability (ceo-review).
---

# PRD Stress Test

## Purpose

Find out which sentences in a PRD are true, which are somebody's opinion, and which
are load-bearing guesses nobody has examined. The output is a list a PM can answer
in one sitting.

**Governing principle: every assertion has exactly one settlement path — an artifact
that already exists, or a named human saying yes.** A claim whose settlement path
cannot be named is not a fact. It is an assumption wearing a fact's grammar, and it
will be discovered mid-build rather than now.

**The deliverable is a dated file.** `prd-stress-test-YYYY-MM-DD.md` in the project
root, using today's date. The chat summary is a courtesy; the file is the review.
Dated rather than overwritten, so a second pass shows what actually got settled.

**Every bullet is one line.** This is a hard constraint, not a style preference. A
PRD stress test that reads like prose does not get read, and the findings it
contains do not get answered.

## Inputs

- **The PRD**, in whatever form exists — a doc, a ticket, a Notion export, a wiki
  page, a message. Required; without one there is nothing to stress.
- **The plan or roadmap**, when one exists. The PRD says what to build, the plan
  says when and by whom; contradictions between them are the most expensive kind.
- **A transcript, meeting notes, or thread** — optional. When supplied, adds the
  drift pass. Its absence removes a section; it never blocks the review.
- **Who the PM is.** `SIGN-OFF` items need a name attached, or they are questions
  addressed to nobody. Ask if it is not obvious.
- **Anything already treated as evidence** — dashboards, research decks, analytics,
  support tickets, prior experiments. Their absence is a finding, not a blocker.

## Procedure

### 1. Sort every assertion

Walk the PRD top to bottom. For each sentence that asserts something, quote it,
give it an ID, and assign exactly one tag:

| Tag | Definition | What MUST be named alongside it |
|---|---|---|
| `EVIDENCE` (`F#`) | An artifact exists, or could, that settles it | The artifact — dashboard, query, deck, ticket |
| `SIGN-OFF` (`D#`) | A choice, not a fact; no data settles it | The yes/no question, and the PM who answers it |
| `ASSUMPTION` (`A#`) | A load-bearing belief the PRD never states | Handed to step 2 |

**A claim is not sorted until its settlement path is named.** "Verify with data",
"confirm with stakeholders", and "check with the team" MUST NOT appear anywhere in
the output — they are the absence of a finding. Name the dashboard. Name the person.

The distinction that does the work: *"users abandon onboarding at step 3"* is
`EVIDENCE` — a funnel settles it. *"onboarding is our biggest problem"* is
`SIGN-OFF` — no query returns that; the PM decides it. Numbers stated without a
source are `EVIDENCE` with status `Unproven`, which is the single most common
finding in a real PRD.

Give each claim a status: `Proven` (artifact seen and it says so), `Unproven` (no
artifact yet), or `Contradicted` (another source says otherwise).

MUST NOT mark anything `Proven` without having actually seen the artifact. An
unverified claim marked proven is worse than no review.

### 2. Hunt the assumptions

Assumptions are what the PRD needs to be true but never says. Five places they hide:

- The gap between the stated problem and the chosen solution — why *this* fixes *that*
- Any number with no derivation — adoption rates, effort estimates, market size
- Behavioural predictions — every sentence starting "users will"
- Dependencies on another team, vendor, system, or migration landing on time
- Whatever the timeline silently requires — that scope holds, that nobody is on leave

Apply the **load-bearing test** to each: *if this turns out false, what breaks?*
An assumption whose falsity breaks nothing MUST be dropped rather than listed —
padding the list is how the real ones get skimmed past. Rank the survivors by blast
radius, largest first.

Each survivor gets the question that would test it. The question MUST be answerable —
"is this the right approach?" is not a question, "have we seen a team switch tools
for this reason before?" is.

### 3. Sweep for contradictions

Three axes: the PRD against itself, the PRD against the plan or roadmap, and the PRD
against the transcript.

**The bar for calling a contradiction: both sides quoted, and both cannot be true.**
Dates that differ, numbers that differ, an owner named twice, a scope statement that
excludes what a later section requires. Anything softer is not a contradiction —
route it to step 4 or drop it.

MUST NOT report a paraphrase difference as a contradiction. Two sections describing
the same thing in different words is a document, not a conflict.

### 4. Diff the transcript

**Run only when a transcript, notes, or thread was supplied.** When none was, omit
the section entirely rather than printing an empty one.

Most transcript-to-PRD deltas are drift, not contradiction. Three types, each
requiring both sides quoted:

| Type | Meaning |
|---|---|
| **Dropped** | Agreed in the transcript, absent from the PRD |
| **Added** | In the PRD, never discussed |
| **Changed** | Same item, different number, scope, owner, or date |

Report drift as a question — "was this decided after the meeting?" — never as an
accusation. The usual cause is a decision made in a hallway and never written down,
and framing it as an error makes the review adversarial to no purpose.

MUST NOT assert that a transcript or PRD says something it does not. Quote or drop it.

### 5. Rank, cap, and self-check

Order every section by what blocks the build, never by document order. Cap
`Questions for the PM` at 10 — a longer list is a list nobody answers. Then run the
Quality Checklist.

### 6. Write the file, summarize in chat

Write `prd-stress-test-YYYY-MM-DD.md` to the project root. Return in chat only the
verdict, `Blocking now`, `Questions for the PM`, and the file path — enough that the
reader learns the headline without opening anything.

## Output Format

Written to `prd-stress-test-YYYY-MM-DD.md`, sections in this order:

```markdown
# PRD stress test: <name> — <date>
**Verdict:** <one line: what must be settled before build starts>

## Blocking now
- [C1] <one line — the finding, not its explanation>

## Facts to settle
| # | Claim (quoted) | Settled by | Status |
| F1 | "40% of users churn during onboarding" | Amplitude onboarding funnel, Q3 | Unproven |
| D1 | "We ship iOS before Android" | PM sign-off — yes/no | Open |

## Assumptions to question
| # | Assumption | Question to ask | If false |

## Contradictions
| # | Source A (quoted) | Source B (quoted) | Why both can't be true |

## Transcript drift
| # | Item | Transcript | PRD | Type |

## Questions for the PM
<numbered, one line each, max 10, ordered by what unblocks the most>
```

Formatting rules, all mandatory:

- Every bullet and every numbered question is one line, 120 characters or fewer.
- Every table cell is 60 characters or fewer — the budget that keeps a four-column
  row scannable. Longer quotes are elided to the operative clause with `…`.
- No bullet contains a semicolon-joined second thought, a parenthetical aside, or a
  sentence of explanation. State the finding; the table row carries the detail.
- Every finding keeps its stable ID so the PM can reply "F1 yes, A3 no".
- `Transcript drift` is omitted entirely when no transcript was supplied.
- A section with no findings says "None found" rather than being deleted — except
  `Transcript drift`, whose absence means the input was absent.

## Quality Checklist

- [ ] Every assertion in the PRD is sorted, or the unsorted remainder is named.
- [ ] Every `EVIDENCE` row names a specific artifact, not a category of artifact.
- [ ] Every `SIGN-OFF` row is a yes/no question addressed to a named person.
- [ ] No row says "verify with data", "confirm with the team", or equivalent.
- [ ] Nothing is marked `Proven` that was not actually seen.
- [ ] Every listed assumption breaks something identifiable if false.
- [ ] Every contradiction quotes both sides and states why both cannot be true.
- [ ] No paraphrase difference is reported as a contradiction.
- [ ] Transcript drift is typed Dropped / Added / Changed, with both sides quoted.
- [ ] Findings are ordered by what blocks the build, not by document order.
- [ ] `Questions for the PM` is 10 items or fewer.
- [ ] Every bullet is one line of 120 characters or fewer.
- [ ] Every table cell is 60 characters or fewer.

## Failure Conditions

- **Summarizing instead of stressing.** Restating the PRD back with the word
  "finding" attached. The most common failure: the reader learns nothing they did
  not already write.
- **Non-answers as settlement paths.** "Verify with data" is what the PM already
  knew. Naming the dashboard is the entire value of the pass.
- **Manufactured contradictions.** Two sections wording the same idea differently,
  reported as a conflict. Erodes trust in every other finding in the file.
- **Inventing content.** Asserting the transcript or PRD says something it does not,
  to complete a row. Quote or drop it.
- **Inert assumptions.** Listing beliefs whose falsity breaks nothing, which buries
  the two or three that would sink the quarter.
- **Answering for the PM.** Resolving a `SIGN-OFF` item by picking the answer. The
  open question *is* the deliverable; closing it silently destroys it.
- **Unranked wall.** Findings in document order, so the reader has to do the
  prioritization the review was supposed to do.
- **Multi-line bullets.** The failure the reader notices first, and the one that
  makes them stop reading.
- **Escalate / stop** when: there is no PRD or plan to read (ask for one); the
  artifact is a technical design, RFC, or ADR rather than a product doc (hand to
  `technical-review-auditor`); the PRD is settled and the real ask is acceptance
  criteria (hand to `requirements-analysis`); or the weak part is the vision
  sentence itself rather than the claims beneath it (hand to
  `strong-product-vision`).

## Related skills

- `requirements-analysis` — runs after this one, turning a settled PRD into testable
  acceptance criteria. Requirements derived from unproven claims inherit them.
- `technical-review-auditor` — the same adversarial posture aimed at a technical
  artifact: plan, RFC, ADR, design doc. This one aims at the product document.
- `strong-product-vision` — when the problem is that the vision statement commits to
  nothing. This skill tests the claims below the vision, not the vision itself.
- `decision-elicitation` — when the review's finding is "nobody has decided" and the
  user wants to be walked through those decisions one at a time.
- `ceo-review` and `cfo` — judge whether the business works. This judges whether the
  document is internally honest; a PRD can pass this and describe a bad business.
- `audit-app` — verifies built software against its claims. This verifies a document
  against its evidence, before anything is built.

## Measuring this skill

No `evaluations/` suite ships with this skill yet, so it is excluded from
`skills/scripts/validate_skill.py` and from `SKILL-CATALOG.md`. When one is added,
score these two failures hardest, in opposite directions: **settlement paths that
name nothing** ("verify with data"), and **contradictions manufactured from
paraphrase**. The suite should include a PRD with no transcript, where the correct
output omits the drift section entirely, and a PRD whose claims are all genuinely
sourced, where the correct output is a short file that says so.
