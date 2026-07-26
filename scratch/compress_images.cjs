const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Install sharp if not present
try {
  require.resolve('sharp');
  console.log('sharp is already installed.');
} catch (e) {
  console.log('Installing sharp...');
  execSync('npm install -D sharp --legacy-peer-deps', { stdio: 'inherit' });
}

const sharp = require('sharp');

async function compressPng(filePath) {
  const tempPath = filePath + '.temp';
  console.log(`Compressing ${filePath}...`);
  const initialSize = fs.statSync(filePath).size;
  
  await sharp(filePath)
    .png({ quality: 80, compressionLevel: 9, palette: true })
    .toFile(tempPath);
    
  fs.unlinkSync(filePath);
  fs.renameSync(tempPath, filePath);
  
  const finalSize = fs.statSync(filePath).size;
  const savings = ((initialSize - finalSize) / 1024).toFixed(1);
  console.log(`  -> Size reduced from ${(initialSize / 1024).toFixed(1)} KB to ${(finalSize / 1024).toFixed(1)} KB (Saved ${savings} KB)`);
}

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  const filesToCompress = [
    path.join(publicDir, 'logo.png'),
    path.join(publicDir, 'favicon.png'),
    path.join(publicDir, 'gallery', 'DR. M.K. SINHA.png'),
    path.join(publicDir, 'gallery', 'NOVA MAX HOSPITAL.png'),
    path.join(publicDir, 'Infrastructure', 'dr-mk-sinha-portrait.png'),
    path.join(publicDir, 'Infrastructure', 'nova-max-hospital-building.png')
  ];

  for (const file of filesToCompress) {
    if (fs.existsSync(file)) {
      try {
        await compressPng(file);
      } catch (err) {
        console.error(`Failed to compress ${file}:`, err.message);
      }
    } else {
      console.log(`File not found: ${file}`);
    }
  }

  console.log('\nImage compression completed successfully!');
}

run().catch(console.error);
