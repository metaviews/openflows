---
layout: layouts/currency-item.njk
title: "Viam"
lang: zh
date: 2026-02-15
currencyType: "current"
currencyId: viam
abstract: "Viam 将机器人集成、数据、AI 与机队运营整合于单一软件层，发出更强信号：物理系统的控制权正转向软件原生架构。"
tags:
  - currency
permalink: /zh/currency/currents/viam/
links:
  - id: local-inference-baseline
    relation: "将文本系统中的本地智能实践扩展为联网机器操作"
  - id: embodied-ai-governance
    relation: "为此贡献机器人软件基础设施与机队运营模式"
mediation:
  tooling: "OpenRouter 推理层 / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 Viam 自身定位为机器人技术与 AI 的全栈软件平台，核心聚焦于硬件集成、数据/机器学习工作流与机队管理。

**背景** 该平台强调从原型（prototype）到生产（production）的单一工作流，通过 SDK 实现跨编程语言的控制，并采用硬件和软件资源的模块化注册表模型。公共定位突出 "200+ 组件" 与 "1,000 模块"，以此作为兼容性（compatibility）与可扩展性（extensibility）的信号。一个具体的商业里程碑于 2025 年 3 月 3 日宣布：Viam 完成 3,000 万美元 C 轮融资。

**相关性** 对于 Openflows（开流），Viam 代表了基础设施的收敛：机器人控制、遥测（telemetry）和模型运营（model operations）被视为一个连续的软件表面，而非分离的层级（stacks）。

**当前状态** 这是一个活跃的商业平台，企业部署态势正在增长。

**开放问题** 随着企业功能与管理工作流的深化，该堆栈（stack）的开放性将保持何种程度？哪些操作控制权能在云端连接与边缘受限的部署中具有持久性？围绕注册表模块、API 与机队工具的多年度锁定（lock-in）特征如何？

**连接** 与 `local-inference-baseline` 链接，作为本地智能基础设施的物理系统延伸。与 `embodied-ai-governance` 链接，作为可观测与可管理的机器人机队运营的关键基础设施贡献者。

**译注**
- **开流 (Openflows)**：此处保留品牌词，括号内注“开流”，呼应《庄子》“鹏”之寓言，亦双关“开源”与“开放流动”之意。
- **Current**: 本条目类型为 `current`。在 Openflows 语境中，`Currency` 为流通层（层级的、持续性的），`Current` 为流（流动的、信号性的）。故此处正文不将 `current` 译为“货币”或“流通”，而保留“当前状态”之实指，概念上取其“流”的动势。
- **软件原生 (software-native)**：译文中保留原文，因其在机器人领域特指“控制逻辑内生于代码与协议，而非物理层外挂的传统”，是区别于传统自动化堆栈（separate stacks）的关键所在。
- **机队 (Fleet)**：工业与机器人领域常译作“机队”而非“舰队”，此处指代由多单元组成的机器人集群运营。