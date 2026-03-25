module.exports = class KnowledgeManifest {
  data() {
    return {
      permalink: "/knowledge-manifest.json",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const entries = (data.collections && data.collections.allCurrency) || [];

    const items = entries.map((item) => ({
      title: item.data.title || "",
      currencyId: item.data.currencyId || null,
      currencyType: item.data.currencyType || "",
      lang: item.data.lang || "en",
      date: item.date instanceof Date
        ? item.date.toISOString()
        : new Date(item.date).toISOString(),
      abstract: item.data.abstract || null,
      tags: item.data.tags || [],
      links: item.data.links || [],
      permalink: item.url,
      body: item.content || ""
    }));

    const enEntries = items.filter(e => e.lang === "en");
    const zhEntries = items.filter(e => e.lang === "zh");

    return JSON.stringify(
      {
        generated: new Date().toISOString(),
        count: items.length,
        byLang: { en: enEntries.length, zh: zhEntries.length },
        entries: items
      },
      null,
      2
    );
  }
};
