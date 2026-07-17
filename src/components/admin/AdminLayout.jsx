// ─────────────────────────────────────────────────────────────
// components/admin/AdminLayout.jsx
// Persistent shell for all protected admin pages.
// Provides:
//   - Collapsible sidebar with nav links and active-state highlighting
//   - Top header with page title, unread message badge (live Firestore
//     snapshot), and logout button
//   - Mobile hamburger menu
//   - <Outlet /> where the matched admin route renders
// Unread message count is subscribed in real-time so the badge
// updates without a page refresh.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGrid, FiCalendar, FiUsers, FiFileText, FiImage,
  FiMail, FiUserCheck, FiStar, FiSettings, FiLogOut,
  FiMenu, FiX, FiBell, FiPlusSquare, FiActivity,
  FiHeart, FiShield, FiHome, FiMonitor, FiPhoneCall, FiGlobe
} from 'react-icons/fi'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../../context/AuthContext'
import { siteData } from '../../data/siteData'

const NAV_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/appointments', label: 'Appointments', icon: FiCalendar },
  { to: '/admin/doctors', label: 'Doctors', icon: FiUsers },
  { to: '/admin/blog', label: 'Blog', icon: FiFileText },
  { to: '/admin/gallery', label: 'Gallery', icon: FiImage },
  { to: '/admin/messages', label: 'Messages', icon: FiMail, badge: true },
  { to: '/admin/calls', label: 'Call Clicks', icon: FiPhoneCall },
  { to: '/admin/traffic', label: 'Traffic Logs', icon: FiGlobe },
  { to: '/admin/hospital-departments', label: 'Hospital Depts', icon: FiActivity },
  { to: '/admin/surgical-services', label: 'Surgical Services', icon: FiHeart },
  { to: '/admin/critical-care', label: 'Critical Care', icon: FiShield },
  { to: '/admin/patient-facilities', label: 'Facilities', icon: FiHome },
  { to: '/admin/diagnostics', label: 'Diagnostics', icon: FiMonitor },
  { to: '/admin/treatments', label: 'Treatments', icon: FiActivity },
  // Admin-only links — hidden from staff role
  { to: '/admin/staff', label: 'Staff', icon: FiUserCheck, adminOnly: true },
  { to: '/admin/settings', label: 'Settings', icon: FiSettings, adminOnly: true },
]

export default function AdminLayout() {
  const { user, userName, userRole, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const q = query(collection(db, 'messages'), where('read', '==', false))
    const unsub = onSnapshot(
      q,
      (snap) => setUnreadCount(snap.size),
      (err) => {
        console.warn('Real-time unread messages subscription failed (likely unauthenticated):', err)
      }
    )
    return unsub
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <img
          src="/logo.png"
          alt={`${siteData.name} Logo`}
          className="w-10 h-10 object-contain shrink-0"
        />
        <div>
          <p className="font-bold text-navy-800 text-sm leading-tight">{siteData.name}</p>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_LINKS.filter(({ adminOnly }) => !adminOnly || isAdmin()).map(({ to, label, icon: Icon, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={18} />
            <span className="flex-1">{label}</span>
            {badge && unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User info */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-700 font-semibold text-xs text-center">
              {(userName || user?.email)?.[0]?.toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-medium text-gray-700 truncate">{userName || user?.email}</p>
            <p className="text-xs text-gray-400">
              {userRole === 'admin' ? 'Administrator' : 'Hospital Staff'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm fixed inset-y-0 left-0 z-30">
          <SidebarContent />
        </aside>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden shadow-2xl flex flex-col"
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
            <div className="flex items-center justify-between px-4 md:px-6 h-16">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiMenu size={22} />
                </button>
                <div className="hidden sm:flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt={`${siteData.name} Logo`}
                    className="w-8 h-8 object-contain shrink-0"
                  />
                  <span className="font-semibold text-navy-800 text-sm">{siteData.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <div className="relative">
                    <FiBell size={20} className="text-gray-500" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  </div>
                )}
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold text-xs text-center">
                      {(userName || user?.email)?.[0]?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  <span className="truncate max-w-[160px] font-medium">{userName || user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  <FiLogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
