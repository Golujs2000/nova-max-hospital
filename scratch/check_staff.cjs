const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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
  console.log(`Signing in as new admin (${EMAIL})...`);
  await signInWithEmailAndPassword(auth, EMAIL, PASS);
  console.log('Logged in successfully! Querying staff collection...');

  const snap = await getDocs(collection(db, 'staff'));
  console.log(`Collection "staff" has ${snap.size} documents:`);
  snap.forEach(doc => {
    console.log(`  - ${doc.id}:`, doc.data());
  });
  process.exit(0);
}

run().catch(console.error);
