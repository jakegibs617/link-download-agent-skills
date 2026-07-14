#!/usr/bin/env python3
"""Validate a Skill package against the authoring-agent-skills structural rules.

Usage:
    python scripts/validate_skill.py <path-to-skill-directory>
"""

import json
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None

NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
VAGUE_NAME_WORDS = {"helper", "tools", "utils", "util", "misc"}
REQUIRED_EVAL_FIELDS = ["id", "category", "name", "query", "should_activate", "expected_behavior", "must_not"]


def fail(errors, msg):
    errors.append(msg)


def parse_frontmatter(text):
    if not text.startswith("---"):
        return None, "SKILL.md does not start with YAML frontmatter (---)"
    end = text.find("\n---", 3)
    if end == -1:
        return None, "SKILL.md frontmatter is not terminated with a closing ---"
    raw = text[3:end].strip()
    if yaml is not None:
        try:
            data = yaml.safe_load(raw)
        except Exception as e:
            return None, f"SKILL.md frontmatter failed to parse as YAML: {e}"
    else:
        data = {}
        for line in raw.splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                data[k.strip()] = v.strip()
    return data, None


def validate(skill_dir: Path):
    errors = []
    warnings = []
    data = None

    skill_md = skill_dir / "SKILL.md"
    if not skill_md.exists():
        fail(errors, "SKILL.md does not exist")
        return errors, warnings

    text = skill_md.read_text(encoding="utf-8")
    frontmatter, err = parse_frontmatter(text)
    if err:
        fail(errors, err)
        frontmatter = {}

    name = (frontmatter or {}).get("name", "")
    description = (frontmatter or {}).get("description", "")

    if not name:
        fail(errors, "frontmatter missing required field: name")
    else:
        if len(name) > 64:
            fail(errors, f"name exceeds 64 characters: {len(name)}")
        if not NAME_RE.match(name):
            fail(errors, f"name '{name}' must use only lowercase letters, numbers, and hyphens")
        if name in VAGUE_NAME_WORDS or any(w == name for w in VAGUE_NAME_WORDS):
            fail(errors, f"name '{name}' is too vague (avoid helper/tools/utils/misc)")

    if not description:
        fail(errors, "frontmatter missing required field: description")
    elif len(description) < 20:
        warnings.append("description is very short; confirm it explains what/when and includes trigger terms")

    # Check linked local files (markdown links to relative paths)
    link_re = re.compile(r"\]\(([^)h][^)]*)\)")
    for match in link_re.finditer(text):
        target = match.group(1).split("#")[0].strip()
        if not target or target.startswith("http"):
            continue
        target_path = (skill_dir / target).resolve()
        if not target_path.exists():
            fail(errors, f"SKILL.md links to missing file: {target}")
        else:
            rel = target_path.relative_to(skill_dir.resolve())
            if len(rel.parts) > 2:
                fail(errors, f"referenced file nested more than one level from SKILL.md: {target}")

    if "\\" in text:
        warnings.append("SKILL.md may contain backslash path separators; use forward slashes")

    # Evaluations
    evals_path = skill_dir / "evaluations" / "evals.json"
    if not evals_path.exists():
        fail(errors, "evaluations/evals.json does not exist")
    else:
        try:
            data = json.loads(evals_path.read_text(encoding="utf-8"))
        except Exception as e:
            fail(errors, f"evaluations/evals.json failed to parse: {e}")
            data = None

        if data is not None:
            cases = data.get("cases", [])
            if len(cases) < 5:
                fail(errors, f"evaluations/evals.json has only {len(cases)} cases; at least 5 required")

            ids = [c.get("id") for c in cases]
            if len(ids) != len(set(ids)):
                fail(errors, "evaluations/evals.json contains duplicate case ids")

            if not any(c.get("should_activate") is False for c in cases):
                fail(errors, "evaluations/evals.json has no case with should_activate: false")

            for c in cases:
                missing = [f for f in REQUIRED_EVAL_FIELDS if f not in c]
                if missing:
                    fail(errors, f"case '{c.get('id', '?')}' missing required fields: {missing}")

            if "pass_requirements" not in data:
                fail(errors, "evaluations/evals.json missing pass_requirements")

    rubric_path = skill_dir / "evaluations" / "rubric.md"
    if not rubric_path.exists():
        fail(errors, "evaluations/rubric.md does not exist")
    else:
        rubric = rubric_path.read_text(encoding="utf-8")
        if "1–5 scale" not in rubric and "1-5 scale" not in rubric:
            fail(errors, "evaluations/rubric.md must declare the library-standard 1–5 scale")
        for anchor in ("**1** =", "**3** =", "**5** ="):
            if anchor not in rubric:
                fail(errors, f"evaluations/rubric.md missing score anchor: {anchor}")
        if "0–4" in rubric or "0-4" in rubric:
            fail(errors, "evaluations/rubric.md still references the obsolete 0–4 scale")

    if data is not None:
        mandatory = data.get("pass_requirements", {}).get("mandatory_criteria", {})
        for criterion, minimum in mandatory.items():
            if not isinstance(minimum, int) or not 1 <= minimum <= 5:
                fail(errors, f"mandatory criterion '{criterion}' must be an integer from 1 to 5")
            elif minimum < 4:
                fail(errors, f"mandatory criterion '{criterion}' must require at least 4 on the 1–5 scale")

    readme_path = skill_dir / "evaluations" / "README.md"
    if not readme_path.exists():
        fail(errors, "evaluations/README.md does not exist")

    return errors, warnings


def main():
    if len(sys.argv) != 2:
        print("Usage: python scripts/validate_skill.py <path-to-skill-directory>")
        sys.exit(2)

    skill_dir = Path(sys.argv[1]).resolve()
    if not skill_dir.is_dir():
        print(f"Not a directory: {skill_dir}")
        sys.exit(2)

    errors, warnings = validate(skill_dir)

    for w in warnings:
        print(f"WARNING: {w}")

    if errors:
        for e in errors:
            print(f"ERROR: {e}")
        print(f"\n{len(errors)} error(s) found.")
        sys.exit(1)

    print("Skill package validation passed.")
    sys.exit(0)


if __name__ == "__main__":
    main()
