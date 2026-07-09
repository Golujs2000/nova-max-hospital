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
  url: 'https://nova-max-hospital-4ac39.web.app',
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
    whatsapp: '919334097925',
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

export { siteSpecialties } from './hospitalServicesData.js'

export const siteDoctors = [
  {
    id: 'dr-m-k-sinha',
    name: 'Dr. M.K. Sinha',
    specialty: 'Urology',
    specialties: ['Urology', 'Laparoscopy', 'Uro Gynecology', 'Male Infertility', 'Sexology', 'General Surgery'],
    qualification: 'MBBS, MS (Gen. Surgery) Patna, SR II Urology (Sir J.J. Hospital Mumbai), FL-ASI, USI, AMASI, IMA',
    experience: 30,
    image: '/gallery/DR. M.K. SINHA.png',
    bio: 'Dr. M.K. Sinha is the Director of Nova Max Hospital. He is a highly experienced Surgeon & Urologist with over 30 years of experience practicing urology, laparoscopy, uro-gynecology, male infertility, sexual health problems, and general surgeries. He previously served as a Urologist, Transplant & Laparoscopic Surgeon at Indraprastha Apollo Hospital (Delhi), Breach Candy Hospital (Mumbai), and Lanka Apollo Hospital (Colombo).',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableHours: '10:00 AM - 04:00 PM',
    availableTime: '10:00 AM - 04:00 PM',
    phone: '072505 20694',
    email: 'surgmrityunjay@yahoo.co.in',
    featured: true,
    currentPosition: 'Director & Chief Consultant (Urology & Laparoscopy), Nova Max Hospital',
    previousPosition: 'Former Urologist, Transplant & Laparoscopic Surgeon, Indraprastha Apollo Hospital, Delhi | Former Surgeon, Breach Candy Hospital, Mumbai | Former Surgeon, Lanka Apollo Hospital, Colombo',
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

export function updateSiteDataDynamic(dbSettings) {
  if (dbSettings.siteName) siteData.name = dbSettings.siteName;
  if (dbSettings.siteName) siteData.shortName = dbSettings.siteName;
  if (dbSettings.tagline) siteData.tagline = dbSettings.tagline;
  if (dbSettings.description) siteData.description = dbSettings.description;
  
  if (!siteData.contact) siteData.contact = {};
  if (dbSettings.phone) siteData.contact.phone = dbSettings.phone;
  if (dbSettings.emergencyPhone) siteData.contact.phone2 = dbSettings.emergencyPhone;
  if (dbSettings.email) siteData.contact.email = dbSettings.email;
  if (dbSettings.address) siteData.contact.address = dbSettings.address;
  
  if (!siteData.social) siteData.social = {};
  if (dbSettings.facebookUrl) siteData.social.facebook = dbSettings.facebookUrl;
  if (dbSettings.instagramUrl) siteData.social.instagram = dbSettings.instagramUrl;
}

export default siteData
