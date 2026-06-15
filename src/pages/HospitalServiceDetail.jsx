// ─────────────────────────────────────────────────────────────
// pages/HospitalServiceDetail.jsx
// Detailed page for a specific hospital service / facility.
// Route: /hospital-services/:slug
// ─────────────────────────────────────────────────────────────

import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft, FiClock, FiCalendar, FiPhone, FiAlertCircle, FiCheck, FiChevronRight
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { getHospitalServices } from '../services/hospitalServices'
import { getDepartments } from '../services/categories'
import { siteData } from '../data/siteData'

const CATEGORY_CONFIG = {
  'Consultation':   { emoji: '🩺', light: 'bg-primary-50',  text: 'text-primary-750',  border: 'border-primary-200'  },
  'Therapy':        { emoji: '🌿', light: 'bg-emerald-50',  text: 'text-emerald-700',  border: 'border-emerald-200'  },
  'Wellness':       { emoji: '🌱', light: 'bg-green-50',    text: 'text-green-700',    border: 'border-green-200'    },
  'Pharmacy':       { emoji: '💊', light: 'bg-green-50',    text: 'text-green-700',    border: 'border-green-200'    },
  'Support':        { emoji: '🤝', light: 'bg-amber-50',    text: 'text-amber-700',    border: 'border-amber-200'    },
  'Emergency':      { emoji: '🚨', light: 'bg-red-50',      text: 'text-red-750',      border: 'border-red-200'      },
  'Infrastructure': { emoji: '🏥', light: 'bg-indigo-50',   text: 'text-indigo-700',   border: 'border-indigo-200'   },
  'Department':     { emoji: '🏢', light: 'bg-cyan-50',     text: 'text-cyan-700',     border: 'border-cyan-200'     },
  'Diagnostic':     { emoji: '🔬', light: 'bg-teal-50',     text: 'text-teal-700',     border: 'border-teal-200'     },
}
const DEFAULT_CFG = { emoji: '🏥', light: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }

const AVAIL_COLOR = {
  '24 × 7':         'bg-green-100 text-green-800 border border-green-200',
  'OPD Hours':      'bg-primary-100 text-primary-700 border border-primary-200',
  'By Appointment': 'bg-gray-100 text-gray-700 border border-gray-200',
}

export default function HospitalServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    Promise.all([getHospitalServices(), getDepartments()])
      .then(([svcs, specs]) => {
        const found = svcs.find((s) => s.slug === slug || s.id === slug)
        setService(found || null)
        setDepartments(specs)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  // Build a slug-lookup map for related departments
  const slugMap = useMemo(() => {
    const map = {}
    departments.forEach((s) => { if (s.name && s.slug) map[s.name] = s.slug })
    return map
  }, [departments])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <FiAlertCircle size={40} className="text-gray-400" />
        <p className="text-gray-500 text-xl font-medium">Service not found.</p>
        <Link to="/facilities-diagnostics" className="btn-primary">Back to Facilities</Link>
      </div>
    )
  }

  const cfg = CATEGORY_CONFIG[service.category] || DEFAULT_CFG

  return (
    <>
      <SEO
        title={`${service.name} - Services & Facilities`}
        description={service.description || `Explore details about ${service.name} at ${siteData.name}.`}
        keywords={[`${service.name} Patna`, 'hospital services Patna', 'medical facilities Patna']}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-3 px-4">
        <div className="container-max flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/facilities-diagnostics" className="hover:text-primary-600">Facilities & Diagnostics</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{service.name}</span>
        </div>
      </div>

      <section className="section-padding bg-slate-50/40">
        <div className="container-max max-w-5xl">
          {/* Back button */}
          <Link to="/facilities-diagnostics" className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold mb-8 hover:gap-3 transition-all">
            <FiArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-8 bg-white rounded-[5px] border border-gray-100 shadow-sm p-6 sm:p-8"
            >
              {/* Category Badge & Availability */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {service.category && (
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${cfg.light} ${cfg.text} border ${cfg.border}`}>
                    {cfg.emoji} {service.category}
                  </span>
                )}
                {service.available && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${AVAIL_COLOR[service.available] || 'bg-gray-100 text-gray-650'}`}>
                    {service.available}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading font-black text-navy-800 text-3xl sm:text-4xl leading-tight mb-6">
                {service.name}
              </h1>

              {/* Icon Box */}
              <div className="w-20 h-20 bg-slate-50 border border-gray-100 rounded-[5px] flex items-center justify-center text-4xl mb-8 shadow-sm">
                {service.icon || '🏥'}
              </div>

              {/* Main Description */}
              <div className="prose max-w-none text-gray-650 leading-relaxed space-y-4 mb-8">
                <p className="text-base sm:text-lg text-gray-700 font-semibold">
                  {service.description || 'Dedicated hospital facility and medical service designed to support your treatment and ensure clinical safety.'}
                </p>
                <p className="text-sm">
                  At {siteData.name}, our facilities are equipped to offer highly reliable clinical outcomes. Under the medical guidance of our panel of senior specialists, we maintain stringent protocols for patient hygiene, comfort, and care.
                </p>
              </div>

              {/* Related Departments */}
              {Array.isArray(service.relatedSpecialties) && service.relatedSpecialties.length > 0 && (
                <div className="border-t border-gray-100 pt-6 mt-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-navy-800 mb-4">
                    Related Departments &amp; Departments
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.relatedSpecialties.map((name) => {
                      const slug = slugMap[name]
                      return (
                        <div key={name} className="flex items-center justify-between p-3.5 rounded-[5px] bg-slate-50/50 border border-gray-100 hover:bg-slate-50 transition-colors">
                          <span className="text-xs font-bold text-navy-800">{name}</span>
                          {slug && (
                            <Link
                              to={`/services/${slug}`}
                              className="text-xs font-bold text-primary-600 hover:text-primary-750 flex items-center gap-1"
                            >
                              <span>View specialty</span>
                              <FiChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Quick Actions / Booking */}
              <div className="card p-6 bg-white border border-gray-100 shadow-sm text-center">
                <h3 className="font-heading font-bold text-lg text-navy-800 mb-2">Need OPD Assistance?</h3>
                <p className="text-xs text-gray-500 mb-5">
                  Reach out to confirm time slots, consultation charges, and specific requirements for this facility.
                </p>
                <div className="space-y-2.5">
                  <Link
                    to={`/book-appointment?dept=${encodeURIComponent(service.category === 'Consultation' ? 'OPD Consultation' : '')}`}
                    className="w-full text-center py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-[5px] text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <FiCalendar className="w-3.5 h-3.5" /> Book Appointment
                  </Link>
                  <a
                    href={`tel:${siteData.contact.phone}`}
                    className="w-full text-center py-3 border border-primary-600 text-primary-600 hover:bg-primary-50 font-bold rounded-[5px] text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <FiPhone className="w-3.5 h-3.5" /> Contact Clinic
                  </a>
                </div>
              </div>

              {/* General Policy / Info */}
              <div className="card p-6 bg-navy-800 text-white shadow-md">
                <h4 className="font-bold text-sm uppercase tracking-wider text-cyan-300 mb-3 flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4" /> Patient Guidelines
                </h4>
                <ul className="text-xs space-y-2.5 text-primary-100">
                  <li className="flex items-start gap-2">
                    <FiCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Prior appointment booking is highly recommended to avoid long waiting times.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Emergency services run 24x7. For major operations or ICU, please present patient reports.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>OPD Consultation remains closed on Sundays. Emergency admissions run round-the-clock.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
