import {
  collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc,
  query, orderBy, where, limit, serverTimestamp, writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { getTreatments } from './treatments'
import { siteSpecialties } from '../data/hospitalServicesData'
import { slugify } from '../utils/helpers'

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

// Helper to merge a single treatment object with static data
function mergeTreatmentWithStatic(ft, st) {
  if (!st) return ft
  if (!ft) return st
  return {
    ...st,
    ...ft,
    description: ft.description || st.description,
    longDescription: ft.longDescription || st.longDescription,
    duration: ft.duration || st.duration,
    recovery: ft.recovery || st.recovery,
    procedureType: ft.procedureType || st.procedureType,
    indications: (Array.isArray(ft.indications) && ft.indications.length > 0) ? ft.indications : st.indications,
    benefits: (Array.isArray(ft.benefits) && ft.benefits.length > 0) ? ft.benefits : st.benefits,
    preparation: (Array.isArray(ft.preparation) && ft.preparation.length > 0) ? ft.preparation : st.preparation,
    faqs: (Array.isArray(ft.faqs) && ft.faqs.length > 0) ? ft.faqs : st.faqs,
    keywords: (Array.isArray(ft.keywords) && ft.keywords.length > 0) ? ft.keywords : st.keywords,
    steps: (Array.isArray(ft.steps) && ft.steps.length > 0) ? ft.steps : st.steps,
    images: (Array.isArray(ft.images) && ft.images.length > 0) ? ft.images : st.images,
  }
}

// Helper to merge a department object with static data
function mergeDepartmentWithStatic(fsDoc, staticDoc) {
  if (!staticDoc) return fsDoc
  if (!fsDoc) return staticDoc

  const fsTreatments = Array.isArray(fsDoc.treatments) ? fsDoc.treatments : []
  const stTreatments = Array.isArray(staticDoc.treatments) ? staticDoc.treatments : []

  const mergedTreatments = stTreatments.map(st => {
    const ft = fsTreatments.find(t =>
      (t.slug && t.slug === st.slug) ||
      (t.id && t.id === st.slug) ||
      (t.name && st.name && slugify(t.name) === slugify(st.name))
    )
    return mergeTreatmentWithStatic(ft, st)
  })

  // Append any extra treatments from Firestore that weren't in static data
  fsTreatments.forEach(ft => {
    const exists = mergedTreatments.some(mt => mt.id === ft.id || mt.slug === ft.slug)
    if (!exists) {
      mergedTreatments.push(ft)
    }
  })

  return {
    ...staticDoc,
    ...fsDoc,
    description: fsDoc.description || staticDoc.description,
    longDescription: fsDoc.longDescription || staticDoc.longDescription,
    features: (Array.isArray(fsDoc.features) && fsDoc.features.length > 0) ? fsDoc.features : staticDoc.features,
    recoveryTime: fsDoc.recoveryTime || staticDoc.recoveryTime,
    icon: fsDoc.icon || staticDoc.icon,
    treatments: mergedTreatments
  }
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
  try {
    const q = query(collection(db, collectionName), orderBy('order'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
  } catch (err) {
    console.error(`Error fetching category items for ${collectionName}:`, err)
    return []
  }
}

// Fetch a single item by Firestore document ID
export async function getCategoryItemById(collectionName, id) {
  try {
    const snap = await getDoc(doc(db, collectionName, id))
    if (!snap.exists()) return null
    return { ...snap.data(), id: snap.id }
  } catch (err) {
    console.error(`Error fetching item by id ${id}:`, err)
    return null
  }
}

// Search ALL category collections for an item with a matching slug
export async function getCategoryItemBySlug(slug) {
  let found = null

  try {
    const promises = ALL_COLLECTIONS.map(async (colName) => {
      try {
        const q = query(collection(db, colName), where('slug', '==', slug), limit(1))
        const snap = await getDocs(q)
        if (!snap.empty) {
          return { ...snap.docs[0].data(), id: snap.docs[0].id, _collection: colName }
        }
      } catch (colErr) {
        console.error(`Error querying collection ${colName} for slug ${slug}:`, colErr)
      }
      return null
    })

    const results = await Promise.all(promises)
    found = results.find(res => res !== null) || null

    if (found) {
      const tQ = query(collection(db, 'treatments'), where('parentId', '==', found.id))
      const tSnap = await getDocs(tQ)
      found.treatments = tSnap.docs.map(d => ({ ...d.data(), id: d.id }))
    }
  } catch (err) {
    console.error('Error fetching category item by slug from Firestore:', err)
  }

  const staticMatch = siteSpecialties.find(s => s.slug === slug || s.id === slug || slugify(s.name) === slug)

  if (!found) {
    return staticMatch || null
  }

  return mergeDepartmentWithStatic(found, staticMatch)
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
  let allCategories = []
  try {
    const categoryPromises = ALL_COLLECTIONS.map(col => getCategoryItems(col))
    const [categoryResults, treatments] = await Promise.all([
      Promise.all(categoryPromises),
      getTreatments()
    ])
    allCategories = categoryResults.flat().map(spec => ({
      ...spec,
      treatments: (treatments || []).filter(t => t.parentId === spec.id)
    }))
  } catch (err) {
    console.error('Error fetching departments from Firestore:', err)
  }

  const mergedMap = new Map()

  // 1. Add all static siteSpecialties first
  siteSpecialties.forEach(spec => {
    mergedMap.set(spec.slug || spec.id, { ...spec })
  })

  // 2. Overlay & merge with Firestore data
  allCategories.forEach(fsSpec => {
    const key = fsSpec.slug || fsSpec.id || slugify(fsSpec.name || '')
    const existingStatic = mergedMap.get(key)
    const merged = mergeDepartmentWithStatic(fsSpec, existingStatic)
    mergedMap.set(key, merged)
  })

  return Array.from(mergedMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0))
}
