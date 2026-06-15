const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, deleteDoc, serverTimestamp } = require('firebase/firestore');

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

// Parse seedData.js to get seedHospitalServices, seedDoctors, and seedBlogs arrays
const seedDataCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'seedData.js'), 'utf8');

// Strip all import statements and export keywords, and convert const/let to var so they attach to context
let cleanCode = seedDataCode
  .replace(/import\s+[\s\S]*?from\s+['"].*?['"]/g, '')
  .replace(/\bexport\s+/g, '')
  .replace(/\b(const|let)\s+/g, 'var ');

// Run the cleaned code inside an evaluation context to extract the arrays
const context = {
  console,
  exports: {},
  module: { exports: {} }
};
// Add mock variables for the imports we stripped
cleanCode = `
var allSpecialities = [];
var db = {};
var collection = () => {};
var getDocs = () => {};
var deleteDoc = () => {};
var addDoc = () => {};
var serverTimestamp = () => {};
${cleanCode}
exports.seedDoctors = seedDoctors;
exports.seedBlogs = seedBlogs;
exports.seedHospitalServices = seedHospitalServices;
`;

try {
  const vm = require('vm');
  vm.createContext(context);
  vm.runInContext(cleanCode, context);
} catch (err) {
  console.error('Failed to parse seedData.js programmatically:', err);
  process.exit(1);
}

const { seedDoctors, seedBlogs, seedHospitalServices } = context;

console.log('Successfully loaded seed arrays:');
console.log(`- Doctors: ${seedDoctors.length}`);
console.log(`- Blogs: ${seedBlogs.length}`);
console.log(`- Hospital Services: ${seedHospitalServices.length}`);
console.log(`- Specialities: ${laproStoneSpecialities.length}`);

// Seeding function
async function clearAndSeed(colName, items) {
  console.log(`Clearing collection "${colName}"...`);
  const colRef = collection(db, colName);
  const snap = await getDocs(colRef);
  
  // If seeding specialities, preserve the custom uploaded thumbnails
  const preservedThumbnails = {}
  if (colName === 'specialities') {
    snap.docs.forEach((d) => {
      const data = d.data()
      // If the thumbnail is set or the icon is a custom URL (starts with http), preserve them
      if (data.slug && (data.thumbnail || (data.icon && data.icon.startsWith('http')))) {
        preservedThumbnails[data.slug] = {
          icon: data.icon,
          thumbnail: data.thumbnail || '',
        }
      }
    })
  }

  console.log(`Found ${snap.size} documents in "${colName}". Deleting...`);
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
  
  console.log(`Writing ${items.length} documents to "${colName}"...`);
  for (const item of items) {
    const docData = { ...item }
    if (colName === 'specialities' && preservedThumbnails[item.slug]) {
      docData.icon = preservedThumbnails[item.slug].icon
      docData.thumbnail = preservedThumbnails[item.slug].thumbnail
    }
    await addDoc(colRef, { ...docData, createdAt: serverTimestamp() });
  }
  console.log(`Finished seeding "${colName}"!`);
}

async function run() {
  try {
    await clearAndSeed('specialities', laproStoneSpecialities);
    await clearAndSeed('hospitalServices', seedHospitalServices);
    await clearAndSeed('doctors', seedDoctors);
    await clearAndSeed('blogs', seedBlogs);
    console.log('\n=======================================');
    console.log('✅ ALL COLLECTIONS SEEDED SUCCESSFULLY!');
    console.log('=======================================');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

run();
