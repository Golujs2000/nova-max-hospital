import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiMenu, FiX, FiChevronDown, FiArrowRight, FiActivity, FiMail } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa'
import { siteData } from '../data/siteData'
import { useCategories } from '../hooks/useCategories'


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
        <div className="hidden md:flex text-white text-xs px-8 py-2 justify-between items-center border-b border-primary-900/10 bg-primary-800">
          <div className="flex-1 flex items-center justify-start gap-4">
            {siteData.social.facebook && (
              <a href={siteData.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent-300 transition-all hover:scale-110">
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
            )}
            {siteData.social.twitter && (
              <a href={siteData.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent-300 transition-all hover:scale-110">
                <FaTwitter className="w-3.5 h-3.5" />
              </a>
            )}
            {siteData.social.instagram && (
              <a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent-300 transition-all hover:scale-110">
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
            )}
            {siteData.social.youtube && (
              <a href={siteData.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent-300 transition-all hover:scale-110">
                <FaYoutube className="w-3.5 h-3.5" />
              </a>
            )}
            {siteData.social.linkedin && (
              <a href={siteData.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent-300 transition-all hover:scale-110">
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          
          <div className="flex items-center justify-end gap-6 font-semibold">
            <div className="flex items-center gap-2">
              <FiPhone className="text-accent-300 w-3.5 h-3.5 animate-pulse" />
              <a href={`tel:${siteData.contact.phone}`} className="hover:text-accent-300 transition-colors">
                {siteData.contact.phone}
              </a>
            </div>
            {siteData.contact.phone2 && (
              <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                <FiPhone className="text-accent-300 w-3.5 h-3.5" />
                <a href={`tel:${siteData.contact.phone2}`} className="hover:text-accent-300 transition-colors">
                  {siteData.contact.phone2}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2 border-l border-white/20 pl-4">
              <FiMail className="text-accent-300 w-3.5 h-3.5" />
              <a href={`mailto:${siteData.contact.email}`} className="hover:text-accent-300 transition-colors lowercase text-xs">
                {siteData.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Top bar - Mobile only (Home page only) */}
        {pathname === '/' && (
          <div className="flex md:hidden text-white text-[10px] sm:text-xs px-4 py-2 justify-center items-center gap-4 bg-primary-800 border-b border-primary-900/10">
            <div className="flex items-center gap-1.5">
              <FiPhone className="text-accent-300 w-3 h-3 animate-pulse" />
              <a href={`tel:${siteData.contact.phone}`} className="hover:text-accent-300 transition-colors">
                {siteData.contact.phone}
              </a>
            </div>
            {siteData.contact.phone2 && (
              <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
                <FiPhone className="text-accent-300 w-3 h-3" />
                <a href={`tel:${siteData.contact.phone2}`} className="hover:text-accent-300 transition-colors">
                  {siteData.contact.phone2}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Main nav - White Background */}
        <div className="bg-white text-navy-800 border-b border-gray-100">
          <nav className="w-full px-4 lg:px-8 flex items-center justify-between h-20 relative container-max">
            
            {/* Desktop Logo & Brand Name on Left */}
            <div className="hidden md:flex items-center">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-primary-50 p-1 shadow-sm">
                  <img src="/logo.png" alt="Logo" className="h-11 w-auto object-contain rounded-md" />
                </div>
                <div className="flex flex-col">
                  <span className="text-navy-800 font-heading font-black text-base lg:text-lg uppercase tracking-wide group-hover:text-primary-600 transition-colors leading-none">
                    Nova Max <span className="text-primary-600">Hospital</span>
                  </span>
                  <span className="text-[9px] text-gray-500 font-semibold tracking-wider mt-1 truncate max-w-[280px]">
                    Specialty Urology &amp; Surgery Hospital
                  </span>
                </div>
              </Link>
            </div>

            {/* Mobile Logo & Actions & Toggle */}
            <div className="flex md:hidden items-center justify-between w-full gap-1">
              <Link to="/" className="flex items-center gap-1.5 shrink-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-50 p-1 shadow-sm">
                  <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain rounded-md" />
                </div>
                <span className="font-heading font-extrabold text-xs text-navy-800 tracking-wider uppercase leading-none">
                  Nova Max <span className="text-primary-600 hidden min-[360px]:inline">Hospital</span>
                </span>
              </Link>


              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 text-navy-800 hover:text-primary-600 shrink-0">
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen
                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><FiX size={20} /></motion.span>
                    : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><FiMenu size={20} /></motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>

            {/* Desktop Nav Links (Centered / Flex layout) */}
            <ul className="hidden md:flex items-center gap-0.5 lg:gap-1.5 ml-auto mr-6">
              {NAV_LINKS.map(({ label, to, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end}
                    className={({ isActive }) =>
                      `px-2.5 lg:px-3 py-2 text-xs lg:text-[11px] font-extrabold tracking-wider transition-all duration-200 block nav-link-line relative ${
                        isActive
                          ? 'text-primary-600 active-link font-black'
                          : 'text-navy-700 hover:text-primary-600'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            

          </nav>

          {/* Mobile Quick Action Bar (Book & Call) */}
          <div className="flex md:hidden bg-slate-50 border-t border-gray-100 px-4 py-2.5 justify-between items-center gap-3 w-full">
            <Link
              to="/book-appointment"
              className="flex-1 flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-xl text-center text-xs font-extrabold tracking-wide uppercase transition-colors shadow-sm"
            >
              <FiCalendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
            <a
              href={`tel:${siteData.contact.phone}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-accent-600 hover:bg-accent-700 text-white py-2 rounded-xl text-center text-xs font-extrabold tracking-wide uppercase transition-colors shadow-sm"
            >
              <FiPhone className="w-3.5 h-3.5 animate-pulse text-accent-100" />
              <span>Call: {siteData.contact.phone}</span>
            </a>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
              >
                <div className="w-full px-4 py-4 space-y-1">
                  {NAV_LINKS.map(({ label, to, end }, i) => (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <NavLink to={to} end={end} onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                              : 'text-gray-700 hover:bg-primary-50/30 hover:text-primary-600'
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
                    transition={{ delay: 0.25 }}
                    className="pt-4 border-t border-gray-100 flex flex-col gap-3 pb-4"
                  >
                    <a href={`tel:${siteData.contact.phone}`}
                      className="inline-flex items-center justify-center gap-2 text-sm py-3 px-5 bg-primary-600 text-white font-bold rounded-full shadow-md hover:bg-primary-700 transition-colors"
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
