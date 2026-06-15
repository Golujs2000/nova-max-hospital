import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiMenu, FiX, FiChevronDown, FiArrowRight, FiActivity, FiMail } from 'react-icons/fi'
import { siteData } from '../data/siteData'
import { useCategories } from '../hooks/useCategories'
import hospitalLogo from '../assets/logo.png'

const renderNavbarIcon = (icon, alt = '', className = 'w-5 h-5 object-contain') => {
  if (!icon) return '🏥'
  const isUrl = icon.startsWith('http') || icon.startsWith('/') || icon.includes('.')
  if (isUrl) {
    return <img src={icon} alt={alt} className={`${className} inline-block`} />
  }
  return <span className="text-xl leading-none">{icon}</span>
}

const mainLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Hospital Depts', to: '/hospital-departments' },
  { label: 'Surgical Services', to: '/surgical-services' },
  { label: 'Critical Care', to: '/critical-care' },
  { label: 'Facilities & Diagnostics', to: '/facilities-diagnostics' },
  { label: 'Contact', to: '/contact' },
]

// Removed MegaMenu

const NAV_LINKS = [
  { label: 'HOME', to: '/', end: true },
  { label: 'ABOUT US', to: '/about' },
  { label: 'DOCTORS', to: '/doctors' },
  { label: 'DEPARTMENTS', to: '/hospital-departments' },
  { label: 'SURGERY', to: '/surgical-services' },
  { label: 'CRITICAL CARE', to: '/critical-care' },
  { label: 'FACILITIES/DIAGNOSTICS', to: '/facilities-diagnostics' },
  { label: 'CONTACT', to: '/contact' },
]

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20)
      const doc = document.documentElement
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100
      setScrollPct(Math.min(pct, 100))
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])



  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      <header className={`sticky top-0 z-50 transition-all duration-300 shadow-nav`}>
        {/* Top bar - Desktop only */}
        <div className="hidden md:flex text-gray-700 text-sm px-8 py-2.5 justify-between items-center border-b border-primary-100" style={{ backgroundColor: '#e8f4fd' }}>
          <div className="flex-1 flex items-center justify-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-primary-500 flex items-center justify-center animate-pulse shadow-sm bg-primary-100">
                <FiPhone className="text-primary-600 w-4 h-4" />
              </div>
              <a href={`tel:${siteData.contact.phone}`} className="font-bold text-lg text-primary-700 hover:text-primary-800 transition-colors">
                {siteData.contact.phone}
              </a>
            </div>
            {siteData.contact.phone2 && (
              <div className="flex items-center gap-2">
                <FiPhone className="text-primary-500 w-4 h-4" />
                <a href={`tel:${siteData.contact.phone2}`} className="font-semibold text-base hover:text-primary-600 transition-colors">
                  {siteData.contact.phone2}
                </a>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={hospitalLogo} alt="Logo" className="h-14 w-auto object-contain group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="text-navy-800 font-heading font-black text-2xl uppercase tracking-wide group-hover:text-primary-600 transition-colors leading-none">
                  Sarvada <span className="text-primary-600">Hospito Care</span>
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wider mt-1 truncate max-w-[300px]">
                  {siteData.tagline}
                </span>
              </div>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-end gap-6">
            <a href={`mailto:${siteData.contact.email || 'info@sarvadacare.com'}`} className="flex items-center gap-2 font-semibold hover:text-primary-600 transition-colors lowercase text-sm tracking-wider group">
              <FiMail className="text-primary-600 w-5 h-5 group-hover:text-primary-700 transition-colors" />
              <span>{siteData.contact.email || 'info@sarvadacare.com'}</span>
            </a>
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/nova-max-hospital.firebasestorage.app/o/gallery%2F1781122820016_neemkroli%20baba01.webp?alt=media&token=65aea2b7-ec30-42b6-869a-149501c650f6" 
              alt="Neem Karoli Baba" 
              className="w-12 h-12 rounded-full object-cover shadow border-2 border-primary-200"
            />
          </div>
        </div>

        {/* Main nav - Blue Background */}
        <div className="bg-primary-600 text-white">
          <nav className="w-full px-4 lg:px-8 flex items-center justify-between md:justify-center h-14 md:h-12 relative">
            
            {/* Mobile Logo & Toggle */}
            <div className="flex md:hidden items-center justify-between w-full">
              <Link to="/" className="flex items-center gap-2">
                <img src={hospitalLogo} alt="Logo" className="h-8 bg-white p-1 rounded-lg" />
                <span className="font-heading font-bold text-sm tracking-wider">SARVADA CARE</span>
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white hover:text-accent-300">
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen
                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><FiX size={24} /></motion.span>
                    : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><FiMenu size={24} /></motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-2 mr-28 lg:mr-40">
              {NAV_LINKS.map(({ label, to, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end}
                    className={({ isActive }) =>
                      `px-2.5 lg:px-3 py-2 text-xs lg:text-[11px] font-bold tracking-wider transition-all duration-200 block rounded-lg ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            
            {/* Desktop CTA Absolute Right */}
            <div className="hidden md:block absolute right-6">
               <Link to="/book-appointment" className="bg-white text-primary-700 px-5 py-2 rounded-full text-xs font-bold tracking-wide hover:bg-primary-50 hover:shadow-btn transform hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                 BOOK APPOINTMENT
               </Link>
            </div>
          </nav>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="md:hidden bg-primary-700 border-t border-primary-500/50 overflow-hidden shadow-lg"
              >
                <div className="w-full px-4 py-4 space-y-1">
                  {NAV_LINKS.map(({ label, to, end }, i) => (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <NavLink to={to} end={end} onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'bg-white/20 text-white border-l-4 border-accent-400' : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`
                        }
                      >
                        {label}
                      </NavLink>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4 border-t border-primary-500/50 flex flex-col gap-3 pb-4"
                  >
                    <a href={`tel:${siteData.contact.phone}`}
                      className="inline-flex items-center justify-center gap-2 text-sm py-3 px-5 bg-white text-primary-700 font-bold rounded-full shadow-md"
                    >
                      <FiPhone className="w-4 h-4" />
                      CALL: {siteData.contact.phone}
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
