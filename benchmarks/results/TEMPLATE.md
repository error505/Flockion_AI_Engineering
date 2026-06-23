# Flockion benchmark — YYYY-MM-DD

**Status:** template. Copy to `YYYY-MM-DD-<name>.md` and fill in from a real run.

## Setup

- **Target repo:** tiangolo/full-stack-fastapi-template @ `<commit>`
- **Agent / harness:** `<e.g. headless Claude Code>`
- **Model:** `<e.g. claude-haiku-4-5>`
- **Tasks:** `benchmarks/tasks/tasks.json` (`<n>` tickets)
- **Repeats:** n = `<n>` per arm
- **Arms:** no-skill baseline · flockion-full · `<controls…>`

## Headline (each arm vs no-skill baseline)

> Produced by `node benchmarks/score.mjs`. Paste the table verbatim.

| vs no-skill baseline | LOC | tokens | cost | time | safe |
| -------------------- | --- | ------ | ---- | ---- | ---- |
| flockion-full | | | | | |

## Per-task

| task | category | baseline LOC | flockion LOC | notes |
| ---- | -------- | ------------ | ------------ | ----- |
| date-input | trap | | | |

## Safety tier

Adversarial set, separate from the diff-size score. Record any arm that dropped
a trust-boundary validation, auth check, or data-loss guard. A LOC win that
loses a control is reported as a **failure**, not a win.

## Limitations

- `<sample size, single model, task selection bias, scoring caveats, etc.>`
