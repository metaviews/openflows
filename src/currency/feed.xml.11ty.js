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
    const allEntries = (data.collections && data.collections.currency) || [];
    // Most recent 20 entries only
    const entries = allEntries.slice(0, 20);
    const lastBuildDate = new Date().toUTCString();

    const items = entries
      .map((item) => {
        const title = item.data.title || "Untitled";
        const url = `${SITE_URL}${item.url}`;
        const pubDate = (item.date instanceof Date ? item.date : new Date(item.date)).toUTCString();
        const type = item.data.currencyType || "entry";
        const abstract = item.data.abstract || "";
        const description = abstract ? `[${type}] ${abstract}` : `${type} entry in Openflows.`;

        return [
          "    <item>",
          `      <title>${escapeXml(title)}</title>`,
          `      <link>${escapeXml(url)}</link>`,
          `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
          `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
          `      <category>${escapeXml(type)}</category>`,
          `      <description>${escapeXml(description)}</description>`,
          "    </item>"
        ].join("\n");
      })
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Openflows</title>
    <link>${SITE_URL}/currency/</link>
    <description>Currents, Circuits, and Practitioners from the open source AI ecosystem</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
    <atom:link href="${escapeXml(FEED_URL)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
  }
};
