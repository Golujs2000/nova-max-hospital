import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiActivity, FiPhoneCall, FiCheckCircle } from 'react-icons/fi'
import { FaUserMd, FaHeartbeat, FaAmbulance, FaAward } from 'react-icons/fa'
import { siteData } from '../../data/siteData'
import { useFeaturedDoctors } from '../../hooks/useDoctors'
import DoctorCard from '../DoctorCard'

// Stats shown inside the hero
const HERO_STATS = [
  { value: '5,000+', label: 'Happy Patients', icon: <FaHeartbeat className="w-5 h-5" /> },
  { value: '5+',    label: 'Expert Doctors',  icon: <FaUserMd className="w-5 h-5" /> },
  { value: '2,000+', label: 'Operations',      icon: <FaAmbulance className="w-5 h-5" /> },
  { value: '2026',    label: 'Established',      icon: <FaAward className="w-5 h-5" /> },
]

const TRUST_POINTS = [
  'Urology & Advanced Laparoscopy',
  'Modern Modular Operation Theatre & ICU',
  'Hemodialysis & In-house Pathology Lab',
  'Male Infertility & Sexology Care',
]

export default function HeroSection() {
  const { doctors: featured } = useFeaturedDoctors()
  const featuredDoc = featured && featured.length > 0 ? featured[0] : null
  return (
    <section className="relative bg-white overflow-hidden">

      {/* ── Decorative Background Circles ── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(25,118,210,0.08) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(41,182,246,0.07) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />
      {/* Dot grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #1976D2 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* ── Main Hero Content ── */}
      <div className="container-max px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[580px] md:min-h-[640px] py-12 md:py-16">

          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:order-1"
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-5 border border-primary-200">
              <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
              Your Partner in Health &amp; Wellness
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.1] mb-5 text-navy-800">
              Expert <span className="text-primary-600">Urology</span> &amp; <br className="hidden md:inline" />
              <span className="text-accent-500">General Surgery</span> <br className="hidden md:inline" />
              Hospital in Patna
            </h1>

            {/* Highlight Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-primary-50 text-primary-700 text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full border border-primary-100 flex items-center gap-1.5">
                <FiCheckCircle className="w-3.5 h-3.5 text-primary-600" />
                5000+ Successful Surgeries
              </span>
              <span className="bg-primary-50 text-primary-700 text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full border border-primary-100 flex items-center gap-1.5">
                <FiCheckCircle className="w-3.5 h-3.5 text-primary-600" />
                15+ Years Experience
              </span>
              <span className="bg-primary-50 text-primary-700 text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full border border-primary-100 flex items-center gap-1.5">
                <FiCheckCircle className="w-3.5 h-3.5 text-primary-600" />
                Same-Day Appointments
              </span>
            </div>

            <p className="text-gray-500 text-base md:text-lg mb-7 max-w-xl leading-relaxed">
              {siteData.name} — offering expert care in urology, laparoscopy, uro gynecology, male infertility, sexology, and general surgeries in Digha, Patna.
            </p>

            {/* Trust Points */}
            <ul className="space-y-2.5 mb-8">
              {TRUST_POINTS.map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <FiCheckCircle className="w-4 h-4 text-primary-600 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link to="/book-appointment"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-7 py-3.5 rounded-full font-bold shadow-btn hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300 group"
              >
                <FiCalendar className="w-4 h-4" />
                Book Appointment
              </Link>
              <a href={`tel:${siteData.contact.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 bg-white border-2 border-primary-600 text-primary-700 px-7 py-3.5 rounded-full font-bold hover:bg-primary-50 hover:shadow-card transition-all duration-300"
              >
                <FiPhoneCall className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </motion.div>

          {/* Right — Doctor Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:order-2 relative flex justify-center lg:justify-end w-full"
          >
            {/* Large decorative circle behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-primary-100/50 pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-[550px]">
              {featuredDoc ? (
                <DoctorCard doc={featuredDoc} />
              ) : (
                <div className="w-full h-80 bg-gray-100 rounded-2xl animate-pulse" />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 bg-primary-600 text-white"
      >
        <div className="container-max px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-500">
            {HERO_STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 py-6 px-4 md:px-8 group hover:bg-primary-700 transition-colors duration-200">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                  {stat.icon}
                </div>
                <div>
                  <p className="font-heading font-black text-2xl md:text-3xl leading-none">{stat.value}</p>
                  <p className="text-primary-200 text-xs font-medium mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── 3 Quick Action Blocks ── */}
      <div className="container-max px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl overflow-hidden shadow-card-hover border border-primary-100">
          
          <Link to="/hospital-departments" className="bg-primary-700 hover:bg-primary-800 transition-all duration-300 text-white p-7 md:p-8 flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
              <FiActivity className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base tracking-wider uppercase mb-1">Medical Services</h3>
              <p className="text-xs text-white/70">Explore our specialties</p>
            </div>
          </Link>

          <Link to="/contact" className="bg-primary-600 hover:bg-primary-700 transition-all duration-300 text-white p-7 md:p-8 flex items-center gap-5 group border-y sm:border-y-0 sm:border-x border-primary-500">
            <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
              <FiClock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base tracking-wider uppercase mb-1">Open 24 / 7</h3>
              <p className="text-xs text-white/70">Emergency care always ready</p>
            </div>
          </Link>

          <Link to="/book-appointment" className="bg-accent-500 hover:bg-accent-600 transition-all duration-300 text-white p-7 md:p-8 flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
              <FiCalendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base tracking-wider uppercase mb-1">Book Appointment</h3>
              <p className="text-xs text-white/70">Visit our specialists today</p>
            </div>
          </Link>

        </div>
      </div>

    </section>
  )
}
