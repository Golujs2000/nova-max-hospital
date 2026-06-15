import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiX, FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi'
import { getGalleryByFolderName } from '../../services/gallery'

// ── Lightbox ──────────────────────────────────────────────────
function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index)
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  const img = images[current]
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
          <FiX className="w-5 h-5" />
        </button>
        {images.length > 1 && (
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
            <FiChevronLeft className="w-6 h-6" />
          </button>
        )}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={img.image} alt={img.title || 'Treatment'} className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl" />
          {img.title && <p className="text-white/70 text-sm mt-3">{img.title}</p>}
          {images.length > 1 && <p className="text-white/40 text-xs mt-1">{current + 1} / {images.length}</p>}
        </motion.div>
        {images.length > 1 && (
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
            <FiChevronRight className="w-6 h-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// ── Default Fallback Images ────────────────────────────────────
const DEFAULT_IMAGES = [
  {
    id: 'def-1',
    image: '/gallery/hospital_ot.webp',
    title: 'State-of-the-Art OT'
  },
  {
    id: 'def-2',
    image: '/gallery/hospital_icu.webp',
    title: 'Intensive Care Unit (ICU)'
  },
  {
    id: 'def-3',
    image: '/gallery/hospital_pathology.webp',
    title: 'Pathology Diagnostics'
  },
  {
    id: 'def-4',
    image: '/gallery/hospital_ultrasound.webp',
    title: 'Advanced Ultrasound'
  },
  {
    id: 'def-5',
    image: '/gallery/hospital_emergency.webp',
    title: '24/7 Trauma Care'
  },
  {
    id: 'def-6',
    image: '/gallery/hospital_dialysis.webp',
    title: 'Dialysis Unit'
  },
  {
    id: 'def-7',
    image: '/gallery/hospital_ward.webp',
    title: 'Patient AC Ward'
  },
  {
    id: 'def-8',
    image: '/gallery/hospital_xray.webp',
    title: 'Digital X-Ray'
  },
  {
    id: 'def-9',
    image: '/gallery/hospital_ecg.webp',
    title: 'ECG & 2D Echo'
  },
  {
    id: 'def-10',
    image: '/gallery/hospital_maternity.webp',
    title: 'Maternity & Gynecology'
  },
  {
    id: 'def-11',
    image: '/gallery/hospital_opd.webp',
    title: 'Modern OPD'
  },
  {
    id: 'def-12',
    image: '/gallery/hospital_ambulance.webp',
    title: 'Ambulance Service'
  }
]

// ── Main ──────────────────────────────────────────────────────
export default function TreatmentGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    getGalleryByFolderName('treatment gallery')
      .then(setImages)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const displayImages = images && images.length > 0 ? images : DEFAULT_IMAGES

  return (
    <section className="section-padding bg-gradient-to-b from-slate-50 to-white border-t border-b border-gray-100">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Treatment Gallery
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 leading-tight">
            Our Treatments &amp;{' '}
            <span className="text-primary-600">Procedures</span>
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            A glimpse into the healing environment, diagnostics, and treatments at Sarvada Hospito Care, Anand palace, Bypass Rd, changer, Kankarbagh, Patna.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-100 rounded-[5px] animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {displayImages.slice(0, 12).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.07 }}
                className="aspect-[4/3] rounded-[5px] overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.image}
                  alt={img.title || 'Treatment'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-[5px] flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    View
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                  <span className="text-white text-[11px] font-semibold tracking-wide drop-shadow-md">
                    {img.title}
                  </span>
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiImage className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        {!loading && displayImages.length > 0 && (
          <div className="text-center mt-10">
            <Link to="/gallery" className="btn-primary">
              View Full Gallery <FiArrowRight />
            </Link>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={displayImages.slice(0, 12)} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </section>
  )
}
