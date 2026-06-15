// ─────────────────────────────────────────────────────────────
// hooks/useBlog.js
// React hooks for fetching blog data from Firestore.
//
//   useBlogs(publishedOnly)  – blog listing (public or admin)
//   useBlogPost(slug)        – single post by URL slug
//                             (also increments the view counter)
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { getBlogs, getBlogBySlug } from '../services/blog'

// Fetch all blogs; pass publishedOnly=false in the admin panel to include drafts
export function useBlogs(publishedOnly = true) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getBlogs(publishedOnly)
      .then(setBlogs)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [publishedOnly])

  return { blogs, loading, error, refetch: () => getBlogs(publishedOnly).then(setBlogs) }
}

// Fetch a single blog post by its slug; increments view count on each load
export function useBlogPost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getBlogBySlug(slug)
      .then(setPost)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [slug])

  return { post, loading, error }
}
