# Examples

## Minimal SKILL.md frontmatter

```yaml
---
name: sql-migration-reviewer
description: Reviews SQL migration files for backward-compatibility issues (dropped columns, renamed tables, NOT NULL without a default) before merge. Use when a diff adds or modifies files under migrations/ or the user asks to check a migration for safety.
---
```

Good: specific name, third-person description, states what and when, includes trigger terms ("migration", "backward-compatibility").

Bad: `name: db-helper`, `description: Helps with databases.` — too vague to be discoverable or to distinguish from adjacent Skills.

## Mandatory language in a workflow step

Weak (ambiguous, not verifiable):

> Be careful with destructive changes.

Strong (observable, enforceable):

> The Skill MUST list every branch it intends to delete and MUST NOT delete a remote (origin) branch without explicit user confirmation of that specific list.

## One eval case, annotated

```json
{
  "id": "negative-001",
  "category": "negative-activation",
  "query": "Fix the date-parsing bug in parse_date.py",
  "should_activate": false,
  "expected_behavior": ["Fixes the bug directly", "Does not propose a Skill package"],
  "must_not": ["Apply the Skill-authoring workflow to an unrelated bug fix"]
}
```

This case exists because "Skill" and general helpfulness framing can cause false-positive activation on tasks that merely sound procedural.
