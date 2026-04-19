const SITE_URL = "https://openflows.org";

function isoDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(path) {
  return `${SITE_URL}${path}`;
}

function staticAlternate(url) {
  const pairs = new Map([
    ["/", "/zh/"],
    ["/zh/", "/"],
    ["/currency/", "/zh/currency/"],
    ["/zh/currency/", "/currency/"],
    ["/currency/currents/", "/zh/currency/currents/"],
    ["/zh/currency/currents/", "/currency/currents/"],
    ["/currency/circuits/", "/zh/currency/circuits/"],
    ["/zh/currency/circuits/", "/currency/circuits/"],
    ["/currency/practitioners/", "/zh/currency/practitioners/"],
    ["/zh/currency/practitioners/", "/currency/practitioners/"]
  ]);
  return pairs.get(url) || null;
}

module.exports = class SitemapTemplate {
  data() {
    return {
      permalink: "/sitemap.xml",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const pages = ((data.collections && data.collections.publicPages) || [])
      .filter((item) => item.url && !item.url.includes("/404"))
      .sort((a, b) => a.url.localeCompare(b.url));
    const currency = (data.collections && data.collections.allCurrency) || [];
    const byKey = new Map(currency.map((item) => {
      const lang = item.data.lang === "zh" ? "zh" : "en";
      return [`${item.data.currencyId}:${lang}`, item];
    }));

    const urls = pages.map((item) => {
      const lang = item.data.lang === "zh" ? "zh-Hans" : "en";
      const alternates = [{ lang, url: item.url }];
      const staticAlt = staticAlternate(item.url);

      if (item.data.currencyId) {
        const otherLang = item.data.lang === "zh" ? "en" : "zh";
        const other = byKey.get(`${item.data.currencyId}:${otherLang}`);
        if (other) {
          alternates.push({ lang: otherLang === "zh" ? "zh-Hans" : "en", url: other.url });
        }
      } else if (staticAlt) {
        alternates.push({ lang: item.url.startsWith("/zh/") ? "en" : "zh-Hans", url: staticAlt });
      }

      const alternateTags = alternates
        .sort((a, b) => a.lang.localeCompare(b.lang))
        .map((alt) => `    <xhtml:link rel="alternate" hreflang="${xmlEscape(alt.lang)}" href="${xmlEscape(absoluteUrl(alt.url))}" />`)
        .join("\n");
      const fallback = alternates.find((alt) => alt.lang === "en") || alternates[0];
      const fallbackTag = fallback
        ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(absoluteUrl(fallback.url))}" />`
        : "";

      return [
        "  <url>",
        `    <loc>${xmlEscape(absoluteUrl(item.url))}</loc>`,
        `    <lastmod>${xmlEscape(isoDate(item.date))}</lastmod>`,
        alternateTags + fallbackTag,
        "  </url>"
      ].filter(Boolean).join("\n");
    }).join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
  }
};
