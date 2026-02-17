const SITE_URL = "https://openflows.org";
const FEED_URL = `${SITE_URL}/currency/feed.xml`;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

module.exports = class CurrencyRssTemplate {
  data() {
    return {
      permalink: "/currency/feed.xml",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const entries = (data.collections && data.collections.currency) || [];
    const lastBuildDate = new Date().toUTCString();

    const items = entries
      .map((item) => {
        const title = item.data.title || "Untitled";
        const url = `${SITE_URL}${item.url}`;
        const pubDate = (item.date instanceof Date ? item.date : new Date(item.date)).toUTCString();
        const type = item.data.currencyType || "entry";
        const abstract = item.data.abstract || "";
        const description = abstract
          ? `${type}: ${abstract}`
          : `${type} entry in Openflows Currency.`;

        return [
          "    <item>",
          `      <title>${escapeXml(title)}</title>`,
          `      <link>${escapeXml(url)}</link>`,
          `      <guid>${escapeXml(url)}</guid>`,
          `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
          `      <description>${escapeXml(description)}</description>`,
          "    </item>"
        ].join("\n");
      })
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Openflows Currency</title>
    <link>${SITE_URL}/currency/</link>
    <description>Currents and Circuits from Openflows</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
    <atom:link href="${escapeXml(FEED_URL)}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
${items}
  </channel>
</rss>`;
  }
};
