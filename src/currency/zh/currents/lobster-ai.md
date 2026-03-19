---
layout: layouts/currency-item.njk
title: "LobsterAI（龙虾智能体）"
lang: zh
date: 2026-03-18
currencyType: "current"
currencyId: lobster-ai
abstract: "网易有道 (NetEase Youdao) 的 LobsterAI 提供了一个开源智能体框架，用于持久化的自主工作流和 24/7 任务执行环境。"
tags:
  - currency
permalink: /zh/currency/currents/lobster-ai/
links:
  - id: openclaw
    relation: "与强调可检查性和配置的开源智能体框架定位共享"
  - id: crewai
    relation: "解决类似的多智能体编排需求，但侧重于持久化劳动力而非任务管道"
  - id: chinese-open-source-llm-landscape-2026
    relation: "为中国开源生态系统内的主权部署路径和竞争基准做出贡献"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：opensourceprojects.dev (2026-03-15)。描述将 LobsterAI 识别为专为 24/7 自主 AI 劳动力设计的开源引擎。核心价值主张是持久化、长运行的智能体会话，能够处理工作流、系统监控和项目管理，而无需持续的人工会话启动。仓库托管于 github.com/netease-youdao/LobsterAI。

背景：LobsterAI 源自网易有道 (NetEase Youdao)，一家知名的中国科技公司，以搜索、翻译和教育工具闻名。此条目符合中国组织建立独立层级的开放权重模型基础设施的更广泛趋势，该基础设施与西方发展并行运行。虽然许多框架专注于单轮交互或短生命周期会话，但 LobsterAI 将持久性作为核心架构约束。

相关性：持久化智能体执行代表了从基于工具的辅助向基于基础设施的劳动力管理的转变。这种能力通过将模型交互规范化为连续后台进程而非离散 API 调用，支持了本地推理基线回路 (local-inference-baseline circuit)。它还与自主研究问责回路 (autonomous-research-accountability) 交叉，使得无需人工监督的长期实验周期成为可能。

当前状态：该项目已作为开源仓库可用。关于状态持久化、周期间的内存管理以及安全隔离的实现细节在初始信号中未完全详述。开发状态表明处于积极维护中，鉴于其专注于“劳动力”管理而非实验性概念验证。

开放问题：使用何种机制在长运行会话中维护状态而不会耗尽资源？该框架如何处理安全隔离，与胶囊 (capsule) 或无菌 (hermetic) 执行环境相比？是否存在用于防止失控自主性的智能体行为正式治理层？持久化模型与 memu 或 bettafish 记忆框架相比如何？

连接：
- openclaw：与强调可检查性和配置的开源智能体框架定位共享。
- crewai：解决类似的多智能体编排需求，但侧重于持久化劳动力而非任务管道。
- chinese-open-source-llm-landscape-2026：为中国开源生态系统内的主权部署路径和竞争基准做出贡献。

**译注**
- 智能体 (Agent)：此处采用“智能体”而非“代理”，以强调其自主性与能动性，符合 Openflows 对 AI 实体的定义。
- 回路 (Circuit)：对应英文 "Circuit"，指代在生态系统中完成并稳定化的模式或路径。
- 流通 (Currency) / 流 (Current)：本条目类型为 "current"，指代流动的信号或状态。在中文语境中，“流”更强调动态过程，而“流通” (Currency) 强调价值或资源的循环。此处保留“当前状态”以指代项目现状。
- 开放权重 (Open weights)：指模型参数公开，不同于“开源” (Open source) 代码。此处用于描述中国组织建立的基础设施属性。
- 龙虾 (Lobster)：作为项目名称保留英文，中文译名“龙虾”仅作辅助理解，不直接音译。
- 胶囊 (Capsule) / 斗鱼 (Bettafish)：此处保留英文原名，因其在特定技术语境下指代特定的内存或执行环境框架，中文译名可能引起歧义。