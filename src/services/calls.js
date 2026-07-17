// ─────────────────────────────────────────────────────────────
// services/calls.js
// Firestore operations for the `callStats/total/logs` collection.
// Handles fetching all call click events and admin deletion.
// ─────────────────────────────────────────────────────────────

import {
  collection, getDocs, doc, deleteDoc, query, orderBy
} from 'firebase/firestore'
import { db } from '../firebase/config'

const LOGS_COL = ['callStats', 'total', 'logs']

/**
 * Fetch all call logs, ordered by timestamp (newest first).
 */
export async function getCallLogs() {
  try {
    const q = query(collection(db, ...LOGS_COL), orderBy('timestamp', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }))
  } catch (err) {
    console.warn("Failed to get call logs:", err)
    return []
  }
}

/**
 * Delete a specific call log document (admin only).
 */
export async function deleteCallLog(id) {
  try {
    const docRef = doc(db, ...LOGS_COL, id)
    await deleteDoc(docRef)
    return true
  } catch (err) {
    console.error("Failed to delete call log:", err)
    throw err
  }
}
