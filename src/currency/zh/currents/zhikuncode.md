---
layout: layouts/currency-item.njk
title: "ZhikunCode（智坤代码）"
lang: zh
date: 2026-04-23
currencyType: "current"
currencyId: zhikuncode
abstract: "ZhikunCode 是一个自托管、基于 Docker 的 AI 编程助手，具备多智能体协作、基于浏览器的控制界面，以及对国产大语言模型的原生支持。"
tags:
  - currency
permalink: /zh/currency/currents/zhikuncode/
links:
  - id: chinese-open-source-llm-landscape-2026
    relation: "与中文大语言模型的主权部署路径相一致"
  - id: openclaw
    relation: "面向编码工作流的可比开源智能体框架"
  - id: dify
    relation: "适用于 AI 应用的可比自托管编排平台"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 zhikuncode · github · 2026-04-23 ZhikunCode（智坤代码）是一个自托管、基于 Docker 的 AI 编程助手，支持多智能体协作与基于浏览器的控制界面，同时原生支持 Qwen、DeepSeek 和 Moonshot 等国产大语言模型。

**Context**
该项目诞生于自托管 AI 开发工具日益增长的生态系统中，定位为依赖云端编程助手的本地化替代方案。它强调跨设备的浏览器可访问性，并集成 Bash 沙箱和权限管道等安全层，以减轻自主代码执行带来的风险。

**Relevance**
ZhikunCode 满足了构建主权、本地优先编程环境的基础设施需求，支持中文语言模型而无需外部网络代理。其多智能体架构允许复杂任务分解，与 Openflows（开流）关于可检查、可控制智能体工作流的目标相一致。

**Current State**
该仓库采用 MIT 许可，并提供 Docker Compose 配置以实现一键部署。项目包含用于任务管理的 Web UI，支持 CLI 工具，并为中英文用户提供活跃文档。

**Open Questions**
项目的长期维护节奏在初始信号之外仍有待验证。8 层 Bash 沙箱在生产环境中的有效性需要独立的安全审计。与现有 MCP 服务器及 Ollama 等本地推理运行时（inference runtime）的集成深度尚未充分记录。

**Connections**
本条目连接至关于本地化模型部署的 chinese-open-source-llm-landscape-2026 回路，可比的多智能体编程基础设施 openclaw 框架，以及作为自托管编排模式参考的 dify。

**译注**
1. **Zhikun（智坤）**: 名称暗合《庄子》中的“鲲”（Kun），寓意潜龙在渊、化鹏而飞的转化潜力。
2. **Current（流）**: 此处指代 Openflows 中的“流”（Current），意为信息或信号在生态中的流动，区别于静态的“回路”（Circuit）。
3. **Openflows（开流）**: 品牌名保留英文，括号内为意译，取“开启流通”之意。
4. **Agent（智能体）**: 此处指代 AI Agent，中文“智能体”强调其具备自主行动能力的实体性，较之“代理”更具技术深度。