---
layout: layouts/currency-item.njk
title: MiroShark
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: miroshark
abstract: 多智能体模拟引擎，从文档生成群体智能，以在本地或通过 API 模拟跨平台公共反应及预测市场。
tags:
  - currency
permalink: /zh/currency/currents/miroshark/

mediation:
  tooling: "OpenRouter / gpt-4o"
  use:
    - "研究综合"
    - "条目起草"
  humanRole: "待审阅"
  limits: "源自公开文档；推广前须核实声明"
---

MiroShark 作为通用群体智能引擎运作，旨在基于输入文档模拟公共话语与市场动态。它摄入新闻稿、政策草案或财务报告等文本输入，实例化数百个具有不同人格的智能体。这些智能体在模拟环境中交互，这些环境代表 Twitter、Reddit 和 Polymarket，随时间追踪信念状态、置信度及信任指标。该系统作为基础设施，用于叙事的压力测试与观察涌现的社会行为，无需实时部署。

技术架构
引擎依赖于基于图的上下文模型。在图构建阶段，实体与关系从源文档中提取并存储于 Neo4j。自然语言提取（NER）采用少样本示例与拒绝规则以过滤噪声。块处理通过批量 Neo4j 写入与 UNWIND 操作并行化，以确保吞吐量。智能体设置将人格锚定于知识图谱。每个实体接收五层上下文：图谱属性、关系、语义搜索结果、相关节点及大语言模型（LLM）驱动的网络研究。系统通过关键词匹配自动区分个人与机构人格。

模拟同时在三个平台上执行，使用 asyncio.gather。Polymarket 上的单个 LLM 生成预测市场利用恒定乘积做市商（CPMM），其非 50/50 的初始定价源自概率估算。智能体维持跨平台可见性；交易员观察社会情绪，而社会智能体对市场价格做出反应。记忆管理采用滑动窗口，旧轮次通过后台 LLM 调用压缩为摘要。信念状态按智能体追踪，记录立场（-1 至 +1）、置信度（0 至 1）及信任（0 至 1）。这些启发式规则根据交互结果每轮更新。一个 ReACT 智能体使用 simulation_feed、market_state、图谱搜索及信念轨迹工具综合分析报告，引用特定智能体行动与市场走势。

链接检查
Neo4j：需要本地实例或托管服务以进行图谱存储与查询。
LLM 提供商：支持本地部署或通过 OpenRouter 进行云 API 调用。
上下文窗口限制适用于智能体记忆与图谱检索。
Polymarket API：需要活跃账户与 API 密钥以创建市场与执行交易。
模拟依赖自动做市商（AMM）定价逻辑。
社交平台：Twitter 与 Reddit 集成需要 API 访问令牌。
速率限制可能影响模拟速度。
Asyncio：需要 Python 3.7+ 环境以进行并发执行。

**译注**
1.  **Agent（智能体）**：此处译为“智能体”而非“代理”，以强调其作为具有自主性的智能实体（Intelligent Entity）的属性，符合 Openflows 语境下对 AI 主体的定位。
2.  **Current（流）**：在 `currencyType` 中译为“流”，对应 Zhuangzi 哲学中的流动与变化之意，区别于静态的“当前”。
3.  **Linkage Check（链接检查）**：译为“链接检查”，保留技术语境，指代系统各组件间的依赖关系验证。