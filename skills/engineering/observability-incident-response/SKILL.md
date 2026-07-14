---
name: observability-incident-response
description: Two linked capabilities — designing observability (metrics, logs, traces, SLOs, alerts that fire on symptoms not causes) and running live incidents (stabilize first, diagnose second, blameless postmortem after). Use during or after a production incident, when building monitoring/alerting, or when alerts are noisy or blind. Not for finding a bug's root cause in code (debugging-root-cause-analysis, invoked during diagnosis) or designing runtime resilience (reliability-fault-tolerance).
---

# Observability and Incident Response

## Purpose

During an incident: stop customer pain fast, then find why, then prevent
recurrence — in that order. For observability: instrument systems so the
next incident is detected on symptoms, diagnosed from signals already
present, and never silently missed.

## Mode selection

State which mode you're in. **Live incident** (something is broken now) →
prioritize mitigation, Procedure A. **Observability design** (building/
fixing monitoring) → Procedure B. If an "incident" is actually already
stable, treat it as diagnosis (`debugging-root-cause-analysis`), not a fire.

## Inputs

- Live incident: the symptom, when it started, who/what is affected, recent
  changes (deploys, config, traffic), and available signals (dashboards,
  logs, alerts).
- Observability design: the system, its critical user journeys, existing
  instrumentation, and the SLOs (or the need to define them).

## Procedure A — Live incident

1. **Assess impact and declare.** What's broken, how many users/how much
   money, since when. Set severity from impact, not cause. MUST establish
   impact before diagnosing — it drives urgency and comms.
2. **Mitigate before you understand.** The goal is stopping pain, not
   assigning blame. Reach for the fast reversible levers first: roll back
   the recent deploy, disable the feature flag, fail over, shed load, scale
   out. A plausible mitigation now beats a perfect diagnosis in an hour.
   Correlate with the most recent change — most incidents are change-induced.
3. **Communicate on a cadence.** A clear status (what's affected, what
   you're doing, next update time) to stakeholders, updated on a fixed
   interval. Silence during an incident is its own failure.
4. **Diagnose once stable (or in parallel if safe).** Now use the signals;
   hand the code-level root-cause hunt to `debugging-root-cause-analysis`.
   MUST NOT block mitigation on full diagnosis for a customer-impacting fire.
5. **Confirm recovery with data.** Verify the symptom metric actually
   returned to normal and stayed there — declared-resolved-but-still-broken
   is a repeat incident. Watch for the second wave (thundering herd on
   recovery).
6. **Blameless postmortem.** Timeline, contributing factors (systems and
   process, not people), what detected it and how fast, and tracked action
   items with owners. MUST attack the conditions that let it happen and be
   detectable late — not the human who pushed the button.

## Procedure B — Observability design

1. **Instrument for the user's experience first.** SLIs from the user's
   perspective (latency, error rate, availability of the journey), with
   SLOs and error budgets. Symptom-based, because that's what users feel.
2. **Cover the three signals for their jobs:** metrics for aggregate trends
   and alerting, traces for cross-service latency attribution, logs
   (structured, correlation-ID-tagged) for per-event detail. Note what each
   can and can't answer; don't log what a metric should aggregate.
3. **Alert on symptoms, page on urgency.** Alerts fire on user-facing SLO
   burn, not on causes (high CPU isn't an incident; the latency it causes
   is). Every page MUST be actionable and urgent; non-urgent signals go to
   dashboards/tickets, not the pager. Ruthlessly cut noisy alerts — alert
   fatigue is a detection failure.
4. **Make it debuggable:** correlation IDs across boundaries, cardinality
   budget respected, and the "can we answer X from what we collect?" test
   for the likely next incident's questions.
5. **Close the loop:** dashboards a responder actually uses, runbooks linked
   from alerts, and deploy markers so change-correlation is instant.

## Output Format

Live incident:
```markdown
# Incident: <symptom> — Sev<n>
## Impact (who/how many/since when)
## Mitigation actions (taken, effect, timestamps)
## Current status + next update time
## Diagnosis (once stable; RCA handoff)
## Recovery confirmation (metric back to normal)
## Postmortem: timeline / contributing factors / detection gap / action items (owners)
```
Observability design:
```markdown
# Observability design: <system>
## SLIs/SLOs and error budgets (user-journey based)
## Signal plan (metrics / traces / logs — each with its job)
## Alerting (symptom-based, actionable pages vs dashboard signals)
## Debuggability (correlation IDs, runbooks, deploy markers)
## Gaps: questions we currently can't answer
```

## Quality Checklist

- Live: [ ] impact assessed before diagnosis; [ ] mitigation prioritized over
  root cause; [ ] communication cadence set; [ ] recovery confirmed by data;
  [ ] postmortem blameless with owned actions.
- Design: [ ] SLIs user-centric; [ ] alerts on symptoms and actionable;
  [ ] noisy/cause-based alerts cut; [ ] next-incident questions answerable.

## Failure Conditions

- **Diagnosis-before-mitigation:** debugging root cause while customers bleed.
- **Blame postmortem:** "human error" as a root cause — stops the learning.
- **Cause-based alerting:** paging on CPU/memory, missing the user-facing
  outage; or a pager so noisy it's ignored.
- **Premature all-clear:** resolving before the metric confirms recovery.
- **Log-everything / metric-nothing:** unstructured logs where metrics/traces
  were needed; unanswerable incidents.
- **Escalate / stop** when: mitigation requires access/authority you don't
  have (escalate immediately, don't wait); impact suggests a security breach
  or data loss (invoke the security/data-loss path, preserve evidence); or
  the incident is actually stable and non-urgent (downgrade to diagnosis).

## Related skills

- `debugging-root-cause-analysis` — the code-level cause hunt during/after diagnosis.
- `reliability-fault-tolerance` — the resilience mechanisms whose absence
  caused the incident; postmortem actions often route here.
- `cicd-release-engineering` — rollback/deploy levers used in mitigation.
