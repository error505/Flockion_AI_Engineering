# Flockion benchmarks

> **Status: harness only — no numbers collected yet.** This directory is the
> scaffold for measuring Flockion honestly. It ships the task set, the scoring
> script, and the run-record format. It does **not** ship results, and the
> README will not claim any until a real run fills `results/`.

## What an honest measurement looks like

The only measurement worth trusting is a real agent doing real work, scored on
the diff it leaves behind:

1. **Target** — a real repo with real over-build temptations. The default task
   set targets [`tiangolo/full-stack-fastapi-template`](https://github.com/tiangolo/full-stack-fastapi-template)
   (FastAPI + React).
2. **Tasks** — the feature tickets in [`tasks/tasks.json`](./tasks/tasks.json).
   Some are over-build *traps* (a native platform feature beats a hand-rolled
   component); some are already *minimal* (the skill should change little).
3. **Arms** — run the **same** agent on the **same** tickets, once **with** the
   Flockion skill active and once **without** (the no-skill baseline). Add
   control arms (e.g. a terse-prose prompt, a bare "YAGNI + one-liners" prompt)
   to show the gain is the ladder, not just "be brief".
4. **Score** — for each task record the agent's diff size (LOC added+changed),
   tokens, cost, and wall-clock time. Express each arm as a percent of the
   baseline.
5. **Safety tier (separate, non-negotiable)** — re-score every arm on an
   adversarial set that checks the smaller diff never dropped a trust-boundary
   validation, auth check, or data-loss guard. A LOC win that loses a security
   control is not a win.

The rule under test is **not** "fewest tokens." It is: write only what the task
needs, and never cut validation, error handling, security, or accessibility.
Smaller diffs (and, on models that follow the ladder cleanly, lower cost and
latency) should fall out as a *side effect*.

## Running it

```bash
# 1. Collect run records into benchmarks/runs/ (one JSON file per arm).
#    See benchmarks/examples/ for the exact shape.
# 2. Score them against the no-skill baseline:
node benchmarks/score.mjs

# Demo the scorer on the shipped (synthetic) example records:
node benchmarks/score.mjs --dir benchmarks/examples
```

`score.mjs` only ever reports the numbers in the run records you give it — it
measures, it does not invent. The records in [`examples/`](./examples) are
clearly-labelled **synthetic** data that exist solely to demonstrate the format
and the scorer's output.

## Run-record format

One JSON file per arm in `benchmarks/runs/`:

```json
{
  "arm": "flockion-full",
  "baseline": false,
  "model": "claude-haiku-4-5",
  "tasks": [
    { "id": "date-input", "loc": 23, "tokens": 6800, "cost_usd": 0.022, "time_s": 96, "safe": true }
  ]
}
```

- Mark exactly one record `"baseline": true` (the no-skill arm).
- `loc` is the added+changed line count of that task's git diff
  (`git diff --numstat` summed over changed files).
- `safe` is the adversarial-tier result for that task.

Write results up in [`results/`](./results) using
[`results/TEMPLATE.md`](./results/TEMPLATE.md), dated, with method and
limitations — not just a headline number.
