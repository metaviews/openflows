const { existsSync, readFileSync, readdirSync, statSync } = require('fs');
const { join, relative } = require('path');

const root = join(__dirname, '..');
const siteDir = join(root, '_site');
const siteUrl = 'https://openflows.org';

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, acc);
    } else if (name.endsWith('.html')) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function urlForHtml(file) {
  const rel = relative(siteDir, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/index\.html$/, '')}`;
}

function fail(errors, message) {
  errors.push(message);
}

function main() {
  const errors = [];
  const required = ['sitemap.xml', 'robots.txt', 'llms.txt', 'knowledge-manifest.json', 'currency/search-index.json', 'favicon.svg', 'site.webmanifest'];

  if (!existsSync(siteDir)) {
    throw new Error('_site does not exist. Run npm run build first.');
  }

  for (const path of required) {
    if (!existsSync(join(siteDir, path))) {
      fail(errors, `Missing ${path}`);
    }
  }

  const sitemap = existsSync(join(siteDir, 'sitemap.xml'))
    ? readFileSync(join(siteDir, 'sitemap.xml'), 'utf8')
    : '';
  const robots = existsSync(join(siteDir, 'robots.txt'))
    ? readFileSync(join(siteDir, 'robots.txt'), 'utf8')
    : '';

  if (robots && !robots.includes(`${siteUrl}/sitemap.xml`)) {
    fail(errors, 'robots.txt does not reference sitemap.xml');
  }

  const htmlFiles = walk(siteDir);
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const url = urlForHtml(file);
    const abs = `${siteUrl}${url}`;
    const label = relative(root, file);

    if (!html.includes('<meta name="description"')) {
      fail(errors, `${label} missing meta description`);
    }
    if (!html.includes(`<link rel="canonical" href="${abs}">`)) {
      fail(errors, `${label} missing canonical ${abs}`);
    }
    if (!html.includes('application/ld+json')) {
      fail(errors, `${label} missing JSON-LD`);
    } else {
      const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
      for (const block of blocks) {
        const json = block
          .replace(/^<script type="application\/ld\+json">/, '')
          .replace(/<\/script>$/, '')
          .trim();
        try {
          JSON.parse(json);
        } catch (err) {
          fail(errors, `${label} has invalid JSON-LD: ${err.message}`);
        }
      }
    }
    if (!/<h1\b/i.test(html)) {
      fail(errors, `${label} missing primary h1`);
    }
    if (!sitemap.includes(`<loc>${abs}</loc>`)) {
      fail(errors, `${label} missing from sitemap`);
    }
  }

  if (errors.length) {
    console.error('SEO validation failed:');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  console.log(`SEO valid: ${htmlFiles.length} HTML pages checked.`);
}

main();
