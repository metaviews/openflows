---
layout: layouts/currency-item.njk
title: "汉字浏览 (Hanzi Browse)"
lang: zh
date: 2026-03-28
currencyType: "current"
currencyId: hanzi-browse
abstract: "汉字浏览是一款 Chrome 扩展程序，使 AI 智能体能够通过单次工具调用，与经过身份验证的本地浏览器会话进行交互，实现表单填写、导航和内容提取。"
tags:
  - currency
permalink: /zh/currency/currents/hanzi-browse/
links:
  - id: lightpanda-browser
    relation: "Alternative browser automation approach for AI agents using headless inference versus authenticated local session"
  - id: scrapling
    relation: "Complementary web automation framework focusing on scraping pipelines versus interactive browser control"
  - id: garry-tan-claude-code-setup
    relation: "Compatible agent runtime environment for Claude Code workflows utilizing Hanzi Browse tooling"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 汉字浏览 (Hanzi Browse) · github · 2026-03-28

汉字浏览提供了一个 Chrome 扩展界面，允许 AI 智能体在用户实际的已登录浏览器环境中执行任务。该工具通过单次工具调用，实现委托操作，如点击、输入、表单填写和读取经过身份验证的页面。它支持与主要的代码助手集成，包括 Claude Code、Cursor、Codex 和 Gemini CLI，将本地浏览器访问定位为标准的智能体能力。

上下文
AI 智能体工具通常依赖无头浏览器或 API 端点，这在遇到身份验证要求或动态客户端渲染时往往会失败。汉字浏览通过向智能体暴露本地浏览器实例来弥合这一差距，允许访问有状态的会话和个性化数据，而无需 API 密钥或令牌共享。这种方法将用户的浏览器视为智能体执行的更安全、经过身份验证的环境，而非外部服务。

相关性
本条目解决了自主工作流中经过身份验证的网络交互的基础设施需求，这是智能体可靠性的常见瓶颈。通过利用本地浏览器，它减少了对基于云的自动化服务的依赖，并与 Openflows（开流）关于本地推理作为基础架构的原则保持一致。它通过将浏览器访问标准化为智能体系统的工具接口，支持开源模型互操作层回路。

当前状态
该项目作为 npm 包和 Chrome 应用商店扩展提供。它支持多个智能体框架，并强调单次工具调用委托模型。文档突出了与主要代码助手的兼容性，并提供 Discord 支持以进行社区集成。

开放问题
该扩展如何在智能体和经过身份验证的用户会话之间管理权限边界？跨智能体重启的会话持久性和状态管理有何影响？该实现是否向智能体暴露完整的 DOM，还是将访问限制在特定的安全上下文中？

连接
该工具作为一个专门的浏览器自动化层运行，类似于 lightpanda-browser，但它优先考虑经过身份验证的本地状态而非无头效率。它通过启用超越被动数据提取的交互式工作流，与 scrapling 互补。与 garry-tan-claude-code-setup 的集成展示了其在既定的 Claude Code 开发工作流中的实用性。

**译注**
- **Current vs Currency**: 本条目类型为 `current`，对应“流”（liú），指代具体的信号或活动；而“流通”（liú tōng）对应 Currency，指代更广泛的资金或价值循环层。
- **Hanzi**: 文中保留“汉字”与“Hanzi”并用，以强调其作为特定工具名称（Hanzi Browse）的标识性，同时表明其核心功能涉及中文文本处理。
- **Openflows**: 首次出现时标注（开流），呼应 Zhuangzi 中“鹏”所代表的开放流动与转化之意。
- **Circuit**: “回路”（huí lù）在此处不仅指技术路径，也隐喻 Openflows 生态中模式完成与稳定的状态。