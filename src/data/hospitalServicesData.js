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
    longDescription: 'Our Urology department at Nova Max Hospital in Digha, Patna is a center of excellence providing world-class diagnostic and surgical solutions for all kidney, bladder, and urinary tract disorders. Led by senior urologists, we utilize state-of-the-art medical technology to offer minimally invasive surgeries, comprehensive prostate management, and expert daycare procedures. We ensure high-precision interventions with minimal pain and rapid recovery.',
    features: [
      'Advanced Kidney Stone Management (URS, PCNL, RIRS)',
      'Prostate Evaluation and Bipolar TURP Surgery',
      'Urinary Tract Infection (UTI) & Bladder Laser Care',
      'Circumcision and Hydrocele Day Care Surgeries',
      'Holmium Laser Stone Dusting',
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
        procedureType: 'Minimally Invasive Laser',
        description: 'Advanced minimally invasive and laser procedures for swift and precise kidney stone removal.',
        longDescription: 'At Nova Max Hospital in Digha, Patna, we offer high-precision Ureteroscopy (URS) and Percutaneous Nephrolithotomy (PCNL) using state-of-the-art laser and pneumatic lithotripsy. These techniques ensure complete clearance of kidney, ureteric, and bladder stones of all sizes without large incisions, minimizing tissue damage and reducing hospital stays to just 24-48 hours. Our department utilizes high-power holmium lasers to dust hard stones into fine particles, allowing them to pass painlessly, avoiding the complications of traditional open renal surgery.',
        indications: ['Obstructing kidney stones', 'Severe persistent renal colic', 'Stones larger than 7mm', 'Failed ESWL lithotripsy'],
        benefits: ['No open incision', 'Short hospital stay (24-48h)', 'Minimal blood loss', 'High stone clearance rate'],
        preparation: ['Fast for 6-8 hours', 'Complete blood and urine clearance tests', 'Discontinue blood thinners as advised'],
        keywords: ['Kidney Stone Surgery Patna', 'URS PCNL Digha', 'Laser Stone Dusting', 'Best Urologist Patna'],
        faqs: [
          { question: 'How long is the hospital stay after URS / PCNL surgery?', answer: 'Most patients are discharged within 24 to 48 hours after URS or PCNL stone removal at Nova Max Hospital.' },
          { question: 'Is laser kidney stone removal painful?', answer: 'The procedure is performed under anesthesia, making it completely painless during surgery. Post-op discomfort is minimal.' }
        ]
      },
      {
        name: 'Prostate Surgery (TURP)',
        slug: 'prostate-surgery',
        duration: '60 mins',
        recovery: '2 – 4 days',
        procedureType: 'Endoscopic Resection',
        description: 'Endoscopic laser and conventional resection for enlarged prostate and urinary relief.',
        longDescription: 'Transurethral Resection of the Prostate (TURP) is our specialized endoscopic treatment for Benign Prostatic Hyperplasia (BPH) and urinary channel blockage. Performed endoscopically through the urethra with no external cuts or scars, it immediately relieves urinary blockage, frequency, and hesitation, restoring normal bladder function. By utilizing advanced bipolar loop resection, we ensure minimal post-operative bleeding, a brief catheterization window, and rapid healing, allowing senior patients to regain comfortable and controlled urination quickly.',
        indications: ['Severe urinary retention', 'Recurrent UTIs due to BPH', 'Bladder stones or kidney damage from obstruction'],
        benefits: ['Restores normal urine flow', 'Improves bladder emptying', 'High success rate', 'Zero skin incisions'],
        preparation: ['Fasting from midnight', 'Stop antiplatelet medications', 'Pre-anesthetic evaluation'],
        keywords: ['TURP Surgery Patna', 'Enlarged Prostate Treatment', 'Bipolar TURP Digha', 'Urology Clinic Patna'],
        faqs: [
          { question: 'Is TURP surgery suitable for elderly patients?', answer: 'Yes, bipolar TURP is done endoscopically with minimal blood loss, making it exceptionally safe for senior citizens.' },
          { question: 'How soon is the catheter removed after TURP?', answer: 'Catheters are typically removed within 2 to 3 days post-surgery, restoring natural urination.' }
        ]
      },
      {
        name: 'UTI & Bladder Care',
        slug: 'uti-bladder-care',
        duration: '30 mins',
        recovery: 'Immediate',
        procedureType: 'OPD Clinical Care',
        description: 'Thorough diagnostic workups and customized treatment plans for urinary infections and bladder dysfunctions.',
        longDescription: 'We provide expert diagnosis and comprehensive treatment strategies for recurrent urinary tract infections (UTIs), interstitial cystitis, overactive bladder, and urinary incontinence. Utilizing urine cultures, cystoscopy, and ultrasound imaging, we identify root causes to formulate long-term wellness plans. Our therapies combine advanced targeted antimicrobial regimens with bladder training protocols and pelvic muscle exercises to treat persistent bacterial colonies, prevent chronic bladder lining inflammation, and guard against potential upper kidney infections.',
        indications: ['Painful urination', 'Frequent or urgent urination', 'Blood in urine', 'Recurrent cystitis'],
        benefits: ['Rapid symptom relief', 'Prevention of kidney infections', 'Personalized long-term management plans'],
        preparation: ['Bring mid-stream urine sample', 'Document symptom history'],
        keywords: ['UTI Specialist Patna', 'Bladder Care Digha', 'Recurrent Urinary Infection', 'Cystoscopy Patna'],
        faqs: [
          { question: 'Can recurrent UTIs cause permanent kidney damage?', answer: 'Untreated chronic UTIs can ascend to cause pyelonephritis. Early culture-guided treatment at Nova Max Hospital prevents organ damage.' }
        ]
      },
      {
        name: 'Circumcision & Hydrocele Surgery',
        slug: 'circumcision-hydrocele-surgery',
        duration: '30 – 45 mins',
        recovery: '3 – 7 days',
        procedureType: 'Daycare Surgery',
        description: 'Advanced daycare surgeries ensuring minimal post-op discomfort and aesthetic healing.',
        longDescription: 'Safe, precise surgical management of phimosis, paraphimosis, and hydroceles at Nova Max Hospital in Digha, Patna. Done under local or general anesthesia as daycare procedures, we use modern techniques like laser circumcision and minimal-access hydrocelectomy to ensure quick, aesthetic healing and minimal downtime. Our sutureless and laser-assisted methods reduce post-operative swelling and bleeding, ensuring that patients walk home comfortably on the same day and return to light office work within 48 to 72 hours.',
        indications: ['Phimosis or recurring balanitis', 'Symptomatic hydrocele', 'Scrotal swelling/heaviness'],
        benefits: ['Permanent cure', 'Minimal post-operative pain', 'Discharge on the same day'],
        preparation: ['Clean the local area', 'Wear loose-fitting clothing'],
        keywords: ['Laser Circumcision Patna', 'Hydrocele Surgery Digha', 'Daycare Uro Surgery'],
        faqs: [
          { question: 'Is laser circumcision stitchless?', answer: 'Yes, laser-assisted circumcision uses specialized tissue fusion and adhesive closure for aesthetic, stitchless healing.' }
        ]
      },
      {
        name: 'RIRS (Flexible Ureteroscopy)',
        slug: 'rirs',
        duration: '60 – 90 mins',
        recovery: '1 – 2 days',
        procedureType: 'Incisionless Laser',
        description: 'Advanced retrograde intrarenal surgery using flexible scopes and laser to target deep kidney stones.',
        longDescription: 'Retrograde Intrarenal Surgery (RIRS) is a cutting-edge, incisionless procedure using a flexible ureteroscope. It allows the surgeon to navigate the entire kidney cavity to dust hard-to-reach stones with a Holmium laser fiber, allowing same-day discharge and zero scars. By utilizing flexible, steerable fiber-optic cameras, we can navigate the complex anatomy of the renal calyces to vaporize stones that are otherwise unreachable by conventional rigid scopes, making it the premier choice for complex or bilateral kidney stones.',
        indications: ['Upper ureteral stones', 'Intrarenal kidney stones up to 2cm', 'Failed ESWL'],
        benefits: ['Zero external cuts', 'Accesses deep kidney cavities', 'High stone clearance rate'],
        preparation: ['Fasting required', 'Pre-op urine culture must be sterile'],
        keywords: ['RIRS Surgery Patna', 'Incisionless Stone Removal', 'Flexible Ureteroscopy Digha'],
        faqs: [
          { question: 'Are there any incisions or scars in RIRS?', answer: 'No. RIRS is performed entirely through natural urinary channels, leaving zero external cuts or scar marks.' }
        ]
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
    longDescription: 'The Laparoscopic Surgery division at Nova Max Hospital in Digha, Patna is equipped with high-definition modular operation theatres. We specialize in advanced keyhole surgeries that offer patients significant benefits over open surgery: minimal post-operative pain, negligible blood loss, minor scars, and a return to normal life within 24 to 48 hours.',
    features: [
      'Gold Standard Laparoscopic Cholecystectomy (Gallstones)',
      'TEP and TAPP Laparoscopic Hernia Repairs',
      'Minimally Invasive Appendectomy',
      'Single-Incision Laparoscopic Surgery (SILS)',
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
        procedureType: 'Keyhole Surgery',
        description: 'Gold standard laparoscopic removal of the gallbladder to treat gallstones and inflammation permanently.',
        longDescription: 'Laparoscopic Cholecystectomy is a highly routine keyhole surgery to remove the gallbladder. Performed at Nova Max Hospital in Digha, Patna, it is the definitive treatment for symptomatic gallstones and cholecystitis, preventing severe complications like pancreatitis, jaundice, or infection through tiny 5-10mm incisions. Our surgical team uses high-definition camera towers to isolate the gallbladder ducts safely and remove the organ with absolute precision, leading to minor scar lines, negligible pain, and allowing patients to be fully active within a week.',
        indications: ['Symptomatic gallstones (cholelithiasis)', 'Gallbladder inflammation (cholecystitis)', 'Gallbladder polyps'],
        benefits: ['Tiny scars', 'Discharge within 24 hours', 'Minimal post-op pain'],
        preparation: ['Fasting for 8 hours', 'Normal coagulation profile', 'Liver function tests'],
        keywords: ['Gallstone Surgery Patna', 'Laparoscopic Cholecystectomy Digha', 'Best Laparoscopic Surgeon Patna'],
        faqs: [
          { question: 'How soon can I eat normally after gallbladder surgery?', answer: 'Patients start light liquids within 6 hours and resume normal diet within 24 to 48 hours post-op.' }
        ]
      },
      {
        name: 'Laparoscopic Hernia Repair (TEP/TAPP)',
        slug: 'laparoscopic-hernia-repair',
        duration: '60 – 90 mins',
        recovery: '2 – 4 days',
        procedureType: 'Keyhole Mesh Repair',
        description: 'Minimally invasive mesh reinforcement for groin and abdominal wall hernias.',
        longDescription: 'Using advanced TEP (Totally Extraperitoneal) or TAPP (Transabdominal Preperitoneal) techniques, our surgeons repair inguinal, umbilical, and incisional hernias. Placing a high-quality surgical mesh under laparoscopic vision reinforces the abdominal wall, dramatically lowering recurrence rates and post-op pain. Since the repair is performed from behind the abdominal wall, the natural pressure of the abdomen helps keep the mesh in place, leading to a much stronger repair and a faster return to strenuous activities.',
        indications: ['Inguinal hernia', 'Umbilical hernia', 'Incisional or recurrent hernia'],
        benefits: ['Bilateral hernias fixed through same cuts', 'Low recurrence rate', 'Quick return to work'],
        preparation: ['Fasting from midnight', 'Stop medications affecting clotting', 'Chest X-ray and ECG'],
        keywords: ['Hernia Surgery Patna', 'TEP TAPP Laparoscopy Digha', 'Mesh Hernia Repair'],
        faqs: [
          { question: 'Why is laparoscopic hernia repair better than open surgery?', answer: 'Laparoscopic repair causes less tissue trauma, allows fixing bilateral hernias simultaneously, and enables faster return to work.' }
        ]
      },
      {
        name: 'Laparoscopic Appendectomy',
        slug: 'laparoscopic-appendectomy',
        duration: '45 mins',
        recovery: '1 – 2 days',
        procedureType: 'Emergency Keyhole',
        description: 'Urgent or planned keyhole surgical excision of an inflamed appendix for rapid recovery.',
        longDescription: 'A swift, minimally invasive surgical procedure to remove an inflamed or infected appendix at Nova Max Hospital in Digha, Patna. Laparoscopic appendectomy reduces the risk of wound infections, enables a quicker transition to solid food, and ensures minimal abdominal discomfort compared to traditional open surgeries. It allows our surgeons to thoroughly inspect the peritoneal cavity for inflammation, irrigate any localized fluids, and close the incisions with cosmetic sutures, meaning patients can go home the very next morning.',
        indications: ['Acute appendicitis', 'Chronic/recurrent appendiceal pain'],
        benefits: ['Less wound infection risk', 'Very low pain', 'Discharge next day'],
        preparation: ['NPO (nil by mouth) immediately', 'Intravenous fluids and antibiotics', 'Emergency pre-op workup'],
        keywords: ['Appendicitis Surgery Patna', 'Laparoscopic Appendectomy Digha', 'Emergency Surgery Patna'],
        faqs: [
          { question: 'Is appendectomy considered an emergency surgery?', answer: 'Acute appendicitis requires prompt surgical removal within 24 hours to prevent appendix rupture and peritonitis.' }
        ]
      },
      {
        name: 'Diagnostic Laparoscopy',
        slug: 'diagnostic-laparoscopy',
        duration: '30 – 45 mins',
        recovery: '1 day',
        procedureType: 'Diagnostic Keyhole',
        description: 'Keyhole visual exploration of pelvic and abdominal cavities to diagnose unresolved symptoms.',
        longDescription: 'When laboratory tests and scans are inconclusive, diagnostic laparoscopy provides direct high-definition visualization of abdominal and pelvic organs. This allows our surgeons to identify conditions like endometriosis, chronic pelvic pain, or adhesions, and take biopsies if required. By inserting a micro-camera through a single keyhole incision, we can diagnose obscure pelvic abnormalities, assess internal scar tissues, and plan final therapeutic surgical interventions during the same session.',
        indications: ['Unexplained abdominal pain', 'Endometriosis evaluation', 'Infertility workup'],
        benefits: ['Direct visual diagnosis', 'Biopsy can be taken during same session'],
        preparation: ['Fasting required', 'Routine blood investigations'],
        keywords: ['Diagnostic Laparoscopy Patna', 'Pelvic Pain Workup Digha'],
        faqs: [
          { question: 'Will diagnostic laparoscopy leave visible scars?', answer: 'No. The micro-camera is inserted through a tiny 5mm navel incision that leaves negligible scar marks.' }
        ]
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
    longDescription: 'Our General Surgery department at Nova Max Hospital in Digha, Patna provides a wide spectrum of open and laser surgical interventions. Backed by senior surgeons with decades of operating experience, we manage elective and emergency surgeries, abdominal trauma, diabetic wound care, and minor daycare excisions with absolute precision.',
    features: [
      'Advanced open surgeries and trauma care',
      'Abscess drainage and diabetic wound care',
      'Excision of cysts, lipomas, and skin lesions',
      'Advanced Laser and Stapled Piles surgery',
      'Varicose Veins Laser Therapy (EVLT)',
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
        procedureType: 'Open Surgery',
        description: 'Traditional open surgical removal of the appendix, recommended for complex or ruptured appendicitis.',
        longDescription: 'Open appendectomy remains a reliable surgical choice, especially in cases where the appendix has ruptured, formed an abscess, or when laparoscopic surgery is contraindicated. Our surgeons perform this procedure with meticulous care to clean the abdominal cavity and ensure smooth recovery. A small, precise incision in the lower right abdomen provides direct access to manage complex perforated appendicitis, control localized peritonitis, and place drainage tubes if necessary to guarantee patient safety.',
        indications: ['Complicated/perforated appendix', 'Acute appendicitis'],
        benefits: ['Reliable treatment', 'Applicable to complex anatomy'],
        preparation: ['Fasting required', 'General medical clearance'],
        keywords: ['Appendectomy Surgery Patna', 'Open Appendix Removal Digha'],
        faqs: [
          { question: 'When is open appendectomy preferred over keyhole?', answer: 'Open surgery is preferred when the appendix has ruptured or when severe abdominal scar tissues exist.' }
        ]
      },
      {
        name: 'Hernia Repair Surgery',
        slug: 'hernia-repair-surgery',
        duration: '60 mins',
        recovery: '3 – 7 days',
        procedureType: 'Open Mesh Surgery',
        description: 'Conventional open hernia repair with strong mesh reinforcement for lasting support.',
        longDescription: 'Traditional open hernioplasty involves a localized incision directly over the hernia. The protruding tissue is safely pushed back, and a durable synthetic mesh is sutured to support and reinforce the weakened abdominal muscle wall, ensuring a strong, permanent cure. This method is highly effective for large, irreducible, or strangulated hernias where direct physical manipulation and reconstruction of the fascia are needed to prevent intestinal compromise.',
        indications: ['Inguinal, umbilical, or femoral hernia'],
        benefits: ['Sturdy repair', 'Highly reliable long-term results'],
        preparation: ['Pre-anesthetic screen', 'Fasting from midnight'],
        keywords: ['Hernia Operation Patna', 'Open Hernioplasty Digha'],
        faqs: [
          { question: 'Is surgical mesh permanent?', answer: 'Yes, modern polypropylene mesh integrates into tissue to provide permanent support against hernia recurrence.' }
        ]
      },
      {
        name: 'Piles, Fissure & Fistula (Laser Procedures)',
        slug: 'piles-laser-stapled-surgery',
        duration: '30 – 45 mins',
        recovery: '1 – 3 days',
        procedureType: 'Proctology Laser',
        description: 'Advanced minimally invasive laser treatments and stapled hemorrhoidopexy for painful piles, fissures, and complex anal fistulas.',
        longDescription: 'Our proctology division at Nova Max Hospital in Digha, Patna offers highly advanced laser treatments and minimally invasive solutions for hemorrhoids (piles), anal fissures, and anal fistulas. Standard open surgeries for anorectal disorders often require painful wounds, long hospital stays, and daily dressings. In contrast, our modern laser procedures utilize specialized laser fibers to precisely apply energy: for piles, Laser Hemorrhoidoplasty (LHP) shrinks the hemorrhoidal nodes internally without incisions; for fissures, Lateral Internal Sphincterotomy is performed with high-precision laser energy to relieve painful spasms and promote rapid healing; for fistulas, FiLaC (Fistula Laser Closure) gently seals the fistula tract from the inside, preserving the sphincter muscles and eliminating the risk of fecal incontinence. Performed as daycare procedures under short general or spinal anesthesia, these advanced techniques ensure minimal post-operative pain, zero cuts or stitches, no painful open dressings, and negligible blood loss. Patients are typically discharged within a few hours or the same day, experiencing rapid recovery and returning to their normal activities within 24 to 48 hours.',
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
          'Wear loose, comfortable clothing and arrange for an escort home'
        ],
        keywords: ['Laser Piles Surgery Patna', 'Fissure Laser Treatment Digha', 'FiLaC Fistula Laser Patna', 'Best Proctologist Patna'],
        faqs: [
          { question: 'Is laser piles surgery painless?', answer: 'Laser piles surgery is performed under anesthesia with zero open cuts, resulting in vastly less post-op pain compared to open surgery.' },
          { question: 'How quickly can I return to work after laser fissure/piles procedure?', answer: 'Most patients return to desk work within 24 to 48 hours post-procedure.' }
        ]
      },
      {
        name: 'Varicose Veins Laser Therapy (EVLT)',
        slug: 'varicose-veins-laser-therapy',
        duration: '45 – 60 mins',
        recovery: '1 – 2 days',
        procedureType: 'Vascular Laser',
        description: 'Endovenous laser ablation to seal painful, enlarged leg veins permanently.',
        longDescription: 'Endovenous Laser Therapy (EVLT) is a modern, minimally invasive treatment for painful, swollen varicose veins and venous insufficiency in the lower limbs. Under ultrasound guidance, a micro laser fiber is inserted into the diseased vein to deliver targeted thermal energy, causing the enlarged vein to collapse and seal shut. Blood flow is naturally rerouted to healthy deep veins. Done as a daycare procedure under local anesthesia at Nova Max Hospital in Digha, Patna, it eliminates the need for old painful vein stripping surgeries, allowing patients to walk home comfortably the same afternoon.',
        indications: ['Painful swollen leg veins', 'Venous stasis ulcers', 'Leg heaviness or hyperpigmentation'],
        benefits: ['Zero open surgical cuts', 'Immediate relief from leg heaviness', 'Same-day walk-home daycare procedure'],
        preparation: ['Doppler ultrasound scan of lower limbs', 'Clean local skin'],
        keywords: ['Varicose Veins Laser Patna', 'EVLT Laser Digha', 'Vascular Clinic Patna'],
        faqs: [
          { question: 'Can I walk immediately after varicose veins laser therapy?', answer: 'Yes! Patients are encouraged to walk 15 minutes after EVLT laser therapy before going home.' }
        ]
      }
    ]
  },
  {
    id: 'uro-gynecology',
    name: 'Uro Gynecology',
    slug: 'uro-gynecology',
    icon: '🤰',
    category: 'Hospital Departments',
    available: 'OPD Hours',
    description: 'Comprehensive management of female pelvic floor issues, urinary incontinence, and reproductive health problems.',
    longDescription: 'Our Uro Gynecology department at Nova Max Hospital in Digha, Patna is a specialized subspecialty providing compassionate and expert care for women experiencing pelvic floor disorders. We provide advanced clinical solutions for pelvic organ prolapse, urinary leakage, menstrual irregularities, and gynecological concerns, combining medical therapy, pelvic exercises, and modern sling surgeries.',
    features: [
      'Treatment for Pelvic Organ Prolapse',
      'Stress Urinary Incontinence (SUI) Sling Surgeries',
      'Laparoscopic Hysterectomy & Myomectomy',
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
        procedureType: 'Pelvic Reconstruction',
        description: 'Surgical suspension and non-surgical management to restore uterine and bladder support.',
        longDescription: 'Comprehensive evaluation and treatment plans for uterine, bladder (cystocele), and rectal (rectocele) prolapse at Nova Max Hospital in Digha, Patna. Depending on severity, we offer vaginal pessary fittings or advanced pelvic reconstruction surgeries (sacrocolpopexy, pelvic floor repairs) to restore normal anatomy and pelvic comfort. Our specialized surgical protocols focus on repairing and tightening the supportive ligaments of the pelvis to relieve feelings of pressure, ease lower back aching, and fully restore normal bowel and bladder movements.',
        indications: ['Uterine prolapse', 'Cystocele (fallen bladder)', 'Rectocele'],
        benefits: ['Restores pelvic anatomy', 'Relieves pressure and discomfort', 'Improves quality of life'],
        preparation: ['Urinanalysis', 'Pelvic ultrasound', 'Fasting if surgery planned'],
        keywords: ['Prolapse Treatment Patna', 'Uro Gynaecology Digha', 'Cystocele Repair Patna'],
        faqs: [
          { question: 'What causes pelvic organ prolapse in women?', answer: 'Pelvic muscle strain from childbirth, heavy lifting, or aging. We offer both non-surgical pessary and surgical repair options.' }
        ]
      },
      {
        name: 'Urinary Incontinence Management',
        slug: 'urinary-incontinence',
        duration: '45 mins',
        recovery: '2 – 3 days',
        procedureType: 'Sling Daycare',
        description: 'Advanced medical care and TVT/TOT sling surgeries to restore bladder control.',
        longDescription: 'Specialized care for women suffering from stress urinary incontinence (leakage with physical activity) or urge incontinence (overactive bladder). We offer customized pelvic floor therapy, lifestyle interventions, and high-success minimally invasive sling (TVT/TOT) procedures. These modern mid-urethral slings act as a supportive hammock under the urethra, stopping accidental leaks during coughing, laughing, or exercising, and letting women live their lives with absolute freedom and confidence.',
        indications: ['Involuntary loss of urine', 'Stress incontinence', 'Urge incontinence'],
        benefits: ['Restores bladder control', 'High post-op dry rate', 'Daycare or 1-day stay'],
        preparation: ['Urodynamic study if needed', 'Urine culture validation'],
        keywords: ['Urinary Leakage Treatment Patna', 'TVT TOT Sling Digha', 'Female Urology Patna'],
        faqs: [
          { question: 'How successful are TVT/TOT sling surgeries for urine leakage?', answer: 'TVT/TOT mid-urethral slings carry a over 90% success rate in eliminating stress urinary leakage.' }
        ]
      },
      {
        name: 'Laparoscopic Hysterectomy & Myomectomy',
        slug: 'laparoscopic-hysterectomy-myomectomy',
        duration: '60 – 120 mins',
        recovery: '3 – 5 days',
        procedureType: 'Gynecological Keyhole',
        description: 'Advanced keyhole surgical removal of uterine fibroids or uterus with rapid recovery.',
        longDescription: 'Laparoscopic Hysterectomy (TLH) and Laparoscopic Myomectomy offer modern keyhole surgical solutions for uterine fibroids, severe endometriosis, adenomyosis, and abnormal bleeding. Instead of a large abdominal incision, small 5-10mm keyholes are used to detach and remove fibroids while preserving healthy tissue or removing the uterus safely. Performed at Nova Max Hospital in Digha, Patna by experienced uro-gynecologists and surgeons, keyhole gynecological surgery reduces hospital stay, blood loss, and post-op pain significantly.',
        indications: ['Large symptomatic uterine fibroids', 'Severe adenomyosis or endometriosis', 'Refractory heavy menstrual bleeding'],
        benefits: ['Tiny scar lines', 'Negligible blood loss', 'Short hospital stay'],
        preparation: ['Pelvic ultrasound & MRI if indicated', 'Pre-anesthetic clearance'],
        keywords: ['Laparoscopic Hysterectomy Patna', 'Fibroid Surgery Digha', 'Myomectomy Patna'],
        faqs: [
          { question: 'Can myomectomy preserve fertility?', answer: 'Yes! Laparoscopic myomectomy selectively removes fibroids while preserving the uterus for future pregnancies.' }
        ]
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
    longDescription: 'Our Male Infertility department at Nova Max Hospital in Digha, Patna provides couples with a confidential and comprehensive path to parenthood. Led by experienced and empathetic specialists, we perform detailed semen analysis, identify genetic or physical blocks, and offer micro-surgical varicocelectomy and targeted hormone therapies to restore fertility.',
    features: [
      'Advanced Semen Analysis and diagnostic workup',
      'Microscopic Varicocelectomy for improved sperm quality',
      'Micro-TESE & Surgical Sperm Retrieval',
      'Medical management of male hormonal deficiency',
      'Confidential consultations and counseling'
    ],
    recoveryTime: '1 – 4 Days',
    order: 5,
    treatments: [
      {
        name: 'Varicocele Treatment',
        slug: 'varicocele-treatment',
        duration: '45 – 60 mins',
        recovery: '2 – 4 days',
        procedureType: 'Microsurgery',
        description: 'Microscopic varicocelectomy to repair enlarged scrotal veins and boost sperm count.',
        longDescription: 'Varicocele is a primary cause of male infertility. At Nova Max Hospital in Digha, Patna, we specialize in Microscopic Varicocelectomy, a gold-standard surgical technique that ligates abnormal veins in the scrotum. This improves testicular temperature and blood circulation, significantly upgrading sperm parameters. Using high-magnification operating microscopes allows our urologist to preserve delicate lymphatic vessels and testicular arteries while closing abnormal veins, reducing recurrence risks to near-zero.',
        indications: ['Varicocele with abnormal semen parameters', 'Scrotal pain or atrophy due to varicocele'],
        benefits: ['Improves semen count and motility', 'Reduces scrotal aching', 'Microsurgical precision'],
        preparation: ['Fasting required', 'Scrotal ultrasound with Doppler'],
        keywords: ['Varicocele Surgery Patna', 'Microscopic Varicocelectomy Digha', 'Male Infertility Doctor Patna'],
        faqs: [
          { question: 'Does varicocele surgery improve sperm count?', answer: 'Yes! Microscopic varicocelectomy improves sperm concentration and motility in over 70-80% of treated men.' }
        ]
      },
      {
        name: 'Micro-TESE & Surgical Sperm Retrieval',
        slug: 'micro-tese-sperm-retrieval',
        duration: '60 mins',
        recovery: '2 – 3 days',
        procedureType: 'Microsurgical Extraction',
        description: 'Microscopic testicular sperm extraction for non-obstructive azoospermia.',
        longDescription: 'Microscopic Testicular Sperm Extraction (Micro-TESE) is an advanced microsurgical procedure for men with severe non-obstructive azoospermia (zero sperm count in ejaculate). Using a high-magnification operating microscope, the surgeon inspects testicular tubules to extract viable sperm cells for ICSI/IVF. Done under precision microsurgical control at Nova Max Hospital in Digha, Patna, Micro-TESE optimizes sperm retrieval rates while preserving surrounding tissue and testosterone-producing Leydig cells.',
        indications: ['Non-obstructive azoospermia', 'Previous failed TESA'],
        benefits: ['Highest sperm retrieval success rate', 'Preserves testicular tissue', 'Done under microsurgical precision'],
        preparation: ['Fasting from midnight', 'Scrotal Doppler ultrasound', 'Hormonal profile'],
        keywords: ['Micro TESE Patna', 'Azoospermia Treatment Digha', 'Sperm Retrieval Patna'],
        faqs: [
          { question: 'What is the success rate of Micro-TESE?', answer: 'Micro-TESE achieves viable sperm retrieval in up to 50-60% of non-obstructive azoospermia cases.' }
        ]
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
    longDescription: 'Our Sexology Clinic at Nova Max Hospital in Digha, Patna provides a safe, completely private, and non-judgmental environment for individuals and couples. We address physiological and psychological aspects of sexual health, offering evidence-based medical treatments and counseling for erectile dysfunction, premature ejaculation, and intimacy issues.',
    features: [
      'Private, non-judgmental consultations',
      'Evidence-based pharmacotherapy for dysfunction',
      'Low-Intensity Shockwave Therapy (ED)',
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
        procedureType: 'Clinical Medical Protocol',
        description: 'Comprehensive physical and medical plans to restore vascular health and performance confidence.',
        longDescription: 'Tailored treatment protocols for erectile dysfunction that target the root cause—whether vascular, hormonal, or stress-related. At Nova Max Hospital in Digha, Patna, we design holistic regimens using modern pharmacotherapy, lifestyle counseling, and hormone balancing to restore confidence. By focusing on cardiovascular flow improvements and addressing underlying metabolic factors like diabetes or hypertension, we offer sustainable, medical solutions that enhance physical response and overall intimacy.',
        indications: ['Inability to achieve or maintain erection', 'Decreased libido'],
        benefits: ['Restores sexual confidence', 'Improves intimate relationships', 'Addresses underlying vascular issues'],
        preparation: ['Bring lists of current medications', 'Blood tests (Testosterone, HbA1c, Lipids)'],
        keywords: ['ED Doctor Patna', 'Sexologist Digha Patna', 'Erectile Dysfunction Treatment'],
        faqs: [
          { question: 'Are sexology consultations at Nova Max Hospital confidential?', answer: 'Yes, 100% strict patient privacy and medical confidentiality are maintained for all OPD visits.' }
        ]
      },
      {
        name: 'Low-Intensity Shockwave Therapy (ED)',
        slug: 'shockwave-therapy-ed',
        duration: '20 – 30 mins',
        recovery: 'Immediate',
        procedureType: 'Acoustic Shockwave',
        description: 'Non-invasive acoustic wave therapy to stimulate penile angiogenesis and natural blood flow.',
        longDescription: 'Low-Intensity Extracorporeal Shockwave Therapy (Li-ESWT) is a non-invasive, drug-free medical treatment for vasculogenic erectile dysfunction. Acoustic shockwaves are delivered to penile tissue to trigger micro-trauma signaling, stimulating new blood vessel growth (angiogenesis) and improving arterial inflow. Conducted in private OPD sessions at Nova Max Hospital in Digha, Patna, shockwave therapy offers a lasting cure by treating the underlying vascular cause rather than relying on temporary medication.',
        indications: ['Vasculogenic erectile dysfunction', 'Poor response to oral ED medication'],
        benefits: ['Completely non-invasive & painless', 'No medication side-effects', 'Promotes natural blood vessel growth'],
        preparation: ['No special prep required'],
        keywords: ['Shockwave ED Therapy Patna', 'Non Invasive ED Treatment Digha'],
        faqs: [
          { question: 'Is shockwave therapy painful?', answer: 'No, Li-ESWT shockwave therapy is completely painless, non-invasive, and requires zero anesthesia.' }
        ]
      }
    ]
  },
  {
    id: 'icu-emergency-care',
    name: 'ICU & Emergency Care',
    slug: 'icu-emergency-care',
    icon: '🚨',
    category: 'Critical & Emergency Care',
    available: '24 × 7',
    description: '24/7 emergency response, trauma management, and intensive care beds staffed by expert intensivists.',
    longDescription: 'Nova Max Hospital in Digha, Patna provides round-the-clock emergency, trauma, and critical care support. Our Intensive Care Unit (ICU) is equipped with advanced multi-parameter monitors, mechanical ventilators, defibrillators, and central oxygen supply, supervised continuously by qualified intensivists.',
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
        procedureType: 'Critical Care',
        description: 'Critical multi-parameter patient monitoring and dedicated critical care nursing.',
        longDescription: 'Continuous life-support monitoring, medication administration, and one-on-one nursing for critically ill patients at Nova Max Hospital in Digha, Patna. Managed continuously by dedicated critical care physicians (intensivists), the unit ensures immediate adjustment of vasoactive medications, electrolyte balancing, and close tracking of hemodynamic vitals.',
        indications: ['Respiratory or circulatory failure', 'Septic shock', 'Severe trauma or major post-op recovery'],
        benefits: ['Continuous vitals tracking', 'Rapid resuscitation capability', 'One-to-one nursing care'],
        preparation: ['Immediate admission via emergency'],
        keywords: ['ICU Hospital Digha Patna', '24/7 Emergency Care Patna', 'Trauma Center Digha']
      }
    ]
  },
  {
    id: 'hemodialysis-pathology',
    name: 'Hemodialysis & Pathology',
    slug: 'hemodialysis-pathology',
    icon: '🧪',
    category: 'Diagnostics',
    available: '24 × 7',
    description: 'Modern hemodialysis unit and 24/7 fully automated pathology laboratory for quick, accurate diagnostics.',
    longDescription: 'Our diagnostics division at Nova Max Hospital in Digha, Patna comprises a state-of-the-art biochemistry and clinical pathology laboratory alongside a highly hygienic hemodialysis unit. We provide rapid diagnostic turnaround times for routine and pre-surgical workups, and offer renal support for chronic kidney disease patients.',
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
        procedureType: 'Renal Dialysis',
        description: 'Life-sustaining dialysis therapy using high-flux artificial kidneys for renal failure.',
        longDescription: 'Our dialysis unit at Nova Max Hospital in Digha, Patna provides high-safety renal replacement therapy using advanced hemodialysis machines. We filter toxic waste products, extra fluids, and balance blood chemistry for patients with acute kidney injury or end-stage renal disease (ESRD).',
        indications: ['Acute kidney injury (AKI)', 'End-stage renal disease (ESRD)', 'Severe fluid overload or electrolyte imbalance'],
        benefits: ['Removes urea and creatinine', 'Regulates blood pressure and electrolytes'],
        preparation: ['Valid vascular access (AV Fistula or Dialysis catheter)'],
        keywords: ['Dialysis Center Digha Patna', 'Hemodialysis Hospital Patna']
      }
    ]
  }
]
