---
layout: layouts/currency-item.njk
title: "openpilot"
date: 2026-02-15
currencyType: "current"
currencyId: openpilot
abstract: "comma.ai's open source driver-assistance stack keeps real-world autonomy development legible through code, hardware constraints, and public release cadence."
tags:
  - currency
permalink: /currency/currents/openpilot/
links:
  - id: rynnbrain
    relation: "complements embodied model research with production-facing on-road control practice"
---

### Signal

[openpilot](https://github.com/commaai/openpilot) is an open source advanced driver-assistance system (ADAS) focused on lane centering and adaptive cruise control with end-to-end stack visibility.

### Context

The project is actively maintained in public, with broad vehicle support and ongoing release cadence. As of December 21, 2025, the latest tagged release is `0.10.3`, and the repository documents support across 300+ car models.

### Relevance

For Openflows, openpilot is a concrete example of embodied intelligence under tight safety, latency, and hardware constraints. It keeps the loop inspectable: sensing, planning, control, and deployment are visible as engineering practice.

### Current State

Mature open ADAS project with continuous iteration and real-world operating feedback.

### Open Questions

- How does maintainership balance rapid model evolution with safety-critical verification demands?
- Which parts of the stack are easiest to audit externally, and which remain opaque in practice?
- What pathways exist for local experimentation without compromising road safety boundaries?

### Connections

- Linked to `rynnbrain` as an adjacent embodied-intelligence signal with stronger production road constraints.
