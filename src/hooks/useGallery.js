// ─────────────────────────────────────────────────────────────
// hooks/useGallery.js
// React hook for fetching gallery images for a given folder.
// Pass an empty string to fetch all images across folders.
// Images are sorted by their `order` field (client-side).
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { getGallery } from '../services/gallery'

export function useGallery(folderId = '') {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getGallery(folderId)
      .then(setImages)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [folderId]) // re-fetch when the active folder changes

  // refetch exposed for admin drag-to-reorder to reload after saving
  return { images, loading, error, refetch: () => getGallery(folderId).then(setImages) }
}
