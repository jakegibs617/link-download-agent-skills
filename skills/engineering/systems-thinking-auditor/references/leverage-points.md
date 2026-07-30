# Leverage points — the eleven levels

Read this during phase 9, when ranking interventions. The hierarchy runs from
shallow and safe to deep and disruptive. Deeper is not better; deeper is more
powerful in both directions.

**The recommendation rule: the highest *justified* level.** Justified means
there is evidence that the shallower levels cannot hold the improvement, and
that the deeper intervention is implementable by someone identifiable. A
level-1 recommendation for a structurally generated problem suppresses a symptom.
A level-11 recommendation with no implementable step is an essay.

State the level of every recommendation. The reader's most useful check on this
audit is seeing that the levels are not all the same number.

---

## 1. Parameters and thresholds

Numbers inside an existing structure: timeouts, retry counts, batch sizes, cache
TTLs, autoscaler bounds, alert thresholds, budgets, headcount, sprint length,
WIP limits, prices.

**Typical form.** "Raise the timeout to 5s." "Add two engineers." "Lower the
alert threshold."

**Characteristic failure.** Parameter changes are where recommendations go to
die politely. They are easy to approve, easy to implement, and leave the
generating structure intact — so the problem returns and the next parameter
change is proposed. This is the single most common weak output of a systems
audit.

**When it is genuinely right.** The structure is sound and a value is simply
mis-set; or containment is needed now while a structural change is prepared. Say
which of the two it is.

---

## 2. Buffers and capacity

The size of stabilizing stocks: queue capacity, connection pools, spare
capacity, cash reserves, schedule slack, on-call staffing depth, inventory.

**Typical form.** "Add headroom." "Increase the buffer." "Hold 20% slack."

**Characteristic failure.** Buffers are expensive to hold and get optimized away
by someone measuring efficiency. A buffer recommendation without a named owner
and a stated cost will be removed within two quarters, and its removal will not
be attributed to the incident it causes. Larger buffers also lengthen the
feedback delay, which can make behavior worse — check level 4 before
recommending here.

---

## 3. Structure of stocks, flows, and organization

Physical and organizational arrangement: service and module boundaries, data
ownership, who reports where, how work is routed, topology, which team owns
which surface.

**Typical form.** "Split this service at the tenancy boundary." "Give this team
end-to-end ownership including on-call." "Route requests by class rather than
FIFO."

**Characteristic failure.** Expensive and slow, and frequently recommended when
level 7 or 8 would have worked at a fraction of the cost — reorganizing is
visible and satisfying. Structure is also where a system's real constraints
live, so structural change is the right answer more often than the shallower
levels admit. Check whether the "structural" constraint is actually a policy
(level 8) in disguise.

---

## 4. Delays in the system

The length of the feedback path between action and visible consequence, and
whether anyone is reacting inside it.

**Typical form.** "Move this check from nightly to pre-merge." "Report cost per
tenant weekly rather than in the quarterly review." "Stop reacting to the daily
number when the loop delay is three weeks."

**Characteristic failure.** Under-recommended, because delays are invisible until
looked for. The two directions differ: shortening a delay is usually cheap and
usually helps; lengthening a reaction time to match an unshortenable delay feels
like inaction and is often the correct call. Say which one you mean.

---

## 5. Strength of balancing loops

Whether the corrective loops that keep the system in bounds exist, are strong
enough, and are not being defeated.

**Typical form.** "Add a backpressure signal that actually reduces intake."
"Make the SLO breach automatically stop feature merges." "Restore the loop that
the exception process is currently bypassing."

**Characteristic failure.** A balancing loop that can be overridden under
pressure is not a balancing loop; it is a suggestion. Check who can override it
and how routinely they do — routine override is the finding. Also check that the
loop's sensor is measuring the actual variable and not a proxy that decoupled.

---

## 6. Gain of reinforcing loops

Weakening a vicious loop, or seeding and strengthening a virtuous one.

**Typical form.** "Break the retry-amplification loop with a circuit breaker."
"Cap the escalation by removing the comparison that drives it." "Close the
adoption loop by feeding usage data back into ranking."

**Characteristic failure.** Weakening a reinforcing loop is usually higher
leverage than strengthening the balancing loop that opposes it, and is usually
proposed second. Seeding a virtuous loop is the most over-claimed intervention
in product work: state the evidence that each link exists, or label it
speculative.

---

## 7. Structure of information flows

Who knows what, when, and whether the actor who decides receives the signal
their decision produces.

**Typical form.** "Show each team its own CI queue contribution." "Put the
on-call pager on the team that writes the code." "Report the cost of a feature
to the team that chose to build it." "Publish the number that is currently only
in a dashboard nobody opens."

**Characteristic failure.** Adding information nobody acts on, which produces a
dashboard and no behavior change. The test is not "is the information
available?" but "does the actor who can change the behavior receive it, in time,
in a form that makes the consequence theirs?" Closing an information loop to a
decision-maker who previously did not feel the consequence is the highest-value
cheap intervention available, and it is routinely skipped in favor of level 1.

---

## 8. Rules of the system — incentives, constraints, permissions

What is rewarded, punished, permitted, required, and measured. The formal rules
and the cultural ones that override them.

**Typical form.** "Measure the team on outcome retention rather than ship
count." "Make the exception process require the cost-bearer's signature."
"Remove the metric that is being gamed and replace it with the outcome."

**Characteristic failure.** Usually outside the requester's authority, so it is
softened into a level-1 recommendation and loses its force. Name it at level 8
anyway, addressed to whoever can act — a finding the requester cannot implement
is still a finding, and mis-addressing it is worse than escalating it. Second
failure: changing a metric without asking how the new one will be gamed, which
just moves the gaming.

---

## 9. Power to add, change, or self-organize structure

Whether the system can restructure itself: who is allowed to create a new
service, change a process, run an experiment, or reorganize a team.

**Typical form.** "Let teams change their own process without platform
approval." "Fund a standing capacity for experiments with a stop rule."

**Characteristic failure.** Self-organization increases adaptability and
decreases consistency, and the consistency loss is usually the reason the
constraint was added. Recommending this level without naming what will
fragment is incomplete.

---

## 10. Goals of the system

What the system is actually for — the objective that its rules, structure, and
metrics serve.

**Typical form.** "The operative goal is quarterly ship count; while that holds,
every reliability intervention below will be traded away." "Change the goal from
engagement to retained outcome."

**Characteristic failure.** Almost never actionable by the person who requested
the audit, and therefore either omitted or delivered as a verdict on their
employer. The productive form is diagnostic: name the operative goal, show what
it will do to each recommendation below it, and let the reader decide whether
they can move it. An audit that recommends level 1–8 changes while an
incompatible operative goal stands, without saying so, is misleading.

---

## 11. Paradigms — the beliefs the goals come from

The unexamined assumptions that make the goal look inevitable: that growth is
the objective, that reliability is a cost center, that developer time is more
expensive than machine time, that the team is the unit of delivery.

**Typical form.** Naming the assumption and showing it is an assumption, with
one system that operates on a different one.

**Characteristic failure.** This level produces the most impressive-sounding and
least useful recommendations. Include it only when a specific belief is
demonstrably driving a specific decision you can point at, and only alongside
implementable recommendations at lower levels. A paradigm finding with nothing
under it lets everyone agree, feel enlightened, and change nothing.

---

## Field template — per recommendation

```text
Intervention:
Leverage level (1–11), and why not a shallower one:
Problem it addresses (which finding):
Expected mechanism (how the behavior changes):
Expected benefit:
Time to effect:
Dependencies and who must act:
Tradeoff (what gets worse):
Unintended consequences (including which loop or buffer it might remove):
Reversibility:
Evidence strength: evidenced | inferred | speculative | unknown
Validation method: hypothesis · signal · guardrail · review date · stop condition
```

## Grouping recommendations for the report

- **Contain now** — level 1–2, explicitly labeled as containment with the
  structural work it is buying time for.
- **Restructure next** — level 3–6, with the sequencing and the owner.
- **Redesign later** — level 7–8 and above, with what has to be true first.
- **Experiment before committing** — where the mechanism is inferred or
  speculative and a bounded test would settle it. Prefer this over a confident
  recommendation built on a plausible loop.
- **Defer deliberately** — findings you are choosing not to act on, with the
  tripwire that should reopen them. This group's absence is a sign the audit
  recommended everything it found.
