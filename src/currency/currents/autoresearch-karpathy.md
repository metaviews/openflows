---
layout: layouts/currency-item.njk
title: "AutoResearch"
date: 2026-03-07
currencyType: "current"
currencyId: autoresearch-karpathy
abstract: "A minimal autonomous agent setup by Andrej Karpathy that runs overnight ML experiments by modifying, training, and evaluating code without human intervention."
tags:
  - currency
permalink: /currency/currents/autoresearch-karpathy/
links:
  - id: autonomous-research-accountability
    relation: "is the founding signal for the accountability loop represented by"
  - id: andrej-karpathy
    relation: "is directly operated by"
  - id: local-inference-baseline
    relation: "depends on single-GPU local compute conditions established by"
lastReviewed: 2026-03-22
---

### Signal

[AutoResearch](https://github.com/karpathy/autoresearch) demonstrates a tightly constrained autonomous research loop: an agent edits a single training file, runs fixed-duration experiments, evaluates on a consistent metric, and iterates — roughly 100 experiments overnight on one GPU.

### Context

The design is deliberately minimal. Agents modify only `train.py`, every run is capped at five minutes of wall-clock time, and a single metric (validation bits-per-byte) provides a clean comparison baseline. Human direction is encoded in a `program.md` file, framing the human role as programming the research organization rather than individual experiments. This is an early but concrete demonstration of autonomous ML experimentation at a scale that previously required teams.

### Relevance

For Openflows, this current surfaces a structural shift in how research labor is organized. The constraint architecture — single file, fixed budget, clear metric — is as interesting as the autonomy itself. It models how meaningful human-in-the-loop framing can be preserved even as execution is delegated.

### Current State

Functional proof-of-concept. Minimal codebase (~300 lines of core training code). Requires a single NVIDIA GPU and Python 3.10+. Early community engagement.

### Open Questions

- Which research tasks are well-suited to fixed-budget autonomous iteration, and which require more fluid human guidance?
- How should experiment provenance and agent-generated hypotheses be documented for reproducibility?
- What happens to scientific judgment when the volume of automated experiments exceeds human review capacity?

### Connections

- Linked to `autonomous-research-accountability` as its founding current and primary design reference.
- Linked to `andrej-karpathy` as the direct operator behind this project.
- Linked to `local-inference-baseline` as a downstream use of accessible local compute.

## Updates

**2026-03-15**: The project has transitioned from early community engagement to widespread adoption, now holding 34.2k stars and 4.6k forks. Active development is evidenced by 80 open pull requests and 40 issues, indicating the project has evolved beyond its initial proof-of-concept phase.