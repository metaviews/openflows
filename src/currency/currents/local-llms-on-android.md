---
layout: layouts/currency-item.njk
title: "Local LLMs on Android"
date: 2026-04-14
currencyType: "current"
currencyId: local-llms-on-android
abstract: An Android application enabling offline local inference of quantized LLMs via ONNX Runtime and LiteRT backends for mobile hardware.
tags:
  - currency
permalink: /currency/currents/local-llms-on-android/
links:
  - id: local-inference-baseline
    relation: defines the infrastructure layer where mobile inference is treated as ordinary local infrastructure
  - id: lm-studio
    relation: comparable local inference client for desktop environments
  - id: gemma-4-open-weight-release
    relation: supports Gemma 4 model family via LiteRT backend
  - id: qwen3-5-vlm-nvidia-gpu-endpoints
    relation: supports Qwen3 model family via ONNX Runtime backend
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[local-llms-on-android](https://github.com/dineshsoudagar/local-llms-on-android) · github · 2026-04-14
This Android application enables offline local inference of quantized LLMs on mobile devices using ONNX Runtime and LiteRT backends. The v1.3.0 release supports streaming responses, persistent local chat history, and markdown rendering for models including Qwen3, Gemma 4, and LLaMA variants optimized for varying hardware tiers.

### Context
Mobile inference has shifted from experimental prototypes to production-ready applications due to hardware acceleration improvements and model quantization techniques. This entry represents the convergence of open-weight model availability and on-device execution capabilities, aligning with the broader Openflows objective of treating local inference as ordinary infrastructure rather than a niche capability.

### Relevance
Deploying inference on mobile hardware reduces latency and dependency on cloud APIs while enhancing user privacy through data sovereignty. The use of ONNX Runtime and LiteRT standardizes the execution pipeline across heterogeneous Android hardware, reducing fragmentation in the mobile AI ecosystem.

### Current State
The project is at version 1.3.0 with prebuilt APKs available for download. It supports specific model configurations including Gemma 4 E2B/E4B via LiteRT and Qwen3 0.6B via ONNX. Features include a polished chat UI, persistent history, and theme customization. The codebase is hosted on GitHub with public releases for direct installation.

### Open Questions
- How does thermal throttling affect sustained inference performance on mid-range devices compared to desktop equivalents?
- What security mechanisms exist to isolate the inference process from other mobile applications and system resources?
- Is there a maintenance commitment for supporting new Android API versions and hardware driver updates?
- How does the app handle memory management to prevent system instability during large context window operations?

### Connections
This entry integrates into the local inference baseline circuit by extending the capability from desktop and server contexts to ubiquitous mobile devices. It complements existing client tools like LM Studio by focusing on the mobile operating system constraint. Model support overlaps with the Gemma 4 and Qwen3 release signals, indicating a trend toward optimizing specific model families for edge deployment. The infrastructure relies on standard runtime backends (ONNX, LiteRT) rather than proprietary frameworks, ensuring interoperability with the wider tooling ecosystem.