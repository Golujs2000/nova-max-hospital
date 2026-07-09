import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';

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
const db = getFirestore(app);

const categories = {
  'Hospital Departments': 'hospitalDepartments',
  'Surgical Services': 'surgicalServices',
  'Critical & Emergency Care': 'criticalCare',
  'Patient Care Facilities': 'patientFacilities',
  'Diagnostics': 'diagnostics'
};

async function run() {
  // Get all treatments once
  const treatmentsSnap = await getDocs(collection(db, 'treatments'));
  const treatments = treatmentsSnap.docs.map(d => ({ ...d.data(), id: d.id }));

  for (const [catName, colName] of Object.entries(categories)) {
    console.log(`\n======================================================`);
    console.log(`CATEGORY: ${catName} (Collection: "${colName}")`);
    console.log(`======================================================`);

    const snap = await getDocs(collection(db, colName));
    if (snap.empty) {
      console.log('No documents found.');
      continue;
    }

    const docs = snap.docs.map(d => ({ ...d.data(), id: d.id })).sort((a, b) => (a.order || 0) - (b.order || 0));
    
    docs.forEach((doc, idx) => {
      console.log(`\n${idx + 1}. ${doc.name} (ID: ${doc.id})`);
      console.log(`   - Slug: "${doc.slug}"`);
      console.log(`   - Icon: "${doc.icon}"`);
      console.log(`   - Availability: "${doc.available}"`);
      console.log(`   - Recovery: "${doc.recoveryTime || 'N/A'}"`);
      console.log(`   - Order: ${doc.order}`);
      console.log(`   - Description: "${doc.description}"`);
      
      const related = treatments.filter(t => t.parentId === doc.id);
      console.log(`   - Treatments (${related.length}):`);
      if (related.length === 0) {
        console.log('     None');
      } else {
        related.forEach(t => {
          console.log(`     * ${t.name} (Duration: ${t.duration || 'N/A'}, Recovery: ${t.recovery || 'N/A'})`);
          console.log(`       Desc: "${t.description}"`);
        });
      }
    });
  }
  process.exit(0);
}

run().catch(console.error);
