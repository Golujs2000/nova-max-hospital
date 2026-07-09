import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

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

// Primary app for old bootstrap admin (JJbyIWN7GkhvZCeMeegUmCRy4UF2)
const app1 = initializeApp(config, 'Primary');
const auth1 = getAuth(app1);
const db1 = getFirestore(app1);

// Secondary app to register/log in new admin
const app2 = initializeApp(config, 'Secondary');
const auth2 = getAuth(app2);

const BOOTSTRAP_EMAIL = 'bootstrap_admin@novamax.com';
const BOOTSTRAP_PASS = 'AdminPassword123!';

const NEW_EMAIL = 'surgmrityunjay@yahoo.co.in';
const NEW_NAME = 'Admin';
const NEW_PASS = 'Adminpass3#';

async function run() {
  try {
    // 1. Sign in as the old bootstrap admin
    console.log(`Signing in as old bootstrap admin (${BOOTSTRAP_EMAIL})...`);
    const cred1 = await signInWithEmailAndPassword(auth1, BOOTSTRAP_EMAIL, BOOTSTRAP_PASS);
    const oldUid = cred1.user.uid;
    console.log(`Logged in old admin. UID: ${oldUid}`);

    // 2. Create the new official admin account
    let newUid;
    console.log(`Creating new admin account (${NEW_EMAIL})...`);
    try {
      const cred2 = await createUserWithEmailAndPassword(auth2, NEW_EMAIL, NEW_PASS);
      newUid = cred2.user.uid;
      console.log(`Successfully created new auth user. UID: ${newUid}`);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.log(`Email ${NEW_EMAIL} already exists in Firebase Auth. Signing in instead...`);
        const cred2 = await signInWithEmailAndPassword(auth2, NEW_EMAIL, NEW_PASS);
        newUid = cred2.user.uid;
        console.log(`Logged in existing user. UID: ${newUid}`);
      } else {
        throw err;
      }
    }

    // 3. Write the new admin document in the staff collection using auth1 (active admin)
    console.log(`Writing staff document for new admin (${NEW_NAME}, UID: ${newUid})...`);
    const newStaffRef = doc(db1, 'staff', newUid);
    await setDoc(newStaffRef, {
      name: NEW_NAME,
      email: NEW_EMAIL,
      role: 'admin',
      updatedAt: serverTimestamp()
    }, { merge: true });
    console.log('Successfully created new admin staff record in Firestore!');

    // 4. Delete the old bootstrap admin document from Firestore (JJbyIWN7GkhvZCeMeegUmCRy4UF2)
    if (oldUid !== newUid) {
      console.log(`Revoking roles for old bootstrap admin (${oldUid}) by deleting its staff document...`);
      const oldStaffRef = doc(db1, 'staff', oldUid);
      await deleteDoc(oldStaffRef);
      console.log('Successfully deleted old bootstrap admin staff record!');
    }

    console.log('\n=======================================');
    console.log('✅ OFFICIAL ADMIN ACCOUNT CREATION COMPLETE!');
    console.log(`Email: ${NEW_EMAIL}`);
    console.log(`Name: ${NEW_NAME}`);
    console.log(`Password: ${NEW_PASS}`);
    console.log('=======================================');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

run();
