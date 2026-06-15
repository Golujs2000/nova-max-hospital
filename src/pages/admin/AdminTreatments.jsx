// ─────────────────────────────────────────────────────────────
// pages/admin/AdminTreatments.jsx
// Dedicated treatment management page.
// Treatments are stored nested under their parent department's
// `treatments[]` array in Firestore.
// Rich fields: name, cost, duration, recovery, description,
// indications, benefits, preparation, images[], videoUrl, faqs[].
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiRefreshCw,
  FiActivity, FiSearch, FiChevronDown, FiImage,
  FiYoutube, FiHelpCircle, FiEye, FiCheck, FiList,
  FiClock,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getTreatments, addTreatment, updateTreatment, deleteTreatment } from '../../services/treatments'
import { getCategoryItems, ALL_COLLECTIONS, getCollectionName } from '../../services/categories'
import { slugify } from '../../utils/helpers'
import GalleryPicker from '../../components/admin/GalleryPicker'

const EMPTY_FORM = {
  name: '',
  departmentId: '',
  duration: '',
  recovery: '',
  description: '',
  longDescription: '',
  indications: '',
  benefits: '',
  preparation: '',
  videoUrl: '',
  images: [],
}
const EMPTY_FAQ  = { question: '', answer: '' }
const EMPTY_STEP = { title: '', desc: '' }

const toLines = (val) => (val || '').split('\n').map((s) => s.trim()).filter(Boolean)
const fromLines = (arr) => (Array.isArray(arr) ? arr.join('\n') : arr || '')

export default function AdminTreatments() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading]         = useState(true)
  const [modalOpen, setModalOpen]     = useState(false)
  const [editingKey, setEditingKey]   = useState(null)
  const [form, setForm]               = useState(EMPTY_FORM)
  const [faqs, setFaqs]               = useState([])
  const [steps, setSteps]             = useState([])
  const [saving, setSaving]           = useState(false)
  const [search, setSearch]           = useState('')
  const [filterSpec, setFilterSpec]   = useState('all')
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [viewItem, setViewItem]       = useState(null)

  const [treatmentsData, setTreatmentsData] = useState([])

  // ── fetch ─────────────────────────────────────────────────
  const fetchAll = async () => {
    setLoading(true)
    try { 
      const specsArrays = await Promise.all(ALL_COLLECTIONS.map(col => getCategoryItems(col)))
      setDepartments(specsArrays.flat())
      setTreatmentsData(await getTreatments())
    }
    catch { toast.error('Failed to load data') }
    finally { setLoading(false) }
  }
  useEffect(() => { fetchAll() }, [])

  // ── flatten all treatments ────────────────────────────────
  const allTreatments = useMemo(() =>
    treatmentsData.map((t) => {
      const spec = departments.find((s) => s.id === t.parentId)
      return {
        ...t,
        specId: t.parentId,
        specName: spec?.name || 'Unknown',
        specSlug: spec?.slug || '',
        specCategory: spec?.category || 'Unknown',
      }
    })
  , [treatmentsData, departments])

  const filtered = useMemo(() => {
    let list = allTreatments
    if (filterSpec !== 'all') list = list.filter((t) => t.specId === filterSpec)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((t) =>
        t.name?.toLowerCase().includes(q) || t.specName?.toLowerCase().includes(q))
    }
    return list
  }, [allTreatments, filterSpec, search])

  // ── modal helpers ─────────────────────────────────────────
  const openAdd = () => {
    setEditingKey(null)
    setForm(EMPTY_FORM)
    setFaqs([])
    setSteps([])
    setModalOpen(true)
  }

  const openEdit = (t) => {
    setEditingKey(t.id)
    setForm({
      name: t.name || '',
      departmentId: t.parentId || '',
      duration: t.duration || '',
      recovery: t.recovery || '',
      description: t.description || '',
      longDescription: t.longDescription || '',
      indications: fromLines(t.indications),
      benefits: fromLines(t.benefits),
      preparation: fromLines(t.preparation),
      videoUrl: t.videoUrl || '',
      images: Array.isArray(t.images) ? t.images : [],
    })
    setFaqs(Array.isArray(t.faqs) ? t.faqs.map((f) => ({ ...f })) : [])
    setSteps(Array.isArray(t.steps) ? t.steps.map((s) => ({ ...s })) : [])
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingKey(null)
    setForm(EMPTY_FORM)
    setFaqs([])
    setSteps([])
    setGalleryOpen(false)
  }

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  // ── images ────────────────────────────────────────────────
  const handleGallerySelect = (url) => {
    setForm((p) => ({ ...p, images: [...p.images, url] }))
    setGalleryOpen(false)
  }
  const removeImage = (idx) =>
    setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))

  // ── steps ─────────────────────────────────────────────────
  const addStep    = () => setSteps((p) => [...p, { ...EMPTY_STEP }])
  const removeStep = (i) => setSteps((p) => p.filter((_, idx) => idx !== i))
  const updateStep = (i, field, val) =>
    setSteps((p) => p.map((s, idx) => idx === i ? { ...s, [field]: val } : s))

  // ── faqs ─────────────────────────────────────────────────
  const addFaq    = () => setFaqs((p) => [...p, { ...EMPTY_FAQ }])
  const removeFaq = (i) => setFaqs((p) => p.filter((_, idx) => idx !== i))
  const updateFaq = (i, field, val) =>
    setFaqs((p) => p.map((f, idx) => idx === i ? { ...f, [field]: val } : f))

  // ── save ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { toast.error('Treatment name is required'); return }
    if (!form.departmentId) { toast.error('Please select a department'); return }
    const spec = departments.find((s) => s.id === form.departmentId)
    if (!spec) { toast.error('Department not found'); return }

    const newTreatment = {
      name:        form.name.trim(),
      slug:        slugify(form.name),
      parentId:    form.departmentId,
      parentCollection: getCollectionName(spec.category),
      duration:    form.duration.trim(),
      recovery:    form.recovery.trim(),
      description: form.description.trim(),
      longDescription: form.longDescription.trim(),
      indications: toLines(form.indications),
      benefits:    toLines(form.benefits),
      preparation: toLines(form.preparation),
      videoUrl:    form.videoUrl.trim(),
      images:      form.images,
      steps:       steps.filter((s) => s.title.trim()),
      faqs:        faqs.filter((f) => f.question.trim()),
    }

    setSaving(true)
    try {
      if (editingKey) {
        await updateTreatment(editingKey, newTreatment)
        toast.success('Treatment updated')
      } else {
        await addTreatment(newTreatment)
        toast.success('Treatment added')
      }
      await fetchAll()
      closeModal()
    } catch (err) {
      console.error(err)
      toast.error('Failed to save treatment')
    } finally {
      setSaving(false) }
  }

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete "${t.name}"?`)) return
    try {
      await deleteTreatment(t.id)
      toast.success('Treatment deleted')
      await fetchAll()
    } catch { toast.error('Failed to delete') }
  }

  const catDot = {
    'Surgical': 'bg-blue-500', 'Women & Child': 'bg-pink-500',
    'Emergency': 'bg-red-500', 'Critical Care': 'bg-purple-500',
    'Diagnostics': 'bg-teal-500', 'Support': 'bg-amber-500',
  }

  // ── section header helper ─────────────────────────────────
  const SectionTitle = ({ children }) => (
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-1">{children}</h3>
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Treatments</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {allTreatments.length} treatment{allTreatments.length !== 1 ? 's' : ''} across {departments.length} departments
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAll} className="btn-secondary text-sm py-2 px-4"><FiRefreshCw size={14} /></button>
          <button onClick={openAdd} className="btn-primary text-sm py-2 px-4"><FiPlus size={16} /> Add Treatment</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search treatments…" className="input-field pl-9 text-sm" />
        </div>
        <div className="relative">
          <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select value={filterSpec} onChange={(e) => setFilterSpec(e.target.value)}
            className="input-field pr-8 text-sm appearance-none min-w-[180px]">
            <option value="all">All Departments</option>
            {departments.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-gray-400">
          <FiActivity size={36} className="mb-3 opacity-40" />
          <p className="font-medium">No treatments found</p>
          {(search || filterSpec !== 'all') ? (
            <button onClick={() => { setSearch(''); setFilterSpec('all') }}
              className="text-sm text-primary-600 mt-2 hover:underline">Clear filters</button>
          ) : (
            <button onClick={openAdd} className="btn-primary mt-4 text-sm py-2 px-4">
              <FiPlus size={15} /> Add First Treatment
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((t, i) => (
            <motion.div key={`${t.specId}-${t.slug}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="card p-4 flex items-center gap-4">

              {/* Thumbnail or icon */}
              <div className="w-12 h-12 rounded-xl bg-primary-50 overflow-hidden shrink-0">
                {Array.isArray(t.images) && t.images[0] ? (
                  <img src={t.images[0]} alt={t.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiActivity size={18} className="text-primary-400" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-navy-800 text-sm">{t.name}</h3>
                  {t.duration && <span className="text-xs text-gray-400">{t.duration}</span>}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${catDot[t.specCategory] || 'bg-gray-400'}`} />
                  <span className="text-xs text-gray-500">{t.specName}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {t.indications?.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">{t.indications.length} indications</span>}
                  {t.benefits?.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-medium">{t.benefits.length} benefits</span>}
                  {t.preparation?.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-medium">{t.preparation.length} prep steps</span>}
                  {t.steps?.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-600 font-medium">{t.steps.length} steps</span>}
                  {t.faqs?.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 font-medium">{t.faqs.length} FAQs</span>}
                  {t.images?.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{t.images.length} images</span>}
                  {t.videoUrl && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-50 text-red-500 font-medium">Video</span>}
                </div>
              </div>

              {/* Actions — icon + label */}
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setViewItem(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs font-semibold">
                  <FiEye size={12} /> View
                </button>
                <button onClick={() => openEdit(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors text-xs font-semibold">
                  <FiEdit2 size={12} /> Edit
                </button>
                <button onClick={() => handleDelete(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-xs font-semibold">
                  <FiTrash2 size={12} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

                {/* Modal header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
                  <div>
                    <h2 className="text-lg font-bold text-navy-800">
                      {editingKey ? 'Edit Treatment' : 'Add New Treatment'}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">Rich details appear on the public treatment page</p>
                  </div>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiX size={22} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-7">

                  {/* ── Basic Info ── */}
                  <div className="space-y-4">
                    <SectionTitle>Basic Info</SectionTitle>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Treatment / Procedure Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        className="input-field" placeholder="e.g. Laparoscopic Appendectomy" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                      <select name="departmentId" value={form.departmentId} onChange={handleChange} required className="input-field">
                        <option value="">Select department…</option>
                        {departments.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input name="duration" value={form.duration} onChange={handleChange} className="input-field" placeholder="45 – 60 min" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Time</label>
                        <input name="recovery" value={form.recovery} onChange={handleChange} className="input-field" placeholder="1 – 3 days" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                      <textarea name="description" value={form.description} onChange={handleChange}
                        rows={2} className="input-field resize-none"
                        placeholder="Brief 1-2 line summary of the procedure…" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Detailed Description <span className="text-gray-400 font-normal">(shown on treatment page)</span>
                      </label>
                      <textarea name="longDescription" value={form.longDescription} onChange={handleChange}
                        rows={6} className="input-field resize-none"
                        placeholder="Write a detailed, multi-paragraph description of this treatment/procedure. Include what it involves, who it's for, how it's performed, and any important details patients should know…" />
                      <p className="text-xs text-gray-400 mt-1">This appears as the main content on the public treatment detail page</p>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* ── Rich Details ── */}
                  <div className="space-y-4">
                    <SectionTitle>Rich Details <span className="font-normal normal-case">(one item per line)</span></SectionTitle>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">When Is This Needed? <span className="text-gray-400 font-normal">(Indications)</span></label>
                      <textarea name="indications" value={form.indications} onChange={handleChange}
                        rows={3} className="input-field resize-none font-mono text-sm"
                        placeholder={"Severe abdominal pain\nRecurrent infections\nFailed conservative treatment"} />
                      <p className="text-xs text-gray-400 mt-1">{toLines(form.indications).length} items</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                      <textarea name="benefits" value={form.benefits} onChange={handleChange}
                        rows={3} className="input-field resize-none font-mono text-sm"
                        placeholder={"Minimally invasive\nFaster recovery\nLess post-operative pain"} />
                      <p className="text-xs text-gray-400 mt-1">{toLines(form.benefits).length} items</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">How to Prepare <span className="text-gray-400 font-normal">(numbered steps)</span></label>
                      <textarea name="preparation" value={form.preparation} onChange={handleChange}
                        rows={3} className="input-field resize-none font-mono text-sm"
                        placeholder={"Fast for 6–8 hours before procedure\nStop blood thinners as advised\nBring all previous reports"} />
                      <p className="text-xs text-gray-400 mt-1">{toLines(form.preparation).length} steps</p>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* ── What to Expect (Steps) ── */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <SectionTitle>
                        <span className="flex items-center gap-1.5"><FiList size={12} /> What to Expect <span className="font-normal normal-case text-gray-400">({steps.length} steps)</span></span>
                      </SectionTitle>
                      <button type="button" onClick={addStep}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors font-medium">
                        <FiPlus size={13} /> Add Step
                      </button>
                    </div>

                    {steps.length === 0 ? (
                      <div className="border-2 border-dashed border-gray-100 rounded-xl p-4 text-center text-sm text-gray-400">
                        No steps yet — click "Add Step" to describe the procedure journey
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {steps.map((step, idx) => (
                          <div key={idx} className="border border-teal-100 rounded-xl p-4 space-y-2 bg-teal-50/30">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className="text-xs font-bold text-gray-400">Step {idx + 1}</span>
                              </div>
                              <button type="button" onClick={() => removeStep(idx)}
                                className="text-gray-300 hover:text-red-500 transition-colors">
                                <FiX size={14} />
                              </button>
                            </div>
                            <input
                              value={step.title}
                              onChange={(e) => updateStep(idx, 'title', e.target.value)}
                              placeholder="Step title — e.g. Anaesthesia & Preparation"
                              className="input-field text-sm font-medium"
                            />
                            <textarea
                              value={step.desc}
                              onChange={(e) => updateStep(idx, 'desc', e.target.value)}
                              placeholder="Brief description of what happens in this step…"
                              rows={2}
                              className="input-field resize-none text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <hr className="border-gray-100" />

                  {/* ── Images ── */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <SectionTitle>Images <span className="font-normal normal-case text-gray-400">({form.images.length} selected)</span></SectionTitle>
                      <button type="button" onClick={() => setGalleryOpen(true)}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors font-medium">
                        <FiImage size={13} /> Add from Gallery
                      </button>
                    </div>

                    {form.images.length === 0 ? (
                      <div className="border-2 border-dashed border-gray-100 rounded-xl p-6 text-center text-sm text-gray-400">
                        No images selected — click "Add from Gallery"
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {form.images.map((url, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                            <img src={url} alt="" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                              <FiX size={11} className="text-white" />
                            </button>
                            {idx === 0 && (
                              <span className="absolute bottom-1 left-1 text-[9px] bg-primary-600 text-white px-1.5 py-0.5 rounded font-bold">Cover</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <hr className="border-gray-100" />

                  {/* ── Video ── */}
                  <div className="space-y-3">
                    <SectionTitle>Video</SectionTitle>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center gap-1.5"><FiYoutube size={14} className="text-red-500" /> YouTube / Video URL</span>
                      </label>
                      <input name="videoUrl" value={form.videoUrl} onChange={handleChange}
                        className="input-field" placeholder="https://www.youtube.com/watch?v=..." />
                      {form.videoUrl && (
                        <p className="text-xs text-green-600 mt-1 font-medium">✓ Video URL saved</p>
                      )}
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* ── FAQs ── */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <SectionTitle>
                        <span className="flex items-center gap-1.5"><FiHelpCircle size={12} /> FAQs <span className="font-normal normal-case text-gray-400">({faqs.length})</span></span>
                      </SectionTitle>
                      <button type="button" onClick={addFaq}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors font-medium">
                        <FiPlus size={13} /> Add FAQ
                      </button>
                    </div>

                    {faqs.length === 0 ? (
                      <div className="border-2 border-dashed border-gray-100 rounded-xl p-4 text-center text-sm text-gray-400">
                        No FAQs yet — click "Add FAQ"
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                          <div key={idx} className="border border-gray-100 rounded-xl p-4 space-y-2 bg-gray-50/50">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-gray-400">FAQ {idx + 1}</span>
                              <button type="button" onClick={() => removeFaq(idx)}
                                className="text-gray-300 hover:text-red-500 transition-colors">
                                <FiX size={14} />
                              </button>
                            </div>
                            <input
                              value={faq.question}
                              onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                              placeholder="Question — e.g. Is this surgery safe?"
                              className="input-field text-sm font-medium"
                            />
                            <textarea
                              value={faq.answer}
                              onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                              placeholder="Answer — detailed explanation…"
                              rows={2}
                              className="input-field resize-none text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center py-2.5">Cancel</button>
                    <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-2.5 disabled:opacity-60">
                      {saving ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Saving…
                        </span>
                      ) : editingKey ? 'Update Treatment' : 'Add Treatment'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Gallery Picker */}
      {galleryOpen && (
        <GalleryPicker
          onSelect={handleGallerySelect}
          onClose={() => setGalleryOpen(false)}
        />
      )}

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
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700">{viewItem.specName}</span>
                      {viewItem.specCategory && <span className="text-xs text-gray-400">{viewItem.specCategory}</span>}
                    </div>
                    <h2 className="font-heading font-bold text-navy-800 text-xl">{viewItem.name}</h2>
                  </div>
                  <button onClick={() => setViewItem(null)} className="text-gray-400 hover:text-gray-600 transition-colors mt-1">
                    <FiX size={20} />
                  </button>
                </div>

                <div className="px-6 py-5 space-y-5">
                  {/* Stats row */}
                  <div className="flex flex-wrap gap-3">
                    {viewItem.duration && (
                      <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium">
                        <FiClock size={14} /> {viewItem.duration}
                      </div>
                    )}
                    {viewItem.recovery && (
                      <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                        <FiActivity size={14} /> Recovery: {viewItem.recovery}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {viewItem.description && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Short Description</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{viewItem.description}</p>
                    </div>
                  )}

                  {/* Long Description */}
                  {viewItem.longDescription && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Detailed Description</p>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{viewItem.longDescription}</p>
                    </div>
                  )}

                  {/* Indications */}
                  {viewItem.indications?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Indications</p>
                      <ul className="space-y-1">
                        {viewItem.indications.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  {viewItem.benefits?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Benefits</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {viewItem.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 text-sm text-gray-700">
                            <FiCheck size={13} className="text-green-600 flex-shrink-0" />{b}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preparation */}
                  {viewItem.preparation?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">How to Prepare</p>
                      <ul className="space-y-1">
                        {viewItem.preparation.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What to Expect Steps */}
                  {viewItem.steps?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">What to Expect ({viewItem.steps.length} steps)</p>
                      <div className="space-y-2">
                        {viewItem.steps.map((s, i) => (
                          <div key={i} className="flex gap-3 items-start bg-teal-50/50 border border-teal-100 rounded-lg px-4 py-3">
                            <span className="w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-navy-800">{s.title}</p>
                              {s.desc && <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQs */}
                  {viewItem.faqs?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">FAQs ({viewItem.faqs.length})</p>
                      <div className="space-y-2">
                        {viewItem.faqs.map((faq, i) => (
                          <div key={i} className="border border-gray-100 rounded-lg px-4 py-3">
                            <p className="text-sm font-semibold text-navy-800 mb-1">{faq.question}</p>
                            <p className="text-sm text-gray-500">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Images */}
                  {viewItem.images?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Images ({viewItem.images.length})</p>
                      <div className="grid grid-cols-3 gap-2">
                        {viewItem.images.map((img, i) => (
                          <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                            <img src={img} alt={`img ${i + 1}`} className="w-full h-full object-cover" />
                            {i === 0 && <span className="absolute top-1 left-1 text-[10px] bg-primary-600 text-white px-1.5 py-0.5 rounded font-semibold">Cover</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Video */}
                  {viewItem.videoUrl && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Video</p>
                      <p className="text-sm text-primary-600 break-all">{viewItem.videoUrl}</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                  <button onClick={() => { setViewItem(null); openEdit(viewItem) }}
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
