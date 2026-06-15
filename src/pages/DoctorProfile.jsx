// ─────────────────────────────────────────────────────────────
// pages/DoctorProfile.jsx
// Individual doctor detail page at /doctors/:id.
// Fetches the doctor document directly from Firestore by ID.
// Displays bio, qualifications, specializations, available days,
// consultation fee, and a link to book an appointment.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiPhone, FiMail, FiClock, FiCalendar,
  FiArrowLeft, FiAward, FiUser, FiActivity, FiChevronRight, FiBriefcase
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { getInitials } from '../utils/helpers'
import { getDepartments } from '../services/categories'
import { getDoctors } from '../services/doctors'
import { siteData } from '../data/siteData'

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function DoctorProfile() {
  const { slug } = useParams()
  const [doctor, setDoctor]           = useState(null)
  const [loading, setLoading]         = useState(true)
  const [linkedGroups, setLinkedGroups] = useState([])

  useEffect(() => {
    getDoctors()
      .then((all) => {
        const found = all.find((d) => d.slug === slug || d.id === slug)
        setDoctor(found || null)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  // Build linked-treatment groups once doctor + departments are loaded
  useEffect(() => {
    if (!doctor?.linkedTreatments?.length) return
    getDepartments().then((specs) => {
      const groups = []
      specs.forEach((spec) => {
        const matched = (spec.treatments || []).filter((t) =>
          doctor.linkedTreatments.includes(`${spec.id}::${t.slug}`)
        )
        if (matched.length) groups.push({ spec, treatments: matched })
      })
      setLinkedGroups(groups)
    }).catch(console.error)
  }, [doctor])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-xl">Doctor not found.</p>
        <Link to="/doctors" className="btn-primary">Back to Doctors</Link>
      </div>
    )
  }

  const sortedDays = (Array.isArray(doctor.availableDays) ? doctor.availableDays : []).sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  )

  return (
    <>
      <SEO
        title={doctor.name}
        description={`${doctor.name} – ${doctor.specialty} specialist at ${siteData.name}, Patna. ${doctor.experience} years of experience. ${doctor.qualification}. Book an appointment today.`}
        keywords={[doctor.name, doctor.specialty, `${doctor.specialty} doctor Patna`, `${doctor.specialty} specialist Bihar`]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Physician',
            name: doctor.name,
            description: doctor.bio || '',
            medicalSpecialty: doctor.specialty,
            hasCredential: doctor.qualification,
            telephone: doctor.phone ? `+91${doctor.phone}` : undefined,
            email: doctor.email || undefined,
            image: doctor.image || undefined,
            workLocation: {
              '@type': 'Hospital',
              name: siteData.name,
              url: siteData.url,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Patna',
                addressRegion: 'Bihar',
                addressCountry: 'IN',
              },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteData.url },
              { '@type': 'ListItem', position: 2, name: 'Doctors', item: `${siteData.url}/doctors` },
              { '@type': 'ListItem', position: 3, name: doctor.name },
            ],
          },
        ]}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-3 px-4 overflow-x-auto">
        <div className="container-max flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/doctors" className="hover:text-primary-600">Doctors</Link>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-[160px] sm:max-w-none">{doctor.name}</span>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-max">
          <Link to="/doctors" className="inline-flex items-center gap-2 text-primary-600 text-sm font-medium mb-8 hover:gap-3 transition-all">
            <FiArrowLeft /> Back to All Doctors
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            {/* Left: profile card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <div className="card p-6 md:p-8 text-center lg:sticky lg:top-24">
                {/* Avatar */}
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-[5px] mx-auto mb-5 overflow-hidden bg-primary-50 flex items-center justify-center border border-primary-100">
                  {doctor.image ? (
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-heading font-bold text-primary-600 text-5xl">{getInitials(doctor.name)}</span>
                  )}
                </div>

                <h1 className="font-heading font-bold text-navy-800 text-2xl mb-1">{doctor.name}</h1>
                <p className="text-primary-600 font-semibold mb-1">{doctor.specialty}</p>
                <p className="text-gray-500 text-sm mb-4">{doctor.qualification}</p>

                {/* Info chips */}
                <div className="space-y-3 text-sm text-left mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[5px]">
                    <FiAward className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700">{doctor.experience} Years Experience</span>
                  </div>
                  {doctor.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[5px]">
                      <FiPhone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      <a href={`tel:${doctor.phone}`} className="text-gray-700 hover:text-primary-600">{doctor.phone}</a>
                    </div>
                  )}
                  {doctor.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[5px]">
                      <FiMail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      <a href={`mailto:${doctor.email}`} className="text-gray-700 hover:text-primary-600 text-xs truncate">{doctor.email}</a>
                    </div>
                  )}
                  {doctor.consultationFee && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[5px]">
                      <span className="w-4 h-4 text-primary-500 font-extrabold flex items-center justify-center text-xs shrink-0">₹</span>
                      <span className="text-gray-700">Consultation Fee: <strong className="text-navy-800">₹{doctor.consultationFee}</strong></span>
                    </div>
                  )}
                </div>

                <Link
                  to={`/book-appointment?dept=${encodeURIComponent(doctor.specialty)}&doctor=${encodeURIComponent(doctor.name)}`}
                  className="btn-primary w-full justify-center"
                >
                  <FiCalendar /> Book Appointment
                </Link>
              </div>
            </motion.div>

            {/* Right: details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Bio */}
              <div className="card p-8">
                <h2 className="font-heading font-bold text-navy-800 text-xl mb-4">About Dr. {doctor.name.replace('Dr. ', '')}</h2>
                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
              </div>

              {/* Availability */}
              {sortedDays.length > 0 && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-5 flex items-center gap-2">
                    <FiClock className="w-5 h-5 text-primary-500" /> Availability
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dayOrder.map((day) => (
                      <span
                        key={day}
                        className={`px-3 py-1.5 rounded-[5px] text-xs font-medium ${
                          sortedDays.includes(day)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                  {doctor.availableTime && (
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <FiClock className="w-4 h-4 text-primary-500" />
                      Timings: <span className="font-semibold text-navy-800">{doctor.availableTime}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Qualifications */}
              <div className="card p-8">
                <h2 className="font-heading font-bold text-navy-800 text-xl mb-4 flex items-center gap-2">
                  <FiUser className="w-5 h-5 text-primary-500" /> Qualifications
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.qualification?.split(',').map((q) => (
                    <span key={q} className="badge bg-primary-50 text-primary-700">{q.trim()}</span>
                  ))}
                </div>
              </div>

              {/* Departments & Expertise */}
              {((Array.isArray(doctor.specialties) && doctor.specialties.length > 0) || 
                (Array.isArray(doctor.specializations) && doctor.specializations.length > 0)) && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-4 flex items-center gap-2">
                    <FiActivity className="w-5 h-5 text-primary-500" /> Departments &amp; Expertise
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {((Array.isArray(doctor.specialties) ? doctor.specialties : [])
                      .concat(Array.isArray(doctor.specializations) ? doctor.specializations : [])
                      .filter((val, id, self) => self.indexOf(val) === id) // deduplicate
                    ).map((spec) => (
                      <span key={spec} className="badge bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg text-sm font-semibold">{spec}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Professional Experience / Positions (Ex Services) */}
              {(doctor.currentPosition || doctor.previousPosition) && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-5 flex items-center gap-2">
                    <FiBriefcase className="w-5 h-5 text-primary-500" /> Positions &amp; Clinical Experience
                  </h2>
                  <div className="space-y-4">
                    {doctor.currentPosition && (
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-primary-50/50 border border-primary-100">
                        <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                          <FiBriefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-primary-600 font-bold uppercase tracking-wider">Current Position</p>
                          <h3 className="text-navy-800 font-bold text-sm sm:text-base mt-1">
                            {doctor.currentPosition.split(/,\s*(.+)/)[0]}
                          </h3>
                          {doctor.currentPosition.split(/,\s*(.+)/)[1] && (
                            <p className="text-gray-500 text-xs mt-0.5">
                              {doctor.currentPosition.split(/,\s*(.+)/)[1]}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {doctor.previousPosition && doctor.previousPosition.split('|').map((p, idx) => {
                      const parts = p.split(/,\s*(.+)/)
                      return (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-gray-150">
                          <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                            <FiBriefcase className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-navy-500 font-bold uppercase tracking-wider">Ex-Service / Previous Position</p>
                            <h3 className="text-navy-800 font-bold text-sm sm:text-base mt-1">
                              {parts[0]?.trim()}
                            </h3>
                            {parts[1] && (
                              <p className="text-gray-500 text-xs mt-0.5">
                                {parts[1]?.trim()}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Linked Treatments */}
              {linkedGroups.length > 0 && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-5 flex items-center gap-2">
                    <FiActivity className="w-5 h-5 text-primary-500" /> Treatments &amp; Procedures
                  </h2>
                  <div className="space-y-5">
                    {linkedGroups.map(({ spec, treatments }) => (
                      <div key={spec.id}>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                          {spec.icon && (
                            <span className="w-4 h-4 inline-flex items-center justify-center shrink-0 overflow-hidden mr-1.5 align-middle">
                              {(spec.icon.startsWith('http') || spec.icon.startsWith('/') || spec.icon.includes('.')) ? (
                                <img src={spec.icon} alt="" className="w-full h-full object-contain" />
                              ) : (
                                spec.icon
                              )}
                            </span>
                          )}
                          <span className="align-middle">{spec.name}</span>
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {treatments.map((t) => (
                            <Link
                              key={t.slug}
                              to={`/services/${spec.slug}/treatment/${t.slug}`}
                              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors group"
                            >
                              <div>
                                <p className="text-sm font-semibold text-navy-800 group-hover:text-primary-700">{t.name}</p>
                              </div>
                              <FiChevronRight size={16} className="text-primary-400 group-hover:text-primary-600 flex-shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Book CTA */}
              <div className="bg-hero-gradient rounded-2xl p-8 text-white">
                <h3 className="font-heading font-bold text-xl mb-3">Ready to Book an Appointment?</h3>
                <p className="text-white/80 text-sm mb-5">
                  Schedule a consultation with {doctor.name}. Our team will confirm within 30 minutes.
                </p>
                <Link
                  to={`/book-appointment?dept=${encodeURIComponent(doctor.specialty)}&doctor=${encodeURIComponent(doctor.name)}`}
                  className="btn-accent inline-flex"
                >
                  <FiCalendar /> Book Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
