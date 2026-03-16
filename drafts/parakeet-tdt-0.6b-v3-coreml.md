---
layout: layouts/currency-item.njk
title: FluidInference Parakeet TDT CoreML
date: 2026-03-16
currencyType: "current"
currencyId: parakeet-tdt-0.6b-v3-coreml
abstract: A 0.6B parameter multilingual automatic speech recognition model optimized for Core ML inference on Apple hardware with support for 25 European languages.
tags:
  - currency
  - speech-recognition
  - coreml
  - on-device
permalink: /currency/currents/parakeet-tdt-0.6b-v3-coreml/
links:
  - id: local-inference-baseline
    relation: "Infrastructure layer for on-device model execution"
  - id: ollama
    relation: "Alternative local inference runtime for personal hardware"
  - id: lm-studio
    relation: "Desktop interface for local model management"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
Source: Hugging Face (FluidInference/parakeet-tdt-0.6b-v3-coreml)
Date: 2026-03-15
URL: https://huggingface.co/FluidInference/parakeet-tdt-0.6b-v3-coreml
Metrics: 30 likes, 144,319 downloads
License: CC-BY-4.0

### Context
This entry represents a Core ML conversion of the NVIDIA Parakeet TDT 0.6B model. The conversion enables execution of the automatic speech recognition (ASR) pipeline on Apple Silicon devices without requiring cloud connectivity. The model is part of the FluidAudio ecosystem, which provides batch ASR services and utilizes this specific variant for its backend processing. The base architecture relies on NVIDIA NeMo libraries, specifically the Transducer and FastConformer components.

### Relevance
The model addresses the demand for low-latency, privacy-preserving speech processing on edge devices. By converting a 0.6B parameter transformer to Core ML, it reduces memory footprint and inference latency on consumer hardware. Support for 25 European languages indicates a focus on regional multilingual capability rather than global coverage. The CC-BY-4.0 license allows for redistribution and modification, aligning with open infrastructure principles.

### Current State
The model is hosted on Hugging Face with active download traffic exceeding 144,000 instances. The repository includes conversion scripts for reproducible Core ML generation and benchmark data for transcription accuracy. It is tagged as `automatic-speech-recognition` and `hf-asr-leaderboard` compatible. The model is designed for offline operation, removing dependency on external inference APIs.

### Open Questions
1. How does the Core ML conversion handle updates to the underlying NeMo architecture compared to PyTorch versions?
2. What is the maintenance cadence for the FluidAudio conversion scripts relative to upstream NVIDIA releases?
3. How does performance scale across different Apple Silicon generations (M1 vs M3) regarding memory constraints?
4. Can this model be integrated into existing agent frameworks (e.g., OpenClaw, CrewAI) for voice-first workflows?

### Connections
This entry functions as a specific implementation within the **local-inference-baseline** circuit, demonstrating the shift toward ordinary local infrastructure for multimodal tasks. It operates alongside **ollama** and **lm-studio** as an alternative runtime for personal hardware, though specialized for audio rather than general text. The model lineage traces back to NVIDIA NeMo, distinguishing it from generic open-weight models by its specific optimization for transducer-based speech recognition.