---
layout: layouts/currency-item.njk
title: "tt-metal"
lang: zh
date: 2026-04-14
currencyType: "current"
currencyId: tt-metal
abstract: "Tenstorrent 的开源软件栈，通过 TT-NN 算子和 Metalium 内核编程来编程 AI 加速器。"
tags:
  - currency
permalink: /zh/currency/currents/tt-metal/
links:
  - id: xllm
    relation: "Alternative high-performance inference engine optimized for diverse AI accelerators"
  - id: vllm
    relation: "Competing high-throughput inference serving engine with different hardware backend focus"
  - id: inference-optimization-infrastructure
    relation: "Concrete implementation of the circuit mapping technical stack for efficient local execution"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

Signal tt-metal · github · 2026-04-14 TT-NN 算子库和 TT-Metalium 低级内核编程模型（model），用于 Tenstorrent 的 AI 加速器。支持 LLMs、图像生成和视频生成，性能指标包括每秒 token 数和首个 token 时间。背景：Tenstorrent 提供的 AI 加速器硬件（Blackhole、Wormhole）需要特定的软件栈来高效编程和利用。tt-metal 作为这些芯片的低级编程模型（model）和运行时环境，提供 TT-NN（神经网络）算子库和内核编程能力。它充当 Tenstorrent 硬件的软件抽象层，使开发者能够直接在 Tenstorrent 硅片上运行 AI 工作负载，而不依赖于通用 GPU 驱动程序如 CUDA。相关性：此条目代表 AI 基础设施堆栈中硬件多样性的关键组成部分。通过提供开源（open source）的 NVIDIA CUDA 生态系统替代方案，tt-metal 使得在非 GPU 硬件上进行推理（inference）和训练成为可能。这减少了供应商锁定，并在专用加速器上提供了本地推理（inference）的路径，这与 Openflows（开流）原则相一致——即将 AI 视为基础设施而非服务依赖。当前状态：仓库维护一个支持多种架构的模型（model）矩阵，包括 Llama、DeepSeek、Stable Diffusion 和视频生成模型。性能指标跟踪首个 token 时间（TTFT）和每秒 token 数（T/S），并支持张量并行（TP）和数据并行（DP）。项目包括用于模型（model）优化和兼容性验证的演示。开放问题：tt-metal 与现有智能体（agent）框架（如 LangChain、AutoGen）的集成方式相较于标准推理（inference）服务器有何不同？相较于 CUDA，开发者工具和调试支持的成熟度如何？Tenstorrent 加速器的硬件可用性如何影响此堆栈在本地推理（inference）中的实际部署？相关条目：以下知识库（knowledge base）条目提供了硬件和软件格局的背景：xllm : 一种针对 diverse AI 加速器优化的高性能推理（inference）引擎的替代方案；vllm : 一种具有不同硬件后端重点的高吞吐推理（inference）服务引擎的竞争方案；inference-optimization-infrastructure : 用于高效本地执行的技术栈的回路（circuit）映射的具体实现。

**译注**
"开流"（kāi liú）不仅表示“开放的流动”，还暗示着像鵬那样展翅高飞的自然流动，这在英文中仅有的品牌名“Openflows”中未直接体现。