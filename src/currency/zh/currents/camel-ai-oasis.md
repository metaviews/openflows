---
layout: layouts/currency-item.njk
title: "OASIS: 开放智能体社交互动模拟 (Open Agent Social Interaction Simulations)"
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: camel-ai-oasis
abstract: "OASIS 是一个可扩展的开源框架，用于模拟社交媒体动态，能够支撑多达一百万个 LLM 智能体（Agent）。它使得在数字环境中研究信息传播、极化及群体行为成为可能。"
tags:
  - currency
permalink: /zh/currency/currents/camel-ai-oasis/

mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

OASIS（开放智能体社交互动模拟）作为大规模社会技术（sociotechnical）研究的基础设施。由 CAMEL-AI 开发，它提供了一个基于 Python 的环境，用于在模拟社交网络拓扑（topologies）中实例化并交互多达一百万个 LLM 驱动的智能体（Agent）。该系统抽象了来自 Twitter 和 Reddit 等服务的平台机制（mechanics），允许观察涌现现象（emergent phenomena），如群体极化（group polarization）和信息级联（information cascades），而无需面对实时生产环境（live production environments）的波动性。

### 技术架构（Technical Architecture）

该框架依赖于 camel-oasis PyPI 包。它支持包含 23 种不同行为的定义动作空间（action space），包括内容创作、评论、关注和搜索操作。推荐逻辑（Recommendation logic）集成用于模拟基于兴趣（interest-based）和热度评分（hot-score）算法的内容发现。智能体（Agent）通过从 JSON 数据集加载的配置配置文件进行实例化，支持异构智能体群体。系统利用 asyncio 进行并发智能体执行，优化高规模模拟期间的资源利用。

### 链接检查（Linkage Check）

仓库：https://github.com/camel-ai/oasis
文档：https://www.camel-ai.org/
论文：https://arxiv.org/abs/2411.11581
数据集：https://huggingface.co/datasets/echo-yiyiyi/oasis-dataset
社区：https://discord.gg/camel-ai

### 治理与伦理（Governance & Ethics）

作为模拟工具，OASIS 降低了研究 AI 驱动社会动态的门槛。然而，大规模复制人类行为引入了关于生成合成宣传或操纵模式的风险。用户必须在部署到公开研究环境之前，根据伦理指南验证智能体（Agent）行为。数据集和模型（Model）应被视为特定架构配置的人工制品，而非人类行为的基准（Ground truth）。

**译注**
在本语境中，“智能体（Agent）”不仅指代自动化程序，更隐含了 Openflows 中“修行者”的意涵——即参与生态流动的能动者。此外，“事实基准（Ground truth）”的否定，提示我们模拟结果并非社会现实的绝对映射，而是特定架构下的流变。