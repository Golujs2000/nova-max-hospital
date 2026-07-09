import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';

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

// 1. Import dynamic data from current source files
import { siteData, siteDoctors } from '../src/data/siteData.js';
import { siteSpecialties } from '../src/data/hospitalServicesData.js';

// 2. Load and cleanup static assets from seedData_backup.js
const seedBackupPath = path.join(__dirname, 'seedData_backup.js');
let seedBackupCode = fs.readFileSync(seedBackupPath, 'utf8');

// Replace old names in the seed data code
seedBackupCode = seedBackupCode
  .replace(/Sarvada Hospito Care/g, 'Nova Max Hospital')
  .replace(/Dr\. Manmohan Suman/g, 'Dr. M.K. Sinha')
  .replace(/Dr\. R\. K\. Prasad/g, 'Dr. Basant Kumar Sinha')
  .replace(/Dr\. Shalini Priya/g, 'Dr. M.K. Sinha')
  .replace(/sarvadahospitocarepatna@gmail.com/g, 'surgmrityunjay@yahoo.co.in')
  .replace(/7079001600/g, '072505 20694')
  .replace(/7079001700/g, '8252730070');

// Strip imports and exports from the code so we can eval it
let cleanBackupCode = seedBackupCode
  .replace(/import\s+[\s\S]*?from\s+['"].*?['"]/g, '')
  .replace(/\bexport\s+/g, '')
  .replace(/\b(const|let)\s+/g, 'var ');

// Eval cleanBackupCode in a context to extract arrays
let seedBlogs = [];
let seedHospitalServices = [];

const evalContext = {
  seedBlogs: [],
  seedHospitalServices: [],
  db: {},
  collection: () => {},
  getDocs: () => {},
  deleteDoc: () => {},
  addDoc: () => {},
  serverTimestamp: () => {},
};

try {
  const wrappedCode = `
    ${cleanBackupCode}
    evalContext.seedBlogs = seedBlogs;
    evalContext.seedHospitalServices = seedHospitalServices;
  `;
  const runFn = new Function('evalContext', wrappedCode);
  runFn(evalContext);
  seedBlogs = evalContext.seedBlogs;
  seedHospitalServices = evalContext.seedHospitalServices;
} catch (err) {
  console.error('Failed to parse seedData_backup.js:', err);
  process.exit(1);
}

console.log(`Extracted ${seedBlogs.length} blogs and ${seedHospitalServices.length} hospital services.`);

// Category collection map
const CATEGORY_TO_COL = {
  'Hospital Departments': 'hospitalDepartments',
  'Surgical Services': 'surgicalServices',
  'Critical & Emergency Care': 'criticalCare',
  'Patient Care Facilities': 'patientFacilities',
  'Diagnostics': 'diagnostics'
};

async function clearCollection(colName) {
  const colRef = collection(db, colName);
  const snap = await getDocs(colRef);
  console.log(`Clearing ${snap.size} docs from "${colName}"...`);
  await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
}

async function run() {
  try {
    // Authenticate a bootstrap admin user
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

    // Set role in staff collection
    console.log(`Writing staff document for UID: ${user.uid} with role: admin...`);
    await setDoc(doc(db, 'staff', user.uid), {
      uid: user.uid,
      name: 'Bootstrap Admin',
      email: adminEmail,
      role: 'admin',
      createdAt: new Date(),
    });
    console.log('Admin permissions active.');

    // Clear all target collections
    const collectionsToClear = [
      'doctors',
      'hospitalServices',
      'hospitalDepartments',
      'surgicalServices',
      'criticalCare',
      'patientFacilities',
      'diagnostics',
      'treatments',
      'settings',
      'blogs'
    ];
    for (const col of collectionsToClear) {
      await clearCollection(col);
    }

    console.log('\n--- Seeding siteSettings ---');
    const settingsDocRef = doc(db, 'settings', 'siteSettings');
    const settingsData = {
      siteName: siteData.name,
      tagline: siteData.tagline,
      description: siteData.description,
      phone: siteData.contact.phone,
      emergencyPhone: siteData.contact.phone2 || siteData.contact.phone,
      email: siteData.contact.email,
      address: siteData.contact.address,
      facebookUrl: siteData.social.facebook,
      instagramUrl: siteData.social.instagram,
      updatedAt: serverTimestamp()
    };
    await setDoc(settingsDocRef, settingsData);
    console.log('Site settings seeded.');

    console.log('\n--- Seeding Doctors ---');
    for (const d of siteDoctors) {
      const docRef = doc(db, 'doctors', d.id);
      await setDoc(docRef, {
        ...d,
        createdAt: serverTimestamp()
      });
      console.log(`Seeded doctor: ${d.name} (${d.id})`);
    }

    console.log('\n--- Seeding Hospital Services ---');
    for (const hs of seedHospitalServices) {
      // Use clean slug as ID
      const slug = hs.name.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
      const docRef = doc(db, 'hospitalServices', slug);
      await setDoc(docRef, {
        ...hs,
        slug,
        createdAt: serverTimestamp()
      });
      console.log(`Seeded hospital service: ${hs.name}`);
    }

    console.log('\n--- Seeding Specialties and Treatments ---');
    for (const spec of siteSpecialties) {
      const colName = CATEGORY_TO_COL[spec.category] || 'hospitalDepartments';
      const specDocRef = doc(db, colName, spec.id);

      // Separate treatments from specialty data
      const { treatments, ...specData } = spec;

      // Seed specialty
      await setDoc(specDocRef, {
        ...specData,
        createdAt: serverTimestamp()
      });
      console.log(`Seeded specialty: ${spec.name} (${spec.id}) in collection "${colName}"`);

      // Seed treatments
      if (Array.isArray(treatments) && treatments.length > 0) {
        for (const t of treatments) {
          const tDocRef = doc(db, 'treatments', `${spec.id}_${t.slug}`);
          await setDoc(tDocRef, {
            ...t,
            parentId: spec.id,
            parentCollection: colName,
            createdAt: serverTimestamp()
          });
          console.log(`  - Seeded treatment: ${t.name}`);
        }
      }
    }

    console.log('\n--- Seeding Blogs ---');
    for (const blog of seedBlogs) {
      const blogDocRef = doc(db, 'blogs', blog.slug);
      await setDoc(blogDocRef, {
        ...blog,
        createdAt: serverTimestamp()
      });
      console.log(`Seeded blog: ${blog.title}`);
    }

    console.log('\n=======================================');
    console.log('✅ DATABASE SEEDED SUCCESSFULLY!');
    console.log('=======================================');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

run();
