# Cloud design pattern catalog

The 43 patterns from the Azure Architecture Center cloud design patterns catalog
(retrieved 2026-06-23), grouped by the problem they solve. Pillars are the Azure
Well-Architected Framework pillars: **Rel** Reliability · **Sec** Security ·
**Cost** Cost Optimization · **Ops** Operational Excellence · **Perf**
Performance Efficiency.

Choose by the problem statement, not the pattern's fame. Each pattern is a
trade-off — see [`SKILL.md`](./SKILL.md) for how to pick and what each one costs.

## Reliability & resilience

| Pattern | Problem it solves | Pillars |
| ------- | ----------------- | ------- |
| Retry | Handle anticipated transient failures by retrying the operation. | Rel |
| Circuit Breaker | Stop calling a remote dependency that keeps failing, until it recovers. | Rel · Perf |
| Bulkhead | Isolate elements into pools so one failure doesn't sink the rest. | Rel · Sec · Perf |
| Rate Limiting | Avoid throttling errors by controlling your own consumption of a resource. | Rel |
| Throttling | Control resource consumption by an app, tenant, or service. | Rel · Sec · Cost · Perf |
| Queue-Based Load Leveling | Buffer intermittent heavy load between a task and a service. | Rel · Cost · Perf |
| Health Endpoint Monitoring | Expose functional checks external tools probe at intervals. | Rel · Ops · Perf |
| Leader Election | Elect one instance to coordinate a set of collaborating tasks. | Rel |
| Compensating Transaction | Undo the steps of an eventually-consistent operation that failed. | Rel |
| Scheduler Agent Supervisor | Coordinate a set of actions across distributed services and resources. | Rel · Perf |

## Messaging & async

| Pattern | Problem it solves | Pillars |
| ------- | ----------------- | ------- |
| Asynchronous Request-Reply | Decouple slow back-end processing while the front end still gets a timely response. | Perf |
| Competing Consumers | Let multiple consumers process messages from the same channel concurrently. | Rel · Cost · Perf |
| Publisher-Subscriber | Announce events to many consumers async, without coupling sender to receivers. | Rel · Sec · Cost · Ops · Perf |
| Priority Queue | Process higher-priority requests ahead of lower-priority ones. | Rel · Perf |
| Claim Check | Split a large message into a claim check + payload so the bus isn't overwhelmed. | Rel · Sec · Cost · Perf |
| Sequential Convoy | Process related messages in order without blocking other groups. | Rel |
| Choreography | Let services decide how to process an operation, with no central orchestrator. | Ops · Perf |
| Messaging Bridge | Connect messaging systems that are otherwise incompatible. | Cost · Ops |
| Pipes and Filters | Break complex processing into reusable, separately-scalable stages. | Rel |
| Saga | Keep data consistent across services in a distributed transaction. | Rel |

## Data management & performance

| Pattern | Problem it solves | Pillars |
| ------- | ----------------- | ------- |
| Cache-Aside | Load data on demand into a cache from the store. | Rel · Perf |
| CQRS | Separate read and write models behind distinct interfaces. | Perf |
| Event Sourcing | Use an append-only store of events as the source of truth. | Rel · Perf |
| Materialized View | Pre-populate views over data poorly shaped for required queries. | Perf |
| Index Table | Index over fields that queries reference frequently. | Rel · Perf |
| Sharding | Divide a data store into horizontal partitions (shards). | Rel · Cost |
| Static Content Hosting | Serve static content directly from cloud storage / CDN. | Cost |

## Gateway, API & per-instance concerns

| Pattern | Problem it solves | Pillars |
| ------- | ----------------- | ------- |
| Gateway Routing | Route to multiple services behind one endpoint. | Rel · Ops · Perf |
| Gateway Aggregation | Aggregate multiple requests into one via a gateway. | Rel · Sec · Ops · Perf |
| Gateway Offloading | Offload shared/specialized functionality to a gateway proxy. | Rel · Sec · Cost · Ops · Perf |
| Backends for Frontends | A tailored backend per frontend/client type. | Rel · Sec · Perf |
| Ambassador | A helper service that makes network requests on behalf of a consumer. | Rel · Sec |
| Sidecar | Deploy a component as a separate process/container for isolation. | Sec · Ops |

## Deployment & topology

| Pattern | Problem it solves | Pillars |
| ------- | ----------------- | ------- |
| Deployment Stamps | Deploy multiple independent copies of components, including data. | Ops · Perf |
| Geode | Distribute back-end nodes geographically; any node serves any region. | Rel · Perf |
| Compute Resource Consolidation | Consolidate multiple tasks into a single computational unit. | Cost · Ops · Perf |

## Security & external trust

| Pattern | Problem it solves | Pillars |
| ------- | ----------------- | ------- |
| Gatekeeper | A dedicated host validates/sanitizes requests before reaching private back ends. | Sec · Perf |
| Valet Key | Hand clients a scoped token for restricted direct access to a resource. | Sec · Cost · Perf |
| Federated Identity | Delegate authentication to an external identity provider. | Rel · Sec · Perf |
| Quarantine | Ensure external assets meet an agreed quality bar before the workload consumes them. | Sec · Ops |

## Configuration & legacy integration

| Pattern | Problem it solves | Pillars |
| ------- | ----------------- | ------- |
| External Configuration Store | Move config out of the deployment package to a central store. | Ops |
| Anti-Corruption Layer | A translation layer between a modern app and a legacy system. | Ops |
| Strangler Fig | Incrementally replace a legacy system piece by piece behind a façade. | Rel · Cost · Ops |

## Notes

- **Composition.** Patterns pair to cover gaps — Retry + Circuit Breaker, Queue-Based Load Leveling + Competing Consumers, Saga on Compensating Transaction, the three Gateway patterns behind one endpoint. Pair only for a named reason.
- **Antipatterns.** A pattern applied without a matching problem becomes an antipattern. For monolith migration that uses Strangler Fig and Anti-Corruption Layer, drive it with the [`decomposition`](../decomposition/SKILL.md) skill.
- **Source.** Mirrors <https://learn.microsoft.com/azure/architecture/patterns/>; the same patterns apply to AWS and other clouds (they are technology-agnostic).
