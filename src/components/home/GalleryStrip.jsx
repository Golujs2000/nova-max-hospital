// ─────────────────────────────────────────────────────────────
// components/home/GalleryStrip.jsx
// Hospital infrastructure gallery section on the homepage.
// Fetches images from the "home gallery" Firestore folder.
// Layout:
//   - Stats banner (beds, departments, specialists, 24/7 ER)
//   - Bento mosaic grid (first 5 images, feature tile + 4 small)
//   - Remaining images in a uniform square grid
//   - CTA linking to the full /gallery page
// Includes a full-screen Lightbox with keyboard navigation
// (Escape to close, arrow keys to navigate).
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiImage, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaUserMd, FaHeartbeat, FaAmbulance, FaCalendarCheck } from 'react-icons/fa'
import { getGalleryByFolderName } from '../../services/gallery'
import { siteData } from '../../data/siteData'

const STATS = [
  { value: '5,000+', label: 'Satisfied Patients',    icon: <FaHeartbeat className="w-6 h-6" /> },
  { value: '2026',   label: 'Year Established',      icon: <FaCalendarCheck className="w-6 h-6" /> },
  { value: '5+',    label: 'Expert Doctors',        icon: <FaUserMd className="w-6 h-6" /> },
  { value: '2,000+', label: 'Successful Operations', icon: <FaAmbulance className="w-6 h-6" /> },
]

// ── Lightbox ──────────────────────────────────────────────────────────────────
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
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {img.type === 'video' ? (
            <video
              src={img.image}
              controls
              autoPlay
              className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
          ) : (
            <img
              src={img.image}
              alt={img.title || 'Facility'}
              className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
          )}
          {img.title && (
            <p className="text-white/70 text-sm mt-3">{img.title}</p>
          )}
          {images.length > 1 && (
            <p className="text-white/40 text-xs mt-1">{current + 1} / {images.length}</p>
          )}
        </motion.div>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// Strip trailing numbers and format title nicely
const cleanTitle = (title = '') =>
  title
    .replace(/[-_\s]+\d+$/, '')
    .replace(/[-_]/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()) || siteData.name

// ── Tiles ─────────────────────────────────────────────────────────────────────
function MediaRender({ img, className = '', scaleClass = 'group-hover:scale-105' }) {
  if (img.type === 'video') {
    return (
      <div className={`w-full h-full relative overflow-hidden ${className}`}>
        <video
          src={img.image}
          className={`w-full h-full object-cover transition-transform duration-500 ${scaleClass}`}
          muted
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/35 transition-colors duration-300">
          <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shadow-md group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
    )
  }
  return (
    <img
      src={img.image}
      alt={img.title || 'Facility'}
      className={`w-full h-full object-cover transition-transform duration-500 ${scaleClass} ${className}`}
      loading="lazy"
    />
  )
}

function PlaceholderTile({ className = '' }) {
  return (
    <div className={`bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center rounded-2xl ${className}`}>
      <FiImage className="w-8 h-8 text-primary-300" />
    </div>
  )
}

function ImgTile({ img, className = '', large = false, onClick }) {
  if (!img) return <PlaceholderTile className={className} />
  return (
    <div
      className={`overflow-hidden rounded-[5px] group relative cursor-pointer ${className}`}
      onClick={onClick}
    >
      <MediaRender
        img={img}
        scaleClass={large ? 'group-hover:scale-105 duration-1000' : 'group-hover:scale-105 duration-700'}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-[5px] flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          View
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
        <span className="text-white text-[11px] font-semibold tracking-wide drop-shadow-md">
          {cleanTitle(img.title)}
        </span>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function GalleryStrip() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    getGalleryByFolderName('infrastructure')
      .then(setImages)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const all    = images.slice(0, 20)
  const mosaic = all.slice(0, 5)
  const grid   = all.slice(5, 20)

  return (
    <section className="bg-white">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 border-b border-primary-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-200/40 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent-200/30 blur-[80px]" />
        </div>
        <div className="container-max section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Our Infrastructure
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 leading-tight text-navy-800">
              Modern Clinic <span className="text-primary-600">Infrastructure</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Established in 2026, {siteData.name} provides a calm, welcoming environment designed for your comfort. With a dedicated team of over 5 expert doctors, our infrastructure is optimized for focused consultation and effective surgical healing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-white border border-primary-100 rounded-2xl px-6 py-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center justify-center group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-3 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 border border-primary-100 group-hover:border-primary-600">
                  {s.icon}
                </div>
                <p className="font-heading text-3xl font-black text-primary-600 leading-none">{s.value}</p>
                <p className="text-gray-500 text-sm mt-1.5 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bento Mosaic ── */}
      <div className="container-max pt-10 pb-4">
        {loading ? (
          <>
            {/* Mobile skeleton */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-[5px] animate-pulse" />
              ))}
            </div>
            {/* Desktop skeleton */}
            <div className="hidden md:grid grid-cols-4 gap-3" style={{ gridTemplateRows: '240px 240px' }}>
              <div className="col-span-2 row-span-2 bg-gray-100 rounded-[5px] animate-pulse" />
              <div className="col-span-1 bg-gray-100 rounded-[5px] animate-pulse" />
              <div className="col-span-1 bg-gray-100 rounded-[5px] animate-pulse" />
              <div className="col-span-1 bg-gray-100 rounded-[5px] animate-pulse" />
              <div className="col-span-1 bg-gray-100 rounded-[5px] animate-pulse" />
            </div>
          </>
        ) : (
          <>
            {/* Mobile: simple 2-col grid */}
             <div className="grid grid-cols-2 gap-3 md:hidden">
              {mosaic.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-[5px] group relative cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  {img ? (
                    <>
                      <MediaRender img={img} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                        <span className="text-white text-[11px] font-semibold tracking-wide drop-shadow-md">
                          {cleanTitle(img.title)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <FiImage className="w-8 h-8 text-primary-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: bento mosaic */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden md:grid grid-cols-4 gap-3"
              style={{ gridTemplateRows: '240px 240px' }}
            >
              <ImgTile img={mosaic[0]} className="col-span-2 row-span-2 h-full" large onClick={() => openLightbox(0)} />
              <ImgTile img={mosaic[1]} className="col-span-1 h-full" onClick={() => openLightbox(1)} />
              <ImgTile img={mosaic[2]} className="col-span-1 h-full" onClick={() => openLightbox(2)} />
              <ImgTile img={mosaic[3]} className="col-span-1 h-full" onClick={() => openLightbox(3)} />
              <ImgTile img={mosaic[4]} className="col-span-1 h-full" onClick={() => openLightbox(4)} />
            </motion.div>
          </>
        )}
      </div>

      {/* ── Remaining grid ── */}
      {!loading && grid.length > 0 && (
        <div className="container-max pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {grid.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.05 }}
                className="aspect-square rounded-[5px] overflow-hidden group relative cursor-pointer"
                onClick={() => openLightbox(5 + i)}
              >
                <MediaRender img={img} scaleClass="group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center rounded-[5px]">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    View
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                  <span className="text-white text-[11px] font-semibold tracking-wide drop-shadow-md">
                    {cleanTitle(img.title)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="container-max text-center py-10">
        <Link to="/gallery" className="btn-primary">
          View Full Gallery <FiArrowRight />
        </Link>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox images={all} index={lightboxIndex} onClose={closeLightbox} />
      )}

    </section>
  )
}
