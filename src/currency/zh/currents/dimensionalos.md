---
layout: layouts/currency-item.njk
title: "维度操作系统 (DimensionalOS)"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: dimensionalos
abstract: "一个开源智能体机器人框架，通过基于技能的 ROS2 架构，将大语言模型智能体直接连接到机器人控制原语。"
tags:
  - currency
permalink: /zh/currency/currents/dimensionalos/
links:
  - id: embodied-ai-governance
    relation: "is a founding signal for the physical-world deployment governance loop represented by"
  - id: inspectable-agent-operations
    relation: "extends software agent orchestration principles into physical control systems, raising the stakes addressed by"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号**：DimensionalOS（DimOS）是一个开源框架，旨在通过自然语言命令物理机器人。它通过构建在 ROS2 之上的响应式、基于技能的层（Skills-based layer），将大语言模型（LLM）智能体与传感器数据、导航和执行器控制相连接。

**背景**：大多数机器人软件栈将智能（intelligence）与控制（control）视为独立的子系统。DimOS 通过技能架构（skill architecture）将二者整合，赋予智能体对机器人能力的直接访问权——包括相机流、激光雷达、移动性等——同时利用响应式流处理（RxPY）管理实时数据流。该框架面向全能型机器人，并已在 Unitree Go2 四足机器人上展示了集成成果。

**意义**：对 Openflows（开流）而言，这是在智能体系统的物理延伸中的一个有意义的流（current）信号。随着语言模型获得对物理世界中致动器的直接访问权，适用于软件智能体的可检视性（inspectability）与治理（governance）问题，正以新的紧迫感变得突出——其带来的物理后果是软件回滚（rollback）无法逆转的。

**当前状态**：处于活跃的开源开发中。框架本身及机器人特定集成（dimos-unitree）均可在 GitHub 上公共获取。

**核心问题**：当智能体实时控制物理系统时，何种 Operator（操作者）监督模式是合适的？应如何定义技能边界，才能在破坏响应式控制回路的同时，保留人为干预的窗口？当智能体机器人系统造成物理伤害或意外动作时，何种问责结构适用？

**连接**：与 embodied-ai-governance 关联，作为物理世界 AI 部署治理回路的创始信号（founding signal）。与 inspectable-agent-operations 关联，作为软件智能体编排原则的物理延伸，其中治理的 stakes（ stakes/stakes）更高。

**译注**：
在 Openflows（开流）的术语体系中，此处“流（current）”指单一信号（Signal），区别于“回路（circuit/回路）”指代闭合、已稳定的模式。翻译中保留“回路”一词以对应 governance loop，强调其闭环治理的完整性。Agent 译为“智能体”，既对应 AI Agent，也隐含修行者的主体性，呼应 Openflows 对“实践（Practitioner/修行者）”的强调。