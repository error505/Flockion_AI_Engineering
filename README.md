<p align="center">
  <img src="./logo.png" alt="Flockion logo" width="160" />
</p>

<h1 align="center">Flockion</h1>

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

Read first. Trace the caller, callee, side effects, and boundary. *Then* choose the smallest safe change.

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

## 🗣️ Trigger phrases

Flockion activates when you say any of:

> `flockion` · `be lazy` · `lazy mode` · `simplest solution` · `minimal solution` · `YAGNI` · `do less` · `shortest path` · `avoid overengineering` · `clean but simple`

…or when you complain about **bloat, boilerplate, unnecessary dependencies, oversized files, or architecture for imaginary requirements.**

---

## 🧱 Shared principles

Pulled directly from the skills, applied across all five:

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

## 📄 License

[MIT](./LICENSE) © 2026 Igor Iric

---

> Build less. Delete more. Keep the code boring. Leave one small check where it matters.
