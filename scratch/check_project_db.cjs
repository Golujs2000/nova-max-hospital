const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Load environment variables from .env
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

console.log('Firebase config loaded:', { ...config, apiKey: '***' });

const app = initializeApp(config);
const db = getFirestore(app);

const collections = [
  'doctors',
  'hospitalServices',
  'hospitalDepartments',
  'surgicalServices',
  'criticalCare',
  'patientFacilities',
  'diagnostics',
  'treatments',
  'settings'
];

async function run() {
  for (const colName of collections) {
    try {
      const snap = await getDocs(collection(db, colName));
      console.log(`Collection "${colName}" has ${snap.size} documents.`);
      if (snap.size > 0 && colName === 'settings') {
        snap.forEach(d => console.log('  -', d.id, d.data()));
      } else if (snap.size > 0 && colName === 'doctors') {
        snap.forEach(d => console.log('  -', d.id, d.data().name));
      }
    } catch (err) {
      console.error(`Error reading "${colName}":`, err.message);
    }
  }
}

run().catch(console.error);
