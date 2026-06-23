#!/usr/bin/env node
// Guard the plugin skill layout: Claude Code only discovers skills at
// skills/<name>/SKILL.md (exactly one level deep, filename exactly SKILL.md).
// This fails CI if a skill folder is missing its SKILL.md or a stray nested
// skill file would silently never load.

import { readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const SKILLS = "skills";
const problems = [];

for (const name of readdirSync(SKILLS)) {
  const dir = join(SKILLS, name);
  if (!statSync(dir).isDirectory()) {
    problems.push(`${dir} is a loose file; skills must be folders with a SKILL.md`);
    continue;
  }
  if (!existsSync(join(dir, "SKILL.md"))) {
    problems.push(`${dir}/ has no SKILL.md — it will not be discovered`);
  }
  // A skill nested another level down (skills/<name>/<sub>/SKILL.md) never loads.
  for (const sub of readdirSync(dir)) {
    const subPath = join(dir, sub);
    if (statSync(subPath).isDirectory() && existsSync(join(subPath, "SKILL.md"))) {
      problems.push(`${subPath}/SKILL.md is nested too deep — move it to skills/<name>/SKILL.md`);
    }
  }
}

if (problems.length) {
  console.error("Skill layout problems:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(`Skill layout OK — ${readdirSync(SKILLS).length} skills, each at skills/<name>/SKILL.md.`);
