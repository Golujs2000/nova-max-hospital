// ─────────────────────────────────────────────────────────────
// pages/admin/AdminDepartments.jsx
// Departments/departments management page.
// Each department has a name, slug, icon key, description,
// category, order, and optional treatment/cost fields.
// Slug is auto-generated from name on add; can be manually edited.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion'
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiStar,
  FiRefreshCw, FiArrowUp, FiArrowDown, FiActivity, FiEye, FiCheck,
  FiImage, FiVideo, FiUploadCloud, FiGrid, FiMenu,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../../firebase/config'
import {
  getCategoryItems, addCategoryItem, updateCategoryItem, deleteCategoryItem, updateCategoryItemsOrder, getCollectionName
} from '../../services/categories'
import { getDoctors } from '../../services/doctors'
import { getHospitalServices } from '../../services/hospitalServices'
import { slugify, compressImage } from '../../utils/helpers'
import { getGallery, getFolders } from '../../services/gallery'

const AVAILABILITY = ['By Appointment', 'OPD Hours', '24 × 7']

const EMPTY_FORM = {
  name: '', icon: '', thumbnail: '', heroImage: '', heroImageStorage: '', category: '', available: '',
  description: '', longDescription: '', features: '', recoveryTime: '', order: 0,
  doctorIds: [],
}
const EMPTY_TREATMENT = { name: '', duration: '' }

function DepartmentItem({ spec, idx, doctors, hospitalServices, catColor, deletingId, onEdit, onDelete, onView, handleDragEnd }) {
  const dragControls = useDragControls()

  return (
    <Reorder.Item
      value={spec}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={handleDragEnd}
      className="card p-4 flex items-start gap-4 bg-white border border-gray-100 hover:shadow-md transition-shadow relative select-none"
    >
      {/* Drag handle */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="flex flex-col items-center gap-1.5 shrink-0 pt-1.5 cursor-grab active:cursor-grabbing select-none text-gray-300 hover:text-gray-500"
        title="Drag to reorder"
      >
        <FiMenu size={16} />
        <span className="text-[10px] text-gray-400 font-mono font-bold">#{idx + 1}</span>
      </div>

      {/* Thumbnail / Icon */}
      {spec.icon && (
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 text-xl overflow-hidden pointer-events-none">
          {(spec.icon.startsWith('http') || spec.icon.startsWith('/') || spec.icon.includes('.')) ? (
            <img src={spec.icon} alt={spec.name} className="w-full h-full object-contain" />
          ) : (
            spec.icon
          )}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <h3 className="font-semibold text-navy-800">{spec.name}</h3>
          {spec.category && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor[spec.category] || 'bg-gray-100 text-gray-600'}`}>
              {spec.category}
            </span>
          )}
          {spec.available && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${spec.available === '24 × 7' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {spec.available}
            </span>
          )}
        </div>
        {spec.description && (
          <p className="text-sm text-gray-500 line-clamp-1">{spec.description}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
          {spec.recoveryTime && <span>Recovery: {spec.recoveryTime}</span>}
          {Array.isArray(spec.treatments) && spec.treatments.length > 0 && (
            <span className="text-primary-500 font-medium flex items-center gap-1">
              <FiActivity size={11} /> {spec.treatments.length} treatment{spec.treatments.length !== 1 ? 's' : ''}
            </span>
          )}
          {Array.isArray(spec.doctorIds) && spec.doctorIds.length > 0 && (
            <span className="text-teal-600 font-medium flex items-center gap-1">
              👨‍⚕️ {spec.doctorIds.length} doctor{spec.doctorIds.length !== 1 ? 's' : ''}
            </span>
          )}
          {(() => {
            const linked = hospitalServices.filter(s =>
              Array.isArray(s.relatedSpecialties) && s.relatedSpecialties.includes(spec.name)
            )
            return linked.length > 0 ? (
              <span className="text-amber-600 font-medium flex items-center gap-1">
                🏥 {linked.length} service{linked.length !== 1 ? 's' : ''}
              </span>
            ) : null
          })()}
        </div>
        {/* Linked doctor avatars */}
        {Array.isArray(spec.doctorIds) && spec.doctorIds.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {spec.doctorIds.slice(0, 5).map((did) => {
              const doc = doctors.find(d => d.id === did)
              if (!doc) return null
              return doc.image ? (
                <img key={did} src={doc.image} alt={doc.name} title={doc.name}
                  className="w-6 h-6 rounded-full object-cover border border-white shadow-sm" />
              ) : (
                <div key={did} title={doc.name}
                  className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center border border-white shadow-sm">
                  <span className="text-primary-700 text-[9px] font-bold">{doc.name?.[0]}</span>
                </div>
              )
            })}
            {spec.doctorIds.length > 5 && (
              <span className="text-xs text-gray-400 ml-1">+{spec.doctorIds.length - 5}</span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => onView(spec)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs font-semibold">
          <FiEye size={13} /> View
        </button>
        <button onClick={() => onEdit(spec)}
          className="p-2 rounded-lg text-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-colors" title="Edit">
          <FiEdit2 size={15} />
        </button>
        <button onClick={() => onDelete(spec.id)} disabled={deletingId === spec.id}
          className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50" title="Delete">
          <FiTrash2 size={15} />
        </button>
      </div>
    </Reorder.Item>
  )
}

export default function AdminCategory({ categoryName, title }) {
  const [departments, setDepartments] = useState([])

  // ── Gallery picker state ────────────────────────────────────────────────
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState([])
  const [galleryLoading, setGalleryLoading] = useState(false)

  const openGalleryPicker = useCallback(async () => {
    setGalleryPickerOpen(true)
    setGalleryLoading(true)
    try {
      const images = await getGallery()
      setGalleryImages(images.filter(img => img.image))
    } catch {
      toast.error('Failed to load gallery images')
    } finally {
      setGalleryLoading(false)
    }
  }, [])

  const selectGalleryImage = useCallback((imageUrl) => {
    setForm((prev) => ({ ...prev, icon: imageUrl, thumbnail: '' }))
    setGalleryPickerOpen(false)
  }, [])

  const [doctors, setDoctors] = useState([])
  const [hospitalServices, setHospitalServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [treatments, setTreatments] = useState([])
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [viewItem, setViewItem] = useState(null)

  // Media state: [{ url, type:'image'|'video', name, storagePath }]
  const [media, setMedia] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({}) // { filename: 0-100 }
  const fileInputRef = useRef(null)
  const thumbnailInputRef = useRef(null)
  const heroImageInputRef = useRef(null)

  // ── Thumbnail upload handler ─────────────────────────────────────────────
  const [thumbnailUploading, setThumbnailUploading] = useState(false)
  const [thumbnailProgress, setThumbnailProgress] = useState(0)

  const handleThumbnailSelect = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed for thumbnails')
      return
    }

    setThumbnailUploading(true)
    setThumbnailProgress(0)

    try {
      const compressed = await compressImage(file)
      const timestamp = Date.now()
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const storagePath = `departments/thumbnails/${timestamp}_${safeName}`
      const storageRef = ref(storage, storagePath)

      await new Promise((resolve, reject) => {
        const task = uploadBytesResumable(storageRef, compressed)
        task.on(
          'state_changed',
          (snap) => {
            const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
            setThumbnailProgress(pct)
          },
          reject,
          async () => {
            const url = await getDownloadURL(task.snapshot.ref)
            setForm((prev) => ({ ...prev, icon: url, thumbnail: storagePath }))
            setThumbnailProgress(0)
            resolve()
          }
        )
      })
      toast.success('Thumbnail uploaded!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to upload thumbnail')
    } finally {
      setThumbnailUploading(false)
    }
  }, [])

  const handleRemoveThumbnail = useCallback(async () => {
    if (form.thumbnail) {
      try {
        await deleteObject(ref(storage, form.thumbnail))
      } catch {}
    }
    setForm((prev) => ({ ...prev, icon: '', thumbnail: '' }))
  }, [form.thumbnail])

  // ── Hero Image upload handler ─────────────────────────────────────────────
  const [heroImageUploading, setHeroImageUploading] = useState(false)
  const [heroImageProgress, setHeroImageProgress] = useState(0)

  const handleHeroImageSelect = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed for hero images')
      return
    }

    setHeroImageUploading(true)
    setHeroImageProgress(0)

    try {
      const compressed = await compressImage(file)
      const timestamp = Date.now()
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const storagePath = `departments/heroImages/${timestamp}_${safeName}`
      const storageRef = ref(storage, storagePath)

      await new Promise((resolve, reject) => {
        const task = uploadBytesResumable(storageRef, compressed)
        task.on(
          'state_changed',
          (snap) => {
            const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
            setHeroImageProgress(pct)
          },
          reject,
          async () => {
            const url = await getDownloadURL(task.snapshot.ref)
            setForm((prev) => ({ ...prev, heroImage: url, heroImageStorage: storagePath }))
            setHeroImageProgress(0)
            resolve()
          }
        )
      })
      toast.success('Hero image uploaded!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to upload hero image')
    } finally {
      setHeroImageUploading(false)
    }
  }, [])

  const handleRemoveHeroImage = useCallback(async () => {
    if (form.heroImageStorage) {
      try {
        await deleteObject(ref(storage, form.heroImageStorage))
      } catch {}
    }
    setForm((prev) => ({ ...prev, heroImage: '', heroImageStorage: '' }))
  }, [form.heroImageStorage])

  const fetchDepartments = async () => {
    setLoading(true)
    try {
      const colName = getCollectionName(categoryName)
      const [specs, docs, svcs] = await Promise.all([
        getCategoryItems(colName), getDoctors(), getHospitalServices(),
      ])
      setDepartments(specs)
      setDoctors(docs)
      setHospitalServices(svcs)
    } catch {
      toast.error('Failed to load departments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDepartments() }, [categoryName])

  const openAddModal = () => {
    setEditingId(null)
    setForm({ ...EMPTY_FORM, category: categoryName || '', order: departments.length + 1, icon: '', thumbnail: '', heroImage: '', heroImageStorage: '' })
    setTreatments([])
    setMedia([])
    setUploadProgress({})
    setModalOpen(true)
  }

  const openEditModal = (spec) => {
    setEditingId(spec.id)
    setForm({
      name: spec.name || '',
      icon: spec.icon || '',
      thumbnail: spec.thumbnail || '',
      heroImage: spec.heroImage || '',
      heroImageStorage: spec.heroImageStorage || '',
      category: spec.category || '',
      available: spec.available || '',
      description: spec.description || '',
      longDescription: spec.longDescription || '',
      features: Array.isArray(spec.features) ? spec.features.join('\n') : spec.features || '',
      recoveryTime: spec.recoveryTime || '',
      order: spec.order ?? 0,
      doctorIds: Array.isArray(spec.doctorIds) ? spec.doctorIds : [],
    })
    setTreatments(
      Array.isArray(spec.treatments)
        ? spec.treatments.map((t) => ({ ...t }))
        : []
    )
    setMedia(Array.isArray(spec.media) ? spec.media : [])
    setUploadProgress({})
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
    setTreatments([])
    setMedia([])
    setUploadProgress({})
  }

  // ── Media upload ──────────────────────────────────────────────────────────
  const handleMediaSelect = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    e.target.value = ''

    setUploading(true)
    const newItems = []

    for (const file of files) {
      const isVideo = file.type.startsWith('video/')
      const isImage = file.type.startsWith('image/')
      if (!isVideo && !isImage) {
        toast.error(`${file.name}: only images and videos allowed`)
        continue
      }

      const timestamp = Date.now()
      const safeName  = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const storagePath = `departments/media/${timestamp}_${safeName}`
      const storageRef  = ref(storage, storagePath)

      try {
        // Compress images before upload
        const uploadFile = isImage ? await compressImage(file) : file

        await new Promise((resolve, reject) => {
          const task = uploadBytesResumable(storageRef, uploadFile)
          task.on(
            'state_changed',
            (snap) => {
              const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
              setUploadProgress((p) => ({ ...p, [safeName]: pct }))
            },
            reject,
            async () => {
              const url = await getDownloadURL(task.snapshot.ref)
              newItems.push({ url, type: isVideo ? 'video' : 'image', name: file.name, storagePath })
              setUploadProgress((p) => { const n = { ...p }; delete n[safeName]; return n })
              resolve()
            }
          )
        })
      } catch {
        toast.error(`Failed to upload ${file.name}`)
        setUploadProgress((p) => { const n = { ...p }; delete n[safeName]; return n })
      }
    }

    setMedia((prev) => [...prev, ...newItems])
    setUploading(false)
  }

  const handleRemoveMedia = async (idx) => {
    const item = media[idx]
    // Delete from Storage
    if (item.storagePath) {
      try {
        await deleteObject(ref(storage, item.storagePath))
      } catch {
        // ignore — file may already be gone
      }
    }
    setMedia((prev) => prev.filter((_, i) => i !== idx))
  }

  const toggleDoctorId = (id) => {
    setForm((prev) => ({
      ...prev,
      doctorIds: prev.doctorIds.includes(id)
        ? prev.doctorIds.filter((d) => d !== id)
        : [...prev.doctorIds, id],
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'order' ? Number(value) : value }))
  }

  // ── Treatment row handlers ────────────────────────────────────────────────
  const addTreatmentRow = () => setTreatments((prev) => [...prev, { ...EMPTY_TREATMENT }])

  const updateTreatmentRow = (idx, field, value) => {
    setTreatments((prev) => prev.map((t, i) => i === idx ? { ...t, [field]: value } : t))
  }

  const removeTreatmentRow = (idx) => {
    setTreatments((prev) => prev.filter((_, i) => i !== idx))
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) { toast.error('Name is required'); return }
    setSaving(true)
    try {
      const data = {
        ...form,
        slug: slugify(form.name),
        features: form.features
          ? form.features.split('\n').map((f) => f.trim()).filter(Boolean)
          : [],
        treatments: treatments.filter((t) => t.name.trim()).map((t) => ({
          ...t,
          slug: slugify(t.name),
        })),
        media,
      }
      
      const colName = getCollectionName(categoryName)
      if (editingId) {
        await updateCategoryItem(colName, editingId, data)
        toast.success('Department updated')
      } else {
        await addCategoryItem(colName, data)
        toast.success('Department added')
      }
      await fetchDepartments()
      closeModal()
    } catch {
      toast.error('Failed to save department')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this department?')) return
    setDeletingId(id)
    try {
      const colName = getCollectionName(categoryName)
      await deleteCategoryItem(colName, id)
      setDepartments((prev) => prev.filter((s) => s.id !== id))
      toast.success('Department deleted')
    } catch {
      toast.error('Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  const handleDragEnd = async () => {
    try {
      const colName = getCollectionName(categoryName)
      await updateCategoryItemsOrder(colName, departments)
      toast.success('Display order saved')
    } catch {
      toast.error('Failed to save display order')
    }
  }

  // ── Category badge colors ─────────────────────────────────────────────────
  const catColor = {
    'Hospital Departments':      'bg-blue-50 text-blue-700',
    'Surgical Services':         'bg-teal-50 text-teal-700',
    'Critical & Emergency Care': 'bg-red-50 text-red-700',
    'Patient Care Facilities':   'bg-amber-50 text-amber-700',
    'Diagnostics':               'bg-purple-50 text-purple-700',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">{title || 'Departments'}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{departments.length} department{departments.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchDepartments} className="btn-secondary text-sm py-2 px-4" title="Refresh">
            <FiRefreshCw size={14} />
          </button>
          <button onClick={openAddModal} className="btn-primary text-sm py-2 px-4">
            <FiPlus size={16} /> Add Department
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-5 bg-gray-100 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : departments.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-gray-400">
          <FiStar size={36} className="mb-3 opacity-40" />
          <p className="font-medium">No departments yet</p>
          <button onClick={openAddModal} className="btn-primary mt-4 text-sm py-2 px-4">
            <FiPlus size={15} /> Add First Department
          </button>
        </div>
      ) : (
        <Reorder.Group axis="y" values={departments} onReorder={setDepartments} className="space-y-3">
          {departments.map((spec, idx) => (
            <DepartmentItem
              key={spec.id}
              spec={spec}
              idx={idx}
              doctors={doctors}
              hospitalServices={hospitalServices}
              catColor={catColor}
              deletingId={deletingId}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onView={setViewItem}
              handleDragEnd={handleDragEnd}
            />
          ))}
        </Reorder.Group>
      )}

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
                  <h2 className="text-lg font-bold text-navy-800">
                    {editingId ? 'Edit Department' : 'Add Department'}
                  </h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiX size={22} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                  {/* Row 1: Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required
                      className="input-field" placeholder="General Surgery" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Thumbnail Upload / Gallery Picker */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail / Icon</label>
                      {form.icon && (form.icon.startsWith('http') || form.icon.startsWith('/') || form.icon.includes('.')) ? (
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border-2 border-primary-100 flex items-center justify-center">
                            <img src={form.icon} alt="Thumbnail" className="w-full h-full object-contain" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => thumbnailInputRef.current?.click()}
                              disabled={thumbnailUploading}
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors font-medium"
                            >
                              <FiUploadCloud size={13} /> Upload New
                            </button>
                            <button
                              type="button"
                              onClick={openGalleryPicker}
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors font-medium"
                            >
                              <FiGrid size={12} /> Choose from Gallery
                            </button>
                            <button
                              type="button"
                              onClick={handleRemoveThumbnail}
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
                            >
                              <FiTrash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {thumbnailUploading ? (
                            <div className="border-2 border-dashed border-primary-200 rounded-xl p-6 text-center bg-primary-50/30">
                              <div className="space-y-2">
                                <FiRefreshCw size={24} className="mx-auto animate-spin text-primary-500" />
                                <p className="text-sm text-primary-600 font-medium">Uploading… {thumbnailProgress}%</p>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[200px] mx-auto">
                                  <div className="h-full bg-primary-500 rounded-full transition-all duration-200" style={{ width: `${thumbnailProgress}%` }} />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-3">
                              <div
                                className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-colors"
                                onClick={() => thumbnailInputRef.current?.click()}
                              >
                                <FiUploadCloud size={26} className="mx-auto mb-2 text-primary-400" />
                                <p className="text-sm font-medium text-gray-600">Upload Icon</p>
                              </div>
                              <div
                                className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-teal-300 hover:bg-teal-50/30 transition-colors"
                                onClick={openGalleryPicker}
                              >
                                <FiGrid size={26} className="mx-auto mb-2 text-teal-400" />
                                <p className="text-sm font-medium text-gray-600">From Gallery</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbnailSelect}
                      />
                    </div>

                    {/* Hero Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image (Optional)</label>
                      {form.heroImage ? (
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-20 rounded-xl overflow-hidden bg-gray-100 border-2 border-primary-100 flex items-center justify-center">
                            <img src={form.heroImage} alt="Hero" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => heroImageInputRef.current?.click()}
                              disabled={heroImageUploading}
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors font-medium"
                            >
                              <FiUploadCloud size={13} /> Change Image
                            </button>
                            <button
                              type="button"
                              onClick={handleRemoveHeroImage}
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
                            >
                              <FiTrash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {heroImageUploading ? (
                            <div className="border-2 border-dashed border-primary-200 rounded-xl p-6 text-center bg-primary-50/30">
                              <div className="space-y-2">
                                <FiRefreshCw size={24} className="mx-auto animate-spin text-primary-500" />
                                <p className="text-sm text-primary-600 font-medium">Uploading… {heroImageProgress}%</p>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[200px] mx-auto">
                                  <div className="h-full bg-primary-500 rounded-full transition-all duration-200" style={{ width: `${heroImageProgress}%` }} />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-colors"
                              onClick={() => heroImageInputRef.current?.click()}
                            >
                              <FiImage size={26} className="mx-auto mb-2 text-primary-400" />
                              <p className="text-sm font-medium text-gray-600">Upload Hero Image</p>
                              <p className="text-xs text-gray-400 mt-1">Wide image for the banner</p>
                            </div>
                          )}
                        </div>
                      )}
                      <input
                        ref={heroImageInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleHeroImageSelect}
                      />
                    </div>
                  </div>

                  {/* ── Gallery Picker Overlay ──────────────────────────── */}
                  <AnimatePresence>
                    {galleryPickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="border border-gray-200 rounded-xl bg-gray-50 p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-navy-800 flex items-center gap-1.5">
                            <FiGrid size={14} className="text-teal-600" /> Choose from Gallery
                          </h4>
                          <button
                            type="button"
                            onClick={() => setGalleryPickerOpen(false)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition-colors"
                          >
                            <FiX size={16} />
                          </button>
                        </div>

                        {galleryLoading ? (
                          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                            {[...Array(10)].map((_, i) => (
                              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                            ))}
                          </div>
                        ) : galleryImages.length === 0 ? (
                          <div className="text-center py-8 text-gray-400">
                            <FiImage size={28} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No gallery images found</p>
                            <p className="text-xs mt-1">Upload images in the Gallery section first</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-[250px] overflow-y-auto pr-1">
                            {galleryImages.map((img) => (
                              <button
                                key={img.id}
                                type="button"
                                onClick={() => selectGalleryImage(img.image)}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-[1.03] ${
                                  form.icon === img.image
                                    ? 'border-primary-500 ring-2 ring-primary-200'
                                    : 'border-transparent hover:border-primary-300'
                                }`}
                              >
                                <img src={img.image} alt={img.title || ''} className="w-full h-full object-cover" />
                                {form.icon === img.image && (
                                  <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
                                    <FiCheck size={20} className="text-white drop-shadow-md" />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Row 2: Category + Availability + Order */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select name="category" value={form.category} onChange={handleChange} className="input-field" disabled={!!categoryName}>
                        <option value="">Select…</option>
                        {categoryName && <option value={categoryName}>{categoryName}</option>}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                      <select name="available" value={form.available} onChange={handleChange} className="input-field">
                        <option value="">Select…</option>
                        {AVAILABILITY.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                      <input name="order" type="number" value={form.order} onChange={handleChange}
                        className="input-field" min={0} />
                    </div>
                  </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Time</label>
                      <input name="recoveryTime" value={form.recoveryTime} onChange={handleChange}
                        className="input-field" placeholder="1 – 3 days" />
                    </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange}
                      rows={2} className="input-field resize-none"
                      placeholder="Brief overview of this department…" />
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description (Long Description)</label>
                    <textarea name="longDescription" value={form.longDescription} onChange={handleChange}
                      rows={4} className="input-field resize-none"
                      placeholder="Detailed, multi-paragraph description of this department/service…" />
                  </div>

                  {/* Key Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Features <span className="text-gray-400 font-normal">(one per line)</span>
                    </label>
                    <textarea name="features" value={form.features} onChange={handleChange}
                      rows={3} className="input-field resize-none font-mono text-sm"
                      placeholder={"Minimally invasive\n24/7 care\nSame-day discharge"} />
                  </div>

                  {/* ── Media (Images & Videos) ──────────────────────────── */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Photos &amp; Videos
                        <span className="text-gray-400 font-normal ml-1">({media.length} file{media.length !== 1 ? 's' : ''})</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors font-medium disabled:opacity-50"
                      >
                        <FiUploadCloud size={13} />
                        {uploading ? 'Uploading…' : 'Add Files'}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleMediaSelect}
                      />
                    </div>

                    {/* Upload progress bars */}
                    {Object.entries(uploadProgress).map(([name, pct]) => (
                      <div key={name} className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-0.5">
                          <span className="truncate max-w-xs">{name}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full transition-all duration-200"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Media grid */}
                    {media.length === 0 && Object.keys(uploadProgress).length === 0 ? (
                      <div
                        className="border-2 border-dashed border-gray-100 rounded-xl p-6 text-center text-sm text-gray-400 cursor-pointer hover:border-primary-300 hover:text-primary-500 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <FiUploadCloud size={24} className="mx-auto mb-2 opacity-50" />
                        Click to upload images or videos
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {media.map((item, idx) => (
                          <div key={idx} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
                            {item.type === 'video' ? (
                              <video
                                src={item.url}
                                className="w-full h-full object-cover"
                                muted
                                preload="metadata"
                              />
                            ) : (
                              <img
                                src={item.url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {/* Type badge */}
                            <div className="absolute bottom-1 left-1 bg-black/60 text-white rounded px-1.5 py-0.5 flex items-center gap-1">
                              {item.type === 'video'
                                ? <FiVideo size={10} />
                                : <FiImage size={10} />
                              }
                              <span className="text-[9px] font-medium uppercase">{item.type}</span>
                            </div>
                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveMedia(idx)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <FiX size={12} />
                            </button>
                          </div>
                        ))}
                        {/* Add more tile */}
                        <div
                          className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors text-gray-400 hover:text-primary-500"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <FiPlus size={20} />
                          <span className="text-[10px] mt-1 font-medium">Add</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Linked Doctors ───────────────────────────────────── */}
                  {doctors.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Linked Doctors
                        <span className="text-gray-400 font-normal ml-1 text-xs">(select doctors who work in this department)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {doctors.map((doc) => {
                          const checked = form.doctorIds.includes(doc.id)
                          return (
                            <button
                              key={doc.id}
                              type="button"
                              onClick={() => toggleDoctorId(doc.id)}
                              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-colors font-medium ${
                                checked
                                  ? 'bg-teal-600 text-white border-teal-600'
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-600'
                              }`}
                            >
                              {doc.image ? (
                                <img src={doc.image} alt={doc.name} className="w-5 h-5 rounded-full object-cover" />
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-[9px] font-bold text-gray-500">{doc.name?.[0]}</span>
                                </div>
                              )}
                              {doc.name}
                              {checked && <FiX size={11} />}
                            </button>
                          )
                        })}
                      </div>
                      {form.doctorIds.length > 0 && (
                        <p className="text-xs text-teal-600 mt-1 font-medium">{form.doctorIds.length} doctor{form.doctorIds.length !== 1 ? 's' : ''} linked</p>
                      )}
                    </div>
                  )}

                  {/* ── Linked Hospital Services (read-only info) ─────────── */}
                  {hospitalServices.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Linked Hospital Services
                        <span className="text-gray-400 font-normal ml-1 text-xs">(services that reference this department)</span>
                      </label>
                      {(() => {
                        const linked = hospitalServices.filter(s =>
                          Array.isArray(s.relatedSpecialties) && s.relatedSpecialties.includes(form.name)
                        )
                        return linked.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {linked.map(s => (
                              <span key={s.id} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-medium">
                                {s.icon && <span>{s.icon}</span>} {s.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic">No hospital services linked yet. Link from Hospital Services page.</p>
                        )
                      })()}
                    </div>
                  )}

                  {/* ── Treatments Table ──────────────────────────────────── */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Treatments / Procedures
                        <span className="text-gray-400 font-normal ml-1">({treatments.length})</span>
                      </label>
                      <button type="button" onClick={addTreatmentRow}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors font-medium">
                        <FiPlus size={13} /> Add Row
                      </button>
                    </div>

                    {treatments.length === 0 ? (
                      <div className="border-2 border-dashed border-gray-100 rounded-xl p-4 text-center text-sm text-gray-400">
                        No treatments yet — click "Add Row" to start
                      </div>
                    ) : (
                      <div className="border border-gray-100 rounded-xl overflow-hidden">
                        {/* Table header */}
                        <div className="grid grid-cols-[1fr_110px_36px] gap-px bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          <div className="bg-gray-50 px-3 py-2">Treatment / Procedure Name</div>
                          <div className="bg-gray-50 px-3 py-2">Duration</div>
                          <div className="bg-gray-50 px-3 py-2" />
                        </div>
                        {/* Rows */}
                        {treatments.map((t, idx) => (
                          <div key={idx} className="grid grid-cols-[1fr_110px_36px] gap-px bg-gray-100">
                            <div className="bg-white px-2 py-1.5">
                              <input value={t.name} onChange={(e) => updateTreatmentRow(idx, 'name', e.target.value)}
                                placeholder="e.g. Appendectomy"
                                className="w-full text-sm border-0 outline-none focus:bg-primary-50 rounded px-1 py-0.5 text-gray-800 placeholder:text-gray-300" />
                            </div>
                            <div className="bg-white px-2 py-1.5">
                              <input value={t.duration} onChange={(e) => updateTreatmentRow(idx, 'duration', e.target.value)}
                                placeholder="45–60 min"
                                className="w-full text-sm border-0 outline-none focus:bg-primary-50 rounded px-1 py-0.5 text-gray-600 placeholder:text-gray-300" />
                            </div>
                            <div className="bg-white flex items-center justify-center">
                              <button type="button" onClick={() => removeTreatmentRow(idx)}
                                className="text-gray-300 hover:text-red-500 transition-colors p-1">
                                <FiX size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center py-2.5">Cancel</button>
                    <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-2.5 disabled:opacity-60">
                      {saving ? 'Saving...' : editingId ? 'Update' : 'Add Department'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── View Modal ── */}
      <AnimatePresence>
        {viewItem && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setViewItem(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-3">
                    {viewItem.icon && (viewItem.icon.startsWith('http') || viewItem.icon.startsWith('/') || viewItem.icon.includes('.')) ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary-50 flex items-center justify-center border border-primary-100">
                        <img src={viewItem.icon} alt={viewItem.name} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <span className="text-3xl">{viewItem.icon || '🏥'}</span>
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        {viewItem.category && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700">{viewItem.category}</span>}
                        {viewItem.available && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">{viewItem.available}</span>}
                      </div>
                      <h2 className="font-heading font-bold text-navy-800 text-xl">{viewItem.name}</h2>
                    </div>
                  </div>
                  <button onClick={() => setViewItem(null)} className="text-gray-400 hover:text-gray-600 transition-colors mt-1">
                    <FiX size={20} />
                  </button>
                </div>

                <div className="px-6 py-5 space-y-5">
                  {/* Stats */}
                  <div className="flex flex-wrap gap-3">
                    {viewItem.recoveryTime && (
                      <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium">
                        Recovery: {viewItem.recoveryTime}
                      </div>
                    )}
                    {viewItem.order !== undefined && (
                      <div className="bg-gray-100 text-gray-500 px-3 py-2 rounded-lg text-sm font-medium">
                        Order: {viewItem.order}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {viewItem.description && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{viewItem.description}</p>
                    </div>
                  )}

                  {/* Detailed Description */}
                  {viewItem.longDescription && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Detailed Description (Long Description)</p>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{viewItem.longDescription}</p>
                    </div>
                  )}

                  {/* Features */}
                  {viewItem.features?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Key Features</p>
                      <div className="grid grid-cols-2 gap-2">
                        {viewItem.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 text-sm text-gray-700">
                            <FiCheck size={13} className="text-green-600 flex-shrink-0" />{f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Treatments */}
                  {viewItem.treatments?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Treatments ({viewItem.treatments.length})
                      </p>
                      <div className="space-y-1.5">
                        {viewItem.treatments.map((t, i) => (
                          <div key={i} className="flex items-center justify-between gap-3 bg-gray-50 rounded-lg px-3 py-2">
                            <span className="text-sm font-medium text-navy-800">{t.name}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              {t.duration && <span className="text-xs text-gray-400">{t.duration}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Media */}
                  {viewItem.media?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Photos &amp; Videos ({viewItem.media.length})
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {viewItem.media.map((item, i) => (
                          <div key={i} className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square">
                            {item.type === 'video' ? (
                              <video src={item.url} className="w-full h-full object-cover" controls muted />
                            ) : (
                              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute bottom-1 left-1 bg-black/60 text-white rounded px-1.5 py-0.5 flex items-center gap-1">
                              {item.type === 'video' ? <FiVideo size={10} /> : <FiImage size={10} />}
                              <span className="text-[9px] font-medium uppercase">{item.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Slug */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">URL Slug</p>
                    <p className="text-sm font-mono text-gray-500">/services/{viewItem.slug}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                  <button onClick={() => { setViewItem(null); openEditModal(viewItem) }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors text-sm font-semibold">
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button onClick={() => setViewItem(null)}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-sm font-semibold">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
