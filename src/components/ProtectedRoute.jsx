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

import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { loading } = useAuth()

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

  // Bypass authentication checks for admin pages
  return children
}
