// ─────────────────────────────────────────────────────────────
// services/gallery.js
// Firestore + Storage management for the gallery feature.
// Two collections are used:
//   galleryFolders  – named albums (e.g. "OT", "Reception")
//   gallery         – individual images, each linked to a folderId
// Images are ordered by an `order` field for drag-to-reorder.
// ─────────────────────────────────────────────────────────────

import {
  collection, addDoc, getDocs, doc, deleteDoc, updateDoc, writeBatch,
  query, orderBy, where, serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/config'

const COL = 'gallery'
const FOLDERS_COL = 'galleryFolders'

// ─── Folders ──────────────────────────────────────────────────

// Fetch all gallery folders sorted by their display order
export async function getFolders() {
  const snap = await getDocs(query(collection(db, FOLDERS_COL), orderBy('order', 'asc')))
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

// Create a new folder; order is set to current folder count (appended last)
export async function createFolder(name) {
  const snap = await getDocs(collection(db, FOLDERS_COL))
  return addDoc(collection(db, FOLDERS_COL), {
    name: name.trim(),
    order: snap.size,      // place at end of list
    createdAt: serverTimestamp(),
  })
}

export async function renameFolder(id, name) {
  return updateDoc(doc(db, FOLDERS_COL, id), { name: name.trim() })
}

export async function deleteFolder(id) {
  return deleteDoc(doc(db, FOLDERS_COL, id))
}

// ─── Images ───────────────────────────────────────────────────

// Fetch images for a folder (or all images if no folderId given)
// Results are sorted client-side by `order` to respect manual ordering
export async function getGallery(folderId = '') {
  const q = folderId
    ? query(collection(db, COL), where('folderId', '==', folderId))
    : query(collection(db, COL))
  const snap = await getDocs(q)
  const docs = snap.docs.map((d) => ({ ...d.data(), id: d.id }))
  return docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}

// Lookup images by folder name instead of folder ID (used by GalleryStrip on homepage)
export async function getGalleryByFolderName(folderName) {
  const snap = await getDocs(collection(db, FOLDERS_COL))
  const allFolders = snap.docs.map((d) => ({ ...d.data(), id: d.id }))
  // Case-insensitive match
  const folder = allFolders.find(
    (d) => d.name?.toLowerCase() === folderName.toLowerCase()
  )
  if (!folder) return []
  return getGallery(folder.id)
}

// Upload a new image/video to Storage and save its metadata to Firestore
// `order` is set to current media count within the folder
export async function addGalleryImage(data, mediaFile) {
  const { folderId = '' } = data
  const countSnap = await getDocs(
    folderId
      ? query(collection(db, COL), where('folderId', '==', folderId))
      : query(collection(db, COL))
  )
  const isVideo = mediaFile.type?.startsWith('video/')
  const type = isVideo ? 'video' : 'image'
  const storageRef = ref(storage, `gallery/${Date.now()}_${mediaFile.name}`)
  await uploadBytes(storageRef, mediaFile)
  const mediaUrl = await getDownloadURL(storageRef)
  return addDoc(collection(db, COL), {
    title: data.title,
    folderId,
    image: mediaUrl,
    type,
    storagePath: storageRef.fullPath,  // stored so we can delete from Storage later
    order: countSnap.size,
    createdAt: serverTimestamp(),
  })
}

// Update image metadata (title, folderId, etc.) without touching the file
export async function updateGalleryImage(id, data) {
  return updateDoc(doc(db, COL, id), data)
}

// Batch-update `order` fields after drag-to-reorder (single Firestore write)
// updates: [{ id, order }, ...]
export async function updateImageOrders(updates) {
  const batch = writeBatch(db)
  updates.forEach(({ id, order }) => batch.update(doc(db, COL, id), { order }))
  return batch.commit()
}

// Delete image from both Storage and Firestore
export async function deleteGalleryImage(id, storagePath) {
  if (storagePath) {
    try { await deleteObject(ref(storage, storagePath)) } catch { /* file may already be gone */ }
  }
  return deleteDoc(doc(db, COL, id))
}
