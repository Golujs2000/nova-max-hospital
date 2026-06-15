// ─────────────────────────────────────────────────────────────
// hooks/useVisitTracker.js
// Tracks unique site visits once per browser session.
// Increments 4 Firestore counters atomically:
//   siteStats/total            → all-time count
//   siteStats/daily_YYYY-MM-DD → per-day count
//   siteStats/monthly_YYYY-MM  → per-month count
//   siteStats/yearly_YYYY      → per-year count
// ─────────────────────────────────────────────────────────────

import { useEffect } from 'react'
import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

const SESSION_KEY = 'mh_visit_tracked'

export function useVisitTracker() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    sessionStorage.setItem(SESSION_KEY, '1')

    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const dayKey   = `${yyyy}-${mm}-${dd}`
    const monthKey = `${yyyy}-${mm}`
    const yearKey  = `${yyyy}`

    Promise.all([
      setDoc(doc(db, 'siteStats', 'total'),
        { count: increment(1), lastVisit: serverTimestamp() }, { merge: true }),
      setDoc(doc(db, 'siteStats', `daily_${dayKey}`),
        { count: increment(1), date: dayKey }, { merge: true }),
      setDoc(doc(db, 'siteStats', `monthly_${monthKey}`),
        { count: increment(1), month: monthKey }, { merge: true }),
      setDoc(doc(db, 'siteStats', `yearly_${yearKey}`),
        { count: increment(1), year: yearKey }, { merge: true }),
    ]).catch(console.error)
  }, [])
}
