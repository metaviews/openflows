---
layout: layouts/currency-item.njk
title: "DeepAnalyze：面向自主数据科学的智能体大语言模型 (Agentic LLM)"
lang: zh
date: 2026-04-29
currencyType: "current"
currencyId: deepanalyze
abstract: "中国人民大学 RUC DataLab 与清华大学联合推出的开放权重 (open-weight) 8B 参数智能体模型，面向端到端的自主数据科学工作流——涵盖数据准备、分析、建模、可视化及报告生成。"
tags:
  - currency
permalink: /zh/currency/currents/deepanalyze/
links:
  - id: github:deepanalyze
    relation: "GitHub repository"
mediation:
  tooling: "OpenRouter / qwen/qwen3.6-flash"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 DeepAnalyze · GitHub · 2026 背景
DeepAnalyze 是由中国人民大学（RUC DataLab）与清华大学联合研发的开放权重 (open-weight) 8B 参数智能体 (agent) 模型 (model)，由张少雷、范炬、李国良、杜小勇等研究员领衔。该模型基于全新发布的 DataScience-Instruct-500K 数据集进行训练，该数据集包含 50 万条数据科学指令-响应配对样本。项目自发布以来迅速获得社区关注（截至信号发出时，GitHub 星标数已超 4.1k）。

相关性
DeepAnalyze 代表了智能体 LLM (Agentic LLM) 模式向数据科学垂直领域的针对性深化。与通用编程智能体不同，它被设计为能够自主执行完整的数据科学流水线 (pipeline)——跨异构数据格式（SQL 数据库、CSV、Excel、JSON、XML 及 PDF）完成数据获取、清洗、分析、建模、可视化与自动化报告生成。训练数据（DataScience-Instruct-500K）的公开，也折射出智能体专属微调领域日益壮大的开放数据运动。

当前状态
模型 (Model)：DeepAnalyze-8B，在 HuggingFace 上以开放协议授权发布
能力 (Capabilities)：端到端数据科学自动化、SQL/代码生成、多阶段分析流水线、结果可视化与自然语言报告起草
数据科学 (Data Science)：支持结构化、半结构化及开放式数据源
研究 (Research)：arXiv 论文已发布（2510.16872），含消融实验与基准测试结果
社区 (Community)：开发活跃，拥有 671 个 fork，8 个待合并的 Pull Request

开放问题
DeepAnalyze-8B 在数据科学专属基准测试中，与通用编程智能体（如 Claude Code、AutoDev）相比表现如何？8B 权重的许可限制具体为何？DataScience-Instruct-500K 数据集的质量与偏差特征，与通用指令微调语料库相比有何异同？

关联 (Connections)
[gptme] —— 终端原生自主会话，支持多提供商 LLM 接入
[aider] —— 基于终端的 AI 编程助手，具备仓库上下文感知能力

**译注**
原文 "pipeline" 译为“流水线”，此处取“理”之连贯性，强调数据科学并非离散任务堆叠，而是如水流般贯穿获取、清洗、分析与生成的连续过程。"Agentic LLM" 与 "open-weight" 保留双语对照，以凸显其超越传统工具调用、具备自主规划意图的 agent 特性，以及权重公开对社区可验证性的意义。