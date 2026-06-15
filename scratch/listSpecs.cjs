const fs = require('fs');
const content = fs.readFileSync('src/data/seed/laproStoneSpecialities.js', 'utf8');
const lines = content.split('\n');

let currentSpec = null;
let currentSpecStart = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const specMatch = line.match(/^\s*name:\s*['"](.*?)['"],/);
  if (specMatch && line.indexOf('name:') < 20 && !line.includes('treatments:')) {
    // Check if it's a speciality name (not inside treatments)
    // Treatments are nested deeper, so they're indented more
    const indent = line.search(/\S/);
    if (indent === 4) {
      if (currentSpec) {
        console.log(`Speciality: "${currentSpec}" starts at line ${currentSpecStart + 1}`);
      }
      currentSpec = specMatch[1];
      currentSpecStart = i;
    }
  }
}
if (currentSpec) {
  console.log(`Speciality: "${currentSpec}" starts at line ${currentSpecStart + 1}`);
}
console.log(`Total lines: ${lines.length}`);
