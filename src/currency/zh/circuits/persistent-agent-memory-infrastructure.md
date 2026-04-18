---
layout: layouts/currency-item.njk
title: "持久智能体状态与记忆基础设施"
lang: zh
date: 2026-04-15
currencyType: "circuit"
currencyId: persistent-agent-memory-infrastructure
abstract: "本回路识别出智能体记忆系统汇聚为一种首要的、可查询的基础设施层，区别于瞬态上下文。"
tags:
  - currency
permalink: /zh/currency/circuits/persistent-agent-memory-infrastructure/
links:
  - id: holaos
    relation: "participating current"
  - id: lightmem
    relation: "participating current"
  - id: vesti-self-hosted-ai-knowledge-base
    relation: "participating current"
  - id: memu
    relation: "participating current"
  - id: nornicdb
    relation: "participating current"
  - id: bettafish
    relation: "participating current"
  - id: mirofish
    relation: "participating current"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

本回路始于个体工具之上的一层，这些工具管理智能体状态。它记录了记忆系统汇聚为一种首要的、可查询的基础设施层的图景，区别于瞬态上下文。holaOS 锚定运行时，确保环境跨会话持久。memU 将模型从被动检索转向主动预见。NornicDB 统一图与向量存储，以支持复杂的状态推理。LightMem 确保这些操作保持轻量与高效。VESTI 将交互历史锁定在私有、本地的层中。BettaFish 与 MiroFish 将记忆视为可组合的系统，而非固定功能。它们共同构成了共享的基础设施层。这些条目汇聚于将智能体记忆视为可查询基础设施的必要性。它们解决了智能体跨会话保留状态时的碎片化问题。此模式抵抗自主工作流中无状态模式的失效。它避免了将智能视为瞬时事件而非持续过程的陷阱。回路在此刻闭合：当智能体无需重新初始化其核心上下文或从外部档案重新获取其历史，即可恢复工作时。

**译注**
1.  **回路 (Circuit)**：此处译为“回路”而非“流程”，强调其作为闭合路径的稳定性与回归性，呼应 Zhuangzi 中“复归”的理路。
2.  **智能体 (Agent)**：区别于传统“代理”，强调其作为 AI 实体的自主性与记忆连续性。
3.  **瞬态 (Ephemeral)**：对应“短暂”，在此处特指上下文窗口的临时性，与持久基础设施形成对照。