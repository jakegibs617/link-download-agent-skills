# Clever Skills

A catalog of reusable AI agent skills for Claude, organized around three
professional competency models:

- **Engineering:** 38 focused skills for senior and staff-level software work.
- **Legal contract review:** 25 focused analysis skills with explicit
  uncertainty, escalation, and licensed-counsel boundaries.
- **Product:** 5 skills covering the non-engineering functions that review a
  product — vision, business, finance, brand, and experience.

Each skill is an independently usable directory containing a Claude-compatible
`SKILL.md` and an evaluation suite. Start with the
[skill catalog](skills/SKILL-CATALOG.md), use the
[composition workflows](skills/COMPOSITION-WORKFLOWS.md) for multi-skill
tasks, and consult the [evaluation guide](skills/EVALUATION-GUIDE.md) when
testing changes.

> The legal skills support structured review and decision-making. They do not
> provide legal advice or replace a licensed attorney.

## Repository layout

```text
skills/
├── engineering/<skill-name>/
│   ├── SKILL.md
│   └── evaluations/
├── legal/<skill-name>/
│   ├── SKILL.md
│   └── evaluations/
├── product/<skill-name>/
│   ├── SKILL.md
│   └── evaluations/
├── SKILL-CATALOG.md
├── COMPOSITION-WORKFLOWS.md
└── EVALUATION-GUIDE.md
```

The full library contains 68 skills. Evaluation support files stay beside each
skill so a copied or packaged skill remains self-contained. A skill may also
carry `references/`, `scripts/`, and `evals/` directories when it needs them —
`engineering/technical-review-auditor` does, for its seeded-defect scoring
harness, `engineering/systems-thinking-auditor` does, for its archetype and
leverage-point references, `engineering/solution-engineering-fundamentals`
does, for the twelve-factor, enterprise-pattern, and architecture-concept
catalogs it cites plus a service fixture its evaluation suite scores against,
and `engineering/postgres-standards` does, for its DDL-lock, type/index, and
antipattern references plus the seeded-defect schema its audit case is scored on.

Most skills report in their response. The `product/` skills instead leave a file
behind — a dated report in the project root for `ceo-review`, `cfo`, and
`creative-director`, and a canonical `ui-ux-plan.md` for `ui-ux-plan` — so
successive reviews can be diffed rather than replaced.

## Install a skill in Claude Code

Claude Code discovers personal skills from `~/.claude/skills/` and
project-specific skills from `.claude/skills/`. Copy the complete directory for
each skill you want to use.

### Personal installation

Available in every Claude Code project for the current user:

```bash
mkdir -p ~/.claude/skills
cp -R skills/engineering/requirements-analysis ~/.claude/skills/
cp -R skills/legal/defined-term-consistency ~/.claude/skills/
```

### Project installation

Shared with collaborators through the target project's repository:

```bash
mkdir -p /path/to/project/.claude/skills
cp -R skills/engineering/system-architecture /path/to/project/.claude/skills/
```

Restart Claude Code if it was already running when a new top-level skills
directory was created. Use `/skills` to confirm discovery.

## Select and invoke skills

Claude can activate an installed skill automatically from its frontmatter
description. You can also invoke it directly by directory/name:

```text
/requirements-analysis Turn this feature request into testable requirements.
/system-architecture Recover the as-built architecture of this repository.
/defined-term-consistency Check this agreement for inconsistent defined terms.
```

Choose the narrowest matching skill. For broader work, compose skills in
sequence or fan them out over the same artifact. Examples include:

- Feature delivery: `requirements-analysis` → `first-principles-design` →
  `code-implementation` → `testing-strategy` → `code-change-review`.
- Contract review: `contract-structure-completeness` → targeted clause
  reviews → `missing-protections-analysis` → `redline-recommendations`.

See [COMPOSITION-WORKFLOWS.md](skills/COMPOSITION-WORKFLOWS.md) for complete
workflows and handoff guidance.

## Validate the catalog

The validator checks Claude metadata, package structure, evaluation cases, and
the library's 1–5 scoring contract.

Validate one skill:

```bash
python3 skills/scripts/validate_skill.py skills/engineering/requirements-analysis
```

Validate the full catalog:

```bash
for skill in skills/engineering/* skills/legal/* skills/product/*; do
  python3 skills/scripts/validate_skill.py "$skill" || exit 1
done
```

Evaluation suites contain at least five cases, including ambiguous,
adversarial, and negative-activation coverage. Follow
[EVALUATION-GUIDE.md](skills/EVALUATION-GUIDE.md) to compare baseline and
skill-enabled runs and detect regressions.

## Add or revise a skill

1. Give the skill one narrow responsibility and a matching kebab-case name.
2. Put activation guidance in the `SKILL.md` frontmatter description.
3. Keep the procedure evidence-driven, actionable, and explicit about failure
   conditions and handoffs.
4. Add or update the evaluation cases and rubric.
5. Update [SKILL-CATALOG.md](skills/SKILL-CATALOG.md) and any affected
   composition workflows.
6. Run the full validator before submitting the change.

Detailed authoring conventions live in
[authoring-agent-skills](authoring-agent-skills/SKILL.md).

## Project status

The catalog currently provides broad engineering, contract-review, and
product-review coverage.
Its evaluation definitions are versioned independently per skill; the current
suites use version `1.1.0` and the library-standard 1–5 scale.
