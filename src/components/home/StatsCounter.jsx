// ─────────────────────────────────────────────────────────────
// components/home/StatsCounter.jsx
// Animated number counters for key hospital stats.
// Each counter uses requestAnimationFrame with a cubic-ease-out
// curve and only starts when the element scrolls into view
// (via framer-motion's useInView with once:true).
// Stats are sourced from siteData.stats.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { siteData } from '../../data/siteData'

function Counter({ value, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="relative z-30 max-w-5xl mx-auto px-4 -mt-12 md:-mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-navy-800 rounded-3xl py-8 md:py-10 px-6 md:px-10 shadow-2xl shadow-navy-950/45 border border-navy-700/50 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/10 text-center"
      >
        {siteData.stats.map(({ label, value, suffix, emoji }, i) => (
          <div key={label} className="px-4">
            <div className="text-3xl md:text-4xl mb-2.5 filter drop-shadow-sm select-none">{emoji}</div>
            <h3 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-2">
              <Counter value={value} suffix={suffix} />
            </h3>
            <p className="text-primary-300 font-semibold text-[10px] lg:text-xs uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
