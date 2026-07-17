import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const config = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^\s*(VITE_FIREBASE_\w+)\s*=\s*(.*)\s*$/);
  if (match) {
    const rawKey = match[1].replace('VITE_FIREBASE_', '').toLowerCase();
    const key = rawKey.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    config[key] = match[2].trim();
  }
});

const app = initializeApp(config);
const db = getFirestore(app);

async function run() {
  try {
    const treatmentsCol = 'treatments';
    const docId = 'general-surgery_piles-laser-stapled-surgery';

    console.log(`\nVerifying new treatment in Firestore...`);

    const docRef = doc(db, treatmentsCol, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(`✅ SUCCESS: Document "${docId}" exists in Firestore.`);
      console.log('Treatment Document Data:', JSON.stringify(docSnap.data(), null, 2));
    } else {
      console.error(`❌ ERROR: Document "${docId}" does not exist in Firestore!`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

run();
