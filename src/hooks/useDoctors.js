// ─────────────────────────────────────────────────────────────
// hooks/useDoctors.js
// React hooks for fetching doctor data from Firestore.
//
//   useDoctors(filters)    – all doctors, optional specialty filter
//   useFeaturedDoctors()   – only doctors marked featured: true
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { getDoctors, getFeaturedDoctors } from '../services/doctors'

// Fetch doctors with optional filtering; re-fetches when specialty changes
export function useDoctors(filters = {}) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getDoctors(filters)
      .then(setDoctors)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [filters.specialty]) // re-run only when specialty filter changes

  // refetch exposed so parent components can trigger a manual reload
  return { doctors, loading, error, refetch: () => getDoctors(filters).then(setDoctors) }
}

// Fetch only featured doctors (homepage FeaturedDoctors section)
export function useFeaturedDoctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedDoctors()
      .then(setDoctors)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { doctors, loading }
}
