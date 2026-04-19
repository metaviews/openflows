---
layout: layouts/currency-item.njk
title: "我能运行什么 (WhatCanIRun)"
lang: zh
date: 2026-04-18
currencyType: "current"
currencyId: whatcanirun
abstract: "一个用于在本地硬件上发现、基准测试和管理开放权重语言模型的 CLI 及 Web 工具。"
tags:
  - currency
permalink: /zh/currency/currents/whatcanirun/
links:
  - id: lm-studio
    relation: "本地模型管理的补充性桌面推理界面"
  - id: ollama
    relation: "用于标准化模型服务的兼容本地推理运行时"
  - id: local-inference-baseline
    relation: "标准化本地推理基础设施回路中的组件"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 whatcanirun · github · 2026-04-18 这是一个单体仓库项目，提供 CLI 工具和 Web 界面，用于为本地硬件执行发现、基准测试和管理开放权重语言模型。仓库包含一个 Next.js Web 应用程序，用于浏览模型兼容性和社区基准测试，以及一个 CLI 实用程序，用于运行标准化基准测试并将结果提交到中央数据库。

**上下文**
本地推理硬件在内存容量、架构（Apple Silicon, NVIDIA, Ascend）和后端支持（llama.cpp, MLX, vLLM）方面差异显著。操作者需要基础设施来将模型需求映射到特定设备能力，以避免部署失败。此工具通过在不同硬件配置上标准化基准数据，解决发现与验证的缺口。

**相关性**
此条目通过提供做出明智部署决策所需的运营数据，支持 local-inference-baseline 回路。它将模型选择从理论规格转向实证硬件性能，减少了本地 AI 基础设施设置的摩擦。工具使操作者能够维护经过验证的模型 - 运行时对的精选库。

**当前状态**
该项目结构为包含 Web 仪表板 ( apps/www ) 和 CLI ( apps/cli ) 的 Bun/Turborepo 单体仓库。CLI 支持基准执行、设备检查和结果提交。Web 应用程序聚合社区基准数据，并允许按设备类型筛选。代码库是开源的，专注于本地推理指标的可复现性。

**开放问题**
基准结果如何在不同的后端实现之间标准化（例如 llama.cpp 与 MLX）？该工具在推荐部署前是否验证模型许可合规性？集成新运行时后端（超出当前支持列表）的流程是什么？系统如何处理改变内存或计算需求的模型更新？

**连接**
lm-studio : 提供本地推理的桌面界面，补充本工具的发现与基准测试重点。
ollama : 作为本条目发现并基准测试的模型的兼容运行时。
local-inference-baseline : 此工具为标准化本地推理基础设施的回路贡献数据和运营模式。

**译注**
1.  **Current (流)**: 此处 `currencyType: "current"` 对应词汇表中的 `Current(s) — 流 (liú)`，指代生态系统中流动的信号。正文中译为“当前状态”以兼顾技术准确性，但隐含了“流态”之意。
2.  **Circuit (回路)**: 词汇表中 `Circuit(s) — 回路 (huí lù)` 强调闭环与稳定。文中 `local-inference-baseline circuit` 译为“本地推理基线回路”，保留了 Zhuangzi 中关于循环与归一的意象。
3.  **Operator (操作者)**: 区别于修行者 (Practitioner)，此处指基础设施的运维人员，故译为“操作者”而非“修行者”，以区分技术角色与修行角色。
4.  **Open weights (开放权重)**: 对应词汇表，强调模型参数的可获取性，不同于开源 (Open source) 代码，此处特指权重文件。