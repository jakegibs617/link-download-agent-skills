# ADR-014: Keep the rendered-report cache on a mounted volume

- **Status:** Accepted
- **Date:** 2024-11-08
- **Deciders:** Reporting team, Platform team
- **Supersedes:** none

## Context

`reports-api` renders customer-facing PDF and CSV reports on demand. Rendering a
large report takes 20–90 seconds of CPU, so rendered output is cached and served
directly on repeat requests. The cache currently holds roughly 90GB.

Every rendered report is fully regenerable from the source data in Postgres. The
cache holds no data that exists only in the cache: losing it costs re-render CPU
and latency on the next request, not data.

We evaluated object storage (S3) against a mounted persistent volume. At our
current size and access pattern — heavily repeated reads of a small hot set,
written once — the volume came out roughly 40x cheaper per month once request
and egress charges were included.

## Decision

Store the rendered-report cache on a persistent volume mounted at
`/var/cache/reports`, not in object storage.

We accept that this makes `reports-api` instances non-interchangeable with
respect to cache warmth, and that it is a deliberate departure from treating all
persistent state as an attached backing service.

## Consequences

- Cheaper by roughly 40x at current volume.
- A replacement instance starts with a cold cache and re-renders on first
  request. Acceptable: the hot set re-warms within about an hour.
- The volume is a single-writer resource, which constrains us to one region.

## Revisit when either holds

1. The cache exceeds **500GB**, at which point the cost advantage over object
   storage no longer holds at our access pattern; or
2. We run **more than one region**, at which point a single-writer volume stops
   being viable at all.

**Status as of the last review:** 90GB, single region. Neither trigger met.
