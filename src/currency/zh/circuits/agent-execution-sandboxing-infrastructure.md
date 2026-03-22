---
layout: layouts/currency-item.njk
title: 智能体执行沙箱基础设施
lang: zh
date: 2026-03-20
currencyType: "circuit"
currencyId: agent-execution-sandboxing-infrastructure
abstract: 本回路映射正在形成的基础设施层，旨在将不受信任或自主智能体的代码执行与主机系统隔离。
tags:
  - currency
permalink: /zh/currency/circuits/agent-execution-sandboxing-infrastructure/
links:
  - id: aenvironment
    relation: "提供标准化的运行时环境"
  - id: insforge-backend-platform
    relation: "提供后端执行与验证服务"
  - id: capsule
    relation: "实现基于 WebAssembly 的隔离"
  - id: deerflow
    relation: "编排沙箱化子智能体执行"
  - id: openfang
    relation: "定义安全感知智能体操作系统"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

本回路始于推理层之上的一级。它记录了跨越多个流（Currents）而趋于稳定的模式。尽管 local-inference-baseline 涵盖模型推理，autonomous-security-ops-governance 涵盖安全回路，但二者均未触及技术运行时环境。诸如 Capsule 和 OpenFang 的流（Currents）发出信号，表明一种转变：将智能体代码执行视为一个独立的、受控的基础设施层。AEnvironment 通过标准化这些环境来减少碎片化。InsForge 弥合了生成与运行时之间的鸿沟。DeerFlow 将其编排逻辑内嵌沙箱执行。它们共同抵御不受限制的主机访问这一失效模式。它们将执行视为服务，而非手动步骤。

回路在此刻闭合：当任意智能体代码执行在所有活跃框架中均被标准化隔离机制一致地界定。

**译注**
*   **流 (Current) vs. 回路 (Circuit)**：在 Openflows 的术语体系中，“流”（liú）指代生态系统中移动的信号或动态过程，强调流动性；而“回路”（huí lù）则指代已闭合、已稳定且完成循环的模式。此处的“回路”不仅指技术架构，也呼应了 Zhuangzi 中关于“成”与“合”的理（lǐ）。
*   **智能体 (Agent)**：此处采用“智能体”而非“代理”，以强调其作为自主行动者的主体性，符合 AI 语境下的语义演变。