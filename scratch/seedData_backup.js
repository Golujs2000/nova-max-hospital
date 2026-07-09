// Seed data for Sarvada Hospito Care ÔÇö initial Firestore population
// Run seedFirestore() in browser console after importing

import { db } from '../firebase/config'
import { 
  collection, addDoc, getDocs, deleteDoc, serverTimestamp,
  query, where, updateDoc 
} from 'firebase/firestore'

export const seedDoctors = [
  {
    name: 'Dr. Manmohan Suman',
    specialty: 'Director & Consultant Physician',
    qualification: 'MBBS, MD',
    experience: 21,
    bio: 'Dr. Manmohan Suman (MBBS, MD) is the Director and Senior Consultant Physician at Sarvada Hospito Care. With over 21 years of experience, including work at IGIMS Patna and Safdarjung Hospital New Delhi, he leads our clinical services, specializing in critical care, internal medicine, jaundice, liver, and pancreatic disorders.',
    image: '/doctor-manmohan-suman.png',
    email: 'sarvadahospitocarepatna@gmail.com',
    phone: '7079001600',
    consultationFee: 500,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableTime: '9:00 AM ÔÇô 6:00 PM',
    specialties: [
      'Laparoscopic Surgery',
      'Kidney Stone & Kidney Cancer',
      'Liver Disorders',
      'Pancreas Disorders',
      'Jaundice & Biliary Disorders',
      'General & Gastrointestinal Surgery',
      'Gastro-Intestinal Disorder',
      'Upper G.I. Endoscopy / Colonoscopy',
      'Colorectal Surgeon',
      'Piles, fissure and fistula in Ano',
      'Pancreatic stone',
      'Fissure Laser Surgery',
      'Gall bladder stone',
      'Liver',
      'ERCP ÔÇö for CBD stone',
      'Stomach cancer',
      'Hernia'
    ],
    currentPosition: 'Director & Senior Consultant, Sarvada Hospito Care, Patna',
    previousPosition: 'Ex-Gastro Surgeon, IGIMS, Patna | Ex-Surgeon, VMMC College & Safdarjung Hospital, New Delhi',
    rating: 4.9,
    reviewCount: 350,
    featured: true,
  },
  {
    name: 'Dr. R. K. Prasad',
    specialty: 'Laparoscopic & General Surgeon',
    qualification: 'MBBS, MS',
    experience: 22,
    bio: 'Dr. R. K. Prasad (MBBS, MS) is a senior Laparoscopic and General Surgeon with over 22 years of surgical experience. He specializes in minimally invasive keyhole operations, complex gastrointestinal surgeries, and general surgical procedures, providing compassionate care and advanced treatment.',
    image: '/hospital-staff.png',
    email: 'sarvadahospitocarepatna@gmail.com',
    phone: '7079001600',
    consultationFee: 500,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableTime: '9:00 AM ÔÇô 4:00 PM',
    specialties: [
      'Laparoscopic Surgery',
      'Gallbladder Stone Surgery',
      'Hernia Mesh Repair',
      'Appendectomy',
      'Piles & Fistula Care',
      'General Surgery'
    ],
    currentPosition: 'Sr. Consultant Surgeon, Sarvada Hospito Care, Patna',
    previousPosition: 'Ex-Senior Resident, Indira Gandhi Institute of Medical Sciences (IGIMS), Patna',
    rating: 4.9,
    reviewCount: 420,
    featured: true,
  },
  {
    name: 'Dr. Shalini Priya',
    specialty: 'Consultant Physician',
    qualification: 'MBBS, MD (Internal Medicine)',
    experience: 15,
    bio: 'Dr. Shalini Priya (MBBS, MD) is a highly experienced Consultant Physician specializing in Internal Medicine, critical care management, and long-term diagnostic planning. She has spent over 15 years treating complex systemic conditions and infectious diseases.',
    image: '/hospital-staff.png',
    email: 'sarvadahospitocarepatna@gmail.com',
    phone: '7079001700',
    consultationFee: 500,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableTime: '11:00 AM ÔÇô 6:00 PM',
    specialties: [
      'Internal Medicine',
      'Critical Care Medicine',
      'Jaundice & Liver Disorders',
      'Hypertension & Diabetes Management',
      'Infectious Diseases'
    ],
    currentPosition: 'Consultant Physician, Sarvada Hospito Care, Patna',
    previousPosition: 'Ex-Consultant, Medanta Hospital, Patna',
    rating: 4.8,
    reviewCount: 280,
    featured: true,
  },
]

import { hospitalDepartments } from './seed/hospitalDepartments.js'
import { surgicalServices } from './seed/surgicalServices.js'
import { criticalCare } from './seed/criticalCare.js'
import { diagnostics } from './seed/diagnostics.js'
import { patientFacilities } from './seed/patientFacilities.js'

export const seedBlogs = [
  {
    title: 'Laparoscopic Surgery: What You Need to Know Before Your Procedure',
    slug: 'laparoscopic-surgery-what-to-know',
    excerpt: 'Dr. Manmohan Suman explains how laparoscopic (keyhole) surgery works, its advantages over open surgery, and what patients should expect before, during, and after the procedure.',
    content: `<h2>What is Laparoscopic Surgery?</h2><p>Laparoscopic surgery, also called keyhole surgery or minimally invasive surgery, is a modern surgical technique where operations are performed through small incisions (0.5ÔÇô1.5 cm) using a camera (laparoscope) and specialized instruments. The surgeon views the operation on a monitor.</p><h2>Advantages Over Open Surgery</h2><ul><li><strong>Smaller incisions</strong> ÔÇö 3ÔÇô4 small cuts instead of one large one</li><li><strong>Less pain</strong> after surgery</li><li><strong>Shorter hospital stay</strong> ÔÇö often go home next day</li><li><strong>Faster recovery</strong> ÔÇö back to normal in days, not weeks</li><li><strong>Less blood loss</strong> and lower risk of infection</li><li><strong>Better cosmetic result</strong> ÔÇö minimal scarring</li></ul><h2>Common Laparoscopic Procedures We Perform</h2><ul><li>Gallbladder removal (Cholecystectomy)</li><li>Hernia repair</li><li>Appendix removal (Appendectomy)</li><li>Liver cyst & abscess drainage</li><li>Colectomy (partial bowel removal)</li></ul><h2>What to Expect</h2><p>You will receive general anesthesia. The procedure typically takes 30ÔÇô90 minutes. Most patients are walking the same evening and discharged the next morning. Full recovery takes 1ÔÇô2 weeks compared to 4ÔÇô6 weeks for open surgery.</p><p>Book a consultation at Sarvada Hospito Care, Anand palace, Bypass Rd, changer, Kankarbagh, Patna. Call: <strong>7079001600 / 7079001700</strong>.</p>`,
    author: 'Dr. Manmohan Suman',
    category: 'Laparoscopic Surgery',
    image: '',
    tags: ['laparoscopic surgery', 'keyhole surgery', 'minimally invasive', 'Patna', 'Dr Manmohan Suman'],
    published: true,
    views: 0,
  },
  {
    title: 'Kidney Stones: When Do You Need Surgery?',
    slug: 'kidney-stones-when-surgery',
    excerpt: 'Dr. Manmohan Suman explains different treatment options for kidney stones ÔÇö from medical therapy to PCNL and ureteroscopy ÔÇö and when surgery becomes necessary.',
    content: `<h2>Understanding Kidney Stones</h2><p>Kidney stones (urolithiasis / Óñ¬ÓñÑÓñ░ÓÑÇ) are hard deposits of minerals and salts that form in your kidneys. They can affect any part of the urinary tract ÔÇö from kidneys to bladder. Passing stones can be extremely painful.</p><h2>When Can Stones Pass Naturally?</h2><p>Stones smaller than 5 mm have a good chance of passing with increased fluids and pain medication. Stones between 5ÔÇô7 mm may pass with medical expulsive therapy (alpha-blockers). Stones larger than 7ÔÇô8 mm usually require intervention.</p><h2>Treatment Options</h2><ul><li><strong>Medical Expulsive Therapy</strong> ÔÇö tablets to relax the ureter and allow stone passage (for small stones)</li><li><strong>ESWL</strong> ÔÇö Shockwave lithotripsy to break stones externally (for stones 1ÔÇô2 cm)</li><li><strong>Ureteroscopy + Laser</strong> ÔÇö telescope passed to break stones in the ureter (gold standard for ureteric stones)</li><li><strong>PCNL</strong> ÔÇö keyhole surgery for large kidney stones >2 cm</li></ul><h2>When is Surgery Urgently Needed?</h2><ul><li>Stone causing complete kidney obstruction</li><li>Infected blocked kidney (pyelonephritis/urosepsis) ÔÇö emergency</li><li>Solitary kidney with obstruction</li><li>Severe pain not controlled with medications</li></ul><p>Book a consultation at Sarvada Hospito Care, Kankarbagh, Patna. Call: <strong>7079001600</strong>.</p>`,
    author: 'Dr. Manmohan Suman',
    category: 'Kidney & Stone',
    image: '',
    tags: ['kidney stones', 'PCNL', 'ureteroscopy', 'stone surgery Patna', 'Dr Manmohan Suman'],
    published: true,
    views: 0,
  },
  {
    title: 'Jaundice: When Is It a Surgical Emergency?',
    slug: 'jaundice-surgical-emergency',
    excerpt: 'Dr. Manmohan Suman explains the difference between medical and surgical jaundice, red-flag symptoms, and when you need emergency surgery.',
    content: `<h2>What Causes Jaundice?</h2><p>Jaundice (yellowing of skin and eyes) occurs when bilirubin builds up in the blood. It can be due to liver disease (medical jaundice) or blockage of the bile duct (surgical/obstructive jaundice).</p><h2>Surgical Causes of Jaundice</h2><ul><li><strong>CBD Stones</strong> ÔÇö gallstones blocking the common bile duct</li><li><strong>Cholangitis</strong> ÔÇö infected bile duct (surgical emergency)</li><li><strong>Carcinoma of bile duct</strong> (Cholangiocarcinoma)</li><li><strong>Carcinoma of pancreatic head</strong> (most common cause of painless jaundice)</li><li><strong>Biliary stricture</strong> ÔÇö narrowing of bile duct after surgery or injury</li></ul><h2>Red Flag Symptoms Needing Urgent Evaluation</h2><ul><li>Jaundice + High fever + Rigors (Charcot's triad) ÔÇö Cholangitis emergency</li><li>Rapidly worsening jaundice</li><li>Severe itching with pale stools and dark urine</li><li>Painless progressive jaundice (may indicate cancer)</li></ul><h2>Treatment</h2><p>ERCP (Endoscopic stone removal), laparoscopic surgery, biliary drainage, or surgery depending on the cause. Early evaluation is critical.</p><p>Consult our specialist doctors at Sarvada Hospito Care, Kankarbagh, Patna. Call: <strong>7079001600 / 7079001700</strong>.</p>`,
    author: 'Dr. Manmohan Suman',
    category: 'Jaundice & Liver',
    image: '',
    tags: ['jaundice', 'obstructive jaundice', 'cholangitis', 'ERCP', 'Patna', 'Dr Manmohan Suman'],
    published: true,
    views: 0,
  },
]

export const seedHospitalServices = [
  {
    name: 'OPD Consultation (ÓñôÓñ¬ÓÑÇÓñíÓÑÇ Óñ¬Óñ░Óñ¥Óñ«Óñ░ÓÑìÓñÂ)',
    icon: '­ƒ®║',
    category: 'Consultation',
    available: 'OPD Hours',
    description: 'Individual consultation with our experienced consultant physicians and surgeons. Detailed surgical evaluation, diagnostic review, and treatment planning for all general and laparoscopic surgical conditions.',
    relatedSpecialties: ['Laparoscopic Surgery', 'Stone Treatment', 'Liver & Pancreas', 'General Surgery'],
    order: 1,
  },
  {
    name: 'Online Consultation (ÓñæÓñ¿Óñ▓Óñ¥ÓñçÓñ¿ Óñ¬Óñ░Óñ¥Óñ«Óñ░ÓÑìÓñÂ)',
    icon: '­ƒô▒',
    category: 'Consultation',
    available: '24 Hours',
    description: 'Consult with our specialist doctors via video or phone call. Share reports and scans for expert surgical opinion from the comfort of your home.',
    relatedSpecialties: [],
    order: 2,
  },
  {
    name: 'Laparoscopic Surgery (Óñ▓ÓÑçÓñ¬ÓÑìÓñ░ÓÑïÓñ©ÓÑìÓñòÓÑïÓñ¬Óñ┐Óñò Óñ©Óñ░ÓÑìÓñ£Óñ░ÓÑÇ)',
    icon: '­ƒö¼',
    category: 'Surgery',
    available: 'By Appointment',
    description: 'Advanced minimally invasive laparoscopic surgeries ÔÇö gallbladder, hernia, appendix, liver, and gastrointestinal procedures with minimal pain and fast recovery.',
    relatedSpecialties: ['Laparoscopic Surgery'],
    order: 3,
  },
  {
    name: 'Stone Surgery (Óñ¬ÓñÑÓñ░ÓÑÇ Óñ©Óñ░ÓÑìÓñ£Óñ░ÓÑÇ)',
    icon: '­ƒ½ÿ',
    category: 'Surgery',
    available: 'OPD & Emergency',
    description: 'Complete stone management ÔÇö kidney, ureteric, and bladder stones using PCNL, ureteroscopy, laser lithotripsy, and medical therapy.',
    relatedSpecialties: ['Kidney & Ureteric Stone'],
    order: 4,
  },
  {
    name: 'Emergency Surgery (ÓñåÓñ¬Óñ¥ÓññÓñòÓñ¥Óñ▓ÓÑÇÓñ¿ Óñ©Óñ░ÓÑìÓñ£Óñ░ÓÑÇ)',
    icon: '­ƒÜæ',
    category: 'Emergency',
    available: '24 Hours',
    description: 'Round-the-clock emergency surgical care for acute abdomen, obstructed hernia, appendicitis, intestinal obstruction, and trauma.',
    relatedSpecialties: ['General Surgery', 'Emergency Surgery'],
    order: 5,
  },
  {
    name: 'I.C.U & Indoor Care (ÓñåÓñêÓñ©ÓÑÇÓñ»ÓÑé ÓñöÓñ░ ÓñçÓñ¿ÓñíÓÑïÓñ░ Óñ©ÓÑçÓñÁÓñ¥)',
    icon: '­ƒ®║',
    category: 'Infrastructure',
    available: '24 ├ù 7',
    description: 'Modern, fully equipped ICU and indoor recovery rooms for complex post-operative monitoring and high-dependency patient care.',
    relatedSpecialties: ['General Surgery', 'Laparoscopic Surgery', 'Stone Treatment'],
    order: 6,
  },
  {
    name: 'ICU Anaesthesia Support (ÓñåÓñêÓñ©ÓÑÇÓñ»ÓÑé Óñ©ÓñéÓñ£ÓÑìÓñ×Óñ¥Óñ╣Óñ░Óñú Óñ©Óñ╣Óñ¥Óñ»ÓññÓñ¥)',
    icon: '­ƒÆë',
    category: 'Support',
    available: '24 ├ù 7',
    description: 'ICU critical care and anaesthesia support managed 24/7 by highly qualified anaesthetic doctors to ensure maximum safety.',
    relatedSpecialties: [],
    order: 7,
  },
  {
    name: 'Neurology & Neurosurgery (Óñ¿ÓÑìÓñ»ÓÑéÓñ░ÓÑïÓñ▓ÓÑëÓñ£ÓÑÇ ÓñöÓñ░ Óñ¿ÓÑìÓñ»ÓÑéÓñ░ÓÑïÓñ©Óñ░ÓÑìÓñ£Óñ░ÓÑÇ)',
    icon: '­ƒºá',
    category: 'Department',
    available: 'By Appointment',
    description: 'Outpatient consultations and neuro-trauma management overseen by highly qualified Neurosurgeons and neurophysicians.',
    relatedSpecialties: [],
    order: 8,
  },
]

export async function seedDepartmentsAndServices() {
  console.log('Clearing and seeding 6 new collections...')

  const collections = [
    'hospitalDepartments', 'surgicalServices', 'criticalCare', 
    'patientFacilities', 'diagnostics', 'treatments'
  ]

  // 1. Clear all 6 collections
  for (const col of collections) {
    const snap = await getDocs(collection(db, col))
    await Promise.all(snap.docs.map(d => deleteDoc(d.ref)))
  }

  // 2. Helper to insert categories and extract treatments
  const seedCategory = async (colName, items) => {
    for (const item of items) {
      const { treatments, ...docData } = item
      // add category item
      const docRef = await addDoc(collection(db, colName), { ...docData, createdAt: serverTimestamp() })
      
      // add treatments
      if (Array.isArray(treatments) && treatments.length > 0) {
        for (const t of treatments) {
          await addDoc(collection(db, 'treatments'), {
            ...t,
            parentId: docRef.id,
            parentCollection: colName,
            createdAt: serverTimestamp()
          })
        }
      }
    }
  }

  // 3. Seed data
  await seedCategory('hospitalDepartments', hospitalDepartments)
  await seedCategory('surgicalServices', surgicalServices)
  await seedCategory('criticalCare', criticalCare)
  await seedCategory('diagnostics', diagnostics)
  await seedCategory('patientFacilities', patientFacilities)

  console.log('Ô£à 5 Categories & Treatments seeded!')
}

export async function seedFirestore() {
  try {
    console.log('Seeding doctors...')
    const snapDocs = await getDocs(collection(db, 'doctors'))
    await Promise.all(snapDocs.docs.map(d => deleteDoc(d.ref)))
    for (const doc of seedDoctors) {
      await addDoc(collection(db, 'doctors'), { ...doc, createdAt: serverTimestamp() })
    }

    console.log('Seeding blogs...')
    const snapBlogs = await getDocs(collection(db, 'blogs'))
    await Promise.all(snapBlogs.docs.map(d => deleteDoc(d.ref)))
    for (const blog of seedBlogs) {
      await addDoc(collection(db, 'blogs'), { ...blog, createdAt: serverTimestamp() })
    }

    console.log('Ô£à Seeding complete!')
  } catch (err) {
    console.error('Seeding error:', err)
  }
}

// Non-destructive: push only NEW departments and critical care entries to Firestore.
// Safe to run multiple times ÔÇö checks slug before inserting to avoid duplicates.
export async function seedNewDepts() {
  const newHospitalDepts = hospitalDepartments.filter(d =>
    ['consultant-physician', 'general-physician', 'critical-care-medicine'].includes(d.slug)
  )
  const newCriticalCareEntries = criticalCare.filter(d =>
    ['critical-care-physician-consultation'].includes(d.slug)
  )

  let added = 0
  let skipped = 0

  const pushCategory = async (colName, items) => {
    for (const item of items) {
      const existing = await getDocs(
        query(collection(db, colName), where('slug', '==', item.slug))
      )
      if (!existing.empty) {
        console.log('Skipping existing: ' + item.name)
        skipped++
        continue
      }

      const { treatments, ...docData } = item
      const docRef = await addDoc(collection(db, colName), {
        ...docData,
        createdAt: serverTimestamp(),
      })

      if (Array.isArray(treatments) && treatments.length > 0) {
        for (const t of treatments) {
          await addDoc(collection(db, 'treatments'), {
            ...t,
            parentId: docRef.id,
            parentCollection: colName,
            createdAt: serverTimestamp(),
          })
        }
      }

      console.log('Added: ' + item.name + ' (' + (treatments?.length || 0) + ' treatments)')
      added++
    }
  }

  await pushCategory('hospitalDepartments', newHospitalDepts)
  await pushCategory('criticalCare', newCriticalCareEntries)

  console.log('Done! Added: ' + added + ', Skipped: ' + skipped)
  return { added, skipped }
}
