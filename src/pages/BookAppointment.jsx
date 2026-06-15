// ─────────────────────────────────────────────────────────────
// pages/BookAppointment.jsx
// Standalone appointment booking page at /book-appointment.
// Wraps the shared AppointmentForm component with a page header,
// trust indicators (emergency call, hours, NABH), and SEO tags.
// Pre-fills doctor/department from query params when linked from
// a doctor profile card.
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { FiPhone, FiClock, FiShield, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import SEO from '../components/SEO'
import AppointmentForm from '../components/home/AppointmentForm'
import { siteData } from '../data/siteData'

export default function BookAppointment() {
  return (
    <>
      <SEO
        title="Book an Appointment"
        description={`Book an appointment at ${siteData.name}, Patna online. Choose your department, select a date, and our team confirms within 30 minutes. Consultation by appointment.`}
        keywords={['book urology appointment Patna', 'online laparoscopy booking Patna', 'kidney stone doctor appointment Patna', `${siteData.name} appointment`]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ReserveAction',
          name: `Book an Appointment at ${siteData.name}`,
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteData.url}/book-appointment`,
            actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
          },
          object: {
            '@type': 'MedicalClinic',
            name: siteData.name,
            url: siteData.url,
          },
        }}
      />

      {/* Hero */}
      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Fill in the form below and our team will confirm your appointment within 30 minutes.
          </p>
          <div className="mt-4 inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium">
            Please book your appointment at least 48 hours in advance.
          </div>
        </motion.div>
      </section>

      <section className="section-padding bg-section-gradient">
        <div className="container-max space-y-6">

          {/* Booking Form — full width */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <AppointmentForm />
          </motion.div>

          {/* Info cards below form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {/* OPD Hours */}
            <div className="card p-5 flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiClock className="w-5 h-5 text-primary-600" />
              </div>
              <div className="w-full">
                <h4 className="font-heading font-bold text-navy-800 text-sm mb-2">OPD Hours</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Mon – Sat</span>
                    <span className="font-semibold text-navy-800">9:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold text-red-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation */}
            <div className="card p-5 flex gap-4 items-start">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiShield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-800 text-sm mb-1">Confirmed in 30 Min</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Our team calls you within 30 minutes to confirm your appointment slot. Secure & confidential.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {/* Call Support */}
            <div className="card p-5 flex gap-4 items-start border-l-4 border-green-500 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 text-green-600">
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-800 text-sm mb-2">Emergency / Call Support</h4>
                <div className="flex flex-col gap-2 text-xs">
                  <a href={`tel:${siteData.contact.phone}`} className="text-gray-600 hover:text-primary-600 transition-colors font-semibold flex items-center gap-1">
                    📱 Mobile: {siteData.contact.phone}
                  </a>
                  {siteData.contact.phone2 && (
                    <a href={`tel:${siteData.contact.phone2}`} className="text-gray-600 hover:text-primary-600 transition-colors font-semibold flex items-center gap-1">
                      📱 Mobile 2: {siteData.contact.phone2}
                    </a>
                  )}
                  {siteData.contact.phone3 && (
                    <a href={`tel:${siteData.contact.phone3}`} className="text-gray-600 hover:text-primary-600 transition-colors font-semibold flex items-center gap-1">
                      📱 Mobile 3: {siteData.contact.phone3}
                    </a>
                  )}
                  {siteData.contact.phone4 && (
                    <a href={`tel:${siteData.contact.phone4}`} className="text-gray-600 hover:text-primary-600 transition-colors font-semibold flex items-center gap-1">
                      📞 Landline: {siteData.contact.phone4}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* WhatsApp Support */}
            <div className="card p-5 flex gap-4 items-start border-l-4 border-emerald-500 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-600">
                <FaWhatsapp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-800 text-sm mb-1">WhatsApp Chat</h4>
                <p className="text-gray-500 text-xs mb-2">Message us for quick booking assistance or queries.</p>
                <a
                  href={`https://wa.me/91${siteData.contact.phone.replace(/\D/g, '').replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-bold"
                >
                  💬 Chat on WhatsApp →
                </a>
              </div>
            </div>

            {/* Email Support */}
            <div className="card p-5 flex gap-4 items-start border-l-4 border-purple-500 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0 text-purple-600">
                <FiMail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-800 text-sm mb-1">Email Support</h4>
                <p className="text-gray-500 text-xs mb-2">Send us your queries, reports, or scan files.</p>
                <a href={`mailto:${siteData.contact.email}`} className="text-xs text-purple-600 hover:text-purple-700 font-bold break-all">
                  ✉️ {siteData.contact.email} →
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  )
}
