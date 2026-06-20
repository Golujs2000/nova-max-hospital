import { useState, useEffect } from 'react'
import { getCategoryItems, ALL_COLLECTIONS } from '../services/categories'
import { getTreatments } from '../services/treatments'
import { siteSpecialties } from '../data/siteData'

// Global in-memory cache and active request promise
let cachedCategories = null
let activeFetchPromise = null

export function useCategories() {
  const [categories, setCategories] = useState(cachedCategories || [])
  const [loading, setLoading] = useState(!cachedCategories)
  const [error, setError] = useState(null)

  const fetchAllData = async (forceRefresh = false) => {
    if (!forceRefresh && cachedCategories) {
      return cachedCategories
    }
    if (activeFetchPromise) {
      return activeFetchPromise
    }

    activeFetchPromise = (async () => {
      try {
        // Fetch all 5 category collections concurrently with individual try-catch
        const categoryPromises = ALL_COLLECTIONS.map(async (col) => {
          try {
            return await getCategoryItems(col)
          } catch (colErr) {
            console.error(`Error fetching category items for ${col}:`, colErr)
            return []
          }
        })

        let treatments = []
        try {
          treatments = await getTreatments()
        } catch (tErr) {
          console.error('Error fetching treatments:', tErr)
        }

        const categoryResults = await Promise.all(categoryPromises)

        // Flatten categories into a single array
        const allCategories = categoryResults.flat()

        // Re-attach treatments to their respective parent departments for frontend compatibility
        const unifiedDepartments = allCategories.map(spec => ({
          ...spec,
          treatments: treatments.filter(t => t.parentId === spec.id)
        }))

        // Sort globally by order if needed
        unifiedDepartments.sort((a, b) => (a.order || 0) - (b.order || 0))

        const finalResult = unifiedDepartments.length > 0 ? unifiedDepartments : siteSpecialties
        cachedCategories = finalResult
        return finalResult
      } catch (err) {
        console.error('Error fetching unified categories from Firestore, falling back to siteSpecialties:', err)
        return siteSpecialties
      } finally {
        activeFetchPromise = null
      }
    })()

    return activeFetchPromise
  }

  useEffect(() => {
    if (cachedCategories) {
      setCategories(cachedCategories)
      setLoading(false)
      return
    }

    setLoading(true)
    fetchAllData()
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const refetch = async () => {
    cachedCategories = null
    setLoading(true)
    try {
      const data = await fetchAllData(true)
      setCategories(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { 
    categories, 
    loading, 
    error, 
    refetch 
  }
}
