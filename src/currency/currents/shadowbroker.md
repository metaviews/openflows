---
layout: layouts/currency-item.njk
title: "Shadowbroker"
date: 2026-03-15
currencyType: "current"
currencyId: shadowbroker
abstract: "Shadowbroker is an open-source real-time OSINT dashboard aggregating live feeds from public intelligence sources — aircraft, ships, satellites, seismic events, and geopolitical incidents — into a unified interactive map."
tags:
  - currency
permalink: /currency/currents/shadowbroker/
links:
  - id: golaxy-documents-prc-influence
    relation: "both track geopolitical activity through open-source monitoring"
  - id: operational-literacy-interface
    relation: "OSINT aggregation raises questions about who can see what, and how"
  - id: civic-influence-resilience
    relation: "public intelligence tools intersect with civic situational awareness"
mediation:
  tooling: "human-drafted from GitHub signal"
  use:
    - "researched from primary source"
  humanRole: "full authorship"
  limits: "verify current data sources and coverage against primary source before publishing"
---

### Signal
[Shadowbroker](https://github.com/BigBodyCobain/Shadowbroker.) · GitHub
### Context

Shadowbroker aggregates public open-source intelligence streams — ADS-B aircraft transponders, AIS maritime vessel data, satellite tracking, seismic monitoring, and geopolitical event feeds — into a single interactive map interface. The name invokes the 2016-2017 leak of NSA cyberweapons, though the project itself is an intelligence aggregation tool rather than an offensive one. It represents the democratization of situational awareness infrastructure: capabilities previously available only to governments and intelligence agencies, assembled from public data sources and deployable by individuals.

### Relevance

Shadowbroker is an early signal of a pattern likely to develop further: AI-augmented OSINT platforms that synthesize public data streams into actionable situational awareness. As AI improves pattern recognition across heterogeneous data feeds, tools like this become more powerful — moving from raw aggregation toward inference and prediction. For Openflows, this represents the intersection of open-source infrastructure and geopolitical monitoring, a space where civic and adversarial uses are difficult to separate.

### Current State

2.9k stars on GitHub. Next.js and Python FastAPI stack, suggesting active development by practitioners comfortable with full-stack web development. Data sources are publicly accessible feeds, not private or hacked data. License terms are not clearly specified on the repository.

### Open Questions

- What AI or machine learning capabilities, if any, are layered on top of the raw data aggregation?
- How does Shadowbroker handle the dual-use nature of aggregated public surveillance data — what access controls exist?
- As AI pattern recognition improves, how does a tool like this evolve from aggregation to inference — and what governance structures exist for that transition?
- What is the relationship between open OSINT tooling and the erosion of practical obscurity for individuals and organizations that appear in public data streams?

### Connections

Shadowbroker sits alongside golaxy-documents-prc-influence as a signal of AI-augmented geopolitical monitoring built from open sources. It raises the civic influence resilience circuit's core concern from a different angle: not who is running influence operations, but who has the tools to detect them. The operational literacy interface question applies in reverse here — rather than asking whether AI users understand their tools, it asks whether subjects of public data streams understand that they are visible.
