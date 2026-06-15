const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'seed', 'laproStoneSpecialities.js');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  console.log('Original content length:', content.length);

  // Count matches
  const matchCount = (content.match(/06124502164/g) || []).length;
  console.log(`Found ${matchCount} occurrences of 06124502164`);

  if (matchCount > 0) {
    // Replace all occurrences of 06124502164 with 9334097925
    content = content.replace(/06124502164/g, '9334097925');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated file.');
  } else {
    console.log('No occurrences found to update.');
  }
} catch (err) {
  console.error('Error:', err);
}
