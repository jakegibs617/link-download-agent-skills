# System archetypes — signatures and discriminating tests

Read this during phase 7, when a pattern looks like it might match a known
archetype. Its purpose is to make archetype claims falsifiable. Each entry
gives the signature, the **discriminating test** that separates it from the
archetypes it is most often confused with, the long-term consequence, and the
intervention the archetype implies.

**Rule: apply the discriminating test or drop the claim.** An archetype named
because the label sounds apt is worse than no archetype, because it carries an
implied intervention that may be exactly wrong for the actual structure. If two
archetypes both survive their tests, report both as candidates with the
observation that would separate them.

Every archetype claim MUST record contradicting evidence. If none was searched
for, the claim is `speculative` at best.

---

## 1. Fixes that fail

**Signature.** A fix produces rapid relief, then the problem returns at the
same or greater intensity, because the fix has an unintended consequence that
feeds the original problem after a delay.

**Discriminating test.** Does the *fix itself* cause the return? Trace the
mechanism from the fix to the recurrence. If the problem recurs merely because
the cause was never addressed, this is not "fixes that fail" — it is symptomatic
treatment, and the archetype adds nothing.

- vs. **shifting the burden**: there, the fix works but erodes the internal
  capability that would have solved it. Here, the fix actively regenerates the
  problem.

**Software instances.** Adding retries to mask a slow dependency, which raises
load and slows it further. Adding an index for every slow query until write
throughput collapses. Hiring contractors for a delivery crunch, which raises
review and onboarding load on the team that was already the constraint.

**Consequence.** Escalating cycle time between fix and recurrence shrinks; each
round costs more.

**Intervention.** Level 3–6. Find the loop the fix closes and break it, or
accept the short-term pain long enough to address the generating structure.

---

## 2. Shifting the burden (addiction / dependence)

**Signature.** A symptomatic solution is applied repeatedly. It works. Because
it works, the fundamental capability atrophies, so the symptomatic solution
becomes more necessary each cycle.

**Discriminating test.** Is a *capability* measurably declining while reliance
on the intervener grows? Name the capability and the evidence of decline. No
atrophying capability, no archetype.

- vs. **fixes that fail**: there the fix causes the problem to return; here the
  fix genuinely resolves each instance while eroding the ability to cope.

**Software instances.** A platform team firefighting product teams' incidents,
so product teams never learn to operate their services. Vendor-managed
complexity that no one internally can reason about. An expert who is always
paged, so nobody else builds the mental model. Codegen or an agent producing
code that no one on the team can maintain.

**Consequence.** Capability erodes below the point of recovery; the dependency
becomes structural and the cost of exit grows without bound.

**Intervention.** Level 7–8. Shift who bears the consequence, make the
capability decline visible, and time-box the symptomatic support explicitly.

---

## 3. Success to the successful

**Signature.** Two parties compete for a shared resource. Early success
allocates more resource to the winner, which produces more success, which
allocates more resource. Initial advantage compounds regardless of underlying
merit.

**Discriminating test.** Is there a **shared, allocated** resource, and does
allocation depend on prior performance? Both must hold. Without the allocation
mechanism this is just two teams with different outcomes.

- vs. **tragedy of the commons**: there the resource is depleted by
  uncoordinated use; here it is *awarded* by a decision rule.

**Software instances.** The team that ships fastest gets more headcount, so it
keeps shipping fastest while a team fighting a legacy system falls further
behind. The service with the best metrics gets the reliability budget. The
codebase area with tests attracts contributors, so untested areas stay
untestable.

**Consequence.** Structural inequality that looks like a merit ranking; the
starved side eventually fails and the failure is attributed to its people.

**Intervention.** Level 8. Change the allocation rule; decouple resource from
prior performance for a defined period; measure the starved side's constraint.

---

## 4. Tragedy of the commons

**Signature.** Multiple actors independently draw on a shared finite resource.
Each actor's incremental use is rational and its cost is spread across all
users, so total use exceeds capacity and the resource degrades for everyone.

**Discriminating test.** Is the cost of an individual's use **borne by
others**? If a team's own use degrades its own experience proportionally, the
feedback exists and this is a capacity problem, not a commons problem.

- vs. **limits to growth**: there a single actor hits a ceiling; here many
  actors degrade a shared pool that each has an incentive to keep using.

**Software instances.** A shared database everyone adds queries to. A CI fleet
where each team's slow test suite is everyone's queue wait. A shared staging
environment. An on-call rotation absorbing every team's operational shortcuts.
A rate-limited third-party API consumed by many services.

**Consequence.** Degradation for everyone, then a scramble for private
alternatives that fragments the platform.

**Intervention.** Level 7–8. Make individual consumption visible and
attributable, then price, quota, or partition it. Exhortation does not work
here and should not be recommended.

---

## 5. Limits to growth

**Signature.** A reinforcing growth loop runs, then slows and plateaus, because
it has engaged a balancing loop — a constraint that strengthens as growth
proceeds.

**Discriminating test.** Name the constraint and show that its resistance
*increases with growth*. A fixed obstacle is not a limit-to-growth structure;
the balancing loop must be driven by the growth itself.

- vs. **growth and underinvestment**: that is a limits-to-growth structure plus
  a decision rule that withholds investment in the constraint because the
  performance signal is delayed. If a capacity decision is being deferred, it
  is #7, which is more actionable.

**Software instances.** Adding engineers until coordination cost consumes the
gain. Onboarding customers until support load caps sales. Growing a monolith
until build and test time caps merge rate. A viral loop that saturates its
addressable segment.

**Consequence.** Plateau, then decline as the constraint keeps tightening while
effort continues to be spent on the growth engine.

**Intervention.** Level 3. Stop pushing the growth loop harder; move the
constraint, or change the structure so the constraint does not scale with
growth.

---

## 6. Escalation

**Signature.** Two parties each respond to the other's position, and each
response raises the other's. Reinforcing loop through a competitive comparison.

**Discriminating test.** Is each party's action a *response to the other's
relative position*? If both are independently responding to an external driver,
there is no escalation loop between them.

- vs. **accidental adversaries**: there the parties intend to cooperate and the
  harm is a side effect neither wants. Here each party intends to out-position
  the other.

**Software instances.** Feature-parity races that expand both products past
what either can maintain. Two teams adding defensive validation at a boundary
until every field is checked four times. Alert thresholds tightened in response
to a missed incident, then again. Estimate padding versus schedule compression.

**Consequence.** Both parties spend increasing resources to hold a relative
position that neither improves.

**Intervention.** Level 8–10. Change what is being compared, or make the
comparison stop determining the response. Unilateral de-escalation with the
mechanism stated openly is sometimes available and worth naming.

---

## 7. Growth and underinvestment

**Signature.** Growth strains capacity, performance degrades, but the
investment decision uses a performance standard that erodes with the degraded
performance — or the investment delay is long enough that the need is disputed
until it is acute. Capacity is therefore under-built, which further degrades
performance.

**Discriminating test.** Is there an identifiable **capacity investment
decision being deferred**, and is the deferral justified by current
(already-degraded) performance? Both. This is the most actionable archetype and
also the most over-claimed.

- vs. **limits to growth**: there the constraint is structural; here it is a
  deliberate under-investment maintained by a delay plus an eroding standard.

**Software instances.** Platform investment deferred each quarter because
feature work is measured and platform work is not, while build times and
incident rates worsen. Test infrastructure left to rot until the suite is
untrustworthy. Under-provisioned on-call staffing justified by last quarter's
(survived) load.

**Consequence.** Capacity permanently trails demand; the eventual investment is
made under duress at several times the cost, often as a rewrite.

**Intervention.** Level 7–8. Set the capacity standard against demand rather
than against current performance, shorten the investment feedback delay, and
make the erosion of the standard itself visible.

---

## 8. Eroding goals (drifting standards)

**Signature.** Performance falls short of the goal. Rather than raising
performance, the goal is lowered to reduce the gap. The lower goal reduces
pressure, performance falls further, the goal is lowered again.

**Discriminating test.** Show the goal or standard **changing over time**, and
show it changing in response to the gap. A goal that was always low is not an
eroding goal — it is a low goal, which is a different (and easier) finding.

- vs. **shifting the burden**: there capability atrophies while the standard
  holds; here the standard moves to meet the capability.

**Software instances.** An SLO relaxed after each quarter of misses. Flaky tests
retried, then quarantined, then deleted. A coverage gate lowered to unblock a
release, twice. "Definition of done" that quietly sheds criteria. Latency
targets restated at a higher percentile.

**Consequence.** Slow decline that is invisible at every individual step,
because each adjustment is locally defensible.

**Intervention.** Level 8–10. Anchor the standard to something external —
customer requirement, competitor, physical limit — and make every change to the
standard an explicit, recorded, and reviewed decision rather than an edit.

---

## 9. Accidental adversaries

**Signature.** Two parties who intend to cooperate each take a locally
protective action that undermines the other's ability to deliver. Each then
sees the other as the problem, and protects itself further.

**Discriminating test.** Do both parties **intend** to cooperate, and is the
harm a side effect of self-protection rather than a goal? If either is
deliberately competing, see escalation.

- vs. **escalation**: intent. Adversaries by accident want the partnership to
  work.

**Software instances.** Product ships to a date, so engineering pads estimates,
so product commits earlier to compensate. Platform adds a change-approval gate,
so product teams route around the platform, so the platform adds more gates. QA
blocks releases, so developers batch changes to reduce QA passes, so QA finds
more per pass and blocks harder.

**Consequence.** A relationship both sides describe as broken, in which each
side's account of the cause is accurate about the other and blind about itself.

**Intervention.** Level 7. Make each side's protective action and its effect on
the other visible to both, in one conversation. This archetype is unusual in
that surfacing the structure is often most of the fix — but only if both
accounts are presented, not one.

---

## Reporting an archetype

```text
Archetype:
Observed pattern (with the time evidence):
Discriminating test applied, and its result:
Supporting evidence:
Contradicting evidence:
Confidence: evidenced | inferred | speculative | unknown
Long-term consequence if unaddressed:
Implied leverage level and intervention:
```

If the pattern matches no archetype, say so. Most systems contain one or two
real archetypes and a great deal of ordinary poor design; reporting the ordinary
poor design plainly is more useful than promoting it to a pattern.
