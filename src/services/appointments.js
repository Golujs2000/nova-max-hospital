// ─────────────────────────────────────────────────────────────
// services/appointments.js
// Firestore CRUD for the `appointments` collection.
// New appointments are created with status: 'pending'.
// Admins can update status, reschedule, or delete appointments.
// ─────────────────────────────────────────────────────────────

import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  query, orderBy, where, serverTimestamp, limit,
} from 'firebase/firestore'
import { db } from '../firebase/config'

const COL = 'appointments'

// Create a new appointment from the public booking form
export async function createAppointment(data) {
  return addDoc(collection(db, COL), {
    ...data,
    status: 'pending',    // initial status — admin confirms or cancels
    createdAt: serverTimestamp(),
  })
}

// Fetch all appointments; pass { status } to filter by a specific status
export async function getAppointments(filters = {}) {
  let q = query(collection(db, COL), orderBy('createdAt', 'desc'))
  if (filters.status) {
    q = query(collection(db, COL), where('status', '==', filters.status), orderBy('createdAt', 'desc'))
  }
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

// Update the status of an appointment (e.g. 'confirmed', 'cancelled', 'completed')
export async function updateAppointmentStatus(id, status) {
  return updateDoc(doc(db, COL, id), { status, updatedAt: serverTimestamp() })
}

// Reschedule an appointment to a new date and time slot
export async function rescheduleAppointment(id, { date, timeSlot }) {
  return updateDoc(doc(db, COL, id), { date, timeSlot, updatedAt: serverTimestamp() })
}

// Permanently delete an appointment record
export async function deleteAppointment(id) {
  return deleteDoc(doc(db, COL, id))
}

// Fetch the N most recent appointments (used on the admin dashboard)
export async function getRecentAppointments(n = 5) {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'), limit(n))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}
