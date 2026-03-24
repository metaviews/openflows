---
layout: layouts/currency-item.njk
title: xllm
lang: zh
date: 2026-03-23
currencyType: "current"
currencyId: xllm
abstract: xllm 是一款采用 Apache 2.0 许可的高性能大语言模型推理引擎，针对包括英伟达和昇腾在内的多种 AI 加速器进行了优化。
tags:
  - currency
permalink: /zh/currency/currents/xllm/
links:
  - id: vllm
    relation: "面向大语言模型的高吞吐量服务框架竞争者"
  - id: sglang
    relation: "带有结构化解码和内存管理的并行服务框架"
  - id: xinference
    relation: "面向异构模型系列的统一生产就绪推理 API 层"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号** GitHub 仓库 jd-opensource/xllm 发布于 2026-03-23。一款针对多种 AI 加速器优化的高性能大语言模型推理引擎。支持 DeepSeek、GLM、Qwen 及其他模型家族。Apache 2.0 许可。技术报告可通过 arXiv 获取。背景 xllm 代表京东在 LLM 服务基础设施栈中的开源贡献。它面向多加速器环境，特别强调对英伟达 GPU 和昇腾等国产硬件的支持。该项目提供包括 GLM-5 和 GLM-4.7 在内的近期模型发布的零日支持，表明其维护节奏与上游模型发布保持一致。

**相关性** 该条目映射至致力于模型服务与推理优化的基础设施层。它通过提供硬件无关的部署路径，与现有高吞吐量引擎形成竞争或互补。这降低了需要标准 CUDA 生态系统之外特定加速器支持的操作者的厂商锁定风险。

**当前状态** 该项目处于活跃开发中，已发布文档和 Docker 镜像。它支持包括 Qwen、GLM 和 DeepSeek 在内的多个模型家族。代码库采用 Apache 2.0 许可，便于集成到商业和开源流水线中。技术报告表明针对目标硬件进行了内存带宽和内核融合优化。

**开放问题** 跨异构硬件与 vLLM 和 SGLang 的性能基准尚待验证。社区采用率和贡献指南需持续观察。除昇腾外，非英伟达加速器的具体支持矩阵在初始信号中尚未完全详述。

**连接** xllm 在功能领域上与 vllm 和 sglang 处于同一范畴，作为替代推理运行时存在。xinference 提供更广泛的 API 抽象层，可能将 xllm 作为后端集成。qwen3-5-ollama-local-deployment 聚焦于 Qwen 模型家族，尽管 xllm 面向更广泛的服务场景。

**译注**
此处“推理”（tuī lǐ）与“理”（lǐ）同字，暗示技术行为需顺应硬件与数据的自然纹理。在 Openflows 语境中，“流”（Current）不仅是数据流动，更是修行者（Practitioner）在系统中体察的理路。