const SITE_URL = "https://openflows.org";

module.exports = class BlogFeedTemplate {
  data() {
    return {
      permalink: "/blog/feed.json",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const entries = (data.collections && data.collections.blog) || [];
    const items = entries.map((item) => ({
      id: item.data.blogId || null,
      title: item.data.title || "",
      abstract: item.data.abstract || null,
      topics: item.data.topics || [],
      linkedEntries: item.data.linkedEntries || [],
      date: item.date instanceof Date ? item.date.toISOString() : new Date(item.date).toISOString(),
      path: item.url,
      url: `${SITE_URL}${item.url}`,
      image: item.data.heroImage ? `${SITE_URL}${item.data.heroImage}` : null
    }));

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
