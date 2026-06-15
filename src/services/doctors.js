// ─────────────────────────────────────────────────────────────
// services/doctors.js
// Firestore CRUD for the `doctors` collection.
// Images are stored in Firebase Storage under /doctors/
// and the download URL is saved on the document.
// ─────────────────────────────────────────────────────────────

import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  query, orderBy, where, serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/config'
import { slugify } from '../utils/helpers'

const COL = 'doctors'

// Fetch all doctors, optionally filtered by specialty
export async function getDoctors(filters = {}) {
  let q = query(collection(db, COL), orderBy('name'))
  if (filters.specialty) {
    // Composite query requires a Firestore index on (specialty, name)
    q = query(collection(db, COL), where('specialty', '==', filters.specialty), orderBy('name'))
  }
  const snap = await getDocs(q)
  return snap.docs.map((d) => {
    const data = d.data()
    return {
      ...data,
      id: d.id,
      slug: data.slug || slugify(data.name || ''),
    }
  })
}

// Fetch only doctors marked as featured (shown on homepage)
export async function getFeaturedDoctors() {
  const q = query(collection(db, COL), where('featured', '==', true))
  const snap = await getDocs(q)
  return snap.docs.map((d) => {
    const data = d.data()
    return {
      ...data,
      id: d.id,
      slug: data.slug || slugify(data.name || ''),
    }
  })
}

// Add a new doctor; uploads profile image to Storage if provided
export async function addDoctor(data, imageFile) {
  let imageUrl = data.image || ''
  if (imageFile) {
    const storageRef = ref(storage, `doctors/${Date.now()}_${imageFile.name}`)
    await uploadBytes(storageRef, imageFile)
    imageUrl = await getDownloadURL(storageRef)
  }
  return addDoc(collection(db, COL), { ...data, image: imageUrl, createdAt: serverTimestamp() })
}

// Update an existing doctor; replaces image if a new file is provided
export async function updateDoctor(id, data, imageFile) {
  let imageUrl = data.image || ''
  if (imageFile) {
    const storageRef = ref(storage, `doctors/${Date.now()}_${imageFile.name}`)
    await uploadBytes(storageRef, imageFile)
    imageUrl = await getDownloadURL(storageRef)
  }
  return updateDoc(doc(db, COL, id), { ...data, image: imageUrl, updatedAt: serverTimestamp() })
}

// Delete a doctor and attempt to remove their Storage image
export async function deleteDoctor(id, imageUrl) {
  if (imageUrl) {
    try {
      await deleteObject(ref(storage, imageUrl))
    } catch { /* ignore — image may have already been deleted */ }
  }
  return deleteDoc(doc(db, COL, id))
}
