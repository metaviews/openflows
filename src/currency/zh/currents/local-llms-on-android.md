---
layout: layouts/currency-item.njk
title: Android 上的本地大语言模型
lang: zh
date: 2026-04-14
currencyType: "current"
currencyId: local-llms-on-android
abstract: 一款 Android 应用程序，支持通过 ONNX Runtime 和 LiteRT 后端在移动硬件上对量化大语言模型进行离线本地推理。
tags:
  - currency
permalink: /zh/currency/currents/local-llms-on-android/
links:
  - id: local-inference-baseline
    relation: "定义了将移动推理视为普通本地基础设施的基础层"
  - id: lm-studio
    relation: "适用于桌面环境的同类本地推理客户端"
  - id: gemma-4-open-weight-release
    relation: "通过 LiteRT 后端支持 Gemma 4 模型家族"
  - id: qwen3-5-vlm-nvidia-gpu-endpoints
    relation: "通过 ONNX Runtime 后端支持 Qwen3 模型家族"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 local-llms-on-android · github · 2026-04-14 这款 Android 应用程序支持在移动设备上通过 ONNX Runtime 和 LiteRT 后端对量化大语言模型进行离线本地推理。v1.3.0 版本支持流式响应、持久化本地聊天历史以及 Markdown 渲染，适用于 Qwen3、Gemma 4 和针对不同硬件层级优化的 LLaMA 变体模型。

背景 移动推理已从实验性原型转变为生产就绪的应用程序，得益于硬件加速技术的提升和模型量化技术。本条目体现了开放权重模型的可用性与设备端执行能力的融合，符合 Openflows（开流）将本地推理视为普通基础设施而非小众能力的更广泛目标。

相关性 在移动硬件上部署推理可降低延迟并减少对云 API 的依赖，同时通过数据主权增强用户隐私。使用 ONNX Runtime 和 LiteRT 标准化了异构 Android 硬件上的执行管道，减少了移动 AI 生态系统的碎片化。

当前状态 项目处于 1.3.0 版本，提供预构建 APK 供下载。它支持特定的模型配置，包括通过 LiteRT 的 Gemma 4 E2B/E4B 和通过 ONNX 的 Qwen3 0.6B。功能包括精致的聊天界面、持久化历史记录和主题定制。代码库托管于 GitHub，提供直接安装的公开版本。

开放问题 热节流如何影响中端设备上的持续推理性能，与桌面等效设备相比？存在哪些安全机制来将推理过程与其他移动应用程序及系统资源隔离？是否有维护承诺以支持新的 Android API 版本和硬件驱动程序更新？该应用如何处理内存管理以防止大上下文窗口操作期间的系统不稳定？

连接 本条目通过将能力从桌面和服务器环境扩展到普适的移动设备，整合进本地推理基线回路。它补充了现有的客户端工具如 LM Studio，专注于移动操作系统约束。模型支持与 Gemma 4 和 Qwen3 发布信号重叠，表明针对边缘部署优化特定模型家族的趋势。基础设施依赖标准运行时后端（ONNX, LiteRT）而非专有框架，确保与更广泛工具生态系统的互操作性。

**译注**
- **推理 (tuī lǐ)**：此处选用“推理”翻译 Inference，与“理”（lǐ，自然纹理/规律）共用一字。在庄子的语境中，庖丁解牛是顺应牛体之“理”；在 AI 语境中，推理亦是顺应数据与逻辑之“理”。
- **Openflows（开流）**：保留品牌名 Openflows，首现时加注“开流”以显其“开放流动”之本义，呼应 Zhuangzi 中鹏鸟南徙之流动意象。
- **回路 (huí lù)**：对应 Circuit，强调闭环与稳定模式，区别于单纯的“流”（Current）。