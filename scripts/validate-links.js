const { readFileSync, readdirSync, statSync } = require('fs');
const { join, relative } = require('path');
const yaml = require('../server/node_modules/js-yaml');

const root = join(__dirname, '..');
const srcDir = join(root, 'src', 'currency');

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, acc);
    } else if (name.endsWith('.md')) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function parseFrontmatter(content, filePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  try {
    return yaml.load(match[1]) || {};
  } catch (err) {
    throw new Error(`Could not parse frontmatter in ${relative(root, filePath)}: ${err.message}`);
  }
}

function main() {
  const files = walk(srcDir);
  const ids = new Set();

  for (const file of files) {
    const frontmatter = parseFrontmatter(readFileSync(file, 'utf8'), file);
    if (frontmatter.currencyId) ids.add(frontmatter.currencyId);
  }

  const missing = [];
  for (const file of files) {
    const frontmatter = parseFrontmatter(readFileSync(file, 'utf8'), file);
    for (const link of frontmatter.links || []) {
      if (!link || !link.id) continue;
      if (!ids.has(link.id)) {
        missing.push(`${relative(root, file)} -> ${link.id}`);
      }
    }
  }

  if (missing.length) {
    console.error('Broken currency links found:');
    for (const line of missing) console.error(`  ${line}`);
    process.exit(1);
  }

  console.log(`Currency links valid: ${ids.size} ids checked across ${files.length} files.`);
}

main();
