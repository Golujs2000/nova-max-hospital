// ─────────────────────────────────────────────────────────────
// pages/admin/AdminDoctors.jsx
// Doctor management page — add, edit, delete doctors.
// Supports profile image upload (compressed to WebP via compressImage
// before uploading to Firebase Storage).
// Available days are toggled via a weekday checkbox grid.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiUpload,
  FiUser, FiRefreshCw, FiUsers, FiImage,
  FiPhone, FiMail, FiClock, FiAward, FiActivity,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from '../../services/doctors'
import { getDepartments } from '../../services/categories'
import GalleryPicker from '../../components/admin/GalleryPicker'
import { slugify } from '../../utils/helpers'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const EMPTY_FORM = {
  name: '', specialty: '', specialties: [], qualification: '', experience: '',
  bio: '', email: '', phone: '',
  availableDays: [], availableTime: '', featured: false, image: '',
  linkedTreatments: [],   // composite keys "specId::treatmentSlug"
  consultationFee: '',
  specializations: '',
  currentPosition: '',
  previousPosition: '',
  facebook: '',
  twitter: '',
  instagram: '',
}

// Build composite key for a treatment
const tKey = (specId, slug) => `${specId}::${slug}`

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false)
  const fileRef = useRef()

  const fetchDoctors = async () => {
    setLoading(true)
    try {
      const [docs, specs] = await Promise.all([getDoctors(), getDepartments()])
      setDoctors(docs)
      setDepartments(specs)
    } catch {
      toast.error('Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDoctors() }, [])

  const openAddModal = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImageFile(null)
    setImagePreview('')
    setModalOpen(true)
  }

  const openEditModal = (doc) => {
    setEditingId(doc.id)
    // Get valid department names from our departments state
    const validDeptNames = departments.map((d) => d.name)

    // Normalise: old records have specialty (string), new records have specialties (array)
    const docSpecs = Array.isArray(doc.specialties) && doc.specialties.length > 0
      ? doc.specialties
      : doc.specialty ? [doc.specialty] : []

    // Filter specialties: valid departments go to specialties
    const depts = docSpecs.filter((s) => validDeptNames.includes(s))

    // Non-valid department names (legacy expertises) go to specializations
    const legacyExpertises = docSpecs.filter((s) => !validDeptNames.includes(s))

    // Combine with doc.specializations (if any)
    const existingSpecializations = Array.isArray(doc.specializations)
      ? doc.specializations
      : doc.specializations ? [doc.specializations] : []

    const combinedExpertise = [...legacyExpertises, ...existingSpecializations]
      .filter((val, id, self) => self.indexOf(val) === id) // deduplicate

    setForm({
      name: doc.name || '',
      specialty: doc.specialty || '',
      specialties: depts,
      qualification: doc.qualification || '',
      experience: doc.experience || '',
      bio: doc.bio || '',
      email: doc.email || '',
      phone: doc.phone || '',
      availableDays: Array.isArray(doc.availableDays) ? doc.availableDays : [],
      availableTime: doc.availableTime || '',
      featured: doc.featured || false,
      image: doc.image || '',
      linkedTreatments: Array.isArray(doc.linkedTreatments) ? doc.linkedTreatments : [],
      consultationFee: doc.consultationFee || '',
      specializations: combinedExpertise.join(', '),
      currentPosition: doc.currentPosition || '',
      previousPosition: doc.previousPosition || '',
      facebook: doc.facebook || '',
      twitter: doc.twitter || '',
      instagram: doc.instagram || '',
    })
    setImageFile(null)
    setImagePreview(doc.image || '')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImageFile(null)
    setImagePreview('')
    setGalleryPickerOpen(false)
  }

  const handleGallerySelect = (url) => {
    setImageFile(null)
    setImagePreview(url)
    setForm((prev) => ({ ...prev, image: url }))
    setGalleryPickerOpen(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  // Toggle a specialty in the specialties[] array; also sync primary specialty
  const handleSpecialtyToggle = (specName) => {
    setForm((prev) => {
      const already = prev.specialties.includes(specName)
      const next = already
        ? prev.specialties.filter((s) => s !== specName)
        : [...prev.specialties, specName]
      return {
        ...prev,
        specialties: next,
      }
    })
  }

  const handleDayToggle = (day) => {
    setForm((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }))
  }

  const handleTreatmentToggle = (specId, treatmentSlug) => {
    const key = tKey(specId, treatmentSlug)
    setForm((prev) => ({
      ...prev,
      linkedTreatments: prev.linkedTreatments.includes(key)
        ? prev.linkedTreatments.filter((k) => k !== key)
        : [...prev.linkedTreatments, key],
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.specialty) {
      toast.error('Name and designation/specialty are required')
      return
    }
    setSaving(true)
    try {
      const docData = {
        ...form,
        specializations: typeof form.specializations === 'string'
          ? form.specializations.split(',').map((s) => s.trim()).filter(Boolean)
          : Array.isArray(form.specializations) ? form.specializations : [],
        slug: slugify(form.name),
      }
      if (editingId) {
        await updateDoctor(editingId, docData, imageFile)
        toast.success('Doctor updated')
      } else {
        await addDoctor(docData, imageFile)
        toast.success('Doctor added')
      }
      await fetchDoctors()
      closeModal()
    } catch {
      toast.error('Failed to save doctor')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm('Delete this doctor? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deleteDoctor(id, imageUrl)
      setDoctors((prev) => prev.filter((d) => d.id !== id))
      toast.success('Doctor deleted')
    } catch {
      toast.error('Failed to delete doctor')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Doctors</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} registered · {doctors.reduce((sum, d) => sum + (d.linkedTreatments?.length || 0), 0)} total treatments linked
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchDoctors} className="btn-secondary text-sm py-2 px-4">
            <FiRefreshCw size={14} />
          </button>
          <button onClick={openAddModal} className="btn-primary text-sm py-2 px-4">
            <FiPlus size={16} /> Add Doctor
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-3" />
              <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-gray-400">
          <FiUsers size={40} className="mb-3 opacity-40" />
          <p className="font-medium">No doctors yet</p>
          <button onClick={openAddModal} className="btn-primary mt-4 text-sm py-2 px-4">
            <FiPlus size={15} /> Add First Doctor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {doctors.map((doc) => {
            const specialtyList = Array.isArray(doc.specialties) && doc.specialties.length > 0
              ? doc.specialties
              : doc.specialty ? [doc.specialty] : []
            const days = Array.isArray(doc.availableDays) ? doc.availableDays : []
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4 flex gap-4 group"
              >
                {/* Photo */}
                <div className="shrink-0">
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-gray-100"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center border border-primary-100">
                      <FiUser size={28} className="text-primary-300" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  {/* Name + badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-navy-800 text-sm leading-tight truncate">{doc.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {specialtyList.slice(0, 5).map((s) => (
                          <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-medium">{s}</span>
                        ))}
                        {specialtyList.length > 5 && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 font-medium">+{specialtyList.length - 5} more</span>
                        )}
                        {doc.featured && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 font-medium">⭐ Featured</span>
                        )}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(doc)}
                        className="p-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.image)}
                        disabled={deletingId === doc.id}
                        className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Info rows */}
                  <div className="mt-2 space-y-1">
                    {/* Qualification + Experience */}
                    {(doc.qualification || doc.experience) && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FiAward size={11} className="text-gray-400 shrink-0" />
                        <span className="truncate">
                          {[doc.qualification, doc.experience].filter(Boolean).join(' · ')}
                        </span>
                      </div>
                    )}

                    {/* Fee + Time */}
                    {(doc.availableTime || doc.consultationFee) && (
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {doc.availableTime && (
                          <span className="flex items-center gap-1">
                            <FiClock size={11} className="text-gray-400 shrink-0" />
                            {doc.availableTime}
                          </span>
                        )}
                        {doc.consultationFee && (
                          <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 text-gray-600 font-semibold">
                            Fee: ₹{doc.consultationFee}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Contact */}
                    {(doc.phone || doc.email) && (
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {doc.phone && (
                          <span className="flex items-center gap-1">
                            <FiPhone size={11} className="text-gray-400 shrink-0" />
                            {doc.phone}
                          </span>
                        )}
                        {doc.email && (
                          <span className="flex items-center gap-1 truncate">
                            <FiMail size={11} className="text-gray-400 shrink-0" />
                            <span className="truncate">{doc.email}</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Linked treatments badge */}
                    {doc.linkedTreatments?.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-teal-600">
                        <FiActivity size={11} className="shrink-0" />
                        <span className="font-medium">{doc.linkedTreatments.length} treatment{doc.linkedTreatments.length !== 1 ? 's' : ''} linked</span>
                      </div>
                    )}

                    {/* Available days */}
                    {days.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((short, i) => {
                          const full = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]
                          const active = days.includes(full)
                          return (
                            <span
                              key={short}
                              className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                active ? 'bg-teal-50 text-teal-700' : 'bg-gray-50 text-gray-300'
                              }`}
                            >
                              {short}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Gallery Picker */}
      {galleryPickerOpen && (
        <GalleryPicker
          onSelect={handleGallerySelect}
          onClose={() => setGalleryPickerOpen(false)}
        />
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
                  <h2 className="text-lg font-bold text-navy-800">
                    {editingId ? 'Edit Doctor' : 'Add New Doctor'}
                  </h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FiX size={22} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Doctor Photo */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center">
                            <FiUser size={26} className="text-gray-300 mx-auto" />
                            <p className="text-xs text-gray-400 mt-1">Photo</p>
                          </div>
                        )}
                      </div>
                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => { setImagePreview(''); setImageFile(null); setForm((p) => ({ ...p, image: '' })) }}
                          className="absolute -top-1 -right-1 bg-white border border-gray-200 rounded-full p-0.5 shadow hover:bg-gray-50 transition-colors"
                        >
                          <FiX size={12} className="text-gray-500" />
                        </button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
                      >
                        <FiUpload size={12} /> Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setGalleryPickerOpen(true)}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-primary-200 text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors"
                      >
                        <FiImage size={12} /> Gallery
                      </button>
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="Dr. Ravi Kumar" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation / Title *</label>
                      <input name="specialty" value={form.specialty} onChange={handleChange} required className="input-field" placeholder="Director & Consultant Physician" />
                    </div>
                  </div>

                  {/* Specialties (Departments) multi-select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Departments *
                      <span className="text-gray-400 font-normal ml-1 text-xs">(select one or more departments)</span>
                    </label>
                    {departments.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {departments.map((spec) => {
                          const checked = form.specialties.includes(spec.name)
                          return (
                            <button
                              key={spec.id}
                              type="button"
                              onClick={() => handleSpecialtyToggle(spec.name)}
                              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors font-medium ${
                                checked
                                  ? 'bg-primary-600 text-white border-primary-600'
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'
                              }`}
                            >
                              {spec.icon && (
                                <span className="w-4 h-4 inline-flex items-center justify-center shrink-0 overflow-hidden">
                                  {(spec.icon.startsWith('http') || spec.icon.startsWith('/') || spec.icon.includes('.')) ? (
                                    <img src={spec.icon} alt="" className="w-full h-full object-contain" />
                                  ) : (
                                    spec.icon
                                  )}
                                </span>
                              )}
                              {spec.name}
                              <span className="text-[10px] opacity-60 ml-0.5">({spec.treatments?.length || 0})</span>
                              {checked && <FiX size={11} />}
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-3">
                        No departments found. Please add departments first under category management.
                      </p>
                    )}
                  </div>

                  {/* Expertise / Specializations */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expertise / Specializations
                      <span className="text-gray-400 font-normal ml-1 text-xs">(comma-separated list)</span>
                    </label>
                    <input
                      name="specializations"
                      value={form.specializations}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Laparoscopic Surgery, Kidney Stone & Kidney Cancer, Liver Disorders"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                      <input name="qualification" value={form.qualification} onChange={handleChange} className="input-field" placeholder="MBBS, MD" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                      <input name="experience" value={form.experience} onChange={handleChange} className="input-field" placeholder="10+ Years" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="doctor@hospital.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+91 9876543210" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Time</label>
                      <input name="availableTime" value={form.availableTime} onChange={handleChange} className="input-field" placeholder="9:00 AM – 5:00 PM" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
                      <input name="consultationFee" type="number" value={form.consultationFee} onChange={handleChange} className="input-field" placeholder="500" />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="input-field resize-none" placeholder="Brief description about the doctor..." />
                  </div>

                  {/* Current & Previous Positions */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Position
                        <span className="text-gray-400 font-normal ml-1 text-xs">(e.g. Director &amp; HOD, Nova Max Hospital)</span>
                      </label>
                      <input
                        name="currentPosition"
                        value={form.currentPosition}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Director & HOD, Nova Max Hospital, Patna"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Previous Positions
                        <span className="text-gray-400 font-normal ml-1 text-xs">(pipe-separated for multiple, e.g. Consultant, AIIMS Patna | Senior Resident, PMCH)</span>
                      </label>
                      <input
                        name="previousPosition"
                        value={form.previousPosition}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Consultant, AIIMS Patna | Senior Resident, PMCH"
                      />
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Media Links
                      <span className="text-gray-400 font-normal ml-1 text-xs">(optional — shown on homepage card)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        name="facebook"
                        value={form.facebook}
                        onChange={handleChange}
                        className="input-field text-sm"
                        placeholder="Facebook URL"
                      />
                      <input
                        name="twitter"
                        value={form.twitter}
                        onChange={handleChange}
                        className="input-field text-sm"
                        placeholder="Twitter/X URL"
                      />
                      <input
                        name="instagram"
                        value={form.instagram}
                        onChange={handleChange}
                        className="input-field text-sm"
                        placeholder="Instagram URL"
                      />
                    </div>
                  </div>

                  {/* Available Days */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
                    <div className="flex flex-wrap gap-2">
                      {DAYS.map((day) => (
                        <label key={day} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.availableDays.includes(day)}
                            onChange={() => handleDayToggle(day)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-400"
                          />
                          <span className="text-sm text-gray-700">{day.slice(0, 3)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Featured */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
                      className={`w-11 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-primary-600' : 'bg-gray-200'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all ${form.featured ? 'left-5' : 'left-0.5'}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Featured doctor</span>
                  </label>

                  {/* Linked Treatments */}
                  {departments.some((s) => s.treatments?.length > 0) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Linked Treatments
                        <span className="text-gray-400 font-normal ml-1 text-xs">
                          ({form.linkedTreatments.length} selected)
                        </span>
                      </label>
                      <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                        {departments.filter((s) => s.treatments?.length > 0).map((spec) => {
                          const specSelected = spec.treatments.filter(
                            (t) => form.linkedTreatments.includes(tKey(spec.id, t.slug))
                          ).length
                          return (
                            <div key={spec.id}>
                              {/* Department header */}
                              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50">
                                <span className="w-5 h-5 flex items-center justify-center shrink-0 overflow-hidden text-base leading-none">
                                  {spec.icon ? (
                                    (spec.icon.startsWith('http') || spec.icon.startsWith('/') || spec.icon.includes('.')) ? (
                                      <img src={spec.icon} alt="" className="w-full h-full object-contain" />
                                    ) : (
                                      spec.icon
                                    )
                                  ) : (
                                    '🏥'
                                  )}
                                </span>
                                <span className="text-xs font-bold text-gray-600 flex-1">{spec.name}</span>
                                {specSelected > 0 && (
                                  <span className="text-[10px] font-bold bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                                    {specSelected} selected
                                  </span>
                                )}
                              </div>
                              {/* Treatments */}
                              <div className="px-4 py-3 flex flex-wrap gap-2">
                                {spec.treatments.map((t) => {
                                  const key = tKey(spec.id, t.slug)
                                  const selected = form.linkedTreatments.includes(key)
                                  return (
                                    <button
                                      key={key}
                                      type="button"
                                      onClick={() => handleTreatmentToggle(spec.id, t.slug)}
                                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors font-medium ${
                                        selected
                                          ? 'bg-teal-600 text-white border-teal-600'
                                          : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-700'
                                      }`}
                                    >
                                      <FiActivity size={10} />
                                      {t.name}
                                      {selected && <FiX size={10} />}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center py-2.5">
                      Cancel
                    </button>
                    <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-2.5 disabled:opacity-60">
                      {saving ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Saving...
                        </span>
                      ) : editingId ? 'Update Doctor' : 'Add Doctor'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
