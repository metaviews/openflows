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
      'topic:llm is:public',
      'topic:ai-agent is:public',
      'topic:local-llm is:public',
      'topic:open-source-ai is:public',
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
      'open source AI agent framework 2026',
      'new open source language model release',
    ],
    count: 5,
  },

  twitter: {
    // Keyword searches across all tweets — works on Basic tier
    queries: [
      'open source LLM release -is:retweet lang:en',
      'new AI agent framework open source -is:retweet lang:en',
    ],
    maxResults: 10,
    minLikes: 25,
  },
};
