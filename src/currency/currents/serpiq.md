---
layout: layouts/currency-item.njk
title: "serpIQ: Codebase-First SEO Audit CLI with Real GSC Data"
date: 2026-04-29
currencyType: current
currencyId: serpiq
tags:
  - currency
  - cli
  - developer-tools
  - seo
permalink: /currency/currents/serpiq/
abstract: "A zero-install Node.js CLI that audits SEO by reading your codebase first, then pulling real Google Search Console data to produce actionable optimization plans — no vendor estimates, no live site crawling."
links:
  - id: serpiq
    relation: "npm package"
mediation:
  tooling: "OpenRouter / [model]"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[serpIQ](https://github.com/manojahi/serpiq) · GitHub · 2026

### Context
serpIQ is a zero-install Node.js CLI tool that distinguishes itself from traditional SEO audit platforms through two design constraints. First, it reads the project's codebase — README, package.json, landing page — before accessing any SEO data, grounding the audit in the product's actual identity rather than generic HTML crawling. Second, it pulls real Google Search Console data for impressions, clicks, and positions over the last 90 days, replacing third-party keyword estimates with verified telemetry. The LLM layer is brought-you-own-key compatible: Anthropic, OpenAI, OpenRouter (400+ models), any OpenAI-compatible endpoint, or a local Ollama model.

### Relevance
serpIQ maps a specific operational niche where AI agents mediate between developer workflows and SEO infrastructure. Its codebase-first design reduces the hallucination surface by anchoring analysis in existing project artifacts rather than live external pages. The GSC integration shifts SEO auditing from estimation to measurement. As an npm-native CLI (`npx serpiq`), it follows the pattern of dev-tool-first AI agents that embed directly into local development workflows.

### Current State
- **Install**: `npx serpiq audit --gsc-site sc-domain:yoursite.com`
- **LLM Providers**: Anthropic, OpenAI, OpenRouter, any OpenAI-compatible API, Ollama
- **Output Structure**: `.serpiq/` directory with markdown + JSON reports, blog briefs, and pSEO templates
- **Audit Coverage**: Health score (0–100), prioritized quick fixes, striking-distance keywords, high-impression/low-CTR queries, blog content plans, programmatic SEO templates, technical issues, declining pages
- **GitHub**: 21 stars (time of signal)

### Open Questions
- What GSC API scopes does the tool request, and what is the authorization flow?
- How does the tool handle data freshness when GSC history is incomplete (<60 days)?
- Are the generated blog briefs and pSEO templates structured enough for programmatic CI/CD integration?

### Connections
- [gptme] — Terminal-native autonomous session tool with multi-provider LLM support
- [aider] — Terminal AI coding assistant with repository context
- [adminjs] — Admin panel for CRUD, data management, and business intelligence