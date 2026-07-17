// ─────────────────────────────────────────────────────────────
// components/Footer.jsx
// Redesigned footer with full department + treatment + doctor links.
// Layout:
//   Row 1 — Brand | Quick Links | Contact Us
//   Row 2 — All Departments & Treatments (full-width grid)
//   Row 3 — Our Doctors (full-width grid)
//   Row 4 — Copyright / legal bar
// ─────────────────────────────────────────────────────────────

import { Link } from 'react-router-dom'
import {
  FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiLinkedin,
  FiPhone, FiMail, FiMapPin, FiClock, FiChevronRight, FiUser,
} from 'react-icons/fi'
import { siteData } from '../data/siteData'
import { useCategories } from '../hooks/useCategories'
import { useDoctors } from '../hooks/useDoctors'

const quickLinks = [
  { label: 'Home',              to: '/' },
  { label: 'About Us',          to: '/about' },
  { label: 'Our Doctors',       to: '/doctors' },
  { label: 'Hospital Depts',    to: '/hospital-departments' },
  { label: 'Surgical Services', to: '/surgical-services' },
  { label: 'Critical Care',     to: '/critical-care' },
  { label: 'Facilities & Diagnostics',to: '/facilities-diagnostics' },
  { label: 'Book Appointment',  to: '/book-appointment' },
  { label: 'Gallery',           to: '/gallery' },
  { label: 'Blog',              to: '/blog' },
  { label: 'Contact',           to: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy',    to: '/privacy-policy' },
  { label: 'Terms & Conditions',to: '/terms' },
  { label: 'Data Deletion',     to: '/data-deletion' },
]

const socialIcons = {
  facebook:  FiFacebook,
  instagram: FiInstagram,
  twitter:   FiTwitter,
  youtube:   FiYoutube,
  linkedin:  FiLinkedin,
}

// Category accent colours for department headers
const catColor = {
  'General':     'text-blue-400 border-blue-400/40',
  'Skin':        'text-teal-400 border-teal-400/40',
  'Digestive':   'text-green-400 border-green-400/40',
  'Respiratory': 'text-sky-400 border-sky-400/40',
  'Women':       'text-pink-400 border-pink-400/40',
  'Musculo':     'text-amber-400 border-amber-400/40',
  'Neuro':       'text-purple-400 border-purple-400/40',
  'Chronic':     'text-red-400 border-red-400/40',
  'Urology':     'text-cyan-400 border-cyan-400/40',
  'Children':    'text-orange-400 border-orange-400/40',
  'Men':         'text-indigo-400 border-indigo-400/40',
}
const defaultCat = 'text-primary-400 border-primary-400/40'

export default function Footer() {
  const { categories: departments } = useCategories()
  const { doctors } = useDoctors()

  return (
    <footer className="text-gray-300">
      
      {/* — Top Call to Action Row — */}
      <div className="bg-primary-600">
        <div className="container-max px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left text-white divide-y md:divide-y-0 md:divide-x divide-primary-500/50">
            
            {/* Emergency Helpline */}
            <div className="md:pr-8 pt-4 md:pt-0">
              <h4 className="font-heading font-bold text-lg uppercase tracking-wider mb-4">24/7 Emergency Helpline</h4>
              <p className="text-white/80 text-sm mb-3">For immediate medical assistance, call our emergency ward.</p>
              <a href={`tel:${siteData.contact.phone}`} className="inline-block bg-white text-primary-700 px-6 py-2.5 font-black text-sm tracking-widest hover:bg-primary-50 transition-colors rounded-full shadow-md">
                CALL {siteData.contact.phone}
              </a>
            </div>

            {/* Map */}
            <div className="md:px-8 pt-6 md:pt-0 flex flex-col items-center md:items-start justify-center">
              <h4 className="font-heading font-bold text-lg uppercase tracking-wider mb-4">Branch On The Map</h4>
              <a href={siteData.social?.googleMaps || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white hover:underline uppercase tracking-wide">
                <FiMapPin className="w-4 h-4" />
                View Map Directions
              </a>
            </div>

            {/* Doctors */}
            <div className="md:pl-8 pt-6 md:pt-0 flex flex-col items-center md:items-start justify-center">
              <h4 className="font-heading font-bold text-lg uppercase tracking-wider mb-4">Meet Our Doctors</h4>
              <Link to="/doctors" className="inline-block bg-white text-primary-700 px-6 py-2.5 font-bold text-xs tracking-wider hover:bg-primary-50 transition-colors rounded-full shadow-md">
                VIEW ALL DOCTORS
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-navy-900">
        {/* — Row 1: Brand / Quick Links / Contact — */}
        <div className="container-max px-4 md:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src="/logo.png"
                alt={`${siteData.name} Logo`}
                className="w-14 h-14 object-contain shrink-0"
              />
              <div>
                <p className="font-heading font-bold text-white text-lg">{siteData.name}</p>
                <p className="text-xs text-primary-300">{siteData.tagline}</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-sm">{siteData.description}</p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 px-5 rounded-full transition-colors shadow-md"
              >
                📅 Book Appointment
              </Link>
              <a
                href={`tel:${siteData.contact.phone}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FiPhone className="w-4 h-4 text-primary-500" />
                Phone: {siteData.contact.phone}
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {Object.entries(siteData.social).map(([platform, url]) => {
                const Icon = socialIcons[platform]
                return Icon ? (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label={platform}>
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ) : null
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}
                    className="text-sm text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                    <FiChevronRight className="w-3 h-3 text-primary-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <FiMapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <span className="text-white/90">{siteData.contact.address}</span>
              </li>
              <li className="flex gap-3 items-start">
                <FiPhone className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  {[
                    siteData.contact.phone,
                    siteData.contact.phone2,
                    siteData.contact.phone3,
                    siteData.contact.phone4
                  ]
                    .filter(Boolean)
                    .map((ph) => (
                      <a key={ph} href={`tel:${ph}`}
                        className="block text-white/90 hover:text-white transition-colors">
                        {ph}
                      </a>
                    ))}
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <FiMail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href={`mailto:${siteData.contact.email}`}
                  className="text-white/90 hover:text-white transition-colors break-all">
                  {siteData.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <div className="flex items-center gap-2">
                  <FiClock className="text-white/60" />
                  <p className="text-white/90">{siteData.contact.hours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/10" />

      {/* ── Row 2: Departments & Treatments ── */}
      {departments.length > 0 && (
        <div className="container-max px-4 md:px-8 py-10">
          <h4 className="font-heading font-semibold text-white mb-8 text-sm uppercase tracking-wider flex items-center gap-3">
            <span className="w-6 h-px bg-primary-500 inline-block" />
            Departments &amp; Treatments
            <span className="w-6 h-px bg-primary-500 inline-block" />
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {departments.map((spec) => {
              const color = catColor[spec.category] || defaultCat
              const treatments = Array.isArray(spec.treatments) ? spec.treatments : []
              const isIconUrl = spec.icon && (spec.icon.startsWith('http') || spec.icon.startsWith('/') || spec.icon.includes('.'))
              return (
                <div key={spec.id}>
                  {/* Department header */}
                  <Link
                    to={`/services/${spec.slug}`}
                    className={`inline-flex items-center gap-1.5 font-heading font-bold text-xs uppercase tracking-wider mb-3 border-b pb-2 w-full ${color} hover:opacity-80 transition-opacity`}
                  >
                    {spec.icon && (
                      isIconUrl ? (
                        <img src={spec.icon} alt={spec.name} className="w-5 h-5 object-contain shrink-0" />
                      ) : (
                        <span className="text-xl leading-none">{spec.icon}</span>
                      )
                    )}
                    {spec.name}
                  </Link>

                  {/* Treatment links */}
                  <ul className="space-y-1.5">
                    {treatments.map((t, i) => (
                      <li key={i}>
                        <Link
                          to={`/services/${spec.slug}/treatment/${t.slug}`}
                          className="text-xs text-white/80 hover:text-white transition-colors flex items-start gap-1.5 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-primary-400 mt-1.5 shrink-0 transition-colors" />
                          {t.name}
                        </Link>
                      </li>
                    ))}
                    {treatments.length === 0 && (
                      <li>
                        <Link
                          to={`/services/${spec.slug}`}
                          className="text-xs text-gray-600 hover:text-primary-300 transition-colors"
                        >
                          View treatments →
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Row 3: Our Doctors ── */}
      {doctors.length > 0 && (
        <>
          <div className="border-t border-white/10" />
          <div className="container-max px-4 md:px-8 py-10">
            <h4 className="font-heading font-semibold text-white mb-8 text-sm uppercase tracking-wider flex items-center gap-3">
              <span className="w-6 h-px bg-primary-500 inline-block" />
              Our Doctors
              <span className="w-6 h-px bg-primary-500 inline-block" />
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {doctors.map((doctor) => (
                <Link
                  key={doctor.id}
                  to={`/doctors/${doctor.slug || doctor.id}`}
                  className="flex items-center gap-2.5 group p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {/* Avatar */}
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/10 group-hover:border-primary-400/50 transition-colors"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary-400/50 transition-colors">
                      <FiUser className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white group-hover:text-primary-300 transition-colors truncate leading-tight">
                      {doctor.name}
                    </p>
                    {doctor.specialty && (
                      <p className="text-[10px] text-gray-500 truncate leading-tight mt-0.5">{doctor.specialty}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5">
              <Link to="/doctors" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                View all doctors →
              </Link>
            </div>
          </div>
        </>
      )}

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-max px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map(({ label, to }) => (
              <Link key={to} to={to} className="hover:text-white transition-colors">{label}</Link>
            ))}
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>

      </div>
    </footer>
  )
}
