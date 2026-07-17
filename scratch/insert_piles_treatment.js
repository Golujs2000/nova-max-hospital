import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

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
    const docId = 'general-surgery_piles-laser-stapled-surgery';

    console.log(`Creating/Setting treatment document "${docId}"...`);
    const docRef = doc(db, treatmentsCol, docId);
    const treatmentData = {
      name: 'Piles, Fissure & Fistula (Laser Procedures)',
      slug: 'piles-laser-stapled-surgery',
      duration: '30 – 45 mins',
      recovery: '1 – 3 days',
      description: 'Advanced minimally invasive laser treatments and stapled hemorrhoidopexy for painful piles, fissures, and complex anal fistulas.',
      longDescription: 'Our proctology division offers highly advanced, state-of-the-art laser treatments and minimally invasive solutions for hemorrhoids (piles), anal fissures, and anal fistulas. Standard open surgeries for anorectal disorders often require painful wounds, long hospital stays, and daily dressings. In contrast, our modern laser procedures utilize specialized laser fibers to precisely apply energy: for piles, Laser Hemorrhoidoplasty (LHP) shrinks the hemorrhoidal nodes internally without incisions; for fissures, Lateral Internal Sphincterotomy is performed with high-precision laser energy to relieve painful spasms and promote rapid healing; for fistulas, FiLaC (Fistula Laser Closure) gently seals the fistula tract from the inside, preserving the sphincter muscles and eliminating the risk of fecal incontinence. Performed as daycare procedures under short general or spinal anesthesia, these advanced techniques ensure minimal post-operative pain, zero cuts or stitches, no painful open dressings, and negligible blood loss. Patients are typically discharged within a few hours or the same day, experiencing rapid recovery and returning to their normal activities or desk jobs within 24 to 48 hours with highly successful outcomes.',
      indications: [
        'Grade II, III, and IV internal/external piles (hemorrhoids)',
        'Chronic, painful, or bleeding anal fissures unresponsive to medical management',
        'Simple or complex anal fistulas (fistula-in-ano)',
        'Symptomatic sentinel piles or skin tags'
      ],
      benefits: [
        'No cuts, no stitches, and no painful daily dressings',
        'Daycare procedure with same-day discharge (typically within 4-6 hours)',
        'Significantly reduced post-operative pain and rapid recovery',
        'Sphincter preservation ensuring zero risk of fecal incontinence'
      ],
      preparation: [
        'Fast for 6 to 8 hours before the procedure (NPO status)',
        'A gentle bowel preparation or enema may be administered prior to surgery',
        'Discuss all active medications, especially blood thinners, with the surgeon',
        'Wear loose, comfortable clothing and arrange for an escort to accompany you home'
      ],
      parentId: 'general-surgery',
      parentCollection: 'surgicalServices',
      createdAt: serverTimestamp(),
      faqs: [
        {
          question: 'What is the recovery time for laser piles/fistula surgery?',
          answer: 'Laser treatment is a daycare procedure. Patients are discharged on the same day or the next morning, experience very little pain, and can return to light desk work in 2 to 3 days.'
        },
        {
          question: 'Is laser treatment better than open surgery for fistula or piles?',
          answer: 'Yes. Laser treatments preserve the surrounding sphincter muscles, preventing complications like fecal incontinence, and require no painful open wounds or daily dressings.'
        },
        {
          question: 'How can I prevent piles or fissures from coming back?',
          answer: 'Maintain a high-fiber diet, drink plenty of water, avoid sitting for extended periods, and do not strain during bowel movements.'
        }
      ]
    };

    await setDoc(docRef, treatmentData);
    console.log(`Successfully created/updated treatment "${docId}" in the database!`);

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
