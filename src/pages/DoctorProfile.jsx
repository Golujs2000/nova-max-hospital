import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiPhone, FiMail, FiClock, FiCalendar,
  FiArrowLeft, FiAward, FiUser, FiActivity, FiChevronRight, FiBriefcase,
  FiCheckCircle, FiCheck, FiShield, FiCpu
} from 'react-icons/fi'
import SEO from '../components/SEO'
import MedicalDisclaimer from '../components/MedicalDisclaimer'
import { getInitials } from '../utils/helpers'
import { getDepartments } from '../services/categories'
import { getDoctors } from '../services/doctors'
import { siteData } from '../data/siteData'

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function DoctorProfile() {
  const { slug } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
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
        <p className="text-gray-500 text-xl">Doctor profile not found.</p>
        <Link to="/doctors" className="btn-primary">Back to All Doctors</Link>
      </div>
    )
  }

  const sortedDays = (Array.isArray(doctor.availableDays) ? doctor.availableDays : []).sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  )

  const doctorSpecialtiesList = (Array.isArray(doctor.specialties) ? doctor.specialties : [])
    .concat(Array.isArray(doctor.specializations) ? doctor.specializations : [])
    .filter((val, id, self) => self.indexOf(val) === id)

  const doctorKeywords = [
    doctor.name,
    `${doctor.name} Patna`,
    doctor.specialty,
    `${doctor.specialty} surgeon Bihar`,
    'Minimally Invasive Surgery',
    'Nova Max Hospital'
  ]

  return (
    <>
      <SEO
        title={`${doctor.name} - ${doctor.specialty} Specialist | Nova Max Hospital, Digha, Patna`}
        description={`${doctor.name} is a leading ${doctor.specialty} specialist with ${doctor.experience}+ years of experience at Nova Max Hospital in Digha, Patna. Book OPD consultations, keyhole surgeries, and laser treatments.`}
        keywords={doctorKeywords}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Physician',
            name: doctor.name,
            description: doctor.bio || '',
            medicalSpecialty: doctor.specialty,
            hasCredential: doctor.qualification,
            telephone: doctor.phone ? `+91${doctor.phone}` : siteData.contact.phone,
            email: doctor.email || siteData.contact.email,
            image: doctor.image || undefined,
            workLocation: {
              '@type': 'Hospital',
              name: 'Nova Max Hospital',
              address: 'Digha, Patna, Bihar'
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

      {/* Eye-Catching Emergency Helpline Banner */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-navy-900 text-white py-2.5 px-4 text-xs md:text-sm font-medium shadow-sm">
        <div className="container-max flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span><strong>Nova Max Hospital in Digha, Patna</strong> — 24/7 OPD &amp; Surgical Consultation Helpline</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${doctor.phone || siteData.contact.phone}`} className="hover:underline flex items-center gap-1 font-bold">
              📞 {doctor.phone || siteData.contact.phone}
            </a>
            <a href={`https://wa.me/${(doctor.phone || siteData.contact.phone).replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-md text-xs font-bold transition-colors">
              💬 WhatsApp Doctor
            </a>
          </div>
        </div>
      </div>

      {/* Breadcrumb Header */}
      <div className="bg-slate-100/90 text-slate-700 py-3.5 px-4 border-b border-slate-200">
        <div className="container-max flex items-center justify-between gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-slate-600 truncate">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link to="/doctors" className="hover:text-primary-600 transition-colors">Doctors</Link>
            <span className="text-slate-300">/</span>
            <span className="text-primary-700 font-bold truncate">{doctor.name} — Nova Max Hospital</span>
          </div>

          <Link to="/doctors" className="inline-flex items-center gap-1.5 text-xs text-primary-600 font-bold hover:text-primary-700">
            <FiArrowLeft /> Back to Doctors
          </Link>
        </div>
      </div>

      <section className="py-10 md:py-16 bg-slate-50/50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Doctor Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 text-center shadow-sm lg:sticky lg:top-24 space-y-5">
                
                {/* Doctor Avatar */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl mx-auto overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-primary-100 shadow-sm relative">
                  {doctor.image ? (
                    <img src={doctor.image} alt={`${doctor.name} at Nova Max Hospital in Digha, Patna`} className="w-full h-full object-cover object-top" />
                  ) : (
                    <span className="font-heading font-extrabold text-primary-600 text-4xl">{getInitials(doctor.name)}</span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow" title="Senior Consultant Doctor at Nova Max Hospital">
                    <FiCheckCircle className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <div className="inline-block bg-primary-50 text-primary-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                    Nova Max Hospital Specialist
                  </div>
                  <h1 className="font-heading font-extrabold text-navy-900 text-2xl mb-1">{doctor.name}</h1>
                  <p className="text-primary-600 font-bold text-sm">{doctor.specialty}</p>
                  <p className="text-slate-500 text-xs mt-1 font-semibold">{doctor.qualification}</p>
                </div>

                {/* Keyword Pills */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {[...doctorKeywords, 'NovaMaxHospitalDighaPatna'].map((kw, i) => (
                    <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      #{kw.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>

                {/* Quick Info Badges */}
                <div className="space-y-2.5 text-xs text-left pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <FiAward className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-slate-700 font-semibold">{doctor.experience}+ Years Clinical &amp; Surgical Experience</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <FiShield className="w-4 h-4 text-primary-600 shrink-0" />
                    <span className="text-slate-700 font-semibold">Location: Nova Max Hospital, Digha, Patna</span>
                  </div>

                  {doctor.consultationFee && (
                    <div className="flex items-center gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <span className="w-4 h-4 text-emerald-700 font-extrabold flex items-center justify-center text-xs shrink-0">₹</span>
                      <span className="text-slate-700 text-xs">
                        OPD Consultation Fee: <strong className="text-emerald-800 font-bold">₹{doctor.consultationFee}</strong>
                      </span>
                    </div>
                  )}

                  {doctor.phone && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <FiPhone className="w-4 h-4 text-primary-600 shrink-0" />
                      <a href={`tel:${doctor.phone}`} className="text-slate-700 font-bold hover:text-primary-600">{doctor.phone}</a>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="space-y-2.5 pt-2">
                  <Link
                    to={`/book-appointment?dept=${encodeURIComponent(doctor.specialty)}&doctor=${encodeURIComponent(doctor.name)}`}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-primary-700 transition-colors shadow-md"
                  >
                    <FiCalendar className="w-4 h-4" /> Book OPD Appointment
                  </Link>

                  <a
                    href={`https://wa.me/${(doctor.phone || siteData.contact.phone).replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    💬 WhatsApp Doctor Directly
                  </a>
                </div>

              </div>
            </motion.div>

            {/* Right Column: Detailed Surgical Profile & Treatments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 space-y-8"
            >

              {/* Bio & Background */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="font-heading font-bold text-navy-900 text-xl md:text-2xl pb-3 border-b border-slate-100 flex items-center gap-2">
                  <FiUser className="w-6 h-6 text-primary-600" /> Clinical Expertise at Nova Max Hospital in Digha, Patna
                </h2>
                <p className="text-slate-700 text-base leading-relaxed font-normal">
                  {doctor.bio || `${doctor.name} is a senior consultant in ${doctor.specialty} at Nova Max Hospital in Digha, Patna. With ${doctor.experience}+ years of extensive clinical and operating room experience, ${doctor.name} specializes in high-precision minimally invasive keyhole surgeries, laser stone extraction, proctology procedures, and daycare patient-first recovery protocols.`}
                </p>
              </div>

              {/* Surgeries & Treatments Provided Section (Bulleted Grid) */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <FiCpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-navy-900 text-xl md:text-2xl">
                      Surgeries &amp; Treatments Provided at Nova Max Hospital
                    </h2>
                    <p className="text-xs text-slate-500">Comprehensive list of surgical and medical procedures performed by {doctor.name} in Digha, Patna</p>
                  </div>
                </div>

                {linkedGroups.length > 0 ? (
                  <div className="space-y-6">
                    {linkedGroups.map(({ spec, treatments }) => (
                      <div key={spec.id} className="bg-slate-50/70 rounded-xl p-5 border border-slate-200/80">
                        <h3 className="font-bold text-navy-900 text-base mb-3 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                          {spec.name} Surgeries &amp; Procedures
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {treatments.map((t) => (
                            <Link
                              key={t.slug}
                              to={`/services/${spec.slug}/treatment/${t.slug}`}
                              className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-primary-400 hover:shadow-sm transition-all group flex items-start justify-between gap-3"
                            >
                              <div>
                                <h4 className="font-bold text-sm text-navy-900 group-hover:text-primary-600 transition-colors flex items-center gap-1.5">
                                  <FiCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                                  {t.name}
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                                  {t.description || 'Advanced minimally invasive procedure with rapid recovery at Nova Max Hospital in Digha, Patna.'}
                                </p>
                              </div>
                              <FiChevronRight size={16} className="text-slate-400 group-hover:text-primary-600 shrink-0 mt-1" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Fallback Surgery Grid for Doctor */
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <h4 className="font-bold text-navy-900 text-sm flex items-center gap-2">
                        <FiCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Advanced Keyhole &amp; Laser Surgeries
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 pl-6 list-disc">
                        <li>Minimally invasive keyhole laparoscopic procedures</li>
                        <li>High-power Holmium laser stone dusting &amp; proctology</li>
                        <li>Daycare surgeries with discharge within 24 hours</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <h4 className="font-bold text-navy-900 text-sm flex items-center gap-2">
                        <FiCheck className="w-4 h-4 text-emerald-500 shrink-0" /> OPD Consultations &amp; Emergency Care
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 pl-6 list-disc">
                        <li>Comprehensive diagnostic evaluations at Nova Max Hospital</li>
                        <li>Post-operative rehabilitation &amp; routine follow-ups</li>
                        <li>24×7 Emergency surgical management in Digha, Patna</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* OPD Schedule & Availability */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="font-heading font-bold text-navy-900 text-xl flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FiClock className="w-5 h-5 text-primary-600" /> OPD Availability at Nova Max Hospital, Digha, Patna
                </h2>

                <div className="flex flex-wrap gap-2 mb-3">
                  {dayOrder.map((day) => (
                    <span
                      key={day}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold ${
                        sortedDays.includes(day)
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {day}
                    </span>
                  ))}
                </div>

                {doctor.availableTime && (
                  <p className="text-xs md:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2 font-medium">
                    <FiClock className="w-4 h-4 text-primary-600" />
                    Consultation Hours: <span className="font-bold text-navy-900">{doctor.availableTime}</span>
                  </p>
                )}
              </div>

              {/* Patient Preparation & Consultation Checklist */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="font-heading font-bold text-navy-900 text-xl flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FiActivity className="w-5 h-5 text-primary-600" /> What to Bring for OPD Consultation
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Past medical history, prescription slips &amp; blood test reports</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Recent Ultrasound (USG), X-Ray, or CT Scan films</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>List of active medications &amp; allergy history</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Health insurance card for TPA cashless approval assistance</span>
                  </li>
                </ul>
              </div>

              {/* Doctor Consultation FAQs */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="font-heading font-bold text-navy-900 text-xl flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FiShield className="w-5 h-5 text-primary-600" /> Patient FAQs &amp; Appointment Guidance
                </h2>
                <div className="space-y-3 text-xs md:text-sm">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-navy-900 mb-1">How can I book an emergency surgical opinion with {doctor.name}?</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Call our direct hospital line at <strong>{doctor.phone || siteData.contact.phone}</strong> or send a WhatsApp message for priority emergency slots at Nova Max Hospital in Digha, Patna.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-navy-900 mb-1">Does {doctor.name} perform daycare laser surgeries?</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Yes. {doctor.name} specializes in daycare laser and keyhole procedures allowing patients to walk home comfortably within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Positions & Clinical Appointments */}
              {(doctor.currentPosition || doctor.previousPosition) && (
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="font-heading font-bold text-navy-900 text-xl flex items-center gap-2 pb-3 border-b border-slate-100">
                    <FiBriefcase className="w-5 h-5 text-primary-600" /> Positions &amp; Clinical Appointments
                  </h2>

                  <div className="space-y-3">
                    {doctor.currentPosition && (
                      <div className="p-4 rounded-xl bg-primary-50/60 border border-primary-100 flex items-start gap-3">
                        <FiBriefcase className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold text-primary-700 uppercase tracking-wider">Current Hospital Appointment</p>
                          <h3 className="text-navy-900 font-bold text-sm mt-0.5">{doctor.currentPosition} at Nova Max Hospital, Digha, Patna</h3>
                        </div>
                      </div>
                    )}

                    {doctor.previousPosition && doctor.previousPosition.split('|').map((p, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                        <FiBriefcase className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Prior Clinical Experience</p>
                          <h3 className="text-slate-800 font-bold text-sm mt-0.5">{p.trim()}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Google Ads Compliant Disclaimer Banner */}
              <MedicalDisclaimer />

            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
