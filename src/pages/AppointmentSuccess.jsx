// ─────────────────────────────────────────────────────────────
// pages/AppointmentSuccess.jsx
// Confirmation page shown after a successful appointment booking.
// Reads booking details (name, bookingId, date, department, etc.)
// from router location.state, passed by AppointmentForm on submit.
// If state is missing (direct navigation), shows a generic message.
// ─────────────────────────────────────────────────────────────

import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiPhone, FiHome, FiCheckCircle, FiClock } from 'react-icons/fi'
import SEO from '../components/SEO'
import { formatDate } from '../utils/helpers'
import { siteData } from '../data/siteData'

export default function AppointmentSuccess() {
  const { state } = useLocation()

  if (!state?.bookingId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">No appointment data found.</p>
        <Link to="/book-appointment" className="btn-primary">Book an Appointment</Link>
      </div>
    )
  }

  const { bookingId, name, parentName, department, doctorName, date, mode } = state

  return (
    <>
      <SEO title="Appointment Confirmed" />
      <section className="min-h-screen bg-section-gradient flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="card p-10 max-w-lg w-full text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          <h1 className="font-heading text-3xl font-bold text-navy-800 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-500 mb-8">
            Thank you, <span className="font-semibold text-navy-800">{name}</span>. Our team will call you within 30 minutes to confirm the exact time.
          </p>

          {/* Booking details */}
          <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Booking ID</span>
              <span className="font-heading font-bold text-primary-600 text-sm">{bookingId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Patient Name</span>
              <span className="font-semibold text-navy-800 text-sm">
                {name} {parentName && <span className="text-gray-400 font-normal">({parentName})</span>}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Mode</span>
              <span className="font-semibold text-primary-600 text-sm">{mode || 'Offline'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Department</span>
              <span className="font-semibold text-navy-800 text-sm">{department}</span>
            </div>
            {doctorName && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Doctor</span>
                <span className="font-semibold text-navy-800 text-sm">{doctorName}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Preferred Date</span>
              <span className="font-semibold text-navy-800 text-sm">
                {date ? formatDate(new Date(date)) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Status</span>
              <span className="badge bg-yellow-100 text-yellow-800 text-xs">Pending Confirmation</span>
            </div>
          </div>

          {/* What happens next */}
          <div className="text-left mb-8">
            <h3 className="font-heading font-semibold text-navy-800 mb-3">What happens next?</h3>
            <div className="space-y-3">
              {[
                { icon: FiClock, text: 'Our team will call you within 30 minutes' },
                { icon: FiCalendar, text: 'Your appointment time will be confirmed' },
                { icon: FiPhone, text: 'You\'ll receive a WhatsApp reminder' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="w-7 h-7 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 text-red-700 text-sm font-medium py-3 px-4 rounded-xl text-center border border-red-100 mb-6">
            Having an issue? Call us:{' '}
            <a href={`tel:${siteData.contact.phone}`} className="text-red-600 font-bold">{siteData.contact.phone}</a>
          </div>

          <div className="flex gap-3">
            <Link to="/" className="btn-secondary flex-1 justify-center text-sm py-2.5">
              <FiHome /> Home
            </Link>
            <Link to="/book-appointment" className="btn-primary flex-1 justify-center text-sm py-2.5">
              <FiCalendar /> New Booking
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
