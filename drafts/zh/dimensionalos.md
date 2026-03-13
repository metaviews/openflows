---
layout: layouts/currency-item.njk
title: "DimensionalOS（维度操作系统）"
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
    relation: "作为 Openflows（开流）所代表的物理世界部署治理回路的奠基性信号"
  - id: inspectable-agent-operations
    relation: "将软件智能体编排原则扩展至物理控制系统中，提升了 Openflows（开流）所关注的治理风险层级"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**流** DimensionalOS（DimOS）是一个开源框架，旨在通过自然语言指挥物理机器人。它通过基于技能的层级，将大语言模型（LLM）智能体连接到传感器数据、导航和执行器控制，该层级建立在 ROS2 之上，具备响应式特性。

**背景** 大多数机器人技术栈将智能与控制视为独立的子系统。DimOS 通过技能架构将二者整合，赋予智能体直接访问机器人能力（如摄像头流、激光雷达、移动）的权限，同时利用响应式流处理（RxPY）管理实时数据流。该框架面向通用机器人，并已在 Unitree Go2 四足机器人上展示了集成能力。

**关联** 对于 Openflows（开流），这是一个具有意义的信号，标志着智能体系统的物理延伸。随着语言模型获得对世界执行器的直接访问权限，原本适用于软件智能体的可检查性与治理问题，在新的维度上变得紧迫——其物理后果是软件回滚无法撤销的。

**当前状态** 活跃的开源开发。框架及机器人特定的集成（dimos-unitree）均在 GitHub 上公开可用。

**开放问题** 当智能体实时控制物理系统时，何种操作员监管模式是适当的？应如何定义技能边界，以在不破坏响应式控制回路的前提下保留人类干预的机会？当智能体机器人系统造成物理伤害或意外行动时，适用何种问责结构？

**连接** 链接到 embodied-ai-governance，作为物理世界 AI 部署治理回路的奠基性流。链接到 inspectable-agent-operations，作为软件智能体编排原则的物理延伸，在此治理风险层级更高。

**译注**
1. **流 (Current)**：此处将 "Signal" 译为 "流"，以契合 Openflows 知识体系中的 "Current" 分类（见词汇表）。在中文语境中，"流" 比 "信号" 更能体现其在生态系统中持续流动、演化的动态属性。
2. **智能体 (Agent)**：选用 "智能体" 而非 "代理"，以强调其自主性与修行般的实践过程，呼应词汇表中 "Practitioner(s) — 修行者" 的深层意涵。
3. **原语 (Primitives)**：在控制理论与计算机科学中，"Primitives" 指最基础的操作单元，译为 "原语" 以区别于 "原始" 或 "基本"，强调其作为构建复杂系统的不可再分基础。
4. **回路 (Circuit)**：虽本条目为 "流" 而非 "回路"，但在 "关联" 与 "连接" 部分提及的 "治理回路" (governance loop) 保留了 "回路" 一词，以体现 Openflows 中闭环与稳定的概念。