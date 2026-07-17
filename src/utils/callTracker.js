// ─────────────────────────────────────────────────────────────
// utils/callTracker.js
// Utility to track clicks on phone links (tel:) and update Firestore call stats.
// ─────────────────────────────────────────────────────────────

import { doc, setDoc, increment, serverTimestamp, collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

/**
 * Tracks a phone call click by atomically incrementing Call Stats in Firestore.
 * Keeps daily, monthly, yearly, and total counts, and logs the specific click timestamp.
 */
export async function trackPhoneCall(phoneNumber = '', text = '', geo = null) {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const dayKey   = `${yyyy}-${mm}-${dd}`
  const monthKey = `${yyyy}-${mm}`
  const yearKey  = `${yyyy}`

  try {
    await Promise.all([
      setDoc(doc(db, 'callStats', 'total'),
        { count: increment(1), lastCall: serverTimestamp() }, { merge: true }),
      setDoc(doc(db, 'callStats', `daily_${dayKey}`),
        { count: increment(1), date: dayKey, lastCall: serverTimestamp() }, { merge: true }),
      setDoc(doc(db, 'callStats', `monthly_${monthKey}`),
        { count: increment(1), month: monthKey, lastCall: serverTimestamp() }, { merge: true }),
      setDoc(doc(db, 'callStats', `yearly_${yearKey}`),
        { count: increment(1), year: yearKey, lastCall: serverTimestamp() }, { merge: true }),
      addDoc(collection(db, 'callStats', 'total', 'logs'), {
        timestamp: serverTimestamp(),
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        phoneNumber: phoneNumber || '',
        text: (text || '').trim().slice(0, 100),
        ip: geo?.ip || 'Unknown',
        city: geo?.city || 'Unknown',
        region: geo?.region || 'Unknown',
        country: geo?.country || 'Unknown'
      })
    ])
    console.log('Phone call click tracked successfully.')
  } catch (err) {
    console.error('Failed to track phone call click:', err)
  }
}
