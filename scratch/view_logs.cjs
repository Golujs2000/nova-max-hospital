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
  console.log(`Signing in as admin (${EMAIL})...`);
  await signInWithEmailAndPassword(auth, EMAIL, PASS);
  console.log('Logged in successfully!');

  const snap = await getDocs(collection(db, 'callStats', 'total', 'logs'));
  console.log(`Logs count: ${snap.size}`);
  snap.forEach((doc) => {
    console.log(`Log ID: ${doc.id}`);
    console.log(JSON.stringify(doc.data(), null, 2));
    console.log('-------------------------------');
  });
}

run().catch(console.error);
