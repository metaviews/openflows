# AGENTS.md

Operational guide for AI agents working in this repository.

## Purpose

Use this file to define execution behavior for LLM-assisted work.  
`PROJECT_INSTRUCTIONS.md` defines project intent; this file defines how agents must operate.

## Instruction Priority

1. Explicit user request in the current session
2. This `AGENTS.md`
3. `PROJECT_INSTRUCTIONS.md`
4. Existing code/content conventions in the repo

If instructions conflict, follow the highest-priority item and state assumptions briefly.

## Repository Context

- Framework: Eleventy (`@11ty/eleventy`)
- Input: `src/`
- Output: `_site/`
- Currency entries:
  - Currents: `src/currency/currents/*.md`
  - Circuits: `src/currency/circuits/*.md`
  - Operators: `src/currency/operators/*.md`
- Shared entry layout: `src/_includes/layouts/currency-item.njk`

## Required Schema For Currency Entries

All Currency markdown entries must include:

- `layout: layouts/currency-item.njk`
- `title`
- `date` (ISO date)
- `currencyType` (`current` | `circuit` | `operator`)
- `currencyId` (kebab-case, unique)
- `tags: [currency]`
- `permalink`
- `abstract` (recommended; strongly preferred)

Optional but encouraged:

- `links` (explicit linkage objects with `id` + `relation`)
- `mediation` block when AI materially shaped the artifact

## Linkage Pass (Mandatory)

Every new Currency entry requires a matrix linkage pass:

- New Current: evaluate links to Circuits and Operators
- New Circuit: evaluate links to Currents and Operators
- New Operator: evaluate links to Currents and Circuits

When strong links exist, add `links` in front matter.  
If no strong links exist yet, include in body: `No explicit currency link added yet.`

## Mediation Transparency

When AI tools are materially used to produce an entry, include:

```yaml
mediation:
  tooling: "..."
  use:
    - "..."
  humanRole: "..."
  limits: "..."
```

Do not fabricate mediation notes. If uncertain, omit and explain in commit/PR notes.

## Content Style Rules

- Tone: technical, civic, embodied; dense and purposeful
- Avoid hype, marketing voice, and trend-chasing language
- Avoid “what we are not” framing
- Treat AI as infrastructure, not authority
- Prefer claims that are inspectable and operationally specific

## Source and Verification Rules

- Verify time-sensitive facts before publishing entries.
- Do not invent details when sources are blocked or ambiguous.
- If partial visibility exists, write cautiously and avoid over-specific claims.
- Prefer primary sources (official docs/repos/papers) over secondary commentary when possible.

## Safety and Risk Boundaries

- Do not provide operational misuse instructions for cyber abuse, evasion, or harmful automation.
- For dual-use topics, keep framing governance-oriented and defensive.
- Flag uncertainty explicitly rather than filling gaps with confident speculation.

## Quality Checks Before Finalizing

Run:

1. `npm run build`
2. Confirm no broken `links.id` references against existing `currencyId`s
3. Ensure new `currencyId` is unique
4. Ensure permalink path matches file intent

Do not mark work complete until checks pass or blockers are stated.

## Change Discipline

- Make the smallest coherent change set.
- Preserve existing architecture and naming patterns.
- Do not rewrite unrelated content during focused tasks.
- When adding many entries, keep formatting and section structure consistent.

