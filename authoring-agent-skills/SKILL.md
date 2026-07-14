---
name: authoring-agent-skills
description: Creates, reviews, and improves reusable agent Skills together with an evaluation suite that measures discovery, instruction-following, output quality, robustness, and improvement over a no-Skill baseline. Use when creating a new Skill, converting a workflow into a Skill, evaluating an existing Skill, or refining a Skill after observing agent failures.
---

# Authoring Agent Skills

Create concise, discoverable, executable Skills that include a repeatable method for evaluating whether they work.

A Skill is not complete until it has:

1. A valid `SKILL.md`
2. Representative evaluation cases
3. An explicit scoring rubric
4. A baseline comparison method
5. Failure-analysis and iteration instructions

## Core principles

### Keep the main Skill concise

Assume the model already understands general concepts.

Include only:

* Domain knowledge the model may not know
* Required procedures
* Important constraints
* Decision rules
* Failure-mode defenses
* Output requirements
* Validation and evaluation instructions

Keep `SKILL.md` focused. Move large examples, reference material, templates, and scripts into separate files.

### Match specificity to task fragility

Use:

* High freedom when several valid approaches exist
* Medium freedom when a preferred pattern exists but contextual judgment is needed
* Low freedom when operations are fragile, destructive, security-sensitive, or sequence-dependent

Limit the use of scripts in open-ended work to essential instructions only. Do not leave fragile operations ambiguous.

### Write for observable execution

Prefer instructions that can be verified.

Weak:

> Think critically about the implementation.

Strong:

> Identify the implementation's assumptions, verify each assumption against repository evidence, and label any assumption that remains unverified.

### Design evaluations before expanding the Skill

Before writing extensive instructions:

1. Identify representative tasks
2. Run or conceptually assess them without the Skill
3. Record expected failure modes
4. Create evaluation cases targeting those failures
5. Write the minimum Skill instructions needed to improve performance
6. Re-run the evaluations
7. Refine from observed results

## Required directory structure

Use this structure by default:

```text
skill-name/
├── SKILL.md
├── evaluations/
│   ├── evals.json
│   ├── rubric.md
│   └── README.md
├── examples/
│   └── examples.md
├── references/
│   └── reference.md
└── scripts/
    └── validate_skill.py
```

Only include directories that add value.

At minimum, produce:

```text
skill-name/
├── SKILL.md
└── evaluations/
    ├── evals.json
    ├── rubric.md
    └── README.md
```

## Workflow

### 1. Determine the actual capability

Identify:

* The problem the Skill solves
* The desired completed state
* The tasks that should activate it
* Tasks that should not activate it
* The evidence required for success
* The consequences of failure

Do not simply restate the user's wording. Translate it into an operational capability.

### 2. Define the Skill boundary

Determine whether the request represents one coherent capability.

Split it into multiple Skills when:

* It contains distinct workflows
* Different parts require different triggers
* Different parts have separate completion criteria
* One part is optional or specialized
* Combining them would make discovery ambiguous

### 3. Design the evaluation suite first

Create at least five evaluation cases:

1. **Typical success case**
   A straightforward task the Skill should handle well.

2. **Ambiguous case**
   A task with missing, conflicting, or incomplete information.

3. **Edge case**
   A less common but valid situation that could expose brittle instructions.

4. **Adversarial or failure-prone case**
   A task likely to trigger shortcuts, hallucinations, skipped validation, or scope drift.

5. **Negative activation case**
   A task where the Skill should not activate or should explicitly decline to apply its workflow.

For high-risk Skills, also include:

* A destructive-operation case
* A security-sensitive case
* A conflicting-instructions case
* A tool-failure case
* A missing-dependency case

### 4. Establish the baseline

For each evaluation, define how to assess the model without the Skill.

Record:

* Expected baseline behavior
* Likely baseline failures
* Whether the task can still succeed without the Skill
* The specific improvement the Skill is intended to produce

Do not claim that the Skill improves performance unless the Skill-enabled result is compared with a no-Skill result.

### 5. Write the metadata

The YAML frontmatter must include:

```yaml
---
name: skill-name
description: Third-person description explaining what the Skill does and when it should be used.
---
```

The `name` must:

* Use lowercase letters, numbers, and hyphens only
* Be no more than 64 characters
* Be specific
* Avoid vague terms such as `helper`, `tools`, or `utils`
* Avoid reserved platform or model names

The `description` must:

* Be written in third person
* Explain what the Skill does
* Explain when to use it
* Include likely trigger terms
* Be specific enough to distinguish it from adjacent Skills
* Stay within the platform's metadata length limit

### 6. Write the execution workflow

The Skill must specify:

* Inputs
* Main workflow
* Decision rules
* Validation steps
* Output requirements
* Failure handling
* Completion criteria

Use mandatory language precisely:

* `MUST` for required behavior
* `SHOULD` for recommended behavior
* `MAY` for optional behavior
* `MUST NOT` for prohibited behavior

### 7. Add feedback loops

For quality-critical tasks, require this loop:

1. Produce an intermediate result
2. Validate it against explicit rules
3. Identify failures
4. Revise the result
5. Validate again
6. Finalize only after required checks pass

Prefer machine-verifiable validators when deterministic rules exist.

For judgment-based work, provide a structured rubric and require self-review against it.

### 8. Add failure-mode defenses

Identify likely agent failures and encode direct safeguards.

Common failures include:

* The Skill does not activate for relevant requests
* The Skill activates for unrelated requests
* Instructions are ignored because critical rules are buried
* The agent produces generic advice without examining evidence
* Assumptions are presented as facts
* Validation is skipped
* Important findings are buried
* The agent asks for information already available
* Output format is inconsistent
* The agent declares completion prematurely
* References are never opened
* Tool-specific instructions reference unavailable tools
* The Skill is too verbose for its value

### 9. Create the scoring rubric

The rubric must separately score:

* Discovery and activation
* Correct workflow execution
* Instruction adherence
* Factual or evidentiary grounding
* Output completeness
* Output usefulness
* Robustness
* Efficiency
* Appropriate handling of uncertainty
* Correct non-activation

Use a 0–4 scale:

| Score | Meaning                                 |
| ----: | ---------------------------------------- |
|     0 | Missing, incorrect, or harmful          |
|     1 | Major failures; limited useful behavior |
|     2 | Partially correct; important omissions  |
|     3 | Correct with minor issues               |
|     4 | Fully correct, complete, and reliable   |

Define task-specific pass conditions. Do not rely only on an overall average.

A critical criterion may be designated as mandatory.

Example:

```text
Pass requirements:
- Overall score: at least 32/40
- Discovery and activation: at least 3
- Instruction adherence: at least 3
- No critical criterion may score below 2
- No fabricated evidence
```

### 10. Validate the Skill package

Check:

* Frontmatter is valid
* Name and description follow metadata rules
* Every linked file exists
* References are no more than one level deep from `SKILL.md`
* File paths use forward slashes
* Main instructions are concise
* Required steps use clear mandatory language
* Evaluation cases cover normal and abnormal usage
* Rubric criteria are observable
* Pass thresholds are explicit
* Evaluation files parse correctly
* No evaluation answer is leaked into the Skill instructions

## Evaluation file format

Create `evaluations/evals.json` using this structure:

```json
{
  "skill": "example-skill",
  "version": "1.0.0",
  "evaluation_method": "Compare fresh-agent performance with and without the Skill.",
  "pass_requirements": {
    "minimum_total_score": 32,
    "maximum_total_score": 40,
    "mandatory_criteria": {
      "discovery_and_activation": 3,
      "instruction_adherence": 3
    },
    "prohibited_failures": [
      "Fabricates evidence",
      "Skips a mandatory safety check",
      "Performs destructive work without required authorization"
    ]
  },
  "cases": [
    {
      "id": "typical-001",
      "category": "typical",
      "name": "Straightforward representative task",
      "query": "User request goes here.",
      "files": [],
      "setup": [],
      "should_activate": true,
      "baseline_risks": [
        "Likely failure without the Skill"
      ],
      "expected_behavior": [
        "Observable expected action",
        "Observable expected output"
      ],
      "must_not": [
        "Prohibited behavior"
      ],
      "criteria_weights": {
        "discovery_and_activation": 1,
        "workflow_execution": 1,
        "instruction_adherence": 2,
        "evidence_grounding": 1,
        "output_completeness": 1,
        "usefulness": 1,
        "robustness": 1,
        "efficiency": 1,
        "uncertainty_handling": 1
      }
    },
    {
      "id": "negative-001",
      "category": "negative-activation",
      "name": "Unrelated task",
      "query": "A request that should not use this Skill.",
      "files": [],
      "setup": [],
      "should_activate": false,
      "baseline_risks": [
        "Skill may trigger too broadly"
      ],
      "expected_behavior": [
        "Does not apply the Skill workflow",
        "Handles the request normally or selects a more appropriate Skill"
      ],
      "must_not": [
        "Force the Skill onto an unrelated task"
      ]
    }
  ]
}
```

## Evaluation rubric format

Create `evaluations/rubric.md` with this structure:

```markdown
# Evaluation Rubric

## Scoring scale

- 0: Missing, incorrect, or harmful
- 1: Major failures
- 2: Partial success with important omissions
- 3: Correct with minor issues
- 4: Fully correct and reliable

## Criteria

### Discovery and activation

Measures whether the agent selects the Skill when relevant and avoids it when irrelevant.

### Workflow execution

Measures whether required steps occur in the correct logical sequence.

### Instruction adherence

Measures compliance with MUST and MUST NOT requirements.

### Evidence grounding

Measures whether conclusions are supported by available evidence.

### Output completeness

Measures whether all required deliverables are present.

### Usefulness

Measures whether the result enables the user to act or decide.

### Robustness

Measures handling of ambiguity, edge cases, tool failures, and conflicting evidence.

### Efficiency

Measures whether the agent avoids unnecessary steps, repetition, and context usage.

### Uncertainty handling

Measures whether facts, inferences, assumptions, and unknowns are distinguished.

## Critical failures

Any of the following causes automatic failure:

- [Task-specific critical failure]
- [Task-specific critical failure]

## Pass threshold

- Minimum total score: [value]
- Mandatory criterion minimums: [values]
- No automatic-failure condition may occur
```

## Evaluation runner instructions

Create `evaluations/README.md` with a repeatable test process.

Use this method:

### Phase 1: Baseline

For each evaluation case:

1. Start a fresh agent session without the Skill
2. Provide only the evaluation query, files, and declared setup
3. Save the full response
4. Score it using `rubric.md`
5. Record observed failures

### Phase 2: Skill-enabled test

For each evaluation case:

1. Start a new fresh agent session with the Skill installed
2. Provide the identical query, files, and setup
3. Save the full response
4. Score it using the same rubric
5. Record whether the Skill activated
6. Record which Skill files were read, when observable

### Phase 3: Comparison

For each case, report:

* Baseline score
* Skill-enabled score
* Score difference
* Baseline failures corrected
* New failures introduced
* Unexpected behavior
* Activation correctness

### Phase 4: Aggregate results

Calculate:

```text
Activation precision =
correct relevant activations / all activations

Activation recall =
correct relevant activations / all cases that should activate

Negative activation accuracy =
correct non-activations / all cases that should not activate

Average baseline score =
sum of baseline scores / number of cases

Average Skill score =
sum of Skill-enabled scores / number of cases

Average improvement =
average Skill score - average baseline score

Pass rate =
passing Skill-enabled cases / total cases
```

### Phase 5: Iterate

When a case fails:

1. Classify the failure
2. Identify the smallest instruction or structural change that may fix it
3. Update the Skill
4. Re-run the failed case
5. Re-run at least one previously passing case to detect regression
6. Re-run the full suite before releasing a new version

## Failure classification

Classify each failure as one of:

* `discovery-false-negative`
  The Skill should have activated but did not.

* `discovery-false-positive`
  The Skill activated for an unrelated task.

* `instruction-ambiguity`
  The Skill's wording allowed an incorrect interpretation.

* `instruction-visibility`
  A rule existed but was too buried or indirect.

* `missing-domain-context`
  Required domain knowledge was absent.

* `workflow-omission`
  A required step was not included.

* `workflow-ordering`
  Steps occurred in an unsafe or ineffective order.

* `validation-gap`
  The Skill lacked an adequate verification step.

* `output-contract-gap`
  Required deliverables or formatting were underspecified.

* `tool-assumption`
  The Skill assumed a tool or dependency that was unavailable.

* `overconstraint`
  The Skill prevented valid contextual judgment.

* `underconstraint`
  The Skill allowed too much variation for a fragile task.

* `evaluation-gap`
  The test or rubric failed to measure the behavior accurately.

## Evaluation-quality requirements

The evaluation suite itself must meet these standards:

* Tests behavior, not exact wording
* Uses representative tasks
* Includes at least one negative activation case
* Includes at least one ambiguous or incomplete-input case
* Contains observable expected behaviors
* Contains explicit prohibited behaviors
* Does not expose a complete ideal answer to the agent being tested
* Uses the same prompt and files for baseline and Skill-enabled runs
* Separates activation quality from task execution quality
* Includes regression testing after changes
* Can be run by someone other than the Skill author

## Optional automated validator

When producing a complete package, create `scripts/validate_skill.py`.

The validator should check:

* `SKILL.md` exists
* YAML frontmatter parses
* Required metadata fields exist
* Name follows naming restrictions
* Description is non-empty
* Linked local files exist
* `evaluations/evals.json` parses
* At least five evaluation cases exist
* At least one case has `should_activate: false`
* Required evaluation fields are present
* Evaluation IDs are unique
* Pass requirements are defined
* File paths use forward slashes
* No references are nested more than one level from `SKILL.md`

The validator must return a non-zero exit code when validation fails and print actionable error messages.

Example:

```bash
python scripts/validate_skill.py .
```

Expected successful output:

```text
Skill package validation passed.
```

## Output requirements

When asked to create a Skill, produce:

1. Recommended directory structure
2. Complete `SKILL.md`
3. Complete `evaluations/evals.json`
4. Complete `evaluations/rubric.md`
5. Complete `evaluations/README.md`
6. Optional reference files where useful
7. Optional validation script where deterministic checks are possible
8. A brief explanation of what each evaluation is testing

When asked only to review an existing Skill, produce:

1. Skill-quality findings
2. Discovery risks
3. Instruction risks
4. Missing evaluation coverage
5. Proposed evaluation cases
6. Recommended changes
7. A pass/fail assessment with reasoning

## Completion criteria

The Skill-authoring task is complete only when:

* The capability and boundary are explicit
* Metadata is valid and discovery-oriented
* The workflow contains observable actions
* Mandatory and optional instructions are distinguishable
* Important uncertainty and failure cases are handled
* At least five representative evaluations exist
* A negative activation evaluation exists
* Expected and prohibited behaviors are defined
* The scoring rubric is explicit
* Pass thresholds are explicit
* Baseline comparison instructions are included
* Regression testing is required
* The package can be evaluated by another person or agent
* The Skill can fail the evaluation; the rubric is not designed to guarantee a pass
* No critical behavior is assessed only through subjective impressions
