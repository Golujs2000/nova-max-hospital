// ─────────────────────────────────────────────────────────────
// pages/Home.jsx
// The main homepage — composes all home section components.
// Updated layout order to match reference medical website.
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiCalendar, FiCheckCircle, FiClock, FiAward, FiUsers } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useCategories } from '../hooks/useCategories'
import HeroSection from '../components/home/HeroSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import ServicesSection from '../components/home/ServicesSection'
import GalleryStrip from '../components/home/GalleryStrip'
import FeaturedDoctors from '../components/home/FeaturedDoctors'
import Testimonials from '../components/home/Testimonials'
import AppointmentForm from '../components/home/AppointmentForm'
import { siteData } from '../data/siteData'

const hospitalSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: siteData.name,
  url: siteData.url,
  logo: `${siteData.url}/logo.png`,
  description: siteData.description,
  telephone: `+91${siteData.contact.phone}`,
  email: siteData.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteData.contact.streetAddress || "Multi-speciality Hospital, opposite Women's ITI College, beside HDFC Bank or Ziom, Digha",
    addressLocality: siteData.contact.addressLocality || 'Patna',
    addressRegion: siteData.contact.addressRegion || 'Bihar',
    postalCode: siteData.contact.postalCode || '800011',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '17:00' },
  ],
  medicalSpecialty: [],
  availableService: [],
  sameAs: [siteData.social.facebook, siteData.social.instagram],
}

// Trust points shown inside the appointment section
const TRUST_POINTS = [
  { icon: FiCheckCircle, text: 'Established in 2026' },
  { icon: FiClock,       text: '24/7 Emergency & Trauma Care' },
  { icon: FiAward,       text: 'Advanced Laparoscopic Surgery' },
  { icon: FiUsers,       text: '5,000+ Satisfied Patients' },
]

export default function Home() {
  const { categories: departments } = useCategories()
  const specNames = departments.map(s => s.name)

  return (
    <>
      <SEO
        description={siteData.description}
        keywords={[
          'urology hospital Patna',
          'laparoscopy surgery Digha',
          'kidney stone treatment Patna',
          'male infertility doctor Patna',
          'sexologist in Patna',
          'general surgeon Digha',
          'Dr M K Sinha urologist',
          'Nova Max Hospital Digha'
        ]}
        jsonLd={{
          ...hospitalSchema,
          medicalSpecialty: specNames.length > 0 ? specNames : ['Laparoscopic Surgery', 'Urology', 'General Surgery', 'Gastroenterology'],
          availableService: specNames.length > 0
            ? specNames.map(name => ({ '@type': 'MedicalTherapy', name }))
            : hospitalSchema.availableService
        }}
      />

      {/* 1. Hero — Two-column with doctor photo + stats bar + quick actions */}
      <HeroSection />

      {/* 2. Why Choose Us */}
      <WhyChooseUs />

      {/* 3. Services / Departments — with filter tabs */}
      <ServicesSection />

      {/* 4. Featured Doctors */}
      <FeaturedDoctors />

      {/* 5. Book Appointment — Blue stacked panel */}
      <section id="book-appointment" className="relative overflow-hidden bg-primary-700">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary-600/50 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary-800/50 translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-primary-500/30 pointer-events-none" />

        <div className="container-max px-4 md:px-8 py-16 md:py-24 relative z-10">
          
          {/* Text content container */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-white/30">
              Book Now
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight">
              Appointment
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Fill the form and our team will confirm your appointment within 30 minutes. We are always ready to serve you with the best medical care.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-2xl mx-auto text-left">
              {/* Trust points */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-center">
                <ul className="space-y-4">
                  {TRUST_POINTS.map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0 border border-white/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency hotline */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-center">
                <p className="text-xs font-bold tracking-widest text-primary-200 uppercase mb-2">Emergency Hotline</p>
                <a href={`tel:${siteData.contact.phone}`}
                  className="text-2xl md:text-3xl font-black text-white hover:text-accent-300 transition-colors block"
                >
                  {siteData.contact.phone}
                </a>
                <p className="text-white/60 text-xs mt-2">Available 24 / 7 · Immediate Response</p>
              </div>
            </div>
          </motion.div>

          {/* White form card container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full mt-12"
          >
            <AppointmentForm />
          </motion.div>

        </div>
      </section>

      {/* 6. Facilities & Infrastructure Gallery */}
      <GalleryStrip />

      {/* 8. Patient Testimonials */}
      <Testimonials />

      {/* 9. Location */}
      <section className="section-padding bg-white border-t border-primary-100">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Find Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2">Our Location</h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">Conveniently located in the heart of the city with ample parking.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-96 rounded-2xl overflow-hidden shadow-card-hover border border-primary-100 ring-1 ring-primary-100"
            >
              <iframe
                src={siteData.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${siteData.name} Location`}
              />
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { icon: FiMapPin, label: 'Address',  value: siteData.contact.address,   href: siteData.mapLink, target: '_blank', rel: 'noopener noreferrer', color: 'bg-blue-50 text-blue-600' },
                {
                  icon: FiPhone,
                  label: 'Phone',
                  value: [siteData.contact.phone, siteData.contact.phone2, siteData.contact.phone3, siteData.contact.phone4].filter(Boolean),
                  isPhones: true,
                  color: 'bg-green-50 text-green-600'
                },
                { icon: FiMail, label: 'Email', value: siteData.contact.email, href: `mailto:${siteData.contact.email}`, color: 'bg-purple-50 text-purple-600' },
              ].map(({ icon: Icon, label, value, href, isPhones, color, ...rest }) => (
                <div key={label} className="flex gap-4 p-4 bg-white rounded-2xl border border-primary-100 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-800 text-sm mb-0.5">{label}</h4>
                    {isPhones ? (
                      <div className="flex flex-col gap-1">
                        {value.map((ph) => (
                          <a key={ph} href={`tel:${ph}`} className="text-gray-600 text-sm hover:text-primary-600 transition-colors block">{ph}</a>
                        ))}
                      </div>
                    ) : href ? (
                      <a href={href} {...rest} className="text-gray-600 text-sm hover:text-primary-600 transition-colors">{value}</a>
                    ) : (
                      <p className="text-gray-600 text-sm leading-relaxed">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <Link
                to="/contact"
                className="btn-primary mt-2"
              >
                <FiCalendar /> Get Directions &amp; Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
