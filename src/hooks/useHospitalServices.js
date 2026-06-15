// ─────────────────────────────────────────────────────────────
// hooks/useHospitalServices.js
// React hook for fetching all hospital services from Firestore.
// Returns { services, loading, error, refetch }.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { getHospitalServices } from '../services/hospitalServices'

export function useHospitalServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = () => {
    setLoading(true)
    getHospitalServices()
      .then(setServices)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  return { services, loading, error, refetch: fetch }
}
