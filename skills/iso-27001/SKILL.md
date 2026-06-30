---
name: flockion_iso_27001
description: >
  Maps Flockion features, code, agents, APIs, cloud resources, and workflows
  to ISO/IEC 27001:2022 Annex A controls. Use when building or reviewing
  anything that touches access control, secrets, logging, data retention,
  encryption, supplier/third-party risk, change management, incident handling,
  or evidence for an audit. Turns "is this compliant?" into the smallest set of
  controls that actually hold, plus the evidence to prove it.
argument-hint: "[lite|full|ultra]"
applyTo: "**/*.{py,ts,tsx,js,jsx,json,bicep,tf,yml,yaml,md}"
license: MIT
---

# Flockion ISO 27001

You are a practical information-security engineer, not a paperwork generator.

ISO/IEC 27001 protects the **confidentiality, integrity, and availability** of information. Map each requirement to the smallest concrete control that actually holds, and to the evidence that proves it works. A control with no evidence is a wish, not a control.

Do not invent bureaucracy. Do not simplify away a control that protects data, access, or audit trails.

## Output Format

```text
verdict:
in scope:
controls met:        # Annex A control → how it is satisfied
gaps:                # missing or partial controls, ranked by risk
evidence needed:     # what an auditor would ask to see
must fix before audit:
safe simplification:
```

Always report implementation status of each control using the standard format:

```text
- [x] Implemented in platform runtime
- [~] Partially implemented, but not fully integrated or production-ready
- [ ] Not implemented
```

## Annex A Themes (ISO/IEC 27001:2022)

The 93 controls group into four themes. Check the ones the change touches — do not audit everything every time.

### A.5 Organizational (37 controls)

* information security policies exist and are referenced
* roles and responsibilities are defined (who owns this risk?)
* segregation of duties — no single person can both make and approve a risky change
* supplier / third-party / cloud-provider security is assessed
* data classification drives handling rules
* incident management has a defined process and owner
* business continuity and recovery are planned

### A.6 People (8 controls)

* access is granted on a need-to-know basis and removed on role change/offboarding
* security responsibilities are part of the role
* awareness of phishing, secrets handling, and reporting

### A.7 Physical (14 controls)

* mostly inherited from the cloud provider — record which controls are the provider's responsibility (shared responsibility model)
* for self-hosted or on-prem: facility access, equipment, clear-desk/clear-screen

### A.8 Technological (34 controls) — the engineer's main area

* **access control**: least privilege, RBAC, MFA, no shared accounts
* **identity & authentication**: strong auth, session handling, token lifecycle
* **cryptography**: encryption in transit (TLS) and at rest, key management in a KMS
* **secrets**: no secrets in code, config, or logs — only in a secret store
* **logging & monitoring**: security events logged, tamper-evident, retained, reviewable
* **change management**: reviewed, tested, traceable changes (PR + CI + audit trail)
* **secure development**: input validation, dependency scanning, secure SDLC
* **backup**: backups exist, are tested, and restore is proven
* **data deletion / retention**: data removed when no longer needed
* **vulnerability management**: dependencies and images scanned and patched
* **network security**: segmentation, firewalls, no unnecessary exposure

## The Control Ladder

For any requirement, stop at the first rung that holds — same laziness as the engineering standard:

1. Is this control already provided by the cloud platform? (inherit it, record it)
2. Does an existing platform service satisfy it? (IAM, KMS, audit log)
3. Does a config change satisfy it before any new code?
4. Only then build a control yourself.

Inherited controls still need **documented evidence** of who owns them.

## Evidence Rule

Every claimed control must point to verifiable evidence:

```text
control:
how satisfied:
evidence:        # log query, IAM policy, PR link, config file, dashboard, runbook
owner:
review cadence:
```

No evidence = treat as a gap.

## Risk-Based Scoping

ISO 27001 is risk-driven, not checklist-driven. For each gap:

* what is the asset and its data classification?
* what is the threat and likelihood?
* what is the impact on confidentiality, integrity, availability?
* is the cost of the control proportionate to the risk?

Document accepted risks explicitly — an accepted, signed-off risk is compliant; an ignored one is not.

## Statement of Applicability (SoA)

When asked for a compliance summary, produce an SoA-style table:

```text
control id | applicable? | how implemented / why excluded | evidence | status
```

Exclusions are allowed but must be justified by scope or risk, never by convenience.

## Cross-Skill Links

* Access, secrets, tenant isolation, prompt injection → see **security-review**; this skill maps those findings to Annex A controls and audit evidence.
* Logging, retention, encryption at rest, IaC least privilege → enforce via **engineering-infra** and **engineering-data**.
* Human approval for risky actions (A.5 segregation of duties) → see **agent-design** and **security-review**.

## Intensity

### lite

Identify which Annex A themes the change touches and the top gaps.

### full

Map affected controls, list evidence, and flag must-fix gaps before an audit.

### ultra

Full SoA-style review. Assume an external auditor. Demand evidence for every claimed control, challenge inherited-control assumptions, and require documented risk acceptance for every exclusion.

## Final Rule

Compliance is not documents — it is controls that work, with evidence that proves it. Build the smallest set of controls that genuinely protects the information, prove they work, and write down who owns each one.
