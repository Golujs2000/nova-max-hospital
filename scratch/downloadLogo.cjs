const fs = require('fs');
const path = require('path');
const axios = require('axios');

const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/nova-max-hospital.firebasestorage.app/o/gallery%2F1781112389949_logo%20(2).webp?alt=media&token=8b2be672-f9b4-4d74-bbfe-d7a0fd2b7b0a';

const destPaths = [
  path.join(__dirname, '..', 'public', 'favicon.png'),
  path.join(__dirname, '..', 'public', 'logo.png'),
  path.join(__dirname, '..', 'src', 'assets', 'logo.png')
];

async function downloadLogo() {
  try {
    console.log('Downloading logo from:', imageUrl);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    for (const destPath of destPaths) {
      fs.writeFileSync(destPath, buffer);
      console.log('Successfully wrote to:', destPath);
    }
    console.log('All files overwritten successfully!');
  } catch (error) {
    console.error('Failed to download logo:', error.message);
    process.exit(1);
  }
}

downloadLogo();
