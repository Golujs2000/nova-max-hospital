import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'google_ads_mega_plan.md');
let content = fs.readFileSync(filePath, 'utf8');

// Replace all relative URLs in Sitelinks with absolute URLs
// And inject Dr. M.K. Sinha Profile Sitelink in Campaign 2, 3, 4, 6

// Campaign 2 replacement
const c2_target = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
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
        *   *Description Line 2*: Easy pre-operative slots`;

const c2_replacement = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Gallbladder Surgery** (URL: \`https://novamaxhospital.com/services/laparoscopy/treatment/laparoscopic-cholecystectomy\`)
        *   *Description Line 1*: Keyhole Gallstone Removal
        *   *Description Line 2*: 24-Hour Daycare Discharge
    2.  **Sitelink 2: Hernia Mesh Repair** (URL: \`https://novamaxhospital.com/services/laparoscopy/treatment/laparoscopic-hernia-repair\`)
        *   *Description Line 1*: Laparoscopic TEP/TAPP Mesh
        *   *Description Line 2*: Sutureless Wall Reinforcement
    3.  **Sitelink 3: Dr. M.K. Sinha Profile** (URL: \`https://novamaxhospital.com/doctors/dr-m-k-sinha\`)
        *   *Description Line 1*: Senior Laparoscopic Surgeon
        *   *Description Line 2*: 30+ Years Operating Experience
    4.  **Sitelink 4: Book Appointment** (URL: \`https://novamaxhospital.com/book-appointment\`)
        *   *Description Line 1*: Direct Surgeon Consultation
        *   *Description Line 2*: Easy pre-operative slots`;

// Campaign 3 replacement
const c3_target = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
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
        *   *Description Line 2*: 100% Discrete & Confidential`;

const c3_replacement = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Varicocele Repair** (URL: \`https://novamaxhospital.com/services/male-infertility/treatment/varicocele-treatment\`)
        *   *Description Line 1*: Microscopic Varicocelectomy
        *   *Description Line 2*: Upgrades Testicular Health
    2.  **Sitelink 2: Sexual Health Care** (URL: \`https://novamaxhospital.com/services/sexology\`)
        *   *Description Line 1*: Confident ED/PE Treatments
        *   *Description Line 2*: Safe, Private Consultation
    3.  **Sitelink 3: Dr. M.K. Sinha Profile** (URL: \`https://novamaxhospital.com/doctors/dr-m-k-sinha\`)
        *   *Description Line 1*: Chief Urologist & Specialist
        *   *Description Line 2*: ex-Sir J.J. Hospital Mumbai
    4.  **Sitelink 4: Book Appointment** (URL: \`https://novamaxhospital.com/book-appointment\`)
        *   *Description Line 1*: Secure Private Consult Slot
        *   *Description Line 2*: 100% Discrete & Confidential`;

// Campaign 4 replacement
const c4_target = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
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
        *   *Description Line 2*: ICU Ventilator support`;

const c4_replacement = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Dr. M.K. Sinha Profile** (URL: \`https://novamaxhospital.com/doctors/dr-m-k-sinha\`)
        *   *Description Line 1*: Chief Urologist & Surgeon
        *   *Description Line 2*: ex-Sir J.J. Hospital Mumbai
    2.  **Sitelink 2: Urology Department** (URL: \`https://novamaxhospital.com/services/urology\`)
        *   *Description Line 1*: Advanced Urology Care
        *   *Description Line 2*: Complete Bladder & Stone Clinic
    3.  **Sitelink 3: Laparoscopy Clinic** (URL: \`https://novamaxhospital.com/services/laparoscopy\`)
        *   *Description Line 1*: Advanced Minimally Invasive
        *   *Description Line 2*: Gallbladder, Hernia, Appendix
    4.  **Sitelink 4: ICU & Emergencies** (URL: \`https://novamaxhospital.com/critical-care\`)
        *   *Description Line 1*: 24/7 Critical Emergency
        *   *Description Line 2*: ICU Ventilator support`;

// Campaign 5 replacement
const c5_target = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
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
        *   *Description Line 2*: Quick Clinical Recovery`;

const c5_replacement = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Urinary Incontinence** (URL: \`https://novamaxhospital.com/services/uro-gynecology/treatment/urinary-incontinence\`)
        *   *Description Line 1*: TVT/TOT Sling Surgery Patna
        *   *Description Line 2*: Stop Accidental Leaking
    2.  **Sitelink 2: Pelvic Prolapse Care** (URL: \`https://novamaxhospital.com/services/uro-gynecology/treatment/pelvic-organ-prolapse\`)
        *   *Description Line 1*: Specialized Ligament Repair
        *   *Description Line 2*: Restore Normal Support
    3.  **Sitelink 3: Gynecologist Consult** (URL: \`https://novamaxhospital.com/services/uro-gynecology/treatment/gynaecological-consultation\`)
        *   *Description Line 1*: PCOS & PCOD Clinical Care
        *   *Description Line 2*: Consult Lady Doctors
    4.  **Sitelink 4: Daycare D&C Procedure** (URL: \`https://novamaxhospital.com/services/uro-gynecology/treatment/dc-procedure\`)
        *   *Description Line 1*: Safe Daycare Procedure
        *   *Description Line 2*: Quick Clinical Recovery`;

// Campaign 6 replacement
const c6_target = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
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
        *   *Description Line 2*: Easy pre-operative checkups`;

const c6_replacement = `*   **Campaign-Level Sitelink Assets (Configure 4)**:
    1.  **Sitelink 1: Appendix Surgery** (URL: \`https://novamaxhospital.com/services/general-surgery/treatment/appendectomy\`)
        *   *Description Line 1*: Open & Laparoscopic Appendix
        *   *Description Line 2*: Urgent Appendicitis Care
    2.  **Sitelink 2: AV Fistula Creation** (URL: \`https://novamaxhospital.com/services/general-surgery/treatment/av-fistula-surgery\`)
        *   *Description Line 1*: Dialysis Access Procedure
        *   *Description Line 2*: High success rate slots
    3.  **Sitelink 3: Dr. M.K. Sinha Profile** (URL: \`https://novamaxhospital.com/doctors/dr-m-k-sinha\`)
        *   *Description Line 1*: Senior General Surgeon Patna
        *   *Description Line 2*: Ex-Sir J.J. Hospital Mumbai
    4.  **Sitelink 4: Book Appointment** (URL: \`https://novamaxhospital.com/book-appointment\`)
        *   *Description Line 1*: Direct Surgeon Consultation
        *   *Description Line 2*: Easy pre-operative checkups`;

let replaced = 0;
if (content.includes(c2_target)) { content = content.replace(c2_target, c2_replacement); replaced++; }
if (content.includes(c3_target)) { content = content.replace(c3_target, c3_replacement); replaced++; }
if (content.includes(c4_target)) { content = content.replace(c4_target, c4_replacement); replaced++; }
if (content.includes(c5_target)) { content = content.replace(c5_target, c5_replacement); replaced++; }
if (content.includes(c6_target)) { content = content.replace(c6_target, c6_replacement); replaced++; }

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully updated sitelinks for ${replaced} campaigns.`);
