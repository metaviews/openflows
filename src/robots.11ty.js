module.exports = class RobotsTemplate {
  data() {
    return {
      permalink: "/robots.txt",
      eleventyExcludeFromCollections: true
    };
  }

  render() {
    return `User-agent: *
Allow: /

Sitemap: https://openflows.org/sitemap.xml
`;
  }
};
