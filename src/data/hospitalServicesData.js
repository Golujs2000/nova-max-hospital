// ─────────────────────────────────────────────────────────────
// src/data/hospitalServicesData.js
// Central structured data for departments and surgical services.
// Provides detailed descriptions, highlights, and treatment lists.
// ─────────────────────────────────────────────────────────────

export const siteSpecialties = [
  // ── Surgical Services ───────────────────────────────────────
  {
    id: 'urology',
    name: 'Urology',
    slug: 'urology',
    icon: '🫘',
    category: 'Surgical Services',
    available: 'OPD Hours',
    description: 'Highly advanced urological care specializing in laser kidney stone extraction (URS, PCNL, RIRS), prostate disorders, bladder issues, and comprehensive urinary tract solutions.',
    longDescription: 'Our Urology department is a center of excellence providing world-class diagnostic and surgical solutions for all kidney, bladder, and urinary tract disorders. Led by leading urologists, we utilize state-of-the-art medical technology to offer minimally invasive surgeries, comprehensive prostate management, and expert daycare procedures. We ensure high-precision interventions with minimal pain and rapid recovery.',
    features: [
      'Advanced Kidney Stone Management (URS, PCNL, RIRS)',
      'Prostate Evaluation and TURP Surgery',
      'Urinary Tract Infection (UTI) and Bladder Care',
      'Circumcision and Hydrocele Day Care Surgeries',
      'Modern Hemodialysis Support'
    ],
    recoveryTime: '1 – 3 Days',
    order: 1,
    treatments: [
      {
        name: 'Kidney Stone Treatment (URS / PCNL)',
        slug: 'kidney-stone-treatment',
        duration: '45 – 90 mins',
        recovery: '1 – 3 days',
        description: 'Advanced minimally invasive and laser procedures for swift and precise kidney stone removal.',
        longDescription: 'We offer high-precision Ureteroscopy (URS) and Percutaneous Nephrolithotomy (PCNL) using state-of-the-art laser and pneumatic lithotripsy. These techniques ensure complete clearance of kidney, ureteric, and bladder stones of all sizes without large incisions, minimizing tissue damage and reducing hospital stays to just 24-48 hours. Our department utilizes high-power holmium lasers to dust hard stones into fine particles, allowing them to pass painlessly, avoiding the complications of traditional open renal surgery.',
        indications: ['Obstructing kidney stones', 'Severe persistent renal colic', 'Stones larger than 7mm'],
        benefits: ['No open incision', 'Short hospital stay', 'Minimal blood loss'],
        preparation: ['Fast for 6-8 hours', 'Complete blood and urine tests', 'Discontinue blood thinners as advised']
      },
      {
        name: 'Prostate Surgery (TURP)',
        slug: 'prostate-surgery',
        duration: '60 mins',
        recovery: '2 – 4 days',
        description: 'Endoscopic laser and conventional resection for enlarged prostate and urinary relief.',
        longDescription: 'Transurethral Resection of the Prostate (TURP) is our specialized endoscopic treatment for Benign Prostatic Hyperplasia (BPH) and urinary channel blockage. Performed endoscopically through the urethra with no external cuts or scars, it immediately relieves urinary blockage, frequency, and hesitation, restoring normal bladder function. By utilizing advanced bipolar loop resection, we ensure minimal post-operative bleeding, a brief catheterization window, and rapid healing, allowing senior patients to regain comfortable and controlled urination quickly.',
        indications: ['Severe urinary retention', 'Recurrent UTIs due to BPH', 'Bladder stones or kidney damage from obstruction'],
        benefits: ['Restores normal urine flow', 'Improves bladder emptying', 'High success rate'],
        preparation: ['Fasting from midnight', 'Stop antiplatelet medications', 'Pre-anesthetic evaluation']
      },
      {
        name: 'UTI & Bladder Care',
        slug: 'uti-bladder-care',
        duration: '30 mins',
        recovery: 'Immediate',
        description: 'Thorough diagnostic workups and customized treatment plans for urinary infections and bladder dysfunctions.',
        longDescription: 'We provide expert diagnosis and comprehensive treatment strategies for recurrent urinary tract infections (UTIs), interstitial cystitis, overactive bladder, and urinary incontinence. Utilizing urine cultures, cystoscopy, and ultrasound imaging, we identify root causes to formulate long-term wellness plans. Our therapies combine advanced targeted antimicrobial regimens with bladder training protocols and pelvic muscle exercises to treat persistent bacterial colonies, prevent chronic bladder lining inflammation, and guard against potential upper kidney infections.',
        indications: ['Painful urination', 'Frequent or urgent urination', 'Blood in urine'],
        benefits: ['Rapid symptom relief', 'Prevention of kidney infections', 'Personalized long-term management plans'],
        preparation: ['Bring mid-stream urine sample', 'Document symptom history']
      },
      {
        name: 'Circumcision & Hydrocele Surgery',
        slug: 'circumcision-hydrocele-surgery',
        duration: '30 – 45 mins',
        recovery: '3 – 7 days',
        description: 'Advanced daycare surgeries ensuring minimal post-op discomfort and aesthetic healing.',
        longDescription: 'Safe, precise surgical management of phimosis, paraphimosis, and hydroceles. Done under local or general anesthesia as daycare procedures, we use modern techniques like laser circumcision and minimal-access hydrocelectomy to ensure quick, aesthetic healing and minimal downtime. Our sutureless and laser-assisted methods reduce post-operative swelling and bleeding, ensuring that patients walk home comfortably on the same day and return to light office work within 48 to 72 hours.',
        indications: ['Phimosis or recurring balanitis', 'Symptomatic hydrocele', 'Scrotal swelling/heaviness'],
        benefits: ['Permanent cure', 'Minimal post-operative pain', 'Discharge on the same day'],
        preparation: ['Clean the local area', 'Wear loose-fitting clothing']
      },
      {
        name: 'UTI, Bladder & Hydrocele Care',
        slug: 'uti-bladder-hydrocele-care',
        duration: '30 – 60 mins',
        recovery: '1 – 5 days',
        description: 'Comprehensive diagnostic and surgical solutions for painful UTIs, bladder disorders, and daycare hydrocele treatments.',
        longDescription: 'Our specialized UTI, Bladder & Hydrocele Care program provides comprehensive, state-of-the-art diagnostic and therapeutic management for a wide spectrum of urological and scrotal conditions. Urinary Tract Infections (UTIs), if left untreated or improperly managed, can lead to recurrent bladder inflammation (cystitis) or ascend to cause severe kidney damage. We utilize precise, culture-guided antimicrobial therapies, advanced diagnostic cystoscopy, and ultrasound imaging to pinpoint the exact root causes of recurrent UTIs and chronic bladder dysfunction. For patients suffering from bladder conditions (such as interstitial cystitis, bladder stones, and neurogenic bladder), our department offers highly effective medical and endoscopic interventions, including laser cystolitholapaxy to safely disintegrate stones without open cuts. Concurrently, our daycare surgical division specializes in advanced, minimal-access hydrocele surgery (hydrocelectomy) to treat fluid accumulation in the scrotum. This minimally invasive procedure involves making a tiny incision to drain the fluid and excise or plicate the hydrocele sac, ensuring zero recurrence, clean cosmetic healing, minimal post-operative swelling, and the convenience of same-day discharge. By combining advanced clinical protocols with patient-centric care, we deliver rapid relief, prevent future complications, and help patients return to their daily routines within a few days with fully restored comfort and confidence.',
        indications: [
          'Recurrent or painful urinary tract infections (UTIs)',
          'Bladder discomfort, pressure, or stones',
          'Scrotal swelling, heaviness, or pain (Hydrocele)',
          'Difficulty or pain during urination'
        ],
        benefits: [
          'Effective symptom relief and infection clearance',
          'Minimally invasive daycare procedures',
          'Improved bladder and urological health',
          'Fast recovery with minimal discomfort'
        ],
        preparation: [
          'For UTIs, bring a fresh mid-stream urine sample',
          'For surgeries (like hydrocelectomy or bladder procedures), fast for 6-8 hours',
          'Report all current medications to your urologist',
          'Wear loose, comfortable clothing'
        ]
      },
      {
        name: 'RIRS (Flexible Ureteroscopy)',
        slug: 'rirs',
        duration: '60 – 90 mins',
        recovery: '1 – 2 days',
        description: 'Advanced retrograde intrarenal surgery using flexible scopes and laser to target deep kidney stones.',
        longDescription: 'Retrograde Intrarenal Surgery (RIRS) is a cutting-edge, incisionless procedure using a flexible ureteroscope. It allows the surgeon to navigate the entire kidney cavity to dust hard-to-reach stones with a Holmium laser fiber, allowing same-day discharge and zero scars. By utilizing flexible, steerable fiber-optic cameras, we can navigate the complex anatomy of the renal calyces to vaporize stones that are otherwise unreachable by conventional rigid scopes, making it the premier choice for complex or bilateral kidney stones.',
        indications: ['Upper ureteral stones', 'Intrarenal kidney stones up to 2cm', 'Failed ESWL'],
        benefits: ['Zero external cuts', 'Accesses deep kidney cavities', 'High stone clearance rate'],
        preparation: ['Fasting required', 'Pre-op urine culture must be sterile']
      }
    ]
  },
  {
    id: 'laparoscopy',
    name: 'Laparoscopy',
    slug: 'laparoscopy',
    icon: '🔬',
    category: 'Surgical Services',
    available: 'OPD Hours',
    description: 'Advanced minimally invasive keyhole surgeries for gallbladder stones, hernia repairs, and appendicitis, ensuring minimal scarring.',
    longDescription: 'The Laparoscopic Surgery division at Nova Max Hospital is equipped with high-definition modular operation theatres. We specialize in advanced keyhole surgeries that offer patients significant benefits over open surgery: minimal post-operative pain, negligible blood loss, minor scars, and a return to normal life within 24 to 48 hours.',
    features: [
      'Gold Standard Laparoscopic Cholecystectomy (Gallstones)',
      'TEP and TAPP Laparoscopic Hernia Repairs',
      'Minimally Invasive Appendectomy',
      'Diagnostic Laparoscopy for Pelvic/Abdominal Pain',
      'Modular Operation Theatre'
    ],
    recoveryTime: '1 – 2 Days',
    order: 2,
    treatments: [
      {
        name: 'Laparoscopic Cholecystectomy (Gallstone)',
        slug: 'laparoscopic-cholecystectomy',
        duration: '45 – 60 mins',
        recovery: '1 – 2 days',
        description: 'Gold standard laparoscopic removal of the gallbladder to treat gallstones and inflammation permanently.',
        longDescription: 'Laparoscopic Cholecystectomy is a highly routine keyhole surgery to remove the gallbladder. It is the definitive treatment for symptomatic gallstones and cholecystitis, preventing severe complications like pancreatitis, jaundice, or infection through tiny 5-10mm incisions. Our surgical team uses high-definition camera towers to isolate the gallbladder ducts safely and remove the organ with absolute precision, leading to minor scar lines, negligible pain, and allowing patients to be fully active within a week.',
        indications: ['Symptomatic gallstones (cholelithiasis)', 'Gallbladder inflammation (cholecystitis)', 'Gallbladder polyps'],
        benefits: ['Tiny scars', 'Discharge within 24 hours', 'Minimal post-op pain'],
        preparation: ['Fasting for 8 hours', 'Normal coagulation profile', 'Liver function tests']
      },
      {
        name: 'Laparoscopic Hernia Repair (TEP/TAPP)',
        slug: 'laparoscopic-hernia-repair',
        duration: '60 – 90 mins',
        recovery: '2 – 4 days',
        description: 'Minimally invasive mesh reinforcement for groin and abdominal wall hernias.',
        longDescription: 'Using advanced TEP (Totally Extraperitoneal) or TAPP (Transabdominal Preperitoneal) techniques, our surgeons repair inguinal, umbilical, and incisional hernias. Placing a high-quality surgical mesh under laparoscopic vision reinforces the abdominal wall, dramatically lowering recurrence rates and post-op pain. Since the repair is performed from behind the abdominal wall, the natural pressure of the abdomen helps keep the mesh in place, leading to a much stronger repair and a faster return to strenuous activities.',
        indications: ['Inguinal hernia', 'Umbilical hernia', 'Incisional or recurrent hernia'],
        benefits: ['Bilateral hernias fixed through same cuts', 'Low recurrence rate', 'Quick return to work'],
        preparation: ['Fasting from midnight', 'Stop medications affecting clotting', 'Chest X-ray and ECG']
      },
      {
        name: 'Laparoscopic Appendectomy',
        slug: 'laparoscopic-appendectomy',
        duration: '45 mins',
        recovery: '1 – 2 days',
        description: 'Urgent or planned keyhole surgical excision of an inflamed appendix for rapid recovery.',
        longDescription: 'A swift, minimally invasive surgical procedure to remove an inflamed or infected appendix. Laparoscopic appendectomy reduces the risk of wound infections, enables a quicker transition to solid food, and ensures minimal abdominal discomfort compared to traditional open surgeries. It allows our surgeons to thoroughly inspect the peritoneal cavity for inflammation, irrigate any localized fluids, and close the incisions with cosmetic sutures, meaning patients can go home the very next morning.',
        indications: ['Acute appendicitis', 'Chronic/recurrent appendiceal pain'],
        benefits: ['Less wound infection risk', 'Very low pain', 'Discharge next day'],
        preparation: ['NPO (nil by mouth) immediately', 'Intravenous fluids and antibiotics', 'Emergency pre-op workup']
      },
      {
        name: 'Diagnostic Laparoscopy',
        slug: 'diagnostic-laparoscopy',
        duration: '30 – 45 mins',
        recovery: '1 day',
        description: 'Keyhole visual exploration of pelvic and abdominal cavities to diagnose unresolved symptoms.',
        longDescription: 'When laboratory tests and scans are inconclusive, diagnostic laparoscopy provides direct high-definition visualization of abdominal and pelvic organs. This allows our surgeons to identify conditions like endometriosis, chronic pelvic pain, or adhesions, and take biopsies if required. By inserting a micro-camera through a single keyhole incision, we can diagnose obscure pelvic abnormalities, assess internal scar tissues, and plan final therapeutic surgical interventions during the same session.',
        indications: ['Unexplained abdominal pain', 'Endometriosis evaluation', 'Infertility workup'],
        benefits: ['Direct visual diagnosis', 'Biopsy can be taken during same session'],
        preparation: ['Fasting required', 'Routine blood investigations']
      }
    ]
  },
  {
    id: 'general-surgery',
    name: 'General Surgery',
    slug: 'general-surgery',
    icon: '🔪',
    category: 'Surgical Services',
    available: 'OPD Hours',
    description: 'Expert surgical care for hernias, appendicitis, diabetic wounds, skin lumps, and complex abdominal conditions.',
    longDescription: 'Our General Surgery department provides a wide spectrum of open and laser surgical interventions. Backed by senior surgeons with decades of operating experience, we manage elective and emergency surgeries, abdominal trauma, diabetic wound care, and minor daycare excisions with absolute precision.',
    features: [
      'Advanced open surgeries and trauma care',
      'Abscess drainage and diabetic wound care',
      'Excision of cysts, lipomas, and skin lesions',
      'Advanced Laser and Stapled Piles surgery',
      'AV Fistula creation for dialysis access'
    ],
    recoveryTime: '2 – 7 Days',
    order: 3,
    treatments: [
      {
        name: 'Appendectomy',
        slug: 'appendectomy',
        duration: '45 – 60 mins',
        recovery: '3 – 7 days',
        description: 'Traditional open surgical removal of the appendix, recommended for complex or ruptured appendicitis.',
        longDescription: 'Open appendectomy remains a reliable surgical choice, especially in cases where the appendix has ruptured, formed an abscess, or when laparoscopic surgery is contraindicated. Our surgeons perform this procedure with meticulous care to clean the abdominal cavity and ensure smooth recovery. A small, precise incision in the lower right abdomen provides direct access to manage complex perforated appendicitis, control localized peritonitis, and place drainage tubes if necessary to guarantee patient safety.',
        indications: ['Complicated/perforated appendix', 'Acute appendicitis'],
        benefits: ['Reliable treatment', 'Applicable to complex anatomy'],
        preparation: ['Fasting required', 'General medical clearance']
      },
      {
        name: 'Hernia Repair Surgery',
        slug: 'hernia-repair-surgery',
        duration: '60 mins',
        recovery: '3 – 7 days',
        description: 'Conventional open hernia repair with strong mesh reinforcement for lasting support.',
        longDescription: 'Traditional open hernioplasty involves a localized incision directly over the hernia. The protruding tissue is safely pushed back, and a durable synthetic mesh is sutured to support and reinforce the weakened abdominal muscle wall, ensuring a strong, permanent cure. This method is highly effective for large, irreducible, or strangulated hernias where direct physical manipulation and reconstruction of the fascia are needed to prevent intestinal compromise.',
        indications: ['Inguinal, umbilical, or femoral hernia'],
        benefits: ['Sturdy repair', 'Highly reliable long-term results'],
        preparation: ['Pre-anesthetic screen', 'Fasting from midnight']
      },
      {
        name: 'Abscess Drainage & Wound Care',
        slug: 'abscess-drainage',
        duration: '15 – 30 mins',
        recovery: '1 – 2 days',
        description: 'Surgical drainage of deep-seated infections and professional wound care management.',
        longDescription: 'We offer immediate surgical decompression, incision, and drainage for painful abscesses, carbuncles, and deep-tissue infections. This is paired with advanced diabetic wound debridement and sterile dressings to promote rapid tissue granulation and prevent severe systemic infections. Our clinical team utilizes sterile packings and specialized healing gels to manage chronic ulcers, ensuring that diabetic patients receive continuous, structured care to avoid complications.',
        indications: ['Skin and deep tissue abscesses', 'Infected surgical or diabetic wounds'],
        benefits: ['Immediate pain relief', 'Prevents spread of infection'],
        preparation: ['Local area cleansing', 'Tetanus status check']
      },
      {
        name: 'Lipoma & Cyst Removal',
        slug: 'lipoma-cyst-removal',
        duration: '20 – 30 mins',
        recovery: 'Immediate',
        description: 'Quick daycare surgical removal of skin nodules, cysts, and lipomas under local anesthesia.',
        longDescription: 'A simple, painless daycare procedure to excise benign skin swellings like sebaceous cysts, lipomas, or dermatofibromas. Done under local anesthesia in under 30 minutes, we prioritize aesthetic skin closure with dissolvable sutures to minimize scarring. The entire mass is removed intact, including the surrounding capsule for cysts, to eliminate any chance of recurrence and ensure complete aesthetic and pathological clearing.',
        indications: ['Cosmetic concerns', 'Painful or growing skin swellings', 'Infected sebaceous cysts'],
        benefits: ['Done in 30 minutes', 'Walk-home immediately', 'Minimal scarring'],
        preparation: ['No fasting required', 'Clean skin area']
      },
      {
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
        ]
      }
    ]
  },

  // ── Hospital Departments ────────────────────────────────────
  {
    id: 'uro-gynecology',
    name: 'Uro Gynecology',
    slug: 'uro-gynecology',
    icon: '🤰',
    category: 'Hospital Departments',
    available: 'OPD Hours',
    description: 'Comprehensive management of female pelvic floor issues, urinary incontinence, and reproductive health problems.',
    longDescription: 'Our Uro Gynecology department is a specialized subspecialty providing compassionate and expert care for women experiencing pelvic floor disorders. We provide advanced clinical solutions for pelvic organ prolapse, urinary leakage, menstrual irregularities, and gynecological concerns, combining medical therapy, pelvic exercises, and modern sling surgeries.',
    features: [
      'Treatment for Pelvic Organ Prolapse',
      'Stress Urinary Incontinence (SUI) Sling Surgeries',
      'Comprehensive Gynecological consultations',
      'Daycare D&C and minor procedures',
      'Pelvic floor muscle rehabilitation'
    ],
    recoveryTime: '1 – 7 Days',
    order: 4,
    treatments: [
      {
        name: 'Pelvic Organ Prolapse Treatment',
        slug: 'pelvic-organ-prolapse',
        duration: '60 – 90 mins',
        recovery: '3 – 7 days',
        description: 'Surgical suspension and non-surgical management to restore uterine and bladder support.',
        longDescription: 'Comprehensive evaluation and treatment plans for uterine, bladder (cystocele), and rectal (rectocele) prolapse. Depending on severity, we offer vaginal pessary fittings or advanced pelvic reconstruction surgeries (sacrocolpopexy, pelvic floor repairs) to restore normal anatomy and pelvic comfort. Our specialized surgical protocols focus on repairing and tightening the supportive ligaments of the pelvis to relieve feelings of pressure, ease lower back aching, and fully restore normal bowel and bladder movements.',
        indications: ['Uterine prolapse', 'Cystocele (fallen bladder)', 'Rectocele'],
        benefits: ['Restores pelvic anatomy', 'Relieves pressure and discomfort', 'Improves quality of life'],
        preparation: ['Urinanalysis', 'Pelvic ultrasound', 'Fasting if surgery planned']
      },
      {
        name: 'Urinary Incontinence Management',
        slug: 'urinary-incontinence',
        duration: '45 mins',
        recovery: '2 – 3 days',
        description: 'Advanced medical care and TVT/TOT sling surgeries to restore bladder control.',
        longDescription: 'Specialized care for women suffering from stress urinary incontinence (leakage with physical activity) or urge incontinence (overactive bladder). We offer customized pelvic floor therapy, lifestyle interventions, and high-success minimally invasive sling (TVT/TOT) procedures. These modern mid-urethral slings act as a supportive hammock under the urethra, stopping accidental leaks during coughing, laughing, or exercising, and letting women live their lives with absolute freedom and confidence.',
        indications: ['Involuntary loss of urine', 'Stress incontinence', 'Urge incontinence'],
        benefits: ['Restores bladder control', 'High post-op dry rate', 'Daycare or 1-day stay'],
        preparation: ['Urodynamic study if needed', 'Urine culture validation']
      },
      {
        name: 'Gynaecological Consultation',
        slug: 'gynaecological-consultation',
        duration: '15 – 30 mins',
        recovery: 'Immediate',
        description: 'Expert consultation for PCOD/PCOS, menstrual disorders, menopause, and female wellness.',
        longDescription: 'We offer highly personalized clinical consultations addressing key reproductive health issues. Our services cover puberty management, irregular cycles, ovarian cysts, PCOS/PCOD, contraceptive counseling, and postmenopausal healthcare, ensuring complete well-being at every stage of life. Our lady consultant provides a supportive, private space to diagnose hormonal imbalances, manage chronic pelvic pain, and guide couples through basic pre-conception checkups.',
        indications: ['PCOD/PCOS', 'Irregular menstrual cycles', 'Menopausal concerns', 'Pelvic pain'],
        benefits: ['Expert medical guidance', 'Early diagnosis of reproductive issues', 'Holistic health plans'],
        preparation: ['Prepare medical history and previous scan details']
      },
      {
        name: 'D&C Procedure',
        slug: 'dc-procedure',
        duration: '20 – 30 mins',
        recovery: '1 – 2 days',
        description: 'Minor daycare procedure for uterine diagnostic biopsy or treating abnormal bleeding.',
        longDescription: 'Dilation and Curettage (D&C) is a brief daycare procedure performed under mild sedation. The cervix is gently dilated, and the uterine lining is carefully sampled or cleared. It is highly effective for diagnosing abnormal bleeding, uterine polyps, or managing early miscarriage. The tissue obtained is sent for histopathological analysis to provide diagnostic clarity, and the procedure itself helps resolve heavy uterine bleeding instantly, letting patients return to routine life within 48 hours.',
        indications: ['Abnormal uterine bleeding', 'Incomplete miscarriage', 'Postmenopausal bleeding'],
        benefits: ['Diagnostic clarity', 'Stops acute bleeding', 'Quick daycare procedure'],
        preparation: ['Fasting for 6 hours', 'Pregnancy test prior to procedure']
      }
    ]
  },
  {
    id: 'male-infertility',
    name: 'Male Infertility',
    slug: 'male-infertility',
    icon: '👨',
    category: 'Hospital Departments',
    available: 'OPD Hours',
    description: 'Confidential diagnostic evaluation, microscopic surgeries, and hormonal treatments for male reproductive wellness.',
    longDescription: 'Our Male Infertility department provides couples with a confidential and comprehensive path to parenthood. Led by experienced and empathetic specialists, we perform detailed semen analysis, identify genetic or physical blocks, and offer micro-surgical varicocelectomy and targeted hormone therapies to restore fertility.',
    features: [
      'Advanced Semen Analysis and diagnostic workup',
      'Microscopic Varicocelectomy for improved sperm quality',
      'Medical management of male hormonal deficiency',
      'Confidential consultations and counseling'
    ],
    recoveryTime: '1 – 4 Days',
    order: 5,
    treatments: [
      {
        name: 'Semen Analysis & Workup',
        slug: 'semen-analysis-workup',
        duration: '30 mins',
        recovery: 'Immediate',
        description: 'Precise laboratory semen assessment of count, motility, and morphology to identify fertility factors.',
        longDescription: 'A basic yet critical laboratory analysis that evaluates key semen parameters: sperm concentration, active motility, morphology (shape), and vitality. Conducted under strict quality controls to give couples a clear starting point for their fertility journey. Our laboratory uses computerized metrics to evaluate sperm health, helping identify issues like oligospermia (low count) or asthenozoospermia (poor motility) to design precise medical and lifestyle intervention programs.',
        indications: ['Inability to conceive after 1 year', 'History of testicular injury or surgery'],
        benefits: ['Accurate baseline assessment', 'Guides targeted therapy'],
        preparation: ['Abstinence of 2 to 7 days before sample collection']
      },
      {
        name: 'Varicocele Treatment',
        slug: 'varicocele-treatment',
        duration: '45 – 60 mins',
        recovery: '2 – 4 days',
        description: 'Microscopic varicocelectomy to repair enlarged scrotal veins and boost sperm count.',
        longDescription: 'Varicocele is a primary cause of male infertility. We specialize in Microscopic Varicocelectomy, a gold-standard surgical technique that ligates abnormal veins in the scrotum. This improves testicular temperature and blood circulation, significantly upgrading sperm parameters. Using high-magnification operating microscopes allows our urologist to preserve delicate lymphatic vessels and testicular arteries while closing abnormal veins, reducing recurrence risks to near-zero.',
        indications: ['Varicocele with abnormal semen parameters', 'Scrotal pain or atrophy due to varicocele'],
        benefits: ['Improves semen count and motility', 'Reduces scrotal aching'],
        preparation: ['Fasting required', 'Scrotal ultrasound with Doppler']
      },
      {
        name: 'Hormonal Evaluation',
        slug: 'hormonal-evaluation',
        duration: '30 mins',
        recovery: 'Immediate',
        description: 'Clinical assessment and medical balancing of key reproductive hormones.',
        longDescription: 'Evaluating endocrine systems (testosterone, LH, FSH, prolactin) that control sperm production. Our specialists offer evidence-based hormone replacement or balancing therapies to optimize sperm count, quality, and overall vitality. By diagnosing pituitary or testicular gland anomalies, we customize treatment plans using oral medications or targeted injections to restore optimal testicular function and resolve fertility-limiting deficiencies.',
        indications: ['Azoospermia or severe oligospermia', 'Low libido or chronic fatigue'],
        benefits: ['Identifies endocrine causes of infertility', 'Restores natural hormone levels'],
        preparation: ['Fasting blood draw (recommended early morning)']
      }
    ]
  },
  {
    id: 'sexology',
    name: 'Sexology',
    slug: 'sexology',
    icon: '❤️',
    category: 'Hospital Departments',
    available: 'OPD Hours',
    description: 'Completely confidential, compassionate therapy and medical treatments for sexual health and performance concerns.',
    longDescription: 'Our Sexology Clinic provides a safe, completely private, and non-judgmental environment for individuals and couples. We address physiological and psychological aspects of sexual health, offering evidence-based medical treatments and counseling for erectile dysfunction, premature ejaculation, and intimacy issues.',
    features: [
      'Private, non-judgmental consultations',
      'Evidence-based pharmacotherapy for dysfunction',
      'Integrated psychosexual counseling',
      'Hormone replacement therapies'
    ],
    recoveryTime: 'Immediate',
    order: 6,
    treatments: [
      {
        name: 'Erectile Dysfunction Treatment',
        slug: 'erectile-dysfunction',
        duration: '20 – 30 mins',
        recovery: 'Immediate',
        description: 'Comprehensive physical and medical plans to restore vascular health and performance confidence.',
        longDescription: 'Tailored treatment protocols for erectile dysfunction that target the root cause—whether vascular, hormonal, or stress-related. We design holistic regimens using modern pharmacotherapy, lifestyle counseling, and hormone balancing to restore confidence. By focusing on cardiovascular flow improvements and addressing underlying metabolic factors like diabetes or hypertension, we offer sustainable, medical solutions that enhance physical response and overall intimacy.',
        indications: ['Inability to achieve or maintain erection', 'Decreased libido'],
        benefits: ['Restores sexual confidence', 'Improves intimate relationships', 'Addresses underlying vascular or endocrine issues'],
        preparation: ['Bring lists of current medications', 'Blood tests (Testosterone, HbA1c, Lipids)']
      },
      {
        name: 'Premature Ejaculation Therapy',
        slug: 'premature-ejaculation',
        duration: '20 – 30 mins',
        recovery: 'Immediate',
        description: 'Integrated medical, behavioral, and clinical therapy to improve stamina and timing.',
        longDescription: 'We employ a combination of medical therapy, topical treatments, and behavioral retraining techniques (such as the start-stop and squeeze methods). This structured approach helps patients build control, reduce performance stress, and achieve lasting satisfaction. Our clinical consultations provide practical, evidence-based guidelines that build ejaculatory stamina, relieve performance anxiety, and significantly improve mutual relationship satisfaction.',
        indications: ['Ejaculation occurring with minimal stimulation', 'Distress related to rapid ejaculation'],
        benefits: ['Improves control and stamina', 'Reduces anxiety'],
        preparation: ['Open discussion of symptoms']
      },
      {
        name: 'Performance Anxiety Counseling',
        slug: 'performance-anxiety-counseling',
        duration: '45 mins',
        recovery: 'Immediate',
        description: 'Psychosexual counseling to break psychological barriers and enhance relationship dynamics.',
        longDescription: 'Dedicated counseling sessions designed to resolve the mental and emotional stress associated with sexual performance. Our specialist guides patients and their partners through stress-reduction techniques and communication strategies to rebuild intimacy. By breaking the cycle of self-monitoring and performance dread, we help patients overcome psychogenic blocks, rebuild self-esteem, and establish a comfortable, stress-free connection.',
        indications: ['Anxiety linked to performance', 'Psychogenic sexual dysfunction'],
        benefits: ['Reduces mental blocks', 'Improves relationship communication', 'Sustainable behavioral resolution'],
        preparation: ['Open mind and willingness to participate in therapeutic exercises']
      }
    ]
  },

  // ── Critical & Emergency Care ──────────────────────────────
  {
    id: 'icu-emergency-care',
    name: 'ICU & Emergency Care',
    slug: 'icu-emergency-care',
    icon: '🚨',
    category: 'Critical & Emergency Care',
    available: '24 × 7',
    description: '24/7 emergency response, trauma management, and intensive care beds staffed by expert intensivists.',
    longDescription: 'Nova Max Hospital provides round-the-clock emergency, trauma, and critical care support. Our Intensive Care Unit (ICU) is equipped with advanced multi-parameter monitors, mechanical ventilators, defibrillators, and central oxygen supply, supervised continuously by qualified intensivists.',
    features: [
      '24/7 emergency reception and trauma beds',
      'Advanced mechanical ventilators and oxygen supply',
      'Multi-parameter monitors and defibrillators',
      'Continuous post-surgical HDU monitoring',
      'Emergency urology and general surgery support'
    ],
    recoveryTime: 'Varies',
    order: 7,
    treatments: [
      {
        name: '24/7 Emergency ICU Support',
        slug: 'emergency-icu-support',
        duration: 'Ongoing',
        recovery: 'Critical',
        description: 'Critical multi-parameter patient monitoring and dedicated critical care nursing.',
        longDescription: 'Continuous life-support monitoring, medication administration, and one-on-one nursing for critically ill patients, those in shock, or recovering from major surgeries. Our medical staff is trained for immediate cardiopulmonary resuscitation. Managed continuously by dedicated critical care physicians (intensivists), the unit ensures immediate adjustment of vasoactive medications, electrolyte balancing, and close tracking of hemodynamic vitals.',
        indications: ['Respiratory or circulatory failure', 'Septic shock', 'Severe trauma or major post-op recovery'],
        benefits: ['Continuous vitals tracking', '`Rapid resuscitation capability`', 'One-to-one nursing care'],
        preparation: ['Immediate admission via emergency']
      },
      {
        name: 'Ventilator & Oxygen Care',
        slug: 'ventilator-oxygen-care',
        duration: 'Ongoing',
        recovery: 'Critical',
        description: 'Advanced respiratory and mechanical ventilation systems for acute lung support.',
        longDescription: 'Critical respiratory support utilizing advanced mechanical ventilators. We manage patients experiencing respiratory failure, ARDS, severe pneumonia, or those recovering from complex general anesthesia, ensuring optimal blood oxygenation. Our critical care team monitors blood gas levels constantly, adjusting pressures and oxygen blends to rest the patient\'s lungs while maintaining organ function during critical medical phases.',
        indications: ['Acute respiratory distress syndrome (ARDS)', 'Severe pneumonia', 'Hypoxia or respiratory failure'],
        benefits: ['Ensures cellular oxygenation', 'Rests respiratory muscles'],
        preparation: ['Intubation under sedation']
      },
      {
        name: 'Post-Surgical Monitoring (HDU)',
        slug: 'post-surgical-monitoring',
        duration: 'Ongoing',
        recovery: 'Varies',
        description: 'High-dependency post-operative monitoring for hemodynamic stability and pain management.',
        longDescription: 'Our High Dependency Unit (HDU) provides intermediate care for patients after major surgeries. We closely monitor blood pressure, heart rate, fluid input-output, surgical drain output, and manage post-operative pain to prevent any acute complications. This transitional care bridges the gap between the intensive care unit and general rooms, offering high-attention nursing to ensure a safe, comfortable recovery.',
        indications: ['Immediate post-laparoscopy/open surgery monitoring', 'Extended recovery support'],
        benefits: ['Early detection of complications', 'Continuous professional pain control'],
        preparation: ['Scheduled admission following surgery']
      }
    ]
  },

  // ── Diagnostics ─────────────────────────────────────────────
  {
    id: 'hemodialysis-pathology',
    name: 'Hemodialysis & Pathology',
    slug: 'hemodialysis-pathology',
    icon: '🧪',
    category: 'Diagnostics',
    available: '24 × 7',
    description: 'Modern hemodialysis unit and 24/7 fully automated pathology laboratory for quick, accurate diagnostics.',
    longDescription: 'Our diagnostics division comprises a state-of-the-art biochemistry and clinical pathology laboratory alongside a highly hygienic hemodialysis unit. We provide rapid diagnostic turnaround times for routine and pre-surgical workups, and offer renal support for chronic kidney disease patients.',
    features: [
      'Advanced hemodialysis unit with backup systems',
      'Hematology, biochemistry, and clinical pathology tests',
      'Digital X-Ray and abdominal ultrasound scan studies',
      'Urinalysis and stone assessment assays',
      '24/7 pharmacy for direct medication access'
    ],
    recoveryTime: 'Immediate',
    order: 8,
    treatments: [
      {
        name: 'Hemodialysis Service',
        slug: 'hemodialysis-service',
        duration: '4 hours',
        recovery: 'Immediate',
        description: 'Life-sustaining dialysis therapy using high-flux artificial kidneys for renal failure.',
        longDescription: 'Our dialysis unit provides high-safety renal replacement therapy using advanced hemodialysis machines. We filter toxic waste products, extra fluids, and balance blood chemistry for patients with acute kidney injury or end-stage renal disease (ESRD). Supported by continuous cardiac monitoring, pure water treatment plants, and emergency backup generators, we deliver comfortable, highly hygienic dialysis sessions to renal patients.',
        indications: ['Acute kidney injury (AKI)', 'End-stage renal disease (ESRD)', 'Severe fluid overload or electrolyte imbalance'],
        benefits: ['Removes urea and creatinine', 'Regulates blood pressure and electrolytes'],
        preparation: ['Valid vascular access (AV Fistula or Dialysis catheter)', 'Recent dry weight check']
      },
      {
        name: 'Complete Blood Count (CBC)',
        slug: 'complete-blood-count',
        duration: '15 mins',
        recovery: 'Immediate',
        description: 'Full automated hematology profile testing for infections, anemia, and surgical clearance.',
        longDescription: 'A vital diagnostic panel that measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. Essential for diagnosing infections, chronic anemia, and ensuring surgical fitness for all procedures. Our fully automated hematology analyzers produce rapid, highly accurate cell profile outputs within minutes, allowing doctors to detect inflammatory markers and issue immediate clinical clearances.',
        indications: ['Anemia, infections, fever screen', 'Pre-operative clearance'],
        benefits: ['Same-day accurate results', 'Aids in immediate clinical decisions'],
        preparation: ['No special prep required']
      },
      {
        name: 'Liver & Kidney Function Tests (LFT/KFT)',
        slug: 'liver-kidney-function-tests',
        duration: '30 mins',
        recovery: 'Immediate',
        description: 'Comprehensive blood chemistry analysis to monitor vital liver enzymes and kidney metrics.',
        longDescription: 'Advanced biochemical panels that measure liver enzymes (SGOT, SGPT, bilirubin, alkaline phosphatase) and kidney markers (creatinine, blood urea nitrogen, uric acid). Important for monitoring chronic diseases and medication safety. These tests analyze essential biochemical parameters to assess organ filtration rates and metabolic processing, allowing for precise drug dosage adjustments and pre-op fitness evaluations.',
        indications: ['Organ disease screening', 'General health evaluation', 'Post-medication monitoring'],
        benefits: ['Identifies organ dysfunction early', 'Guides medicine dosage adjustments'],
        preparation: ['Overnight fasting required']
      },
      {
        name: 'Urinalysis & Diagnostics',
        slug: 'urinalysis-diagnostics',
        duration: '15 mins',
        recovery: 'Immediate',
        description: 'Rapid physical, chemical, and microscopic examination of urine samples.',
        longDescription: 'Detailed routine and microscopic urine tests to check for proteins, glucose (diabetes screening), pus cells (UTI screening), and microscopic crystals (kidney stone diagnostics). Assists in immediate clinical diagnosis. Our pathology lab evaluates chemical composition and physical properties of urine to identify early renal filtration deficits, detect silent infections, and monitor metabolic stability.',
        indications: ['Suspected UTI', 'Kidney stone tracking', 'Diabetic monitoring'],
        benefits: ['Immediate diagnostic markers', 'Non-invasive screening'],
        preparation: ['Collect fresh clean-catch mid-stream urine sample']
      }
    ]
  }
]
