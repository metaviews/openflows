const SITE_URL = "https://openflows.org";
const FEED_URL = `${SITE_URL}/blog/feed.xml`;

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

module.exports = class BlogRssTemplate {
  data() {
    return {
      permalink: "/blog/feed.xml",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const entries = ((data.collections && data.collections.blog) || []).slice(0, 20);
    const items = entries.map((item) => {
      const title = item.data.title || "Untitled";
      const url = `${SITE_URL}${item.url}`;
      const pubDate = (item.date instanceof Date ? item.date : new Date(item.date)).toUTCString();
      const description = item.data.abstract || "Longform Openflows analysis.";
      const categories = (item.data.topics || [])
        .map((topic) => `      <category>${escapeXml(topic)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
        categories,
        `      <description>${escapeXml(description)}</description>`,
        "    </item>"
      ].filter(Boolean).join("\n");
    }).join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Openflows Field Notes from the AI Ecosystem</title>
    <link>${SITE_URL}/blog/</link>
    <description>Longform field notes and analysis on the open source AI ecosystem</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(new Date().toUTCString())}</lastBuildDate>
    <atom:link href="${escapeXml(FEED_URL)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
  }
};
