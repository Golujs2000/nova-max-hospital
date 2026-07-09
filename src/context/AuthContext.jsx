// ─────────────────────────────────────────────────────────────
// context/AuthContext.jsx
// Global authentication context for the admin panel.
// Wraps the app with AuthProvider and exposes:
//   user, userRole, loading, login, logout, resetPassword,
//   isAdmin(), isStaff()
// Role is fetched from the Firestore `staff` collection so
// unauthorised Firebase users cannot access the admin panel.
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)         // Firebase Auth user object
  const [userName, setUserName] = useState(null) // Display name from Firestore
  const [userRole, setUserRole] = useState(null) // 'admin' | 'staff' | null
  const [loading, setLoading] = useState(true)   // blocks render until auth resolves

  // Listen for auth state changes (login / logout / page refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        try {
          // Fetch name and role from Firestore — the source of truth for permissions
          const staffDoc = await getDoc(doc(db, 'staff', firebaseUser.uid))
          if (staffDoc.exists()) {
            const data = staffDoc.data()
            setUserName(data.name || null)
            setUserRole(data.role)
          } else {
            // Authenticated but not in staff collection → no access
            setUserName(null)
            setUserRole(null)
          }
        } catch {
          setUserName(null)
          setUserRole(null)
        }
      } else {
        // User signed out
        setUser(null)
        setUserName(null)
        setUserRole(null)
      }
      setLoading(false)
    })

    // Cleanup listener on unmount
    return unsubscribe
  }, [])

  // Sign in and verify the user exists in the staff collection
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const staffDoc = await getDoc(doc(db, 'staff', result.user.uid))
    if (!staffDoc.exists()) {
      // Valid Firebase account but not a staff member — reject login
      await signOut(auth)
      throw new Error('Access denied. Not a registered staff member.')
    }
    return result
  }

  const logout = () => signOut(auth)

  const resetPassword = (email) => sendPasswordResetEmail(auth, email)

  // Role helper — use these instead of comparing userRole directly
  const isAdmin = () => userRole === 'admin'
  const isStaff = () => ['admin', 'staff'].includes(userRole)

  const value = {
    user,
    userName,
    userRole,
    loading,
    login,
    logout,
    resetPassword,
    isAdmin,
    isStaff,
  }

  return (
    <AuthContext.Provider value={value}>
      {/* Delay render until auth state is resolved to avoid flash of wrong UI */}
      {!loading && children}
    </AuthContext.Provider>
  )
}

// Custom hook — throws if used outside AuthProvider
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
