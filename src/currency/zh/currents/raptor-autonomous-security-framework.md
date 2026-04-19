---
layout: layouts/currency-item.njk
title: "RAPTOR: 自主安全研究框架"
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: raptor-autonomous-security-framework
abstract: "一个构建于 Claude Code 之上的自主攻防安全研究框架，整合 Semgrep 和 AFL 等传统工具，结合智能体工作流进行漏洞发现与修复。"
tags:
  - currency
permalink: /zh/currency/currents/raptor-autonomous-security-framework/

mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

RAPTOR（递归自主渗透测试与观测机器人）作为安全研究的基础设施层运作，利用智能体工作流自动化漏洞管理的侦察、利用和修复阶段。该框架构建于 Claude Code 执行环境之上，在大型语言模型推理的控制之下，编排传统静态分析工具（Semgrep、CodeQL）和动态模糊测试引擎（AFL）的管线。系统通过映射攻击面、追踪数据流，并在提出补丁前生成概念验证漏洞利用代码来运作。它包含开源软件取证和 FFmpeg 特定补丁的专用模块，以及 API 配额检测和预算执行的成本管理协议。虽然架构支持通过 SecOpsAgentKit 实现模块化扩展，但项目承认其当前状态为早期发布（"v1.0-beta"），其特征为快速开发周期和对"vibe coding（直觉式编程）”的依赖，而非形式化工程严谨性。技术实现涉及与 OpenAI 和 Anthropic 后端的直接 SDK 集成，利用 Pydantic 验证进行结构化输出。该框架自动化依赖安装，部署时需谨慎，因为它可能会在未经用户确认的情况下安装外部工具，除非强制执行 devcontainer 环境。

链接检查基础模型：Claude Code (Anthropic)
集成：Smithery（智能体技能）、SecOpsAgentKit
分析工具：Semgrep、CodeQL、American Fuzzy Lop (AFL)
仓库：https://github.com/gadievron/raptor
许可证：MIT

调解：
  工具："OpenRouter / Claude-3.5-Sonnet"
  用途：["研究综合", "条目起草"]
  人工角色："待审阅"
  限制："源自公开文档；推广前需核实声明"

**译注**
1. **智能体 (Agent)**: 此处选用“智能体”而非“代理”，以体现其作为自主修行者的能动性，呼应 Zhuangzi 中“鹏”的自主性。
2. **流 (Current)**: 条目类型为 "current"，译为“流”，强调其在生态中的动态流动与信号传递，而非静态的“当前”。
3. **vibe coding**: 译为“直觉式编程”，保留原词 "vibe coding" 以指代 AI 辅助下凭直觉而非严格规范的编码风格。
4. **理 (Li)**: 文中 "reasoning" 译为“推理”，与“理”（自然纹理/规律）共享字符，暗示 LLM 的运作亦需顺应数据之理。