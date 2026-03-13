---
layout: layouts/currency-item.njk
title: RynnBrain
lang: zh
date: 2026-02-15
currencyType: "current"
currencyId: rynnbrain
abstract: 阿里巴巴达摩院（Alibaba DAMO Academy）开源具身基础模型家族，标志着从多模态感知通往具身机器人规划的一条更坚实的开源路径。
tags:
  - currency
permalink: /zh/currency/currents/rynnbrain/
links:
  - id: local-inference-baseline
    relation: "从本地语言推理扩展至具身物理世界推理的基线"
  - id: embodied-ai-governance
    relation: "为具身 AI 治理贡献开源具身基础模型能力"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号 (Signal)** RynnBrain 推出了一套面向物理世界理解、定位、推理与任务规划的开源具身基础模型家族。

**背景 (Context)** 公开发布包含稠密与混合专家（MoE）变体（2B, 8B, 30B-A3B），以及针对规划（RynnBrain-Plan）、导航（RynnBrain-Nav）和空间推理（RynnBrain-CoP）的专用衍生版本。官方 GitHub 发布日志标记代码与检查点于 2026 年 2 月 9 日，技术报告于 2026 年 2 月 15 日。

**关联 (Relevance)** 对于 Openflows（开流），这是一次从纯语言模型效用向具身认知回路的转变。重心从文本解读移至真实环境中的情境行动规划。

**当前状态 (Current State)** 新近发布，正迅速形成开源机器人基础栈。

**开放问题 (Open Questions)** 基准性能有多少能转化为不受控物理环境中可靠、低摩擦的部署？与下游 VLA 策略集成时，哪些规划抽象仍然可被检视？本地与边缘部署的现实运行配置（算力、延迟、内存）为何？

**连接 (Connections)** 链接至 local-inference-baseline，作为从本地推理向具身执行的下游扩展。链接至 embodied-ai-governance，作为面向物理世界感知与规划的开源基础模型栈。

**译注**
- **具身 (Embodied)**：不同于单纯的“物理世界 (physical-world)"，具身强调智能体与环境的物理交互与感知闭环，是 Openflows 中“流 (liú)"在物理层面的体现。
- **回路 (Circuit)**：在“具身认知回路”中，使用“回路 (huí lù)"而非“循环 (loop)"，意在强调 Openflows 中“回路”作为已闭合且稳定的模式，呼应 Zhuangzi 中“理 (lǐ)"的内在逻辑。
- **Openflows（开流）**：保留品牌名 "Openflows"，括号内“开流”取其“开启流动”之意，对应“流通 (liú tōng)"与“流 (liú)"的双重语义。