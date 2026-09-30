const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (/\.(ts|tsx|js)$/.test(file)) {
      results.push(full);
    }
  }
  return results;
}

const files = getFiles('.');
console.log(`Checking ${files.length} source files for import accuracy...`);
let errorCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const importLines = content.split('\n').filter(l => l.includes('from ') || l.includes('import('));
  for (const line of importLines) {
    const match = line.match(/['"](@\/[^'"]+|\.[^'"]+)['"]/);
    if (!match) continue;
    const req = match[1];
    let resolved;
    if (req.startsWith('@/')) {
      resolved = path.resolve('.', req.slice(2));
    } else {
      resolved = path.resolve(path.dirname(file), req);
    }

    const exts = ['', '.ts', '.tsx', '.js', '.json', '/index.ts', '/index.tsx', '/index.js'];
    const found = exts.some(ext => fs.existsSync(resolved + ext));
    if (!found) {
      console.error(`❌ Broken import in ${file}: "${req}"`);
      errorCount++;
    }
  }
}

if (errorCount === 0) {
  console.log('✅ All imports verified successfully!');
} else {
  console.error(`Found ${errorCount} broken imports.`);
  process.exit(1);
}
