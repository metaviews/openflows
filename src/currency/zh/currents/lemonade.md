---
layout: layouts/currency-item.njk
title: "柠檬水"
lang: zh
date: 2026-03-26
currencyType: "current"
currencyId: lemonade
abstract: "柠檬水是一款面向异构硬件优化的开源本地推理服务器，提供 OpenAI 兼容 API 及支持智能体工具调用的模型上下文协议。"
tags:
  - currency
permalink: /zh/currency/currents/lemonade/
links:
  - id: local-inference-baseline
    relation: "implements baseline pattern for local inference infrastructure"
  - id: ollama
    relation: "alternative local inference runtime with similar OpenAI API compatibility"
  - id: open-model-interoperability-layer
    relation: "contributes to standardization of inference interfaces via OpenAI and MCP protocols"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 柠檬水 · github · 2026-03-26 柠檬水是一款基于 Python 的开源推理服务器，旨在 GPU 和 NPUs 上本地运行大语言模型。它支持 Windows、Ubuntu、macOS 和 Arch Linux，提供 OpenAI 兼容 API 及模型上下文协议（MCP）集成以支持智能体工作流。该项目利用 ONNXRuntime 和 Vulkan 进行硬件抽象，针对 AMD Radeon、NVIDIA 和 Apple Silicon 设备。

Context 本地推理基础设施正从实验脚本转向标准化服务器运行时。柠檬水通过将开放权重模型在消费级硬件上的部署标准化，将自己定位在 local-inference-baseline 回路之中。它通过统一接口支持多种操作系统和硬件后端，解决了本地推理工具的碎片化问题。

Relevance 该工具适用于需要持久、本地模型访问且无需依赖云端的智能体开发工作流。其 MCP 支持使其能够作为 open-model-interoperability-layer 回路中定义的智能体后端运行。通过暴露 OpenAI 兼容 API，它降低了现有智能体框架的集成摩擦，这些框架通常假设标准协议端点。

Current State 服务器在 Windows 和 Ubuntu (24.04/25.04) 上运行稳定，macOS 支持目前处于测试阶段。它通过 Snap、Arch AUR 和直接 Python 安装进行分发。项目专注于特定硬件配置的性能优化，包括 AMD GPU 的 ROCm 和跨平台渲染的 Vulkan。

Open Questions macOS 测试版实现的长期维护可行性尚未验证。相对于 vLLM 或 Ollama 等专用引擎的性能特征需要在负载下进行基准测试。在投入生产部署前，需要对针对服务器运行不受信任 MCP 连接的安全影响进行评估。

Connections 柠檬水在本地推理景观中与 ollama 互为对等节点，提供相似的 API 兼容性但针对不同的硬件优化目标。它通过实现模型服务的标准协议连接，为 open-model-interoperability-layer 回路做出贡献。该条目通过将推理视为普通本地基础设施而非专门的研究产物，与 local-inference-baseline 回路保持一致。

**译注**
- 回路 (Circuit)：此处指代生态系统中已稳定闭合的模式或标准路径，区别于单纯的“电路”。
- 智能体 (Agent)：此处指代能够自主执行任务的 AI 实体，强调其工具调用与交互能力。
- 开放权重 (Open weights)：指模型参数公开可访问，允许本地部署与修改，区别于闭源权重。