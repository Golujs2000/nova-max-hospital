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

  // 1. Fetch and delete all call click logs
  console.log('Fetching all call click logs...');
  const logsSnap = await getDocs(collection(db, 'callStats', 'total', 'logs'));
  console.log(`Found ${logsSnap.size} call log documents.`);
  
  let deletedLogs = 0;
  for (const docSnap of logsSnap.docs) {
    await deleteDoc(doc(db, 'callStats', 'total', 'logs', docSnap.id));
    deletedLogs++;
  }
  console.log(`Successfully deleted ${deletedLogs} call log documents.`);

  // 2. Fetch and delete all top-level callStats counters
  console.log('Fetching all top-level callStats documents...');
  const statsSnap = await getDocs(collection(db, 'callStats'));
  console.log(`Found ${statsSnap.size} callStats documents.`);

  let deletedStats = 0;
  for (const docSnap of statsSnap.docs) {
    await deleteDoc(doc(db, 'callStats', docSnap.id));
    deletedStats++;
  }
  console.log(`Successfully deleted ${deletedStats} top-level callStats documents.`);

  console.log('Cleanup completed successfully!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Error during cleanup:', err);
  process.exit(1);
});
