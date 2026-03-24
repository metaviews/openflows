---
layout: layouts/currency-item.njk
title: Local Multimodal Perception Infrastructure
date: 2026-03-23
currencyType: "circuit"
currencyId: local-multimodal-perception-infrastructure
abstract: This circuit stabilizes the pattern of on-device multimodal perception, enabling agents to process audio, vision, and spatial data without cloud dependency.
tags:
  - currency
permalink: /currency/circuits/local-multimodal-perception-infrastructure/
links:
  - id: lux-tts
    relation: provides local voice synthesis capability
  - id: apple-ml-sharp
    relation: provides local vision reconstruction capability
  - id: ibm-granite-4-0-1b-speech
    relation: provides local speech recognition capability
  - id: corbeau-splat
    relation: provides local spatial mapping capability
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "identified pattern across existing Currents"
    - "drafted Circuit synthesis from knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "synthesis is a starting point; human judgment required on pattern boundaries and claims"
---

This circuit begins one level above the language-focused local-inference-baseline.
It stabilizes the loop of sensory input and motor output that occurs entirely on the edge device.
While the baseline handles text, this infrastructure handles the world around the text.
The ibm-granite-4-0-1b-speech current anchors the input side with efficient automatic speech recognition.
It allows agents to parse human voice locally without transmitting audio streams.
The lux-tts current closes the loop by synthesizing high-fidelity voice output from the same device.
Together they form a closed audio channel that resists cloud latency and privacy leakage.
Vision and spatial data require different handling than pure text.
The apple-ml-sharp current generates novel 3D viewpoints from single images in real-time.
The corbeau-splat current converts raw video into interactive 3D Gaussian Splat representations.
These tools shift spatial reconstruction from batch processing to runtime perception.
This cluster is distinct from distributed-physical-agent-infrastructure which focuses on robot control rather than general sensory perception.
The cluster resists the failure mode of distributed sensing where data must leave the device to be understood.
It avoids the fragmentation of tooling where vision, audio, and language live in separate silos.
Instead it establishes a shared infrastructure for embodied autonomy.
The circuit is complete when an agent can ingest audio and video, reconstruct the 3D environment, and respond vocally without a single packet leaving the local hardware.