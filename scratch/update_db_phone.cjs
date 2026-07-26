const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('firebase/firestore');

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

const COLLECTIONS = [
  'doctors',
  'blogs',
  'gallery',
  'galleryFolders',
  'hospitalDepartments',
  'hospitalServices',
  'surgicalServices',
  'criticalCare',
  'patientFacilities',
  'diagnostics',
  'treatments',
  'settings'
];

const OLD_PHONE_REGEX = /072505\s*20694/g;
const NEW_PHONE = '9801927994';

function replacePhoneInVal(val, regex, newPhone) {
  if (typeof val === 'string') {
    if (regex.test(val)) {
      return { changed: true, newVal: val.replace(regex, newPhone) };
    }
  } else if (Array.isArray(val)) {
    let changed = false;
    const newArr = val.map((item) => {
      const res = replacePhoneInVal(item, regex, newPhone);
      if (res.changed) {
        changed = true;
        return res.newVal;
      }
      return item;
    });
    return { changed, newVal: newArr };
  } else if (val !== null && typeof val === 'object') {
    // Avoid modifying Firebase special timestamp or reference classes
    if (val.constructor && (val.constructor.name === 'Timestamp' || val.constructor.name === 'DocumentReference')) {
      return { changed: false, newVal: val };
    }
    let changed = false;
    const newObj = {};
    for (const k in val) {
      if (Object.prototype.hasOwnProperty.call(val, k)) {
        const res = replacePhoneInVal(val[k], regex, newPhone);
        if (res.changed) {
          changed = true;
          newObj[k] = res.newVal;
        } else {
          newObj[k] = val[k];
        }
      }
    }
    return { changed, newVal: newObj };
  }
  return { changed: false, newVal: val };
}

async function run() {
  console.log(`Signing in as admin (${EMAIL})...`);
  await signInWithEmailAndPassword(auth, EMAIL, PASS);
  console.log('Logged in successfully!');

  for (const colName of COLLECTIONS) {
    console.log(`Scanning collection: "${colName}"...`);
    const snap = await getDocs(collection(db, colName));
    
    let updatedInCollection = 0;
    for (const docSnap of snap.docs) {
      const data = docSnap.data();
      const { changed, newVal } = replacePhoneInVal(data, OLD_PHONE_REGEX, NEW_PHONE);
      
      if (changed) {
        const docRef = doc(db, colName, docSnap.id);
        await updateDoc(docRef, newVal);
        console.log(`  -> Updated doc "${docSnap.id}" in "${colName}"`);
        updatedInCollection++;
      }
    }
    console.log(`Finished "${colName}". Updated ${updatedInCollection} documents.`);
  }

  console.log('Database phone number update completed successfully!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Error during database update:', err);
  process.exit(1);
});
