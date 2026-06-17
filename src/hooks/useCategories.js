import { useState, useEffect } from 'react'
import { getCategoryItems, ALL_COLLECTIONS } from '../services/categories'
import { getTreatments } from '../services/treatments'
import { siteSpecialties } from '../data/siteData'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAllData = async () => {
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

      if (unifiedDepartments.length > 0) {
        return unifiedDepartments
      }
      return siteSpecialties
    } catch (err) {
      console.error('Error fetching unified categories from Firestore, falling back to siteSpecialties:', err)
      return siteSpecialties
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchAllData()
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { 
    categories, 
    loading, 
    error, 
    refetch: () => fetchAllData().then(setCategories) 
  }
}
