---
layout: layouts/currency-item.njk
title: "Multi-Agent Shogun"
date: 2026-03-29
currencyType: "current"
currencyId: multi-agent-shogun
abstract: "A terminal-based orchestration system using tmux to manage parallel AI coding agents in a hierarchical structure inspired by feudal Japanese military ranks."
tags:
  - currency
  - multi-agent
  - terminal
  - tmux
  - claude-code
permalink: /currency/currents/multi-agent-shogun/
links:
  - id: terminal-native-agentic-workflows
    relation: "Shared infrastructure pattern for terminal-based agent orchestration (tmux)"
  - id: clawteam
    relation: "Similar CLI-based multi-agent workflow orchestration engine"
  - id: terminal-collaborative-workspace-ai-agents
    relation: "Shared environment for multiple agents operating within a shared command context"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[multi-agent-shogun](https://github.com/yohey-w/multi-agent-shogun) · github · 2026-03-29
A GitHub repository proposing a terminal-based multi-agent orchestration system that utilizes tmux to manage parallel AI coding agents (Claude Code, Codex, Copilot, Kimi) in a hierarchical structure (Shogun, Karo, Ashigaru). The system emphasizes scriptability and local execution via shell scripts for setup and agent launch.

### Context
The project implements a shell-based orchestration layer that abstracts the complexity of managing multiple concurrent AI sessions. It maps a feudal command hierarchy to task delegation, where a 'Shogun' agent coordinates 'Karo' managers which direct 'Ashigaru' workers. Infrastructure relies on tmux for session management and bash for logic.

### Relevance
Aligns with the terminal-native infrastructure trend by prioritizing local execution and scriptability over chat interfaces. Demonstrates a pattern for reducing coordination overhead in multi-agent systems through explicit hierarchical routing rather than ad-hoc communication.

### Current State
Available as an MIT-licensed GitHub repository. Requires tmux and bash 4+ with at least one supported LLM interface (Claude Code, Codex, Copilot, Kimi). Includes setup scripts for MCP configuration and agent initialization.

### Open Questions
Security isolation for parallel agent execution remains unverified. The effectiveness of the hierarchical routing compared to standard task queues is not benchmarked. Dependency on specific LLM interfaces may limit portability.

### Connections
Links to terminal-native workflows and CLI orchestration frameworks. Similar to ClawTeam in its CLI focus, but distinct in its tmux-based session management and hierarchical logic.