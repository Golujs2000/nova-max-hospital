// ─────────────────────────────────────────────────────────────
// components/home/Testimonials.jsx
// Patient testimonial carousel — redesigned with white cards,
// blue top border, quote icon decoration, Google badge.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Sonal Kumar',
    location: 'Google Review',
    dept: 'Patient Experience',
    rating: 5,
    date: '2 days ago',
    text: 'My experience here was excellent. The hospital maintains a very high standard of cleanliness, which creates a positive environment. The doctors and nursing staff are very helpful, compassionate, and experienced — they took great care of me every step of the way. The entire admission and discharge process was very smooth and hassle-free. I would definitely recommend this hospital to anyone.',
    initials: 'SK',
    verified: true,
  },
  {
    name: 'Nikhil Pratap',
    location: 'Google Review',
    dept: 'Patient Experience',
    rating: 5,
    date: '20 Jan 2025',
    text: 'The level of service received in this hospital is highly commendable. The staff were proactive about care and great cheerleaders for their patients. The staff were helpful, professional, and went out of their way to make me as comfortable as possible.',
    initials: 'NP',
    verified: true,
  },
]

function TestimonialCard({ item }) {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full border border-primary-100/40">
      {/* Blue top border accent */}
      <div className="h-1 bg-gradient-to-r from-primary-600 to-accent-400 w-full" />

      <div className="p-6 md:p-8 flex flex-col flex-1">
        {/* Large decorative quote icon */}
        <FaQuoteLeft className="w-8 h-8 text-primary-100 mb-3" />

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(item.rating)].map((_, i) => (
            <FiStar key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
          {/* Google badge */}
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </span>
        </div>

        <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed italic flex-1 mb-6">
          "{item.text}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
          <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="font-heading font-bold text-white text-sm">{item.initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-heading font-bold text-navy-800 text-sm truncate">{item.name}</p>
              {item.verified && (
                <span className="inline-flex items-center gap-0.5 text-[10px] bg-green-50 border border-green-200 text-green-600 px-2 py-0.5 rounded-full font-medium shrink-0">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">{item.location} · {item.date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const totalPages = Math.ceil(testimonials.length / 2)

  const prev = () => setActive((a) => (a === 0 ? totalPages - 1 : a - 1))
  const next = () => setActive((a) => (a === totalPages - 1 ? 0 : a + 1))

  return (
    <section className="relative section-padding overflow-hidden" style={{ backgroundColor: '#e8f4fd' }}>

      {/* Decorative quote in background */}
      <div className="absolute top-8 right-8 md:right-20 text-[14rem] font-serif text-primary-600/[0.04] leading-none select-none pointer-events-none">❝</div>

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Patient Reviews
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-navy-800 mb-4">
            What Our <span className="text-primary-600">Clients Say</span>
          </h2>
          <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {[0, 1].map((offset) => {
                const index = active * 2 + offset
                const item = testimonials[index]
                if (!item) return null
                return <TestimonialCard key={item.name} item={item} />
              })}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-11 h-11 bg-white border border-primary-200 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-200 shadow-sm text-primary-600"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-primary-600' : 'w-2.5 bg-primary-200 hover:bg-primary-400'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 bg-white border border-primary-200 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-200 shadow-sm text-primary-600"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
