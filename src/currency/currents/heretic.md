---
layout: layouts/currency-item.njk
title: "Heretic"
date: 2026-03-15
currencyType: "current"
currencyId: heretic
abstract: "Heretic is an open-source tool that automates the removal of safety alignment from transformer language models using directional ablation and parameter optimization, making dealignment an accessible and reproducible operation."
tags:
  - currency
permalink: /currency/currents/heretic/
links:
  - id: open-weights-commons
    relation: "open weights are the prerequisite for dealignment; raises governance questions for that commons"
  - id: inspectable-agent-operations
    relation: "dealignment tools directly challenge assumptions about model behavior auditability"
  - id: autonomous-research-accountability
    relation: "model behavior after dealignment raises accountability questions with no clear owner"
  - id: pseudonymity-collapse-response
    relation: "practitioners using dealignment tools often operate pseudonymously for exposure reasons"
mediation:
  tooling: "human-drafted from GitHub signal"
  use:
    - "researched from primary source"
  humanRole: "full authorship"
  limits: "document as ecosystem signal; verify technical mechanism and current model compatibility before publishing"
lastReviewed: 2026-03-23
---

### Signal

Source: GitHub (p-e-w/heretic). URL: https://github.com/p-e-w/heretic. Stars: 14.1k. License: AGPL-3.0. Language: Python.

### Context

Heretic automates the process of removing safety alignment from open-weight transformer models — the guardrails, refusal behaviors, and content restrictions installed during RLHF and instruction tuning. It uses directional ablation (identifying and suppressing the model directions associated with refusal behavior) combined with parameter optimization to produce a version of the model with alignment constraints substantially reduced. At 14.1k stars, it has achieved significant community adoption, indicating that dealignment is not a niche concern but a mainstream capability in the open-weights ecosystem.

### Relevance

Heretic is a direct and concrete challenge to the assumption that open-weight model release can be made safe through alignment training. If alignment can be reliably removed with a Python script, then safety properties baked in during training are not durable — they are a starting condition that can be modified by anyone with access to the weights and a GPU. This changes the governance calculus for open-weight model release: the question is no longer whether a released model is safe, but whether its safety properties will survive contact with the community.

For Openflows, this is a necessary signal. Understanding the open-source AI ecosystem requires understanding what practitioners do with open models — and dealignment is demonstrably what a significant portion of the community does.

### Current State

Active project with 14.1k stars. AGPL-3.0 license means any modifications must be open-sourced. Python implementation. Directional ablation and parameter optimization are both documented as supported methods. Compatible with a range of open-weight transformer architectures.

### Open Questions

- How durable are the alignment removals produced by Heretic — do they persist under fine-tuning, quantization, or other post-processing?
- What are the governance implications for model providers who release open weights knowing that tools like Heretic exist and are widely used?
- Does widespread dealignment capability change the calculus for which models should be released as open weights at all?
- How does the research community studying alignment robustness use tools like Heretic — is it primarily a red-teaming tool, a jailbreak tool, or something else?

### Connections

Heretic is only possible because open-weight models exist — it depends on the commons that the Open Weights Commons circuit describes. Its existence raises the core governance question of that circuit: what does responsible open release mean when release enables modification? The Inspectable Agent Operations circuit assumes that agent behavior can be audited; Heretic demonstrates that the model layer itself can be modified out from under those assumptions. The Autonomous Research Accountability circuit's concern about who is responsible for model behavior becomes acute when the model has been dealigned by a third party and the original developer's safety training no longer applies.

## Updates

**2026-03-23**: As of the latest assessment, the repository star count has increased from 14.1k to 16.5k, indicating sustained growth in community adoption. This update ensures the Context and Current State sections accurately reflect the project's current popularity.
