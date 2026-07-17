import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'google_ads_mega_plan.md');
let content = fs.readFileSync(filePath, 'utf8');

// Regex to capture keywords sections
// Match *   **Phrase Match Keywords**: followed by list items
// Let's do it using a line-by-line parser which is safer than regex.
const lines = content.split('\n');
const output = [];
let inKeywords = false;
let currentKeywords = [];
let keywordType = ''; // 'phrase' or 'exact' or 'brand'

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('*   **Phrase Match Keywords**:') || line.includes('*   **Exact Match Keywords**:') || line.includes('*   **Keywords**:')) {
    // If we were already in a keyword block (shouldn't happen, but safeguard), flush it
    if (inKeywords) {
      output.push(`    \`\`\`text`);
      currentKeywords.forEach(kw => output.push(`    ${kw}`));
      output.push(`    \`\`\``);
      inKeywords = false;
      currentKeywords = [];
    }
    output.push(line);
    inKeywords = true;
    currentKeywords = [];
    continue;
  }

  if (inKeywords) {
    // Check if it's a keyword list item, e.g., "    *   `\"...\"`" or "    *   `[...]`" or "    *   `\"...\"`" or similar
    // We want to extract the content inside backticks.
    const match = line.match(/^\s*\*\s*`([^`]+)`/);
    if (match) {
      currentKeywords.push(match[1]);
      continue;
    } else if (line.trim() === '') {
      // Empty line signals end of block
      output.push(`    \`\`\`text`);
      currentKeywords.forEach(kw => output.push(`    ${kw}`));
      output.push(`    \`\`\``);
      output.push(line);
      inKeywords = false;
      currentKeywords = [];
      continue;
    } else {
      // Other content signals end of block
      output.push(`    \`\`\`text`);
      currentKeywords.forEach(kw => output.push(`    ${kw}`));
      output.push(`    \`\`\``);
      output.push(line);
      inKeywords = false;
      currentKeywords = [];
      continue;
    }
  }

  output.push(line);
}

// Write the final content back
fs.writeFileSync(filePath, output.join('\n'), 'utf8');
console.log('Finished converting keywords lists into code blocks.');
