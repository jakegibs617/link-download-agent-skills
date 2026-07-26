# Professional Skill Library

A library of narrow, independently usable agent skills covering the competency
models of two professions:

1. **Engineering** (`engineering/`) — the capabilities of an exceptional
   senior/staff software engineer, decomposed into 32 skills.
2. **Legal** (`legal/`) — the capabilities of an experienced lawyer performing
   rigorous contract review, decomposed into 25 skills.

Every skill follows this repository's `authoring-agent-skills` conventions: a
concise, executable `SKILL.md` plus a self-contained evaluation suite.

For installation instructions, invocation examples, and validation commands,
see the repository-level [README](../README.md).

> **Legal disclaimer.** The legal skills produce structured contract analysis
> to support a human decision-maker. They do not provide legal advice and do
> not replace licensed legal counsel. Every legal skill is required to flag
> when jurisdiction-specific advice from a licensed attorney is needed.

## Directory structure

```text
skills/
├── README.md                  # This file
├── SKILL-CATALOG.md           # One entry per skill: triggers, I/O, relations
├── EVALUATION-GUIDE.md        # How to run, score, and iterate on evaluations
├── COMPOSITION-WORKFLOWS.md   # Multi-skill workflows for common scenarios
├── engineering/
│   └── <skill-name>/
│       ├── SKILL.md           # Frontmatter + purpose, inputs, procedure,
│       │                      # output format, checklist, failure conditions
│       └── evaluations/
│           ├── evals.json     # ≥5 cases incl. one negative-activation case
│           ├── rubric.md      # Criteria, critical failures, pass threshold
│           └── README.md      # How to run this skill's evaluations
└── legal/
    └── <skill-name>/          # Same package layout
```

A skill may add `references/`, `scripts/`, and `evals/` when it needs them.
`engineering/technical-review-auditor` is the current example: alongside the
standard `evaluations/` suite it carries a seeded-defect harness that scores
defect recall and uplift over a no-skill baseline.

## How skills are selected and invoked

Each `SKILL.md` begins with YAML frontmatter whose `description` states what
the skill does, when to invoke it, and what it must **not** be used for. An
agent (or a human dispatcher) selects a skill by matching the task against
these descriptions — the catalog's *Trigger conditions* column is the fast
index for this.

Selection rules:

- Pick the **narrowest** skill whose trigger matches. Skills deliberately have
  non-overlapping responsibilities; if two seem to match, re-read their
  "not for" clauses — one will defer to the other.
- If no skill matches, do not force one. Handle the task directly or report
  the gap (see *Limitations* below).
- A skill may explicitly hand off: its Procedure or Failure Conditions name
  the skill to invoke next (e.g. `debugging-root-cause-analysis` hands a
  confirmed fix to `code-implementation`).

## How skills compose

Skills are designed as pipeline stages: each one's **Output Format** is
structured so another skill (or a human) can consume it as an input.

Composition patterns:

- **Sequential pipeline** — output of one skill feeds the next
  (`rights-obligations-extraction` → `missing-protections-analysis` →
  `contract-negotiation-strategy` → `redline-recommendations`).
- **Fan-out / fan-in** — one coordinator runs several analysis skills over the
  same artifact, then a synthesis skill merges their findings
  (`signature-readiness-assessment` consumes all other legal reviews).
- **Gate** — a skill acts as a checkpoint that must pass before work proceeds
  (`production-readiness-review` before launch; `code-change-review` before
  merge).

`COMPOSITION-WORKFLOWS.md` gives nine worked multi-skill workflows.

## Example: software-engineering workflows

- **Understand an unfamiliar repo:** `codebase-comprehension` →
  `system-architecture` (as-built recovery) → `technical-debt-assessment`.
- **Ship a feature:** `requirements-analysis` → `first-principles-design` →
  `api-design`/`database-design-optimization` as needed →
  `code-implementation` → `testing-strategy` → `code-change-review`.
- **Production incident:** `observability-incident-response` (stabilize) →
  `debugging-root-cause-analysis` (diagnose) → `code-implementation` (fix) →
  `reliability-fault-tolerance` (prevent recurrence).

## Example: legal contract-review workflows

- **Contractor agreement:** `contract-structure-completeness` →
  `worker-classification-review` + `ip-ownership-review` +
  `payment-compensation-analysis` + `restrictive-covenants-review` →
  `missing-protections-analysis` → `redline-recommendations` →
  `plain-english-contract-explanation`.
- **Negotiation prep:** targeted substantive reviews →
  `contract-negotiation-strategy` → `redline-recommendations`.
- **Final check before signing:** `signature-readiness-assessment` over all
  prior findings.

## Limitations and escalation

- **Skills structure judgment; they do not replace it.** Outputs label facts,
  inferences, assumptions, and recommendations separately — treat anything
  below "fact" as requiring human confirmation for high-stakes decisions.
- **Legal skills are analysis aids only.** Enforceability, jurisdiction-
  specific rules, tax treatment, and regulatory interpretation always require
  a licensed attorney; every legal skill emits an explicit
  `Counsel-required items` section when these arise.
- **Engineering skills stop at the blast radius.** Destructive operations
  (data migrations, production changes, force-pushes) require explicit human
  authorization; skills must surface the risk, not absorb it.
- **Escalate on missing evidence.** Every skill's Failure Conditions define
  when to stop and ask rather than infer. A skill that cannot obtain its
  required inputs must say so — silence or guessing is a scored failure.
