---
layout: layouts/currency-item.njk
title: "goose: 面向代码、工作流及更广阔领域的原生开源 AI 智能体"
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: goose
abstract: "goose 是一个原生的开源 AI 智能体框架（桌面端、命令行、API），其通用性超越代码建议，适用于各类任务，可在本地运行并支持 15+ 个 LLM 提供商及 70+ 个 MCP 扩展。"
tags:
  - currency
permalink: /zh/currency/currents/goose/

mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

goose 是由开源人工智能基金会（AAIF）开发的开源、原生 AI 智能体框架，该基金会是 Linux Foundation 的一项倡议。它提供统一的体验，用于在桌面、终端和 API 界面构建和运行 AI 智能体——旨在处理代码任务、研究、写作、自动化、数据分析及通用工作流，而不仅仅是代码生成。

架构与能力
为兼顾性能与可移植性，goose 采用 Rust 编写，原生支持 macOS、Linux 和 Windows。它将智能体逻辑与推理层分离，支持 15+ 个 LLM 提供商，包括 Anthropic Claude、OpenAI、Google Gemini、Ollama、OpenRouter、Azure、AWS Bedrock 等。这种多提供商的灵活性允许用户利用现有的订阅或 API 密钥，而无需受限于单一供应商锁定。

goose 通过模型上下文协议（MCP）集成 70+ 个扩展，MCP 是一种将智能体连接到外部工具、数据源和服务的开放标准。这种可扩展性使 goose 能够连接本地文件系统、数据库、API 和自定义工具，使其适应多样的工作流。

部署选项
桌面应用
适用于 macOS、Linux 和 Windows 的原生图形界面应用程序，提供智能体会话、工具交互和工作流管理的可视化界面。

命令行界面 (CLI)
通过 CLI 安装支持终端优先的工作流：
curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash

API
通过 API 层将 goose 嵌入自定义应用程序，实现对智能体能力的编程访问，用于自动化及集成到其他工作流中。

治理与社区
goose 属于开源人工智能基金会（Agentic AI Foundation），强调开放治理、社区驱动的开发及透明运营。该项目维护治理框架，并通过自定义发行版（Custom Distributions）支持定制版本，使组织能够构建具有特定提供商和扩展的品牌化预配置版本。

相关基础设施
goose 与当前生态系统中的几种基础设施模式相契合：

终端原生智能体工作流：goose 以其命令行优先的设计，体现了以终端为主要工作空间的模式。
模型上下文协议集成：MCP 支持使 goose 能够作为通用智能体运行时，连接多样化的工具。
本地推理作为基线：goose 将本地推理视为普通基础设施，支持 Ollama 及其他本地后端。
开放模型互操作层：多提供商支持减少供应商锁定，并实现灵活的提供商选择。

goose 代表了通用智能体的兴起：超越狭窄代码辅助的系统，通过可组合工具、可扩展协议和本地执行来处理任意任务。其在 Linux Foundation 中的地位标志着机构对开放、治理对齐的智能体基础设施的投资不断增长。

【调解区块】此条目基于公开文档和仓库分析起草。作者（Peng）通过 fetch_url 验证了项目的治理模型和提供商支持矩阵，并交叉引用了相关回路以对齐基础设施。除结构综合外，无 AI 生成的散文。

**译注**
- **推理 (tuī lǐ)**: 此处使用“推理”翻译 Inference，与“理”（自然纹理/规律）共用一字，暗示推理过程需顺应数据与逻辑的自然纹理，而非强行干预。
- **原生 (yuán shēng)**: 对应 Native，此处不仅指技术架构的本地运行，亦指智能体与操作系统环境的深度共生，如同生物之原生。
- **回路 (huí lù)**: 原文提及 "related circuits"，此处保留“回路”以呼应 Openflows 体系中“流”与“回路”的辩证关系，暗示工作流在闭环中沉淀为稳定模式。