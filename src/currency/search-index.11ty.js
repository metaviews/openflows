function stripHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = class CurrencySearchIndex {
  data() {
    return {
      permalink: "/currency/search-index.json",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const entries = (data.collections && data.collections.allCurrency) || [];

    const items = entries.map((item) => {
      const lang = item.data.lang === "zh" ? "zh" : "en";
      const linkIds = (item.data.links || [])
        .map((link) => link && link.id)
        .filter(Boolean);
      const body = stripHtml(item.content || "");
      const searchable = [
        item.data.title,
        item.data.currencyId,
        item.data.currencyType,
        item.data.abstract,
        linkIds.join(" "),
        body.slice(0, 1800)
      ].filter(Boolean).join(" ");

      return {
        title: item.data.title || "",
        currencyId: item.data.currencyId || "",
        currencyType: item.data.currencyType || "",
        lang,
        date: item.date instanceof Date ? item.date.toISOString() : new Date(item.date).toISOString(),
        abstract: item.data.abstract || "",
        permalink: item.url,
        links: item.data.links || [],
        lastReviewed: item.data.lastReviewed || null,
        mediated: Boolean(item.data.mediation),
        searchable
      };
    });

    return JSON.stringify({
      generated: new Date().toISOString(),
      count: items.length,
      entries: items
    }, null, 2);
  }
};
