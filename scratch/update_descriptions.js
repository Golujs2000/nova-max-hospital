import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'src', 'data', 'hospitalServicesData.js');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  {
    target: `longDescription: 'We offer high-precision Ureteroscopy (URS) and Percutaneous Nephrolithotomy (PCNL) using state-of-the-art laser and pneumatic lithotripsy. These techniques ensure complete clearance of kidney, ureteric, and bladder stones of all sizes without large incisions, minimizing tissue damage and reducing hospital stays to just 24-48 hours.'`,
    replacement: `longDescription: 'We offer high-precision Ureteroscopy (URS) and Percutaneous Nephrolithotomy (PCNL) using state-of-the-art laser and pneumatic lithotripsy. These techniques ensure complete clearance of kidney, ureteric, and bladder stones of all sizes without large incisions, minimizing tissue damage and reducing hospital stays to just 24-48 hours. Our department utilizes high-power holmium lasers to dust hard stones into fine particles, allowing them to pass painlessly, avoiding the complications of traditional open renal surgery.'`
  },
  {
    target: `longDescription: 'Transurethral Resection of the Prostate (TURP) is our specialized treatment for Benign Prostatic Hyperplasia (BPH). Performed endoscopically through the urethra with no external cuts or scars, it immediately relieves urinary blockage, frequency, and hesitation, restoring normal bladder function.'`,
    replacement: `longDescription: 'Transurethral Resection of the Prostate (TURP) is our specialized endoscopic treatment for Benign Prostatic Hyperplasia (BPH) and urinary channel blockage. Performed endoscopically through the urethra with no external cuts or scars, it immediately relieves urinary blockage, frequency, and hesitation, restoring normal bladder function. By utilizing advanced bipolar loop resection, we ensure minimal post-operative bleeding, a brief catheterization window, and rapid healing, allowing senior patients to regain comfortable and controlled urination quickly.'`
  },
  {
    target: `longDescription: 'We provide expert diagnosis and comprehensive treatment strategies for recurrent urinary tract infections (UTIs), interstitial cystitis, overactive bladder, and urinary incontinence. Utilizing urine cultures, cystoscopy, and ultrasound imaging, we identify root causes to formulate long-term wellness plans.'`,
    replacement: `longDescription: 'We provide expert diagnosis and comprehensive treatment strategies for recurrent urinary tract infections (UTIs), interstitial cystitis, overactive bladder, and urinary incontinence. Utilizing urine cultures, cystoscopy, and ultrasound imaging, we identify root causes to formulate long-term wellness plans. Our therapies combine advanced targeted antimicrobial regimens with bladder training protocols and pelvic muscle exercises to treat persistent bacterial colonies, prevent chronic bladder lining inflammation, and guard against potential upper kidney infections.'`
  },
  {
    target: `longDescription: 'Safe, precise surgical management of phimosis, paraphimosis, and hydroceles. Done under local or general anesthesia as daycare procedures, we use modern techniques like laser circumcision and minimal-access hydrocelectomy to ensure quick, aesthetic healing and minimal downtime.'`,
    replacement: `longDescription: 'Safe, precise surgical management of phimosis, paraphimosis, and hydroceles. Done under local or general anesthesia as daycare procedures, we use modern techniques like laser circumcision and minimal-access hydrocelectomy to ensure quick, aesthetic healing and minimal downtime. Our sutureless and laser-assisted methods reduce post-operative swelling and bleeding, ensuring that patients walk home comfortably on the same day and return to light office work within 48 to 72 hours.'`
  },
  {
    target: `longDescription: 'Cystolitholapaxy is a minimally invasive endoscopic procedure where bladder stones are fragmented using laser or ultrasonic energy. Once the stones are crushed into fine particles, they are washed out of the bladder, providing immediate relief from pain, hematuria, and urinary retention.'`,
    replacement: `longDescription: 'Cystolitholapaxy is a minimally invasive endoscopic procedure where bladder stones are fragmented using laser or ultrasonic energy. Once the stones are crushed into fine particles, they are washed out of the bladder, providing immediate relief from pain, hematuria, and urinary retention. This procedure is performed using micro-endoscopes passed directly through the natural urinary tract, eliminating any need for external cuts, lowering infection rates, and allowing patients to return home within 24 hours with full bladder functionality restored.'`
  },
  {
    target: `longDescription: 'Retrograde Intrarenal Surgery (RIRS) is a cutting-edge, incisionless procedure using a flexible ureteroscope. It allows the surgeon to navigate the entire kidney cavity to dust hard-to-reach stones with a Holmium laser fiber, allowing same-day discharge and zero scars.'`,
    replacement: `longDescription: 'Retrograde Intrarenal Surgery (RIRS) is a cutting-edge, incisionless procedure using a flexible ureteroscope. It allows the surgeon to navigate the entire kidney cavity to dust hard-to-reach stones with a Holmium laser fiber, allowing same-day discharge and zero scars. By utilizing flexible, steerable fiber-optic cameras, we can navigate the complex anatomy of the renal calyces to vaporize stones that are otherwise unreachable by conventional rigid scopes, making it the premier choice for complex or bilateral kidney stones.'`
  },
  {
    target: `longDescription: 'Laparoscopic Cholecystectomy is a highly routine keyhole surgery to remove the gallbladder. It is the definitive treatment for symptomatic gallstones and cholecystitis, preventing severe complications like pancreatitis, jaundice, or infection through tiny 5-10mm incisions.'`,
    replacement: `longDescription: 'Laparoscopic Cholecystectomy is a highly routine keyhole surgery to remove the gallbladder. It is the definitive treatment for symptomatic gallstones and cholecystitis, preventing severe complications like pancreatitis, jaundice, or infection through tiny 5-10mm incisions. Our surgical team uses high-definition camera towers to isolate the gallbladder ducts safely and remove the organ with absolute precision, leading to minor scar lines, negligible pain, and allowing patients to be fully active within a week.'`
  },
  {
    target: `longDescription: 'Using advanced TEP (Totally Extraperitoneal) or TAPP (Transabdominal Preperitoneal) techniques, our surgeons repair inguinal, umbilical, and incisional hernias. Placing a high-quality surgical mesh under laparoscopic vision reinforces the abdominal wall, dramatically lowering recurrence rates and post-op pain.'`,
    replacement: `longDescription: 'Using advanced TEP (Totally Extraperitoneal) or TAPP (Transabdominal Preperitoneal) techniques, our surgeons repair inguinal, umbilical, and incisional hernias. Placing a high-quality surgical mesh under laparoscopic vision reinforces the abdominal wall, dramatically lowering recurrence rates and post-op pain. Since the repair is performed from behind the abdominal wall, the natural pressure of the abdomen helps keep the mesh in place, leading to a much stronger repair and a faster return to strenuous activities.'`
  },
  {
    target: `longDescription: 'A swift, minimally invasive surgical procedure to remove an inflamed or infected appendix. Laparoscopic appendectomy reduces the risk of wound infections, enables a quicker transition to solid food, and ensures minimal abdominal discomfort compared to traditional open surgeries.'`,
    replacement: `longDescription: 'A swift, minimally invasive surgical procedure to remove an inflamed or infected appendix. Laparoscopic appendectomy reduces the risk of wound infections, enables a quicker transition to solid food, and ensures minimal abdominal discomfort compared to traditional open surgeries. It allows our surgeons to thoroughly inspect the peritoneal cavity for inflammation, irrigate any localized fluids, and close the incisions with cosmetic sutures, meaning patients can go home the very next morning.'`
  },
  {
    target: `longDescription: 'When laboratory tests and scans are inconclusive, diagnostic laparoscopy provides direct high-definition visualization of abdominal and pelvic organs. This allows our surgeons to identify conditions like endometriosis, chronic pelvic pain, or adhesions, and take biopsies if required.'`,
    replacement: `longDescription: 'When laboratory tests and scans are inconclusive, diagnostic laparoscopy provides direct high-definition visualization of abdominal and pelvic organs. This allows our surgeons to identify conditions like endometriosis, chronic pelvic pain, or adhesions, and take biopsies if required. By inserting a micro-camera through a single keyhole incision, we can diagnose obscure pelvic abnormalities, assess internal scar tissues, and plan final therapeutic surgical interventions during the same session.'`
  },
  {
    target: `longDescription: 'Open appendectomy remains a reliable surgical choice, especially in cases where the appendix has ruptured, formed an abscess, or when laparoscopic surgery is contraindicated. Our surgeons perform this procedure with meticulous care to clean the abdominal cavity and ensure smooth recovery.'`,
    replacement: `longDescription: 'Open appendectomy remains a reliable surgical choice, especially in cases where the appendix has ruptured, formed an abscess, or when laparoscopic surgery is contraindicated. Our surgeons perform this procedure with meticulous care to clean the abdominal cavity and ensure smooth recovery. A small, precise incision in the lower right abdomen provides direct access to manage complex perforated appendicitis, control localized peritonitis, and place drainage tubes if necessary to guarantee patient safety.'`
  },
  {
    target: `longDescription: 'Traditional open hernioplasty involves a localized incision directly over the hernia. The protruding tissue is safely pushed back, and a durable synthetic mesh is sutured to support and reinforce the weakened abdominal muscle wall, ensuring a strong, permanent cure.'`,
    replacement: `longDescription: 'Traditional open hernioplasty involves a localized incision directly over the hernia. The protruding tissue is safely pushed back, and a durable synthetic mesh is sutured to support and reinforce the weakened abdominal muscle wall, ensuring a strong, permanent cure. This method is highly effective for large, irreducible, or strangulated hernias where direct physical manipulation and reconstruction of the fascia are needed to prevent intestinal compromise.'`
  },
  {
    target: `longDescription: 'We offer immediate surgical decompression, incision, and drainage for painful abscesses, carbuncles, and deep-tissue infections. This is paired with advanced diabetic wound debridement and sterile dressings to promote rapid tissue granulation and prevent severe systemic infections.'`,
    replacement: `longDescription: 'We offer immediate surgical decompression, incision, and drainage for painful abscesses, carbuncles, and deep-tissue infections. This is paired with advanced diabetic wound debridement and sterile dressings to promote rapid tissue granulation and prevent severe systemic infections. Our clinical team utilizes sterile packings and specialized healing gels to manage chronic ulcers, ensuring that diabetic patients receive continuous, structured care to avoid complications.'`
  },
  {
    target: `longDescription: 'A simple, painless daycare procedure to excise benign skin swellings like sebaceous cysts, lipomas, or dermatofibromas. Done under local anesthesia in under 30 minutes, we prioritize aesthetic skin closure with dissolvable sutures to minimize scarring.'`,
    replacement: `longDescription: 'A simple, painless daycare procedure to excise benign skin swellings like sebaceous cysts, lipomas, or dermatofibromas. Done under local anesthesia in under 30 minutes, we prioritize aesthetic skin closure with dissolvable sutures to minimize scarring. The entire mass is removed intact, including the surrounding capsule for cysts, to eliminate any chance of recurrence and ensure complete aesthetic and pathological clearing.'`
  },
  {
    target: `longDescription: 'Comprehensive evaluation and treatment plans for uterine, bladder (cystocele), and rectal (rectocele) prolapse. Depending on severity, we offer vaginal pessary fittings or advanced pelvic reconstruction surgeries (sacrocolpopexy, pelvic floor repairs) to restore normal anatomy and pelvic comfort.'`,
    replacement: `longDescription: 'Comprehensive evaluation and treatment plans for uterine, bladder (cystocele), and rectal (rectocele) prolapse. Depending on severity, we offer vaginal pessary fittings or advanced pelvic reconstruction surgeries (sacrocolpopexy, pelvic floor repairs) to restore normal anatomy and pelvic comfort. Our specialized surgical protocols focus on repairing and tightening the supportive ligaments of the pelvis to relieve feelings of pressure, ease lower back aching, and fully restore normal bowel and bladder movements.'`
  },
  {
    target: `longDescription: 'Specialized care for women suffering from stress urinary incontinence (leakage with physical activity) or urge incontinence (overactive bladder). We offer customized pelvic floor therapy, lifestyle interventions, and high-success minimally invasive sling (TVT/TOT) procedures.'`,
    replacement: `longDescription: 'Specialized care for women suffering from stress urinary incontinence (leakage with physical activity) or urge incontinence (overactive bladder). We offer customized pelvic floor therapy, lifestyle interventions, and high-success minimally invasive sling (TVT/TOT) procedures. These modern mid-urethral slings act as a supportive hammock under the urethra, stopping accidental leaks during coughing, laughing, or exercising, and letting women live their lives with absolute freedom and confidence.'`
  },
  {
    target: `longDescription: 'We offer highly personalized clinical consultations addressing key reproductive health issues. Our services cover puberty management, irregular cycles, ovarian cysts, PCOS/PCOD, contraceptive counseling, and postmenopausal healthcare, ensuring complete well-being at every stage of life.'`,
    replacement: `longDescription: 'We offer highly personalized clinical consultations addressing key reproductive health issues. Our services cover puberty management, irregular cycles, ovarian cysts, PCOS/PCOD, contraceptive counseling, and postmenopausal healthcare, ensuring complete well-being at every stage of life. Our lady consultant provides a supportive, private space to diagnose hormonal imbalances, manage chronic pelvic pain, and guide couples through basic pre-conception checkups.'`
  },
  {
    target: `longDescription: 'Dilation and Curettage (D&C) is a brief daycare procedure performed under mild sedation. The cervix is gently dilated, and the uterine lining is carefully sampled or cleared. It is highly effective for diagnosing abnormal bleeding, uterine polyps, or managing early miscarriage.'`,
    replacement: `longDescription: 'Dilation and Curettage (D&C) is a brief daycare procedure performed under mild sedation. The cervix is gently dilated, and the uterine lining is carefully sampled or cleared. It is highly effective for diagnosing abnormal bleeding, uterine polyps, or managing early miscarriage. The tissue obtained is sent for histopathological analysis to provide diagnostic clarity, and the procedure itself helps resolve heavy uterine bleeding instantly, letting patients return to routine life within 48 hours.'`
  },
  {
    target: `longDescription: 'A basic yet critical laboratory analysis that evaluates key semen parameters: sperm concentration, active motility, morphology (shape), and vitality. Conducted under strict quality controls to give couples a clear starting point for their fertility journey.'`,
    replacement: `longDescription: 'A basic yet critical laboratory analysis that evaluates key semen parameters: sperm concentration, active motility, morphology (shape), and vitality. Conducted under strict quality controls to give couples a clear starting point for their fertility journey. Our laboratory uses computerized metrics to evaluate sperm health, helping identify issues like oligospermia (low count) or asthenozoospermia (poor motility) to design precise medical and lifestyle intervention programs.'`
  },
  {
    target: `longDescription: 'Varicocele is a primary cause of male infertility. We specialize in Microscopic Varicocelectomy, a gold-standard surgical technique that ligates abnormal veins in the scrotum. This improves testicular temperature and blood circulation, significantly upgrading sperm parameters.'`,
    replacement: `longDescription: 'Varicocele is a primary cause of male infertility. We specialize in Microscopic Varicocelectomy, a gold-standard surgical technique that ligates abnormal veins in the scrotum. This improves testicular temperature and blood circulation, significantly upgrading sperm parameters. Using high-magnification operating microscopes allows our urologist to preserve delicate lymphatic vessels and testicular arteries while closing abnormal veins, reducing recurrence risks to near-zero.'`
  },
  {
    target: `longDescription: 'Evaluating endocrine systems (testosterone, LH, FSH, prolactin) that control sperm production. Our specialists offer evidence-based hormone replacement or balancing therapies to optimize sperm count, quality, and overall vitality.'`,
    replacement: `longDescription: 'Evaluating endocrine systems (testosterone, LH, FSH, prolactin) that control sperm production. Our specialists offer evidence-based hormone replacement or balancing therapies to optimize sperm count, quality, and overall vitality. By diagnosing pituitary or testicular gland anomalies, we customize treatment plans using oral medications or targeted injections to restore optimal testicular function and resolve fertility-limiting deficiencies.'`
  },
  {
    target: `longDescription: 'Tailored treatment protocols for erectile dysfunction that target the root cause—whether vascular, hormonal, or stress-related. We design holistic regimens using modern pharmacotherapy, lifestyle counseling, and hormone balancing to restore confidence.'`,
    replacement: `longDescription: 'Tailored treatment protocols for erectile dysfunction that target the root cause—whether vascular, hormonal, or stress-related. We design holistic regimens using modern pharmacotherapy, lifestyle counseling, and hormone balancing to restore confidence. By focusing on cardiovascular flow improvements and addressing underlying metabolic factors like diabetes or hypertension, we offer sustainable, medical solutions that enhance physical response and overall intimacy.'`
  },
  {
    target: `longDescription: 'We employ a combination of medical therapy, topical treatments, and behavioral retraining techniques (such as the start-stop and squeeze methods). This structured approach helps patients build control, reduce performance stress, and achieve lasting satisfaction.'`,
    replacement: `longDescription: 'We employ a combination of medical therapy, topical treatments, and behavioral retraining techniques (such as the start-stop and squeeze methods). This structured approach helps patients build control, reduce performance stress, and achieve lasting satisfaction. Our clinical consultations provide practical, evidence-based guidelines that build ejaculatory stamina, relieve performance anxiety, and significantly improve mutual relationship satisfaction.'`
  },
  {
    target: `longDescription: 'Dedicated counseling sessions designed to resolve the mental and emotional stress associated with sexual performance. Our specialist guides patients and their partners through stress-reduction techniques and communication strategies to rebuild intimacy.'`,
    replacement: `longDescription: 'Dedicated counseling sessions designed to resolve the mental and emotional stress associated with sexual performance. Our specialist guides patients and their partners through stress-reduction techniques and communication strategies to rebuild intimacy. By breaking the cycle of self-monitoring and performance dread, we help patients overcome psychogenic blocks, rebuild self-esteem, and establish a comfortable, stress-free connection.'`
  },
  {
    target: `longDescription: 'Continuous life-support monitoring, medication administration, and one-on-one nursing for critically ill patients, those in shock, or recovering from major surgeries. Our medical staff is trained for immediate cardiopulmonary resuscitation.'`,
    replacement: `longDescription: 'Continuous life-support monitoring, medication administration, and one-on-one nursing for critically ill patients, those in shock, or recovering from major surgeries. Our medical staff is trained for immediate cardiopulmonary resuscitation. Managed continuously by dedicated critical care physicians (intensivists), the unit ensures immediate adjustment of vasoactive medications, electrolyte balancing, and close tracking of hemodynamic vitals.'`
  },
  {
    target: `longDescription: 'Critical respiratory support utilizing advanced mechanical ventilators. We manage patients experiencing respiratory failure, ARDS, severe pneumonia, or those recovering from complex general anesthesia, ensuring optimal blood oxygenation.'`,
    replacement: `longDescription: 'Critical respiratory support utilizing advanced mechanical ventilators. We manage patients experiencing respiratory failure, ARDS, severe pneumonia, or those recovering from complex general anesthesia, ensuring optimal blood oxygenation. Our critical care team monitors blood gas levels constantly, adjusting pressures and oxygen blends to rest the patient\\'s lungs while maintaining organ function during critical medical phases.'`
  },
  {
    target: `longDescription: 'Our High Dependency Unit (HDU) provides intermediate care for patients after major surgeries. We closely monitor blood pressure, heart rate, fluid input-output, surgical drain output, and manage post-operative pain to prevent any acute complications.'`,
    replacement: `longDescription: 'Our High Dependency Unit (HDU) provides intermediate care for patients after major surgeries. We closely monitor blood pressure, heart rate, fluid input-output, surgical drain output, and manage post-operative pain to prevent any acute complications. This transitional care bridges the gap between the intensive care unit and general rooms, offering high-attention nursing to ensure a safe, comfortable recovery.'`
  },
  {
    target: `longDescription: 'Our dialysis unit provides high-safety renal replacement therapy using advanced hemodialysis machines. We filter toxic waste products, extra fluids, and balance blood chemistry for patients with acute kidney injury or end-stage renal disease (ESRD).'`,
    replacement: `longDescription: 'Our dialysis unit provides high-safety renal replacement therapy using advanced hemodialysis machines. We filter toxic waste products, extra fluids, and balance blood chemistry for patients with acute kidney injury or end-stage renal disease (ESRD). Supported by continuous cardiac monitoring, pure water treatment plants, and emergency backup generators, we deliver comfortable, highly hygienic dialysis sessions to renal patients.'`
  },
  {
    target: `longDescription: 'A vital diagnostic panel that measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. Essential for diagnosing infections, chronic anemia, and ensuring surgical fitness for all procedures.'`,
    replacement: `longDescription: 'A vital diagnostic panel that measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. Essential for diagnosing infections, chronic anemia, and ensuring surgical fitness for all procedures. Our fully automated hematology analyzers produce rapid, highly accurate cell profile outputs within minutes, allowing doctors to detect inflammatory markers and issue immediate clinical clearances.'`
  },
  {
    target: `longDescription: 'Advanced biochemical panels that measure liver enzymes (SGOT, SGPT, bilirubin, alkaline phosphatase) and kidney markers (creatinine, blood urea nitrogen, uric acid). Important for monitoring chronic diseases and medication safety.'`,
    replacement: `longDescription: 'Advanced biochemical panels that measure liver enzymes (SGOT, SGPT, bilirubin, alkaline phosphatase) and kidney markers (creatinine, blood urea nitrogen, uric acid). Important for monitoring chronic diseases and medication safety. These tests analyze essential biochemical parameters to assess organ filtration rates and metabolic processing, allowing for precise drug dosage adjustments and pre-op fitness evaluations.'`
  },
  {
    target: `longDescription: 'Detailed routine and microscopic urine tests to check for proteins, glucose (diabetes screening), pus cells (UTI screening), and microscopic crystals (kidney stone diagnostics). Assists in immediate clinical diagnosis.'`,
    replacement: `longDescription: 'Detailed routine and microscopic urine tests to check for proteins, glucose (diabetes screening), pus cells (UTI screening), and microscopic crystals (kidney stone diagnostics). Assists in immediate clinical diagnosis. Our pathology lab evaluates chemical composition and physical properties of urine to identify early renal filtration deficits, detect silent infections, and monitor metabolic stability.'`
  }
];

let replacedCount = 0;
for (const r of replacements) {
  if (content.includes(r.target)) {
    content = content.replace(r.target, r.replacement);
    replacedCount++;
  } else {
    console.warn(`WARNING: Target string not found for replacement: ${r.target.slice(0, 40)}...`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully completed ${replacedCount} of ${replacements.length} replacements.`);
