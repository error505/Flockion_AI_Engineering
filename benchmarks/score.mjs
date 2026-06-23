#!/usr/bin/env node
// Score Flockion benchmark runs against the no-skill baseline.
//
//   node benchmarks/score.mjs [--dir <runs-dir>]
//
// Reads run records (*.json) from the runs dir (default benchmarks/runs), sums
// each arm's diff size / tokens / cost / time, and prints each arm as a percent
// of the baseline plus a safety percentage. The numbers come entirely from the
// run records you supply — this script measures, it does not invent.
//
// Run record shape (one file per arm):
//   {
//     "arm": "flockion-full",        // label; the baseline arm sets "baseline": true
//     "baseline": false,
//     "model": "claude-haiku-4-5",
//     "tasks": [
//       { "id": "date-input", "loc": 23, "tokens": 1200, "cost_usd": 0.004, "time_s": 31, "safe": true }
//     ]
//   }
// LOC per task is the added+changed line count of the agent's git diff
// (e.g. `git diff --numstat` summed). See benchmarks/examples for a worked sample.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dirArg = process.argv.indexOf("--dir");
const runsDir = dirArg !== -1 ? process.argv[dirArg + 1] : join("benchmarks", "runs");

const files = readdirSync(runsDir).filter((f) => f.endsWith(".json"));
if (files.length === 0) {
  console.log(`No run records in ${runsDir}.`);
  console.log("See benchmarks/examples for the format, then: node benchmarks/score.mjs --dir benchmarks/examples");
  process.exit(0);
}

const sum = (tasks, key) => tasks.reduce((t, x) => t + (x[key] ?? 0), 0);

const arms = files.map((f) => {
  const r = JSON.parse(readFileSync(join(runsDir, f), "utf8"));
  const tasks = r.tasks ?? [];
  return {
    arm: r.arm ?? f.replace(/\.json$/, ""),
    baseline: Boolean(r.baseline),
    loc: sum(tasks, "loc"),
    tokens: sum(tasks, "tokens"),
    cost: sum(tasks, "cost_usd"),
    time: sum(tasks, "time_s"),
    safe: tasks.length ? tasks.filter((x) => x.safe).length / tasks.length : 0,
  };
});

const baseline = arms.find((a) => a.baseline);
if (!baseline) {
  console.error('No baseline run found. Mark one record with "baseline": true.');
  process.exit(1);
}

const delta = (v, b) => (b === 0 ? "n/a" : `${Math.round((v / b - 1) * 100) > 0 ? "+" : ""}${Math.round((v / b - 1) * 100)}%`);
const pct = (v) => `${Math.round(v * 100)}%`;

console.log(`Baseline: ${baseline.arm} (${arms.length} arms, scored vs no-skill)\n`);
console.log("| vs no-skill baseline | LOC | tokens | cost | time | safe |");
console.log("| -------------------- | --- | ------ | ---- | ---- | ---- |");
for (const a of arms) {
  if (a.baseline) continue;
  console.log(
    `| ${a.arm} | ${delta(a.loc, baseline.loc)} | ${delta(a.tokens, baseline.tokens)} | ` +
      `${delta(a.cost, baseline.cost)} | ${delta(a.time, baseline.time)} | ${pct(a.safe)} |`
  );
}
