Act as an expert AI skill architect. Design a comprehensive library of reusable agent skills covering the capabilities expected of:

1. A 10x senior software engineer
2. A lawyer performing rigorous contract review

The goal is not to create one generic skill for each profession. Break each profession into its distinct competencies and create a separate skill for every major competency.

## Part 1: Senior Software Engineer Skill Library

Identify the complete competency model of an exceptional senior or staff-level software engineer. Include technical, architectural, operational, analytical, communication, and leadership capabilities.

Create individual skills for areas such as:

* Requirements analysis and ambiguity resolution
* First-principles software design
* System architecture
* Codebase comprehension
* Debugging and root-cause analysis
* Code implementation
* Refactoring
* Design patterns
* API design
* Database design and query optimization
* Performance engineering
* Scalability and distributed systems
* Reliability and fault tolerance
* Security engineering
* Testing strategy
* Code review
* Technical debt assessment
* Dependency and framework evaluation
* CI/CD and release engineering
* Observability and incident response
* Documentation
* Technical planning and estimation
* Risk analysis
* Legacy system modernization
* Migration planning
* Developer experience
* Mentoring and technical leadership
* Communicating technical decisions to nontechnical stakeholders
* Verifying that humans understand implemented work

Do not limit the skill library to this list. Add any missing competencies required for a genuinely exceptional senior engineer.

## Part 2: Legal Contract Reader Skill Library

Create a separate set of skills for an experienced lawyer reviewing contracts.

Include skills for:

* Contract structure and completeness review
* Defined-term consistency
* Rights and obligations extraction
* Payment and compensation analysis
* Term and termination analysis
* Liability and indemnification review
* Warranty and representation review
* Intellectual-property ownership
* Confidentiality and data-protection obligations
* Noncompete, nonsolicitation, and restrictive covenants
* Employment and independent-contractor classification
* Equity and incentive compensation
* Dispute resolution
* Governing law and jurisdiction
* Regulatory and compliance risk
* Insurance requirements
* Assignment and change-of-control provisions
* Force majeure
* Boilerplate analysis
* Internal contradictions and drafting defects
* Missing protections
* Negotiation strategy
* Redline recommendations
* Plain-English explanation
* Signature-readiness assessment

The legal skills must distinguish between:

* Identifying what the contract says
* Explaining practical consequences
* Identifying legal and commercial risk
* Recognizing missing information
* Recommending negotiation positions
* Flagging when jurisdiction-specific legal advice is required

The skills must not pretend to replace licensed legal counsel.

## Required Output for Every Skill

Produce each skill as its own Markdown file using a consistent Claude-compatible skill format.

Each skill must include:

### 1. Name

A concise kebab-case skill name.

### 2. Description

A precise explanation of:

* What the skill does
* When the agent should invoke it
* What problems it is intended to solve
* What it should not be used for

### 3. Purpose

The outcome the skill is designed to achieve.

### 4. Inputs

The information, files, context, assumptions, and constraints the agent needs.

### 5. Procedure

A rigorous step-by-step operating method.

The procedure must instruct the agent to:

* Inspect evidence before forming conclusions
* Separate facts, assumptions, inferences, and recommendations
* Resolve or explicitly document ambiguity
* Consider failure modes and edge cases
* Avoid unsupported claims
* Explain important tradeoffs
* Produce actionable results

### 6. Output Format

Define the exact structure of the skill’s final response or artifact.

### 7. Quality Checklist

A checklist the agent must complete before finishing.

### 8. Failure Conditions

Describe common mistakes, weak outputs, hallucination risks, and conditions that require escalation or clarification.

### 9. Evaluation Rubric

Provide a 1–5 scoring rubric covering:

* Correctness
* Completeness
* Depth of reasoning
* Evidence grounding
* Risk identification
* Actionability
* Clarity
* Appropriate uncertainty
* Compliance with the requested output format

Define what scores 1, 3, and 5 look like.

### 10. Evaluation Cases

Provide at least three test cases:

* A straightforward case
* An ambiguous or incomplete case
* A high-risk or adversarial case

For each test case, include:

* Input
* Expected behavior
* Critical elements required for a passing result
* Common failure modes

## Skill Design Principles

Every skill must:

* Be independently usable
* Have a narrow and clearly defined responsibility
* Avoid duplicating another skill
* State when another skill should be invoked
* Prefer evidence over intuition
* Surface uncertainty rather than hiding it
* Produce outputs that another agent or human can act on
* Include domain-specific terminology where appropriate
* Be detailed enough for reliable execution but not overloaded with irrelevant theory

## Library-Level Deliverables

In addition to the individual skill files, create:

### README.md

Include:

* Purpose of the library
* Directory structure
* How skills are selected and invoked
* How multiple skills can be composed
* Examples of software-engineering workflows
* Examples of legal contract-review workflows
* Limitations and escalation guidance

### SKILL-CATALOG.md

For every skill, list:

* Skill name
* Profession
* Category
* Description
* Trigger conditions
* Inputs
* Outputs
* Related skills

### EVALUATION-GUIDE.md

Define:

* How to run skill evaluations
* How to score results
* Minimum passing thresholds
* How to compare revisions
* How to detect regressions
* How to add new evaluation cases
* How to distinguish a weak skill definition from weak model execution

### COMPOSITION-WORKFLOWS.md

Provide multi-skill workflows for scenarios such as:

* Understanding an unfamiliar repository
* Designing and implementing a new feature
* Diagnosing a production incident
* Reviewing a pull request
* Planning a legacy-system migration
* Reviewing an independent-contractor agreement
* Reviewing a software-development agreement
* Reviewing an employment or equity agreement
* Preparing a contract negotiation brief

## Final Response

Return:

1. The proposed directory structure
2. The full skill inventory grouped by category
3. The complete contents of each file
4. A coverage analysis identifying any important professional competencies that remain outside the library
5. Recommendations for which skills should be considered foundational, advanced, or specialized

Favor depth, operational precision, and testability over generating a large number of shallow skills.
