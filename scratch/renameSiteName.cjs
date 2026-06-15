const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const directories = [
  path.join(rootDir, 'src', 'components'),
  path.join(rootDir, 'src', 'pages'),
  path.join(rootDir, 'src', 'data'),
  path.join(rootDir, 'src', 'services'),
];

const individualFiles = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'google-business-services.txt'),
];

// Replacements configuration
const replacements = [
  {
    pattern: /Patna\s+Lapro\s+and\s+Stone\s+Healthcare/g,
    replacement: 'Patna Gastro, Lapro and Stone Healthcare'
  },
  {
    pattern: /Patna\s+Lapro\s+&\s+Stone\s+Healthcare/g,
    replacement: 'Patna Gastro, Lapro & Stone Healthcare'
  },
  {
    pattern: /Patna\s+Lapro\s+&\s+Stone/g,
    replacement: 'Patna Gastro, Lapro & Stone'
  },
  {
    pattern: /Patna\s+Lapro\s+and\s+Stone/g,
    replacement: 'Patna Gastro, Lapro and Stone'
  },
  {
    pattern: /Patna\s+Lapro\s+&amp;\s+Stone/g,
    replacement: 'Patna Gastro, Lapro &amp; Stone'
  },
  {
    // Match case-insensitive without hyphens
    pattern: /patna\s+lapro\s+and\s+stone\s+healthcare/gi,
    replacement: 'Patna Gastro, Lapro and Stone Healthcare'
  },
  {
    pattern: /patna\s+lapro\s+&\s+stone\s+healthcare/gi,
    replacement: 'Patna Gastro, Lapro & Stone Healthcare'
  },
  {
    pattern: /patna\s+lapro\s+&\s+stone/gi,
    replacement: 'Patna Gastro, Lapro & Stone'
  },
  {
    pattern: /patna\s+lapro\s+and\s+stone/gi,
    replacement: 'Patna Gastro, Lapro and Stone'
  }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  replacements.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(rootDir, filePath)}`);
  }
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.jsx') || item.endsWith('.json') || item.endsWith('.html') || item.endsWith('.txt'))) {
      processFile(fullPath);
    }
  });
}

console.log('Starting global site rename script...');

// Process directories
directories.forEach((dir) => {
  console.log(`Processing directory: ${path.relative(rootDir, dir)}`);
  processDirectory(dir);
});

// Process individual files
individualFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`Processing file: ${path.relative(rootDir, file)}`);
    processFile(file);
  }
});

console.log('Global site rename completed successfully.');
