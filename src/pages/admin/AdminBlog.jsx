// ─────────────────────────────────────────────────────────────
// pages/admin/AdminBlog.jsx
// Blog post management page.
// Features: create/edit posts with title, slug (auto-generated),
// category, excerpt, full content (textarea), featured image
// (upload or pick from gallery), and publish toggle.
// Drafts are visible only in this admin view (publishedOnly=false).
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiUpload,
  FiFileText, FiRefreshCw, FiEye, FiImage,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getBlogs, addBlog, updateBlog, deleteBlog } from '../../services/blog'
import { formatDate, slugify } from '../../utils/helpers'
import GalleryPicker from '../../components/admin/GalleryPicker'

const EMPTY_FORM = {
  title: '', slug: '', excerpt: '', content: '',
  author: '', category: '', tags: '', published: false, image: '',
}

const CATEGORIES = ['Health Tips', 'Medical News', 'Patient Stories', 'Research', 'Wellness', 'Other']

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([])
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

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      setBlogs(await getBlogs(false))
    } catch {
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBlogs() }, [])

  const openAddModal = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImageFile(null)
    setImagePreview('')
    setModalOpen(true)
  }

  const openEditModal = (blog) => {
    setEditingId(blog.id)
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || '',
      category: blog.category || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
      published: blog.published || false,
      image: blog.image || '',
    })
    setImageFile(null)
    setImagePreview(blog.image || '')
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
    if (name === 'title') {
      setForm((prev) => ({ ...prev, title: value, slug: slugify(value) }))
    } else {
      setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.content) {
      toast.error('Title and content are required')
      return
    }
    setSaving(true)
    try {
      const data = {
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      }
      if (editingId) {
        await updateBlog(editingId, data, imageFile)
        toast.success('Blog post updated')
      } else {
        await addBlog(data, imageFile)
        toast.success('Blog post created')
      }
      await fetchBlogs()
      closeModal()
    } catch {
      toast.error('Failed to save blog post')
    } finally {
      setSaving(false)
    }
  }

  const handleTogglePublish = async (blog) => {
    try {
      await updateBlog(blog.id, { ...blog, published: !blog.published }, null)
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, published: !b.published } : b))
      )
      toast.success(`Post ${blog.published ? 'unpublished' : 'published'}`)
    } catch {
      toast.error('Failed to update publish status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deleteBlog(id)
      setBlogs((prev) => prev.filter((b) => b.id !== id))
      toast.success('Blog post deleted')
    } catch {
      toast.error('Failed to delete post')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Blog</h1>
          <p className="text-gray-500 text-sm mt-0.5">{blogs.length} post{blogs.length !== 1 ? 's' : ''} total</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchBlogs} className="btn-secondary text-sm py-2 px-4">
            <FiRefreshCw size={14} />
          </button>
          <button onClick={openAddModal} className="btn-primary text-sm py-2 px-4">
            <FiPlus size={16} /> New Post
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <FiFileText size={36} className="mb-3 opacity-40" />
            <p className="font-medium">No blog posts yet</p>
            <button onClick={openAddModal} className="btn-primary mt-4 text-sm py-2 px-4">
              <FiPlus size={15} /> Create First Post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Title', 'Author', 'Category', 'Published', 'Views', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {blogs.map((blog) => (
                  <motion.tr
                    key={blog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800 max-w-[200px] truncate">{blog.title}</div>
                      <div className="text-xs text-gray-400 font-mono">{blog.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{blog.author || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {blog.category && (
                        <span className="badge bg-blue-50 text-blue-700 text-xs">{blog.category}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${blog.published ? 'bg-green-500' : 'bg-gray-200'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-all ${blog.published ? 'left-5' : 'left-0.5'}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiEye size={13} /> {blog.views || 0}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(blog)}
                          className="text-primary-500 hover:text-primary-700 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          disabled={deletingId === blog.id}
                          className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
                  <h2 className="text-lg font-bold text-navy-800">
                    {editingId ? 'Edit Post' : 'New Blog Post'}
                  </h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <FiX size={22} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Cover Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image</label>
                    {imagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                        <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover" />
                        <button
                          type="button"
                          onClick={() => { setImagePreview(''); setImageFile(null); setForm((p) => ({ ...p, image: '' })) }}
                          className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow hover:bg-white transition-colors"
                        >
                          <FiX size={14} className="text-gray-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center bg-gray-50">
                        <FiImage size={28} className="text-gray-300 mb-2" />
                        <p className="text-sm text-gray-400 mb-3">No image selected</p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
                          >
                            <FiUpload size={13} /> Upload File
                          </button>
                          <button
                            type="button"
                            onClick={() => setGalleryPickerOpen(true)}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-primary-200 text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors"
                          >
                            <FiImage size={13} /> Pick from Gallery
                          </button>
                        </div>
                      </div>
                    )}
                    {imagePreview && (
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
                        >
                          <FiUpload size={13} /> Replace with Upload
                        </button>
                        <button
                          type="button"
                          onClick={() => setGalleryPickerOpen(true)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-primary-200 text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors"
                        >
                          <FiImage size={13} /> Pick from Gallery
                        </button>
                      </div>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input name="title" value={form.title} onChange={handleChange} required className="input-field" placeholder="Post title..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <input name="slug" value={form.slug} onChange={handleChange} className="input-field font-mono text-sm" placeholder="auto-generated-from-title" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                    <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} className="input-field resize-none" placeholder="Brief description..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                    <textarea name="content" value={form.content} onChange={handleChange} required rows={8} className="input-field resize-none" placeholder="Write your blog content here..." />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                      <input name="author" value={form.author} onChange={handleChange} className="input-field" placeholder="Dr. Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select name="category" value={form.category} onChange={handleChange} className="input-field">
                        <option value="">Select category</option>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                    <input name="tags" value={form.tags} onChange={handleChange} className="input-field" placeholder="health, tips, cardiology" />
                  </div>

                  {/* Published toggle */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setForm((p) => ({ ...p, published: !p.published }))}
                      className={`w-11 h-6 rounded-full transition-colors relative ${form.published ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all ${form.published ? 'left-5' : 'left-0.5'}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Publish immediately</span>
                  </label>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center py-2.5">Cancel</button>
                    <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-2.5 disabled:opacity-60">
                      {saving ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
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
