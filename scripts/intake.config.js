module.exports = {
  screening: {
    // Use a cheaper/faster model for the screening pass to keep costs low.
    // null = use OPENROUTER_MODEL. Override with e.g. 'google/gemini-flash-1.5'
    model: null,
    // Minimum score (1–5) for a signal to proceed to full draft
    threshold: 3,
  },

  github: {
    queries: [
      // English ecosystem signals
      'topic:llm is:public',
      'topic:ai-agent is:public',
      'topic:local-llm is:public',
      'topic:open-source-ai is:public',
      // Chinese ecosystem signals — projects originating in Chinese-speaking contexts
      'topic:chinese-llm is:public',
      'topic:qwen is:public',
      'topic:chatglm is:public',
      'topic:baichuan is:public',
    ],
    minStars: 100,
    perPage: 10,
  },

  huggingface: {
    tasks: ['text-generation', 'text2text-generation', 'automatic-speech-recognition'],
    minLikes: 20,
    limit: 15,
  },

  brave: {
    queries: [
      // English signals
      'open source AI agent framework 2026',
      'new open source language model release',
      // Chinese ecosystem signals — searches for Chinese-language sources
      '开源 AI 大模型 2026',
      'AI 智能体 开源框架 发布',
    ],
    count: 5,
  },

  twitter: {
    // Keyword searches across all tweets — works on Basic tier
    queries: [
      // English
      'open source LLM release -is:retweet lang:en',
      'new AI agent framework open source -is:retweet lang:en',
      // Chinese ecosystem
      '开源 大模型 发布 -is:retweet lang:zh',
      'AI 智能体 开源 -is:retweet lang:zh',
    ],
    maxResults: 10,
    minLikes: 25,
  },

  // ModelScope (魔搭) — Alibaba's model hosting platform, the primary Chinese-ecosystem
  // equivalent of HuggingFace. Hosts Qwen, ERNIE, Baichuan, and other Chinese-origin models.
  // Source module: scripts/sources/modelscope.js (pending API verification before implementation)
  // modelscope: {
  //   tasks: ['text-generation', 'multi-modal'],
  //   minDownloads: 1000,
  //   limit: 10,
  // },
};
