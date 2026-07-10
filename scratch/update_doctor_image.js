import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

const EMAIL = 'surgmrityunjay@yahoo.co.in';
const PASS = 'Adminpass3#';

async function run() {
  try {
    console.log(`Authenticating as ${EMAIL}...`);
    await signInWithEmailAndPassword(auth, EMAIL, PASS);
    console.log('Logged in successfully!');

    console.log('Updating Dr. M.K. Sinha portrait image in Firestore...');
    const docRef = doc(db, 'doctors', 'dr-m-k-sinha');
    await updateDoc(docRef, {
      image: '/Infrastructure/dr-mk-sinha-portrait.png'
    });
    console.log('Successfully updated doctor image to "/Infrastructure/dr-mk-sinha-portrait.png"!');
    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error);
    process.exit(1);
  }
}

run();
