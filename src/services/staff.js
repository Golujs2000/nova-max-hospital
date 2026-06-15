import {
  collection, getDocs, doc, setDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore'
import { initializeApp, deleteApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { db, auth } from '../firebase/config'
import { firebaseConfig } from '../firebase/config'
import app from '../firebase/config'

const COL = 'staff'
const functions = getFunctions(app)

export async function getStaff() {
  const q = query(collection(db, COL), orderBy('name'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
}

/**
 * Creates a new staff member using a secondary Firebase app instance so the
 * current admin session is never replaced.
 */
export async function createStaffMember({ email, password, name, role }) {
  const secondaryApp = initializeApp(firebaseConfig, `staff-create-${Date.now()}`)
  const secondaryAuth = getAuth(secondaryApp)
  try {
    const { user } = await createUserWithEmailAndPassword(secondaryAuth, email, password)
    await setDoc(doc(db, COL, user.uid), {
      name,
      email,
      role: role || 'staff',
      uid: user.uid,
      createdAt: serverTimestamp(),
    })
    return { uid: user.uid }
  } finally {
    await signOut(secondaryAuth).catch(() => {})
    await deleteApp(secondaryApp).catch(() => {})
  }
}

export async function updateStaffMember(id, data) {
  return updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteStaffMember(id) {
  return deleteDoc(doc(db, COL, id))
}

/**
 * Sends a Firebase password-reset email to the staff member.
 * Works entirely client-side — no Cloud Function needed.
 */
export async function sendStaffPasswordReset(email) {
  return sendPasswordResetEmail(auth, email)
}

/**
 * Directly updates a staff member's email and/or password via the
 * updateStaffCredentials Cloud Function (requires Admin SDK — must be deployed).
 * @param {string} uid      - Firebase Auth UID of the staff member
 * @param {string} [email]  - New email (optional)
 * @param {string} [password] - New password (optional, min 6 chars)
 */
export async function updateStaffCredentials({ uid, email, password }) {
  const fn = httpsCallable(functions, 'updateStaffCredentials')
  const result = await fn({ uid, email, password })
  return result.data
}
