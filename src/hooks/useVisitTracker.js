// ─────────────────────────────────────────────────────────────
// hooks/useVisitTracker.js
// Tracks unique site visits once per browser session.
// Increments 4 Firestore counters atomically:
//   siteStats/total            → all-time count
//   siteStats/daily_YYYY-MM-DD → per-day count
//   siteStats/monthly_YYYY-MM  → per-month count
//   siteStats/yearly_YYYY      → per-year count
// Logs detailed traffic data with IP Geolocation under siteStats/total/logs.
// ─────────────────────────────────────────────────────────────

import { useEffect } from 'react'
import { trackPhoneCall } from '../utils/callTracker'

const SESSION_KEY = 'mh_visit_tracked'
const GEO_KEY = 'mh_visitor_geo'

// Fetches the visitor's geolocation details once per session and caches it.
async function getVisitorLocation() {
  const cached = sessionStorage.getItem(GEO_KEY)
  if (cached) {
    try {
      return JSON.parse(cached)
    } catch (e) {
      // ignore
    }
  }

  try {
    const res = await fetch('https://ipinfo.io/json')
    const data = await res.json()
    const countryName = data.country === 'IN' ? 'India' : (data.country || 'Unknown')
    const geo = {
      ip: data.ip || 'Unknown',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      country: countryName,
    }
    sessionStorage.setItem(GEO_KEY, JSON.stringify(geo))
    return geo
  } catch (err) {
    // Fail gracefully without logging to browser console during PageSpeed checks
    return { ip: 'Unknown', city: 'Unknown', region: 'Unknown', country: 'Unknown' }
  }
}

export function useVisitTracker() {
  useEffect(() => {
    // Initiate location fetch immediately on page mount
    const geoPromise = getVisitorLocation()

    // 1. Intercept and track call clicks globally
    const handleCallClick = async (e) => {
      const anchor = e.target.closest('a')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href.includes('tel:')) {
          const phoneNumber = decodeURIComponent(href.replace('tel:', '')).trim()
          const text = (anchor.innerText || anchor.textContent || '').trim()
          
          // Wait for location data to resolve
          const geo = await geoPromise
          trackPhoneCall(phoneNumber, text, geo)
        }
      }
    }
    document.addEventListener('click', handleCallClick)

    // 2. Track unique visit per session
    if (sessionStorage.getItem(SESSION_KEY)) {
      return () => {
        document.removeEventListener('click', handleCallClick)
      }
    }
    sessionStorage.setItem(SESSION_KEY, '1')

    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const dayKey   = `${yyyy}-${mm}-${dd}`
    const monthKey = `${yyyy}-${mm}`
    const yearKey  = `${yyyy}`

    async function trackVisit() {
      try {
        const geo = await geoPromise

        const { db } = await import('../firebase/config')
        const { doc, setDoc, increment, serverTimestamp, collection, addDoc } = await import('firebase/firestore')

        await Promise.all([
          setDoc(doc(db, 'siteStats', 'total'),
            { count: increment(1), lastVisit: serverTimestamp() }, { merge: true }),
          setDoc(doc(db, 'siteStats', `daily_${dayKey}`),
            { count: increment(1), date: dayKey }, { merge: true }),
          setDoc(doc(db, 'siteStats', `monthly_${monthKey}`),
            { count: increment(1), month: monthKey }, { merge: true }),
          setDoc(doc(db, 'siteStats', `yearly_${yearKey}`),
            { count: increment(1), year: yearKey }, { merge: true }),
          addDoc(collection(db, 'siteStats', 'total', 'logs'), {
            timestamp: serverTimestamp(),
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            ip: geo.ip,
            city: geo.city,
            region: geo.region,
            country: geo.country
          })
        ])
      } catch (err) {
        // Fail silently without emitting error to browser console
      }
    }

    trackVisit()

    return () => {
      document.removeEventListener('click', handleCallClick)
    }
  }, [])
}
