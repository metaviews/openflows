---
layout: layouts/currency-item.njk
title: "X Research Skill: Agentic Twitter Research for Claude Code and OpenClaw"
date: 2026-04-19
currencyType: current
currencyId: x-research-skill
tags: [currency, skill, research, twitter, claude-code, openclaw]
permalink: /currency/currents/x-research-skill/
abstract: "A skills-layer implementation for autonomous X/Twitter research, enabling agentic search, thread following, deep-dives, and sourced briefings within Claude Code and OpenClaw workflows."
links:
  - id: skills-sh
    relation: "uses the skills-layer pattern for modular agent capability"
  - id: openclaw
    relation: "is designed for use with OpenClaw workflows"
  - id: xactions
    relation: "shares the X/Twitter research and automation surface"
  - id: local-first-web-access-infrastructure
    relation: "treats social-media research as a composable web-access skill"
---

### Signal
X Research Skill is published at [rohunvora/x-research-skill](https://github.com/rohunvora/x-research-skill) as a reusable skills-layer component for X/Twitter research workflows in Claude Code and OpenClaw contexts.

### Context
The project packages social-media research as an agent skill, which means search, thread traversal, and briefings become composable capabilities inside larger operator workflows.

### Relevance
X Research Skill is relevant because social signals are useful for discovery, but the workflow must preserve provenance, platform boundaries, and human judgment over interpretation.

**X Research Skill** ([rohunvora/x-research-skill](https://github.com/rohunvora/x-research-skill)) is an open-source skills-layer implementation designed to extend AI coding agents with specialized X/Twitter research capabilities. Built for integration with both Claude Code and the OpenClaw agent framework, it operationalizes social media intelligence gathering as a reusable workflow component.

## Capabilities

The skill enables autonomous agents to:

- **Agentic search**: Execute targeted queries against X/Twitter's data, moving beyond simple keyword matching to understand context and relationships.
- **Thread following**: Traverse discussion threads to map argument structures, identify key voices, and trace information propagation across conversations.
- **Deep-dives**: Conduct multi-step research sequences that synthesize disparate tweets, replies, and threads into coherent intelligence briefings.
- **Sourced briefings**: Generate citable research outputs with embedded source attribution, supporting auditability and provenance tracking in downstream workflows.

## Technical Positioning

This project occupies a specific niche in the open agent skills ecosystem. Rather than building a full autonomous researcher or a general-purpose scraper, it provides a **skill component** that other orchestrators can compose into larger workflows. This aligns with the skills-layer pattern documented in [skills.sh](/currency/currents/skills-sh/), where agents discover, share, and execute specialized capabilities without vendor lock-in.

The implementation supports both **Claude Code** (Anthropic's terminal-native coding agent) and **OpenClaw** (open-source agent framework emphasizing inspectability and configuration), reflecting the current trend toward multi-provider flexibility in agent orchestration.

## Ecosystem Context

With 1.1k stars and 108 forks at time of curation, X Research Skill represents a significant contributor to the emerging infrastructure for **autonomous research workflows**. It addresses a gap where social media analysis traditionally sits between ad-hoc scraping and expensive API services, offering a reusable, locally-executable pattern.

For operators building research pipelines, this skill enables the transition from manual investigation to structured, agent-mediated intelligence gathering—reducing context switching while maintaining provenance and auditability.

## Related Entries

- [skills.sh](/currency/currents/skills-sh/) — Skills-layer signal for modular, explicit agent behavior
- [claude-code](/currency/currents/claude-code/) — Terminal-native agent by Anthropic
- [openclaw](/currency/currents/openclaw/) — Open-source agent framework
- [xactions](/currency/currents/xactions/) — X/Twitter automation without official API fees
- [local-first-web-access-infrastructure](/circuit/local-first-web-access-infrastructure/) — Local-first web access pattern

---

**Mediation note**: This entry documents a skills-layer component discovered via public repository signal. The skill itself does not perform autonomous actions but provides a composable building block for larger workflows. Operator discretion applies when deploying in production contexts.
