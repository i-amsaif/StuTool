const fs = require('fs');
const path = require('path');

function searchAllDirs(dir, queries) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.next' || file === 'search.js' || file === 'results.txt') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(searchAllDirs(fullPath, queries));
    } else if (file.match(/\.(ts|tsx|js|jsx)$/)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        for (const query of queries) {
           if (lines[i].toLowerCase().includes(query.toLowerCase())) {
              results.push({ file: fullPath, line: i + 1, query, text: lines[i].trim() });
           }
        }
      }
    }
  }
  return results;
}

const queries = ['alex', 'austin', 'texas', '.edu', 'University of Texas'];
const results = searchAllDirs('.', queries);
fs.writeFileSync('results.txt', JSON.stringify(results, null, 2));
