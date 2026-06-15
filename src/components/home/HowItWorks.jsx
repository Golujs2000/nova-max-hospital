// ─────────────────────────────────────────────────────────────
// components/home/HowItWorks.jsx
// "Get Care in 3 Easy Steps" section on the homepage.
// Displays three numbered steps (Choose → Book → Receive Care)
// with a decorative connector line on desktop and a CTA button
// linking to the appointment booking page.
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSearch, FiCalendar, FiCheckCircle, FiArrowRight } from 'react-icons/fi'

const steps = [
  {
    number: '01',
    icon: FiSearch,
    title: 'Choose a Department',
    desc: 'Browse our 25+ departments and find the right department or doctor for your health concern.',
    color: 'from-primary-500 to-primary-700',
  },
  {
    number: '02',
    icon: FiCalendar,
    title: 'Book Your Slot',
    desc: 'Pick a convenient date and time. Our team confirms your appointment within 30 minutes.',
    color: 'from-accent-500 to-accent-700',
  },
  {
    number: '03',
    icon: FiCheckCircle,
    title: 'Receive Expert Care',
    desc: 'Visit the hospital, meet your doctor, and get world-class treatment — all in one place.',
    color: 'from-green-500 to-green-700',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary-600 font-semibold text-sm tracking-widest uppercase">Simple Process</span>
          <h2 className="section-title mt-3">Get Care in 3 Easy Steps</h2>
          <p className="section-subtitle mx-auto">
            We've made it effortless to access quality healthcare — no long waits, no confusion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-green-200" />

          {steps.map(({ number, icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Step circle */}
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-xl mb-6 relative z-10`}>
                <div className="text-center">
                  <Icon className="w-8 h-8 text-white mx-auto mb-1" />
                  <span className="text-white/80 text-xs font-bold tracking-widest">{number}</span>
                </div>
              </div>

              <h3 className="font-heading font-bold text-navy-800 text-xl mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/book-appointment" className="btn-primary text-base px-8 py-3.5">
            <FiCalendar /> Book My Appointment <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
