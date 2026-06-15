// ─────────────────────────────────────────────────────────────
// pages/Category.jsx
// Reusable template for separate department category pages
// e.g. Hospital Departments, Surgical Services, etc.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiChevronDown, FiCheck, FiClock, FiActivity,
  FiCalendar, FiAlertCircle, FiUser, FiUsers, FiArrowRight,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useCategories } from '../hooks/useCategories'
import { useDoctors } from '../hooks/useDoctors'

// ── Config ────────────────────────────────────────────────────────────────────
const CATEGORY_CONFIG = {
  'General':     { emoji: '🩺', bg: 'bg-primary-600',  light: 'bg-primary-50',  text: 'text-primary-700',  border: 'border-primary-200' },
  'Surgery':     { emoji: '🔬', bg: 'bg-primary-600',  light: 'bg-primary-50',  text: 'text-primary-700',  border: 'border-primary-200' },
  'Support':     { emoji: '🤝', bg: 'bg-amber-600',    light: 'bg-amber-50',    text: 'text-amber-700',    border: 'border-amber-200' },
  'Department':  { emoji: '🏥', bg: 'bg-primary-600',  light: 'bg-primary-50',  text: 'text-primary-700',  border: 'border-primary-200' },
}

const AVAIL_COLOR = {
  '24 × 7':         'bg-green-100 text-green-700',
  'OPD Hours':      'bg-blue-100 text-blue-700',
  'By Appointment': 'bg-gray-100 text-gray-600',
  'OPD & Emergency': 'bg-red-100 text-red-700'
}

// ── Treatment Row ─────────────────────────────────────────────────────────────
function TreatmentRow({ t, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.04 }}
      className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0"
    >
      <FiCheck size={13} className="text-green-500 shrink-0" />
      <span className="flex-1 text-sm text-gray-700">{t.name}</span>
      {t.duration && (
        <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
          <FiClock size={11} /> {t.duration}
        </span>
      )}
    </motion.div>
  )
}

// ── Department Card ───────────────────────────────────────────────────────────
function DepartmentCard({ spec, isOpen, onToggle, doctors = [] }) {
  const hasTreatments = Array.isArray(spec.treatments) && spec.treatments.length > 0
  const hasFeatures = Array.isArray(spec.features) && spec.features.length > 0
  const cfg = CATEGORY_CONFIG[spec.category] || CATEGORY_CONFIG['Department']

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl border ${isOpen ? cfg.border : 'border-gray-100'} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
    >
      {/* Card Header — always visible */}
      <button
        className="w-full text-left p-5 flex items-start gap-4"
        onClick={onToggle}
      >
        <div className={`w-12 h-12 rounded-xl ${cfg.bg} flex items-center justify-center text-2xl shrink-0 shadow-sm overflow-hidden`}>
          {spec.icon ? (
            (spec.icon.startsWith('http') || spec.icon.startsWith('/') || spec.icon.includes('.')) ? (
              <img src={spec.icon} alt="" className="w-full h-full object-contain p-1.5" />
            ) : (
              spec.icon
            )
          ) : (
            cfg.emoji
          )}
        </div>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-navy-800 text-base">{spec.name}</h3>
            {spec.available && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${AVAIL_COLOR[spec.available] || 'bg-gray-100 text-gray-500'}`}>
                {spec.available}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{spec.description}</p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
            {spec.recoveryTime && (
              <span className="flex items-center gap-1">
                <FiClock size={11} className="text-primary-400" /> {spec.recoveryTime}
              </span>
            )}
            {hasTreatments && (
              <span className="flex items-center gap-1 text-primary-500 font-medium">
                <FiActivity size={11} /> {spec.treatments.length} procedure{spec.treatments.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Chevron */}
        <FiChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-5 border-t ${cfg.border}`}>

              {/* Key features */}
              {hasFeatures && (
                <div className="pt-4 mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Highlights</p>
                  <div className="flex flex-wrap gap-2">
                    {spec.features.map((f) => (
                      <span key={f} className={`text-xs px-2.5 py-1 rounded-lg ${cfg.light} ${cfg.text} font-medium`}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Treatments table */}
              {hasTreatments && (
                <div className={`${hasFeatures ? '' : 'pt-4'}`}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Treatments & Procedures</p>
                  <div className={`rounded-xl border ${cfg.border} bg-white px-4 py-1`}>
                    {spec.treatments.map((t, i) => (
                      <TreatmentRow key={i} t={t} idx={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Doctors in this department */}
              {doctors.length > 0 && (
                <div className={`${hasTreatments || hasFeatures ? 'mt-4' : 'pt-4'}`}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <FiUsers size={11} /> Our Doctors
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {doctors.map((doc) => (
                      <Link
                        key={doc.id}
                        to={`/doctors/${doc.slug || doc.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-primary-50 border border-gray-100 hover:border-primary-200 transition-colors group"
                      >
                        {doc.image ? (
                          <img src={doc.image} alt={doc.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                            <FiUser size={14} className="text-primary-500" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-semibold text-navy-800 group-hover:text-primary-700 leading-tight">{doc.name}</p>
                          {doc.qualification && (
                            <p className="text-xs text-gray-400 leading-tight">{doc.qualification}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="mt-4 flex gap-2">
                <Link
                  to={`/services/${spec.slug || spec.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border ${cfg.border} ${cfg.text} text-sm font-semibold hover:${cfg.light} transition-colors`}
                >
                  Full Details <FiArrowRight size={13} />
                </Link>
                <Link
                  to="/book-appointment"
                  state={{ department: spec.name }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  <FiCalendar size={13} /> Book
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main Page Component ───────────────────────────────────────────────────────
export default function Category({ categoryName, categoryNames, title, description, keywords }) {
  const { categories: departments, loading } = useCategories()
  const { doctors } = useDoctors()
  const [openId, setOpenId] = useState(null)

  // Filter departments strictly by the categoryName or categoryNames
  const filtered = useMemo(() => {
    if (categoryNames && Array.isArray(categoryNames)) {
      return departments.filter((s) => categoryNames.includes(s.category))
    }
    return departments.filter((s) => s.category === categoryName)
  }, [departments, categoryName, categoryNames])

  const totalTreatments = filtered.reduce(
    (sum, s) => sum + (Array.isArray(s.treatments) ? s.treatments.length : 0), 0
  )

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
      />

      {/* Hero */}
      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {filtered.length > 0
              ? `${filtered.length} departments · ${totalTreatments}+ treatments — all under one roof in Patna`
              : description}
          </p>
        </motion.div>
      </section>

      {/* Departments Grid */}
      <section className="section-padding bg-gray-50 min-h-[50vh]">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <FiAlertCircle size={40} className="mb-3 opacity-40" />
              <p className="font-medium">No items found in {categoryName}</p>
              <p className="text-sm mt-1">Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((spec) => (
                <DepartmentCard
                  key={spec.id}
                  spec={spec}
                  isOpen={openId === spec.id}
                  onToggle={() => setOpenId(openId === spec.id ? null : spec.id)}
                  doctors={doctors.filter((d) =>
                    d.specialty === spec.name ||
                    (Array.isArray(d.specialties) && d.specialties.includes(spec.name))
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-center">
        <div className="container-max px-4">
          <h2 className="font-heading text-3xl font-bold text-white mb-3">
            Not Sure Which Department You Need?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Call our helpline and our team will guide you to the right specialist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-appointment" className="btn-accent">Book Appointment</Link>
            <Link to="/contact" className="btn-secondary border-white/40 text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
