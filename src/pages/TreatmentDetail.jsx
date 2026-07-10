import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowLeft, FiClock, FiCalendar, FiCheck,
  FiPhone, FiAlertCircle, FiActivity,
  FiImage, FiYoutube, FiHelpCircle,
  FiChevronDown, FiX, FiInfo, FiUser
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { getCategoryItemBySlug as getDepartmentBySlug } from '../services/categories'
import { getDoctors } from '../services/doctors'
import { getInitials } from '../utils/helpers'
import { siteData } from '../data/siteData'

function toEmbedUrl(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return `https://www.youtube.com/embed${u.pathname}`
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) return `https://www.youtube.com/embed/${u.searchParams.get('v')}`
    if (u.hostname.includes('youtube.com') && u.pathname.startsWith('/embed/')) return url
  } catch { /* ignore */ }
  return url
}

const PROCESS_STEPS = [
  { step: '01', title: 'Consultation', desc: 'Initial assessment and medical history review with our specialist.' },
  { step: '02', title: 'Diagnosis & Planning', desc: 'Diagnostic tests and a clear explanation of the procedure.' },
  { step: '03', title: 'Treatment', desc: 'Expert medical care following international safety protocols.' },
  { step: '04', title: 'Recovery', desc: 'Post-treatment monitoring and scheduled follow-up visits.' },
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
  const treatment = treatments.find((t, i) => (t.slug || String(i)) === treatmentSlug)

  if (!treatment) {
    return (
      <div className="section-padding container-max text-center py-24">
        <FiAlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="font-heading text-2xl font-bold text-navy-900 mb-6">Treatment not found</h2>
        <Link to={`/services/${slug}`} className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          Back to {department.name}
        </Link>
      </div>
    )
  }

  const hasImages = Array.isArray(treatment.images) && treatment.images.length > 0
  const hasFaqs = Array.isArray(treatment.faqs) && treatment.faqs.length > 0

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <SEO
        title={`${treatment.name} - ${department.name}`}
        description={`${treatment.name} at ${siteData.name}, Patna.`}
        keywords={[treatment.name, department.name, `${treatment.name} Patna`]}
      />

      {/* Hero Section — Clean & Minimalist */}
      <section className="bg-slate-50 border-b border-gray-200 pt-16 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="container-max relative z-10">
          <div className="flex items-center gap-3 text-sm mb-6 flex-wrap font-medium">
            <Link to="/hospital-departments" className="text-gray-500 hover:text-primary-600 transition-colors">Departments</Link>
            <span className="text-gray-300">/</span>
            <Link to={`/services/${slug}`} className="text-gray-500 hover:text-primary-600 transition-colors">{department.name}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-navy-900 font-semibold">{treatment.name}</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-navy-900 mb-6 tracking-tight max-w-4xl">
            {treatment.name}
          </h1>

          <div className="flex flex-wrap gap-4 lg:gap-8 items-end justify-between mt-6 pt-6 border-t border-gray-200/60">
            <div className="flex flex-wrap gap-4 lg:gap-8">
              {treatment.duration && (
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-navy-900 font-bold text-lg flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-primary-500" /> {treatment.duration}
                  </p>
                </div>
              )}
              {(treatment.recovery || department.recoveryTime) && (
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Recovery</p>
                  <p className="text-navy-900 font-bold text-lg flex items-center gap-2">
                    <FiActivity className="w-4 h-4 text-primary-500" /> {treatment.recovery || department.recoveryTime}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">OPD Consultation</p>
                <p className="text-navy-900 font-bold text-lg">Available Daily</p>
              </div>
            </div>

            <a 
              href="#book-specialist" 
              className="lg:hidden bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm transition-all duration-200"
            >
              <FiCalendar className="w-4 h-4" /> Book Appointment
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-10 xl:gap-16">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-14">

              {/* About */}
              <div className="prose max-w-none">
                <h2 className="flex items-center gap-3 text-2xl font-heading font-bold text-navy-900 mb-6 pb-2 border-b border-gray-100">
                  <FiInfo className="text-primary-500 w-6 h-6" /> About This Procedure
                </h2>
                <div className="text-gray-700 text-lg leading-relaxed space-y-6 font-light">
                  {treatment.description ? (
                    treatment.description.split('\\n').filter(p => p.trim()).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))
                  ) : (
                    <p><span className="font-semibold text-navy-900">{treatment.name}</span> is expertly performed at {siteData.name} under the specialized <Link to={`/services/${slug}`} className="text-primary-600 hover:underline">{department.name}</Link> department by our highly experienced medical team. We adhere to rigorous safety protocols to ensure optimal clinical outcomes and the highest standard of patient care.</p>
                  )}
                </div>
              </div>

              {/* Detailed Overview */}
              {treatment.longDescription && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-heading font-bold text-navy-900 mb-6 pb-2 border-b border-gray-100">
                    Detailed Overview
                  </h2>
                  <div className="text-gray-700 text-lg leading-relaxed space-y-6 font-light">
                    {treatment.longDescription.split('\\n').filter(p => p.trim()).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Indications */}
              {(Array.isArray(treatment.indications) && treatment.indications.length > 0) && (
                <div>
                  <h2 className="flex items-center gap-3 text-2xl font-heading font-bold text-navy-900 mb-6 pb-2 border-b border-gray-100">
                    <FiActivity className="text-primary-500 w-6 h-6" /> When Is This Needed?
                  </h2>
                  <ul className="space-y-4">
                    {treatment.indications.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500" />
                        <span className="text-gray-700 text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process Steps — Clean Timeline */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-navy-900 mb-8 pb-2 border-b border-gray-100">
                  What to Expect
                </h2>
                <div className="relative border-l-2 border-gray-200 ml-3 md:ml-4 space-y-8 py-2">
                  {(treatment.steps || PROCESS_STEPS).map(({ step, title, desc }, i) => (
                    <div key={step} className="relative pl-8 md:pl-10">
                      <div className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-white border-2 border-primary-500 flex items-center justify-center text-xs font-bold text-primary-600">
                        {parseInt(step, 10)}
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-900 text-lg mb-2">{title}</h3>
                        <p className="text-gray-600 text-base leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Gallery */}
              {hasImages && (
                <div>
                  <h2 className="flex items-center gap-3 text-2xl font-heading font-bold text-navy-900 mb-6 pb-2 border-b border-gray-100">
                    <FiImage className="text-primary-500 w-6 h-6" /> Procedure Gallery
                  </h2>
                  
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 cursor-zoom-in mb-4 border border-gray-200"
                       onClick={() => setLightbox(treatment.images[activeImg])}>
                    <img
                      src={treatment.images[activeImg]}
                      alt={`${treatment.name} preview`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  {treatment.images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
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
              {hasFaqs && (
                <div>
                  <h2 className="flex items-center gap-3 text-2xl font-heading font-bold text-navy-900 mb-6 pb-2 border-b border-gray-100">
                    <FiHelpCircle className="text-primary-500 w-6 h-6" /> Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {treatment.faqs.map((faq, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                        >
                          <span className={`font-semibold text-base ${openFaq === i ? 'text-primary-600' : 'text-navy-900'}`}>
                            {faq.question}
                          </span>
                          <FiChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary-500' : 'text-gray-400'}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                <p className="text-base text-gray-600 leading-relaxed font-light">
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
              )}
            </div>

            {/* Right Sidebar — Specialists */}
            <div id="book-specialist" className="space-y-8 lg:sticky lg:top-24 self-start scroll-mt-24">
              
              <div className="bg-slate-50 rounded-2xl border border-gray-200 p-6 md:p-8">
                <h3 className="font-heading font-bold text-xl text-navy-900 mb-2">Book This Procedure</h3>
                <p className="text-sm text-gray-600 mb-6">Select a specialist below to schedule your consultation.</p>
                
                {relatedDoctors.length > 0 ? (
                  <div className="space-y-6">
                    {relatedDoctors.map((doc) => (
                      <div key={doc.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                        {/* Large Image on top */}
                        <div className="w-full aspect-[4/3] bg-slate-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                          {doc.image ? (
                            <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-md">
                                <span className="font-bold text-white text-2xl">{getInitials(doc.name)}</span>
                              </div>
                            </div>
                          )}
                          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Available Today
                          </span>
                        </div>
                        
                        {/* Info below */}
                        <div className="p-5 space-y-4">
                          <div>
                            <Link to={`/doctors/${doc.slug || doc.id}`} className="font-heading font-black text-navy-800 text-lg hover:text-primary-600 transition-colors block">
                              {doc.name}
                            </Link>
                            <p className="text-xs text-gray-500 mt-1 font-semibold">{doc.qualification}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-cyan-50 border border-cyan-200 text-cyan-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {doc.specialty}
                            </span>
                            {doc.experience && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                {doc.experience}+ Yrs Exp
                              </span>
                            )}
                          </div>

                          {/* Direct Booking Button for this Doctor & Procedure */}
                          <div className="flex flex-col gap-2 pt-2">
                            <Link
                              to={`/book-appointment?dept=${encodeURIComponent(department.name)}&treatment=${encodeURIComponent(treatment.name)}&doctor=${encodeURIComponent(doc.name)}`}
                              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-bold text-xs py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                            >
                              <FiCalendar className="w-3.5 h-3.5" /> Book Appointment
                            </Link>
                            <Link
                              to={`/doctors/${doc.slug || doc.id}`}
                              className="w-full text-center py-2.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              View Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-white rounded-xl border border-gray-200 mb-6">
                    <FiUser className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No specialists explicitly assigned to this treatment.</p>
                  </div>
                )}
                
                {/* Fallback general booking */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center mb-3">Don't have a preference?</p>
                  <Link
                    to={`/book-appointment?dept=${encodeURIComponent(department.name)}&treatment=${encodeURIComponent(treatment.name)}`}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold text-sm py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    General Booking
                  </Link>
                </div>
              </div></div>

            </div>
          </div>
        </section>

      {/* Lightbox */}
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
