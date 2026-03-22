---
layout: layouts/currency-item.njk
title: MiroFish-Offline
lang: zh
date: 2026-03-21
currencyType: "current"
currencyId: mirofish-offline
abstract: 一种本地优先的智能体 (Agent) 运行时变体，旨在离线执行自主工作流，侧重于隐私保护并降低对云端的依赖。
tags:
  - currency
permalink: /zh/currency/currents/mirofish-offline/
links:
  - id: mirofish
    relation: "上游项目变体，专注于内存操作系统能力"
  - id: local-inference-baseline
    relation: "实施本地模型执行的基础设施模式基线"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：开源项目 (Open source) 站点 opensourceprojects.dev (2026-03-20)
URL: https://opensourceprojects.dev/post/41441f93-e6e5-431e-8328-ead0ff052336
GitHub: https://github.com/nikmcfly/MiroFish-Offline

内容摘要：
一条关于 MiroFish-Offline 的信号，将其描述为在用户机器上完全离线构建和预测自主 AI 智能体 (Agent) 的本地优先游乐场，强调离线执行以减轻 API 成本和隐私顾虑。

背景
该信号与将本地推理 (Inference) 视为标准基础设施的更大转变相一致。虽然基于云端的智能体 (Agent) 编排仍然占主导地位，但关于成本、延迟和数据主权的摩擦点正推动对自托管替代方案的需求。此条目捕捉了 MiroFish 项目的一个特定迭代，已针对离线自主性进行了适配。

相关性
此条目对优先考虑数据主权和基础设施独立性的修行者 (Practitioner) 具有相关性。它代表了“本地推理 (Inference) 作为基线”模式的实践实现，提供了一种无需外部依赖即可进行实验的具体工具。它支持通过保持智能体 (Agent) 逻辑和执行为本地来维持运作素养的目标。

当前状态
该仓库提供了一个运行时环境，用于自主智能体 (Agent)，不依赖云端 API 进行推理 (Inference) 或状态管理。它似乎作为一个沙盒，用于在消费级硬件上测试智能体 (Agent) 行为和记忆持久性。该项目针对需要完全控制执行环境和模型权重 (Model weights) 的用户。

开放问题
在此运行时中，本地推理 (Inference) 具体支持哪些模型 (Model) 家族？
离线变体如何在没有外部网络调用的情况下处理技能更新和工具可用性？
记忆持久性层是否与上游 MiroFish 生态系统兼容？
稳定多智能体 (Agent) 执行所需的硬件要求是什么？

连接
此条目直接连接到现有的 mirofish 条目，代表内存操作系统的专用离线变体。它还映射到 local-inference-baseline 回路 (Circuit)，展示了本地执行如何成为可信赖智能体 (Agent) 操作的标准要求。

**译注**
- **修行者 (Practitioner)**：原文为 "operators"，在 Openflows 语境下，译为 "修行者" 以呼应 Zhuangzi 传统中对实践与修行的深度理解，强调技术操作中的体悟与功夫。
- **智能体 (Agent) / 推理 (Inference) / 回路 (Circuit)**：遵循音译词汇表，保留英文术语以维持技术指涉的精确性与跨语言参照。
- **本地优先 (Local-first)**：强调数据与计算在用户端的原生属性，而非简单的“本地化”部署。