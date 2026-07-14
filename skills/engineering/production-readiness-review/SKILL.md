---
name: production-readiness-review
description: Gates a service or major feature before launch against a comprehensive readiness checklist — reliability, observability, security, scalability, operability, data safety, and rollback — producing an evidence-backed go/no-go with blocking gaps identified. Use before shipping a new service to production, a high-risk launch, or an on-call handoff of a new system. Not for reviewing a code diff (code-change-review) or designing the resilience itself (reliability-fault-tolerance, which this verifies).
---

# Production Readiness Review

## Purpose

Produce an evidence-backed go/no-go decision for a production launch:
systematically verify the system is ready across every operational
dimension, identify the blocking gaps concretely, and refuse the comfortable
rubber-stamp — so the launch fails in review, on paper, rather than at 3am
in front of customers.

## Inputs

- The system/feature launching, its blast radius (users, money, data,
  reputation), and the launch type (new service, major feature, region
  expansion). Higher blast radius raises the bar.
- Access to verify claims: the actual monitoring, runbooks, deploy config,
  load-test results, security review — not a self-report checklist. MUST
  verify against reality; "yes we have monitoring" is a claim to check.
- The launch date and any hard constraints (this shapes what's a blocker vs.
  a fast-follow, but MUST NOT lower the bar on data-safety/security).

## Procedure

Work the dimensions; for each, the standard is **evidence, not assertion**.

1. **Reliability & fault tolerance.** SLOs defined? Dependencies have
   timeouts/retries/fallbacks (verify, don't assume — route depth to
   `reliability-fault-tolerance`)? Graceful degradation tested? Single points
   of failure known and accepted? Capacity headroom for expected + spike load?
2. **Observability.** Can an on-call person detect and diagnose an incident
   from what's instrumented? Symptom-based alerts that actually page? Golden-
   signal dashboards? Correlation IDs? MUST test the "could we debug the
   likely incident?" question, not just "do metrics exist?".
3. **Security.** Auth/authz enforced, secrets managed, input validated,
   sensitive data handled per policy, dependencies scanned. Non-trivial
   surface routes to `security-engineering`. A launch touching PII/payments
   MUST have a real security review, not a checkbox.
4. **Data safety.** Backups exist and restore has been *tested* (an untested
   backup is not a backup), migrations are reversible or point-of-no-return
   is known, data-loss scenarios considered, retention/deletion compliant.
5. **Operability & rollback.** A one-command/fast rollback that's been
   tested; runbooks for the likely failures; deploy is safe/progressive;
   on-call is staffed and actually understands the system (route to
   `knowledge-transfer-verification`). MUST confirm rollback was tested, not
   just documented.
6. **Scalability.** Load-tested at expected and spike levels with real
   results (not "should handle it"); known scaling limits documented;
   resource limits and autoscaling configured and verified.
7. **Legal/compliance where applicable.** Regulatory requirements, data
   residency, audit logging, terms — flagged for the right owners, not
   engineered around.
8. **Rank the gaps and decide.** Each gap: blocker (unsafe to launch),
   fast-follow (launch acceptable with a committed date), or accepted risk
   (documented, owned). MUST separate these honestly and give a clear
   go / go-with-conditions / no-go — with the specific blockers, not a vibe.
   MUST NOT pass a launch with an unmitigated data-loss or security blocker
   regardless of deadline pressure.

## Output Format

```markdown
# Production readiness review: <system> — Verdict: <GO | GO-WITH-CONDITIONS | NO-GO>
## Blast radius and launch type
## Dimension assessment (each: status + evidence checked, not asserted)
| Dimension | Status (ready/gap/blocker) | Evidence verified | Gap |
(Reliability, Observability, Security, Data safety, Operability/Rollback, Scalability, Compliance)
## Blocking gaps (must-fix before launch, specific)
## Fast-follows (launch OK, committed date + owner)
## Accepted risks (documented, owner, tripwire)
## Verdict and rationale
## Escalations (→ specialist skills / owners)
```

## Quality Checklist

- [ ] Every dimension assessed against verified evidence, not self-report.
- [ ] "Could we detect and debug the likely incident?" actually tested.
- [ ] Backup *restore* and rollback confirmed tested, not just existing.
- [ ] Load results are real numbers at expected + spike, not "should be fine".
- [ ] Gaps classified blocker/fast-follow/accepted honestly.
- [ ] No unmitigated data-loss or security blocker passed under deadline pressure.
- [ ] Clear go/no-go with specific blockers named.

## Failure Conditions

- **Rubber-stamp review:** a checklist ticked from self-reports, verifying
  nothing — the failure this skill exists to prevent.
- **Assertion-as-evidence:** accepting "we have monitoring/backups/load
  testing" without checking they work.
- **Untested-backup / untested-rollback:** counting their existence as
  readiness.
- **Deadline capture:** downgrading a real data-safety/security blocker to
  fast-follow because the date is fixed.
- **Existence-over-efficacy observability:** metrics exist but wouldn't
  surface the actual incident.
- **Vague verdict:** "mostly ready" with no clear decision or specific blockers.
- **Escalate / stop** when: a dimension needs specialist depth (route to
  `security-engineering`/`reliability-fault-tolerance`/etc. and treat their
  finding as input); a blocker is non-engineering (compliance, legal — the
  owner decides, not you); or you're pressured to pass a launch you assess as
  unsafe (state the no-go and its reasons plainly — the review's value is
  that it can say no).

## Related skills

- `reliability-fault-tolerance`, `security-engineering`,
  `observability-incident-response`, `migration-planning`,
  `knowledge-transfer-verification` — the specialist reviews this consolidates
  into a launch decision.
- `engineering-risk-analysis` — the risk framing behind accepted-risk items.
- `cicd-release-engineering` — the deploy/rollback machinery this verifies.
