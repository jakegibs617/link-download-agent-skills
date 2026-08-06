---
name: ui-ux-plan
description: Turns a PRD or an existing app into one canonical UI/UX design plan written to ui-ux-plan.md — UX principles that each exclude something, a screen inventory and navigation map, critical user flows as mermaid diagrams, a design system specified as tokens and scales, and an audit of the current interface when one exists. Use when a project needs UI/UX direction — a PRD with no interface yet, an existing app whose UI needs auditing, or a request for screens, user flows, navigation, a design system, or a UX review. Not for brand idea, campaign, or voice (creative-director), the product vision itself (strong-product-vision), or implementing the interface.
---

# UI/UX Plan

## Purpose

Produce the single canonical design plan a team builds against: `ui-ux-plan.md`,
written next to the PRD, or in the project root if there is no PRD.

The plan covers **screens and flows, a design system, and UX principles**. It is
not per-screen wireframes and it is not implementation. **This skill ends at the
reviewed plan file.**

**Governing principle: a principle that excludes nothing is filler.** "Intuitive
and easy to use" is not a principle — its opposite is absurd, so it constrains no
decision and settles no argument. Every principle must name something it will
*not* support: a screen pattern, a convention, a user behavior. If a designer
could not use it to reject a proposed screen, rewrite it.

The same standard applies to the design system. Section 5 is a spec — tokens,
scales, named components — not a mood board. "Warm and approachable" tells the
next person nothing they can build from.

## Inputs

- **The PRD**, read fully: personas, design pillars, core loop, platform,
  monetization rules, non-goals. These are **binding constraints**; every section
  of the plan must be traceable to them.
- **The existing UI**, if any — screens, routes, components, views, pages, and
  their navigation relationships.
- **An existing `ui-ux-plan.md`**, if present. This run is then an update: read
  it, confirm with the user before changing it, add a changelog line mirroring
  the PRD's changelog style, and never silently overwrite.
- **The settled product vision**, where one exists. A plan built on a vision that
  names no user inherits that vagueness as personas nobody can design for.

## Procedure

1. **Detect mode.** Search for a PRD (`prd*.md`, `*prd*.md*`, `docs/**/prd*`) and
   for UI source (screens, components, views, pages directories; mobile or web
   framework files).

   | Found | Mode |
   |---|---|
   | PRD only | **Greenfield** — design from scratch |
   | UI code, with or without a PRD | **Existing** — audit first, then plan |
   | Neither | Ask what to base the plan on |

2. **Ingest.** Read the PRD fully and treat its contents as constraints rather
   than suggestions.

   **Existing mode:** additionally enumerate the actual screens, routes, and
   components and their navigation relationships, noting UX gaps — dead ends,
   inconsistent patterns, missing empty/error/loading states, accessibility
   issues. Bound the audit to that inventory. It is not a line-level code review.

3. **Ask before writing.** Ask 3–5 questions via `AskUserQuestion`, one theme per
   message, multiple-choice preferred. **Only ask what the PRD or the code does
   not already answer** — if the PRD states the platform or the primary persona,
   asking it again wastes the user's attention and signals the PRD was not read.

   Question bank: platform and form factor; visual direction (offer 2–4 named
   directions derived from the product's theme, each with a one-line mood);
   the primary journey to optimize (first-run vs. core loop vs. retention
   surface); density and complexity tolerance for the target persona; the
   accessibility bar (WCAG AA baseline vs. stricter).

   Anything still unknown after the questions goes in **Open questions &
   assumptions** — never silently assumed.

4. **Write `ui-ux-plan.md`**, following the Output Format. Every section is
   required; section 6 appears in existing mode only.

5. **Self-review, then gate.** Re-read the written file fresh for placeholders
   and TBDs, contradictions between sections, mermaid syntax validity, and any
   section that ignores a PRD constraint. Fix inline. Then tell the user the plan
   is written and needs review before implementation planning, and wait.

## Output Format

Written to `ui-ux-plan.md`, these sections in this order:

1. **Overview & inputs** — derived-from (PRD version or audit date), platform,
   primary persona, changelog.
2. **UX principles** — 4–6 falsifiable principles tied to the product's design
   pillars. Each must exclude something. Includes platform conventions and the
   accessibility commitment.
3. **Screen inventory & navigation map** — every screen with a one-line purpose
   and a priority, plus a **mermaid diagram** of the navigation structure.
4. **User flows** — the 2–4 critical journeys as **mermaid flowcharts**, each
   annotated with the user's goal at each step and with failure, empty, and error
   states.
5. **Design system** — typography scale, semantic color roles (light and dark),
   spacing scale, core component list, motion principles, iconography and tone.
6. **Audit findings** *(existing mode only)* — current-state inventory, gaps
   ranked by severity, and a keep/fix/replace verdict per screen or component.
7. **Open questions & assumptions** — everything guessed, flagged for the user.
8. **Handoff** — implementation order: which screens and components first, and why.

Sections 3 and 4 require mermaid. Navigation described only in prose or ASCII
does not satisfy them — the diagram is what makes the structure reviewable at a
glance, which is the point of having it.

## Quality Checklist

- [ ] Mode detected and stated; existing `ui-ux-plan.md` treated as an update with a changelog line.
- [ ] Every section traceable to a PRD constraint, or the divergence stated.
- [ ] 4–6 UX principles, each excluding something nameable.
- [ ] No question asked that the PRD or the code already answers.
- [ ] Sections 3 and 4 contain valid mermaid, not prose or ASCII.
- [ ] Every flow annotated with failure, empty, and error states — not just the happy path.
- [ ] Design system is tokens, scales, and named components — no mood-board prose.
- [ ] Colors given as semantic roles with light and dark values.
- [ ] Accessibility bar stated explicitly.
- [ ] Audit findings present and ranked, in existing mode.
- [ ] Everything unknown in Open questions & assumptions; nothing silently assumed.
- [ ] Self-review pass done against the written file.

## Failure Conditions

- **Mood board where a spec is required.** "Warm, premium, approachable" in
  section 5. Name the type scale, the semantic color roles, and the components.
- **Principles that exclude nothing.** "Intuitive", "delightful", "frictionless".
  If the opposite is absurd, the principle is filler — rewrite it until a
  designer could reject a screen with it.
- **Prose navigation.** Sections 3 and 4 require mermaid.
- **Happy paths only.** Flows with no empty, error, or failure states describe a
  demo, not a product — and those states are where most of the real design work
  turns out to be.
- **Asking what the PRD answers.** Signals the PRD was not read, and spends the
  user's attention on nothing.
- **Silent assumption.** Anything guessed and not surfaced in section 7.
- **Scope sprawl.** Instrumentation plans, prototyping schedules, and monetization
  copy belong to the PRD or later docs. If it is not one of the eight sections, it
  does not go in.
- **Silently overwriting an existing plan.** It is an update: read, confirm,
  changelog.
- **Escalate / stop** when: there is neither a PRD nor UI code (ask what to base
  the plan on — a plan invented from a one-line description is a plan for an
  imagined product); or the request is really about brand, voice, or campaign
  rather than interface (hand to `creative-director`).

## Related skills

- `creative-director` — owns brand idea, campaign, voice, and visual identity as
  a *position*. This owns the interface and its design system as a *spec*. The
  boundary is frequently blurred: if the question is "does this express who we
  are", it is theirs; if it is "can someone use this", it is this skill's.
- `strong-product-vision` — settles the personas and pillars this plan treats as
  binding. Run first when the PRD's personas are too vague to design for.
- `requirements-analysis` — turns the plan's screens and flows into testable
  acceptance criteria.
- `technical-planning-estimation` — sequences the handoff order in section 8 into
  actual increments.
- `code-implementation` — builds from the reviewed plan. This skill never
  implements; the gate in Procedure 5 is what separates them.

## Measuring this skill

`evaluations/` holds the activation and rubric suite; run it per
`skills/EVALUATION-GUIDE.md`. Two failures are scored hardest: **filler
principles** that exclude nothing, and **mood-board design systems** that specify
nothing. Both produce a plan that looks complete and settles no argument, which is
the failure a section-count check cannot catch — so the rubric tests principles by
inverting them and tests section 5 by asking whether a new designer could build
from it.
