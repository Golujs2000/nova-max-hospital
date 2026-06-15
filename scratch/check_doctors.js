import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCg_XRRbvUQ2IDH0hBx2c7-qtmoXYfLxhc",
  authDomain: "nova-max-hospital.firebaseapp.com",
  projectId: "nova-max-hospital",
  storageBucket: "nova-max-hospital.firebasestorage.app",
  messagingSenderId: "804688406174",
  appId: "1:804688406174:web:a0f24f3e505436999bfd8f",
  measurementId: "G-LXS4WK56BS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ALL_COLLECTIONS = [
  'hospitalDepartments',
  'surgicalServices',
  'criticalCare',
  'diagnostics',
  'patientFacilities'
];

async function run() {
  for (const col of ALL_COLLECTIONS) {
    console.log(`=== Collection: ${col} ===`);
    const querySnapshot = await getDocs(collection(db, col));
    querySnapshot.forEach((doc) => {
      console.log(`- ID: ${doc.id}, Name: "${doc.data().name}"`);
    });
  }
}

run().catch(console.error);
