import {
  collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc,
  query, orderBy, where, limit, serverTimestamp, writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { getTreatments } from './treatments'
import { siteSpecialties } from '../data/siteData'

// Mapping human-readable category names to Firestore collection names
export const CATEGORY_TO_COLLECTION = {
  'Hospital Departments': 'hospitalDepartments',
  'Surgical Services': 'surgicalServices',
  'Critical & Emergency Care': 'criticalCare',
  'Patient Care Facilities': 'patientFacilities',
  'Diagnostics': 'diagnostics'
}

export const ALL_COLLECTIONS = Object.values(CATEGORY_TO_COLLECTION)

// Get Firestore collection name from human-readable name
export function getCollectionName(categoryName) {
  return CATEGORY_TO_COLLECTION[categoryName] || 'hospitalDepartments'
}

// Bulk update display order using a Firestore batch
export async function updateCategoryItemsOrder(collectionName, items) {
  const batch = writeBatch(db)
  items.forEach((item, index) => {
    const docRef = doc(db, collectionName, item.id)
    batch.update(docRef, { order: index + 1 })
  })
  return batch.commit()
}

// Fetch all items from a specific category collection sorted by their display order
export async function getCategoryItems(collectionName) {
  const q = query(collection(db, collectionName), orderBy('order'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

// Fetch a single item by Firestore document ID
export async function getCategoryItemById(collectionName, id) {
  const snap = await getDoc(doc(db, collectionName, id))
  if (!snap.exists()) return null
  return { ...snap.data(), id: snap.id }
}

// Search ALL category collections for an item with a matching slug
export async function getCategoryItemBySlug(slug) {
  // Run queries across all 5 collections concurrently
  const promises = ALL_COLLECTIONS.map(async (colName) => {
    const q = query(collection(db, colName), where('slug', '==', slug), limit(1))
    const snap = await getDocs(q)
    if (!snap.empty) {
      return { ...snap.docs[0].data(), id: snap.docs[0].id, _collection: colName }
    }
    return null
  })

  const results = await Promise.all(promises)
  let found = results.find(res => res !== null) || null
  
  if (found) {
    // Attach treatments to the item
    const tQ = query(collection(db, 'treatments'), where('parentId', '==', found.id))
    const tSnap = await getDocs(tQ)
    found.treatments = tSnap.docs.map(d => ({ ...d.data(), id: d.id }))
  }

  // Fallback to siteSpecialties if not found in Firestore
  if (!found) {
    const fallback = siteSpecialties.find(spec => spec.slug === slug)
    if (fallback) {
      found = { ...fallback }
    }
  }
  
  return found
}

// Add a new item to a specific category collection
export async function addCategoryItem(collectionName, data) {
  return addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() })
}

// Update an existing item
export async function updateCategoryItem(collectionName, id, data) {
  return updateDoc(doc(db, collectionName, id), { ...data, updatedAt: serverTimestamp() })
}

// Delete an item
export async function deleteCategoryItem(collectionName, id) {
  return deleteDoc(doc(db, collectionName, id))
}

// Fetch all items across all category collections, including their treatments
export async function getDepartments() {
  const categoryPromises = ALL_COLLECTIONS.map(col => getCategoryItems(col))
  const [categoryResults, treatments] = await Promise.all([
    Promise.all(categoryPromises),
    getTreatments()
  ])
  const allCategories = categoryResults.flat()
  if (allCategories.length > 0) {
    return allCategories.map(spec => ({
      ...spec,
      treatments: treatments.filter(t => t.parentId === spec.id)
    })).sort((a, b) => (a.order || 0) - (b.order || 0))
  }
  return siteSpecialties
}
