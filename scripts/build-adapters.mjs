#!/usr/bin/env node
// Generate every harness adapter from the canonical ruleset (rules/flockion.md).
//
//   node scripts/build-adapters.mjs          # write all adapters
//   node scripts/build-adapters.mjs --check  # fail if any adapter has drifted
//
// One source of truth in, many agent-specific files out. Do not hand-edit the
// generated files — edit rules/flockion.md and rebuild.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(root, "rules", "flockion.md");

const GENERATED_NOTE =
  "Generated from rules/flockion.md by scripts/build-adapters.mjs — do not edit by hand.";

// Strip the canonical-source HTML banner; keep from the first heading on.
function readBody() {
  const raw = readFileSync(SOURCE, "utf8");
  const start = raw.indexOf("# Flockion");
  if (start === -1) throw new Error("rules/flockion.md is missing its '# Flockion' heading");
  return raw.slice(start).trimEnd() + "\n";
}

// Each adapter = optional frontmatter/header + a generated-by note + the body.
function adapters(body) {
  const note = `<!-- ${GENERATED_NOTE} -->\n\n`;
  const cursorFrontmatter =
    "---\n" +
    "description: Flockion — write the least code that safely solves the real problem.\n" +
    "alwaysApply: true\n" +
    "---\n\n";
  const kiroFrontmatter = "---\ninclusion: always\n---\n\n";

  return [
    { path: "AGENTS.md", content: note + body },
    { path: ".cursor/rules/flockion.mdc", content: cursorFrontmatter + note + body },
    { path: ".windsurf/rules/flockion.md", content: note + body },
    { path: ".clinerules/flockion.md", content: note + body },
    { path: ".github/copilot-instructions.md", content: note + body },
    { path: ".kiro/steering/flockion.md", content: kiroFrontmatter + note + body },
  ];
}

const check = process.argv.includes("--check");
const body = readBody();
const drifted = [];

for (const { path, content } of adapters(body)) {
  const abs = join(root, path);
  if (check) {
    let current = null;
    try {
      current = readFileSync(abs, "utf8");
    } catch {
      /* missing file counts as drift */
    }
    if (current !== content) drifted.push(path);
  } else {
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
    console.log(`wrote ${path}`);
  }
}

if (check) {
  if (drifted.length) {
    console.error(
      `Adapters out of sync with rules/flockion.md:\n  ${drifted.join("\n  ")}\n` +
        "Run `npm run build:adapters` and commit the result."
    );
    process.exit(1);
  }
  console.log("All adapters are in sync with rules/flockion.md.");
}
