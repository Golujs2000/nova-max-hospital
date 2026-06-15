import fs from 'fs';
import path from 'path';

// Load all seed data modules
import { hospitalDepartments } from '../src/data/seed/hospitalDepartments.js';
import { surgicalServices } from '../src/data/seed/surgicalServices.js';
import { criticalCare } from '../src/data/seed/criticalCare.js';
import { diagnostics } from '../src/data/seed/diagnostics.js';
import { patientFacilities } from '../src/data/seed/patientFacilities.js';

const outputPath = path.resolve('google-business-services.txt');

// Categories mapping to their respective arrays
const categories = [
  { name: 'Hospital Departments', items: hospitalDepartments },
  { name: 'Surgical Services', items: surgicalServices },
  { name: 'Critical Care', items: criticalCare },
  { name: 'Diagnostics', items: diagnostics },
  { name: 'Patient Facilities', items: patientFacilities }
];

// Generic local SEO suffixes
const genericSeoSuffixes = [
  "Expert medical care at Sarvada Hospito Care, Kankarbagh, Patna.",
  "Available at Sarvada Hospito Care, Bypass Road, Patna, Bihar.",
  "Consult top specialists at Sarvada Hospito Care in Patna.",
  "Advanced treatment at Sarvada Hospito Care, Kankarbagh, Patna.",
  "Leading general & laparoscopic surgery hospital in Patna, Bihar.",
  "High-quality patient care at Sarvada Hospito Care, Patna.",
  "Comprehensive diagnostic & clinical care in Kankarbagh, Patna.",
  "Best surgical center and ICU facility in Patna, Bihar.",
  "Emergency and elective medical care in Kankarbagh, Patna.",
  "State-of-the-art medical services at Sarvada Hospito Care, Patna.",
  "Compassionate patient care at Sarvada Hospito Care, Kankarbagh."
];

// Special suffix mentioning Dr. Manmohan Suman
const drSumanSuffix = "Care under Director Dr. Manmohan Suman at Sarvada Hospito Care, Patna.";

let suffixIndex = 0;
function getSeoSuffix(treatmentName, parentCategoryName, parentDeptName, isFirstInDept) {
  const normalizedDept = parentDeptName.toLowerCase();
  
  // Mention Dr. Manmohan Suman only on the FIRST item of relevant departments:
  // Consultant Physician, General Physician, Critical Care Medicine, Gastroenterology, General Medicine, Laparoscopic Surgery.
  const isRelevantDept = normalizedDept.includes('physician') || 
                         normalizedDept.includes('medicine') || 
                         normalizedDept.includes('gastroenterology') || 
                         normalizedDept.includes('laparoscopic');
                         
  if (isRelevantDept && isFirstInDept) {
    return drSumanSuffix;
  }
  
  // Otherwise, rotate through generic local SEO suffixes
  const suffix = genericSeoSuffixes[suffixIndex % genericSeoSuffixes.length];
  suffixIndex++;
  return suffix;
}

function getCleanBaseDesc(rawDesc, maxBaseLength, suffixWillMentionDr) {
  if (!rawDesc) return "";
  
  // Clean newlines and double spaces
  let clean = rawDesc.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Dynamically replace Dr. Manmohan Suman in base text to avoid double mentions or overuse
  if (suffixWillMentionDr) {
    clean = clean.replace(/Dr\.\s*Manmohan\s*Suman\s*(and\s*our\s*team|and\s*his\s*team)?/gi, 'our expert medical team');
  } else {
    clean = clean.replace(/Dr\.\s*Manmohan\s*Suman/gi, 'our senior specialists');
  }
  
  // Temp replace common abbreviations that have periods
  clean = clean.replace(/Dr\./g, 'Dr_TEMP_DOT');
  clean = clean.replace(/Mr\./g, 'Mr_TEMP_DOT');
  clean = clean.replace(/Mrs\./g, 'Mrs_TEMP_DOT');
  clean = clean.replace(/Ms\./g, 'Ms_TEMP_DOT');
  clean = clean.replace(/Sr\./g, 'Sr_TEMP_DOT');
  clean = clean.replace(/Jr\./g, 'Jr_TEMP_DOT');
  clean = clean.replace(/M\.D\./g, 'MD_TEMP_DOT');
  clean = clean.replace(/M\.B\.B\.S\./g, 'MBBS_TEMP_DOT');
  clean = clean.replace(/M\.S\./g, 'MS_TEMP_DOT');
  
  // Split into sentences using lookbehind for sentence-ending punctuation followed by space
  const sentences = clean.split(/(?<=\.|\?|\!)\s+/);
  let accumulated = "";
  
  for (const sentence of sentences) {
    const potentialNext = accumulated 
      ? accumulated + " " + sentence 
      : sentence;
      
    if (potentialNext.length <= maxBaseLength) {
      accumulated = potentialNext;
    } else {
      break;
    }
  }
  
  // Fallback if the first sentence is too long
  if (!accumulated && sentences.length > 0) {
    const first = sentences[0];
    if (first.length > maxBaseLength) {
      accumulated = first.slice(0, maxBaseLength - 3).trim() + "...";
    } else {
      accumulated = first;
    }
  }
  
  // Restore common abbreviations
  accumulated = accumulated.replace(/Dr_TEMP_DOT/g, 'Dr.');
  accumulated = accumulated.replace(/Mr_TEMP_DOT/g, 'Mr.');
  accumulated = accumulated.replace(/Mrs_TEMP_DOT/g, 'Mrs.');
  accumulated = accumulated.replace(/Ms_TEMP_DOT/g, 'Ms.');
  accumulated = accumulated.replace(/Sr_TEMP_DOT/g, 'Sr.');
  accumulated = accumulated.replace(/Jr_TEMP_DOT/g, 'Jr.');
  accumulated = accumulated.replace(/MD_TEMP_DOT/g, 'M.D.');
  accumulated = accumulated.replace(/MBBS_TEMP_DOT/g, 'M.B.B.S.');
  accumulated = accumulated.replace(/MS_TEMP_DOT/g, 'M.S.');
  
  // Ensure it ends with a period
  if (accumulated && !accumulated.endsWith('.') && !accumulated.endsWith('!') && !accumulated.endsWith('?')) {
    accumulated += '.';
  }
  
  return accumulated;
}

let output = `================================================================
  Sarvada Hospito Care — GOOGLE BUSINESS PROFILE SERVICES
  Anand palace, Bypass Rd, changer, Kankarbagh, Patna, Bihar 800020
  Call: 7079001600 | 7079001700
  https://sarvada-hospito-care.web.app
================================================================

HOW TO ADD:
  Google Business Profile → Edit Profile → Services → Add Service
  Each block = one service entry. Copy SERVICE NAME + DESCRIPTION.
================================================================

`;

let totalServices = 0;
let categoryCounter = 1;

categories.forEach((catGroup) => {
  catGroup.items.forEach((dept) => {
    output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    output += `  CATEGORY ${categoryCounter} — ${dept.name.toUpperCase()}\n`;
    output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    categoryCounter++;

    if (dept.treatments && dept.treatments.length > 0) {
      dept.treatments.forEach((t, tIdx) => {
        totalServices++;
        output += `SERVICE NAME: ${t.name}\n`;
        output += `DESCRIPTION:\n`;

        let rawDesc = t.description || t.longDescription || '';
        
        // Determine the SEO suffix
        const suffix = getSeoSuffix(t.name, catGroup.name, dept.name, tIdx === 0);
        const suffixWillMentionDr = (suffix === drSumanSuffix);
        
        // Max length of service description is 300. Leave a safety margin of 5 chars.
        const maxBaseLength = 295 - suffix.length - 1; // -1 for space prefix
        
        const baseDesc = getCleanBaseDesc(rawDesc, maxBaseLength, suffixWillMentionDr);
        const fullDesc = baseDesc ? `${baseDesc} ${suffix}` : suffix;
        
        output += `${fullDesc}\n\n---\n\n`;
      });
      // Remove trailing "---" separator for this department/category
      output = output.slice(0, -7) + '\n';
    } else {
      output += `(No treatments listed in seed data)\n\n`;
    }
  });
});

// Add SEO tips and updates at the end
output += `================================================================
  GOOGLE BUSINESS — ADDITIONAL SEO TIPS
================================================================

HOSPITAL BUSINESS DESCRIPTION (for Google Profile "About" section):
-----------------------------------------------------------------
Sarvada Hospito Care is a specialized surgical and medical center in
Anand palace, Bypass Rd, changer, Kankarbagh, Patna, Bihar, offering advanced laparoscopic
surgery, stone treatment, internal medicine, and critical care. Led by Director
Dr. Manmohan Suman (MBBS, MD - Senior Consultant Physician) along with an expert medical team.
Services: Laparoscopic Surgery, Kidney & Gallbladder Stone, Liver
Disorders, Pancreas Surgery, Jaundice & Biliary (ERCP), Upper GI
Endoscopy, Colonoscopy, GI Disorders, Liver Biopsy, Piles & Fistula,
Cancer Surgery, Hernia Repair, Thyroid Surgery, and Emergency Care.
Anand palace, Bypass Rd, changer, Kankarbagh, Patna, Bihar 800020.
Call: 7079001600 | 7079001700 | Email: sarvadahospitocarepatna@gmail.com

TOP GOOGLE BUSINESS CATEGORIES TO SELECT:
-----------------------------------------
Primary:   Surgical Center
Secondary: Gastroenterologist
           General Surgeon
           Laparoscopic Surgeon
           Hospital
           Medical Clinic
           Internist (Internal Medicine Specialist)

GOOGLE POSTS / UPDATES — suggested weekly topics:
--------------------------------------------------
1. "Advanced Laparoscopic Surgery — faster recovery, smaller scars — Sarvada Hospito Care Patna"
2. "Kidney stone? Minimally invasive PCNL & Laser treatment available — Call: 7079001600"
3. "Jaundice specialist in Patna — ERCP & biliary surgery under Director Dr. Manmohan Suman"
4. "Upper GI Endoscopy & Colonoscopy — diagnose stomach & colon problems early at Kankarbagh"
5. "Liver biopsy — accurate diagnosis for liver disease — book appointment today in Patna"
6. "Piles, Fissure & Fistula — painless laser and stapler surgery in Patna"
7. "Pancreatic care under Director Dr. Manmohan Suman — 21+ years experience in internal medicine"
8. "Gallbladder stone? Laparoscopic removal in Kankarbagh — go home next day"

================================================================
  Total Services: ${totalServices}  |  Categories: ${categoryCounter - 1}
  Generated for: Sarvada Hospito Care, Patna, Bihar
================================================================
`;

fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`Successfully generated ${outputPath} with ${totalServices} services and ${categoryCounter - 1} categories (with grammatically correct Local SEO sentences, sparse Dr. Suman references)!`);
