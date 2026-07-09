import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

const missingTreatments = [
  // 1. Urology
  {
    parentId: 'urology',
    parentCollection: 'surgicalServices',
    name: 'Ureteroscopy (URS) & Laser Lithotripsy',
    slug: 'ureteroscopy-laser-lithotripsy',
    duration: '45 mins',
    recovery: '1 – 2 days',
    description: 'Endoscopic stone fragmentation using advanced Holmium Laser technology.',
    longDescription: 'Ureteroscopy with laser lithotripsy is a highly effective, minimally invasive procedure to treat stones in the ureter or kidney. A thin, semi-rigid or flexible scope is passed through the natural urinary passage (no cuts are made on the body), and a laser fiber is used to break the stone into tiny dust-like particles which are then washed out.',
    indications: ['Ureteric stones causing severe obstruction', 'Stones failed by medical therapy', 'Persistent pain or infection'],
    benefits: ['100% blade-free procedure', 'Same-day discharge (daycare)', 'Rapid recovery and minimal post-op pain'],
    preparation: ['Fasting for 6 hours', 'Sterile urine culture verification', 'Routine blood counts']
  },
  {
    parentId: 'urology',
    parentCollection: 'surgicalServices',
    name: 'Renal Colic Management (Emergency)',
    slug: 'renal-colic-management',
    duration: '30 mins',
    recovery: 'Immediate',
    description: 'Rapid emergency pain relief and diagnostic workup for acute kidney stone pain.',
    longDescription: 'Renal colic is an emergency medical condition characterized by severe, sudden pain in the loin or flank area caused by an obstructing kidney or ureteric stone. Our emergency team provides rapid pain relief via targeted intravenous medications and organizes prompt diagnostic imaging (ultrasound/CT scan) to establish stone size and location.',
    indications: ['Acute, severe flank or loin pain', 'Nausea and vomiting accompanying renal colic', 'Hematuria (blood in urine)'],
    benefits: ['Immediate relief from excruciating pain', 'Fast-track emergency pathway', 'Immediate availability of urologist consult'],
    preparation: ['Immediate hospital visit', 'Avoid drinking excess fluids during acute pain to prevent kidney pressure']
  },
  {
    parentId: 'urology',
    parentCollection: 'surgicalServices',
    name: 'Stone Prevention & Medical Therapy',
    slug: 'stone-prevention-therapy',
    duration: '20 mins',
    recovery: 'Immediate',
    description: 'Long-term dietary counseling, metabolic analysis, and preventive medical treatment.',
    longDescription: 'Kidney stones have a high recurrence rate (up to 50% within 5 years if untreated). We offer structured metabolic workups (evaluating calcium, oxalate, uric acid levels in blood and urine) and formulate personalized preventive programs combining dietary modifications, hydration goals, and targeted medical therapies.',
    indications: ['History of recurrent kidney/ureteric stones', 'Young age of first stone formation', 'Multiple stones present on ultrasound'],
    benefits: ['Reduces the risk of future stone formation by over 80%', 'Non-surgical management approach', 'Improves overall renal health'],
    preparation: ['Bring previous stone analysis report if available', 'Keep record of daily fluid intake']
  },

  // 2. Laparoscopy
  {
    parentId: 'laparoscopy',
    parentCollection: 'surgicalServices',
    name: 'Ovarian Cyst Removal (Laparoscopy)',
    slug: 'laparoscopic-ovarian-cystectomy',
    duration: '60 mins',
    recovery: '1 – 2 days',
    description: 'Minimally invasive keyhole removal of ovarian cysts while preserving healthy ovarian tissue.',
    longDescription: 'Laparoscopic ovarian cystectomy is a surgery performed to remove large, painful, or persistent cysts from the ovary using 3 small incisions. We prioritize the preservation of healthy ovarian tissue to maintain hormonal function and future fertility.',
    indications: ['Ovarian cysts larger than 5cm', 'Suspicion of cyst twisting (torsion) or rupture', 'Persistent pelvic pain'],
    benefits: ['Preserves ovarian reserve and fertility', 'Tiny cosmetic scars', 'Discharge within 24–48 hours'],
    preparation: ['Fasting from midnight', 'Pelvic ultrasound or MRI reports', 'Blood tests (CA-125 if advised)']
  },
  {
    parentId: 'laparoscopy',
    parentCollection: 'surgicalServices',
    name: 'Uterus Removal / Hysterectomy (Laparoscopy)',
    slug: 'laparoscopic-hysterectomy',
    duration: '90 mins',
    recovery: '2 – 3 days',
    description: 'Advanced keyhole surgical removal of the uterus for fibroids or abnormal uterine bleeding.',
    longDescription: 'Total Laparoscopic Hysterectomy (TLH) is a modern, keyhole surgery to remove the uterus. It is recommended for conditions that do not respond to medical management. The entire procedure is performed through tiny keyholes, avoiding the large abdominal cuts of traditional surgery.',
    indications: ['Large symptomatic uterine fibroids', 'Severe adenomyosis or endometriosis', 'Uncontrolled abnormal uterine bleeding'],
    benefits: ['Minimal blood loss', 'Shorter hospital stay (2 days vs 7 days for open)', 'Fast return to household activities'],
    preparation: ['Fasting for 8 hours', 'Pelvic clearance evaluation', 'Pre-anesthetic fitness clearance']
  },

  // 3. General Surgery
  {
    parentId: 'general-surgery',
    parentCollection: 'surgicalServices',
    name: 'Piles / Hemorrhoids (Laser & Stapled)',
    slug: 'piles-laser-stapled-surgery',
    duration: '30 mins',
    recovery: '1 – 3 days',
    description: 'Advanced laser ablation (LHP) or stapled surgery for painless hemorrhoids treatment.',
    longDescription: 'We provide advanced daycare surgical options for hemorrhoids (piles). Laser Hemorrhoidoplasty (LHP) is a non-invasive procedure where laser energy seals off the hemorrhoidal blood supply, causing them to shrink. For prolapsed piles, Stapled Hemorrhoidopexy is performed, offering a reliable, sutureless correction with minimal postoperative discomfort.',
    indications: ['Grade II, III, or IV bleeding hemorrhoids', 'Prolapsed internal piles', 'Severe pain and itching'],
    benefits: ['Minimal or no pain post-surgery', 'No open incisions or daily dressings', 'Discharge on the same day'],
    preparation: ['Liquid diet the day before', 'Enema preparation on the morning of surgery', 'Fasting for 6 hours']
  },
  {
    parentId: 'general-surgery',
    parentCollection: 'surgicalServices',
    name: 'Anal Fissure Repair',
    slug: 'anal-fissure-repair',
    duration: '20 mins',
    recovery: '1 – 2 days',
    description: 'Lateral internal sphincterotomy (LIS) or laser sphincterotomy for chronic painful fissures.',
    longDescription: 'An anal fissure is a small tear in the lining of the anus, causing severe pain and bleeding during bowel movements. In chronic cases, a minor procedure called Lateral Internal Sphincterotomy (LIS) or laser sphincterotomy is performed to relax the internal anal sphincter muscle, immediately relieving pain and allowing the tear to heal.',
    indications: ['Chronic anal fissure failing medical management', 'Severe persistent pain after defecation', 'Visible painful tear with skin tags'],
    benefits: ['Over 95% success rate', 'Instant pain relief within 24 hours', 'Daycare procedure'],
    preparation: ['Mild laxatives', 'Fasting on the day of surgery']
  },
  {
    parentId: 'general-surgery',
    parentCollection: 'surgicalServices',
    name: 'Fistula-in-Ano Surgery (Fistulotomy / LIFT)',
    slug: 'fistula-surgery',
    duration: '45 mins',
    recovery: '2 – 4 days',
    description: 'Surgical fistulotomy, LIFT technique, or laser closure of complex anal fistulas.',
    longDescription: 'An anal fistula is an abnormal tunnel connecting the anal canal to the skin near the anus. We offer modern tissue-preserving operations like Ligation of the Intersphincteric Fistula Tract (LIFT) and Laser Fistula Closure (FiLaC). These procedures eliminate the fistula tract while preventing damage to the sphincter muscles, preserving bowel control.',
    indications: ['Anal fistula with active pus discharge', 'Recurrent perianal abscesses', 'Complex or high fistula tracts'],
    benefits: ['Maximum preservation of bowel continence', 'Low recurrence rate', 'Minimal postoperative pain'],
    preparation: ['MRI Fistulogram scan report', 'Bowel clearing prep']
  },
  {
    parentId: 'general-surgery',
    parentCollection: 'surgicalServices',
    name: 'Thyroid Surgery (Thyroidectomy)',
    slug: 'thyroidectomy',
    duration: '90 mins',
    recovery: '3 – 5 days',
    description: 'Partial or total surgical removal of the thyroid gland for swelling or nodules.',
    longDescription: 'Thyroidectomy is the surgical removal of all or part of the thyroid gland. It is performed through a cosmetic incision in the neck to treat goiter (enlargement), hyperthyroidism, suspicious nodules, or thyroid cancer.',
    indications: ['Large multinodular goiter causing pressure', 'Suspicious or cancerous thyroid nodules', 'Thyrotoxicosis resistant to drugs'],
    benefits: ['Definitive treatment', 'Cosmetic collar line suture closure', 'Safe preservation of voice nerves and calcium glands'],
    preparation: ['Normal thyroid hormone levels (Euthyroid status)', 'Neck ultrasound and FNAC reports', 'Fasting from midnight']
  },
  {
    parentId: 'general-surgery',
    parentCollection: 'surgicalServices',
    name: 'AV Fistula Surgery (Dialysis Access)',
    slug: 'av-fistula-surgery',
    duration: '45 mins',
    recovery: 'Immediate',
    description: 'Creation of an arteriovenous fistula in the arm as a vascular access for hemodialysis.',
    longDescription: 'An Arteriovenous (AV) Fistula is the gold standard vascular access for patients requiring long-term hemodialysis. Under local anesthesia, the surgeon connects an artery directly to a vein in the arm. This increases blood flow through the vein, making it strong enough to handle repeated needle insertions for dialysis.',
    indications: ['Chronic Kidney Disease (CKD) requiring long-term dialysis', 'Preparing for dialysis onset'],
    benefits: ['Lowest risk of infection and clotting', 'Durable and long-lasting access', 'Provides excellent dialysis flow'],
    preparation: ['Venous mapping Doppler study of the arm', 'Avoid IV cannulas in the target arm prior to surgery']
  },

  // 4. ICU & Emergency
  {
    parentId: 'icu-emergency-care',
    parentCollection: 'criticalCare',
    name: '24/7 Ambulance Service',
    slug: 'ambulance-service-treatment',
    duration: 'Ongoing',
    recovery: 'Immediate',
    description: 'Emergency patient transport and transit care with oxygen support.',
    longDescription: 'Our 24/7 ambulance service is fully equipped to transport critically ill or post-surgical patients safely. Equipped with emergency oxygen supply, transport monitors, and life-support kits, the transit is managed by trained paramedic personnel.',
    indications: ['Accident or emergency trauma', 'Critical respiratory/cardiac distress', 'Inter-hospital transfers'],
    benefits: ['Rapid response call out', 'Stabilization during transit', 'Immediate entry to emergency trauma room'],
    preparation: ['Keep patient documents and location ready', 'Maintain phone contact during ambulance transit']
  },

  // 5. Diagnostics
  {
    parentId: 'hemodialysis-pathology',
    parentCollection: 'diagnostics',
    name: 'Digital X-Ray & Ultrasound',
    slug: 'xray-ultrasound-diagnostics',
    duration: '30 mins',
    recovery: 'Immediate',
    description: 'High-frequency digital imaging and abdominal ultrasound studies.',
    longDescription: 'Our diagnostics suite includes high-resolution Digital X-ray and abdominal ultrasound (USG) with Color Doppler. These imaging modalities allow our urologists and surgeons to diagnose kidney stones, appendicitis, gallstones, and blood vessel flows instantly.',
    indications: ['Suspected kidney stones or abdominal pain', 'Chest imaging for surgical fitness', 'Vascular blood flow checks'],
    benefits: ['Low radiation digital X-ray', 'Non-invasive, painless ultrasound', 'Immediate report generation for emergency cases'],
    preparation: ['Fasting for abdominal ultrasound', 'Metal jewelry removal for X-ray']
  },
  {
    parentId: 'hemodialysis-pathology',
    parentCollection: 'diagnostics',
    name: '24/7 In-house Pharmacy',
    slug: 'pharmacy-service-treatment',
    duration: 'Immediate',
    recovery: 'Immediate',
    description: 'Fully stocked round-the-clock pharmacy for all essential medicines.',
    longDescription: 'Our in-house pharmacy is open 24 hours a day, 7 days a week, stocking a comprehensive range of surgical medications, emergency drugs, critical care infusions, and general prescriptions. This ensures patients have immediate access to medications at any time.',
    indications: ['Emergency prescription requirements', 'Discharge medication collection', 'Surgical supplies procurement'],
    benefits: ['Saves crucial time in emergencies', 'Assurance of genuine quality medicines', 'Direct sync with indoor treatment charts'],
    preparation: ['Valid prescription from doctor']
  }
];

const patientFacilities = [
  {
    id: 'opd',
    slug: 'opd',
    name: 'Outpatient Department (OPD)',
    icon: '🏥',
    category: 'Patient Care Facilities',
    order: 29,
    available: 'OPD Hours',
    recoveryTime: 'Immediate',
    description: 'Comfortable outpatient consulting chambers with minimal waiting times.',
    longDescription: 'The Outpatient Department (OPD) at Nova Max Hospital features spacious consulting chambers where senior specialists consult daily. We maintain a structured appointments system to minimize patient waiting times and provide comfortable seating and helpful front-desk staff.',
    features: [
      'Experienced Senior Consultants',
      'Digital prescription tracking',
      'Comfortable air-conditioned waiting lobby',
      'Direct coordination with diagnostics'
    ]
  },
  {
    id: 'ipd',
    slug: 'ipd',
    name: 'Inpatient Department (IPD)',
    icon: '🛏️',
    category: 'Patient Care Facilities',
    order: 30,
    available: '24 × 7',
    recoveryTime: 'Varies',
    description: 'Clean, modern indoor wards and rooms with compassionate round-the-clock nursing care.',
    longDescription: 'Our Inpatient Department (IPD) is designed to provide a hygienic, peaceful environment for post-surgical recovery. We offer multiple ward options, and each bed is monitored by highly experienced and compassionate nursing staff.',
    features: [
      '24/7 dedicated nursing care',
      'In-bed monitoring systems',
      'Hygienic diet plans under expert guidance',
      'Daily rounds by senior consultants'
    ]
  },
  {
    id: 'ac-rooms-wards',
    slug: 'ac-rooms-wards',
    name: 'AC Rooms & General Wards',
    icon: '❄️',
    category: 'Patient Care Facilities',
    order: 31,
    available: '24 × 7',
    recoveryTime: 'Varies',
    description: 'Air-conditioned private rooms and well-spaced general wards for optimal hygiene.',
    longDescription: 'Nova Max Hospital offers various indoor accommodation options to fit every patient need. We maintain fully air-conditioned deluxe private rooms for patients desiring privacy, as well as spacious, well-ventilated, and hygienic general wards.',
    features: [
      'AC Deluxe Private Rooms with patient attendee couch',
      'Hygienic general wards with individual screens',
      'Strict daily sanitization and cleanliness checks',
      'Emergency call bells on every bed'
    ]
  },
  {
    id: 'dialysis-facility',
    slug: 'dialysis-facility',
    name: 'Dialysis Unit',
    icon: '🩸',
    category: 'Patient Care Facilities',
    order: 32,
    available: '24 × 7',
    recoveryTime: 'Immediate',
    description: 'Modern dialysis unit offering highly sanitary renal support.',
    longDescription: 'Our specialized Dialysis Unit is equipped with high-efficiency hemodialysis machines. Led by our nephrology consult panel, we adhere to international sterilization and cleaning standards to prevent cross-infections, delivering safe renal care.',
    features: [
      'High-performance dialysis machines',
      'Strict infection control and single-use dialyzer protocols',
      'Cardiac monitoring during dialysis',
      'Comfortable adjustable recliner beds'
    ]
  },
  {
    id: 'ambulance-facility',
    slug: 'ambulance-facility',
    name: 'Ambulance Service',
    icon: '🚑',
    category: 'Patient Care Facilities',
    order: 33,
    available: '24 × 7',
    recoveryTime: 'Immediate',
    description: 'Rapid emergency patient transport and transit support.',
    longDescription: 'We operate a round-the-clock ambulance transport service to convey patients in emergencies. The ambulance is equipped with oxygen flow meters, first-aid support, and stretcher attachments for safe transit.',
    features: [
      '24/7 standby call out',
      'Emergency oxygen supply onboard',
      'Paramedic crew for transit care',
      'Direct coordination with emergency trauma team'
    ]
  },
  {
    id: 'pharmacy-facility',
    slug: 'pharmacy-facility',
    name: '24/7 Pharmacy',
    icon: '💊',
    category: 'Patient Care Facilities',
    order: 34,
    available: '24 × 7',
    recoveryTime: 'Immediate',
    description: 'Fully stocked round-the-clock pharmacy for all essential medicines.',
    longDescription: 'Our in-house pharmacy is open 24/7, providing patients with immediate access to post-op medicines, emergency items, and regular prescriptions, eliminating the need to search elsewhere in emergencies.',
    features: [
      'Genuine, temperature-regulated medicines',
      'Stocked with critical emergency infusions and vaccines',
      'Computers-linked inventory tracking',
      'Generous discounts on essential drugs'
    ]
  }
];

async function run() {
  try {
    const adminEmail = 'bootstrap_admin@novamax.com';
    const adminPassword = 'AdminPassword123!';

    console.log('Authenticating admin...');
    const cred = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    const user = cred.user;
    console.log(`Signed in successfully! UID: ${user.uid}`);

    console.log('\n--- Seeding missing treatments ---');
    for (const t of missingTreatments) {
      const tDocRef = doc(db, 'treatments', `${t.parentId}_${t.slug}`);
      await setDoc(tDocRef, {
        ...t,
        createdAt: serverTimestamp()
      });
      console.log(`Seeded missing treatment: "${t.name}" under parent "${t.parentId}"`);
    }

    console.log('\n--- Seeding Patient Care Facilities ---');
    for (const pf of patientFacilities) {
      const pfDocRef = doc(db, 'patientFacilities', pf.id);
      await setDoc(pfDocRef, {
        ...pf,
        createdAt: serverTimestamp()
      });
      console.log(`Seeded patient facility: "${pf.name}" (${pf.id})`);
    }

    console.log('\n=======================================');
    console.log('✅ MISSING TREATMENTS & PATIENT FACILITIES SEEDED!');
    console.log('=======================================');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

run();
