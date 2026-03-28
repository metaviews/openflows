---
layout: layouts/currency-item.njk
title: "Xiaomi-Robotics-0"
date: 2026-03-28
currencyType: "current"
currencyId: "xiaomi-robotics-0"
abstract: "Xiaomi-Robotics-0 is a 4.7-billion parameter vision-language-action model released open-source, featuring a dual-brain architecture for 30Hz real-time control on consumer hardware."
tags:
  - currency
  - embodied-ai
  - robotics
  - vla-model
permalink: /currency/currents/xiaomi-robotics-0/
links:
  - id: rynnbrain
    relation: "compares to Alibaba's open embodied foundation model family for grounded robot planning"
  - id: dimensionalos
    relation: "connects to agentic robotics frameworks using skills-based ROS2 architecture"
  - id: distributed-physical-agent-infrastructure
    relation: "contributes to the software-native plumbing connecting intelligence and control across distributed physical systems"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[2026 年，这些开源的具身大脑模型正在改变着技术格局......-CSDN 博客](https://blog.csdn.net/qq_29462849/article/details/159417734) · brave · 2026-03-24
Xiaomi releases Xiaomi-Robotics-0, a 4.7-billion parameter vision-language-action (VLA) model featuring a dual-brain architecture where a visual-language brain parses instructions and a motor control brain generates continuous action vectors. The model achieves 80ms latency and 30Hz real-time control on consumer-grade GPUs, claiming record performance across three benchmarks. It targets home service and industrial sorting applications, aiming to reduce hardware costs by two orders of magnitude.

### Context
Embodied AI infrastructure is shifting from closed, high-cost systems toward open-weight models deployable on consumer hardware. The dual-brain architecture separates cognitive reasoning from low-latency motor execution, addressing the latency constraints typical of end-to-end VLA models. This release signals a move toward localized inference for physical agents, aligning with the broader Openflows baseline for local model deployment.

### Relevance
Xiaomi-Robotics-0 lowers the barrier for entry in robotics development by removing reliance on proprietary cloud APIs. Its open-source nature allows for community-driven optimization and integration with existing agent orchestration frameworks. The model's efficiency on consumer hardware supports the decentralization of physical AI operations, reducing dependency on centralized data centers.

### Current State
The model is available as an open-source release with claimed support for 30Hz control loops. It is optimized for NVIDIA consumer GPUs and supports inference on local hardware without high-level abstraction layers. Documentation and weights are being distributed through Xiaomi's open-source channels, with integration plans for home and industrial hardware ecosystems.

### Open Questions
Long-horizon task reliability and safety mechanisms for physical interaction in unstructured environments remain to be validated. Integration with existing multi-agent orchestration systems (e.g., OpenClaw, CrewAI) requires further technical specification. The model's performance under varying lighting and environmental conditions outside benchmark settings needs independent verification.

### Connections
Xiaomi-Robotics-0 operates within the same infrastructure layer as `rynnbrain`, providing an alternative open embodied foundation model for grounded robot planning. It interfaces with frameworks like `dimensionalos` which manage skills-based ROS2 architectures for robot control primitives. The release contributes to the `distributed-physical-agent-infrastructure` circuit by enabling software-native control over distributed physical systems with reduced latency.