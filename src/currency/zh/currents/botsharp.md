---
layout: layouts/currency-item.njk
title: "BotSharp"
lang: zh
date: 2026-03-24
currencyType: "current"
currencyId: botsharp
abstract: "一个基于 .NET 的开源多智能体框架，支持对话即平台（CaaP），通过插件驱动的流水线执行，助力跨平台智能助手开发。"
tags:
  - currency
permalink: /zh/currency/currents/botsharp/
links:
  - id: openclaw
    relation: "竞争性多智能体编排框架"
  - id: crewai
    relation: "竞争性多智能体编排框架"
  - id: open-source-ai-agent-framework-landscape-2026
    relation: "收录于 2026 年框架全景概览"
  - id: qwen-agent
    relation: "可比较的大语言模型应用框架"
  - id: hermes-agent
    relation: "可比较的自主智能体平台"
  - id: deerflow
    relation: "竞争性多智能体编排框架"
  - id: fastapi-llm-gateway
    relation: "兼容的 API 集成层"
  - id: xinference
    relation: "兼容的统一推理 API"
  - id: vllm
    relation: "兼容的推理引擎"
  - id: ollama
    relation: "兼容的本地推理运行时"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：GitHub
标题：BotSharp
URL: https://github.com/SciSharp/BotSharp
日期：2026-03-24
内容：.NET 中的 AI 多智能体框架 | ai-agent, chatbot, multi-agent。BotSharp 是一个用于构建 AI 机器人平台的开源机器学习框架。该项目涉及自然语言理解、计算机视觉和音频处理技术，旨在促进信息系统中智能机器人助手的发展与应用。开箱即用的机器学习算法使普通程序员能够更快、更轻松地开发人工智能应用。它使用 C# 编写，运行于 .Net Core 之上，这是一个全跨平台框架，采用了插件和流水线流执行设计。

上下文
BotSharp 运行于 .NET 生态系统内，面向那些需要在不离开 C#/.NET Core 环境的情况下获得跨平台 AI 智能体能力的开发者。该框架强调“对话即平台（CaaP）”，暗示了一种结构方法，其中对话界面作为业务逻辑和智能体工作流的主要编排层。关键架构特性包括插件模块化和流水线流执行，允许对 AI 处理流水线进行细粒度控制。

相关性
BotSharp 填补了 .NET 栈组织与开发者的特定基础设施缺口，此前他们缺乏类似 Python 替代品的原生开源多智能体编排框架。其流水线设计支持对智能体交互的确定性控制，这对于需要可审计性和结构化执行流的企业级应用至关重要。核心框架中包含 NLU、计算机视觉和音频处理能力，减少了对多模态任务外部微服务的依赖。

当前状态
该项目托管于 SciSharp 组织下的 GitHub 仓库，采用 Apache 2.0 许可。它维护用于分发的 NuGet 包，并拥有活跃的 Discord 社区。文档可通过 ReadTheDocs 获取。构建流水线通过 GitHub Actions 自动化。该框架支持通过其抽象层与主要大语言模型提供商集成，与更广泛的 Openflows 基础设施模型保持一致。

开放性问题
采用：与更广泛生态系统中语言无关的框架相比，.NET 特定焦点如何影响采用率？
模型支持：与 OpenClaw 或 CrewAI 等框架相比，支持的模型提供商和推理后端的广度如何？
安全：流水线执行设计如何处理不受信任的代码执行和沙箱，特别是在企业环境中？
性能：在高性能吞吐场景下，.NET 运行时开销是否会影响推理延迟，相比原生 Python 实现？

连接
BotSharp 作为多智能体编排框架，与 openclaw、crewai、hermes-agent 和 deerflow 直接可比。它集成 fastapi-llm-gateway、xinference、vllm 和 ollama 等基础设施层，用于模型服务和推理。它被收录于 open-source-ai-agent-framework-landscape-2026 中，作为 .NET 解决方案的代表。该框架对 CaaP 的关注与 qwen-agent 的应用导向方法一致，尽管运行时环境不同。

**译注**
1. **Agent / 智能体**：此处遵循词汇表，将 "Agent" 译为 "智能体"，以区别于通用的 "代理"，强调其作为 AI 实体的主体性。
2. **Current / 流**：虽然词汇表中 "Current(s)" 对应 "流 (liú)"，但在技术文档标题 "Current State" 中，为保证技术准确性，译为 "当前状态"，保留其时间维度的含义，而非哲学上的流动义。
3. **CaaP**：保留英文缩写 "CaaP" 并在首次出现时附带中文 "对话即平台"，因该概念在中文技术语境中尚未形成统一译名。
4. **Openflows**：品牌名保持英文，体现其作为基础设施模型的特定指涉。
5. **Circuit / 回路**：本条目类型（Type: current）非 Circuit 条目，故不采用 "回路在此刻闭合" 的叙事结尾，保持技术条目的信息密度。