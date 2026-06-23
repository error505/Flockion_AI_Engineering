# Flockion Skill Pack

This pack defines focused engineering and product skills for Flockion.

Each skill now lives in its own loadable file. This document is the **catalog and routing guide** — it does not define skills itself.

Use `flockion_engineering` as the base coding standard. Reach for a companion skill when the task needs a sharper mode.

## Routing

```text
Idea         → flockion_product_builder
Design       → flockion_architecture_review
Agent/team   → flockion_agent_design
Implementation → flockion_engineering
Review       → flockion_code_review
Risk         → flockion_security_review
Cost         → flockion_cost_control
```

## Skills in this pack

| Phase | Skill | File |
| ----- | ----- | ---- |
| Idea | `flockion_product_builder` | [product_builder/](./product_builder/flockion_product_builder.md) |
| Design | `flockion_architecture_review` | [architecture_review/](./architecture_review/flockion_architecture_review.md) |
| Agents | `flockion_agent_design` | [agent_design/](./agent_design/flockion_agent_design.md) |
| Build | `flockion_engineering` | [engineering/](./engineering/flockion_engineering.md) |
| Review | `flockion_code_review` | [code_review/](./code_review/flockion_code_review.md) |
| Risk | `flockion_security_review` | [security_review/](./security_review/flockion_security_review.md) |
| Cost | `flockion_cost_control` | [cost_control/](./cost_control/flockion_cost_control.md) |

## Stack-specific engineering flavors

The base standard, sharpened per stack. Use these during the Build phase.

| Skill | Stack | File |
| ----- | ----- | ---- |
| `flockion_engineering_python` | Python · backend · APIs | [python/](./python/flockion_engineering_backend.md) |
| `flockion_engineering_typescript_react` | TypeScript · React · frontend | [typescript/](./typescript/flockion_engineering_react.md) |
| `flockion_engineering_infra` | DevOps · IaC · CI/CD | [infra/](./infra/flockion_engineering_infra.md) |
| `flockion_engineering_data` | SQL · databases · pipelines | [data/](./data/flockion_engineering_data.md) |
| `flockion_engineering_ai` | LLM · RAG · tool-calling | [ai/](./ai/flockion_engineering_ai.md) |

## Final Pack Rule

Each skill must stay narrow.

Do not turn every skill into a mega-standard.

The base skill is `flockion_engineering`. The companion skills are decision modes; the flavors are stack specializations.
