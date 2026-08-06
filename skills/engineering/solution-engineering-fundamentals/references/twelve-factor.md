# The Twelve-Factor App

Source: [12factor.net](https://12factor.net) (Adam Wiggins, 2011). A methodology
for building software-as-a-service apps that are portable across execution
environments, deployable continuously, and scalable without architectural change.

**Scope check before applying any of this.** The factors bind a *deployable,
long-running, horizontally scalable service*. They mostly do not bind a library, a
one-off script, a desktop application, a scheduled batch job that runs to
completion, or a local developer tool. Citing a factor against one of those is a
category error — say the factor does not apply and why, rather than forcing it.

Each entry below gives the factor, the violation signature to look for, and the
consequence that makes it worth flagging.

---

## I. Codebase

**One codebase tracked in revision control, many deploys.**

*Violation signature:* a per-environment fork or long-lived branch; a `prod`
branch that has diverged from `main`; environment-specific code paths selected by
a compile-time switch rather than runtime config.

*Consequence:* environments drift silently, and a fix verified in one is unproven
in the others. Parameterize instead of forking.

## II. Dependencies

**Explicitly declare and isolate dependencies.**

*Violation signature:* reliance on a system-wide package, a globally installed
CLI, or a tool assumed present on the host; a manifest with no lockfile;
"install X first" living in a README instead of the dependency declaration.

*Consequence:* builds are reproducible only on machines that already worked. The
declaration must be complete enough that a clean environment can build from it.

## III. Config

**Store config in the environment.**

The test: *would this value differ between deploys of the same code?* If yes it is
config — credentials, per-environment endpoints, resource handles, feature
toggles. If no, it is code, and belongs in the repo.

*Violation signature:* secrets or environment-specific endpoints in committed
config files; a config file per environment checked into the repo; a constant that
has to be edited before a release.

*Consequence:* the codebase cannot be open-sourced or shared without leaking
credentials, and a config change requires a rebuild. Note the deliberate tension
with Factor X: same code and same backing-service types across environments,
intentionally *different* config.

## IV. Backing services

**Treat backing services as attached resources.**

Databases, queues, caches, SMTP, object storage, and third-party APIs are all
attached resources reached through a handle in config. A local instance and a
managed production one should be swappable without a code change.

*Violation signature:* a connection string constructed in code; a code path that
branches on which environment's database it is talking to; a local-only adapter
with no production equivalent.

*Consequence:* resources cannot be swapped, failed over, or replaced without a
deploy. This factor is what makes Factor X affordable.

## V. Build, release, run

**Strictly separate build, release, and run stages.**

Build compiles code into a bundle. Release combines that bundle with a config set
and gets a unique, immutable ID. Run executes a release.

*Violation signature:* mutating code on a running server; a release that cannot be
identified by ID; a rollback that requires rebuilding from source; config baked
into the build artifact.

*Consequence:* you cannot answer "what exactly is running" or roll back to a known
state. Releases MUST be immutable and append-only.

## VI. Processes

**Execute the app as one or more stateless, share-nothing processes.**

*Violation signature:* session state, caches, or uploaded files held in process
memory or on the local filesystem between requests; sticky sessions compensating
for state that should not be local; a "warm-up" step that must not be repeated.

*Consequence:* horizontal scaling breaks in ways that only appear under load or
after a restart, and each instance behaves slightly differently. Persistent state
belongs in a backing service. The local filesystem is a scratch space that may
vanish at any moment.

## VII. Port binding

**Export services via port binding.**

The app is self-contained: it includes its own server and binds a port, rather
than being injected into a runtime-provided web server.

*Violation signature:* the app cannot be started with a single command because it
requires an external web server to host it; the deployment unit is a bundle
dropped into a server's directory.

*Consequence:* dev, test, and prod cannot use the same startup path, and the app
cannot become a backing service for another app.

## VIII. Concurrency

**Scale out via the process model.**

Work is partitioned across process types — a web process, a worker process, a
scheduler — each scalable independently.

*Violation signature:* growing a single process's internal thread/task complexity
instead of running more processes; one process type doing web serving, queue
consumption, and cron work together; scaling only vertically.

*Consequence:* the workload with the heaviest resource profile dictates the
scaling of everything else, and one type of work can starve another.

## IX. Disposability

**Maximize robustness with fast startup and graceful shutdown.**

*Violation signature:* startup that takes minutes (warming caches, running
migrations inline); no `SIGTERM` handler; a queue consumer that acknowledges a
message before finishing the work, or that dies mid-message without returning it
to the queue; in-flight requests dropped on shutdown.

*Consequence:* deploys are slow and risky, autoscaling cannot react, and a
restart mid-work causes message loss or duplicate processing. Especially load-
bearing for anything consuming from a queue: shutdown must stop accepting new
work, finish or return what is in flight, then exit.

## X. Dev/prod parity

**Keep development, staging, and production as similar as possible.**

Three gaps to close:

| Gap | Traditional | Twelve-factor |
|-----|-------------|---------------|
| Time between deploys | Weeks | Hours |
| Authors vs. deployers | Different people | Same people |
| Dev vs. prod environments | Divergent | As similar as possible |

*Violation signature:* a lightweight local substitute for a production backing
service — an embedded database standing in for the production one, in-process
memory standing in for a shared cache, the local filesystem standing in for object
storage; a different major version locally than in production; a different OS or
web server.

*Consequence:* code that passes tests locally fails in production, and the adapter
that hid the difference is trusted right up until it isn't. Use the same *type and
version* of every backing service in every environment; containers make this cheap
enough that the old convenience argument no longer holds.

*Where parity stops, and why that is fine:* production data volume, traffic shape,
multi-region topology, and managed-service behavior (IAM, failover, throttling)
cannot be replicated locally at any reasonable cost. The rule is parity where
behavior diverges, cheapness where it doesn't — and canaries, feature flags, or
shadow traffic for the rest. Flag a substitution that changes *semantics*; don't
demand a local clone of production infrastructure.

## XI. Logs

**Treat logs as event streams.**

The app writes unbuffered events to `stdout` and does not concern itself with
routing or storage; the execution environment captures and aggregates.

*Violation signature:* the app opening log files, managing rotation, or shipping
its own logs to an aggregator; log configuration that differs per environment;
buffered output that is lost when a process is killed.

*Consequence:* logs disappear with ephemeral instances, and log handling becomes
per-service configuration that drifts. Structured output helps, but the routing
still belongs outside the app.

## XII. Admin processes

**Run admin/management tasks as one-off processes.**

Migrations, backfills, and REPL sessions run against the same release and config
as the long-running processes, shipped with the application code.

*Violation signature:* migration scripts kept outside the repo; an operator
running ad hoc SQL or a local script against production; admin tooling pinned to a
different version of the code than what is deployed.

*Consequence:* the admin path drifts from the deployed code and eventually acts on
assumptions that are no longer true — the classic source of a migration that works
in staging and corrupts production.

---

## Applying this in review

The factors violated most often in practice, in rough order:

1. **Config** — secrets or endpoints committed rather than injected.
2. **Logs** — the app managing its own files and routing.
3. **Processes** — request-scoped or session state kept in memory in a service
   that is meant to scale horizontally.
4. **Disposability** — no graceful shutdown in a queue consumer.
5. **Dev/prod parity** — a lightweight local substitute with different semantics.

Check those first when time is short, then widen only if the solution's shape
suggests others are at risk.
