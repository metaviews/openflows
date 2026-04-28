---
layout: layouts/currency-item.njk
title: 'Burner Phone: Multimodal Android Agent with Gaze-Based Wake Detection'
date: 2026-04-28
currencyType: current
currencyId: burner-phone
tags:
  - currency
  - ai
  - agent
  - android
  - multimodal
  - gaze
permalink: /currency/currents/burner-phone/
abstract: A 24/7 always-on Android agent that uses continuous multimodal streaming — gaze detection via front camera and speech via microphone — to activate conversation only when the user looks at and speaks to the phone, without wake words.
links:
  - id: hermes-agent
    relation: integrates with Hermes agent as a skill
mediation:
  tooling: Qwen2.5-Omni 3.5B (multimodal model), Soprano 80M (TTS on CPU)
  use:
    - read GitHub repo README for project scope and technical details
    - assessed linkage to multimodal agent and always-on device patterns
  humanRole: review, edit, and approve before publication
  limits: signal content may be incomplete; verify primary sources before publishing
---

### Signal
[Burner Phone](https://github.com/SouthpawIN/burner-phone) · SouthpawIN · 2026

### Context
Burner Phone transforms any Android device (physical phone, Termux install, or emulator) into a continuously active AI listening agent. Unlike traditional voice assistants that rely on fixed wake words ("Hey Siri", "OK Google"), it detects human attention through a multimodal signal: the front camera streams at 15 fps to a Qwen2.5-Omni 3.5B model, the microphone captures audio chunks simultaneously, and the model jointly evaluates `{addressing: true, looking: true, speaking: true, confidence: 0.94}`. Conversation activates only when gaze and speech align. TTS uses Soprano 80M running on CPU.

### Relevance
This project embodies the "always-on local agent" pattern extended into the physical/companion-device dimension. Gaze-based wake detection replaces brittle keyword spotting with a genuinely attention-aware trigger, which is critical for a 24/7 listening device that must filter ambient noise, TV, and other household conversation. Its integration as a skill into the Hermes agent ecosystem (built by Nous Research) also demonstrates the growing pattern of agent skills composing higher-order behaviors from hardware-level sensing.

### Current State
The project is in v2.0 with documented metrics: ~500ms attention-to-activation latency, 200ms/second TTS generation, ~8%/hour battery drain in continuous streaming mode, and ~50KB/s network usage for compressed media chunks. It supports both physical Android devices and emulators, and multi-device management across Tailscale networks. Originally built as a Hermes Hackathon project. Source is openly licensed on GitHub under Apache 2.0.

### Open Questions
- Does the gaze+speech detection model run fully locally on the Android device, or is it streaming inference to a connected cloud/gateway?
- How does it handle privacy — where is camera and microphone data processed, and what is the retention model?
- Does it expose MCP-compatible tooling for other agent frameworks beyond Hermes?
- What is the scope of its phone automation capabilities (contacts, messages, notifications, system settings)?

### Connections
Connections to agent skill composition patterns, always-on local inference devices, and multimodal wake detection infrastructures. Related to [hermes-agent](current|hermes-agent|en) as its primary integration target, [mimika-studio](current|mimika-studio|en) for TTS on local hardware, and [dimensionalos](current|dimensionalos|en) for physical device agent integration.