// ─────────────────────────────────────────────────────────────
// services/messages.js
// Firestore CRUD for the `messages` collection.
// Handles contact form submissions and admin read/delete actions.
// New messages are stored with read: false so the admin panel
// can show an unread badge count.
// ─────────────────────────────────────────────────────────────

import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'

const COL = 'messages'

// Save a new contact form submission (triggered from public Contact page)
export async function sendMessage(data) {
  return addDoc(collection(db, COL), {
    ...data,
    read: false,           // unread by default — drives admin badge
    createdAt: serverTimestamp(),
  })
}

// Fetch all messages, newest first (admin inbox view)
export async function getMessages() {
  try {
    const q = query(collection(db, COL), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ ...d.data(), id: d.id }))
  } catch (err) {
    console.warn("Failed to get messages:", err)
    return []
  }
}

// Mark a single message as read (called when admin opens the message)
export async function markMessageRead(id) {
  return updateDoc(doc(db, COL, id), { read: true })
}

// Permanently delete a message
export async function deleteMessage(id) {
  return deleteDoc(doc(db, COL, id))
}
