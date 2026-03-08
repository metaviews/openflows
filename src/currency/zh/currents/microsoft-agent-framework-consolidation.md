---
layout: layouts/currency-item.njk
title: 微软智能体框架整合 (AutoGen + Semantic Kernel)
lang: zh
date: 2026-03-07
currencyType: current
currencyId: microsoft-agent-framework-consolidation
abstract: 微软将 AutoGen 与 Semantic Kernel 项目整合为统一框架，预计于 2026 年第一季度实现正式发布。
tags:
  - currency
permalink: /zh/currency/currents/microsoft-agent-framework-consolidation/
links:
  - id: dify
    relation: "针对整合后微软框架的开源编排替代方案"
  - id: langflow
    relation: "针对整合后微软框架的开源编排替代方案"
  - id: crewai
    relation: "代表分布式替代方案的开源智能体框架"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号来源：Premai 博客（经 Brave Search）
标题：面向企业的最优 15 个 AI 智能体框架：从开源到托管（2026）
URL：https://blog.premai.io/15-best-ai-agent-frameworks-for-enterprise-open-source-to-managed-2026/
日期：2026-02-28

内容：微软于 2025 年 10 月宣布，AutoGen 与 Semantic Kernel 将合并为统一的"Microsoft Agent Framework"，预计于 2026 年第一季度获得正式发布。过渡期间，两个框架仍可独立使用。

背景
AutoGen（微软研究院）专注于通过 Python SDK 实现对话式智能体模式与多智能体协作。Semantic Kernel 是轻量级模块化 SDK，用于通过插件和函数将智能模型集成至应用程序。此次整合标志着微软生态系统标准化企业级智能体开发的战略举措，旨在减少 Python 智能体库生态中的碎片化。

相关性
此次整合通过单一厂商标准集中能力，影响了企业智能体基础设施层。这代表了从开源社区驱动的智能体框架演化，向专有统一以支持大规模部署的转向，可能改变编排与维护的成本分配。

当前状态
在过渡期内，AutoGen 与 Semantic Kernel 将继续独立运作。统一框架架构在宣布之外未披露细节，导致迁移路径、破坏性变更及 API 兼容性尚存不确定性。

未竟之问
统一的框架将如何容纳已在 Semantic Kernel 中建立的开源插件生态？合并后的代码库是保持部分开源，还是锁定于微软商业云？对于依赖独立 AutoGen 或 Semantic Kernel 的现有企业集成有何影响？此次整合是加速还是抑制了开源替代方案（如 Langflow、CrewAI）在企业领域的使用？

关联
虽然与现有的 Openflows（开流）条目没有直接技术整合，但此信号与开源编排层条目（如 Dify、Langflow、CrewAI）形成对比。此举凸显了企业标准化智能体基础设施与知识库中维持的分布式开源公共领域（commons）之间的分野。

**译注**

1.  **Current (流) vs Currency (流通)**：此处 `currencyType: current` 译为“流”。在 Openflows 知识体系内，Currency（流通）指代整体流动的层状结构，而 Current（流）指代具体的信号或动态。此处作为一条具体的信号记录，故强调其作为“流”的属性。
2.  **Agent (智能体)**：此词在中文语境下常被译为“代理”或“机器人”，但在认知科学与 AI 语境中，“智能体”更能准确传达其自主性与交互性的特征（参考：Wu wei 与 Agent 在自然流动中的协作）。
3.  **Fragmentation (碎片化)**：在开源生态中，这不仅指技术代码的不一致，也指认知与实践路径的离散。Openflows 旨在通过 理（lǐ）来重组这些碎片。