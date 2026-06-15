// ─────────────────────────────────────────────────────────────
// data/siteData.js
// Central configuration for Nova Max Hospital.
// Update this file when clinic details change rather than
// hunting through components.
// ─────────────────────────────────────────────────────────────

export const siteData = {
  name: 'Nova Max Hospital',
  shortName: 'Nova Max Hospital',
  tagline: 'Specialty Urology, Laparoscopy, Uro Gynecology, Male Infertility, Sexology & General Surgery',
  description:
    'We are Nova Max Private Hospital in Digha, Patna, offering expert care in urology, laparoscopy, general surgery, male infertility, and sexology. Our skilled urologists and surgeons specialize in kidney stone treatment, laparoscopic procedures, and comprehensive urological solutions. With a modern modular operation theatre, ICU, hemodialysis unit, and in-house pathology lab, we deliver advanced medical care you can trust. Our dedicated team of doctors and compassionate nursing staff ensure every patient receives personalized attention and quality treatment. Visit us for exceptional healthcare services in Patna.',
  founded: '2026',
  url: 'https://nova-max-hospital-e4412.web.app',
  logo: '/favicon.png',

  // ── Contact & Location ───────────────────────────────────────
  contact: {
    address: "Multi-speciality Hospital, opposite Women's ITI College, beside HDFC Bank or Ziom, Digha, Patna, Bihar 800011",
    streetAddress: "Multi-speciality Hospital, opposite Women's ITI College, beside HDFC Bank or Ziom, Digha",
    addressLocality: 'Patna',
    addressRegion: 'Bihar',
    postalCode: '800011',
    phone: '072505 20694',
    phone2: '8252730070',
    phone3: '',
    phone4: '',
    email: 'surgmrityunjay@yahoo.co.in',
    hours: 'Open 24/7 | Emergency Care Available',
  },

  // ── Social Media Links ───────────────────────────────────────
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61590019713968',
    instagram: 'https://www.instagram.com/novamaxhospital/',
    twitter: 'https://twitter.com/patnalapro',
    youtube: 'https://youtube.com/@patnalaprostonecare',
    linkedin: 'https://linkedin.com/company/patnalaprostonecare',
  },

  // ── Team & Operational Stats ─────────────────────────────────
  team: {
    totalStaff: 10,
    nurses: 3,
    technicians: 3,
    pharmacist: true,
    ambulance: false,
    available247: false,
    consultationFee: 500,
  },

  // ── SEO Configuration ────────────────────────────────────────
  seo: {
    keywords: [
      'Nova Max Hospital',
      'Nova Max Private Hospital Digha',
      'urology hospital Patna',
      'best urologist in Patna Bihar',
      'laparoscopic surgery Digha Patna',
      'kidney stone treatment Patna',
      'male infertility specialist Patna',
      'sexologist doctor Patna',
      'uro gynaecology hospital Patna',
      'general surgery Patna',
      'modular operation theatre hospital Patna',
      'ICU hospital Digha Patna',
      'hemodialysis unit Patna',
      'in-house pathology lab Patna',
      'Dr M K Sinha urologist',
      'best hospital in Digha Patna',
      'emergency trauma center Digha',
      'Patna hospital contact number',
      'doctors in Digha Patna',
      'doctor consult fee Patna',
      'dialysis hospital Digha'
    ],
    ogImage: '/og-image.jpg',
  },

  // ── Regional Reach ───────────────────────────────────────────
  reach: [
    {
      region: 'Bihar Districts',
      title: 'Statewide Coverage',
      description: 'Deeply integrated across all 38 districts of Bihar for comprehensive secondary and tertiary medical care.',
      stat: '38 Districts',
      highlight: 'Statewide Reach',
      color: 'from-rose-500 to-pink-600',
      light: 'bg-rose-500/10 text-rose-600 border-rose-500/10'
    },
    {
      region: 'Jharkhand',
      title: 'Deoghar & Surrounding',
      description: 'Serving patients traveling from Deoghar and surrounding regions of Jharkhand for high-quality, reliable healthcare.',
      stat: 'Deoghar Region',
      highlight: 'Interstate Hub',
      color: 'from-emerald-500 to-teal-600',
      light: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10'
    },
    {
      region: 'West Bengal',
      title: 'Siliguri & Beyond',
      description: 'A trusted healthcare destination for patients from Siliguri and neighboring areas in West Bengal.',
      stat: 'Siliguri Hub',
      highlight: 'Eastern Care',
      color: 'from-amber-500 to-orange-600',
      light: 'bg-amber-500/10 text-amber-600 border-amber-500/10'
    }
  ],

  // ── Homepage Stats Counter ───────────────────────────────────
  stats: [
    { label: 'Satisfied Patients', value: 5000, suffix: '+', emoji: '😊' },
    { label: 'Year Established', value: 2026, suffix: '', emoji: '🏥' },
    { label: 'Expert Doctors', value: 5, suffix: '+', emoji: '👨‍⚕️' },
    { label: 'Successful Operations', value: 2000, suffix: '+', emoji: '🩺' },
  ],

  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.7791703112107!2d85.0936936!3d25.645453699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57003e1834f3%3A0x3fd780244692ce9d!2sNova%20Max%20Hospital!5e0!3m2!1sen!2sin!4v1781516231401!5m2!1sen!2sin',
  mapLink:
    'https://maps.google.com/?cid=4599540026725842589',

  // ── Departments / Specialties (used in appointment form) ─────
  departments: [
    'Urology',
    'Laparoscopy',
    'Uro Gynecology',
    'Male Infertility',
    'Sexology',
    'General Surgery',
    'ICU & Emergency Care',
    'Hemodialysis & Pathology',
  ],

  // ── Facilities ───────────────────────────────────────────────
  facilities: [
    { name: 'ICU, ICCU, IPD & OPD Care', icon: '🏥' },
    { name: 'Advanced Laparoscopy', icon: '🔬' },
    { name: 'Dialysis & Burn Unit', icon: '🔥' },
    { name: 'General & Ortho Surgery', icon: '🦴' },
    { name: 'Neuro & Spinal Surgery', icon: '🧠' },
    { name: 'Nephrology & Cardiology', icon: '❤️' },
    { name: 'Pathology & 24/7 Pharmacy', icon: '🧪' },
    { name: 'Gynecology & Pediatrics', icon: '🤰' },
    { name: 'X-Ray, Ultrasound & Doppler', icon: '🩻' },
    { name: '24/7 AC HDU & Emergency Care', icon: '🚨' },
    { name: '24/7 Ambulance Service', icon: '🚑' },
  ],
}

export const siteSpecialties = [
  {
    id: 'urology',
    name: 'Urology',
    category: 'Surgical Services',
    icon: '🫘',
    description: 'Expert care for kidney stones, prostate disorders, bladder issues, and comprehensive urological solutions.',
    slug: 'urology',
    treatments: [
      { name: 'Kidney Stone Treatment (URS / PCNL)', slug: 'kidney-stone-treatment' },
      { name: 'Prostate Surgery (TURP)', slug: 'prostate-surgery' },
      { name: 'UTI & Bladder Care', slug: 'uti-bladder-care' },
      { name: 'Circumcision & Hydrocele Surgery', slug: 'circumcision-hydrocele-surgery' }
    ]
  },
  {
    id: 'laparoscopy',
    name: 'Laparoscopy',
    category: 'Surgical Services',
    icon: '🔬',
    description: 'Advanced minimally invasive keyhole surgeries for gallbladder stones, hernia, and appendix with faster recovery.',
    slug: 'laparoscopy',
    treatments: [
      { name: 'Laparoscopic Cholecystectomy (Gallstone)', slug: 'laparoscopic-cholecystectomy' },
      { name: 'Laparoscopic Hernia Repair (TEP/TAPP)', slug: 'laparoscopic-hernia-repair' },
      { name: 'Laparoscopic Appendectomy', slug: 'laparoscopic-appendectomy' },
      { name: 'Diagnostic Laparoscopy', slug: 'diagnostic-laparoscopy' }
    ]
  },
  {
    id: 'uro-gynecology',
    name: 'Uro Gynecology',
    category: 'Hospital Departments',
    icon: '🤰',
    description: 'Specialized diagnosis and treatment for pelvic floor disorders, urinary incontinence, and women’s reproductive health.',
    slug: 'uro-gynecology',
    treatments: [
      { name: 'Pelvic Organ Prolapse Treatment', slug: 'pelvic-organ-prolapse' },
      { name: 'Urinary Incontinence Management', slug: 'urinary-incontinence' },
      { name: 'Gynaecological Consultation', slug: 'gynaecological-consultation' },
      { name: 'D&C Procedure', slug: 'dc-procedure' }
    ]
  },
  {
    id: 'male-infertility',
    name: 'Male Infertility',
    category: 'Hospital Departments',
    icon: '👨',
    description: 'Comprehensive evaluation, micro-surgeries, and targeted medical therapies for male reproductive health and infertility.',
    slug: 'male-infertility',
    treatments: [
      { name: 'Semen Analysis & Workup', slug: 'semen-analysis-workup' },
      { name: 'Varicocele Treatment', slug: 'varicocele-treatment' },
      { name: 'Hormonal Evaluation', slug: 'hormonal-evaluation' }
    ]
  },
  {
    id: 'sexology',
    name: 'Sexology',
    category: 'Hospital Departments',
    icon: '❤️',
    description: 'Confidential, expert consultations and evidence-based treatments for sexual health disorders and dysfunctions.',
    slug: 'sexology',
    treatments: [
      { name: 'Erectile Dysfunction Treatment', slug: 'erectile-dysfunction' },
      { name: 'Premature Ejaculation Therapy', slug: 'premature-ejaculation' },
      { name: 'Performance Anxiety Counseling', slug: 'performance-anxiety-counseling' }
    ]
  },
  {
    id: 'general-surgery',
    name: 'General Surgery',
    category: 'Surgical Services',
    icon: '🔪',
    description: 'Comprehensive surgical care for appendix, hernias, swelling, trauma, and complex abdominal conditions.',
    slug: 'general-surgery',
    treatments: [
      { name: 'Appendectomy', slug: 'appendectomy' },
      { name: 'Hernia Repair Surgery', slug: 'hernia-repair-surgery' },
      { name: 'Abscess Drainage & Wound Care', slug: 'abscess-drainage' },
      { name: 'Lipoma & Cyst Removal', slug: 'lipoma-cyst-removal' }
    ]
  },
  {
    id: 'icu-emergency-care',
    name: 'ICU & Emergency Care',
    category: 'Critical & Emergency Care',
    icon: '🚨',
    description: '24/7 high-dependency unit, emergency trauma care, and intensive monitoring managed by expert intensivists.',
    slug: 'icu-emergency-care',
    treatments: [
      { name: '24/7 Emergency ICU Support', slug: 'emergency-icu-support' },
      { name: 'Ventilator & Oxygen Care', slug: 'ventilator-oxygen-care' },
      { name: 'Post-Surgical Monitoring (HDU)', slug: 'post-surgical-monitoring' }
    ]
  },
  {
    id: 'hemodialysis-pathology',
    name: 'Hemodialysis & Pathology',
    category: 'Diagnostics',
    icon: '🧪',
    description: 'In-house state-of-the-art pathology laboratory and dedicated hemodialysis unit for kidney patient support.',
    slug: 'hemodialysis-pathology',
    treatments: [
      { name: 'Hemodialysis Service', slug: 'hemodialysis-service' },
      { name: 'Complete Blood Count (CBC)', slug: 'complete-blood-count' },
      { name: 'Liver & Kidney Function Tests (LFT/KFT)', slug: 'liver-kidney-function-tests' },
      { name: 'Urinalysis & Diagnostics', slug: 'urinalysis-diagnostics' }
    ]
  }
]

export const siteDoctors = [
  {
    id: 'dr-m-k-sinha',
    name: 'Dr. M.K. Sinha',
    specialty: 'Urology',
    specialties: ['Urology', 'Laparoscopy', 'Uro Gynecology', 'Male Infertility', 'Sexology', 'General Surgery'],
    qualification: 'MS (General Surgery), M.Ch (Urology)',
    experience: 30,
    image: '/gallery/DR. M.K. SINHA.png',
    bio: 'Dr. M.K. Sinha is the Director of Nova Max Hospital. He is a highly experienced urologist and laparoscopic surgeon practicing urology, laparoscopy, uro-gynecology, male infertility, sexology, and general surgeries in Patna.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableHours: '10:00 AM - 04:00 PM',
    availableTime: '10:00 AM - 04:00 PM',
    phone: '072505 20694',
    email: 'surgmrityunjay@yahoo.co.in',
    featured: true,
    linkedTreatments: [
      'urology::kidney-stone-treatment',
      'urology::prostate-surgery',
      'urology::uti-bladder-care',
      'urology::circumcision-hydrocele-surgery',
      'laparoscopy::laparoscopic-cholecystectomy',
      'laparoscopy::laparoscopic-hernia-repair',
      'laparoscopy::laparoscopic-appendectomy',
      'laparoscopy::diagnostic-laparoscopy',
      'general-surgery::appendectomy',
      'general-surgery::hernia-repair-surgery',
      'general-surgery::abscess-drainage',
      'general-surgery::lipoma-cyst-removal'
    ]
  },
  {
    id: 'dr-basant-kumar-sinha',
    name: 'Dr. Basant Kumar Sinha',
    specialty: 'General Surgery',
    specialties: ['General Surgery'],
    qualification: 'MS (General Surgery)',
    experience: 50,
    image: '',
    bio: 'Dr. Basant Kumar Sinha is a legendary Senior General Surgeon at Nova Max Hospital with over 50 years of clinical experience. He has previously served as a Senior Consultant at prestigious medical institutions including Indraprastha Apollo Hospital, Breach Candy Hospital in Mumbai, and Lanka Apollo Hospital in Colombo.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableHours: '10:00 AM - 04:00 PM',
    availableTime: '10:00 AM - 04:00 PM',
    phone: '072505 20694',
    email: 'surgmrityunjay@yahoo.co.in',
    featured: true,
    previousPosition: 'Senior Consultant, Indraprastha Apollo Hospital | Consultant Surgeon, Breach Candy Hospital, Mumbai | Senior Consultant, Lanka Apollo Hospital, Colombo',
    linkedTreatments: [
      'general-surgery::appendectomy',
      'general-surgery::hernia-repair-surgery',
      'general-surgery::abscess-drainage',
      'general-surgery::lipoma-cyst-removal'
    ]
  }
]

export default siteData
