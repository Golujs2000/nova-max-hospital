const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  getDocs, 
  deleteDoc, 
  updateDoc,
  addDoc,
  query, 
  where, 
  serverTimestamp 
} = require('firebase/firestore');

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

// Initialize Firebase
const app = initializeApp(config);
const db = getFirestore(app);

// Load Specialities from the updated laproStoneSpecialities.js file
const { laproStoneSpecialities } = require('../src/data/seed/laproStoneSpecialities.js');

// Find the unified Jaundice & Biliary Disorders specialty in the local code file
const unifiedSpec = laproStoneSpecialities.find(s => s.slug === 'jaundice-biliary-disorders');

if (!unifiedSpec) {
  console.error('Error: Could not find "jaundice-biliary-disorders" specialty in laproStoneSpecialities.js.');
  process.exit(1);
}

async function run() {
  try {
    const specRef = collection(db, 'specialities');

    // 1. Update/Add the unified Jaundice & Biliary Disorders specialty
    console.log('Searching for "jaundice-biliary-disorders" in Firestore...');
    const qUpdate = query(specRef, where('slug', '==', 'jaundice-biliary-disorders'));
    const snapUpdate = await getDocs(qUpdate);

    let docData = { ...unifiedSpec };

    if (!snapUpdate.empty) {
      const docSnap = snapUpdate.docs[0];
      const existingData = docSnap.data();
      
      // Preserve custom icon or thumbnail if they exist
      if (existingData.thumbnail) {
        docData.thumbnail = existingData.thumbnail;
      }
      if (existingData.icon && existingData.icon.startsWith('http')) {
        docData.icon = existingData.icon;
      }

      console.log(`Found existing document with ID: ${docSnap.id}. Updating...`);
      // Use updateDoc to overwrite all fields with the new definition
      await updateDoc(docSnap.ref, {
        ...docData,
        updatedAt: serverTimestamp()
      });
      console.log('✅ "jaundice-biliary-disorders" updated successfully.');
    } else {
      console.log('No existing document found. Creating new specialty...');
      await addDoc(specRef, {
        ...docData,
        createdAt: serverTimestamp()
      });
      console.log('✅ "jaundice-biliary-disorders" created successfully.');
    }

    // 2. Delete the old Jaundice, Ascites & Biliary Disorder specialty
    console.log('Searching for redundant "jaundice-ascites-biliary" in Firestore...');
    const qDelete = query(specRef, where('slug', '==', 'jaundice-ascites-biliary'));
    const snapDelete = await getDocs(qDelete);

    if (!snapDelete.empty) {
      console.log(`Found redundant specialty. Deleting ${snapDelete.size} document(s)...`);
      await Promise.all(snapDelete.docs.map(d => {
        console.log(`Deleting doc ID: ${d.id}`);
        return deleteDoc(d.ref);
      }));
      console.log('✅ "jaundice-ascites-biliary" removed successfully from Firestore.');
    } else {
      console.log('No redundant "jaundice-ascites-biliary" specialty found in Firestore.');
    }

    console.log('\n=============================================');
    console.log('✅ JAUNDICE SPECIALTIES MERGE SEEDED SUCCESSFULLY!');
    console.log('=============================================');
    process.exit(0);
  } catch (error) {
    console.error('Operation failed:', error);
    process.exit(1);
  }
}

run();
