// ─────────────────────────────────────────────────────────────
// pages/admin/AdminGallery.jsx
// Gallery management page.
// Supports folder creation/rename/delete, multi-image upload
// with title tagging, drag-to-reorder (order saved via batch
// Firestore write), and individual image deletion from both
// Firestore and Firebase Storage.
// Images are compressed to WebP before upload.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUpload, FiTrash2, FiImage, FiX, FiPlus, FiRefreshCw,
  FiEdit2, FiCheck, FiFolder, FiFolderPlus, FiMove, FiLink,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import {
  getFolders, createFolder, renameFolder, deleteFolder,
  getGallery, addGalleryImage, deleteGalleryImage,
  updateGalleryImage, updateImageOrders,
} from '../../services/gallery'
import { compressImage } from '../../utils/helpers'

export default function AdminGallery() {
  const [folders, setFolders] = useState([])
  const [images, setImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(true)
  const [activeFolderId, setActiveFolderId] = useState('')

  // Folder state
  const [creatingFolder, setCreatingFolder] = useState(false)
  const [savingFolder, setSavingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [renamingFolderId, setRenamingFolderId] = useState(null)
  const [renameFolderVal, setRenameFolderVal] = useState('')

  // Upload state
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadFolderId, setUploadFolderId] = useState('')
  const [selectedImages, setSelectedImages] = useState([]) // { id, file, preview, title, originalMB, compressedKB }
  const [compressing, setCompressing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null) // { done, total }

  // Image action state
  const [deletingId, setDeletingId] = useState(null)
  const [renamingImage, setRenamingImage] = useState(null)
  const [renameImageVal, setRenameImageVal] = useState('')
  const [movingImage, setMovingImage] = useState(null)

  // Drag-to-reorder state
  const dragItem = useRef(null)
  const [dragOverIdx, setDragOverIdx] = useState(null)

  const fileRef = useRef()
  const newFolderRef = useRef()
  const renameFolderRef = useRef()

  // ── Data loading ────────────────────────────────────────────────────────────

  const fetchFolders = async () => {
    try {
      setFolders(await getFolders())
    } catch {
      toast.error('Failed to load folders')
    }
  }

  const fetchImages = async () => {
    setLoadingImages(true)
    try {
      setImages(await getGallery(activeFolderId))
    } catch {
      toast.error('Failed to load images')
    } finally {
      setLoadingImages(false)
    }
  }

  useEffect(() => { fetchFolders() }, [])
  useEffect(() => { fetchImages() }, [activeFolderId])

  // ── Folder CRUD ─────────────────────────────────────────────────────────────

  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || savingFolder) {
      if (!savingFolder) setCreatingFolder(false)
      return
    }

    setSavingFolder(true)
    try {
      await createFolder(newFolderName.trim())
      toast.success('Folder created')
      setNewFolderName('')
      setCreatingFolder(false)
      await fetchFolders()
    } catch {
      toast.error('Failed to create folder')
    } finally {
      setSavingFolder(false)
    }
  }

  const startRenameFolder = (folder) => {
    setRenamingFolderId(folder.id)
    setRenameFolderVal(folder.name)
    setTimeout(() => renameFolderRef.current?.focus(), 0)
  }

  const commitRenameFolder = async (id) => {
    if (!renameFolderVal.trim() || savingFolder) {
      if (!savingFolder) setRenamingFolderId(null)
      return
    }

    setSavingFolder(true)
    try {
      await renameFolder(id, renameFolderVal.trim())
      setFolders((prev) =>
        prev.map((f) => (f.id === id ? { ...f, name: renameFolderVal.trim() } : f))
      )
    } catch {
      toast.error('Failed to rename folder')
    } finally {
      setRenamingFolderId(null)
      setSavingFolder(false)
    }
  }

  const handleDeleteFolder = async (folder) => {
    // Fetch images in this folder to show accurate count
    let folderImages = []
    try {
      folderImages = await getGallery(folder.id)
    } catch { /* ignore */ }

    const msg =
      folderImages.length > 0
        ? `"${folder.name}" has ${folderImages.length} image${folderImages.length !== 1 ? 's' : ''}.\nDelete the folder AND all its images?`
        : `Delete folder "${folder.name}"?`
    if (!window.confirm(msg)) return

    try {
      for (const img of folderImages) {
        await deleteGalleryImage(img.id, img.storagePath)
      }
      await deleteFolder(folder.id)
      if (activeFolderId === folder.id) setActiveFolderId('')
      await fetchFolders()
      await fetchImages()
      toast.success('Folder deleted')
    } catch {
      toast.error('Failed to delete folder')
    }
  }

  // ── Upload ──────────────────────────────────────────────────────────────────

  const openUpload = () => {
    setUploadFolderId(activeFolderId)
    setSelectedImages([])
    setUploadProgress(null)
    setUploadOpen(true)
  }

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    e.target.value = ''
    setCompressing(true)
    const results = await Promise.all(
      files.map(async (file) => {
        const id = Math.random().toString(36).slice(2)
        const rawTitle = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
        const isVideo = file.type?.startsWith('video/')
        if (isVideo) {
          return {
            id,
            file,
            preview: URL.createObjectURL(file),
            title: rawTitle,
            originalMB: (file.size / 1024 / 1024).toFixed(1),
            compressedKB: null,
            isVideo: true,
          }
        }
        try {
          const compressed = await compressImage(file)
          return {
            id,
            file: compressed,
            preview: URL.createObjectURL(compressed),
            title: rawTitle,
            originalMB: (file.size / 1024 / 1024).toFixed(1),
            compressedKB: (compressed.size / 1024).toFixed(0),
            isVideo: false,
          }
        } catch {
          return {
            id,
            file,
            preview: URL.createObjectURL(file),
            title: rawTitle,
            originalMB: (file.size / 1024 / 1024).toFixed(1),
            compressedKB: null,
            isVideo: false,
          }
        }
      })
    )
    setSelectedImages((prev) => [...prev, ...results])
    setCompressing(false)
  }

  const removeSelectedImage = (id) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== id))
  }

  const updateSelectedTitle = (id, title) => {
    setSelectedImages((prev) => prev.map((img) => img.id === id ? { ...img, title } : img))
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedImages.length) { toast.error('Select at least one image'); return }
    const missing = selectedImages.find((img) => !img.title.trim())
    if (missing) { toast.error('All images need a title'); return }
    setUploading(true)
    setUploadProgress({ done: 0, total: selectedImages.length })
    let failed = 0
    for (let i = 0; i < selectedImages.length; i++) {
      const img = selectedImages[i]
      try {
        await addGalleryImage({ title: img.title.trim(), folderId: uploadFolderId }, img.file)
        setUploadProgress({ done: i + 1, total: selectedImages.length })
      } catch {
        failed++
      }
    }
    setUploading(false)
    setUploadProgress(null)
    if (failed === 0) {
      toast.success(`${selectedImages.length} image${selectedImages.length !== 1 ? 's' : ''} uploaded`)
    } else {
      toast.error(`${failed} upload${failed !== 1 ? 's' : ''} failed`)
    }
    setUploadOpen(false)
    await fetchImages()
  }

  // ── Delete image ─────────────────────────────────────────────────────────────

  const handleDelete = async (img) => {
    if (!window.confirm('Delete this image?')) return
    setDeletingId(img.id)
    try {
      await deleteGalleryImage(img.id, img.storagePath)
      setImages((prev) => prev.filter((i) => i.id !== img.id))
      toast.success('Deleted')
    } catch {
      toast.error('Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  // ── Rename image ─────────────────────────────────────────────────────────────

  const handleRenameImage = async () => {
    if (!renameImageVal.trim()) { setRenamingImage(null); return }
    try {
      await updateGalleryImage(renamingImage.id, { title: renameImageVal.trim() })
      setImages((prev) =>
        prev.map((i) =>
          i.id === renamingImage.id ? { ...i, title: renameImageVal.trim() } : i
        )
      )
      toast.success('Renamed')
    } catch {
      toast.error('Failed to rename')
    } finally {
      setRenamingImage(null)
    }
  }

  // ── Move image ────────────────────────────────────────────────────────────────

  const handleMoveImage = async (img, targetFolderId) => {
    try {
      await updateGalleryImage(img.id, { folderId: targetFolderId })
      // Remove from current view if filtering by folder
      if (activeFolderId !== '') {
        setImages((prev) => prev.filter((i) => i.id !== img.id))
      } else {
        setImages((prev) =>
          prev.map((i) => (i.id === img.id ? { ...i, folderId: targetFolderId } : i))
        )
      }
      toast.success('Image moved')
    } catch {
      toast.error('Failed to move image')
    } finally {
      setMovingImage(null)
    }
  }

  // ── Drag to reorder ──────────────────────────────────────────────────────────

  const handleDragStart = (e, index) => {
    dragItem.current = index
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnter = (e, index) => {
    e.preventDefault()
    setDragOverIdx(index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e, index) => {
    e.preventDefault()
    const from = dragItem.current
    if (from === null || from === index) { setDragOverIdx(null); return }

    const next = [...images]
    const [moved] = next.splice(from, 1)
    next.splice(index, 0, moved)
    setImages(next)
    setDragOverIdx(null)
    dragItem.current = null

    try {
      await updateImageOrders(next.map((img, i) => ({ id: img.id, order: i })))
    } catch {
      toast.error('Failed to save order')
    }
  }

  const handleDragEnd = () => {
    setDragOverIdx(null)
    dragItem.current = null
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  const activeFolder = folders.find((f) => f.id === activeFolderId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Gallery</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {images.length} image{images.length !== 1 ? 's' : ''}
            {activeFolder ? ` in "${activeFolder.name}"` : ' total'}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchImages} className="btn-secondary text-sm py-2 px-3">
            <FiRefreshCw size={14} />
          </button>
          <button
            onClick={() => {
              setCreatingFolder(true)
              setTimeout(() => newFolderRef.current?.focus(), 0)
            }}
            className="btn-secondary text-sm py-2 px-4"
          >
            <FiFolderPlus size={16} /> New Folder
          </button>
          <button onClick={openUpload} className="btn-primary text-sm py-2 px-4">
            <FiPlus size={16} /> Upload
          </button>
        </div>
      </div>

      {/* Folder Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* All tab */}
        <button
          onClick={() => setActiveFolderId('')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            !activeFolderId
              ? 'bg-primary-600 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-400'
          }`}
        >
          All
        </button>

        {/* Folder tabs */}
        {folders.map((folder) => (
          <div key={folder.id} className="group relative">
            {renamingFolderId === folder.id ? (
              <div className="flex items-center gap-1 bg-white border-2 border-primary-400 rounded-xl px-3 py-1.5">
                <FiFolder size={13} className="text-primary-500 shrink-0" />
                <input
                  ref={renameFolderRef}
                  value={renameFolderVal}
                  onChange={(e) => setRenameFolderVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitRenameFolder(folder.id)
                    if (e.key === 'Escape') setRenamingFolderId(null)
                  }}
                  disabled={savingFolder}
                  className="text-sm font-medium outline-none bg-transparent w-28 disabled:opacity-50"
                />
                <button
                  onClick={() => commitRenameFolder(folder.id)}
                  disabled={savingFolder}
                  className="text-primary-600 hover:text-primary-800 shrink-0 disabled:opacity-40"
                >
                  {savingFolder ? (
                    <FiRefreshCw size={14} className="animate-spin" />
                  ) : (
                    <FiCheck size={14} />
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveFolderId(folder.id)}
                className={`flex items-center gap-1.5 pl-3 pr-1.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeFolderId === folder.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-400'
                }`}
              >
                <FiFolder size={13} />
                {folder.name}
                <span className="flex items-center gap-0.5 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); startRenameFolder(folder) }}
                    onKeyDown={(e) => e.key === 'Enter' && startRenameFolder(folder)}
                    className={`p-0.5 rounded hover:bg-black/10 ${
                      activeFolderId === folder.id ? 'text-white/70 hover:text-white' : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <FiEdit2 size={11} />
                  </span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder) }}
                    onKeyDown={(e) => e.key === 'Enter' && handleDeleteFolder(folder)}
                    className={`p-0.5 rounded hover:bg-black/10 ${
                      activeFolderId === folder.id ? 'text-white/70 hover:text-white' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <FiX size={11} />
                  </span>
                </span>
              </button>
            )}
          </div>
        ))}

        {/* Inline new folder input or + button */}
        {creatingFolder ? (
          <div className="flex items-center gap-1 bg-white border-2 border-primary-400 rounded-xl px-3 py-1.5">
            <FiFolder size={13} className="text-primary-500 shrink-0" />
            <input
              ref={newFolderRef}
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFolder()
                if (e.key === 'Escape') { setCreatingFolder(false); setNewFolderName('') }
              }}
              disabled={savingFolder}
              placeholder="Folder name"
              className="text-sm font-medium outline-none bg-transparent w-28 placeholder-gray-400 disabled:opacity-50"
            />
            <button
              onClick={handleCreateFolder}
              disabled={savingFolder}
              className="text-primary-600 hover:text-primary-800 shrink-0 disabled:opacity-40"
            >
              {savingFolder ? (
                <FiRefreshCw size={14} className="animate-spin" />
              ) : (
                <FiCheck size={14} />
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setCreatingFolder(true)
              setTimeout(() => newFolderRef.current?.focus(), 0)
            }}
            className="p-2 rounded-xl text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors border border-dashed border-gray-300 hover:border-primary-400"
            title="New folder"
          >
            <FiPlus size={14} />
          </button>
        )}
      </div>

      {/* Drag hint */}
      {images.length > 1 && (
        <p className="text-xs text-gray-400 -mt-2">
          Drag images to reorder · Hover an image for actions
        </p>
      )}

      {/* ── Upload Modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {uploadOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => !uploading && setUploadOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className={`bg-white rounded-2xl shadow-2xl w-full transition-all duration-200 ${selectedImages.length > 0 ? 'max-w-2xl' : 'max-w-md'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-bold text-navy-800">Upload Images</h2>
                    {selectedImages.length > 0 && (
                      <p className="text-xs text-gray-400 mt-0.5">{selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected · auto-compressed to WebP</p>
                    )}
                  </div>
                  <button onClick={() => !uploading && setUploadOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <FiX size={22} />
                  </button>
                </div>

                <form onSubmit={handleUpload}>
                  <div className="p-5 space-y-4">
                    {/* Drop zone */}
                    <div
                      className={`border-2 border-dashed rounded-xl flex flex-col items-center cursor-pointer hover:border-primary-400 transition-colors bg-gray-50 ${selectedImages.length > 0 ? 'py-4 border-gray-200' : 'py-10 border-gray-200 min-h-[160px] justify-center'}`}
                      onClick={() => !compressing && !uploading && fileRef.current?.click()}
                    >
                      {compressing ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="animate-spin h-5 w-5 text-primary-400" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Compressing images...
                        </div>
                      ) : (
                        <>
                          <FiUpload size={selectedImages.length > 0 ? 20 : 32} className="text-gray-300 mb-1.5" />
                          <p className={`text-gray-500 font-medium ${selectedImages.length > 0 ? 'text-xs' : 'text-sm'}`}>
                            {selectedImages.length > 0 ? 'Click to add more images' : 'Click to select images'}
                          </p>
                          {selectedImages.length === 0 && (
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP, MP4, WEBM · multiple allowed</p>
                          )}
                        </>
                      )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*,video/*" multiple onChange={handleImageChange} className="hidden" />

                    {/* Selected images grid */}
                    {selectedImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                        {selectedImages.map((img) => (
                          <div key={img.id} className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                            {/* Thumbnail */}
                            <div className="aspect-square relative">
                              {img.isVideo ? (
                                <video src={img.preview} className="w-full h-full object-cover" muted playsInline />
                              ) : (
                                <img src={img.preview} alt={img.title} className="w-full h-full object-cover" />
                              )}
                              {img.isVideo && (
                                <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                                  Video
                                </span>
                              )}
                            </div>
                            {/* Size badge */}
                            {(img.compressedKB || img.originalMB) && (
                              <span className="absolute top-1.5 left-1.5 bg-green-500/90 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                                {img.compressedKB ? `${img.originalMB}MB → ${img.compressedKB}KB` : `${img.originalMB}MB`}
                              </span>
                            )}
                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => removeSelectedImage(img.id)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                              <FiX size={11} />
                            </button>
                            {/* Title input */}
                            <div className="p-2">
                              <input
                                value={img.title}
                                onChange={(e) => updateSelectedTitle(img.id, e.target.value)}
                                className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-primary-400 bg-white"
                                placeholder="Title"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Folder selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Folder</label>
                      <select
                        value={uploadFolderId}
                        onChange={(e) => setUploadFolderId(e.target.value)}
                        className="input-field"
                        disabled={uploading}
                      >
                        <option value="">— No folder —</option>
                        {folders.map((f) => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Upload progress bar */}
                    {uploadProgress && (
                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Uploading...</span>
                          <span>{uploadProgress.done} / {uploadProgress.total}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full transition-all duration-300"
                            style={{ width: `${(uploadProgress.done / uploadProgress.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex gap-3 px-5 pb-5">
                    <button
                      type="button"
                      onClick={() => setUploadOpen(false)}
                      disabled={uploading}
                      className="btn-secondary flex-1 justify-center py-2.5 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploading || compressing || selectedImages.length === 0}
                      className="btn-primary flex-1 justify-center py-2.5 disabled:opacity-60"
                    >
                      {uploading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Uploading {uploadProgress?.done ?? 0}/{uploadProgress?.total ?? selectedImages.length}
                        </span>
                      ) : selectedImages.length > 0 ? (
                        `Upload ${selectedImages.length} image${selectedImages.length !== 1 ? 's' : ''}`
                      ) : 'Upload'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Rename Image Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {renamingImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setRenamingImage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-navy-800 mb-4">Rename Image</h2>
                <input
                  autoFocus
                  value={renameImageVal}
                  onChange={(e) => setRenameImageVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRenameImage()
                    if (e.key === 'Escape') setRenamingImage(null)
                  }}
                  className="input-field mb-4"
                  placeholder="Image title"
                />
                <div className="flex gap-3">
                  <button onClick={() => setRenamingImage(null)} className="btn-secondary flex-1 justify-center py-2.5">Cancel</button>
                  <button onClick={handleRenameImage} className="btn-primary flex-1 justify-center py-2.5">Save</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Move Image Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {movingImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMovingImage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-navy-800 mb-1">Move to Folder</h2>
                <p className="text-sm text-gray-500 mb-4 truncate">"{movingImage.title}"</p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <button
                    onClick={() => handleMoveImage(movingImage, '')}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors hover:border-primary-400 hover:bg-primary-50 ${
                      !movingImage.folderId ? 'border-primary-400 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    — No folder
                  </button>
                  {folders.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleMoveImage(movingImage, f.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors hover:border-primary-400 hover:bg-primary-50 flex items-center gap-2 ${
                        movingImage.folderId === f.id ? 'border-primary-400 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <FiFolder size={14} />
                      {f.name}
                    </button>
                  ))}
                </div>
                <button onClick={() => setMovingImage(null)} className="btn-secondary w-full justify-center py-2.5 mt-4">
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Image Grid ───────────────────────────────────────────────────────── */}
      {loadingImages ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-gray-400">
          <FiImage size={40} className="mb-3 opacity-40" />
          <p className="font-medium">No images {activeFolderId ? 'in this folder' : 'yet'}</p>
          <button onClick={openUpload} className="btn-primary mt-4 text-sm py-2 px-4">
            <FiPlus size={15} /> Upload Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`group relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-grab active:cursor-grabbing select-none transition-all duration-200 ${
                dragOverIdx === index && dragItem.current !== index
                  ? 'ring-2 ring-primary-500 ring-offset-2 scale-[1.03]'
                  : ''
              }`}
            >
              {img.type === 'video' ? (
                <div className="w-full h-full relative">
                  <video
                    src={img.image}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                  draggable={false}
                />
              )}

              {/* Drag handle dots */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg p-1.5 text-white pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <circle cx="3" cy="3" r="1.5" />
                  <circle cx="9" cy="3" r="1.5" />
                  <circle cx="3" cy="9" r="1.5" />
                  <circle cx="9" cy="9" r="1.5" />
                </svg>
              </div>

              {/* Folder badge (shown in All view) */}
              {!activeFolderId && img.folderId && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FiFolder size={9} />
                    {folders.find((f) => f.id === img.folderId)?.name ?? 'Folder'}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-start justify-end p-3">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                  <p className="text-white text-xs font-medium truncate mb-2">{img.title}</p>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setRenamingImage(img)
                        setRenameImageVal(img.title)
                      }}
                      className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-white/20 text-white hover:bg-white/35 transition-colors"
                      title="Rename"
                    >
                      <FiEdit2 size={11} /> Rename
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setMovingImage(img) }}
                      className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-white/20 text-white hover:bg-white/35 transition-colors"
                      title="Move to folder"
                    >
                      <FiMove size={11} /> Move
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(img.image)
                          .then(() => toast.success('Link copied'))
                          .catch(() => toast.error('Copy failed'))
                      }}
                      className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-white/20 text-white hover:bg-white/35 transition-colors"
                      title="Copy image link"
                    >
                      <FiLink size={11} /> Copy
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(img) }}
                      disabled={deletingId === img.id}
                      className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <FiTrash2 size={11} />
                      {deletingId === img.id ? '...' : 'Del'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
