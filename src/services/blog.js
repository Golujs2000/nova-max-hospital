// ─────────────────────────────────────────────────────────────
// services/blog.js
// Firestore CRUD for the `blogs` collection.
// Supports publish/draft toggle, slug-based lookup,
// view count tracking, and featured image uploads.
// ─────────────────────────────────────────────────────────────

import {
  collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc,
  query, orderBy, where, serverTimestamp, increment,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase/config'

const COL = 'blogs'

// Fetch all blog posts; pass publishedOnly=false to include drafts (admin view)
export async function getBlogs(publishedOnly = true) {
  let q = query(collection(db, COL), orderBy('createdAt', 'desc'))
  if (publishedOnly) {
    q = query(collection(db, COL), where('published', '==', true), orderBy('createdAt', 'desc'))
  }
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

// Fetch a single blog by its URL slug and increment the view counter
export async function getBlogBySlug(slug) {
  const q = query(collection(db, COL), where('slug', '==', slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  // Increment views atomically — safe for concurrent readers
  await updateDoc(doc(db, COL, d.id), { views: increment(1) })
  return { ...d.data(), id: d.id }
}

// Create a new blog post; uploads featured image to Storage if provided
export async function addBlog(data, imageFile) {
  let imageUrl = ''
  if (imageFile) {
    const storageRef = ref(storage, `blogs/${Date.now()}_${imageFile.name}`)
    await uploadBytes(storageRef, imageFile)
    imageUrl = await getDownloadURL(storageRef)
  }
  return addDoc(collection(db, COL), {
    ...data,
    image: imageUrl,
    views: 0,           // initialise view counter
    createdAt: serverTimestamp(),
  })
}

// Update an existing blog post; replaces featured image if a new file is given
export async function updateBlog(id, data, imageFile) {
  let imageUrl = data.image || ''
  if (imageFile) {
    const storageRef = ref(storage, `blogs/${Date.now()}_${imageFile.name}`)
    await uploadBytes(storageRef, imageFile)
    imageUrl = await getDownloadURL(storageRef)
  }
  return updateDoc(doc(db, COL, id), { ...data, image: imageUrl, updatedAt: serverTimestamp() })
}

// Permanently delete a blog post (image in Storage is NOT auto-deleted)
export async function deleteBlog(id) {
  return deleteDoc(doc(db, COL, id))
}
