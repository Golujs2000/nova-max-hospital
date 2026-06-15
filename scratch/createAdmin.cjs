const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Load environment variables from .env
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const config = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^\s*(VITE_FIREBASE_\w+)\s*=\s*(.*)\s*$/);
  if (match) {
    const rawKey = match[1].replace('VITE_FIREBASE_', '').toLowerCase();
    const key = rawKey.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    config[key] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
});

console.log('Firebase config loaded:', { ...config, apiKey: '***' });

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Admin User';

if (!email || !password) {
  console.error('\nUsage: node scratch/createAdmin.cjs <email> <password> [name]\n');
  process.exit(1);
}

async function run() {
  let user;
  try {
    console.log(`Attempting to create user "${email}" in Firebase Auth...`);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    user = cred.user;
    console.log('Auth user created successfully!');
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      console.log('Auth user already exists. Attempting to sign in with provided password...');
      const cred = await signInWithEmailAndPassword(auth, email, password);
      user = cred.user;
      console.log('Signed in successfully!');
    } else {
      throw err;
    }
  }

  console.log(`Writing staff document for UID: ${user.uid} with role: admin...`);
  await setDoc(doc(db, 'staff', user.uid), {
    uid: user.uid,
    name,
    email,
    role: 'admin',
    createdAt: new Date(),
  });
  console.log('✅ Admin staff document created/verified successfully in Firestore!');
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Error bootstrapping admin:', err.message || err);
  process.exit(1);
});
