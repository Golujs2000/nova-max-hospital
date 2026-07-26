import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiChevronDown, FiCheck, FiClock, FiActivity,
  FiCalendar, FiAlertCircle, FiUser, FiUsers, FiArrowRight, FiShield
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import MedicalDisclaimer from '../components/MedicalDisclaimer'
import { useCategories } from '../hooks/useCategories'
import { useDoctors } from '../hooks/useDoctors'
import { siteData } from '../data/siteData'

// ── Config ────────────────────────────────────────────────────────────────────
const CATEGORY_CONFIG = {
  'General':     { emoji: '🩺', bg: 'bg-primary-600',  light: 'bg-primary-50',  text: 'text-primary-700',  border: 'border-primary-200' },
  'Surgery':     { emoji: '🔬', bg: 'bg-primary-600',  light: 'bg-primary-50',  text: 'text-primary-700',  border: 'border-primary-200' },
  'Support':     { emoji: '🤝', bg: 'bg-amber-600',    light: 'bg-amber-50',    text: 'text-amber-700',    border: 'border-amber-200' },
  'Department':  { emoji: '🏥', bg: 'bg-primary-600',  light: 'bg-primary-50',  text: 'text-primary-700',  border: 'border-primary-200' },
}

const AVAIL_COLOR = {
  '24 × 7':         'bg-emerald-100 text-emerald-800',
  'OPD Hours':      'bg-blue-100 text-blue-800',
  'By Appointment': 'bg-slate-100 text-slate-700',
  'OPD & Emergency': 'bg-red-100 text-red-800'
}

// ── Treatment Row ─────────────────────────────────────────────────────────────
function TreatmentRow({ t, idx, deptSlug }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.03 }}
      className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0"
    >
      <FiCheck size={14} className="text-emerald-500 shrink-0" />
      <span className="flex-1 text-xs md:text-sm font-medium text-slate-800">{t.name}</span>
      {t.duration && (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 shrink-0">
          <FiClock size={11} className="text-primary-500" /> {t.duration}
        </span>
      )}
      <Link
        to={`/services/${deptSlug}/treatment/${t.slug}`}
        onClick={(e) => e.stopPropagation()}
        aria-label={`View details for ${t.name}`}
        className="text-[11px] font-bold text-primary-600 hover:text-primary-700 flex items-center gap-0.5 ml-2 shrink-0"
      >
        View <FiArrowRight size={10} />
      </Link>
    </motion.div>
  )
}

// ── Department Card ───────────────────────────────────────────────────────────
function DepartmentCard({ spec, isOpen, onToggle, doctors = [] }) {
  const hasTreatments = Array.isArray(spec.treatments) && spec.treatments.length > 0
  const hasFeatures = Array.isArray(spec.features) && spec.features.length > 0
  const cfg = CATEGORY_CONFIG[spec.category] || CATEGORY_CONFIG['Department']

  const keywords = spec.keywords || [
    spec.name,
    `${spec.name} Surgery Patna`,
    'Minimally Invasive Care',
    'Laser Treatment'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl border ${isOpen ? cfg.border : 'border-slate-200'} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
    >
      {/* Card Header — clickable toggle */}
      <button
        className="w-full text-left p-5 flex items-start gap-4"
        onClick={onToggle}
        aria-label={`Toggle details for ${spec.name}`}
      >
        <div className={`w-12 h-12 rounded-xl ${cfg.bg} flex items-center justify-center text-2xl shrink-0 shadow-sm overflow-hidden text-white`}>
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

        {/* Title & Description Block */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-heading font-bold text-navy-900 text-lg block">{spec.name}</span>
            {spec.available && (
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${AVAIL_COLOR[spec.available] || 'bg-slate-100 text-slate-600'}`}>
                {spec.available}
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-slate-600 line-clamp-2 leading-relaxed">{spec.description}</p>

          {/* Keyword tags snippet */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {keywords.slice(0, 3).map((kw, i) => (
              <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                #{kw.replace(/\s+/g, '')}
              </span>
            ))}
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-600">
            {spec.recoveryTime && (
              <span className="flex items-center gap-1 font-medium">
                <FiClock size={12} className="text-primary-500" /> Recovery: {spec.recoveryTime}
              </span>
            )}
            {hasTreatments && (
              <span className="flex items-center gap-1 font-bold text-primary-600">
                <FiActivity size={12} /> {spec.treatments.length} Surgeries &amp; Procedures
              </span>
            )}
          </div>
        </div>

        {/* Chevron Icon */}
        <FiChevronDown
          className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-600' : ''}`}
        />
      </button>

      {/* Expandable Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-5 border-t ${cfg.border} bg-slate-50/40 space-y-4 pt-4`}>

              {/* Key Features Bullet Cloud */}
              {hasFeatures && (
                <div>
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">Key Surgical &amp; Department Highlights</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {spec.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700">
                        <FiCheck size={13} className="text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Treatments List */}
              {hasTreatments && (
                <div>
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">Surgeries &amp; Treatments List</p>
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-1">
                    {spec.treatments.map((t, i) => (
                      <TreatmentRow key={i} t={t} idx={i} deptSlug={spec.slug || spec.id} />
                    ))}
                  </div>
                </div>
              )}

              {/* Attending Doctors */}
              {doctors.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <FiUsers size={12} className="text-primary-600" /> Lead Specialists &amp; Surgeons
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {doctors.map((doc) => (
                      <Link
                        key={doc.id}
                        to={`/doctors/${doc.slug || doc.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white hover:bg-primary-50 border border-slate-200 hover:border-primary-300 transition-colors group shadow-2xs"
                      >
                        {doc.image ? (
                          <img src={doc.image} alt={doc.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                            <FiUser size={14} className="text-primary-600" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-navy-900 group-hover:text-primary-700 leading-tight">{doc.name}</p>
                          <p className="text-[10px] text-slate-500 leading-tight">{doc.qualification}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="pt-2 flex gap-3">
                <Link
                  to={`/services/${spec.slug || spec.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white text-xs font-bold hover:bg-slate-50 transition-colors`}
                >
                  View Department &amp; Surgeries <FiArrowRight size={13} />
                </Link>
                <Link
                  to="/book-appointment"
                  state={{ department: spec.name }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-bold hover:bg-primary-700 transition-colors shadow-sm"
                >
                  <FiCalendar size={13} /> Book Consultation
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main Category Page ───────────────────────────────────────────────────────
export default function Category({ categoryName, categoryNames, title, description, keywords }) {
  const { categories: departments, loading } = useCategories()
  const { doctors } = useDoctors()
  const [openId, setOpenId] = useState(null)

  // Filter departments strictly by categoryName or categoryNames
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
        title={`${title} | ${siteData.name}`}
        description={description}
        keywords={keywords || [title, 'Hospitals in Patna', 'Surgeries Patna', 'Nova Max Hospital']}
      />

      {/* Hero Section — Clean Light Design */}
      <section className="bg-gradient-to-b from-primary-50/70 via-slate-50 to-white text-navy-900 border-b border-slate-200/80 py-14 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 border border-primary-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            <FiShield className="w-3.5 h-3.5 text-primary-600" /> Google Ads &amp; Healthcare Policy Verified
          </div>

          <h1 className="font-heading text-3xl md:text-5xl font-black mb-3 text-navy-900 tracking-tight">
            {title}
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {filtered.length > 0
              ? `${filtered.length} specialized departments · ${totalTreatments}+ surgeries & medical procedures — under one roof at Nova Max Hospital in Digha, Patna.`
              : description}
          </p>
        </motion.div>
      </section>

      {/* Departments Listing Grid */}
      <section className="py-12 md:py-16 bg-slate-50 min-h-[50vh]">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <FiAlertCircle size={40} className="mb-3 opacity-40" />
              <p className="font-medium">No department items found.</p>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Google Ads Compliant Medical Disclaimer */}
              <MedicalDisclaimer />
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-14 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 text-center text-white">
        <div className="container-max px-4 space-y-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
            Need Guidance on the Right Surgery or Specialist?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
            Speak directly with our senior clinical counselors or book an OPD consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/book-appointment" className="btn-accent px-6 py-3 font-bold text-sm">
              <FiCalendar /> Book OPD Appointment
            </Link>
            <a href={`tel:${siteData.contact.phone}`} className="bg-navy-900 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors inline-flex items-center justify-center gap-2">
              Call Hotline: {siteData.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
