import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

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

const EMAIL = 'surgmrityunjay@yahoo.co.in';
const PASS = 'Adminpass3#';

function getFaqsForTreatment(tName, tSlug, parentId) {
  const slug = tSlug.toLowerCase();
  
  if (parentId === 'urology') {
     if (slug.includes('prostate')) {
       return [
         { question: "Is TURP prostate surgery safe for elderly patients?", answer: "Yes, TURP is the gold standard treatment for prostate enlargement and is highly safe. We perform comprehensive pre-anesthetic checkups to ensure patient fitness before scheduling surgery." },
         { question: "Will prostate surgery affect urinary control?", answer: "Temporary urinary leakage can occur in a small number of patients post-surgery. However, permanent incontinence is extremely rare, and control is typically restored within weeks through simple pelvic exercises." }
       ];
     }
     if (slug.includes('uti') || slug.includes('bladder') || slug.includes('hydrocele')) {
        return [
          { question: "How long does a UTI take to clear up with treatment?", answer: "With the correct course of antibiotics prescribed after a urine culture check, symptoms of a urinary tract infection (UTI) typically start improving within 24 to 48 hours." },
          { question: "Is hydrocele surgery a daycare procedure, and does it recur?", answer: "Yes, modern minimal-access hydrocele surgery (hydrocelectomy) is a safe daycare procedure, allowing patients to return home the same day. With advanced surgical excision or plication of the sac, the recurrence rate is extremely low." }
        ];
      }
     return [
       { question: `Is ${tName} painful?`, answer: `No. The procedure is performed under spinal or general anesthesia, meaning you will feel absolutely no pain during the surgery. Post-operative discomfort is mild and managed with simple painkillers.` },
       { question: `What is the recovery time for ${tName}?`, answer: `Most patients are discharged within 24 to 48 hours (daycare/overnight). You can resume light, non-strenuous desk work within 3 to 4 days, and return to full activities in 2 weeks.` },
       { question: "How can I prevent kidney stones from recurring?", answer: "Drink 2.5 to 3 liters of water daily, reduce sodium intake, limit red meat, and follow a dietary plan based on a metabolic urine analysis." }
     ];
  }
  
  if (parentId === 'laparoscopy') {
     return [
       { question: `What are the benefits of laparoscopic ${tName} over open surgery?`, answer: "Laparoscopic surgery uses keyhole incisions (5-10mm), resulting in significantly less pain, minimal scarring, shorter hospital stays (1-2 days), and a faster return to daily activities." },
       { question: `When can I go back to work after laparoscopic ${tName}?`, answer: "Most patients can walk on the same day of surgery and return to light desk work within 3 to 5 days. Heavy lifting and strenuous exercises should be avoided for 4 to 6 weeks." },
       { question: "Does laparoscopy require general anesthesia?", answer: "Yes, laparoscopic surgery is performed under general anesthesia to ensure complete muscle relaxation and patient safety during the procedure." }
     ];
  }
  
  if (parentId === 'general-surgery') {
     if (slug.includes('piles') || slug.includes('fissure') || slug.includes('fistula')) {
       return [
         { question: `What is the recovery time for laser piles/fistula surgery?`, answer: "Laser treatment is a daycare procedure. Patients are discharged on the same day or the next morning, experience very little pain, and can return to light desk work in 2 to 3 days." },
         { question: `Is laser treatment better than open surgery for fistula or piles?`, answer: "Yes. Laser treatments preserve the surrounding sphincter muscles, preventing complications like fecal incontinence, and require no painful open wounds or daily dressings." },
         { question: "How can I prevent piles or fissures from coming back?", answer: "Maintain a high-fiber diet, drink plenty of water, avoid sitting for extended periods, and do not strain during bowel movements." }
       ];
     }
     if (slug.includes('thyroid')) {
       return [
         { question: "Does thyroid surgery affect my voice permanently?", answer: "Permanent voice changes are rare (under 1%). We use delicate surgical techniques to identify and preserve the laryngeal nerves that control your vocal cords." },
         { question: "How long is the hospital stay for a thyroidectomy?", answer: "Most patients stay in the hospital for 1 to 2 days post-surgery for monitoring and are discharged once they are eating and speaking normally." }
       ];
     }
     return [
       { question: `Is ${tName} performed as a daycare procedure?`, answer: "Yes, minor procedures like lipoma excision and abscess drainage are performed under local anesthesia as daycare procedures, allowing you to go home immediately." },
       { question: "How should I care for the surgical wound at home?", answer: "Keep the dressing clean and dry. Follow our surgeon's guidelines on dressing changes and complete the prescribed course of antibiotics to prevent infection." }
     ];
  }
  
  if (parentId === 'uro-gynecology') {
     return [
       { question: `Do I need surgery for pelvic prolapse or incontinence?`, answer: "Not always. Mild cases are treated with pelvic floor rehabilitation (Kegels), lifestyle changes, or vaginal pessaries. Surgery is recommended for severe symptoms that affect your quality of life." },
       { question: "What is the recovery timeline for uro-gynecological surgery?", answer: "Recovery typically takes 1 to 2 weeks. Patients should avoid lifting heavy weights, climbing stairs excessively, and strenuous activity for 6 weeks to allow tissues to heal." }
     ];
  }
  
  if (parentId === 'male-infertility' || parentId === 'sexology') {
     if (slug.includes('varicocele')) {
       return [
         { question: "How does varicocele surgery improve fertility?", answer: "Varicocelectomy ties off swollen veins in the scrotum, restoring normal blood flow and lowering testicular temperature. This significantly improves sperm count, motility, and morphology." },
         { question: "Is varicocele surgery painful?", answer: "The procedure is performed under anesthesia. Post-operative pain is minimal, akin to a mild ache in the groin, which is easily managed with oral painkillers for 2 to 3 days." }
       ];
     }
     if (slug.includes('semen')) {
       return [
         { question: "How should I prepare for a semen analysis test?", answer: "You must observe 2 to 7 days of sexual abstinence before providing the sample. Avoid alcohol, smoking, and hot baths for 48 hours prior to the test." },
         { question: "How long does it take to get semen analysis reports?", answer: "Semen analysis reports are typically processed and delivered on the same day, ensuring quick clinical consultation." }
       ];
     }
     return [
       { question: "Are treatments for sexual health problems confidential?", answer: "Absolutely. Patient privacy is our highest priority. All consultations, records, and treatments are kept 100% confidential in private chambers." },
       { question: `Is ${tName} curable?`, answer: "Yes. Most cases of erectile dysfunction, premature ejaculation, and performance anxiety are treatable through customized medications, hormone therapies, and expert counseling." }
     ];
  }
  
  if (parentId === 'hemodialysis-pathology') {
     if (slug.includes('dialysis')) {
       return [
         { question: "How long does a dialysis session last?", answer: "A typical hemodialysis session lasts about 3 to 4 hours. Most patients require dialysis 2 to 3 times a week as prescribed by their nephrologist." },
         { question: "Is dialysis painful?", answer: "Dialysis itself is not painful. The only minor discomfort is the needle insertion into the vascular access (fistula), which is minimized using numbing creams if requested." }
       ];
     }
     return [
       { question: "How fast can I get blood test reports?", answer: "Most routine pathology tests (CBC, LFT, KFT, Blood Sugar) are processed in-house and reports are delivered on the same day." },
       { question: "Do I need to fast before a blood test?", answer: "For blood sugar, lipid profiles, and thyroid tests, a fasting period of 8 to 12 hours (overnight) is generally required. Normal water consumption is allowed." }
     ];
  }
  
  if (parentId === 'icu-emergency-care') {
     return [
       { question: "Are family visits allowed in the ICU?", answer: "Yes, but they are strictly timed and restricted to one visitor at a time to prevent infections and maintain a quiet, healing environment for critical patients." },
       { question: "Is 24/7 ICU support managed by specialists?", answer: "Yes. Our ICU is managed round-the-clock by expert intensivists, critical care nurses, and specialized monitoring equipment." }
     ];
  }
  
  return [
    { question: `Is ${tName} safe?`, answer: `Yes, ${tName} is highly safe and performed by senior consultants using state-of-the-art medical equipment following strict clinical guidelines.` },
    { question: "How can I book an appointment?", answer: "You can book directly on our website through the Online Booking form, or call our emergency desk at 072505 20694." }
  ];
}

async function run() {
  try {
    console.log(`Authenticating as ${EMAIL}...`);
    await signInWithEmailAndPassword(auth, EMAIL, PASS);
    console.log('Logged in successfully!');

    console.log('Fetching all treatment documents...');
    const snap = await getDocs(collection(db, 'treatments'));
    console.log(`Found ${snap.size} treatments.`);

    for (const d of snap.docs) {
      const data = d.data();
      const parentId = data.parentId;
      const tName = data.name;
      const tSlug = data.slug || d.id;
      
      const faqs = getFaqsForTreatment(tName, tSlug, parentId);
      
      console.log(`Updating "${tName}" (ID: ${d.id}, Parent: ${parentId}) with ${faqs.length} FAQs...`);
      await updateDoc(doc(db, 'treatments', d.id), {
        faqs: faqs
      });
    }

    console.log('\n=======================================');
    console.log('✅ ALL TREATMENT DOCUMENTS UPDATED WITH TARGETED FAQs!');
    console.log('=======================================');
    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error);
    process.exit(1);
  }
}

run();
