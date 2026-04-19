const { rmSync, existsSync } = require('fs');
const { join, resolve } = require('path');

const root = resolve(__dirname, '..');
const target = resolve(join(root, '_site'));

if (target !== join(root, '_site')) {
  throw new Error(`Refusing to remove unexpected path: ${target}`);
}

if (existsSync(target)) {
  rmSync(target, { recursive: true, force: true });
}
