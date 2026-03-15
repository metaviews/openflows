---
layout: layouts/currency-item.njk
title: "AutoResearch（自动研究）"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: autoresearch-karpathy
abstract: "安德烈·卡帕西（Andrej Karpathy）构建的最小化自主智能体设置，能够在无人干预的情况下，通过修改、训练及评估代码，运行过夜机器学习实验。"
tags:
  - currency
permalink: /zh/currency/currents/autoresearch-karpathy/
links:
  - id: autonomous-research-accountability
    relation: "是代表问责回路的基础信号"
  - id: andrej-karpathy
    relation: "直接由...运营"
  - id: local-inference-baseline
    relation: "依赖于...所确立的单 GPU 本地计算条件"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
lastReviewed: 2026-03-15
---

**信号 (Signal)**
AutoResearch 展示了一个紧密约束的自主研究回路：智能体编辑单一训练文件，运行固定时长的实验，在一致的指标上进行评估，并反复迭代——在单 GPU 上，夜间约运行 100 次实验。**情境 (Context)** 设计刻意极简。智能体仅修改 train.py，每次运行限制为五分钟墙钟时间，单一指标（验证比特每字节，validation bits-per-byte）提供清晰的比对基线。人类意图（direction）被编码在 program.md 文件中，将人类角色定义为编程研究组织，而非干预单个实验。这是对以先前需团队规模才能实现的自主机器学习实验进行早期且具体的演示。**关联 (Relevance)** 对于 Openflows（开流），此流显现出研究人力资源组织的结构性转变。约束架构——单文件、固定预算、清晰指标——其本身的重要性不亚于自主性。它建模了在委托执行权的同时，如何保留有意义的“人类在环”（human-in-the-loop）框架。**当前状态 (Current State)** 功能性概念验证。极简代码库（约 300 行核心训练代码）。需单 NVIDIA GPU 与 Python 3.10+。早期社区参与。**开放问题 (Open Questions)** 哪些研究任务适合固定预算的自主迭代，哪些需要更流体的人类引导？实验溯源（provenance）与智能体生成的假设应如何记录以确保可复现性？当自动化实验体量超出人类审查容量时，科学判断力会发生什么变化？**连接 (Connections)** 链接至 autonomous-research-accountability 作为其基础流与核心设计参考。链接至 andrej-karpathy 作为该项目的直接运作方。链接至 local-inference-baseline 作为可访问本地计算的下游使用。

**译注**
在此处，“流 (Current)"作为 Openflows 的知识单元，指代流动的势能与信号，而非静态的“流通 (Currency)”。文中提到的“回路 (loop)"被译为“回路”，以呼应 Openflows 术语中“回路 (Circuit)"的闭合性与稳定性（理），尽管此条目类型为 flow。这并非机械对应，而是提示读者：这种自动化的研究循环，本质上是一种正在生成稳定回路的尝试。术语"program.md"保留原文，意指编程行为的代码化，而非单纯的文件。