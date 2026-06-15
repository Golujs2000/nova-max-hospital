// ─────────────────────────────────────────────────────────────
// components/admin/GalleryPicker.jsx
// Modal for selecting an image from the Firebase gallery.
// Used by AdminBlog and AdminDoctors to pick a featured image
// without re-uploading — images are loaded from Firestore gallery
// collection. Falls back to LOCAL_PHOTOS placeholder list if
// Firestore returns nothing.
// Calls onSelect(imageUrl) when an image is chosen.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiImage, FiCheck } from 'react-icons/fi'
import { getGallery } from '../../services/gallery'

const LOCAL_PHOTOS = [
  { id: 'l1', image: '/gallery/hospital-1.jpg', title: 'Sarvada Hospito Care' },
  { id: 'l2', image: '/gallery/hospital-2.jpg', title: 'Hospital Building' },
  { id: 'l3', image: '/gallery/hospital-3.jpg', title: 'Medical Facility' },
  { id: 'l4', image: '/gallery/hospital-4.jpg', title: 'Patient Care' },
  { id: 'l5', image: '/gallery/hospital-5.jpg', title: 'Hospital Ward' },
  { id: 'l6', image: '/gallery/hospital-6.jpg', title: 'Hospital Exterior' },
]

export default function GalleryPicker({ onSelect, onClose }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getGallery()
      .then((data) => {
        // Merge Firestore images + local photos, deduplicate by URL
        const firestoreUrls = new Set(data.map((d) => d.image))
        const locals = LOCAL_PHOTOS.filter((l) => !firestoreUrls.has(l.image))
        setImages([...data, ...locals])
      })
      .catch(() => setImages(LOCAL_PHOTOS))
      .finally(() => setLoading(false))
  }, [])

  const handleConfirm = () => {
    if (selected) onSelect(selected)
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-navy-800">Pick from Gallery</h3>
              <p className="text-xs text-gray-400 mt-0.5">Click an image to select it</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Grid */}
          <div className="p-5 max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <FiImage size={36} className="mb-3 opacity-40" />
                <p className="text-sm font-medium">No images in gallery</p>
                <p className="text-xs mt-1">Upload images in the Gallery section first</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {images.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelected(img.image)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selected === img.image
                        ? 'border-primary-500 ring-2 ring-primary-200'
                        : 'border-transparent hover:border-primary-300'
                    }`}
                  >
                    <img
                      src={img.image}
                      alt={img.title || ''}
                      className="w-full h-full object-cover"
                    />
                    {selected === img.image && (
                      <div className="absolute inset-0 bg-primary-600/20 flex items-center justify-center">
                        <div className="bg-primary-600 rounded-full p-1">
                          <FiCheck size={14} className="text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary text-sm px-5 py-2">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selected}
              className="btn-primary text-sm px-5 py-2 disabled:opacity-50"
            >
              Use Selected Image
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
