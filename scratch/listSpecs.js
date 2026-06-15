const fs = require('fs');
const content = fs.readFileSync('src/data/seed/laproStoneSpecialities.js', 'utf8');
const lines = content.split('\n');
let currentSpec = null;
const specs = [];
for (let i = 0; i < lines.length; i++) {
  const specMatch = lines[i].match(/^    name: '(.+)',$/);
  const treatMatch = lines[i].match(/^        name: '(.+)',$/);
  if (specMatch) {
    currentSpec = specMatch[1];
    specs.push({ spec: currentSpec, treatments: [] });
  }
  if (treatMatch && currentSpec) {
    specs[specs.length - 1].treatments.push(treatMatch[1]);
  }
}
specs.forEach((s, idx) => {
  console.log(`\n${idx + 1}. ${s.spec} (${s.treatments.length} treatments)`);
  s.treatments.forEach((t, j) => console.log(`   ${j + 1}. ${t}`));
});
console.log(`\nTotal specialities: ${specs.length}`);
console.log(`Total treatments: ${specs.reduce((a, s) => a + s.treatments.length, 0)}`);
