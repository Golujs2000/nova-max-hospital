import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowLeft, FiClock, FiCalendar, FiCheck,
  FiPhone, FiAlertCircle, FiActivity,
  FiImage, FiHelpCircle, FiChevronDown, FiX, FiInfo, FiUser,
  FiShield, FiAward, FiCheckCircle, FiHeart, FiCpu, FiFileText
} from 'react-icons/fi'
import SEO from '../components/SEO'
import MedicalDisclaimer from '../components/MedicalDisclaimer'
import { getCategoryItemBySlug as getDepartmentBySlug } from '../services/categories'
import { getDoctors } from '../services/doctors'
import { getInitials, slugify } from '../utils/helpers'
import { siteData } from '../data/siteData'

const DEFAULT_PROCESS_STEPS = [
  { step: '01', title: 'Clinical Evaluation & Diagnosis', desc: 'Detailed consultation, medical history review, and necessary diagnostic scans with lead specialists.' },
  { step: '02', title: 'Pre-Procedure Planning', desc: 'Customized surgical planning, pre-anesthetic clearance, and patient preparation guidelines.' },
  { step: '03', title: 'Advanced Procedure / Surgery', desc: 'Performed in state-of-the-art modular OTs adhering to international safety & hygiene protocols.' },
  { step: '04', title: 'Post-Op Monitoring & Recovery', desc: 'Dedicated recovery room monitoring, pain management, and clear discharge instructions.' },
]

export default function TreatmentDetail() {
  const { slug, treatmentSlug } = useParams()
  const navigate = useNavigate()
  const [department, setDepartment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [relatedDoctors, setRelatedDoctors] = useState([])

  useEffect(() => {
    setLoading(true)
    getDepartmentBySlug(slug)
      .then((data) => {
        if (!data) navigate('/hospital-departments', { replace: true })
        else setDepartment(data)
      })
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!department) return
    getDoctors().then((all) => {
      const treatmentsList = Array.isArray(department.treatments) ? department.treatments : []
      const foundTreatment = treatmentsList.find((t, i) => (t.slug || String(i)) === treatmentSlug)
      const resolvedSlug = foundTreatment?.slug || treatmentSlug
      const key = `${department.id}::${resolvedSlug}`
      const filtered = all.filter((d) =>
        (d.linkedTreatments || []).includes(key) ||
        (d.linkedTreatments || []).includes(`${department.id}::${treatmentSlug}`) ||
        d.specialty === department.name ||
        (Array.isArray(d.specialties) && d.specialties.includes(department.name))
      )
      setRelatedDoctors(filtered)
    }).catch(() => {})
  }, [department, treatmentSlug])

  if (loading) {
    return (
      <div className="section-padding container-max">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-slate-100 rounded-2xl" />
          <div className="h-6 bg-slate-100 rounded w-1/3" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-slate-100 rounded-2xl" />
            <div className="h-96 bg-slate-100 rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!department) return null

  const treatments = Array.isArray(department.treatments) ? department.treatments : []
  const treatment = treatments.find((t, i) =>
    (t.slug && t.slug === treatmentSlug) ||
    (t.id && t.id === treatmentSlug) ||
    String(i) === treatmentSlug ||
    (t.name && slugify(t.name) === treatmentSlug) ||
    (t.slug && treatmentSlug && (t.slug.includes(treatmentSlug) || treatmentSlug.includes(t.slug)))
  )

  if (!treatment) {
    return (
      <div className="section-padding container-max text-center py-24">
        <FiAlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="font-heading text-2xl font-bold text-navy-900 mb-6">Treatment Not Found</h2>
        <Link to={`/services/${slug}`} className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          Back to {department.name}
        </Link>
      </div>
    )
  }

  const hasImages = Array.isArray(treatment.images) && treatment.images.length > 0
  
  const defaultFaqs = [
    {
      question: `What is the expected recovery timeline for ${treatment.name}?`,
      answer: `Recovery for ${treatment.name} at Nova Max Hospital in Digha, Patna typically ranges between ${treatment.recovery || department.recoveryTime || '1 to 3 days'}. Most patients resume light normal activities within 24 to 48 hours.`
    },
    {
      question: `Is ${treatment.name} a daycare procedure or requires overnight admission?`,
      answer: `Many minimally invasive and laser procedures for ${treatment.name} are performed as same-day daycare surgeries allowing discharge within 6 to 24 hours depending on clinical evaluation.`
    },
    {
      question: `How do I book an OPD consultation for ${treatment.name} at Nova Max Hospital in Digha, Patna?`,
      answer: `You can schedule an appointment online via our website booking portal or call our direct hospital helpline at ${siteData.contact.phone} / ${siteData.contact.phone2} for instant confirmation.`
    }
  ]

  const faqsList = (Array.isArray(treatment.faqs) && treatment.faqs.length > 0) ? treatment.faqs : defaultFaqs

  const keywordsList = treatment.keywords || [
    treatment.name,
    `${treatment.name} in Digha Patna`,
    department.name,
    'Minimally Invasive Surgery Patna',
    'Laser Surgery Digha',
    'Nova Max Hospital Digha Patna'
  ]

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: treatment.name,
    description: treatment.description || treatment.longDescription,
    procedureType: treatment.procedureType || 'Surgical & Clinical Intervention',
    relevantSpecialty: {
      '@type': 'MedicalSpecialty',
      name: department.name
    },
    howPerformed: treatment.longDescription || '',
    preparation: Array.isArray(treatment.preparation) ? treatment.preparation.join('. ') : '',
    hospitalAffiliation: {
      '@type': 'Hospital',
      name: siteData.name,
      address: siteData.address
    }
  }

  return (
    <div className="bg-slate-50/50 min-h-screen font-sans text-slate-800">
      <SEO
        title={`${treatment.name} at Nova Max Hospital, Digha, Patna - ${department.name}`}
        description={`${treatment.name} at Nova Max Hospital in Digha, Patna. Advanced laser & laparoscopic procedure, expert board-certified doctors, and rapid daycare recovery.`}
        keywords={keywordsList}
        jsonLd={[schemaJsonLd]}
      />

      {/* Eye-Catching Emergency Helpline Banner */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-navy-900 text-white py-2.5 px-4 text-xs md:text-sm font-medium shadow-sm">
        <div className="container-max flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span><strong>Nova Max Hospital in Digha, Patna</strong> — Emergency Surgery Helpline &amp; Daycare OPD</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${siteData.contact.phone}`} className="hover:underline flex items-center gap-1 font-bold">
              📞 {siteData.contact.phone}
            </a>
            <a href={`https://wa.me/${siteData.contact.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-md text-xs font-bold transition-colors">
              💬 WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section — Eye-Catching Header */}
      <section className="bg-gradient-to-b from-primary-50/80 via-slate-50 to-white border-b border-slate-200/80 pt-10 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container-max relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs md:text-sm mb-4 flex-wrap text-slate-500 font-medium">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link to="/hospital-departments" className="hover:text-primary-600 transition-colors">Departments</Link>
            <span className="text-slate-300">/</span>
            <Link to={`/services/${slug}`} className="hover:text-primary-600 transition-colors">{department.name}</Link>
            <span className="text-slate-300">/</span>
            <span className="text-primary-700 font-bold">{treatment.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="bg-primary-100 text-primary-800 border border-primary-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <FiShield className="w-3.5 h-3.5 text-primary-600" />
              Nova Max Hospital, Digha, Patna
            </span>
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              {department.name} Specialization
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-navy-900 mb-3 tracking-tight max-w-4xl leading-tight">
            {treatment.name} <span className="block text-primary-600 text-lg sm:text-2xl font-extrabold mt-1">at Nova Max Hospital in Digha, Patna</span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-3xl leading-relaxed mb-6 font-normal">
            {treatment.description || `${treatment.name} is performed with cutting-edge medical technology and expert surgical precision at Nova Max Hospital in Digha, Patna.`}
          </p>

          {/* Keyword Badge Tag Cloud */}
          <div className="flex flex-wrap gap-2 mb-8">
            {keywordsList.map((tag, idx) => (
              <span key={idx} className="bg-white text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs hover:border-primary-300 transition-all">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>

          {/* Quick Specifications Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
            <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-2xs">
              <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5 text-primary-600" /> Duration
              </p>
              <p className="text-navy-900 font-bold text-base md:text-lg">{treatment.duration || '30 – 60 mins'}</p>
            </div>

            <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-2xs">
              <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FiActivity className="w-3.5 h-3.5 text-emerald-600" /> Recovery
              </p>
              <p className="text-navy-900 font-bold text-base md:text-lg">{treatment.recovery || department.recoveryTime || '1 – 3 Days'}</p>
            </div>

            <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-2xs">
              <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FiCpu className="w-3.5 h-3.5 text-amber-600" /> Procedure Type
              </p>
              <p className="text-navy-900 font-bold text-base md:text-lg">{treatment.procedureType || 'Minimally Invasive'}</p>
            </div>

            <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-2xs">
              <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FiCalendar className="w-3.5 h-3.5 text-primary-600" /> OPD Availability
              </p>
              <p className="text-navy-900 font-bold text-base md:text-lg">Daily Appointments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">

            {/* Left Main Column */}
            <div className="lg:col-span-2 space-y-10">

              {/* Long Description Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="flex items-center gap-3 text-xl md:text-2xl font-heading font-bold text-navy-900 pb-3 border-b border-slate-100">
                  <FiInfo className="text-primary-600 w-6 h-6 shrink-0" />
                  Comprehensive Procedure Overview
                </h2>

                <div className="text-slate-700 text-base md:text-lg leading-relaxed space-y-4 font-normal">
                  {(treatment.longDescription || treatment.description) ? (
                    (treatment.longDescription || treatment.description).split(/\r?\n|\\n/).filter(p => p.trim()).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))
                  ) : (
                    <p>
                      At <strong className="text-navy-900">{siteData.name} in Digha, Patna</strong>, our <strong className="text-navy-900">{department.name}</strong> team offers state-of-the-art diagnostic and surgical solutions for <strong className="text-navy-900">{treatment.name}</strong>. Our board-certified specialists employ advanced endoscopic, laparoscopic, and laser techniques to deliver high precision, minimal blood loss, and swift recovery for every patient.
                    </p>
                  )}
                </div>
              </div>

              {/* Bulleted Indications & Symptoms */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <FiActivity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-heading font-bold text-navy-900">
                      When Is {treatment.name} Recommended?
                    </h2>
                    <p className="text-xs text-slate-500">Key clinical indications & symptoms treated</p>
                  </div>
                </div>

                {Array.isArray(treatment.indications) && treatment.indications.length > 0 ? (
                  <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-3.5">
                    {treatment.indications.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                        <FiCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-slate-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-3.5">
                    <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <FiCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-800">Persistent or severe symptomatic discomfort</span>
                    </li>
                    <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <FiCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-800">Inability to manage condition with conservative medication</span>
                    </li>
                    <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <FiCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-800">Diagnostic scan confirmation requiring surgical intervention</span>
                    </li>
                    <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <FiCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-800">Prevention of chronic organ or tissue complications</span>
                    </li>
                  </ul>
                )}
              </div>

              {/* Key Surgical Benefits & Advantages (Bulleted Cards) */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-heading font-bold text-navy-900">
                      Key Benefits & Advantages
                    </h2>
                    <p className="text-xs text-slate-500">Why choose Nova Max Hospital for this procedure</p>
                  </div>
                </div>

                {Array.isArray(treatment.benefits) && treatment.benefits.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {treatment.benefits.map((b, i) => (
                      <div key={i} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                        <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{b}</h4>
                          <p className="text-xs text-slate-600 mt-0.5">Ensures high safety margins and optimal clinical outcome.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Minimally Invasive / Scarless</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Minimal incision size for reduced trauma and faster healing.</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Short Hospital Stay</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Same-day daycare discharge or 1-2 day monitoring.</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Negligible Blood Loss & Pain</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Advanced laparoscopic and laser precision techniques.</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">High Success & Low Recurrence</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Executed by senior surgical specialists with proven outcomes.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step-by-Step Procedure Process Timeline */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-navy-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <FiFileText className="w-6 h-6 text-primary-600" />
                  Step-by-Step Treatment Journey
                </h2>
                <div className="relative border-l-2 border-primary-200 ml-4 space-y-8 py-2">
                  {(treatment.steps || DEFAULT_PROCESS_STEPS).map(({ step, title, desc }, i) => (
                    <div key={step || i} className="relative pl-8">
                      <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary-600 border-4 border-white flex items-center justify-center text-xs font-bold text-white shadow-md">
                        {step || `0${i + 1}`}
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h3 className="font-bold text-navy-900 text-base mb-1">{title}</h3>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Preparation & Post-Op Guidelines (Side-by-side Bullet Cards) */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="font-bold text-navy-900 text-base flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-primary-500" />
                    Pre-Op Preparation Checklist
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {(Array.isArray(treatment.preparation) && treatment.preparation.length > 0 ? treatment.preparation : [
                      'Fast for 6 to 8 hours prior to procedure (if advised)',
                      'Complete pre-anesthetic diagnostic blood & imaging tests',
                      'Inform your specialist about current medications & allergies',
                      'Wear loose, comfortable clothing and bring valid ID'
                    ]).map((prep, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FiCheck className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="font-bold text-navy-900 text-base flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Post-Op Care & Recovery
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Follow prescribed medication schedule diligently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Avoid heavy lifting or strenuous exercise for 1–2 weeks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Maintain good hydration and clean wound dressing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Attend scheduled follow-up consultation with your surgeon</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Image Gallery */}
              {hasImages && (
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="flex items-center gap-3 text-xl font-heading font-bold text-navy-900 pb-3 border-b border-slate-100">
                    <FiImage className="text-primary-600 w-5 h-5" /> Clinical & Procedure Facility Gallery
                  </h2>
                  <div
                    className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 cursor-zoom-in border border-slate-200"
                    onClick={() => setLightbox(treatment.images[activeImg])}
                  >
                    <img
                      src={treatment.images[activeImg]}
                      alt={`${treatment.name} preview`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {treatment.images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar pt-2">
                      {treatment.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all border-2 ${
                            i === activeImg ? 'border-primary-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* FAQs */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="flex items-center gap-3 text-xl md:text-2xl font-heading font-bold text-navy-900 pb-3 border-b border-slate-100">
                  <FiHelpCircle className="text-primary-600 w-6 h-6" /> Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqsList.map((faq, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-100/60 transition-colors"
                      >
                        <span className={`font-semibold text-sm md:text-base ${openFaq === i ? 'text-primary-600' : 'text-navy-900'}`}>
                          {faq.question}
                        </span>
                        <FiChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary-500' : 'text-slate-400'}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-slate-200/60 bg-white">
                              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Ads Compliant Medical Disclaimer */}
              <MedicalDisclaimer />

            </div>

            {/* Right Sidebar — Doctor & Booking Section */}
            <div id="book-specialist" className="space-y-6 lg:sticky lg:top-24 self-start scroll-mt-24">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-xl text-navy-900 mb-1">
                    Attending Surgeons & Specialists
                  </h3>
                  <p className="text-xs text-slate-500">
                    Experienced doctors who specialize in {treatment.name} at Nova Max Hospital.
                  </p>
                </div>

                {relatedDoctors.length > 0 ? (
                  <div className="space-y-5">
                    {relatedDoctors.map((doc) => (
                      <div key={doc.id} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group hover:border-primary-300 transition-all">
                        {/* Doctor Photo Header */}
                        <div className="w-full aspect-[4/3] bg-slate-200 relative overflow-hidden flex items-center justify-center border-b border-slate-200">
                          {doc.image ? (
                            <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-navy-900 text-white">
                              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-md">
                                <span className="font-bold text-white text-2xl">{getInitials(doc.name)}</span>
                              </div>
                            </div>
                          )}
                          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            OPD Available Today
                          </span>
                        </div>

                        {/* Doctor Content */}
                        <div className="p-4 space-y-3">
                          <div>
                            <Link to={`/doctors/${doc.slug || doc.id}`} className="font-heading font-bold text-navy-900 text-base hover:text-primary-600 transition-colors block">
                              {doc.name}
                            </Link>
                            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{doc.qualification}</p>
                          </div>

                          {/* Surgical Specialties & Expertise Pills */}
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] font-bold bg-primary-50 text-primary-700 border border-primary-200 px-2 py-0.5 rounded">
                              {doc.specialty}
                            </span>
                            {doc.experience && (
                              <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
                                {doc.experience}+ Yrs Exp
                              </span>
                            )}
                          </div>

                          {/* Quick Surgeries list snippet */}
                          <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80">
                            <strong className="text-navy-900 font-semibold block mb-1">Key Surgeries & Procedures:</strong>
                            <ul className="space-y-1">
                              <li className="flex items-center gap-1.5">
                                <FiCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span>{treatment.name}</span>
                              </li>
                              <li className="flex items-center gap-1.5">
                                <FiCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span>Minimally Invasive & Laser Care</span>
                              </li>
                            </ul>
                          </div>

                          {/* CTAs */}
                          <div className="pt-1 space-y-2">
                            <Link
                              to={`/book-appointment?dept=${encodeURIComponent(department.name)}&treatment=${encodeURIComponent(treatment.name)}&doctor=${encodeURIComponent(doc.name)}`}
                              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-primary-700 transition-colors shadow-xs"
                            >
                              <FiCalendar className="w-3.5 h-3.5" /> Book OPD Appointment
                            </Link>
                            
                            <a
                              href={`https://wa.me/${(doc.phone || siteData.contact.phone).replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-1.5 text-center py-2 border border-emerald-500 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-lg hover:bg-emerald-100 transition-colors"
                            >
                              💬 WhatsApp Consultation
                            </a>

                            <Link
                              to={`/doctors/${doc.slug || doc.id}`}
                              className="w-full flex items-center justify-center gap-1 text-center py-1.5 text-slate-600 hover:text-primary-600 font-semibold text-xs transition-colors"
                            >
                              View Doctor Profile &amp; Surgeries <FiChevronRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-200">
                    <FiUser className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Board-certified hospital specialists are available for consultation.</p>
                  </div>
                )}

                {/* Emergency Contact & Call Action */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-center">
                    <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                      Need Instant Help / Consultation?
                    </p>
                    <a
                      href={`tel:${siteData.contact.phone}`}
                      className="inline-flex items-center justify-center gap-2 text-emerald-700 font-extrabold text-sm hover:underline"
                    >
                      <FiPhone className="w-4 h-4 text-emerald-600" />
                      {siteData.contact.phone}
                    </a>
                  </div>

                  <Link
                    to={`/book-appointment?dept=${encodeURIComponent(department.name)}&treatment=${encodeURIComponent(treatment.name)}`}
                    className="w-full flex items-center justify-center gap-2 bg-navy-900 text-white font-bold text-xs py-3 rounded-lg hover:bg-navy-800 transition-colors"
                  >
                    <FiCalendar className="w-3.5 h-3.5" /> Direct Hospital Booking
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close image lightbox"
            >
              <FiX size={28} />
            </button>
            <img
              src={lightbox}
              alt="Full size"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
