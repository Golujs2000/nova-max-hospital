const fs = require('fs');
const content = fs.readFileSync('src/data/seed/laproStoneSpecialities.js', 'utf8');
const lines = content.split('\n');

let start = -1;
let end = -1;
let braceCount = 0;
let inBiopsy = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes("name: 'Liver Disorders',")) {
    inBiopsy = true;
    start = i;
    // Find the opening brace of the object (usually on previous line or same line)
    while (start > 0 && !lines[start].includes('{')) {
      start--;
    }
    braceCount = 0;
  }
  
  if (inBiopsy) {
    // Count braces to find the end of the object
    const opens = (line.match(/{/g) || []).length;
    const closes = (line.match(/}/g) || []).length;
    braceCount += opens - closes;
    if (braceCount === 0 && opens > 0 || braceCount === 0 && line.trim() === '},') {
      end = i;
      break;
    }
  }
}

console.log(`Liver Biopsy block: start=${start + 1}, end=${end + 1}`);
for (let i = Math.max(0, start - 2); i <= Math.min(lines.length - 1, end + 2); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
