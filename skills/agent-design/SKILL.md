---
name: flockion_agent_design
description: >
  Designs production-grade Flockion agents and agent teams with clear purpose,
  input/output contracts, narrow tools, memory rules, handoffs, guardrails,
  observability, cost control, and human approval for risky actions. Use when
  creating, reviewing, or improving agents, teams, prompts, tools, skills,
  orchestration flows, and marketplace-ready agent products.
argument-hint: "[lite|full|ultra]"
applyTo: "**/*.{md,json,ts,tsx,py,yml,yaml}"
license: MIT
---

# Flockion Agent Design

You design agents that can be trusted, reused, forked, and operated.

Agents are products, not prompt demos.

An agent must have:

* one clear job
* clear input
* clear output
* narrow tools
* safe permissions
* explicit failure behavior
* observable runs
* clear value to the user

## Agent Design Output

For a single agent, use:

```text
agent name:
purpose:
when to use:
input:
output:
tools:
memory:
knowledge:
guardrails:
human approval:
failure behavior:
observability:
cost control:
example input:
example output:
```

For an agent team, use:

```text
team name:
purpose:
user input:
final output:
agents:
orchestration:
handoffs:
shared memory:
tools:
approval points:
failure behavior:
audit trail:
cost controls:
marketplace positioning:
example run:
```

## Agent Rules

* One agent, one job.
* Do not create an agent for simple deterministic logic.
* Use code for rules, LLM for reasoning, language, extraction, ranking, and summarization.
* Tools must be narrow.
* Tool permissions must match the agent role.
* Agents must not hide side effects.
* Risky actions need human approval.
* Final output must be structured.
* Marketplace agents need clear sample input and output.
* Every production agent needs observability.

## Tool Rules

Each tool must define:

```text
tool name:
purpose:
allowed actions:
blocked actions:
required input:
output:
risk level:
approval required:
```

## Memory Rules

Use memory only when it improves future runs.

Do not store:

* secrets
* unnecessary personal data
* temporary execution data
* sensitive data without clear need

Memory must have a reason.

## Orchestration Patterns

Choose the simplest pattern:

1. Single agent
2. Router
3. Sequential team
4. Parallel review team
5. Human approval step
6. Multi-agent debate
7. Long-running workflow

Do not use multi-agent orchestration when one agent is enough.

## Guardrails

Always define:

* what the agent must do
* what it must not do
* when it must ask for clarification
* when it must refuse
* when it must escalate to a human
* what format it must return

## Flockion Marketplace Quality

An agent is marketplace-ready only if it has:

* clear name
* clear problem
* clear target user
* strong description
* useful examples
* safe tool scope
* observable execution
* forkable design
* reusable output

## Intensity

### lite

Design the agent and mention simpler alternatives.

### full

Design the simplest production-ready agent or team.

### ultra

Challenge every agent. Delete agents that should be functions, rules, or simple prompts.

## Final Rule

If the agent cannot explain its job in one sentence, it is not ready.
