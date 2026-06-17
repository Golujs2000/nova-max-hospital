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
    description: 'Expert care for kidney stones, prostate disorders, bladder issues, and comprehensive urological solutions.',
    longDescription: 'Our Urology department provides comprehensive diagnostic and surgical services for all kidney and urinary tract conditions. Led by expert urologists and surgeons, we specialize in advanced urological treatments, minimally invasive stone surgery, prostate management, and female urology.',
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
        description: 'Minimally invasive or ureteroscopic kidney stone removal procedures.',
        longDescription: 'We offer advanced Ureteroscopy (URS) and Percutaneous Nephrolithotomy (PCNL) for removing large or complex kidney stones. These minimally invasive techniques involve no major cuts and allow faster recovery times, typically discharging patients in 24 to 48 hours.',
        indications: ['Obstructing kidney stones', 'Severe persistent renal colic', 'Stones larger than 7mm'],
        benefits: ['No open incision', 'Short hospital stay', 'Minimal blood loss'],
        preparation: ['Fast for 6-8 hours', 'Complete blood and urine tests', 'Discontinue blood thinners as advised']
      },
      {
        name: 'Prostate Surgery (TURP)',
        slug: 'prostate-surgery',
        duration: '60 mins',
        recovery: '2 – 4 days',
        description: 'Transurethral resection of the prostate for benign prostatic hyperplasia.',
        longDescription: 'Transurethral Resection of the Prostate (TURP) is the gold standard surgical treatment for benign enlargement of the prostate (BPH). The procedure is performed through the urethra with no external cuts, relieving urinary blockage instantly.',
        indications: ['Severe urinary retention', 'Recurrent UTIs due to BPH', 'Bladder stones or kidney damage from obstruction'],
        benefits: ['Restores normal urine flow', 'Improves bladder emptying', 'High success rate'],
        preparation: ['Fasting from midnight', 'Stop antiplatelet medications', 'Pre-anesthetic evaluation']
      },
      {
        name: 'UTI & Bladder Care',
        slug: 'uti-bladder-care',
        duration: '30 mins',
        recovery: 'Immediate',
        description: 'Expert medical diagnosis and treatment for urinary tract infections and bladder conditions.',
        longDescription: 'Comprehensive diagnostic workup and customized medical treatment for recurrent UTIs, cystitis, urinary incontinence, and bladder disorders. We utilize urine cultures and advanced diagnostic imaging to address root causes.',
        indications: ['Painful urination', 'Frequent or urgent urination', 'Blood in urine'],
        benefits: ['Rapid symptom relief', 'Prevention of kidney infections', 'Personalized long-term management plans'],
        preparation: ['Bring mid-stream urine sample', 'Document symptom history']
      },
      {
        name: 'Circumcision & Hydrocele Surgery',
        slug: 'circumcision-hydrocele-surgery',
        duration: '30 – 45 mins',
        recovery: '3 – 7 days',
        description: 'Day-care surgical procedures under local or general anesthesia.',
        longDescription: 'Safe, precise circumcision and hydrocelectomy (fluid-filled sac removal around testicle) performed as day-care procedures. We employ modern techniques ensuring minimal pain and aesthetic results.',
        indications: ['Phimosis or recurring balanitis', 'Symptomatic hydrocele', 'Scrotal swelling/heaviness'],
        benefits: ['Permanent cure', 'Minimal post-operative pain', 'Discharge on the same day'],
        preparation: ['Clean the local area', 'Wear loose-fitting clothing']
      },
      {
        name: 'Bladder Stone Removal (Cystolitholapaxy)',
        slug: 'bladder-stone-removal',
        duration: '45 mins',
        recovery: '1 – 2 days',
        description: 'Transurethral stone crushing and removal.',
        longDescription: 'Cystolitholapaxy is a procedure to crush and remove stones from the bladder. A small scope is inserted through the urethra, and laser or ultrasonic energy breaks the stones into small fragments which are then washed out.',
        indications: ['Bladder stones causing pain or blockage', 'Hematuria from bladder irritation'],
        benefits: ['No surgical incision', 'Rapid relief from pain and blockage'],
        preparation: ['Fasting for surgery', 'Routine laboratory checkup']
      },
      {
        name: 'RIRS (Flexible Ureteroscopy)',
        slug: 'rirs',
        duration: '60 – 90 mins',
        recovery: '1 – 2 days',
        description: 'Retrograde Intrarenal Surgery using flexible scopes and laser.',
        longDescription: 'Retrograde Intrarenal Surgery (RIRS) is a highly specialized procedure using a flexible ureteroscope to reach stones in the kidney that are otherwise inaccessible with rigid scopes. Laser fiber is passed to dust the stones.',
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
    description: 'Advanced minimally invasive keyhole surgeries for gallbladder stones, hernia, and appendix with faster recovery.',
    longDescription: 'Our advanced Laparoscopic Surgery unit uses state-of-the-art keyhole surgery technology to treat gallbladder disease, hernias, and appendicitis. By avoiding large incisions, we ensure minimal scarring, less pain, and a rapid return to daily activities.',
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
        description: 'Gold standard keyhole surgery to remove the gallbladder.',
        longDescription: 'Laparoscopic Cholecystectomy is the surgical removal of the gallbladder through 3 or 4 small keyhole cuts. It is the treatment of choice for gallstones, eliminating the risk of recurrent gallbladder attacks, infection, and jaundice.',
        indications: ['Symptomatic gallstones (cholelithiasis)', 'Gallbladder inflammation (cholecystitis)', 'Gallbladder polyps'],
        benefits: ['Tiny scars', 'Discharge within 24 hours', 'Minimal post-op pain'],
        preparation: ['Fasting for 8 hours', 'Normal coagulation profile', 'Liver function tests']
      },
      {
        name: 'Laparoscopic Hernia Repair (TEP/TAPP)',
        slug: 'laparoscopic-hernia-repair',
        duration: '60 – 90 mins',
        recovery: '2 – 4 days',
        description: 'Keyhole hernia repair with mesh reinforcement.',
        longDescription: 'We perform advanced Totally Extraperitoneal (TEP) and Transabdominal Preperitoneal (TAPP) laparoscopic hernia repairs. A surgical mesh is placed to reinforce the weakened abdominal wall, offering a permanent cure with minimal discomfort.',
        indications: ['Inguinal hernia', 'Umbilical hernia', 'Incisional or recurrent hernia'],
        benefits: ['Bilateral hernias fixed through same cuts', 'Low recurrence rate', 'Quick return to work'],
        preparation: ['Fasting from midnight', 'Stop medications affecting clotting', 'Chest X-ray and ECG']
      },
      {
        name: 'Laparoscopic Appendectomy',
        slug: 'laparoscopic-appendectomy',
        duration: '45 mins',
        recovery: '1 – 2 days',
        description: 'Minimally invasive removal of an inflamed appendix.',
        longDescription: 'Laparoscopic Appendectomy is the emergency or planned removal of an inflamed appendix using keyhole surgery. The procedure prevents appendix rupture and peritonitis, leaving three tiny, barely visible scars.',
        indications: ['Acute appendicitis', 'Chronic/recurrent appendiceal pain'],
        benefits: ['Less wound infection risk', 'Very low pain', 'Discharge next day'],
        preparation: ['NPO (nil by mouth) immediately', 'Intravenous fluids and antibiotics', 'Emergency pre-op workup']
      },
      {
        name: 'Diagnostic Laparoscopy',
        slug: 'diagnostic-laparoscopy',
        duration: '30 – 45 mins',
        recovery: '1 day',
        description: 'Keyhole camera evaluation of pelvic and abdominal organs.',
        longDescription: 'A diagnostic procedure that allows the surgeon to view the inside of the abdomen and pelvis directly using a high-definition camera. Used when non-invasive tests are inconclusive.',
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
    description: 'Comprehensive surgical care for appendix, hernias, swelling, trauma, and complex abdominal conditions.',
    longDescription: 'The General Surgery department offers standard open and advanced surgical treatments for various abdominal conditions, skin swellings, and vascular access requirements. Our senior surgeons bring decades of operating experience to ensure safe patient outcomes.',
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
        description: 'Traditional surgical treatments for appendicitis.',
        longDescription: 'Conventional open surgery performed under spinal or general anesthesia. Open appendectomy is used in cases of complicated, perforated, or ruptured appendix.',
        indications: ['Complicated/perforated appendix', 'Acute appendicitis'],
        benefits: ['Reliable treatment', 'Applicable to complex anatomy'],
        preparation: ['Fasting required', 'General medical clearance']
      },
      {
        name: 'Hernia Repair Surgery',
        slug: 'hernia-repair-surgery',
        duration: '60 mins',
        recovery: '3 – 7 days',
        description: 'Conventional open hernia correction with mesh.',
        longDescription: 'Traditional open hernia repair involving an incision over the hernia site. A surgical mesh is placed to reinforce the weakened muscle tissue, ensuring a strong, permanent correction.',
        indications: ['Inguinal, umbilical, or femoral hernia'],
        benefits: ['Sturdy repair', 'Highly reliable long-term results'],
        preparation: ['Pre-anesthetic screen', 'Fasting from midnight']
      },
      {
        name: 'Abscess Drainage & Wound Care',
        slug: 'abscess-drainage',
        duration: '15 – 30 mins',
        recovery: '1 – 2 days',
        description: 'Incision, drainage, and dressing of abscesses.',
        longDescription: 'Minor surgical treatment for infected collections (abscesses) or diabetic wounds. The cavity is incised, drained of pus, and dressed sterilely to encourage healing from the base.',
        indications: ['Skin and deep tissue abscesses', 'Infected surgical or diabetic wounds'],
        benefits: ['Immediate pain relief', 'Prevents spread of infection'],
        preparation: ['Local area cleansing', 'Tetanus status check']
      },
      {
        name: 'Lipoma & Cyst Removal',
        slug: 'lipoma-cyst-removal',
        duration: '20 – 30 mins',
        recovery: 'Immediate',
        description: 'Daycare excision of skin nodules under local anesthesia.',
        longDescription: 'Minor daycare procedure to remove benign skin swellings like lipomas (fatty lumps) or sebaceous cysts. Performed under local anesthesia, ensuring clean excision with cosmetic suturing.',
        indications: ['Cosmetic concerns', 'Painful or growing skin swellings', 'Infected sebaceous cysts'],
        benefits: ['Done in 30 minutes', 'Walk-home immediately', 'Minimal scarring'],
        preparation: ['No fasting required', 'Clean skin area']
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
    description: 'Specialized diagnosis and treatment for pelvic floor disorders, urinary incontinence, and women’s reproductive health.',
    longDescription: 'Our Uro Gynecology department bridges urology and gynecology, providing comprehensive care for pelvic floor disorders and urinary issues in women. We offer empathetic and advanced solutions for pelvic organ prolapse and urinary leaks.',
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
        description: 'Surgical or conservative management of pelvic prolapse.',
        longDescription: 'Correction of dropped pelvic organs (uterus, bladder, or bowel) using advanced surgical suspension techniques or non-surgical vaginal pessary placement.',
        indications: ['Uterine prolapse', 'Cystocele (fallen bladder)', 'Rectocele'],
        benefits: ['Restores pelvic anatomy', 'Relieves pressure and discomfort', 'Improves quality of life'],
        preparation: ['Urinanalysis', 'Pelvic ultrasound', 'Fasting if surgery planned']
      },
      {
        name: 'Urinary Incontinence Management',
        slug: 'urinary-incontinence',
        duration: '45 mins',
        recovery: '2 – 3 days',
        description: 'Therapy or sling procedures for urine leakage.',
        longDescription: 'We provide specialized therapies and minimally invasive TVT/TOT tape (sling) surgeries to treat stress urinary incontinence (leakage during coughing, laughing, or exercising).',
        indications: ['Involuntary loss of urine', 'Stress incontinence', 'Urge incontinence'],
        benefits: ['Restores bladder control', 'High post-op dry rate', 'Daycare or 1-day stay'],
        preparation: ['Urodynamic study if needed', 'Urine culture validation']
      },
      {
        name: 'Gynaecological Consultation',
        slug: 'gynaecological-consultation',
        duration: '15 – 30 mins',
        recovery: 'Immediate',
        description: 'Expert consultation for menstrual disorders, PCOD, and female health.',
        longDescription: 'Comprehensive consulting services covering all aspects of gynecological health, including adolescent healthcare, reproductive health, fertility support, and postmenopausal care.',
        indications: ['PCOD/PCOS', 'Irregular menstrual cycles', 'Menopausal concerns', 'Pelvic pain'],
        benefits: ['Expert medical guidance', 'Early diagnosis of reproductive issues', 'Holistic health plans'],
        preparation: ['Prepare medical history and previous scan details']
      },
      {
        name: 'D&C Procedure',
        slug: 'dc-procedure',
        duration: '20 – 30 mins',
        recovery: '1 – 2 days',
        description: 'Dilation and curettage for uterine bleeding or biopsy.',
        longDescription: 'A minor surgical procedure in which the cervix is dilated and a special instrument scrapes the uterine lining. Done for diagnosing abnormal bleeding or clearing uterine contents after miscarriage.',
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
    description: 'Comprehensive evaluation, micro-surgeries, and targeted medical therapies for male reproductive health and infertility.',
    longDescription: 'The Male Infertility division provides confidential and advanced evaluation for couples experiencing reproductive challenges. We offer microscopic surgeries, semen workups, and targeted medical treatments for varicocele and hormonal imbalances.',
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
        description: 'Laboratory evaluation of sperm count and motility.',
        longDescription: 'A detailed microscopic evaluation of a semen sample to analyze sperm count, motility, morphology, and vitality. This is the cornerstone of male fertility evaluation.',
        indications: ['Inability to conceive after 1 year', 'History of testicular injury or surgery'],
        benefits: ['Accurate baseline assessment', 'Guides targeted therapy'],
        preparation: ['Abstinence of 2 to 7 days before sample collection']
      },
      {
        name: 'Varicocele Treatment',
        slug: 'varicocele-treatment',
        duration: '45 – 60 mins',
        recovery: '2 – 4 days',
        description: 'Surgical ligation of swollen scrotal veins.',
        longDescription: 'Surgical correction of varicocele (enlarged veins in the scrotum) via microscopic varicocelectomy. This improves testicular blood flow, cooling the testicles and enhancing sperm quality.',
        indications: ['Varicocele with abnormal semen parameters', 'Scrotal pain or atrophy due to varicocele'],
        benefits: ['Improves semen count and motility', 'Reduces scrotal aching'],
        preparation: ['Fasting required', 'Scrotal ultrasound with Doppler']
      },
      {
        name: 'Hormonal Evaluation',
        slug: 'hormonal-evaluation',
        duration: '30 mins',
        recovery: 'Immediate',
        description: 'Medical diagnostics and therapies for male hormonal profiles.',
        longDescription: 'Assessing testosterone, FSH, LH, and prolactin levels. Corrective medical therapy is provided to restore chemical levels necessary for sperm production and vitality.',
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
    description: 'Confidential, expert consultations and evidence-based treatments for sexual health disorders and dysfunctions.',
    longDescription: 'Our Sexology clinic offers absolute confidentiality and evidence-based clinical care for sexual health issues. We combine medical therapy with psychological counseling to treat erectile dysfunction, premature ejaculation, and performance anxiety.',
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
        description: 'Diagnosis and treatment plans for erectile issues.',
        longDescription: 'Comprehensive evaluation of physical, hormonal, and psychological causes of erectile dysfunction. Treatments include customized oral medication, hormone therapy, and lifestyle modification plans.',
        indications: ['Inability to achieve or maintain erection', 'Decreased libido'],
        benefits: ['Restores sexual confidence', 'Improves intimate relationships', 'Addresses underlying vascular or endocrine issues'],
        preparation: ['Bring lists of current medications', 'Blood tests (Testosterone, HbA1c, Lipids)']
      },
      {
        name: 'Premature Ejaculation Therapy',
        slug: 'premature-ejaculation',
        duration: '20 – 30 mins',
        recovery: 'Immediate',
        description: 'Evidence-based medical and behavioral treatments.',
        longDescription: 'Multi-modal treatment for ejaculation control, combining medical options, topical desensitizing agents, and behavioral techniques (Start-Stop, Squeeze) for long-term resolution.',
        indications: ['Ejaculation occurring with minimal stimulation', 'Distress related to rapid ejaculation'],
        benefits: ['Improves control and stamina', 'Reduces anxiety'],
        preparation: ['Open discussion of symptoms']
      },
      {
        name: 'Performance Anxiety Counseling',
        slug: 'performance-anxiety-counseling',
        duration: '45 mins',
        recovery: 'Immediate',
        description: 'Psychological counseling and therapy sessions.',
        longDescription: 'Confidential counseling to address psychological barriers to sexual health. Our specialist provides behavioral therapy to resolve anxiety and rebuild relationship dynamics.',
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
    description: '24/7 high-dependency unit, emergency trauma care, and intensive monitoring managed by expert intensivists.',
    longDescription: 'Nova Max Hospital houses a fully equipped 24/7 emergency trauma room and an Intensive Care Unit (ICU) supported by advanced life support, monitors, and ventilator setups. Critical care is managed round-the-clock by trained intensivists and nursing staff.',
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
        description: 'Constant multi-parameter monitoring and intensive nursing.',
        longDescription: 'Providing life-saving monitoring and nursing for critically ill patients, post-major surgery cases, and multi-organ failure under the supervision of intensivists.',
        indications: ['Respiratory or circulatory failure', 'Septic shock', 'Severe trauma or major post-op recovery'],
        benefits: ['Continuous vitals tracking', '`Rapid resuscitation capability`', 'One-to-one nursing care'],
        preparation: ['Immediate admission via emergency']
      },
      {
        name: 'Ventilator & Oxygen Care',
        slug: 'ventilator-oxygen-care',
        duration: 'Ongoing',
        recovery: 'Critical',
        description: 'Advanced mechanical respiratory support.',
        longDescription: 'Mechanical ventilation support for patients unable to maintain adequate oxygen levels independently due to respiratory distress, trauma, or anesthesia.',
        indications: ['Acute respiratory distress syndrome (ARDS)', 'Severe pneumonia', 'Hypoxia or respiratory failure'],
        benefits: ['Ensures cellular oxygenation', 'Rests respiratory muscles'],
        preparation: ['Intubation under sedation']
      },
      {
        name: 'Post-Surgical Monitoring (HDU)',
        slug: 'post-surgical-monitoring',
        duration: 'Ongoing',
        recovery: 'Varies',
        description: 'High-dependency post-operative nursing care.',
        longDescription: 'Close monitoring of hemodynamic stability, pain management, fluid balance, and surgical site integrity in our High Dependency Unit (HDU) immediately following major surgical interventions.',
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
    description: 'In-house state-of-the-art pathology laboratory and dedicated hemodialysis unit for kidney patient support.',
    longDescription: 'Our in-house pathology lab and modern hemodialysis unit ensure prompt diagnostic reports and life-saving renal support for patients. We utilize fully automated biochemistry analyzers and high-efficiency dialysis machines.',
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
        description: 'Renal replacement therapy for kidney failure.',
        longDescription: 'Life-sustaining hemodialysis treatment using modern artificial kidney machines. The procedure filters waste products, toxins, and excess fluids from the blood of patients with renal failure.',
        indications: ['Acute kidney injury (AKI)', 'End-stage renal disease (ESRD)', 'Severe fluid overload or electrolyte imbalance'],
        benefits: ['Removes urea and creatinine', 'Regulates blood pressure and electrolytes'],
        preparation: ['Valid vascular access (AV Fistula or Dialysis catheter)', 'Recent dry weight check']
      },
      {
        name: 'Complete Blood Count (CBC)',
        slug: 'complete-blood-count',
        duration: '15 mins',
        recovery: 'Immediate',
        description: 'Automated blood panel diagnostics with same-day reports.',
        longDescription: 'In-house blood panels to assess blood cells (CBC), hematocrit, hemoglobin, and platelets. Critical for surgical fitness and anemia monitoring.',
        indications: ['Anemia, infections, fever screen', 'Pre-operative clearance'],
        benefits: ['Same-day accurate results', 'Aids in immediate clinical decisions'],
        preparation: ['No special prep required']
      },
      {
        name: 'Liver & Kidney Function Tests (LFT/KFT)',
        slug: 'liver-kidney-function-tests',
        duration: '30 mins',
        recovery: 'Immediate',
        description: 'Biochemical blood panels for organ wellness evaluation.',
        longDescription: 'Comprehensive biochemistry assessment of liver enzymes (SGOT, SGPT, Bilirubin) and kidney metabolites (Creatinine, Urea, Uric acid).',
        indications: ['Organ disease screening', 'General health evaluation', 'Post-medication monitoring'],
        benefits: ['Identifies organ dysfunction early', 'Guides medicine dosage adjustments'],
        preparation: ['Overnight fasting required']
      },
      {
        name: 'Urinalysis & Diagnostics',
        slug: 'urinalysis-diagnostics',
        duration: '15 mins',
        recovery: 'Immediate',
        description: 'Urine chemical and microscopic evaluation.',
        longDescription: 'Routine urine analysis checking for glucose, proteins, blood, and microscopic crystals. Essential for identifying kidney issues, UTIs, and diabetic control markers.',
        indications: ['Suspected UTI', 'Kidney stone tracking', 'Diabetic monitoring'],
        benefits: ['Immediate diagnostic markers', 'Non-invasive screening'],
        preparation: ['Collect fresh clean-catch mid-stream urine sample']
      }
    ]
  }
]
