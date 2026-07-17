import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, getDoc, serverTimestamp } from 'firebase/firestore';

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

console.log('Firebase config loaded:', { ...config, apiKey: '***' });

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

async function run() {
  try {
    const adminEmail = 'bootstrap_admin@novamax.com';
    const adminPassword = 'AdminPassword123!';
    let user;

    console.log(`\nAttempting to authenticate admin: ${adminEmail}...`);
    try {
      const cred = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      user = cred.user;
      console.log('Created new auth user.');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        const cred = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        user = cred.user;
        console.log('Signed in existing auth user.');
      } else {
        throw err;
      }
    }

    const treatmentsCol = 'treatments';
    const oldDocId = 'urology_bladder-stone-removal';
    const newDocId = 'urology_uti-bladder-hydrocele-care';

    // 1. Delete old document
    console.log(`Checking if old treatment document "${oldDocId}" exists...`);
    const oldDocRef = doc(db, treatmentsCol, oldDocId);
    const oldDocSnap = await getDoc(oldDocRef);

    if (oldDocSnap.exists()) {
      console.log(`Old document found. Deleting "${oldDocId}"...`);
      await deleteDoc(oldDocRef);
      console.log('Deleted old document.');
    } else {
      console.log('Old document does not exist, skipping deletion.');
    }

    // 2. Set new document
    console.log(`Creating/Setting new treatment document "${newDocId}"...`);
    const newDocRef = doc(db, treatmentsCol, newDocId);
    const treatmentData = {
      name: 'UTI, Bladder & Hydrocele Care',
      slug: 'uti-bladder-hydrocele-care',
      duration: '30 – 60 mins',
      recovery: '1 – 5 days',
      description: 'Comprehensive diagnostic and surgical solutions for painful UTIs, bladder disorders, and daycare hydrocele treatments.',
      longDescription: 'Our specialized UTI, Bladder & Hydrocele Care program provides comprehensive, state-of-the-art diagnostic and therapeutic management for a wide spectrum of urological and scrotal conditions. Urinary Tract Infections (UTIs), if left untreated or improperly managed, can lead to recurrent bladder inflammation (cystitis) or ascend to cause severe kidney damage. We utilize precise, culture-guided antimicrobial therapies, advanced diagnostic cystoscopy, and ultrasound imaging to pinpoint the exact root causes of recurrent UTIs and chronic bladder dysfunction. For patients suffering from bladder conditions (such as interstitial cystitis, bladder stones, and neurogenic bladder), our department offers highly effective medical and endoscopic interventions, including laser cystolitholapaxy to safely disintegrate stones without open cuts. Concurrently, our daycare surgical division specializes in advanced, minimal-access hydrocele surgery (hydrocelectomy) to treat fluid accumulation in the scrotum. This minimally invasive procedure involves making a tiny incision to drain the fluid and excise or plicate the hydrocele sac, ensuring zero recurrence, clean cosmetic healing, minimal post-operative swelling, and the convenience of same-day discharge. By combining advanced clinical protocols with patient-centric care, we deliver rapid relief, prevent future complications, and help patients return to their daily routines within a few days with fully restored comfort and confidence.',
      indications: [
        'Recurrent or painful urinary tract infections (UTIs)',
        'Bladder discomfort, pressure, or stones',
        'Scrotal swelling, heaviness, or pain (Hydrocele)',
        'Difficulty or pain during urination'
      ],
      benefits: [
        'Effective symptom relief and infection clearance',
        'Minimally invasive daycare procedures',
        'Improved bladder and urological health',
        'Fast recovery with minimal discomfort'
      ],
      preparation: [
        'For UTIs, bring a fresh mid-stream urine sample',
        'For surgeries (like hydrocelectomy or bladder procedures), fast for 6-8 hours',
        'Report all current medications to your urologist',
        'Wear loose, comfortable clothing'
      ],
      parentId: 'urology',
      parentCollection: 'surgicalServices',
      createdAt: serverTimestamp(),
      faqs: [
        { 
          question: 'How long does a UTI take to clear up with treatment?', 
          answer: 'With the correct course of antibiotics prescribed after a urine culture check, symptoms of a urinary tract infection (UTI) typically start improving within 24 to 48 hours.' 
        },
        { 
          question: 'Is hydrocele surgery a daycare procedure, and does it recur?', 
          answer: 'Yes, modern minimal-access hydrocele surgery (hydrocelectomy) is a safe daycare procedure, allowing patients to return home the same day. With advanced surgical excision or plication of the sac, the recurrence rate is extremely low.' 
        }
      ]
    };

    await setDoc(newDocRef, treatmentData);
    console.log(`Successfully created/updated treatment "${newDocId}" in the database!`);

    console.log('\n=======================================');
    console.log('✅ DATABASE TRANSACTION COMPLETED SUCCESSFULLY!');
    console.log('=======================================');
    process.exit(0);
  } catch (error) {
    console.error('Database update failed:', error);
    process.exit(1);
  }
}

run();
