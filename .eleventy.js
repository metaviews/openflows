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
  eleventyConfig.addFilter("currencyById", function(items, id) {
    if (!Array.isArray(items) || !id) {
      return null;
    }
    return items.find((item) => item.data && item.data.currencyId === id) || null;
  });
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("currency", function(collectionApi) {
    const items = collectionApi.getFilteredByTag("currency");
    return newestFirst(items);
  });

  eleventyConfig.addCollection("currents", function(collectionApi) {
    const items = collectionApi.getFilteredByTag("currency").filter((item) => {
      return item.data.currencyType === "current";
    });
    return newestFirst(items);
  });

  eleventyConfig.addCollection("circuits", function(collectionApi) {
    const items = collectionApi.getFilteredByTag("currency").filter((item) => {
      return item.data.currencyType === "circuit";
    });
    return newestFirst(items);
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
