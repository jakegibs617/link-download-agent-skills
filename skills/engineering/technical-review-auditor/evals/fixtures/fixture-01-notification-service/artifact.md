# Design: Unified Notification Service

**Status:** proposed · **Author:** platform team

## Background

Six services currently send their own email and push notifications. Templates are duplicated, we cannot answer "what did we send this user last week", and two teams have shipped their own retry logic. We propose a single Notification Service that all internal services call.

## Proposal

Services publish a `NotificationRequested` event to a topic. The Notification Service consumes it, renders a template, and dispatches via the appropriate provider (SendGrid for email, FCM for push).

Event shape:

```json
{
  "user_id": "u_8123",
  "channel": "email",
  "template": "order_shipped",
  "params": {"order_id": "o_55"},
  "requested_at": "2026-03-11T09:00:00Z"
}
```

Our three partner integrations will publish to this same topic, so the event shape is part of the public integration contract from day one.

## Storage

Postgres, one `notifications` table:

| column | type |
|---|---|
| id | bigserial |
| user_id | text |
| channel | text |
| template | text |
| status | text |
| created_at | timestamptz |

We keep every notification row indefinitely so support can answer history questions.

## Queue choice

We evaluated two options in depth.

**SQS.** Managed, cheap, familiar to the team. Ordering is best-effort on standard queues.

**Kafka.** We already run a cluster for the analytics pipeline. Higher operational burden, but ordering guarantees per partition and better throughput headroom.

We spent considerable time on this. Kafka's partition ordering initially looked attractive, but notification ordering does not actually matter for our use cases — a shipping email arriving before a confirmation email is not a real problem. SQS also has a simpler client library, the team has used it before, and the per-message cost at our projected volume is roughly a third of the equivalent Kafka capacity. Weighing familiarity and cost against a guarantee we do not need, **we will use SQS.**

The alternative of writing our own queue on top of Postgres was considered and rejected as obviously impractical.

## Performance

The service should be fast and highly available. SendGrid handles 50,000 messages per second, so provider throughput will not be a bottleneck. We expect around 200,000 notifications per day at launch.

## Rollout plan

1. Week 1–2: build the service skeleton and Postgres schema
2. Week 3: template rendering and the admin template editor
3. Week 4: SQS consumer and email dispatch
4. Week 5: migrate the orders service to publish events
5. Week 6: migrate remaining five services
6. Week 7: partner integrations onboard to the public event
7. Week 8: load test against SendGrid at projected peak

## Open questions

- Do we need a per-user notification preference system? Probably a later phase.
