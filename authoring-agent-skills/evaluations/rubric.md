# Evaluation Rubric — authoring-agent-skills

## Scoring scale

- 0: Missing, incorrect, or harmful
- 1: Major failures; limited useful behavior
- 2: Partially correct; important omissions
- 3: Correct with minor issues
- 4: Fully correct, complete, and reliable

## Criteria

### Discovery and activation

Measures whether the agent applies this Skill's workflow when the request is genuinely about creating, converting, evaluating, or reviewing a Skill, and avoids applying it to unrelated coding/writing tasks. Score 4 requires correct activation *and* correct non-activation across the paired cases.

### Workflow execution

Measures whether the agent follows the required sequence: determine the actual capability → define the boundary → design evaluations before expanding instructions → write metadata → write the workflow → add feedback loops and failure-mode defenses → build the rubric → validate the package. Skipping straight to a SKILL.md without considering evaluation design is a workflow-execution failure even if the final SKILL.md looks fine.

### Instruction adherence

Measures compliance with this Skill's MUST/SHOULD/MUST NOT language — e.g., MUST include at least five eval cases with one negative-activation case, MUST NOT leak a complete ideal answer into eval cases, MUST use precise mandatory language in the produced Skill's own instructions.

### Evidence grounding

Measures whether the produced Skill's capability description and eval cases are grounded in what the user actually described (or in the existing SKILL.md content, for review/edit tasks) rather than invented details presented as fact. Assumptions must be labeled as assumptions.

### Output completeness

Measures whether all required deliverables are present for the requested mode: for creation, SKILL.md + evaluations/evals.json + rubric.md + README.md at minimum, plus an explanation of what each eval tests; for review, findings + discovery risks + instruction risks + missing coverage + proposed cases + recommended changes + pass/fail assessment.

### Usefulness

Measures whether the delivered package is something the user (or another agent) could actually run — cases are concrete enough to execute, the rubric's pass thresholds are numeric and explicit, and the explanation of each eval case would let someone unfamiliar with the task understand what's being tested.

### Robustness

Measures handling of ambiguous requests, partial existing packages, conflicting instructions (e.g., "skip the evals"), and high-risk/destructive capabilities. A robust response matches specificity to fragility and calls out when a delivered package is intentionally incomplete.

### Efficiency

Measures whether the agent avoids unnecessary restructuring of existing Skills, avoids padding SKILL.md with material that belongs in references/examples, and does not repeat work already visible in context.

### Uncertainty handling

Measures whether the agent distinguishes confirmed facts (what the user stated) from assumptions (what it inferred) from open questions (what still needs clarification), particularly in the ambiguous-001 and edge-001 cases.

## Critical failures

Any of the following causes automatic failure for that case:

- Ships a new-Skill creation task with no evaluation suite at all (unless the user explicitly and knowingly opted out, per adversarial-001)
- Fabricates a pass/fail verdict on an existing Skill without reading its actual content
- Presents invented workflow details as the user's confirmed process
- Produces a destructive-capability Skill with no confirmation safeguard for irreversible actions
- Applies the full Skill-authoring workflow to a request that has nothing to do with authoring a Skill

## Pass threshold

- Minimum total score: 32/40
- Discovery and activation: at least 3
- Instruction adherence: at least 3
- No automatic-failure condition may occur
