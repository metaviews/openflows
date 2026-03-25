---
layout: layouts/currency-item.njk
title: "哈里森·切斯 (Harrison Chase)"
lang: zh
date: 2026-03-24
currencyType: "practitioner"
currencyId: harrison-chase
abstract: "哈里森·切斯与 LangChain 的开源框架共同创立，该框架首次使大语言模型链式调用与工具使用得以规模化普及，孕育了如今支撑大多数智能体 AI 开发的架构模式。"
tags:
  - currency
permalink: /zh/currency/practitioners/harrison-chase/
links:
  - id: open-source-ai-agent-framework-landscape-2026
    relation: "LangChain 是衡量 2026 年智能体框架格局的参照点"
  - id: deerflow
    relation: "基于 LangGraph 构建，是 Chase 继任的基于图形的智能体编排框架"
  - id: openclaw
    relation: "从 LangChain 发起的同一浪潮中涌现的智能体框架"
  - id: artificial-organisations
    relation: "LangChain 架构使其得以表达的多智能体组织模式"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 哈里森·切斯 — LangChain · GitHub · 2026-03-24 LangChain 联合创始人兼首席执行官。2022 年 10 月，他创建了 LangChain Python 库，成为首个被广泛采用的框架，用于将语言模型调用与工具、记忆和智能体（agents）串联。随后，他开发了 LangGraph，用于有状态、基于图形的智能体编排。

**背景**
切斯发布 LangChain 之时，修行者们尚无连接大语言模型（LLM）与工具及数据的共享词汇或基础设施。该框架引入了抽象概念——链（chains）、智能体（agents）、工具（tools）、记忆（memory）——这些成为了智能体 AI 开发的标准心智模型。当竞争框架出现时，LangChain 已确立了这一类别。发布两年内，其 GitHub 仓库积累了超过 9 万颗星。后续框架 LangGraph 将模型从线性链重定向为有向图，实现了持久化状态和循环工作流。这一转变预示了该领域正在前进的架构方向：智能体能够循环、反思和分支，而非执行一次即终止。

**意义**
对于 Openflows（开流），切斯代表了命名这一问题的修行者。贯穿知识库（KB）乃至更广泛生态系统的“链”、“智能体”和“工具”语言，很大程度上源自 LangChain 的 API 设计。无论一个框架是构建于 LangChain 之上、与其集成，还是明确与之对立，切斯的工作都设定了坐标。他遗产中的张力同样具有启示性：LangChain 因复杂性和抽象开销受到批评，一代“反 LangChain"框架（更轻量、更低层、更明确）随之出现，部分是对此的回应。该领域当前对最小化编排的偏好，部分是对他确立模式的修正。

**当前状态**
目前担任 LangChain Inc. 首席执行官，该公司维护开源库，并运营 LangSmith（可观测性）和 LangGraph Cloud（托管图执行）。该公司已筹集大量风险投资，但核心库仍遵循 MIT 许可保持开源。

**待解之问**
随着最小抽象框架获得青睐，LangChain 架构是继续作为参考点，还是成为警示案例？LangGraph 的图模型与新兴的长周期智能体任务替代方案相比如何？LangSmith 可观测性模型揭示了关于生产环境智能体失败模式的哪些信息？

**关联**
链接至 open-source-ai-agent-framework-landscape-2026，作为衡量 2026 代框架的标准。链接至 deerflow，一个基于 LangGraph 构建的项目。链接至 artificial-organisations，LangChain 架构使多智能体协调模式得以表达。

**译注**
- **修行者 (Practitioner)**: 此处选用“修行者”而非“从业者”，意在强调技术实践不仅是职业行为，更是对系统之“理”（lǐ）的体悟与操演，呼应 Zhuangzi 中庖丁解牛般的技艺境界。
- **Openflows（开流）**: 品牌名保留英文，括号内“开流”对应“Open flows”，既指开源流动，亦暗合“流通”（Currency）之意，喻示知识在生态中的循环。
- **理 (Li)**: 虽未在正文显式翻译，但贯穿全文对架构“模式”与“心智模型”的探讨，皆指向事物内在之理，即技术演进的必然脉络。