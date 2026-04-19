---
layout: layouts/currency-item.njk
title: "zclaw"
lang: zh
date: 2026-03-14
currencyType: "current"
currencyId: zclaw
abstract: "zclaw 是一个面向 ESP32 微控制器、以 C 编写并采用 MIT 许可的 AI 个人助手，将聊天、调度、GPIO 控制、持久记忆与多提供商 LLM 栈压入 888 KiB 固件。"
tags:
  - currency
permalink: /zh/currency/currents/zclaw/
links:
  - id: distributed-physical-agent-infrastructure
    relation: "在嵌入式尺度展示智能到硬件的连接层"
  - id: local-inference-baseline
    relation: "以远程模型后端将本地推理模式延伸到微控制器硬件"
  - id: ollama
    relation: "支持 Ollama，与 Anthropic、OpenAI、OpenRouter 同列为四个 LLM 提供商后端之一"
mediation:
  tooling: "由英文条目人工整理后翻译"
  use:
    - "保留项目名、硬件名与基础设施术语"
    - "按 Openflows 中文术语体系重写摘要与关系说明"
  humanRole: "审阅并修复机器翻译草稿中的非发布内容"
  limits: "嵌入式硬件能力变化很快；具体 ESP32 变体支持需以仓库为准"
lastReviewed: 2026-03-22
---

### 信号

zclaw 是为 ESP32 微控制器家族设计的 AI 个人助手。它把 Wi-Fi、TLS、多提供商 LLM 访问、持久记忆、GPIO 控制与调度压入 888 KiB 固件，是一个极小尺度的完整 LLM 连接智能体实现。该项目采用 MIT 许可，活跃开发，并在 GitHub 获得约 1.9k stars。

### 语境

zclaw 以 C 编写，构建在 ESP-IDF/FreeRTOS 之上，支持 ESP32、ESP32-C3、ESP32-S3 与 ESP32-C6 四种变体。固件中只有约 38 KiB 是应用逻辑，其余空间用于网络、加密、证书与运行时系统。它支持 Anthropic、OpenAI、OpenRouter 与 Ollama，交互可通过 Telegram 或托管 Web relay 完成。GPIO 控制包含安全护栏，USB 管理控制台提供本地恢复与诊断路径，自定义工具可在运行时通过自然语言组合。

### 关联

zclaw 呈现出开源 AI 栈的物理端点：语言模型推理连接到硬件执行的最小可行尺度。它表明完整智能体回路，包括记忆、调度、工具使用与通信，可以在约 5 美元的微控制器上运行，主要约束转移为远程推理延迟。这直接影响分布式物理智能体基础设施与边缘部署，尤其是在云依赖本身构成风险的环境中。

### 当前状态

活跃。项目在 GitHub 以 MIT 许可发布，包含较完整的文档、配置脚本与开发工具。截至 2026 年 3 月，仓库约有 186 次提交。

### 未决问题

- 在间歇性连接条件下，智能体回路如何退化；zclaw 如何处理推理不可用？
- GPIO 安全护栏如何工作，其失效模式是什么？
- 完全离线的 ESP32 本地推理最低可行路径是什么？

### 连接

zclaw 位于 distributed-physical-agent-infrastructure 与 local-inference-baseline 两个回路的交叉处。它将本地推理模式从桌面延伸到嵌入式边缘。其多提供商支持，包括 Ollama，使其连接到更广泛的开放权重生态，而不是锁定在单一推理提供商之上。
