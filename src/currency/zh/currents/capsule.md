---
layout: layouts/currency-item.njk
title: "Capsule（胶囊）"
lang: zh
date: 2026-03-13
currencyType: "current"
currencyId: capsule
abstract: "Capsule（胶囊）是一个基于 WebAssembly 的运行时环境，旨在将不受信任的智能体代码执行与宿主系统资源隔离开来。"
tags:
  - currency
permalink: /zh/currency/currents/capsule/
links:
  - id: openfang
    relation: "Parallel sandboxed agent execution infrastructure"
  - id: sdcb-chats
    relation: "Similar sandboxed code execution capability"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号源**：opensourceprojects.dev **日期**：2026-03-13 **URL**：https://opensourceprojects.dev/post/05608e4f-6021-4cd6-ae8e-27abc6875cbb **GitHub**：https://github.com/mavdol/capsule

该信号将 Capsule 识别为一种解决方案，用于在安全的 WebAssembly 沙箱内执行不受信任的智能体代码，防止访问宿主文件、网络或系统资源。

**语境**：自主智能体的激增增加了宿主系统的攻击面，当智能体被授予代码执行权限时。传统的虚拟化或容器化往往伴随着开销或权限泄露风险。WebAssembly (WASM) 提供了一种轻量级、标准化的沙箱边界，适用于高频智能体交互，其中隔离对于安全性和可靠性至关重要。

**关联**：本条目记录了一个特定的基础设施组件，以解决智能体安全问题。它通过提供在**执行层**约束智能体行为的技术机制，与 Openflows（开流）对可审查智能体操作和安全治理的关注保持一致。

**当前状态**：Capsule 目前作为 GitHub 上的开源项目（mavdol/capsule）可用。它作为一个运行时环境而非完整的智能体框架运作，专注于代码执行上下文的隔离。信号表明其处于早期采用阶段，侧重于防止任意代码执行风险。

**待解问题**：WASM 沙箱与原生执行或 Docker 容器相比，性能开销如何？Capsule 如何在沙箱内处理智能体间的通信？该实现是否与现有的智能体编排层（如 CrewAI 或 Langflow）兼容？WASM 运行时实现本身是否存在已知漏洞？

**关联**：Capsule 与 OpenFang 处于相同的技术领域，后者在其智能体操作系统设计中强调沙箱执行。它也与 Sdcb Chats 共享功能重叠，后者将沙箱代码执行作为企业级安全的核心能力。这些条目构成了致力于通过运行时隔离约束智能体行为的工具链集群。

**译注**：
1. "Current" 在此处对应 Openflows 术语表中的“流”（liú），指代生态系统中流动的信号，而非“货币”（流通 liú tōng）。
2. "Capsule" 译为“胶囊”，但在技术语境中保留英文原名以指代特定项目。
3. "Agent" 统一译为“智能体”，以体现其作为修行者（Practitioner）操作对象的语境深度。
4. "Openflows" 首次出现时标注“开流”，以呼应 Zhuangzi 中“鹏”之飞行与“流”之通达的理路。