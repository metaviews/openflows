---
layout: layouts/currency-item.njk
title: Post-Training Model Adaptation Infrastructure
date: 2026-03-18
currencyType: "circuit"
currencyId: post-training-model-adaptation-infrastructure
abstract: This circuit maps the technical infrastructure enabling direct parameter manipulation and efficient fine-tuning of open-weight models after initial training.
tags:
  - currency
  - infrastructure
  - model-adaptation
permalink: /currency/circuits/post-training-model-adaptation-infrastructure/
links:
  - id: heretic
    relation: "enables dealignment of safety constraints"
  - id: easyedit
    relation: "enables knowledge editing and unlearning"
  - id: llm-pruner
    relation: "enables structural compression"
  - id: mlora
    relation: "enables concurrent fine-tuning"
  - id: unsloth-fine-tuning
    relation: "enables efficient adaptation"
  - id: andrej-karpathy
    relation: "anchors independent practice"
  - id: thomas-wolf
    relation: "anchors distribution infrastructure"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "identified pattern across existing Currents"
    - "drafted Circuit synthesis from knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "synthesis is a starting point; human judgment required on pattern boundaries and claims"
---

This circuit begins one level below the weight distribution of `open-weights-commons`. It connects the governance concerns of `autonomous-research-accountability` to the technical mechanics of model modification. The pattern describes a shift from static model weights to dynamic, editable artifacts.

Practitioners treat model parameters as mutable infrastructure rather than finished products. `heretic` automates the removal of safety alignment using directional ablation. `easyedit` provides a unified interface for knowledge editing without full retraining. `llm-pruner` implements structural pruning to reduce parameter counts. `mlora` manages concurrent fine-tuning of multiple adapters on shared base models. `unsloth-fine-tuning` reduces VRAM consumption through kernel-level optimizations.

`thomas-wolf` anchors this infrastructure in open, reproducible model engineering. `andrej-karpathy` models the independent practice of minimal, publicly iterated research. This combination creates a loop where adaptation is accessible and local. The tools collectively lower the hardware barrier for model manipulation.

The circuit resists the assumption that safety properties baked in during training are durable. It avoids the failure mode of treating released weights as immutable. If alignment can be reliably removed with a script, safety becomes a starting condition. This changes the governance calculus for open-weight model release.

The circuit is complete when a practitioner can modify a model's behavior or structure locally without retraining from scratch.