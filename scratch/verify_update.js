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
    const oldDocId = 'urology_bladder-stone-removal';
    const newDocId = 'urology_uti-bladder-hydrocele-care';

    console.log(`\nVerifying urology treatments in Firestore...`);

    const oldDocRef = doc(db, treatmentsCol, oldDocId);
    const oldDocSnap = await getDoc(oldDocRef);
    if (oldDocSnap.exists()) {
      console.error(`❌ ERROR: Old document "${oldDocId}" still exists!`);
    } else {
      console.log(`✅ SUCCESS: Old document "${oldDocId}" was deleted successfully.`);
    }

    const newDocRef = doc(db, treatmentsCol, newDocId);
    const newDocSnap = await getDoc(newDocRef);
    if (newDocSnap.exists()) {
      console.log(`✅ SUCCESS: New document "${newDocId}" exists.`);
      console.log('Treatment Document Data:', JSON.stringify(newDocSnap.data(), null, 2));
    } else {
      console.error(`❌ ERROR: New document "${newDocId}" does not exist in Firestore!`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

run();
