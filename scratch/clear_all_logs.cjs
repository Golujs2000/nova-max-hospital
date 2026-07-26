const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, getDocs, doc, deleteDoc } = require('firebase/firestore');

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

  // 1. Clear callStats total logs
  console.log('Fetching all call click logs...');
  const callLogsSnap = await getDocs(collection(db, 'callStats', 'total', 'logs'));
  console.log(`Found ${callLogsSnap.size} call log documents.`);
  for (const docSnap of callLogsSnap.docs) {
    await deleteDoc(doc(db, 'callStats', 'total', 'logs', docSnap.id));
  }
  console.log('Deleted call click logs.');

  // 2. Clear callStats counters
  console.log('Fetching all callStats top-level counter documents...');
  const callStatsSnap = await getDocs(collection(db, 'callStats'));
  console.log(`Found ${callStatsSnap.size} callStats documents.`);
  for (const docSnap of callStatsSnap.docs) {
    await deleteDoc(doc(db, 'callStats', docSnap.id));
  }
  console.log('Deleted callStats counters.');

  // 3. Clear siteStats total logs
  console.log('Fetching all site traffic logs...');
  const siteLogsSnap = await getDocs(collection(db, 'siteStats', 'total', 'logs'));
  console.log(`Found ${siteLogsSnap.size} site traffic log documents.`);
  for (const docSnap of siteLogsSnap.docs) {
    await deleteDoc(doc(db, 'siteStats', 'total', 'logs', docSnap.id));
  }
  console.log('Deleted site traffic logs.');

  // 4. Clear siteStats counters
  console.log('Fetching all siteStats top-level counter documents...');
  const siteStatsSnap = await getDocs(collection(db, 'siteStats'));
  console.log(`Found ${siteStatsSnap.size} siteStats documents.`);
  for (const docSnap of siteStatsSnap.docs) {
    await deleteDoc(doc(db, 'siteStats', docSnap.id));
  }
  console.log('Deleted siteStats counters.');

  console.log('Database logs and statistics cleared successfully!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Error during cleanup:', err);
  process.exit(1);
});
