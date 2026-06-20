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
  query, orderBy, where, serverTimestamp, getDoc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/config'

const COL = 'gallery'
const FOLDERS_COL = 'galleryFolders'

const DEFAULT_FOLDERS = [
  { id: 'infrastructure', name: 'Infrastructure', order: 0 }
]

const LOCAL_INFRASTRUCTURE_IMAGES = [
  { id: 'infra-1', title: 'Nova Max Hospital Building', image: '/Infrastructure/nova-max-hospital-building.png', type: 'image', order: 0, folderId: 'infrastructure' },
  { id: 'infra-2', title: 'Dr. M.K. Sinha (Director)', image: '/Infrastructure/dr-mk-sinha-portrait.png', type: 'image', order: 1, folderId: 'infrastructure' },
  { id: 'infra-3', title: 'Operation Theatre', image: '/Infrastructure/operation-theatre.webp', type: 'image', order: 2, folderId: 'infrastructure' },
  { id: 'infra-4', title: 'Laparoscopic Surgery in Progress', image: '/Infrastructure/laparoscopic-surgery-in-progress.webp', type: 'image', order: 3, folderId: 'infrastructure' },
  { id: 'infra-5', title: 'Dr. M.K. Sinha (Chief Consultant)', image: '/Infrastructure/dr-mk-sinha-office.webp', type: 'image', order: 4, folderId: 'infrastructure' },
  { id: 'infra-6', title: 'OPD Examination Room', image: '/Infrastructure/opd-examination-room.webp', type: 'image', order: 5, folderId: 'infrastructure' },
  { id: 'infra-7', title: 'OPD Consultation', image: '/Infrastructure/doctor-patient-consultation.webp', type: 'image', order: 6, folderId: 'infrastructure' },
  { id: 'infra-8', title: 'OPD Patient Care', image: '/Infrastructure/doctor-consulting-elderly-patient.webp', type: 'image', order: 7, folderId: 'infrastructure' },
  { id: 'infra-9', title: 'Hospital Waiting Area', image: '/Infrastructure/hospital-waiting-lobby.webp', type: 'image', order: 8, folderId: 'infrastructure' },
  { id: 'infra-10', title: 'ICU & Ward Patient Beds', image: '/Infrastructure/icu-ward-beds.jfif', type: 'image', order: 9, folderId: 'infrastructure' },
  { id: 'infra-11', title: 'C-Arm Surgical Imaging System', image: '/Infrastructure/c-arm-xray-machine.webp', type: 'image', order: 10, folderId: 'infrastructure' },
  { id: 'infra-12', title: 'Consulting Chamber', image: '/Infrastructure/dr-sinha-handshake-advocate.webp', type: 'image', order: 11, folderId: 'infrastructure' },
  { id: 'infra-13', title: 'Dr. M.K. Sinha Profile', image: '/Infrastructure/dr-mk-sinha-profile.webp', type: 'image', order: 12, folderId: 'infrastructure' },
]

// ─── Folders ──────────────────────────────────────────────────

// Fetch all gallery folders sorted by their display order
export async function getFolders() {
  try {
    const snap = await getDocs(query(collection(db, FOLDERS_COL), orderBy('order', 'asc')))
    if (snap.empty) {
      return DEFAULT_FOLDERS
    }
    const folders = snap.docs.map((d) => ({ ...d.data(), id: d.id }))
    
    // Ensure "Infrastructure" exists in the folders list
    const hasInfra = folders.some(f => f.name?.toLowerCase() === 'infrastructure')
    if (!hasInfra) {
      folders.unshift({ id: 'infrastructure', name: 'Infrastructure', order: -1 })
    }
    return folders
  } catch (e) {
    console.error("Error fetching folders, using defaults:", e)
    return DEFAULT_FOLDERS
  }
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
  let isInfrastructureFolder = folderId === 'infrastructure'
  let matchedFolderId = folderId

  if (folderId && !isInfrastructureFolder) {
    try {
      const folderDoc = await getDoc(doc(db, FOLDERS_COL, folderId))
      if (folderDoc.exists()) {
        const folderName = folderDoc.data().name || ''
        if (folderName.toLowerCase() === 'infrastructure') {
          isInfrastructureFolder = true
        }
      }
    } catch (e) {
      console.error("Firestore getDoc error for folder:", e)
    }
  }

  try {
    const q = folderId
      ? query(collection(db, COL), where('folderId', '==', folderId))
      : query(collection(db, COL))
    const snap = await getDocs(q)
    const docs = snap.docs.map((d) => ({ ...d.data(), id: d.id }))
    
    if (docs.length > 0) {
      const sorted = docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      if (!folderId) {
        const dbImagesPaths = new Set(docs.map(img => img.image))
        const localNotUploaded = LOCAL_INFRASTRUCTURE_IMAGES.filter(img => !dbImagesPaths.has(img.image))
        return [...sorted, ...localNotUploaded]
      }
      return sorted
    }
  } catch (e) {
    console.error("Firestore getGallery error:", e)
  }

  // Fallback to local images
  if (isInfrastructureFolder || !folderId) {
    return LOCAL_INFRASTRUCTURE_IMAGES.map(img => ({
      ...img,
      folderId: matchedFolderId || 'infrastructure'
    }))
  }
  return []
}

// Lookup images by folder name instead of folder ID (used by GalleryStrip on homepage)
export async function getGalleryByFolderName(folderName) {
  if (folderName.toLowerCase() === 'infrastructure') {
    return LOCAL_INFRASTRUCTURE_IMAGES
  }

  try {
    const snap = await getDocs(collection(db, FOLDERS_COL))
    const allFolders = snap.docs.map((d) => ({ ...d.data(), id: d.id }))
    // Case-insensitive match
    const folder = allFolders.find(
      (d) => d.name?.toLowerCase() === folderName.toLowerCase()
    )
    if (!folder) {
      if (folderName.toLowerCase() === 'infrastructure') return LOCAL_INFRASTRUCTURE_IMAGES
      return []
    }
    const docs = await getGallery(folder.id)
    if (docs.length === 0 && folderName.toLowerCase() === 'infrastructure') {
      return LOCAL_INFRASTRUCTURE_IMAGES
    }
    return docs
  } catch (e) {
    if (folderName.toLowerCase() === 'infrastructure') {
      return LOCAL_INFRASTRUCTURE_IMAGES
    }
    return []
  }
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
