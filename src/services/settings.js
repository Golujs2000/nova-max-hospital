// ─────────────────────────────────────────────────────────────
// services/settings.js
// Manages the single site-settings document in Firestore.
// Stored at: settings/siteSettings
// Used by AdminSettings to read/write contact info, hours, etc.
// ─────────────────────────────────────────────────────────────

import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

const SETTINGS_DOC = 'siteSettings'

// Fetch current settings; returns empty object if not yet created
export async function getSettings() {
  const snap = await getDoc(doc(db, 'settings', SETTINGS_DOC))
  return snap.exists() ? snap.data() : {}
}

// Save settings using merge:true so partial updates don't overwrite unrelated fields
export async function updateSettings(data) {
  return setDoc(
    doc(db, 'settings', SETTINGS_DOC),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  )
}
