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
