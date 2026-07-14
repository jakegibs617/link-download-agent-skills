---
name: codebase-comprehension
description: Builds an evidence-based mental model of an unfamiliar codebase — entry points, module boundaries, data flow, conventions, and where a given behavior lives — before any change is attempted. Use when onboarding to a repo, when asked "where/how does X work", or as the first stage before modifying unfamiliar code. Not for judging architecture quality (system-architecture), quantifying debt (technical-debt-assessment), or diagnosing a specific bug (debugging-root-cause-analysis).
---

# Codebase Comprehension

## Purpose

Answer "how does this system actually work, and where would a change go?"
with claims that each cite a file and line — a map another engineer can
navigate by without re-doing the exploration.

## Inputs

- The repository (or the reachable subset — state what wasn't reachable).
- The comprehension goal: general onboarding, or a targeted question. The
  goal controls depth; MUST NOT do a full-repo survey for a targeted question.
- Build/run capability if available (running code beats reading code for
  verifying behavior).

## Procedure

1. **Orient from the outside in.** Manifest files, build config, entry
   points, deploy config, directory layout, and the test tree — before
   reading feature code. Note the languages, frameworks, and generation
   markers (generated code MUST be identified before conclusions rest on it).
2. **Trace, don't browse.** Pick the goal-relevant flow (a request, a CLI
   command, a job) and follow it end to end: entry → routing → domain logic
   → persistence → side effects. Record each hop as `claim → file:line`.
   Reading files at random produces familiarity, not a model.
3. **Verify claims against execution where possible.** Run the tests, hit the
   endpoint, add a temporary trace — pick the cheapest available check for
   load-bearing claims. A claim verified by execution outranks one inferred
   from reading; label which kind each is.
4. **Extract the conventions.** Naming, layering rules, error-handling
   pattern, test style, dependency direction — derived from ≥ 2 observed
   examples each, cited. One instance is an occurrence; two or more with no
   counterexample is a convention; note counterexamples where found.
5. **Map ownership and boundaries.** Which modules own which data/concepts,
   which direction dependencies flow, and where the boundaries leak (cited).
6. **Record the dark corners.** Code that couldn't be understood, dead-looking
   code, mismatches between docs/comments and behavior — as explicit
   unknowns, not omissions. MUST NOT paper over an unexplained region by
   describing what it "probably" does without the probably.
7. **Answer the goal.** For targeted questions: the answer, the evidence
   chain, and the confidence level. For onboarding: the map (Output Format).
8. **Self-check** against the Quality Checklist.

## Output Format

```markdown
# Codebase map: <repo> (goal: <goal>)

## System in one paragraph
## Entry points and flows
<per traced flow: hop table with file:line citations, verified-by column>
## Module map
| Module | Responsibility | Owns (data/concepts) | Depends on |
## Conventions observed (each with ≥2 citations)
## Boundary leaks and surprises (cited)
## Unknowns and dark corners
## Where a change to <goal-relevant behavior> would go
<files + rationale, when the goal is targeted>
```

## Quality Checklist

- [ ] Every claim has a file:line citation or is labeled inferred/unknown.
- [ ] At least one flow traced end to end, not just listed.
- [ ] Execution-verified claims distinguished from read-inferred ones.
- [ ] Conventions backed by ≥ 2 cited examples; counterexamples noted.
- [ ] Generated/vendored code identified and excluded from conclusions.
- [ ] Unknowns listed explicitly; nothing "probably" asserted as fact.

## Failure Conditions

- **Plausible narration:** describing how systems like this usually work
  instead of how this one works — the primary hallucination risk; every
  uncited claim is suspect.
- **README trust:** repeating stale docs without verification.
- **Breadth theater:** listing every directory while tracing nothing.
- **Convention from one example.**
- **Escalate / stop** when: the goal-relevant flow crosses into unreachable
  code (private services, missing submodules) — report the boundary hit; or
  the codebase contradicts itself in ways that suggest a half-finished
  migration — report both states rather than picking one as truth.

## Related skills

- `system-architecture` — to judge/redesign what this skill maps.
- `technical-debt-assessment` — to quantify the problems this skill notices.
- `debugging-root-cause-analysis` — when the question is "why is X broken"
  rather than "how does X work".
- `technical-documentation` — to turn the map into a durable onboarding doc.
