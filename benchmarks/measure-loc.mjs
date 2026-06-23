#!/usr/bin/env node
// Measure real code size of the paired reference implementations under
// benchmarks/reference/<task>/{minimal,naive}/. Counts source lines of code —
// non-blank, non-comment — so comments and whitespace can't pad the result.
//
//   node benchmarks/measure-loc.mjs
//
// This measures CODE SIZE of a Flockion-minimal solution vs a representative
// hand-rolled one for each over-build trap. It is NOT the agentic A/B study
// (does the skill make an agent pick the minimal path?) — that lives separately
// in benchmarks/README.md and is not yet collected.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const REF = join("benchmarks", "reference");

// Source lines of code: drop blank lines, `//` and `#` line comments,
// `/* ... */` blocks, and Python triple-quoted blocks.
function countLoc(text) {
  let count = 0;
  let closer = null; // open block comment we're inside of
  for (const raw of text.split(/\r?\n/)) {
    let s = raw;
    if (closer) {
      const idx = s.indexOf(closer);
      if (idx === -1) continue;
      s = s.slice(idx + closer.length);
      closer = null;
    }
    // Strip same-line block comments and docstrings.
    s = s.replace(/\/\*.*?\*\//g, "").replace(/"""[\s\S]*?"""/g, "").replace(/'''[\s\S]*?'''/g, "");
    // An unterminated block opener: ignore the rest of this line and keep state.
    for (const [open, close] of [["/*", "*/"], ['"""', '"""'], ["'''", "'''"]]) {
      const at = s.indexOf(open);
      if (at !== -1) {
        s = s.slice(0, at);
        closer = close;
        break;
      }
    }
    const t = s.trim();
    if (t === "" || t.startsWith("//") || t.startsWith("#")) continue;
    count += 1;
  }
  return count;
}

function locForDir(dir) {
  let total = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) total += locForDir(p);
    else total += countLoc(readFileSync(p, "utf8"));
  }
  return total;
}

const tasks = readdirSync(REF).filter((t) => statSync(join(REF, t)).isDirectory());
const rows = tasks.map((task) => {
  const minimal = locForDir(join(REF, task, "minimal"));
  const naive = locForDir(join(REF, task, "naive"));
  return { task, minimal, naive };
});

const pct = (m, n) => (n === 0 ? "n/a" : `-${Math.round((1 - m / n) * 100)}%`);

console.log("Reference-implementation code size (SLOC). Minimal = Flockion; naive = hand-rolled.\n");
console.log("| trap | naive SLOC | minimal SLOC | reduction |");
console.log("| ---- | ---------- | ------------ | --------- |");
let tn = 0;
let tm = 0;
for (const r of rows) {
  tn += r.naive;
  tm += r.minimal;
  console.log(`| ${r.task} | ${r.naive} | ${r.minimal} | ${pct(r.minimal, r.naive)} |`);
}
console.log(`| **total** | **${tn}** | **${tm}** | **${pct(tm, tn)}** |`);
