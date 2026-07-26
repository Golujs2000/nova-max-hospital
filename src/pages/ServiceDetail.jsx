import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft, FiClock, FiCalendar, FiCheck, FiActivity,
  FiUser, FiArrowRight, FiMapPin, FiInfo, FiChevronRight,
  FiHeart, FiShield, FiHelpCircle, FiChevronDown
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { getCategoryItemBySlug as getDepartmentBySlug } from '../services/categories'
import { useDoctors } from '../hooks/useDoctors'
import { getInitials } from '../utils/helpers'
import { siteData } from '../data/siteData'

const getDepartmentTheme = (slug) => {
  const themes = {
    'cardiology': {
      bg: 'bg-red-50/50',
      tagline: 'text-red-650',
      iconColor: 'text-red-600',
      btn: 'bg-red-700 hover:bg-red-800 focus:ring-red-550 text-white',
      border: 'border-red-200',
      gradientTo: 'to-red-50/20'
    },
    'pulmonology': {
      bg: 'bg-blue-50/50',
      tagline: 'text-blue-600',
      iconColor: 'text-blue-600',
      btn: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-550 text-white',
      border: 'border-blue-200',
      gradientTo: 'to-blue-50/20'
    },
    'gastroenterology': {
      bg: 'bg-emerald-50/50',
      tagline: 'text-emerald-600',
      iconColor: 'text-emerald-600',
      btn: 'bg-emerald-700 hover:bg-emerald-800 focus:ring-emerald-550 text-white',
      border: 'border-emerald-200',
      gradientTo: 'to-emerald-50/20'
    },
    'orthopedics': {
      bg: 'bg-amber-50/50',
      tagline: 'text-amber-600',
      iconColor: 'text-amber-600',
      btn: 'bg-amber-700 hover:bg-amber-800 focus:ring-amber-550 text-white',
      border: 'border-amber-200',
      gradientTo: 'to-amber-50/20'
    },
    'neurology': {
      bg: 'bg-indigo-50/50',
      tagline: 'text-indigo-600',
      iconColor: 'text-indigo-600',
      btn: 'bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-550 text-white',
      border: 'border-indigo-200',
      gradientTo: 'to-indigo-50/20'
    },
    'nephrology': {
      bg: 'bg-cyan-50/50',
      tagline: 'text-cyan-600',
      iconColor: 'text-cyan-600',
      btn: 'bg-cyan-700 hover:bg-cyan-800 focus:ring-cyan-550 text-white',
      border: 'border-cyan-200',
      gradientTo: 'to-cyan-50/20'
    },
    'critical-care': {
      bg: 'bg-rose-50/50',
      tagline: 'text-rose-600',
      iconColor: 'text-rose-600',
      btn: 'bg-rose-700 hover:bg-rose-800 focus:ring-rose-550 text-white',
      border: 'border-rose-200',
      gradientTo: 'to-rose-50/20'
    },
    'pediatrics': {
      bg: 'bg-teal-50/50',
      tagline: 'text-teal-600',
      iconColor: 'text-teal-600',
      btn: 'bg-teal-700 hover:bg-teal-800 focus:ring-teal-550 text-white',
      border: 'border-teal-200',
      gradientTo: 'to-teal-50/20'
    }
  };

  return themes[slug] || {
    bg: 'bg-primary-50/40',
    tagline: 'text-primary-600',
    iconColor: 'text-primary-600',
    btn: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-550 text-white',
    border: 'border-primary-200',
    gradientTo: 'to-primary-50/10'
  };
};

const getSpecialistLabel = (name = '') => {
  const lower = name.toLowerCase();
  if (lower.includes('cardio')) return 'Cardiologists';
  if (lower.includes('neuro')) return 'Neurologists';
  if (lower.includes('pediat')) return 'Pediatricians';
  if (lower.includes('ortho')) return 'Orthopedicians';
  if (lower.includes('gastro')) return 'Gastroenterologists';
  if (lower.includes('gyne') || lower.includes('obstet')) return 'Gynecologists';
  if (lower.includes('ophthal') || lower.includes('eye')) return 'Ophthalmologists';
  if (lower.includes('dent') || lower.includes('tooth')) return 'Dentists';
  if (lower.includes('surg')) return 'Surgeons';
  return 'Specialists';
};

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [department, setDepartment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)
  const { doctors } = useDoctors()

  useEffect(() => {
    setLoading(true)
    getDepartmentBySlug(slug)
      .then((data) => {
        if (!data) navigate('/hospital-departments', { replace: true })
        else setDepartment(data)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="section-padding container-max">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-slate-100 rounded-2xl" />
          <div className="h-6 bg-slate-100 rounded w-1/3" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-slate-100 rounded-2xl" />)}
            </div>
            <div className="h-96 bg-slate-100 rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!department) return null

  const treatments = Array.isArray(department.treatments) ? department.treatments : []
  const features = Array.isArray(department.features) ? department.features : []
  const byId = doctors.filter((d) => (department.doctorIds || []).includes(d.id))
  const byName = doctors.filter((d) =>
    d.specialty === department.name ||
    (Array.isArray(d.specialties) && d.specialties.includes(department.name))
  )
  const relatedDoctors = [...new Map([...byId, ...byName].map((d) => [d.id, d])).values()]

  const theme = getDepartmentTheme(department.slug || slug)

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <SEO
        title={`${department.name} - ${siteData.name}`}
        description={`${department.description} Recovery: ${department.recoveryTime || 'Varies'}.`}
        keywords={[department.name, `${department.name} Patna`, `${department.name} hospital Bihar`, ...(department.features || [])]}
      />

      {/* Eye-Catching Emergency Helpline Banner */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-navy-900 text-white py-2.5 px-4 text-xs md:text-sm font-medium shadow-sm">
        <div className="container-max flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span><strong>Nova Max Hospital in Digha, Patna</strong> — 24/7 Surgical &amp; OPD Emergency Care</span>
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

      {/* Hero Section — Eye-Catching Light Header */}
      <section className="relative border-b border-gray-200 py-12 md:py-16 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-primary-50/80 via-slate-50 to-white min-h-[460px] flex items-center">
        {/* Background Image on Right with Fade Overlay */}
        {department.heroImage ? (
          <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[50%] z-0 hidden lg:block">
            <img 
              src={department.heroImage} 
              alt={`${department.name} at Nova Max Hospital in Digha, Patna`} 
              className="w-full h-full object-cover animate-pulse-slow animate-float opacity-90" 
            />
            {/* Fade overlay from left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent z-10" />
          </div>
        ) : (
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-100/30 to-transparent z-0 hidden lg:block" />
        )}

        <div className="container-max relative z-20 w-full">
          <Link to="/hospital-departments" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 text-xs md:text-sm font-bold mb-4 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> All Departments — Nova Max Hospital
          </Link>
          
          <div className={`w-full ${department.heroImage ? 'lg:max-w-[55%] xl:max-w-[60%]' : 'max-w-4xl'}`}>
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 border border-primary-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <FiShield className="w-3.5 h-3.5 text-primary-600" /> Nova Max Hospital in Digha, Patna
            </div>

            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-black text-navy-900 mb-4 leading-tight tracking-tight">
              {department.name} <span className="block text-primary-600 text-xl md:text-3xl font-extrabold mt-1">at Nova Max Hospital, Digha, Patna</span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed font-normal mb-6">
              {department.description || `State-of-the-art diagnostic, surgical, and therapeutic medical solutions at Nova Max Hospital in Digha, Patna.`}
            </p>

            {/* Mobile Hero Image */}
            {department.heroImage && (
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 block lg:hidden shadow-sm border border-gray-150">
                <img 
                  src={department.heroImage} 
                  alt={`${department.name} at Nova Max Hospital`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}

            {/* Feature Row Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-t border-b border-slate-200 my-6">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <FiActivity className="w-5 h-5 mb-1 text-primary-600" />
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">4K Laparoscopy &amp; Laser</span>
                <span className="text-xs font-black text-navy-900">Modern OT Tech</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <FiUser className="w-5 h-5 mb-1 text-primary-600" />
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Board Certified</span>
                <span className="text-xs font-black text-navy-900">{getSpecialistLabel(department.name)}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <FiHeart className="w-5 h-5 mb-1 text-emerald-600" />
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Daycare Surgery</span>
                <span className="text-xs font-black text-navy-900">24h Discharge</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <FiShield className="w-5 h-5 mb-1 text-amber-600" />
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Google Ads Verified</span>
                <span className="text-xs font-black text-navy-900">Clinical Safety</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/book-appointment?dept=${encodeURIComponent(department.name)}`}
                className="inline-flex items-center gap-2 font-bold text-xs tracking-wider uppercase px-7 py-3.5 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700 text-white transition-all active:scale-95"
              >
                Book OPD Appointment <FiArrowRight className="w-4 h-4" />
              </Link>
              
              <a
                href={`https://wa.me/${siteData.contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-lg border border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all"
              >
                💬 WhatsApp Consultation
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-10 xl:gap-16">

            {/* Left — Main Content Area */}
            <div className="lg:col-span-2 space-y-12">

              {(department.longDescription || department.description) && (
                <div className="prose max-w-none">
                  <h2 className="flex items-center gap-3 text-2xl font-heading font-bold text-navy-900 mb-6 pb-2 border-b border-gray-100">
                    <FiInfo className="text-primary-500 w-6 h-6" /> Overview
                  </h2>
                  <div className="text-gray-700 text-lg leading-relaxed space-y-6 font-light">
                    {(department.longDescription || department.description).split(/\r?\n|\\n/).filter(p => p.trim()).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {features.length > 0 && (
                <div>
                  <h2 className="flex items-center gap-3 text-2xl font-heading font-bold text-navy-900 mb-6 pb-2 border-b border-gray-100">
                    <FiCheck className="text-primary-500 w-6 h-6" /> Key Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                        </div>
                        <span className="text-gray-700 text-base leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Treatments List */}
              {treatments.length > 0 && (
                <div>
                  <h2 className="flex items-center gap-3 text-2xl font-heading font-bold text-navy-900 mb-6 pb-2 border-b border-gray-100">
                    <FiActivity className="text-primary-500 w-6 h-6" /> Treatments & Procedures
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {treatments.map((t, i) => (
                      <Link
                        key={i}
                        to={`/services/${department.slug}/treatment/${t.slug || i}`}
                        className="group p-5 bg-white border border-gray-200 hover:border-primary-300 rounded-xl transition-all duration-200 hover:shadow-md"
                      >
                        <h3 className="font-semibold text-navy-900 text-base group-hover:text-primary-600 transition-colors pr-4">{t.name}</h3>
                        
                        <div className="flex items-center justify-between mt-3">
                          {t.duration ? (
                            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                              <FiClock className="w-3.5 h-3.5" /> {t.duration}
                            </span>
                          ) : <span />}
                          <span className="text-xs font-semibold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                            Details <FiChevronRight />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Department FAQs Accordion */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="flex items-center gap-3 text-2xl font-heading font-bold text-navy-900 mb-6 pb-2 border-b border-gray-100">
                  <FiHelpCircle className="text-primary-600 w-6 h-6" /> Frequently Asked Questions ({department.name})
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      question: `What OPD consultation hours and emergency care are available for ${department.name} at Nova Max Hospital in Digha, Patna?`,
                      answer: `Our ${department.name} department operates regular daily OPD hours for consultations while 24x7 emergency medical and surgical admissions are active round-the-clock.`
                    },
                    {
                      question: `What diagnostic tests or preparations are required before visiting ${department.name}?`,
                      answer: `Please bring your complete past medical history, previous blood tests, ultrasound/CT scan reports, and prescription details. If surgery is planned, fast for 6 to 8 hours prior to pre-op workup.`
                    },
                    {
                      question: `Are cashless insurance services accepted for ${department.name} procedures?`,
                      answer: `Yes, Nova Max Hospital assists patients with cashless insurance claims, TPA approvals, and panel schemes for eligible medical and surgical procedures.`
                    }
                  ].map((faq, i) => (
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
                      {openFaq === i && (
                        <div className="px-5 pb-5 pt-1 border-t border-slate-200/60 bg-white">
                          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar — Specialists */}
            <div className="space-y-8 lg:sticky lg:top-24 self-start">
              <div className="bg-slate-50 rounded-2xl border border-gray-200 p-6">
                <h3 className="font-heading font-bold text-xl text-navy-900 mb-1">Attending Specialists</h3>
                <p className="text-xs text-gray-500 mb-5">Senior doctors specializing in {department.name} at Nova Max Hospital in Digha, Patna.</p>
                
                {relatedDoctors.length > 0 ? (
                  <div className="space-y-5">
                    {relatedDoctors.map((doc) => (
                      <div key={doc.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all group">
                        {/* Doctor Photo Card Header */}
                        <div className="w-full aspect-[4/3] bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-gray-150">
                          {doc.image ? (
                            <img src={doc.image} alt={`${doc.name} at Nova Max Hospital in Digha, Patna`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-navy-900 text-white">
                              <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center shadow">
                                <span className="font-bold text-white text-xl">{getInitials(doc.name)}</span>
                              </div>
                            </div>
                          )}
                          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            OPD Available Today
                          </span>
                        </div>

                        {/* Doctor Card Content */}
                        <div className="p-4 space-y-3">
                          <div>
                            <Link to={`/doctors/${doc.slug || doc.id}`} className="font-heading font-bold text-navy-900 text-base hover:text-primary-600 transition-colors block">
                              {doc.name}
                            </Link>
                            <p className="text-xs text-slate-500 mt-0.5 font-medium">{doc.qualification}</p>
                          </div>

                          {/* Specialties & Experience Tags */}
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

                          <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                            <strong className="text-navy-900 font-semibold block mb-0.5">Location &amp; Hospital:</strong>
                            <span className="text-slate-600">Nova Max Hospital, Digha, Patna</span>
                          </div>

                          {/* Action CTAs */}
                          <div className="pt-1 space-y-2">
                            <Link
                              to={`/book-appointment?dept=${encodeURIComponent(department.name)}&doctor=${encodeURIComponent(doc.name)}`}
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
                              View Full Doctor Profile <FiChevronRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-white rounded-xl border border-gray-200">
                    <FiUser className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Senior doctors available for consultation at Nova Max Hospital in Digha, Patna.</p>
                  </div>
                )}
                
                {/* Fallback general booking */}
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center mb-2.5">Need immediate consultation?</p>
                  <Link
                    to={`/book-appointment?dept=${encodeURIComponent(department.name)}&from=/services/${department.slug}`}
                    className="w-full flex items-center justify-center gap-2 bg-navy-900 text-white font-bold text-xs py-3 rounded-lg hover:bg-navy-800 transition-colors"
                  >
                    <FiCalendar className="w-3.5 h-3.5" /> General Department Booking
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
