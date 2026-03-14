---
layout: layouts/currency-item.njk
title: "Sdcb 对话"
lang: zh
date: 2026-03-14
currencyType: "current"
currencyId: sdcb-chats
abstract: "一个自托管的 AI 网关和前端，支持 21+ 模型提供商，内置可观测性、沙盒代码执行及企业级安全控制。"
tags:
  - 流通
permalink: /zh/currency/currents/sdcb-chats/
links:
  - id: librechat
    relation: "功能相似的自托管多模型聊天界面，具备企业级控制"
  - id: open-webui
    relation: "用于本地/云端模型访问的自托管平台，通过统一接口提供可比功能"
  - id: operational-literacy-interface
    relation: "结构性和可观测性支持操作素养的界面层示例"
mediation:
  tooling: "OpenRouter 服务 / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号**
GitHub 仓库 sdcb/chats 呈现了一个强大且灵活的 LLM 前端和 AI 网关。它支持 21+ 主流 AI 模型提供商，包括 OpenAI、DeepSeek 和 DashScope。主要功能包括 Docker 部署、带沙盒执行的代码解释器、API 网关兼容性（Chat Completions/Messages）、用于可观测性的请求追踪，以及 Keycloak SSO 和审计日志等企业安全功能。

**语境**
Sdcb Chats 占据 AI 应用栈的基础设施层，充当模型路由和用户管理的集中网关。它解决了跨多样模型提供商统一访问的需求，同时保持对数据和推理成本（inference costs）的本地控制。该项目基于 .NET/C# 构建，强调通过 HTTP 请求追踪和管理仪表板实现运营可见性。

**关联**
本条目与 Openflows（开流）知识库相关，因为它代表了“操作素养接口回路”（Operational Literacy Interface Circuit）的具体实现。通过暴露请求追踪、审计日志和配置控制，它将界面从黑盒消费工具转变为透明运营层。对沙盒代码执行和多提供商支持的强调，与减少供应商锁定（vendor lock-in）同时保持安全边界的目标一致。

**当前状态**
最新版本 1.10.2 于 2026 年 3 月 10 日发布。支持 SQLite、SQL Server、PostgreSQL 以及云存储（S3/OSS/Blob）。包含用于请求追踪、过滤和导出的管理仪表板。功能包括容量保护队列和数据保留的自动清理。认证支持 Keycloak SSO 和短信验证。

**开放问题**
在 predominantly Python/JS AI 生态系统中，基于 .NET 的代码库的长期维护策略。与 LibreChat 和 Open WebUI 等既定替代方案的采用率。对标准 Chat Completions 之外新兴模型协议的具体支持。管理仪表板在高流量请求追踪下的可扩展性。

**连接**
Sdcb Chats 在自托管界面空间中与 LibreChat 和 Open WebUI 互为对等，在请求追踪和企业安全集成方面提供独特优势。它通过 HTTP 请求追踪和审计日志使中介（mediation）可见，使操作素养接口回路的原则得以运作，允许用户介入并理解模型行为，而非将其视为不透明的输出。

回路在此刻闭合：当用户能够介入并理解模型行为，而非将其视为不透明的输出时。

**译注**
1. **回路 (Circuit)**：此处将 "Circuit" 译为“回路”而非“电路”或“线路”，旨在强调 Openflows 语境下“返回路径”与“闭环”的意味。可观测性（observability）不仅在于单向输出，更在于让数据流形成可被审视的闭环，从而达成修行者（practitioner）对系统的掌控。
2. **开流 (Openflows)**：品牌名保留 Openflows，括号内注“开流”以显其理（lǐ），即开放流动之意，暗合 Zhuangzi 中鹏鸟乘风而行的意象。
3. **推理 (Inference)**：文中 "inference costs" 译为“推理成本”，与“理”（lǐ）字呼应，暗示计算过程不仅是算力消耗，亦是对事物规律的推演。