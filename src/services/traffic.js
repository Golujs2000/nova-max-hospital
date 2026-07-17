// ─────────────────────────────────────────────────────────────
// services/traffic.js
// Firestore operations for the `siteStats/total/logs` collection.
// Handles fetching all visitor traffic log events and admin deletion.
// ─────────────────────────────────────────────────────────────

import {
  collection, getDocs, doc, deleteDoc, query, orderBy
} from 'firebase/firestore'
import { db } from '../firebase/config'

const LOGS_COL = ['siteStats', 'total', 'logs']

/**
 * Fetch all visitor traffic logs, ordered by timestamp (newest first).
 */
export async function getTrafficLogs() {
  try {
    const q = query(collection(db, ...LOGS_COL), orderBy('timestamp', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }))
  } catch (err) {
    console.warn("Failed to get traffic logs:", err)
    return []
  }
}

/**
 * Delete a specific traffic log document (admin only).
 */
export async function deleteTrafficLog(id) {
  try {
    const docRef = doc(db, ...LOGS_COL, id)
    await deleteDoc(docRef)
    return true
  } catch (err) {
    console.error("Failed to delete traffic log:", err)
    throw err
  }
}
