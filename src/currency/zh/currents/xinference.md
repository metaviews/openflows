---
layout: layouts/currency-item.njk
title: "新推理 (Xinference)"
lang: zh
date: 2026-03-14
currencyType: "current"
currencyId: xinference
abstract: "Xinference 提供统一的、生产就绪的推理 (inference) API，用于在云端、本地部署及本地硬件环境中部署开源语言、语音及多模态模型。"
tags:
  - currency
permalink: /zh/currency/currents/xinference/
links:
  - id: local-inference-baseline
    relation: "本地推理基线：作为普通基础设施对待的本地推理层"
  - id: ollama
    relation: "具有重叠部署目标的替代本地推理运行时"
  - id: langflow
    relation: "用于可视化智能体流程编排的推理后端"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：GitHub  
标题：inference  
链接：https://github.com/xorbitsai/inference  
日期：2026-03-14  

内容：仅通过更改一行代码，即可将 GPT 替换为任意 LLM。Xinference 让你能在云端、本地部署或笔记本电脑上运行开源 (open source)、语音及多模态模型——全部通过统一的、生产就绪的推理 API。

语境：模型服务基础设施正分散于专用的运行时（vLLM, TGI, Ollama）及云提供商之间。Xinference 将这些整合为单一的 Python 库和 API，支持多样的后端（llama.cpp, vLLM, PyTorch）和模态（文本、语音、视觉），在一个部署表面内。它解决了切换推理引擎时的摩擦，同时保持与开放权重 (open weights) 生态系统的兼容性。

相关性：减少需要多模型支持团队的运维开销，无需管理分散的服务。使不同模型 (model) 家族间能有一致的 API 契约（兼容 OpenAI），促进依赖模型切换或回退机制的智能体 (agent) 工作流。支持本地优先的部署策略，与运营素养基线保持一致。

当前状态：活跃开源开发，具备生产就绪的 API 稳定性。支持通过 Docker、pip 或 Kubernetes 部署。由 Xorbits 生态系统支持，并有社区贡献。集成常见模型仓库（Hugging Face）和量化格式（GGUF, AWQ）。

开放问题：与 vLLM 等专用运行时相比，高性能生产工作负载的性能如何？鉴于对上游模型库的依赖，长期维护承诺是什么？统一的 API 抽象是否会在调试模型特定行为时引入延迟或复杂性？

连接：Xinference 运行于本地推理基线之内，提供统一的 API，补充了 Ollama 等专用运行时。它作为 Langflow 等编排工具的后端层，在智能体工作流中实现模型多样性，而无需更改接口契约。

**译注**
`推理 (inference)`：此词含“理”字，暗合“理”（lǐ）之自然纹理，指代模型内在的运算逻辑。
`流 (current)`：此处指动态之流，非静止之库；对应 Glossary 中的“Current(s) — 流”。
`开源 (open source)`：指代码与权重之开放，非仅许可之开放；此处强调“开放权重”生态。