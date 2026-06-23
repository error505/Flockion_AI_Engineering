# Flockion Skill Pack

This pack defines focused engineering and product skills for Flockion.

Each skill lives in its own folder under [`skills/`](../skills) as a `SKILL.md` (the layout Claude Code discovers). This document is the **catalog and routing guide** — it does not define skills itself.

Use the `engineering` skill as the base coding standard. Reach for a companion skill when the task needs a sharper mode.

When installed as a plugin, invoke with `/flockion:<name>` (e.g. `/flockion:code-review`). When copied into personal skills, invoke with `/<name>` (e.g. `/code-review`).

## Routing

```text
Idea           → product-builder
Design         → architecture-review
Agent/team     → agent-design
Implementation → engineering
Review         → code-review
Risk           → security-review
Cost           → cost-control
```

## Skills in this pack

| Phase | Skill | File |
| ----- | ----- | ---- |
| Idea | `product-builder` | [skills/product-builder/](../skills/product-builder/SKILL.md) |
| Design | `architecture-review` | [skills/architecture-review/](../skills/architecture-review/SKILL.md) |
| Agents | `agent-design` | [skills/agent-design/](../skills/agent-design/SKILL.md) |
| Build | `engineering` | [skills/engineering/](../skills/engineering/SKILL.md) |
| Review | `code-review` | [skills/code-review/](../skills/code-review/SKILL.md) |
| Risk | `security-review` | [skills/security-review/](../skills/security-review/SKILL.md) |
| Cost | `cost-control` | [skills/cost-control/](../skills/cost-control/SKILL.md) |

## Stack-specific engineering flavors

The base standard, sharpened per stack. Use these during the Build phase.

| Skill | Stack | File |
| ----- | ----- | ---- |
| `engineering-python` | Python · backend · APIs | [skills/engineering-python/](../skills/engineering-python/SKILL.md) |
| `engineering-react` | TypeScript · React · frontend | [skills/engineering-react/](../skills/engineering-react/SKILL.md) |
| `engineering-infra` | DevOps · IaC · CI/CD | [skills/engineering-infra/](../skills/engineering-infra/SKILL.md) |
| `engineering-data` | SQL · databases · pipelines | [skills/engineering-data/](../skills/engineering-data/SKILL.md) |
| `engineering-ai` | LLM · RAG · tool-calling | [skills/engineering-ai/](../skills/engineering-ai/SKILL.md) |

## Specialized modes

Sharper modes for specific, high-risk jobs — beyond the core pack.

| Skill | Use it for | File |
| ----- | ---------- | ---- |
| `decomposition` | breaking a monolith into services the lazy, safe way (strangler fig, branch by abstraction, parallel run, expand–migrate–contract); defaults to "extract a module, not a service" | [skills/decomposition/](../skills/decomposition/SKILL.md) |

## Final Pack Rule

Each skill must stay narrow.

Do not turn every skill into a mega-standard.

The base skill is `engineering`. The companion skills are decision modes; the flavors are stack specializations.
