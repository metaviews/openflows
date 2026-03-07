const { huggingface: config } = require('../intake.config');

async function fetch() {
  const signals = [];

  for (const task of config.tasks) {
    const url = `https://huggingface.co/api/models?sort=lastModified&direction=-1&limit=${config.limit}&filter=${task}`;
    const res = await globalThis.fetch(url);
    if (!res.ok) {
      console.warn(`  HuggingFace: task "${task}" failed (${res.status})`);
      continue;
    }
    const models = await res.json();

    for (const model of models) {
      if ((model.likes || 0) < config.minLikes) continue;
      signals.push({
        title: model.modelId,
        url: `https://huggingface.co/${model.modelId}`,
        summary: `${task} model | likes: ${model.likes} | downloads: ${model.downloads || 0}`,
        source: 'huggingface',
        date: model.lastModified,
        meta: {
          likes: model.likes,
          downloads: model.downloads,
          task,
          tags: model.tags || [],
        },
      });
    }
  }

  return dedup(signals);
}

async function enrich(signal) {
  try {
    const res = await globalThis.fetch(
      `https://huggingface.co/${signal.title}/raw/main/README.md`
    );
    if (!res.ok) return signal;
    const text = await res.text();
    signal.enriched = text.slice(0, 2000);
  } catch {}

  return signal;
}

function dedup(signals) {
  return [...new Map(signals.map(s => [s.url, s])).values()];
}

module.exports = { fetch, enrich };
