module.exports = function(eleventyConfig) {
  function newestFirst(items) {
    return [...items].sort((a, b) => b.date - a.date);
  }
  function readableDate(value) {
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(date);
  }

  eleventyConfig.addFilter("readableDate", readableDate);
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
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("currency", function(collectionApi) {
    const items = collectionApi.getFilteredByTag("currency").filter(item => item.data.lang !== "zh");
    return newestFirst(items);
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

  // Recent entries — last 14 days, all types, English only, newest first, max 12
  eleventyConfig.addCollection("recentCurrency", function(collectionApi) {
    const cutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    return newestFirst(
      collectionApi.getFilteredByTag("currency").filter(item =>
        item.data.lang !== "zh" && (item.date instanceof Date ? item.date : new Date(item.date)) >= cutoff
      )
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

  // Recent zh entries — last 14 days, all types, newest first, max 12
  eleventyConfig.addCollection("zh_recentCurrency", function(collectionApi) {
    const cutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    return newestFirst(
      collectionApi.getFilteredByTag("currency").filter(item =>
        item.data.lang === "zh" && (item.date instanceof Date ? item.date : new Date(item.date)) >= cutoff
      )
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
