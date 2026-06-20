// ─────────────────────────────────────────────────────────────
// components/FloatingButtons.jsx
// Two persistent floating action buttons on all public pages:
//   1. WhatsApp button — opens a pre-filled chat to the hospital
//   2. Scroll-to-top button — appears after scrolling 300 px,
//      styled as a doctor badge (stethoscope icon + "Top")
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronUp, FiPhone } from 'react-icons/fi'
import { siteData } from '../data/siteData'

const WA_NUMBER = siteData.contact.phone.replace(/\D/g, '').replace(/^0/, '')
const WA_MESSAGE = encodeURIComponent(
  'Hello! I found Nova Max Hospital online and would like to know more about your treatments / book an appointment.'
)
const WA_URL = `https://wa.me/91${WA_NUMBER}?text=${WA_MESSAGE}`

// WhatsApp SVG icon (official green brand icon)
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.473 2.027 7.774L0 32l8.469-2.001A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.848l-.485-.288-5.025 1.187 1.21-4.898-.317-.504A13.274 13.274 0 012.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.27-9.878c-.398-.2-2.355-1.163-2.72-1.295-.365-.133-.631-.2-.897.2-.266.398-1.031 1.295-1.264 1.561-.232.266-.465.299-.863.1-.398-.2-1.681-.62-3.202-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.175-.811.18-.179.398-.465.598-.698.199-.232.265-.398.398-.664.133-.266.066-.498-.033-.698-.1-.2-.897-2.162-1.23-2.96-.324-.778-.652-.672-.897-.684l-.764-.013c-.266 0-.698.1-1.064.498-.365.398-1.396 1.362-1.396 3.323s1.429 3.854 1.628 4.12c.2.265 2.813 4.295 6.816 6.025.953.411 1.696.657 2.276.841.956.304 1.827.261 2.515.158.767-.114 2.355-.963 2.688-1.893.333-.93.333-1.727.232-1.893-.099-.166-.365-.266-.763-.465z"/>
    </svg>
  )
}

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">

      {/* ── Scroll to Top — Doctor Badge ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="scrolltop"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={scrollToTop}
            title="Back to top"
            className="group relative flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary-500 shadow-lg hover:bg-primary-600 hover:border-primary-600 transition-colors"
          >
            {/* Stethoscope badge dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
              <span className="text-[7px] text-white font-bold leading-none">+</span>
            </span>
            <FiChevronUp size={20} className="text-primary-600 group-hover:text-white transition-colors" />
            <span className="text-[9px] font-bold text-primary-600 group-hover:text-white transition-colors -mt-0.5 leading-none">TOP</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Call Button ── */}
      <motion.a
        href={`tel:${siteData.contact.phone}`}
        title="Call Nova Max Hospital"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-colors"
      >
        <FiPhone className="w-6 h-6 animate-pulse" />
        {/* Ping animation (subtle) */}
        <span className="absolute inset-0 rounded-full bg-primary-600 opacity-20 animate-ping" />
        {/* Tooltip */}
        <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-md transition-opacity">
          Call: {siteData.contact.phone}
        </span>
      </motion.a>

      {/* ── WhatsApp ── */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-400/40 hover:bg-[#1ebe5d] transition-colors"
      >
        <WhatsAppIcon />
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        {/* Tooltip */}
        <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-md transition-opacity">
          Chat on WhatsApp
        </span>
      </motion.a>

    </div>
  )
}
