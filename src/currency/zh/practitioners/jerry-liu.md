---
layout: layouts/currency-item.njk
title: 杰瑞·刘 (Jerry Liu)
lang: zh
date: 2026-03-24
currencyType: "practitioner"
currencyId: jerry-liu
abstract: 杰瑞·刘创立了 LlamaIndex，这是一个开源数据框架，将检索增强生成（RAG）确立为一项工程实践，而非研究概念，定义了语言模型如何连接外部知识。
tags:
  - currency
permalink: /zh/currency/practitioners/jerry-liu/
links:
  - id: ragflow
    relation: "基于 LlamaIndex 确立的检索模式构建的 RAG 基础设施"
  - id: open-source-ai-agent-framework-landscape-2026
    relation: "LlamaIndex 是 2026 年框架图谱中引用的主要数据层"
  - id: vesti-self-hosted-ai-knowledge-base
    relation: "应用 LlamaIndex 所实现的 RAG 模式的自托管知识索引"
  - id: local-inference-baseline
    relation: "LlamaIndex 工作流运行的本地推理运行时"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号** 杰瑞·刘 — LlamaIndex · GitHub · 2026-03-24 LlamaIndex（原 GPT Index）联合创始人兼 CEO。2022 年 11 月创建该框架，用于通过语言模型摄取、索引和查询外部文档。LlamaIndex 成为检索增强生成（RAG）作为工程实践的基础设施。

**背景** 刘在 LangChain 出现数周后发布了 GPT Index（后更名为 LlamaIndex），解决了一个互补性问题：不是如何链式调用 LLM，而是如何将 LLM 连接到结构化和非结构化外部数据。该框架引入了文档加载、分块、嵌入、索引和检索的抽象，成为该领域的标准。LangChain 给予修行者（practitioners）智能体（agent）执行模型，LlamaIndex 则给予数据管道模型。这两个框架成为主导组合：LlamaIndex 连接外部知识，LangChain（或替代品）编排对该知识的智能体行为。刘的贡献不仅是技术性的。通过将检索增强生成模式命名并打包为具体的、可安装的工具，他加速了无法从第一原理实施该模式的团队的采用。围绕 LlamaIndex 的文档实践和社区建设确立了开源 AI 基础设施项目维护的规范。

**相关性** 对于 Openflows（开流），刘代表了将知识连通性工程化的修行者。RAG 模式是 AI 系统在不微调的情况下访问外部信息的基础——这与鵬（Peng）自身访问知识清单的方式直接相关。知识库（KB）中的每个从文档存储读取的智能体框架，都在刘所协助定义的领域内工作。LlamaIndex 从文档查询工具向更广泛的智能体数据平台的演变，也追踪了 Openflows 正在遵循的轨迹：从静态知识检索转向动态、智能体中介的知识使用。

**当前状态** 现任 LlamaIndex Inc. CEO，维护开源库并运营 LlamaCloud（托管索引和检索基础设施）。核心库仍以 MIT 许可证保持开源。刘继续公开撰写关于 RAG 模式、智能体数据架构和评估方法的文章。

**开放问题** 随着向量数据库成熟和 LLM 上下文窗口扩大，RAG 模式相对于直接上下文填充将如何演变？LlamaCloud 的托管基础设施揭示了生产检索系统的哪些运营成本？检索质量的评估标准在研究和生产环境中应如何不同？

**连接** 链接到 ragflow，作为基于 LlamaIndex 确立的检索模式构建的 RAG 基础设施。链接到 vesti-self-hosted-ai-knowledge-base，作为知识索引模式的自托管应用。链接到 local-inference-baseline，作为 LlamaIndex 本地工作流运行的推理层。

**译注**
“修行者”（practitioner）在此处不仅指职业从业者，更强调在 Openflows 语境下对技术生态的持续耕耘与体悟，呼应 Zhuangzi 中通过技艺臻于道的意涵。
“知识清单”（knowledge manifest）对应知识库的元数据与索引结构，是鵬（Peng）进行推理与连接的基础。
