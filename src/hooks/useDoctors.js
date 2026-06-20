// ─────────────────────────────────────────────────────────────
// hooks/useDoctors.js
// React hooks for fetching doctor data from Firestore.
//
//   useDoctors(filters)    – all doctors, optional specialty filter
//   useFeaturedDoctors()   – only doctors marked featured: true
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { getDoctors } from '../services/doctors'

// Global cache variables
let cachedAllDoctors = null
let activeDoctorsPromise = null

async function fetchAllDoctors(forceRefresh = false) {
  if (!forceRefresh && cachedAllDoctors) {
    return cachedAllDoctors
  }
  if (activeDoctorsPromise) {
    return activeDoctorsPromise
  }

  activeDoctorsPromise = (async () => {
    try {
      const data = await getDoctors({})
      cachedAllDoctors = data
      return data
    } catch (err) {
      console.error('Error fetching all doctors:', err)
      return []
    } finally {
      activeDoctorsPromise = null
    }
  })()

  return activeDoctorsPromise
}

// Fetch doctors with optional filtering; re-fetches when specialty changes
export function useDoctors(filters = {}) {
  const [doctors, setDoctors] = useState(() => {
    if (cachedAllDoctors) {
      let result = cachedAllDoctors
      if (filters.specialty) {
        result = result.filter(
          (d) =>
            d.specialty === filters.specialty ||
            (Array.isArray(d.specialties) && d.specialties.includes(filters.specialty))
        )
      }
      return result
    }
    return []
  })
  const [loading, setLoading] = useState(!cachedAllDoctors)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchAllDoctors()
      .then((allDocs) => {
        let result = allDocs
        if (filters.specialty) {
          result = result.filter(
            (d) =>
              d.specialty === filters.specialty ||
              (Array.isArray(d.specialties) && d.specialties.includes(filters.specialty))
          )
        }
        setDoctors(result)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [filters.specialty]) // re-run only when specialty filter changes

  const refetch = async () => {
    cachedAllDoctors = null
    setLoading(true)
    try {
      const allDocs = await fetchAllDoctors(true)
      let result = allDocs
      if (filters.specialty) {
        result = result.filter(
          (d) =>
            d.specialty === filters.specialty ||
            (Array.isArray(d.specialties) && d.specialties.includes(filters.specialty))
        )
      }
      setDoctors(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { doctors, loading, error, refetch }
}

// Fetch only featured doctors (homepage FeaturedDoctors section)
export function useFeaturedDoctors() {
  const [doctors, setDoctors] = useState(() => {
    if (cachedAllDoctors) {
      return cachedAllDoctors.filter((d) => d.featured)
    }
    return []
  })
  const [loading, setLoading] = useState(!cachedAllDoctors)

  useEffect(() => {
    setLoading(true)
    fetchAllDoctors()
      .then((allDocs) => {
        setDoctors(allDocs.filter((d) => d.featured))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { doctors, loading }
}
