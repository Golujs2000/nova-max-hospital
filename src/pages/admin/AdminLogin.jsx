// ─────────────────────────────────────────────────────────────
// pages/admin/AdminLogin.jsx
// Admin login page at /admin/login.
// Authenticates via Firebase Auth and verifies the user exists
// in the Firestore staff collection (via AuthContext.login).
// Includes password visibility toggle and a "Forgot password"
// flow that sends a Firebase password-reset email.
// Redirects to /admin (or the `from` location) on success.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { Helmet } from 'react-helmet-async'
import { siteData } from '../../data/siteData'

export default function AdminLogin() {
  const { user, userRole, login, resetPassword } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resetMode, setResetMode] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  // Only redirect when BOTH user and a valid role are confirmed — prevents infinite loop
  useEffect(() => {
    if (user && ['admin', 'staff'].includes(userRole)) {
      navigate('/admin', { replace: true })
    }
  }, [user, userRole, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      const msg =
        err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password'
          ? 'Invalid email or password.'
          : err.code === 'auth/user-not-found'
          ? 'No account found with this email.'
          : err.code === 'auth/too-many-requests'
          ? 'Too many failed attempts. Please try again later.'
          : err.message || 'Login failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address.')
      return
    }
    setLoading(true)
    try {
      await resetPassword(email)
      setResetSent(true)
      setError('')
      toast.success('Password reset email sent!')
    } catch (err) {
      setError('Failed to send reset email. Check the address and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-primary-900 to-primary-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="card p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg mb-4">
              <span className="text-white font-bold text-2xl">NM</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-800">
              {resetMode ? 'Reset Password' : 'Admin Login'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{siteData.name} Admin</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm"
            >
              <FiAlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {resetSent && resetMode ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-4 mb-6 text-sm">
                Password reset link sent to <strong>{email}</strong>. Check your inbox.
              </div>
              <button
                onClick={() => { setResetMode(false); setResetSent(false) }}
                className="btn-primary w-full justify-center"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={resetMode ? handleResetPassword : handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@caresurgicalclinic.com"
                    className="input-field pl-10"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password — hidden in reset mode */}
              {!resetMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="input-field pl-10 pr-12"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    {resetMode ? 'Sending...' : 'Signing in...'}
                  </span>
                ) : resetMode ? 'Send Reset Link' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Toggle reset mode */}
          {!resetSent && (
            <div className="mt-5 text-center">
              {resetMode ? (
                <button
                  onClick={() => { setResetMode(false); setError('') }}
                  className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
                >
                  ← Back to Login
                </button>
              ) : (
                <button
                  onClick={() => { setResetMode(true); setError('') }}
                  className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
                >
                  Forgot your password?
                </button>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-white/50 text-xs mt-6">
          © {new Date().getFullYear()} {siteData.name}. All rights reserved.
        </p>
      </motion.div>
    </div>
    </>
  )
}
