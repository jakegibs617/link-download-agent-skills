# Systems concepts — working reference

Read this while performing phases 4–6 (stocks, loops, delays), not before
starting. It supplies candidate lists and field templates so the audit does not
have to invent structure from memory. Nothing here licenses naming an element
the evidence does not support.

---

## Stocks and flows

A **stock** is anything that accumulates or depletes over time and persists
between events. A **flow** is the rate at which a stock changes. The
distinguishing test: if you froze all activity, a stock would still have a
value; a flow would be zero.

**Judge inflow against outflow, never level alone.** A high level with balanced
flows is stable. A modest level with inflow exceeding outflow is the problem
that has not arrived yet.

### Candidate stocks — architecture and code

| Stock | Inflow | Outflow |
|-------|--------|---------|
| Technical debt | shortcuts taken, deferred cleanup, drift from conventions | refactoring, deletion, decommissioning |
| Open defects | bugs introduced, bugs discovered | bugs fixed, bugs closed as won't-fix |
| Unprocessed jobs / queue depth | arrival rate, retries, replays | processing rate, drops, expiries |
| Unreviewed or unmerged changes | changes authored | changes reviewed and merged, abandoned |
| Test coverage / suite trust | tests added, flakes fixed | code added untested, flakes tolerated |
| Infrastructure headroom | provisioning, efficiency work | traffic growth, feature weight |
| Security exposure | new surface, unpatched dependencies, drift | patching, hardening, surface removal |
| Documentation accuracy | docs written and verified | system change without doc change |
| Operational knowledge | incidents survived, onboarding, pairing | attrition, team rotation, forgetting |
| Alert credibility | actionable alerts | noisy alerts, alerts nobody owns |

### Candidate stocks — product and business

| Stock | Inflow | Outflow |
|-------|--------|---------|
| Active users | acquisition, reactivation | churn, dormancy |
| Customer trust | reliability delivered, promises kept | incidents, broken commitments, dark patterns |
| Pipeline / backlog | qualified leads, requests | closed deals, rejections, staleness |
| Cash | revenue, financing | costs, refunds |
| Support load | tickets created (often by product defects) | tickets resolved, deflected by fixes |
| Brand permission | consistent delivery, differentiation | inconsistency, commoditization |

### Candidate stocks — team and workflow

| Stock | Inflow | Outflow |
|-------|--------|---------|
| Work in progress | work started | work finished |
| Team capacity | hiring, ramping, tooling leverage | attrition, interrupts, context switching |
| Decision debt | decisions deferred | decisions made and recorded |
| Trust between teams | commitments kept | surprises, escalations over heads |
| Burnout load | sustained overtime, on-call pressure | recovery, load shedding |

### Field template — per stock

```text
Stock:
Current level (and how you know):
Inflows (rate, driver):
Outflows (rate, constraint):
Binding constraint on each flow:
How it is measured today (or: not measured):
Risk if it depletes:
Risk if it accumulates:
Basis: evidenced | inferred | speculative | unknown
```

A stock that nobody measures is worth reporting on that basis alone. Unmeasured
stocks are where slow accumulation goes unnoticed until it becomes an event.

---

## Loop mechanics

A **loop** exists only when the causal chain returns to affect an earlier
variable in the same chain. Trace it back to the starting variable explicitly
before naming it. If it does not close, it is a causal chain — report it as one.

**Reinforcing (positive) loops** amplify: each pass makes the next pass
stronger, in either direction. They produce exponential growth or collapse, and
they are what makes a system's behavior surprise people.

```text
Urgent releases rise
→ validation gets skipped
→ defects reach production
→ emergency work consumes the team
→ less time for validation on the next release
→ urgent releases rise
```

**Balancing (negative) loops** stabilize toward a goal. They produce
convergence, or oscillation when the delay around the loop is long relative to
the reaction time.

```text
Queue depth rises
→ autoscaler adds workers
→ processing capacity rises
→ queue depth falls
```

Three things to check on every loop:

1. **Direction of each link.** "A increases → B increases" or "A increases →
   B decreases". A loop with an odd number of decreasing links is balancing; an
   even number (including zero) is reinforcing. This is a mechanical check, and
   it catches misclassification.
2. **Strength now, not in principle.** A loop can be real and dominated by
   another loop. Say which loop currently dominates the behavior.
3. **What holds it.** A reinforcing loop that has not run away is being held by
   a balancing loop or a constraint. Find it — removing it accidentally is a
   common side effect of otherwise sensible changes.

### Field template — per loop

```text
Loop name:
Type: reinforcing | balancing
Chain (variable → variable, with direction of each link):
Closes back on: <the starting variable>
Evidence per link:
Delay around the loop:
Strength now, and which loop dominates:
Conditions under which it breaks or reverses:
What it produces if left alone:
Basis: evidenced | inferred | speculative | unknown
```

### Loops worth checking for specifically

- **Retry amplification** — failure raises retries, retries raise load, load
  raises failure. Reinforcing, fast, and frequently mistaken for a capacity
  problem.
- **Alert fatigue** — noise lowers attention, lowered attention raises missed
  incidents, incidents add more alerts. Reinforcing, slow.
- **Review bottleneck** — large batches slow review, slow review encourages
  larger batches. Reinforcing.
- **Debt interest** — debt slows delivery, schedule pressure adds shortcuts,
  shortcuts add debt. Reinforcing, slow, and the reason debt cleanups refill.
- **Support-load loop** — defects create tickets, tickets consume the engineers
  who would fix defects. Reinforcing.
- **Adoption loop** — usage improves the product (data, network, content),
  improvement drives usage. Reinforcing; the one most PRDs assume and few
  evidence.
- **Onboarding drag** — growth adds coordination cost, coordination cost slows
  everyone. Balancing (limits to growth), slow.
- **Capacity balancing** — load rises, capacity is added, load is absorbed.
  Balancing; check the delay, because a long provisioning delay turns this into
  oscillation.

---

## Delays

Delay between action and visible consequence is why competent people mismanage
systems they understand. Overreaction produces oscillation; underreaction
produces accumulation until the consequence becomes an event.

| Action | Delayed outcome | Typical order |
|--------|-----------------|---------------|
| Shortcut taken | maintenance cost realized | months |
| Defect introduced | production failure | days to years |
| Hire made | net productivity contribution | 1–2 quarters |
| Feature shipped | adoption or abandonment signal | weeks |
| Security weakness introduced | exploitation | unbounded |
| Policy or metric changed | behavioral adaptation and gaming | weeks |
| Cost incurred (cloud, licensing, complexity) | cost recognized in a review | 1–2 quarters |
| Trust broken | churn appears in the numbers | months |
| Documentation goes stale | onboarding failure | until the next new hire |
| Capacity provisioned | capacity available | minutes to quarters |

### Field template — per delay

```text
Action:
Delayed outcome:
Expected delay:
Currently visible to whom (or: invisible):
Risk of overreaction inside the delay:
Risk of underreaction across it:
Basis: evidenced | inferred | speculative | unknown
```

Report a long invisible delay even when nothing has gone wrong yet. By
construction, the evidence arrives after the decision that caused it.

---

## Constraints

Find the binding constraint before recommending capacity anywhere else. In most
systems one constraint governs throughput, and adding capacity elsewhere adds
inventory rather than output — visible as a stock accumulating just upstream of
the real constraint.

Also distinguish a **constraint** (physical or contractual, cannot be moved
within the horizon) from a **policy** (a rule someone chose, which looks
identical from inside the system). Misclassifying a policy as a constraint is
one of the most common reasons a high-leverage intervention is never
considered.
