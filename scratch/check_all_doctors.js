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

async function run() {
  const querySnapshot = await getDocs(collection(db, 'doctors'));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`=== Doctor: ${data.name} (ID: ${doc.id}) ===`);
    console.log(`- Specialty (Title): "${data.specialty}"`);
    console.log(`- Specialties (Depts): ${JSON.stringify(data.specialties)}`);
    console.log(`- Specializations (Expertises): ${JSON.stringify(data.specializations)}`);
    console.log(`- Featured: ${data.featured}`);
  });
}

run().catch(console.error);
