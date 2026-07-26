import fs from 'fs';
import path from 'url';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';

// Helper to get dir path in ES Modules
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env variables
const envPath = dirname(__dirname) + '/.env';
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

// 2. Cleaned inlined seed data for blogs and hospital services
const seedBlogs = [
  {
    title: 'Laparoscopic Surgery: What You Need to Know Before Your Procedure',
    slug: 'laparoscopic-surgery-what-to-know',
    excerpt: 'Dr. M.K. Sinha explains how laparoscopic (keyhole) surgery works, its advantages over open surgery, and what patients should expect before, during, and after the procedure.',
    content: `<h2>What is Laparoscopic Surgery?</h2><p>Laparoscopic surgery, also called keyhole surgery or minimally invasive surgery, is a modern surgical technique where operations are performed through small incisions (0.5–1.5 cm) using a camera (laparoscope) and specialized instruments. The surgeon views the operation on a monitor.</p><h2>Advantages Over Open Surgery</h2><ul><li><strong>Smaller incisions</strong> — 3–4 small cuts instead of one large one</li><li><strong>Less pain</strong> after surgery</li><li><strong>Shorter hospital stay</strong> — often go home next day</li><li><strong>Faster recovery</strong> — back to normal in days, not weeks</li><li><strong>Less blood loss</strong> and lower risk of infection</li><li><strong>Better cosmetic result</strong> — minimal scarring</li></ul><h2>Common Laparoscopic Procedures We Perform</h2><ul><li>Gallbladder removal (Cholecystectomy)</li><li>Hernia repair</li><li>Appendix removal (Appendectomy)</li><li>Liver cyst & abscess drainage</li><li>Colectomy (partial bowel removal)</li></ul><h2>What to Expect</h2><p>You will receive general anesthesia. The procedure typically takes 30–90 minutes. Most patients are walking the same evening and discharged the next morning. Full recovery takes 1–2 weeks compared to 4–6 weeks for open surgery.</p><p>Book a consultation at Nova Max Hospital, Opposite Women's ITI, Digha, Patna. Call: <strong>072505 20694 / 8252730070</strong>.</p>`,
    author: 'Dr. M.K. Sinha',
    category: 'Laparoscopic Surgery',
    image: '',
    tags: ['laparoscopic surgery', 'keyhole surgery', 'minimally invasive', 'Patna', 'Dr. M.K. Sinha'],
    published: true,
    views: 0,
  },
  {
    title: 'Kidney Stones: When Do You Need Surgery?',
    slug: 'kidney-stones-when-surgery',
    excerpt: 'Dr. M.K. Sinha explains different treatment options for kidney stones — from medical therapy to PCNL and ureteroscopy — and when surgery becomes necessary.',
    content: `<h2>Understanding Kidney Stones</h2><p>Kidney stones (urolithiasis / पथरी) are hard deposits of minerals and salts that form in your kidneys. They can affect any part of the urinary tract — from kidneys to bladder. Passing stones can be extremely painful.</p><h2>When Can Stones Pass Naturally?</h2><p>Stones smaller than 5 mm have a good chance of passing with increased fluids and pain medication. Stones between 5–7 mm may pass with medical expulsive therapy (alpha-blockers). Stones larger than 7–8 mm usually require intervention.</p><h2>Treatment Options</h2><ul><li><strong>Medical Expulsive Therapy</strong> — tablets to relax the ureter and allow stone passage (for small stones)</li><li><strong>ESWL</strong> — Shockwave lithotripsy to break stones externally (for stones 1–2 cm)</li><li><strong>Ureteroscopy + Laser</strong> — telescope passed to break stones in the ureter (gold standard for ureteric stones)</li><li><strong>PCNL</strong> — keyhole surgery for large kidney stones >2 cm</li></ul><h2>When is Surgery Urgently Needed?</h2><ul><li>Stone causing complete kidney obstruction</li><li>Infected blocked kidney (pyelonephritis/urosepsis) — emergency</li><li>Solitary kidney with obstruction</li><li>Severe pain not controlled with medications</li></ul><p>Book a consultation at Nova Max Hospital, Opposite Women's ITI, Digha, Patna. Call: <strong>072505 20694 / 8252730070</strong>.</p>`,
    author: 'Dr. M.K. Sinha',
    category: 'Kidney & Stone',
    image: '',
    tags: ['kidney stones', 'PCNL', 'ureteroscopy', 'stone surgery Patna', 'Dr. M.K. Sinha'],
    published: true,
    views: 0,
  },
  {
    title: 'Jaundice: When Is It a Surgical Emergency?',
    slug: 'jaundice-surgical-emergency',
    excerpt: 'Dr. M.K. Sinha explains the difference between medical and surgical jaundice, red-flag symptoms, and when you need emergency surgery.',
    content: `<h2>What Causes Jaundice?</h2><p>Jaundice (yellowing of skin and eyes) occurs when bilirubin builds up in the blood. It can be due to liver disease (medical jaundice) or blockage of the bile duct (surgical/obstructive jaundice).</p><h2>Surgical Causes of Jaundice</h2><ul><li><strong>CBD Stones</strong> — gallstones blocking the common bile duct</li><li><strong>Cholangitis</strong> — infected bile duct (surgical emergency)</li><li><strong>Carcinoma of bile duct</strong> (Cholangiocarcinoma)</li><li><strong>Carcinoma of pancreatic head</strong> (most common cause of painless jaundice)</li><li><strong>Biliary stricture</strong> — narrowing of bile duct after surgery or injury</li></ul><h2>Red Flag Symptoms Needing Urgent Evaluation</h2><ul><li>Jaundice + High fever + Rigors (Charcot's triad) — Cholangitis emergency</li><li>Rapidly worsening jaundice</li><li>Severe itching with pale stools and dark urine</li><li>Painless progressive jaundice (may indicate cancer)</li></ul><h2>Treatment</h2><p>ERCP (Endoscopic stone removal), laparoscopic surgery, biliary drainage, or surgery depending on the cause. Early evaluation is critical.</p><p>Consult our specialist doctors at Nova Max Hospital, Opposite Women's ITI, Digha, Patna. Call: <strong>072505 20694 / 8252730070</strong>.</p>`,
    author: 'Dr. M.K. Sinha',
    category: 'Jaundice & Liver',
    image: '',
    tags: ['jaundice', 'obstructive jaundice', 'cholangitis', 'ERCP', 'Patna', 'Dr. M.K. Sinha'],
    published: true,
    views: 0,
  },
];

const seedHospitalServices = [
  {
    name: 'OPD Consultation (ओपीडी परामर्श)',
    icon: '🩺',
    category: 'Consultation',
    available: 'OPD Hours',
    description: 'Individual consultation with our experienced consultant physicians and surgeons. Detailed surgical evaluation, diagnostic review, and treatment planning for all general and laparoscopic surgical conditions.',
    relatedSpecialties: ['Laparoscopic Surgery', 'Stone Treatment', 'Liver & Pancreas', 'General Surgery'],
    order: 1,
  },
  {
    name: 'Online Consultation (ऑनलाइन परामर्श)',
    icon: '📱',
    category: 'Consultation',
    available: '24 Hours',
    description: 'Consult with our specialist doctors via video or phone call. Share reports and scans for expert surgical opinion from the comfort of your home.',
    relatedSpecialties: [],
    order: 2,
  },
  {
    name: 'Laparoscopic Surgery (लेप्रोस्कोपिक सर्जरी)',
    icon: '🔬',
    category: 'Surgery',
    available: 'By Appointment',
    description: 'Advanced minimally invasive laparoscopic surgeries — gallbladder, hernia, appendix, liver, and gastrointestinal procedures with minimal pain and fast recovery.',
    relatedSpecialties: ['Laparoscopic Surgery'],
    order: 3,
  },
  {
    name: 'Stone Surgery (पथरी सर्जरी)',
    icon: '🫘',
    category: 'Surgery',
    available: 'OPD & Emergency',
    description: 'Complete stone management — kidney, ureteric, and bladder stones using PCNL, ureteroscopy, laser lithotripsy, and medical therapy.',
    relatedSpecialties: ['Kidney & Ureteric Stone'],
    order: 4,
  },
  {
    name: 'Emergency Surgery (आपातकालीन सर्जरी)',
    icon: '🚑',
    category: 'Emergency',
    available: '24 Hours',
    description: 'Round-the-clock emergency surgical care for acute abdomen, obstructed hernia, appendicitis, intestinal obstruction, and trauma.',
    relatedSpecialties: ['General Surgery', 'Emergency Surgery'],
    order: 5,
  },
  {
    name: 'I.C.U & Indoor Care (आईसीयू और इनडोर सेवा)',
    icon: '🩺',
    category: 'Infrastructure',
    available: '24 × 7',
    description: 'Modern, fully equipped ICU and indoor recovery rooms for complex post-operative monitoring and high-dependency patient care.',
    relatedSpecialties: ['General Surgery', 'Laparoscopic Surgery', 'Stone Treatment'],
    order: 6,
  },
  {
    name: 'ICU Anaesthesia Support (आईसीयू संज्ञाहरण सहायता)',
    icon: '💉',
    category: 'Support',
    available: '24 × 7',
    description: 'ICU critical care and anaesthesia support managed 24/7 by highly qualified anaesthetic doctors to ensure maximum safety.',
    relatedSpecialties: [],
    order: 7,
  },
  {
    name: 'Neurology & Neurosurgery (न्यूरोलॉजी और न्यूरोसर्जरी)',
    icon: '🧠',
    category: 'Department',
    available: 'By Appointment',
    description: 'Outpatient consultations and neuro-trauma management overseen by highly qualified Neurosurgeons and neurophysicians.',
    relatedSpecialties: [],
    order: 8,
  },
];

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
