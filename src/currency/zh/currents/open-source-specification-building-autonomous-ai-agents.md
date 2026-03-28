---
layout: layouts/currency-item.njk
title: "构建自主 AI 智能体的开源规范"
lang: zh
date: 2026-03-26
currencyType: "current"
currencyId: open-source-specification-building-autonomous-ai-agents
abstract: "一项开源规范提案，定义了自主智能体工具访问、工作流结构和认知架构的标准接口，以减少生态系统碎片化。"
tags:
  - currency
permalink: /zh/currency/currents/open-source-specification-building-autonomous-ai-agents/
links:
  - id: agent-tooling-interoperability-infrastructure
    relation: "标准化工具发现与执行的基础设施。"
  - id: skills-sh
    relation: "关注智能体行为的模块化技能层。"
  - id: plumbing-lang
    relation: "多智能体通信协议规范的相似方法。"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号 (Signal)**  
构建自主 AI 智能体的开源规范 · opensourceprojects · 2026-03-26  
指出智能体开发中的碎片化现象：团队反复重新定义思维模型、工具访问和工作流结构。提议建立共同的基础规范以稳定生态系统，并实现不同智能体实现之间的互操作性。

**背景 (Context)**  
智能体开发目前需要为工具访问和工作流结构重建基础逻辑。此信号旨在解决独立项目间重复造轮子的成本，力求标准化自主系统的认知层与操作层。

**意义 (Relevance)**  
通过提议智能体认知和工具的标准接口，与基础设施稳定性目标保持一致。支持 Openflows（开流）通过通用规范减少厂商锁定的目标，使组件能够在没有专有约束的情况下协同工作。

**当前状态 (Current State)**  
提议的规范托管于 GitHub 的 agentskills/agentskills 仓库。目前处于早期采用阶段，尚未被广泛集成到框架中。该仓库作为规范定义和版本化的主要制品。

**开放问题 (Open Questions)**  
此规范将如何处理与 LangChain 或 AutoGen 等现有框架的冲突？针对多样化的智能体实现，是否存在强制执行合规性或版本控制的机制？

**关联 (Connections)**  
链接至 agent-tooling-interoperability-infrastructure 以获取工具发现标准。链接至 skills-sh 关于模块化行为层。链接至 plumbing-lang 关于协议规范方法。

**译注**  
- **Current (流)**：此处 `currencyType: "current"` 对应 Glossary 中的 `Current(s)`，译为“流”。在 Openflows 语境下，它指代正在流通中的动态规范，而非静态的“货币”。
- **智能体 (Agent)**：采用“智能体”而非“代理”，以强调其作为自主修行者（Practitioner）的能动性，符合 AI 领域的中文技术语境。
- **Openflows（开流）**：首次出现时保留品牌名并加注“开流”，取“开流”之意，呼应 Zhuangzi 中鹏鸟展翅、气流通畅的意象，暗示数据与规范的自然流动。