# Flockion benchmark — 2026-06-23 — reference-implementation code size

**What this measures:** the code size of a Flockion-minimal solution versus a
representative hand-rolled solution for three over-build traps. It is a real,
reproducible measurement — run `npm run bench:loc` (or `node
benchmarks/measure-loc.mjs`) to reproduce the exact table below from the files
in [`benchmarks/reference/`](../reference).

**What this is NOT:** the agentic A/B study (does the *skill* cause an agent to
pick the minimal path?). That requires real headless runs with and without the
skill and is **not yet collected** — see [the harness README](../README.md).

## Result

Source lines of code (SLOC = non-blank, non-comment lines):

| trap | naive SLOC | minimal SLOC | reduction |
| ---- | ---------- | ------------ | --------- |
| color-input | 134 | 17 | -87% |
| config-cache | 56 | 5 | -91% |
| date-input | 135 | 21 | -84% |
| **total** | **325** | **43** | **-87%** |

## Method

- **minimal/** is the Flockion answer: reach for the native platform feature
  (ladder rung 4) or the standard library (rung 3) — `<input type="date">`,
  `<input type="color">`, `functools.lru_cache`.
- **naive/** is a representative hand-rolled implementation of the kind produced
  when that native option is overlooked: a calendar popover, an HSV color
  picker, a TTL/eviction `CacheManager`. They are genuine working-style
  implementations, not padded strawmen.
- SLOC is counted by [`measure-loc.mjs`](../measure-loc.mjs): blank lines, `//`
  and `#` line comments, `/* … */` blocks, and Python triple-quoted blocks are
  excluded, so comments and whitespace cannot move the number.

## Limitations

- This is **code size**, the *consequence* of taking the simpler rung — not
  proof that the skill changes an agent's behavior. The naive implementations
  were written by hand to illustrate the trap; a real agentic run may over- or
  under-build differently.
- Three traps, chosen because they have a clear native/stdlib alternative.
  Tasks that are already minimal would show ~0% (by design — the skill should
  change little there).
- No tokens / cost / time here: those belong to the agentic study, which uses
  the run-record format in [`benchmarks/examples/`](../examples) and is still to
  be collected.
