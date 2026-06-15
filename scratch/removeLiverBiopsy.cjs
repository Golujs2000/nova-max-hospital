const fs = require('fs');
const path = require('path');

const specFile = path.join(__dirname, '..', 'src', 'data', 'seed', 'laproStoneSpecialities.js');
let content = fs.readFileSync(specFile, 'utf8');

// 1. Extract the Percutaneous Liver Biopsy treatment block
const biopsyNameAnchor = "name: 'Percutaneous Liver Biopsy',";
const biopsyNameIndex = content.indexOf(biopsyNameAnchor);

if (biopsyNameIndex === -1) {
  console.error('Could not find Percutaneous Liver Biopsy treatment.');
  process.exit(1);
}

// Find the start brace of the treatment object
let startBraceIndex = content.lastIndexOf('{', biopsyNameIndex);
// Find the end brace of the treatment object (taking care of nesting)
let braceCount = 0;
let endBraceIndex = -1;
for (let i = startBraceIndex; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  else if (content[i] === '}') braceCount--;
  
  if (braceCount === 0) {
    endBraceIndex = i;
    break;
  }
}

if (endBraceIndex === -1) {
  console.error('Could not find end of Percutaneous Liver Biopsy treatment object.');
  process.exit(1);
}

const treatmentBlockText = content.substring(startBraceIndex, endBraceIndex + 1);
console.log('Successfully extracted Percutaneous Liver Biopsy treatment block.');

// 2. Remove the Liver Biopsy speciality block (lines 772 to 815)
// Let's find the exact boundaries of "// ── 8. Liver Biopsy ──────────────────────────────────────"
const biopsySpecHeader = "// ── 8. Liver Biopsy ──────────────────────────────────────";
const biopsyHeaderIndex = content.indexOf(biopsySpecHeader);

if (biopsyHeaderIndex === -1) {
  console.error('Could not find Liver Biopsy speciality header.');
  process.exit(1);
}

// Find the start of the next speciality: "// ── 9. Upper G.I. Endoscopy / Colonoscopy (Merged) ─────────"
const nextSpecHeader = "// ── 9. Upper G.I. Endoscopy / Colonoscopy (Merged) ─────────";
const nextHeaderIndex = content.indexOf(nextSpecHeader);

if (nextHeaderIndex === -1) {
  console.error('Could not find next speciality header.');
  process.exit(1);
}

// The block to remove is from the biopsySpecHeader to nextSpecHeader
const biopsySpecBlockText = content.substring(biopsyHeaderIndex, nextHeaderIndex);

// Delete the biopsy block from content
content = content.replace(biopsySpecBlockText, '');
console.log('Successfully removed Liver Biopsy speciality block.');

// 3. Insert the treatment block into Liver Disorders (speciality #3)
// Liver Disorders has name: 'Liver Disorders', and its treatments end right before "// ── 4. Pancreas Disorders"
const pancreasHeader = "// ── 4. Pancreas Disorders";
const pancreasHeaderIndex = content.indexOf(pancreasHeader);

if (pancreasHeaderIndex === -1) {
  console.error('Could not find Pancreas Disorders header.');
  process.exit(1);
}

// Find the treatments closing bracket "    ]," for Liver Disorders right before the Pancreas header
const liverDisordersEndIndex = content.lastIndexOf('    ],', pancreasHeaderIndex);

if (liverDisordersEndIndex === -1) {
  console.error('Could not find end of Liver Disorders treatments array.');
  process.exit(1);
}

// Insert the Percutaneous Liver Biopsy treatment right before the closing bracket of Liver Disorders treatments
// We need to add indentation and a comma
const formattedTreatmentText = `,\n      ${treatmentBlockText.replace(/\n/g, '\n      ')}`;
content = content.substring(0, liverDisordersEndIndex) + formattedTreatmentText + content.substring(liverDisordersEndIndex);
console.log('Successfully inserted Percutaneous Liver Biopsy treatment into Liver Disorders.');

// 4. Update the order number headers and decrement orders of specialities 9-19 to 8-18
// First, update section headers from "// ── 9." to "// ── 8.", etc.
for (let oldNum = 9; oldNum <= 19; oldNum++) {
  const newNum = oldNum - 1;
  const oldHeader = `// ── ${oldNum}.`;
  const newHeader = `// ── ${newNum}.`;
  content = content.replace(oldHeader, newHeader);
}

// Decrement the "order: X," properties
for (let oldOrder = 9; oldOrder <= 19; oldOrder++) {
  const newOrder = oldOrder - 1;
  const oldOrderStr = `order: ${oldOrder},`;
  const newOrderStr = `order: ${newOrder},`;
  content = content.replace(oldOrderStr, newOrderStr);
}
console.log('Successfully updated order numbers and headers.');

fs.writeFileSync(specFile, content, 'utf8');

// 5. Remove 'Liver Biopsy' from siteData.js departments list
const siteDataFile = path.join(__dirname, '..', 'src', 'data', 'siteData.js');
let siteDataContent = fs.readFileSync(siteDataFile, 'utf8');
const biopsyDeptLine = "    'Liver Biopsy',\n";

if (siteDataContent.includes(biopsyDeptLine)) {
  siteDataContent = siteDataContent.replace(biopsyDeptLine, '');
  fs.writeFileSync(siteDataFile, siteDataContent, 'utf8');
  console.log("Successfully removed 'Liver Biopsy' from siteData.js departments list.");
} else {
  console.warn("Could not find 'Liver Biopsy' in siteData.js departments list.");
}

console.log('All changes applied successfully!');
