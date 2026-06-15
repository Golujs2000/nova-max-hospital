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
  const { user, userRole, loading } = useAuth()
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

  // No authenticated user → send to login, preserving the intended destination
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  // Authenticated via Firebase but not in the staff collection → block access
  if (!['admin', 'staff'].includes(userRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-500 text-sm mb-5">
            Your account is not registered as staff. Contact the hospital administrator.
          </p>
          <button
            onClick={() => { window.location.href = '/admin/login' }}
            className="text-primary-600 text-sm font-medium hover:underline"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    )
  }

  // Route is admin-only but user is only a staff member
  if (requireAdmin && userRole !== 'admin') {
    return <Navigate to="/admin" replace />
  }

  return children
}
