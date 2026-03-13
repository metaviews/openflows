---
layout: layouts/currency-item.njk
title: "微软智能体框架整合（AutoGen + Semantic Kernel）"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: microsoft-agent-framework-consolidation
abstract: "微软将 AutoGen 与 Semantic Kernel 项目整合为统一框架，目标于 2026 年第一季度实现通用发布（GA）。"
tags:
  - currency
permalink: /zh/currency/currents/microsoft-agent-framework-consolidation/
links:
  - id: dify
    relation: "开源编排替代方案，对应整合后的微软框架"
  - id: langflow
    relation: "开源编排替代方案，对应整合后的微软框架"
  - id: crewai
    relation: "分布式智能体框架，代表微软整合的分布式替代方案"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：Premai 博客（经 Brave Search 检索）
标题：2026 年企业最佳 AI 智能体框架：从开源到托管
链接：https://blog.premai.io/15-best-ai-agent-frameworks-for-enterprise-open-source-to-managed-2026/
日期：2026-02-28
内容：微软于 2025 年 10 月宣布，AutoGen 与 Semantic Kernel 将合并为统一的"Microsoft Agent Framework"，预计于 2026 年第一季度实现通用发布（GA）。过渡期间，两个框架仍可独立使用。

语境
AutoGen（微软研究院）侧重于通过 Python SDK 实现对话智能体模式及多智能体协作。Semantic Kernel 则是轻量级模块化 SDK，通过插件和函数将 AI 模型集成至应用。此次整合标志着微软向标准化企业智能体开发的战略转向，旨在减少基于 Python 的智能体库生态中的碎片化。

相关性
此整合通过单一厂商标准集中能力，影响企业智能体基础设施层。它代表了从开源、社区驱动框架演进向专有统一的大规模部署转变，可能改变编排与维护的成本结构。

当前状态
过渡期间，AutoGen 与 Semantic Kernel 继续独立运行。除公告外，统一框架架构尚未详述，导致迁移路径、破坏性变更及 API 兼容性存在不确定性。

开放性问题
统一框架将如何处理 Semantic Kernel 已建立的开源插件生态？合并后的代码库是保持部分开源还是锁定于微软商业云？对现有使用独立 AutoGen 或 Semantic Kernel 的企业集成有何影响？此整合是加速还是抑制了开源替代方案（如 Langflow, CrewAI）在企业领域的采用？

连接
虽与现有 Openflows（开流）条目无直接技术集成，但此信号与开源编排层条目（如 Dify, Langflow, CrewAI）形成对比。此举凸显了企业标准化智能体基础设施与知识库中维护的分布式开源公地之间的分歧。

**译注**
- **Openflows（开流）**: 品牌名保留英文，括号内注其意“开流”，呼应 Zhuangzi 中鹏鸟乘风而起的意象，暗示数据与智能的流动。
- **Current (流)**: 本条目类型为 `current`，在 Openflows 语境中对应“流”（liú），指代生态系统中正在运动的信号，区别于已闭合稳定的“回路”（Circuit）。
- **智能体 (Agent)**: 此处译为“智能体”而非“代理”，以强调其作为独立行动者的主体性，与“修行者”（Practitioner）的修炼意涵有所区分。
- **开源 (Open source)**: 强调其作为公共领域资源的属性，与“专有统一”形成张力，体现技术生态中的理（lǐ）与势。