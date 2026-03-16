---
layout: layouts/currency-item.njk
title: CorbeauSplat: macOS Video-to-3D Gaussian Splatting Tool
date: 2026-03-16
currencyType: "current"
currencyId: corbeau-splat
abstract: A macOS-native tool converting raw video input into interactive 3D Gaussian Splat representations for local spatial reconstruction.
tags:
  - currency
  - 3d-reconstruction
  - gaussian-splatting
  - macos
  - video-processing
permalink: /currency/currents/corbeau-splat/
links:
  - id: vjepa-meta
    relation: "video-based world modeling and spatial representation"
  - id: dimensionalos
    relation: "embodied AI requiring 3D spatial understanding for robot control"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
Source: opensourceprojects
Title: Turn your raw video into a viewable 3D Gaussian Splat on macOS
URL: https://opensourceprojects.dev/post/57057504-3a80-4179-ae39-336a1eb2e1c4
Date: 2026-03-15
Content: Tool for converting raw video to 3D Gaussian Splat on macOS. GitHub: https://github.com/freddewitt/CorbeauSplat

### Context
3D Gaussian Splatting (3DGS) has emerged as a high-fidelity alternative to NeRFs for scene reconstruction, offering real-time rendering capabilities. While early implementations required significant compute resources or specific hardware, recent efforts focus on consumer-grade accessibility. This signal identifies a macOS-specific implementation that prioritizes local inference and video-to-3D workflows, reducing dependency on cloud processing pipelines.

### Relevance
This entry maps a specific infrastructure component for spatial data generation within the Openflows ecosystem. It supports the `local-inference-baseline` circuit by enabling local hardware to process complex 3D reconstruction tasks. It also feeds into `embodied-ai-governance` and `distributed-physical-agent-infrastructure` by providing the spatial mapping layer required for robot navigation and environment understanding without external API calls.

### Current State
The tool is hosted on GitHub as `CorbeauSplat` by `freddewitt`. It targets macOS environments, leveraging Apple Silicon architecture for video processing and rendering. The workflow accepts raw video input and outputs interactive 3D Gaussian Splat assets. Documentation indicates a focus on developer and creator workflows rather than enterprise deployment, though the local execution model aligns with privacy-first infrastructure patterns.

### Open Questions
- What are the specific hardware requirements (RAM/GPU) for stable operation on consumer Mac hardware?
- Is there an API or CLI interface for programmatic integration with agent orchestration frameworks?
- How does the reconstruction quality compare to cloud-based photogrammetry services in terms of fidelity and latency?
- Are there plans for multi-view or SLAM integration to support continuous mapping?

### Connections
- **vjepa-meta**: Both entries address video-based spatial understanding. While V-JEPA focuses on predictive world models from video frames, CorbeauSplat focuses on explicit 3D scene reconstruction. Together they represent complementary approaches to video-to-3D abstraction.
- **dimensionalos**: This framework connects LLM agents to robot control primitives. 3D Gaussian Splatting provides the dense spatial data required for navigation and manipulation in physical environments, serving as a potential input layer for `dimensionalos` workflows.