// ─────────────────────────────────────────────────────────────
// pages/NotFound.jsx
// 404 page — shown for any unmatched route.
// Offers quick links back to Home, Book Appointment, and
// Emergency Call so users are never stuck on a dead end.
// ─────────────────────────────────────────────────────────────

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiCalendar, FiPhone } from 'react-icons/fi'
import SEO from '../components/SEO'
import { siteData } from '../data/siteData'

export default function NotFound() {
  return (
    <>
      <SEO title="404 – Page Not Found" />
      <div className="min-h-screen bg-section-gradient flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          {/* Cross icon using primary color */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-primary-100 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20">
                <rect x="28" y="10" width="8" height="44" rx="4" fill="#0060b0" opacity="0.3" />
                <rect x="10" y="28" width="44" height="8" rx="4" fill="#0060b0" opacity="0.3" />
                <text x="32" y="40" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#0060b0" fontFamily="Poppins">404</text>
              </svg>
            </div>
          </div>

          <h1 className="font-heading text-4xl font-bold text-navy-800 mb-3">Page Not Found</h1>
          <p className="text-gray-500 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved. Let us help you find what you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link to="/" className="btn-primary">
              <FiHome /> Go to Homepage
            </Link>
            <Link to="/book-appointment" className="btn-secondary">
              <FiCalendar /> Book Appointment
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <FiPhone className="w-4 h-4 text-primary-500" />
            <span>Need help? Call us at</span>
            <a href={`tel:${siteData.contact.phone}`} className="text-primary-600 font-semibold hover:underline">
              {siteData.contact.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </>
  )
}
