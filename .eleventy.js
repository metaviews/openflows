module.exports = function(eleventyConfig) {
  function newestFirst(items) {
    return [...items].sort((a, b) => b.date - a.date);
  }
  function itemLang(item) {
    return item && item.data && item.data.lang === "zh" ? "zh" : "en";
  }
  function stripHtml(value) {
    return String(value || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  function readableDate(value) {
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(date);
  }
  function isoDate(value) {
    if (!value) {
      return "";
    }
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString();
  }
  function absoluteUrl(path, siteUrl) {
    const base = String(siteUrl || "").replace(/\/$/, "");
    if (!path) {
      return base + "/";
    }
    if (/^https?:\/\//i.test(path)) {
      return path;
    }
    return base + (String(path).startsWith("/") ? path : `/${path}`);
  }
  function xmlEscape(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter("isoDate", isoDate);
  eleventyConfig.addFilter("absoluteUrl", absoluteUrl);
  eleventyConfig.addFilter("xmlEscape", xmlEscape);
  eleventyConfig.addFilter("isRecent", function(date, days) {
    const cutoff = new Date(Date.now() - (days || 14) * 24 * 60 * 60 * 1000);
    return (date instanceof Date ? date : new Date(date)) >= cutoff;
  });
  eleventyConfig.addFilter("typeLabel", function(type, lang) {
    const labels = {
      en: { current: "Current", circuit: "Circuit", practitioner: "Practitioner" },
      zh: { current: "流", circuit: "回路", practitioner: "修行者" }
    };
    return ((labels[lang] || labels.en)[type]) || type;
  });
  eleventyConfig.addFilter("currencyById", function(items, id) {
    if (!Array.isArray(items) || !id) {
      return null;
    }
    return items.find((item) => item.data && item.data.currencyId === id) || null;
  });
  eleventyConfig.addFilter("currencyByIdForLang", function(items, id, lang) {
    if (!Array.isArray(items) || !id) {
      return null;
    }
    const requestedLang = lang === "zh" ? "zh" : "en";
    return items.find((item) => item.data && item.data.currencyId === id && itemLang(item) === requestedLang)
      || items.find((item) => item.data && item.data.currencyId === id && itemLang(item) === "en")
      || items.find((item) => item.data && item.data.currencyId === id)
      || null;
  });
  eleventyConfig.addFilter("currencyCounterpart", function(items, id, lang) {
    if (!Array.isArray(items) || !id) {
      return null;
    }
    const targetLang = lang === "zh" ? "en" : "zh";
    return items.find((item) => item.data && item.data.currencyId === id && itemLang(item) === targetLang) || null;
  });
  eleventyConfig.addFilter("currencyBacklinks", function(items, id, lang) {
    if (!Array.isArray(items) || !id) {
      return [];
    }
    const requestedLang = lang === "zh" ? "zh" : "en";
    return newestFirst(items.filter((item) => {
      if (!item.data || item.data.currencyId === id || itemLang(item) !== requestedLang) {
        return false;
      }
      return Array.isArray(item.data.links) && item.data.links.some((link) => link && link.id === id);
    }));
  });
  eleventyConfig.addFilter("missingCounterpartCount", function(items, lang) {
    if (!Array.isArray(items)) {
      return 0;
    }
    const sourceLang = lang === "zh" ? "zh" : "en";
    const targetLang = sourceLang === "zh" ? "en" : "zh";
    const ids = new Set(items
      .filter((item) => item && item.data && itemLang(item) === targetLang)
      .map((item) => item.data.currencyId));
    return items.filter((item) => {
      return item && item.data && itemLang(item) === sourceLang && !ids.has(item.data.currencyId);
    }).length;
  });
  eleventyConfig.addFilter("externalLinks", function(html) {
    const links = [];
    const seen = new Set();
    const source = String(html || "");
    const pattern = /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = pattern.exec(source)) !== null) {
      const url = match[1];
      if (seen.has(url)) {
        continue;
      }
      seen.add(url);
      links.push({
        url,
        label: stripHtml(match[2]) || url.replace(/^https?:\/\//, "")
      });
    }
    return links;
  });
  eleventyConfig.addFilter("linkCurrencyRefs", function(html, items) {
    if (!Array.isArray(items) || !html) {
      return html || "";
    }
    const byId = new Map(items
      .filter((item) => item && item.data && item.data.currencyId && itemLang(item) === "en")
      .map((item) => [item.data.currencyId, item]));
    const replaceRef = (id, label) => {
      const item = byId.get(id);
      if (!item) {
        return label;
      }
      return `<a href="${item.url}">${label}</a>`;
    };

    return String(html).replace(/(<a\b[\s\S]*?<\/a>)|<code>([a-z0-9][a-z0-9-]+)<\/code>|\[([a-z0-9][a-z0-9-]+)\]|\(([a-z0-9][a-z0-9-]+)\)/g, (match, anchor, codeId, bracketId, parenId) => {
      if (anchor) {
        return anchor;
      }
      if (codeId) {
        return `<code>${replaceRef(codeId, codeId)}</code>`;
      }
      if (bracketId) {
        return replaceRef(bracketId, bracketId);
      }
      if (parenId) {
        return `(${replaceRef(parenId, parenId)})`;
      }
      return match;
    });
  });
  eleventyConfig.addFilter("compactText", stripHtml);
  eleventyConfig.addFilter("startsWith", function(value, prefix) {
    return String(value || "").startsWith(prefix);
  });
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/site.webmanifest": "site.webmanifest" });

  eleventyConfig.addCollection("publicPages", function(collectionApi) {
    return collectionApi.getAll().filter((item) => {
      if (!item || !item.url || item.data.eleventyExcludeFromCollections) {
        return false;
      }
      if (item.url.endsWith(".json") || item.url.endsWith(".xml") || item.url.endsWith(".txt")) {
        return false;
      }
      return true;
    });
  });

  eleventyConfig.addCollection("currency", function(collectionApi) {
    const items = collectionApi.getFilteredByTag("currency").filter(item => item.data.lang !== "zh");
    return newestFirst(items);
  });

  eleventyConfig.addCollection("allCurrency", function(collectionApi) {
    return newestFirst(collectionApi.getFilteredByTag("currency"));
  });

  eleventyConfig.addCollection("currents", function(collectionApi) {
    const items = collectionApi.getFilteredByTag("currency").filter((item) => {
      return item.data.currencyType === "current" && item.data.lang !== "zh";
    });
    return newestFirst(items);
  });

  eleventyConfig.addCollection("circuits", function(collectionApi) {
    const items = collectionApi.getFilteredByTag("currency").filter((item) => {
      return item.data.currencyType === "circuit" && item.data.lang !== "zh";
    });
    return newestFirst(items);
  });

  eleventyConfig.addCollection("practitioners", function(collectionApi) {
    const items = collectionApi.getFilteredByTag("currency").filter((item) => {
      return item.data.currencyType === "practitioner" && item.data.lang !== "zh";
    });
    return newestFirst(items);
  });

  // Perspective digests
  eleventyConfig.addCollection("perspective", function(collectionApi) {
    return newestFirst(collectionApi.getFilteredByGlob("src/perspective/*.md"));
  });

  // Latest entries — all types, English only, newest frontmatter date first, max 12.
  // Avoid a moving cutoff so the homepage never quietly goes stale or empty.
  eleventyConfig.addCollection("recentCurrency", function(collectionApi) {
    return newestFirst(
      collectionApi.getFilteredByTag("currency").filter(item => item.data.lang !== "zh")
    ).slice(0, 12);
  });

  // Chinese (zh) collections — entries with lang: zh
  eleventyConfig.addCollection("zh_currency", function(collectionApi) {
    return newestFirst(collectionApi.getFilteredByTag("currency").filter(item => item.data.lang === "zh"));
  });

  eleventyConfig.addCollection("zh_currents", function(collectionApi) {
    return newestFirst(collectionApi.getFilteredByTag("currency").filter(item =>
      item.data.currencyType === "current" && item.data.lang === "zh"
    ));
  });

  eleventyConfig.addCollection("zh_circuits", function(collectionApi) {
    return newestFirst(collectionApi.getFilteredByTag("currency").filter(item =>
      item.data.currencyType === "circuit" && item.data.lang === "zh"
    ));
  });

  eleventyConfig.addCollection("zh_practitioners", function(collectionApi) {
    return newestFirst(collectionApi.getFilteredByTag("currency").filter(item =>
      item.data.currencyType === "practitioner" && item.data.lang === "zh"
    ));
  });

  // Latest zh entries — all types, newest frontmatter date first, max 12.
  eleventyConfig.addCollection("zh_recentCurrency", function(collectionApi) {
    return newestFirst(
      collectionApi.getFilteredByTag("currency").filter(item => item.data.lang === "zh")
    ).slice(0, 12);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
