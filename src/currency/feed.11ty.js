const SITE_URL = "https://openflows.org";

module.exports = class CurrencyFeedTemplate {
  data() {
    return {
      permalink: "/currency/feed.json",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const entries = (data.collections && data.collections.currency) || [];
    const items = entries.map((item) => {
      return {
        id: item.data.currencyId || null,
        title: item.data.title || "",
        type: item.data.currencyType || "",
        abstract: item.data.abstract || null,
        date: item.date instanceof Date ? item.date.toISOString() : new Date(item.date).toISOString(),
        path: item.url,
        url: `${SITE_URL}${item.url}`
      };
    });

    return JSON.stringify(
      {
        site: SITE_URL,
        generatedAt: new Date().toISOString(),
        count: items.length,
        items
      },
      null,
      2
    );
  }
};
