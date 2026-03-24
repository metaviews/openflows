---
layout: layouts/currency-item.njk
title: "Xenova/nllb-200-distilled-600M 模型"
lang: zh
date: 2026-03-24
currencyType: "current"
currencyId: xenova-nllb-200-distilled-600m
abstract: "一个 6 亿参数的多语言翻译模型，针对 `transformers.js` 在 200 多种语言上的推理进行了优化，源自 Facebook 的 NLLB-200 蒸馏架构。"
tags:
  - currency
permalink: /zh/currency/currents/xenova-nllb-200-distilled-600m/
links:
  - id: transformers-library
    relation: "模型推理与流水线执行的基础库实现"
  - id: local-inference-baseline
    relation: "边缘设备上本地模型执行的运营基础设施模式"
  - id: lm-studio
    relation: "本地模型部署与测试的桌面界面"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：HuggingFace URL: https://huggingface.co/Xenova/nllb-200-distilled-600M 日期：2026-03-23 内容：文本生成模型 | 点赞：50 | 下载：3702
基座模型：facebook/nllb-200-distilled-600M
库：transformers.js
流水线标签：translation
语言：200+ (ace, af, ar, bn, de, en, es, fr, hi, ja, ko, ru, zh, 等)

语境
本条目代表 Facebook NLLB-200 系列的蒸馏变体，专门针对 `transformers.js` 库进行了优化。该模型将参数量减少至 6 亿，同时保持对 200 多种语言的支持，在推理速度和内存占用上优先于原始精度。它利用与浏览器和 WebAssembly 环境兼容的 ONNX 运行时优化，使其区别于标准的仅 PyTorch 发布版本。

相关性
该模型解决了受限环境中低延迟、隐私保护的翻译基础设施需求。通过启用 `transformers.js` 的本地执行，它支持离线能力，并减少了对多语言文本处理云 API 的依赖。这对于数据主权和网络可靠性为主要约束的边缘计算场景至关重要。

当前状态
该模型在 HuggingFace 上可用，采用率适中（截至信号日期下载量为 3702）。它支持广泛的语言对，包括低资源语言（例如 ace_Arab, ckb_Arab, my_Mymr）。实现依赖于 `transformers.js` 的流水线抽象，需要在消费级硬件上进行特定的量化或精度设置以获得最佳性能。

开放问题
蒸馏架构是否在高资源语言对上保持了与基座 NLLB-200 模型的对等性？
`transformers.js` 流水线为此检查点支持哪些具体的量化级别（INT8, FP16）？
翻译任务的延迟与替代本地推理引擎（如 Ollama, LM Studio）相比如何？
是否有 MCP 服务器实现可用于直接集成到智能体工作流中？

连接
transformers-library：模型推理与流水线执行的基础库实现。
local-inference-baseline：边缘设备上本地模型执行的运营基础设施模式。
lm-studio：本地模型部署与测试的桌面界面。

**译注**
1. **推理 (tuī lǐ)**：此处翻译为“推理”，与“理”（lǐ，自然之理）共享字符。在翻译中保留了这种字源上的联系，暗示模型的行为遵循数据的内在纹理。
2. **流 (liú)**：本条目类型为 `current`，在中文语境中对应“流”。此词既指代数据流动的当前状态，也暗合 Openflows 品牌中“开流”的意象。
3. **双语文本**：技术术语如 `transformers.js`、`ONNX`、`MCP` 等保留英文，以维持技术精确性；中文部分则力求在技术描述中体现“理”的清晰性。