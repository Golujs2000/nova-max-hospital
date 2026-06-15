// ─────────────────────────────────────────────────────────────
// pages/Gallery.jsx
// Full gallery page with folder-based filtering, lazy-loaded
// image grid, and a full-screen lightbox with keyboard navigation.
// Folders are fetched from Firestore; "All" tab shows every image.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useGallery } from '../hooks/useGallery'
import { getFolders } from '../services/gallery'

export default function Gallery() {
  const [folders, setFolders] = useState([])
  const [activeFolderId, setActiveFolderId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [lightbox, setLightbox] = useState(null)
  const { images, loading } = useGallery(activeFolderId)

  useEffect(() => {
    getFolders().then(data => {
      const sorted = [...data].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setFolders(sorted);
    }).catch(() => {})
  }, [])

  // Filter folders to only include infrastructure, treatment, and awards folders
  const allowedFolders = useMemo(() => {
    return folders.filter(f => {
      const name = f.name?.toLowerCase() || '';
      return name.includes('infrastructure') ||
             name.includes('treatment') ||
             name.includes('awards') ||
             name.includes('achievement');
    });
  }, [folders]);

  const allowedFolderIds = useMemo(() => {
    return allowedFolders.map(f => f.id);
  }, [allowedFolders]);

  const displayImages = useMemo(() => {
    if (!images) return []

    // Only show images from allowed folders (infrastructure and treatment)
    let result = images.filter(img => allowedFolderIds.includes(img.folderId))

    // Apply Search Filter (if any)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(img => {
        const title = img.title?.toLowerCase() || ''
        const folder = allowedFolders.find(f => f.id === img.folderId)
        const folderName = folder?.name?.toLowerCase() || ''
        return title.includes(q) || folderName.includes(q)
      })
    }

    // Sort by order/title
    result.sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      const titleA = a.title?.toLowerCase() || '';
      const titleB = b.title?.toLowerCase() || '';
      return titleA.localeCompare(titleB);
    });

    return result
  }, [images, allowedFolders, allowedFolderIds, searchQuery])

  const openLightbox = (i) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox((i) => (i === 0 ? displayImages.length - 1 : i - 1))
  const next = () => setLightbox((i) => (i === displayImages.length - 1 ? 0 : i + 1))

  return (
    <>
      <SEO
        title="Gallery"
        description="Explore Sarvada Hospito Care's welcoming facility, diagnostic equipment, and clinic environment through our photo gallery."
      />

      {/* Hero */}
      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            A visual tour of our world-class facilities and treatment capabilities.
          </p>
        </motion.div>
      </section>

      {/* Filter tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-[64px] z-30 shadow-sm">
        <div className="container-max px-4 md:px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <span className="text-gray-400 text-[11px] font-bold tracking-widest uppercase whitespace-nowrap">Category:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFolderId('')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  activeFolderId === ''
                    ? 'bg-navy-800 text-white border-navy-800 shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-primary-400 hover:text-primary-600'
                }`}
              >
                All Photos
              </button>
              {allowedFolders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolderId(folder.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    activeFolderId === folder.id
                      ? 'bg-navy-800 text-white border-navy-800 shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-primary-400 hover:text-primary-600'
                  }`}
                >
                  {folder.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : displayImages.length === 0 ? (
            <div className="text-center py-20">
              <FiImage className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 text-lg">No images here yet.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {displayImages.map((img, i) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative"
                    onClick={() => openLightbox(i)}
                  >
                    {img.type === 'video' ? (
                      <div className="w-full h-full relative">
                        <video
                          src={img.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
                          <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    ) : img.image ? (
                      <img
                        src={img.image}
                        alt={img.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                        <FiImage className="w-10 h-10 text-primary-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <p className="text-white font-semibold text-sm">{img.title}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={closeLightbox}
            >
              <FiX className="w-6 h-6" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
              onClick={(e) => { e.stopPropagation(); prev() }}
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
               {displayImages[lightbox]?.type === 'video' ? (
                <video
                  src={displayImages[lightbox].image}
                  controls
                  autoPlay
                  className="w-full h-full object-contain rounded-xl max-h-[80vh]"
                />
              ) : displayImages[lightbox]?.image ? (
                <img
                  src={displayImages[lightbox].image}
                  alt={displayImages[lightbox].title}
                  className="w-full h-full object-contain rounded-xl max-h-[80vh]"
                />
              ) : (
                <div className="w-full h-80 bg-gray-800 rounded-xl flex items-center justify-center">
                  <FiImage className="w-20 h-20 text-gray-600" />
                </div>
              )}
              <p className="text-white text-center mt-4 font-medium">{displayImages[lightbox]?.title}</p>
            </motion.div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
              onClick={(e) => { e.stopPropagation(); next() }}
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            <p className="absolute bottom-4 text-white/50 text-sm">
              {lightbox + 1} / {displayImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
