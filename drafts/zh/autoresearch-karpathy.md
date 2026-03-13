---
layout: layouts/currency-item.njk
title: "AutoResearch（自动研究）"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: autoresearch-karpathy
abstract: "由 Andrej Karpathy 构建的最小化自主智能体设置，在无人干预的情况下运行过夜机器学习实验，通过修改、训练和评估代码。"
tags:
  - currency
permalink: /zh/currency/currents/autoresearch-karpathy/
links:
  - id: autonomous-research-accountability
    relation: "是其所代表的问责回路（accountability loop）的创始信号"
  - id: andrej-karpathy
    relation: "由目标直接操作"
  - id: local-inference-baseline
    relation: "依赖于目标确立的单 GPU 本地计算条件"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
AutoResearch 展示了一个高度受限的自主研究回路：一个智能体编辑单个训练文件，运行固定时长的实验，在一致的指标上进行评估，并迭代——在一块 GPU 上，一夜之间完成约 100 次实验。

### 背景
设计刻意极简。智能体仅修改 `train.py`，每次运行限制为 5 分钟墙钟时间，单一指标（验证比特每字节）提供干净的比较基线。人类方向被编码在 `program.md` 文件中，将人类角色定义为编程研究组织而非单个实验。这是对自主机器学习实验的早期但具体的演示，其规模此前需要团队才能完成。

### 关联
对于 Openflows（开流），此流揭示了研究劳动组织的结构性转变。约束架构——单文件、固定预算、清晰指标——其本身与自主性一样有趣。它建模了如何在执行被委托的同时，保留有意义的“人在回路”框架。

### 当前状态
功能概念验证。最小代码库（核心训练代码约 300 行）。需要单块 NVIDIA GPU 和 Python 3.10+。早期社区参与。

### 开放问题
哪些研究任务适合固定预算的自主迭代，哪些需要更流动的人类指导？实验溯源和智能体生成的假设应如何记录以确保可复现性？当自动化实验的体积超过人类审查能力时，科学判断会发生什么？

### 连接
链接到 autonomous-research-accountability 作为其创始流和主要设计参考。链接到 andrej-karpathy 作为此项目的直接操作者。链接到 local-inference-baseline 作为对可访问本地计算的下游使用。

**译注**
1. **Current（流）与 Currency（流通）**：本条目类型为 `current`，对应词汇表中的“流”，指代生态系统中流动的具体信号；“Currency”（流通）则指代更宏观的流通层。
2. **Loop（回路）**：文中“research loop”译为“回路”，对应词汇表中的“Circuit”，强调闭环与稳定模式，而非单纯的循环。
3. **Agent（智能体）**：译为“智能体”，保留技术语境下的“Agent”概念，强调其自主性与“修行者”在人类实践层面的区别。
4. **Openflows（开流）**：首次出现时保留英文并加注，以维持品牌识别与语义的清晰。