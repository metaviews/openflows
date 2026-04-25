---
layout: layouts/currency-item.njk
title: "OpenRouter Skill: Create Agent TUI"
date: 2026-04-24
currencyType: current
currencyId: openrouter-create-agent-tui-skill
tags:
  - currency
  - openrouter
  - skill
  - tui
permalink: /currency/currents/openrouter-create-agent-tui-skill/
abstract: "An OpenRouter skill enabling terminal-based agent creation and management via a Text User Interface (TUI), prioritizing local control and scriptability."
links:
  - id: skills-sh
    relation: "comparable skills layer pattern"
  - id: terminal-native-agentic-workflows
    relation: "part of the terminal-native circuit"
mediation:
  tooling: "OpenRouterTeam/skills repository"
  use:
    - "fetch URL for skill context and structure"
    - "assess fit within terminal-native workflows"
  humanRole: "test TUI implementation, verify OpenRouter skill format, validate local execution path"
  limits: "fetch returned directory listing; requires manual review of the skill's Python/Bash implementation and dependencies"
---

### Signal
[OpenRouterTeam/skills: create-agent-tui](https://github.com/OpenRouterTeam/skills/tree/main/skills/create-agent-tui) · GitHub · 2026-04-24

### Context
A newly released skill in the OpenRouter Team skills repository. This skill provides a **Terminal User Interface (TUI)** for creating and managing AI agents directly within the command line. It represents an effort to bring the "OpenRouter skill" concept to a more interactive, visual CLI context.

Key characteristics inferred:
- **Input:** Likely accepts natural language prompts to generate agent configurations.
- **Interface:** TUI (e.g., ncurses, ink, or similar) for navigating agent creation steps.
- **Output:** Structured agent definitions or deployment artifacts.

### Relevance
Directly supports the **Terminal-Native Agentic Workflows** circuit. By moving agent creation into the terminal, it reduces context switching between GUI dashboards (like OpenClaw Studio) and the codebase. It aligns with the "skills layer" signal (`skills.sh`), promoting modularity and explicit control.

### Current State
- **Repository:** Part of the main OpenRouter `skills` repo.
- **Format:** Likely follows the OpenRouter skill standard (script + manifest).
- **Tooling:** Depends on the underlying TUI library and OpenRouter backend integration.

### Open Questions
- What is the skill format (Python, Bash, JSON)?
- Does it support local agent execution or only OpenRouter cloud deployment?
- Can it interact with existing `skill.sh` or similar workflows?
- What specific "agent" definition format does it output?

### Connections
Related to `skills-sh` (modular skills), `terminal-native-agentic-workflows` (TUI pattern), and `openrouter` (the platform).