import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'google_ads_mega_plan.md');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements configuration
const replacements = [
  {
    target: `*   **Campaign USPs**: Led by Dr. M.K. Sinha (Senior Urologist, ex-Sir J.J. Hospital Mumbai), 100% blade-free Laser RIRS surgery, modular OT, same-day discharge.`,
    replacement: `*   **Campaign USPs**: Led by Dr. M.K. Sinha (Senior Urologist, ex-Sir J.J. Hospital Mumbai), 100% blade-free Laser RIRS surgery, modular OT, same-day discharge.
*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Kidney Stone Page** (URL: \`/services/urology/treatment/kidney-stone-treatment\`)
        *   *Description Line 1*: Laser Stone Surgery Patna
        *   *Description Line 2*: 100% Blade-free RIRS Lithotripsy
    2.  **Sitelink 2: Prostate Surgery** (URL: \`/services/urology/treatment/prostate-surgery\`)
        *   *Description Line 1*: Laser TURP Surgery Patna
        *   *Description Line 2*: Relieve Urinary Blockage & BPH
    3.  **Sitelink 3: Urology Department** (URL: \`/services/urology\`)
        *   *Description Line 1*: Advanced Urology Care
        *   *Description Line 2*: Complete Bladder & Stone Clinic
    4.  **Sitelink 4: Book Appointment** (URL: \`/book-appointment\`)
        *   *Description Line 1*: Secure Direct OPD Slot
        *   *Description Line 2*: Quick Direct Hospital Booking`
  },
  {
    target: `*   **Campaign USPs**: Minimal incisions (keyhole surgery), minimal post-op pain, rapid return to work (24–48hr discharge), modular operation theatre, senior urologist and laparoscopic surgeon Dr. M.K. Sinha (30+ years experience).`,
    replacement: `*   **Campaign USPs**: Minimal incisions (keyhole surgery), minimal post-op pain, rapid return to work (24–48hr discharge), modular operation theatre, senior urologist and laparoscopic surgeon Dr. M.K. Sinha (30+ years experience).
*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Gallbladder Surgery** (URL: \`/services/laparoscopy/treatment/laparoscopic-cholecystectomy\`)
        *   *Description Line 1*: Keyhole Gallstone Removal
        *   *Description Line 2*: 24-Hour Daycare Discharge
    2.  **Sitelink 2: Hernia Mesh Repair** (URL: \`/services/laparoscopy/treatment/laparoscopic-hernia-repair\`)
        *   *Description Line 1*: Laparoscopic TEP/TAPP Mesh
        *   *Description Line 2*: Sutureless Wall Reinforcement
    3.  **Sitelink 3: Piles Laser Clinic** (URL: \`/services/general-surgery/treatment/piles-laser-stapled-surgery\`)
        *   *Description Line 1*: Painless Laser Piles Ablation
        *   *Description Line 2*: Walk Home within 24 Hours
    4.  **Sitelink 4: Book Appointment** (URL: \`/book-appointment\`)
        *   *Description Line 1*: Direct Surgeon Consultation
        *   *Description Line 2*: Easy pre-operative slots`
  },
  {
    target: `*   **Campaign USPs**: 100% confidential consultations, private counseling chambers, in-house pathology lab for quick semen analysis, expert micro-surgical varicocelectomy.`,
    replacement: `*   **Campaign USPs**: 100% confidential consultations, private counseling chambers, in-house pathology lab for quick semen analysis, expert micro-surgical varicocelectomy.
*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Varicocele Repair** (URL: \`/services/male-infertility/treatment/varicocele-treatment\`)
        *   *Description Line 1*: Microscopic Varicocelectomy
        *   *Description Line 2*: Upgrades Testicular Health
    2.  **Sitelink 2: Sexual Health Care** (URL: \`/services/sexology\`)
        *   *Description Line 1*: Confident ED/PE Treatments
        *   *Description Line 2*: Safe, Private Consultation
    3.  **Sitelink 3: Semen Analysis Lab** (URL: \`/services/male-infertility/treatment/semen-analysis-workup\`)
        *   *Description Line 1*: In-house semen diagnostics
        *   *Description Line 2*: Complete fertility analysis
    4.  **Sitelink 4: Book Appointment** (URL: \`/book-appointment\`)
        *   *Description Line 1*: Secure Private Consult Slot
        *   *Description Line 2*: 100% Discrete & Confidential`
  },
  {
    target: `*   **Campaign USPs**: Direct official appointment booking channel, contact details, coordinates, modular operation theatre and emergency ICU.`,
    replacement: `*   **Campaign USPs**: Direct official appointment booking channel, contact details, coordinates, modular operation theatre and emergency ICU.
*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Meet Our Doctors** (URL: \`/doctors\`)
        *   *Description Line 1*: Check consultant schedules
        *   *Description Line 2*: Book direct slots online
    2.  **Sitelink 2: Urology Department** (URL: \`/services/urology\`)
        *   *Description Line 1*: Advanced Urology Care
        *   *Description Line 2*: Complete Bladder & Stone Clinic
    3.  **Sitelink 3: Laparoscopy Clinic** (URL: \`/services/laparoscopy\`)
        *   *Description Line 1*: Advanced Minimally Invasive
        *   *Description Line 2*: Gallbladder, Hernia, Appendix
    4.  **Sitelink 4: ICU & Emergencies** (URL: \`/critical-care\`)
        *   *Description Line 1*: 24/7 Critical Emergency
        *   *Description Line 2*: ICU Ventilator support`
  },
  {
    target: `*   **Campaign USPs**: Lady doctor consultations, personalized pelvic floor care, advanced sling surgeries (TVT/TOT) for leakage, modular sterile OT.`,
    replacement: `*   **Campaign USPs**: Lady doctor consultations, personalized pelvic floor care, advanced sling surgeries (TVT/TOT) for leakage, modular sterile OT.
*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Urinary Incontinence** (URL: \`/services/uro-gynecology/treatment/urinary-incontinence\`)
        *   *Description Line 1*: TVT/TOT Sling Surgery Patna
        *   *Description Line 2*: Stop Accidental Leaking
    2.  **Sitelink 2: Pelvic Prolapse Care** (URL: \`/services/uro-gynecology/treatment/pelvic-organ-prolapse\`)
        *   *Description Line 1*: Specialized Ligament Repair
        *   *Description Line 2*: Restore Normal Support
    3.  **Sitelink 3: Gynecologist Consult** (URL: \`/services/uro-gynecology/treatment/gynaecological-consultation\`)
        *   *Description Line 1*: PCOS & PCOD Clinical Care
        *   *Description Line 2*: Consult Lady Doctors
    4.  **Sitelink 4: Daycare D&C Procedure** (URL: \`/services/uro-gynecology/treatment/dc-procedure\`)
        *   *Description Line 1*: Safe Daycare Procedure
        *   *Description Line 2*: Quick Clinical Recovery`
  },
  {
    target: `*   **Campaign USPs**: Experienced chief surgeon Dr. M.K. Sinha (30+ years experience), advanced open and laser surgical options, low infection rates, transparent daycare package pricing.`,
    replacement: `*   **Campaign USPs**: Experienced chief surgeon Dr. M.K. Sinha (30+ years experience), advanced open and laser surgical options, low infection rates, transparent daycare package pricing.
*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Appendix Surgery** (URL: \`/services/general-surgery/treatment/appendectomy\`)
        *   *Description Line 1*: Open & Laparoscopic Appendix
        *   *Description Line 2*: Urgent Appendicitis Care
    2.  **Sitelink 2: AV Fistula Creation** (URL: \`/services/general-surgery/treatment/av-fistula-surgery\`)
        *   *Description Line 1*: Dialysis Access Procedure
        *   *Description Line 2*: High success rate slots
    3.  **Sitelink 3: Diagnostics & Lab** (URL: \`/services/hemodialysis-pathology\`)
        *   *Description Line 1*: Complete CBC, LFT, KFT Panel
        *   *Description Line 2*: Automated Lab Results
    4.  **Sitelink 4: Book Appointment** (URL: \`/book-appointment\`)
        *   *Description Line 1*: Direct Surgeon Consultation
        *   *Description Line 2*: Easy pre-operative checkups`
  }
];

let replacedCount = 0;
for (const r of replacements) {
  if (content.includes(r.target)) {
    content = content.replace(r.target, r.replacement);
    replacedCount++;
  } else {
    console.warn(`WARNING: Target USP block not found for replacement: ${r.target.slice(0, 40)}...`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully added sitelinks to ${replacedCount} campaigns.`);
