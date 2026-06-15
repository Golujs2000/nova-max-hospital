import {
  collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc,
  query, where, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'

const COL = 'treatments'

// Fetch all treatments (used in Admin Treatments)
export async function getTreatments() {
  const snap = await getDocs(collection(db, COL))
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

// Fetch treatments by their parent ID
export async function getTreatmentsByParentId(parentId) {
  const q = query(collection(db, COL), where('parentId', '==', parentId))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

// Fetch a single treatment by slug
export async function getTreatmentBySlug(slug) {
  const q = query(collection(db, COL), where('slug', '==', slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return { ...snap.docs[0].data(), id: snap.docs[0].id }
}

// Add a new treatment
export async function addTreatment(data) {
  return addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp() })
}

// Update an existing treatment
export async function updateTreatment(id, data) {
  return updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() })
}

// Delete a treatment
export async function deleteTreatment(id) {
  return deleteDoc(doc(db, COL, id))
}
