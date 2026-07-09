// ─────────────────────────────────────────────────────────────
// components/ProtectedRoute.jsx
// Route guard for admin pages.
// Three possible outcomes:
//   1. Auth state still loading  → full-screen spinner
//   2. Not logged in             → redirect to /admin/login
//   3. Logged in but not staff   → Access Denied screen
//   4. requireAdmin + not admin  → redirect to /admin (dashboard)
//   5. All checks pass           → render children
//
// The `from` state is passed to the login redirect so the user
// is returned to their intended page after signing in.
// ─────────────────────────────────────────────────────────────

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isStaff, isAdmin, loading } = useAuth()
  const location = useLocation()

  // Still resolving Firebase auth state — show spinner to prevent flash
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading…</p>
        </div>
      </div>
    )
  }

  // 1. Not logged in -> redirect to /admin/login
  if (!user || user.isMock) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  // 2. Logged in but not a staff member -> Access Denied / unauthorized
  if (!isStaff()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-16 h-16 bg-red-100 text-red-650 flex items-center justify-center rounded-full mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="font-heading text-2xl font-bold text-navy-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-6">You do not have permission to access the admin panel. Please contact the administrator.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-bold text-sm hover:bg-primary-700 transition-colors"
          >
            Back to Website
          </button>
        </div>
      </div>
    )
  }

  // 3. Logged in, but is a staff member trying to access an admin-only page
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/admin" replace />
  }

  return children
}
