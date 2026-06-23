<p align="center">
  <img src="./logo.png" alt="Flockion logo" width="160" />
</p>

<h1 align="center">Flockion AI Engineering</h1>

<p align="center"><strong><em>Lazy means efficient, not careless.</em></strong></p>

<p align="center">
  A family of <a href="https://claude.com/claude-code">Claude Code</a> skills that turn the model into a
  <strong>lazy senior engineer</strong> — one who writes the <em>least</em> code that safely solves the
  <em>real</em> problem, and refuses to build architecture for imaginary requirements.
</p>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
  <a href="#-the-skills"><img src="https://img.shields.io/badge/skills-12-blue.svg" alt="Skills" /></a>
  <a href="#%EF%B8%8F-intensity-levels"><img src="https://img.shields.io/badge/intensity-lite%20%7C%20full%20%7C%20ultra-orange.svg" alt="Intensity" /></a>
</p>

---

## Why this exists

LLMs love to build. Ask for a cache and you get a `CacheManagerFactoryProvider`. Ask for a tab toggle and you get a global store. Ask for one endpoint and you get a hexagonal monolith.

Flockion is the antidote. It installs one belief into the model:

> The best code is code not written.
> The second-best code is boring, small, obvious, typed, tested where it matters, and easy to delete.

It is **never** lazy about understanding the task, root-cause analysis, security, validation, data safety, or your explicit requirements. It *is* lazy about boilerplate, fake abstractions, dependency bloat, and oversized files.

---

## 🪜 The Ladder

Every Flockion skill runs the same reflex before writing code. **Stop at the first rung that holds.**

```text
1. Does this need to exist at all?      → speculative? skip it, say so in one line
2. Does the codebase already have it?   → reuse the existing helper/type/service
3. Does the language / stdlib do it?    → use it before custom code
4. Does the native platform do it?      → browser / db / cloud / framework / OS
5. Does an installed dependency do it?  → don't add a new dep for a few lines
6. Can it be one line?                  → if it stays readable and correct
7. Only then write new code.            → the minimum that solves the real need
```

The ladder runs *after* it understands the problem, not instead of it: it reads the code the change touches and traces the real flow before picking a rung. Lazy about the solution, never about reading.

**Lazy, not negligent.** Trust-boundary validation, data-loss handling, security, and accessibility are never on the chopping block. The code ends up small because it is *necessary*, not golfed.

---

## 🧩 The Skills

Flockion works on **two layers**. The *lifecycle modes* pick the right mindset for the phase you're in; the *implementation flavors* decide how code actually gets written for a given stack. Every skill shares the same DNA — the Ladder, intensity levels, and three-line output style.

<p align="center">
  <img src="./skill_pack.png" alt="Flockion Skill Pack — one base standard, six focused skills, from idea to production" width="820" />
</p>

### 🔁 Lifecycle modes — the Skill Pack

The phase-by-phase decision modes, catalogued in [`skills/flockion/flockion_skill_pack.md`](./skills/flockion/flockion_skill_pack.md). `flockion_engineering` is the base standard; the rest are sharper modes for a specific phase.

| Phase | Skill | Use it to… |
| ----- | ----- | ----------- |
| 💡 Idea | **flockion_product_builder** | cut an idea down to the smallest shippable feature with a clear success metric |
| 📐 Design | **flockion_architecture_review** | make a design smaller, safer, and cheaper to change — not bigger |
| 🤖 Agents | **flockion_agent_design** | spec a trustworthy agent/team: narrow tools, contracts, guardrails, approval |
| 🛠️ Build | **flockion_engineering** | write the shortest safe code (the base coding standard) |
| 🔍 Review | **flockion_code_review** | catch what matters: correctness, security, data loss, bloat |
| 🛡️ Risk | **flockion_security_review** | block unsafe shortcuts before they reach production |
| 💸 Cost | **flockion_cost_control** | kill token/cloud cost leaks without hurting product value |

### ⚙️ Implementation flavors — stack-specific engineering

Specializations of the Build phase. Each takes the base standard and sharpens the Ladder and rules for its stack.

| Skill | Stack | File |
| ----- | ----- | ---- |
| **flockion_engineering_python** | Python · backend · APIs · serverless | [`skills/flockion/python/`](./skills/flockion/python/flockion_engineering_backend.md) |
| **flockion_engineering_typescript_react** | TypeScript · React · frontend · forms · state | [`skills/flockion/typescript/`](./skills/flockion/typescript/flockion_engineering_react.md) |
| **flockion_engineering_infra** | DevOps · IaC · CI/CD · containers | [`skills/flockion/infra/`](./skills/flockion/infra/flockion_engineering_infra.md) |
| **flockion_engineering_data** | SQL · databases · migrations · pipelines | [`skills/flockion/data/`](./skills/flockion/data/flockion_engineering_data.md) |
| **flockion_engineering_ai** | Agents · RAG · LLM · tool-calling · prompts | [`skills/flockion/ai/`](./skills/flockion/ai/flockion_engineering_ai.md) |

### 🗺️ How they fit together

```text
        ┌─ flockion_product_builder ──── what is the smallest useful feature?
 idea   │
        └─ flockion_architecture_review ─ what is the simplest safe design?
                     │
                     ├─ flockion_agent_design ─── (if it involves agents/teams)
                     ▼
 build   flockion_engineering ──────────── the base standard
                     │   specialized by stack ↓
                     ├─ flockion_engineering_python           (backend/apis)
                     ├─ flockion_engineering_typescript_react (frontend)
                     ├─ flockion_engineering_infra            (devops/iac/ci-cd)
                     ├─ flockion_engineering_data             (sql/db/pipelines)
                     └─ flockion_engineering_ai               (llm/rag/agents)
                     ▼
 ship    flockion_code_review → flockion_security_review → flockion_cost_control
```

---

## 🎚️ Intensity Levels

Every skill supports three intensities. Default is **full**.

| Level | Behavior |
| ----- | -------- |
| `lite` | Build what was asked, but name the simpler alternative in one line. |
| `full` | Apply the Ladder strictly. Shortest safe diff. Short explanation only. |
| `ultra` | YAGNI extremist. Challenge the requirement. Prefer deletion before addition. |

```text
/flockion_engineering lite
/flockion_engineering full
/flockion_engineering ultra
```

Disable with: `stop flockion` · `normal mode`

---

## ⚡ What it looks like

**You:** *Add a cache for these API responses.*

**Flockion (full):**

```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def fetch_config(key: str) -> Config:
    ...
```

…then three short lines, never an essay:

```text
skipped: custom cache class
add when: TTL, invalidation, or multi-instance consistency is required
```

**Flockion (ultra):**

```text
No cache until profiling shows this is slow. Then start with @lru_cache.
A custom TTL cache is a bug farm until proven necessary.
```

---

## 📊 What it optimizes for

The rule was never "fewest tokens." It is: **write only what the task needs, and never cut validation, error handling, security, or accessibility.** The code ends up small because it is necessary, not golfed. Lower diff size — and, on models that follow the ladder cleanly, lower cost and latency — are a *side effect* of stopping at the first rung that holds, not the goal.

The win is largest where there is a real over-build trap and near zero on code that is already minimal:

| Task | Naïve over-build | Flockion | Why |
| ---- | ---------------- | -------- | --- |
| Date input | a date-picker component + state + formatting | native `<input type="date">` | the platform already does it (rung 4) |
| Color input | a custom color-picker widget | native `<input type="color">` | same — reach for HTML before a component |
| Response cache | a `CacheManager` class + TTL + eviction | `functools.lru_cache` | the stdlib already does it (rung 3) |
| "Selected tab" state | a global store | URL param or local `useState` | local state before global (the cheapest owner) |

> **Honesty note.** Flockion ships as a *design standard*, not a measured benchmark — there are no published numbers yet, and this README will not invent any. If you want to measure it, the honest test is the same shape ponytail-style benchmarks use: a real agent doing real work on a real repo, the same tickets **with and without** the skill, scored on the **git diff it leaves behind** (LOC, tokens, cost, time) plus a separate **adversarial safety tier** to confirm the smaller diff never drops a security or validation control. Results, if collected, belong in `benchmarks/` — not in claims here.

---

## 📦 Install

Flockion skills are plain Markdown skill files. Drop them where Claude Code looks for skills.

**Per-project** (recommended for team-shared standards):

```bash
mkdir -p .claude/skills
cp -r skills/flockion .claude/skills/
```

**Global**, macOS / Linux (available in every project):

```bash
cp -r skills/flockion ~/.claude/skills/
```

**Global**, Windows (PowerShell):

```powershell
Copy-Item -Recurse skills\flockion $env:USERPROFILE\.claude\skills\
```

Then invoke a skill by name (`/flockion_engineering`, `/flockion_code_review`, …) or just say **"flockion"**, **"be lazy"**, **"simplest solution"**, or **"YAGNI"** in any message.

---

## 🧰 Commands & skills

In a skill-capable host (Claude Code, and any agent that loads these skill files), invoke a skill by name. The engineering skills take an optional intensity argument; the mode skills run at their default.

| Invoke | What it does |
| ------ | ------------ |
| `/flockion_engineering [lite\|full\|ultra]` | The base standard. Set the intensity, or run at the default (`full`). |
| `/flockion_engineering_python` · `_typescript_react` · `_infra` · `_data` · `_ai` | Stack-specialized engineering — same ladder, sharpened rules. |
| `/flockion_product_builder` | Cut an idea down to the smallest shippable feature with a clear success metric. |
| `/flockion_architecture_review` | Make a design smaller, safer, and cheaper to change. |
| `/flockion_agent_design` | Spec a trustworthy agent/team: narrow tools, contracts, guardrails, approval. |
| `/flockion_code_review` | Review the current diff for over-engineering — hands back a delete-list. |
| `/flockion_security_review` | Confirm the smaller diff never dropped a security or validation control. |
| `/flockion_cost_control` | Find token/cloud cost leaks without hurting product value. |

Intensity is per skill: **`lite`** names the simpler alternative, **`full`** (default) applies the ladder strictly, **`ultra`** is the YAGNI extremist for when the codebase has wronged you personally. Disable with `stop flockion` or `normal mode`.

---

## 🗣️ Trigger phrases

Flockion activates when you say any of:

> `flockion` · `be lazy` · `lazy mode` · `simplest solution` · `minimal solution` · `YAGNI` · `do less` · `shortest path` · `avoid overengineering` · `clean but simple`

…or when you complain about **bloat, boilerplate, unnecessary dependencies, oversized files, or architecture for imaginary requirements.**

---

## 🧱 Shared principles

Pulled directly from the skills, applied across the whole family:

- **Single Responsibility** — if the name needs "and", it does too much.
- **Simplicity before patterns** — no architecture cosplay.
- **No fake abstractions** — no interface with one implementation, no factory for one object.
- **Make invalid states impossible** — discriminated unions and typed models over loose dicts.
- **One source of truth** — a rule lives in exactly one place.
- **Side effects at the edges** — pure logic stays pure.
- **DRY, but late** — write it, notice it, *then* extract it. Wrong abstraction is worse than temporary duplication.
- **File Size Rule** — `100–300` good · `300–500` review · `500+` refactor · `800–1000` design warning.
- **Leave one small check** — non-trivial logic ships with its smallest useful test.

---

## 🛠️ Development

The skills are plain Markdown — no build step. A few things keep the set coherent:

- **Frontmatter convention.** Every skill file starts with valid YAML frontmatter: `name`, `description` (block scalar), `argument-hint`, `applyTo`, `license`. Names follow `flockion_engineering` (base), `flockion_engineering_<stack>` (flavors), and `flockion_<mode>` (modes).
- **Keep the catalog in sync.** [`skills/flockion/flockion_skill_pack.md`](./skills/flockion/flockion_skill_pack.md) is the routing index — it points at the real skill files, it does not define skills. When you add or rename a skill, update the catalog and this README's tables.
- **One skill, one file.** Each skill lives in its own folder under `skills/flockion/`. Don't merge skills back into a single doc.
- **The file-size rule applies to skills too.** A skill that sprawls into a mega-standard is over-built — split it by responsibility, the same way the rules say to split code.

---

## 📄 License

[MIT](./LICENSE) © 2026 Igor Iric

---

> Build less. Delete more. Keep the code boring. Leave one small check where it matters.
