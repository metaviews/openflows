---
layout: layouts/currency-item.njk
title: "Anthropic Cybersecurity Skills"
date: 2026-03-15
currencyType: "current"
currencyId: anthropic-cybersecurity-skills
abstract: "A curated collection of 611+ structured cybersecurity skills compatible with Claude Code, GitHub Copilot, Cursor, and Gemini CLI, enabling AI coding assistants to perform security analysis, threat modeling, and vulnerability assessment tasks."
tags:
  - currency
permalink: /currency/currents/anthropic-cybersecurity-skills/
links:
  - id: skills-sh
    relation: "comparable structured skills framework for AI agent capability extension"
  - id: openclaw
    relation: "skills-based agent extensibility pattern applied to security domain"
  - id: inspectable-agent-operations
    relation: "security-focused skills raise auditability questions for AI-assisted analysis"
  - id: heretic
    relation: "occupies the opposite end of the security spectrum — defense vs. dealignment"
mediation:
  tooling: "human-drafted from GitHub signal"
  use:
    - "researched from primary source"
  humanRole: "full authorship"
  limits: "verify skill coverage and platform compatibility against primary source before publishing"
lastReviewed: 2026-03-22
---

### Signal

Source: GitHub (mukul975/Anthropic-Cybersecurity-Skills). URL: https://github.com/mukul975/Anthropic-Cybersecurity-Skills. Stars: 492. License: Apache 2.0. Language: Python.

### Context

This repository provides a structured collection of cybersecurity skills — 611+ as of the signal date — formatted for use with AI coding assistants across multiple platforms: Claude Code, GitHub Copilot, Cursor, and Gemini CLI. Skills cover security analysis, threat modeling, vulnerability assessment, and related domains. The platform-agnostic approach (supporting four distinct AI assistant environments) reflects both the fragmentation of the current AI assistant market and an attempt to create reusable security expertise that travels across tools. Apache 2.0 license ensures permissive use and modification.

### Relevance

The collection represents an emerging pattern: domain expertise encoded as machine-readable skills that extend AI assistant capabilities beyond general-purpose code generation into specialized professional domains. Cybersecurity is a particularly significant early domain because it is both high-stakes (errors have serious consequences) and skills-dependent (expertise is concentrated and difficult to distribute). If structured skills can reliably extend AI assistant capability in security contexts, the pattern will propagate rapidly to other expert domains.

### Current State

492 stars on GitHub with active curation. 611+ skills covering the cybersecurity domain across multiple task types. Compatible with four major AI coding assistant platforms. Apache 2.0 license. Community contributions appear welcome given the open structure.

### Open Questions

- How are skill quality and accuracy validated — who reviews the cybersecurity expertise encoded in the 611+ entries?
- How does performance compare across the four supported platforms — are skills designed for one assistant consistently effective in others?
- What is the governance model for skills that could be used for both defensive (threat modeling, vulnerability assessment) and offensive (attack surface mapping, exploit research) purposes?
- How does this structured skill approach compare to fine-tuning or RAG-based approaches for domain specialization?

### Connections

This collection sits alongside skills.sh as an instance of the extensible skills pattern for AI agents, but applied to a security domain rather than general-purpose workflows. The dual-use nature of security skills connects it directly to Heretic — both operate in the space between defense and offense that defines security research. The inspectable agent operations circuit's concern for auditable AI behavior applies with particular urgency when the agent is performing security analysis: knowing what the agent did and why matters more in security contexts than in most others.

## Updates

**2026-03-22**: The repository now lists 734+ structured cybersecurity skills (increased from 611+) and supports 20+ AI platforms including OpenAI Codex CLI, expanding beyond the previously listed four environments. It now also aligns with the agentskills.io open standard and includes MITRE ATT&CK mapping for its skill set.
