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
        url: `https://openflows.org${item.url}`,
        body: item.content || ""
    }));

    const enEntries = items.filter(e => e.lang === "en");
    const zhEntries = items.filter(e => e.lang === "zh");

    return JSON.stringify(
      {
        schemaVersion: "1.1.0",
        site: "https://openflows.org",
        generated: new Date().toISOString(),
        count: items.length,
        byLang: { en: enEntries.length, zh: zhEntries.length },
        resources: {
          llms: "https://openflows.org/llms.txt",
          sitemap: "https://openflows.org/sitemap.xml",
          searchIndex: "https://openflows.org/currency/search-index.json",
          rss: "https://openflows.org/currency/feed.xml",
          jsonFeed: "https://openflows.org/currency/feed.json"
        },
        entries: items
      },
      null,
      2
    );
  }
};
