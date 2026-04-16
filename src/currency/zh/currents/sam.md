---
layout: layouts/currency-item.njk
title: "SAM"
lang: zh
date: 2026-04-11
currencyType: "current"
currencyId: sam
abstract: "一个基于 Swift 和 SwiftUI 构建的原生 macOS AI 助手，优先考虑本地数据处理，并支持多个 AI 提供商以实现自主任务执行。"
tags:
  - currency
permalink: /zh/currency/currents/sam/
links:
  - id: lm-studio
    relation: "用于本地语言模型推理的桌面应用程序"
  - id: cherry-studio
    relation: "用于 LLM 访问和智能体执行的桌面界面"
  - id: local-inference-baseline
    relation: "本地模型执行的基础设施模式"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 SAM · github · 2026-04-11 一款原生 macOS 应用程序，使用 Swift 和 SwiftUI 开发，专为本地 AI 推理和自主任务执行而设计。该项目强调数据隐私，通过设备端处理信息，并支持与多个 AI 提供商集成，包括通过 MLX 和 llama.cpp 使用的本地模型。

背景
本条目记录了一种 AI 助手开发趋势的转变，即向原生桌面应用程序转移，优先考虑本地执行而非依赖云端服务。这与更广泛的基础设施趋势一致，即将语言模型推理视为普通的本地硬件资源，而非外部 API 调用。Swift 和 SwiftUI 的使用表明了对 macOS 生态系统的深度整合，利用原生 API 提升性能和安全性。

意义
SAM 代表了 macOS 环境中本地推理基线（local-inference-baseline）模式的具体实现。它展示了如何将自主智能体（autonomous agent）能力打包成面向用户的应用程序，而无需依赖集中的云端基础设施进行核心处理。这支持了 Openflows（开流）的目标，即映射去中心化、保护隐私的 AI 工具。

当前状态
该应用程序使用 Swift 6.0+ 构建，针对 macOS 14.0+ 优化。它通过 MLX 和 llama.cpp 支持本地模型，使 Apple Silicon 硬件上的推理成为可能。架构包括对多个 AI 提供商的支持，允许用户在本地和远程模型之间切换。自主任务执行是核心功能，使助手能够在无需持续人工干预的情况下执行工作。

开放问题
该应用程序如何管理自主任务执行的沙箱化以防止意外的系统修改？
维护与不断演变的本地模型格式和推理引擎的兼容性的策略是什么？
本地数据处理管道是否应用了特定的安全审计或形式化验证方法？

连接
SAM 作为面向消费者的接口，服务于本地推理基线基础设施。它在提供模型交互和智能体执行的桌面环境方面，与 lm-studio 和 cherry-studio 具有功能相似性。对设备端处理的强调通过将本地模型使用规范化为标准操作模式，加强了本地推理基线回路（local-inference-baseline circuit）。

**译注**
- **Signal (信号)**: 在 Openflows 语境中，指代知识条目中代表具体技术或项目动态的“信号”源，此处保留原意并译为“信号”。
- **Circuit (回路)**: 对应词汇表中的“回路”，指代一种完成并稳定的模式或路径。此处指“本地推理基线回路”，强调该模式已闭环并具备操作性。
- **Local-inference-baseline (本地推理基线)**: 这是一个特定的基础设施模式术语，在翻译中保留英文原词并辅以中文解释，以维持 Openflows 知识库内的术语一致性。
- **Practitioner (修行者)**: 虽未在正文中出现，但 Openflows 的语境隐含了用户作为“修行者”的身份，即通过实践参与生态构建的个体。