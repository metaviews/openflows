module.exports = class LlmsTemplate {
  data() {
    return {
      permalink: "/llms.txt",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const en = data.collections.currency.length;
    const zh = data.collections.zh_currency.length;
    const circuits = data.collections.circuits.length;
    const practitioners = data.collections.practitioners.length;

    return `# Openflows

Openflows is a public, bilingual knowledge base documenting the open source AI ecosystem. It tracks Currents, Circuits, and Practitioners, with Peng as a human-reviewed agentic maintenance system.

## Scope

- English entries: ${en}
- Chinese entries: ${zh}
- Circuits: ${circuits}
- Practitioners: ${practitioners}
- Canonical site: https://openflows.org/

## Primary Human Pages

- Home: https://openflows.org/
- Chinese home: https://openflows.org/zh/
- Currency browser: https://openflows.org/currency/
- Currents: https://openflows.org/currency/currents/
- Circuits: https://openflows.org/currency/circuits/
- Practitioners: https://openflows.org/currency/practitioners/
- Perspective digests: https://openflows.org/perspective/
- Method: https://openflows.org/methods/
- System: https://openflows.org/system/

## Machine-Readable Resources

- Full knowledge manifest: https://openflows.org/knowledge-manifest.json
- Compact search index: https://openflows.org/currency/search-index.json
- RSS feed: https://openflows.org/currency/feed.xml
- JSON feed: https://openflows.org/currency/feed.json
- Sitemap: https://openflows.org/sitemap.xml

## Use Guidance

The site is public and crawlable. Entries are human-reviewed but may include machine-assisted mediation notes where Peng or other AI tooling materially shaped an artifact. Treat Openflows as a map of signals and relationships, not as final authority. Follow source links and last-reviewed metadata when precision matters.
`;
  }
};
