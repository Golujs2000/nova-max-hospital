// ─────────────────────────────────────────────────────────────
// pages/admin/AdminCalls.jsx
// Detailed logs and statistics for call clicks.
// Allows staff to view real-time call tracking stats and logs.
// Allows admin to delete logs.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPhone, FiPhoneCall, FiTrash2, FiRefreshCw, FiSearch,
  FiClock, FiGlobe, FiMonitor, FiSmartphone, FiCalendar, FiFilter, FiMapPin
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getCallLogs, deleteCallLog } from '../../services/calls'
import { formatDateTime } from '../../utils/helpers'
import { useAuth } from '../../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

// Date key helpers
function toDayKey(d)   { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}` }
function toMonthKey(d) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}` }
function pad(n)        { return String(n).padStart(2, '0') }

// User Agent parser helper for device/browser badges
function parseUserAgent(ua) {
  if (!ua) return { device: 'Unknown', browser: 'Unknown' }
  
  let device = 'Desktop'
  if (/mobile|android|iphone|ipad|phone/i.test(ua)) {
    device = 'Mobile'
  }
  
  let browser = 'Browser'
  if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr|opera/i.test(ua)) {
    browser = 'Chrome'
  } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
    browser = 'Safari'
  } else if (/firefox|fxios/i.test(ua)) {
    browser = 'Firefox'
  } else if (/edge|edg/i.test(ua)) {
    browser = 'Edge'
  } else if (/opr|opera/i.test(ua)) {
    browser = 'Opera'
  }

  return { device, browser }
}

export default function AdminCalls() {
  const { isAdmin } = useAuth()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [pageFilter, setPageFilter] = useState('all')
  const [deletingId, setDeletingId] = useState(null)
  
  // Real-time counter states from Firestore documents
  const [stats, setStats] = useState({
    today: 0,
    month: 0,
    total: 0
  })

  // Fetch both stats documents and raw logs
  const fetchData = async () => {
    setLoading(true)
    try {
      // 1. Fetch Logs
      const callLogs = await getCallLogs()
      setLogs(callLogs)

      // 2. Fetch specific stats counters
      const now = new Date()
      const dayKey = toDayKey(now)
      const monthKey = toMonthKey(now)

      const [totalDoc, dailyDoc, monthlyDoc] = await Promise.all([
        getDoc(doc(db, 'callStats', 'total')),
        getDoc(doc(db, 'callStats', `daily_${dayKey}`)),
        getDoc(doc(db, 'callStats', `monthly_${monthKey}`))
      ])

      setStats({
        total: totalDoc.exists() ? (totalDoc.data().count ?? 0) : 0,
        today: dailyDoc.exists() ? (dailyDoc.data().count ?? 0) : 0,
        month: monthlyDoc.exists() ? (monthlyDoc.data().count ?? 0) : 0
      })
    } catch (err) {
      console.error(err)
      toast.error('Failed to load call click stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this call log?')) return
    setDeletingId(id)
    try {
      await deleteCallLog(id)
      setLogs((prev) => prev.filter((log) => log.id !== id))
      toast.success('Call log deleted successfully')
    } catch {
      toast.error('Failed to delete call log')
    } finally {
      setDeletingId(null)
    }
  }

  // Filter logic
  const filteredLogs = logs.filter((log) => {
    const textMatch = 
      (log.phoneNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.text || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.page || '').toLowerCase().includes(searchTerm.toLowerCase())
    
    if (pageFilter === 'all') return textMatch
    return textMatch && log.page === pageFilter
  })

  // Get list of unique pages logged for the page filter dropdown
  const uniquePages = Array.from(new Set(logs.map((log) => log.page).filter(Boolean)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
            <FiPhoneCall className="text-primary-600" />
            Call Clicks
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Monitor patient call clicks, page origins, and timestamps.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="btn-secondary self-start md:self-auto text-sm py-2 px-4 flex items-center gap-2"
        >
          <FiRefreshCw className={loading ? 'animate-spin' : ''} size={14} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Today Card */}
        <div className="card p-5 border-l-4 border-orange-500 bg-white hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Today's Clicks</p>
              <h3 className="text-2xl font-bold text-navy-800 mt-1">{stats.today}</h3>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <FiClock size={20} />
            </div>
          </div>
        </div>

        {/* Monthly Card */}
        <div className="card p-5 border-l-4 border-violet-500 bg-white hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">This Month</p>
              <h3 className="text-2xl font-bold text-navy-800 mt-1">{stats.month}</h3>
            </div>
            <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
              <FiCalendar size={20} />
            </div>
          </div>
        </div>

        {/* Total Card */}
        <div className="card p-5 border-l-4 border-emerald-500 bg-white hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">All-Time Clicks</p>
              <h3 className="text-2xl font-bold text-navy-800 mt-1">{stats.total}</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <FiPhoneCall size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Controls: Search and Page Filter */}
      <div className="card p-4 bg-white flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by number, button text, or page..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10 pr-4 py-2 w-full text-sm rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <FiFilter size={16} className="text-gray-400" />
          <select
            value={pageFilter}
            onChange={(e) => setPageFilter(e.target.value)}
            className="admin-input py-2 px-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary-500"
          >
            <option value="all">All Pages</option>
            {uniquePages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Log list */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card p-5 animate-pulse bg-white border border-gray-100 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4 w-2/3">
                <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-100 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-6 bg-gray-100 rounded w-20" />
            </div>
          ))}
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-gray-400 bg-white border border-gray-100 rounded-xl">
          <FiPhone size={40} className="mb-3 opacity-30" />
          <p className="font-medium text-gray-500">No call click logs found</p>
          <p className="text-xs text-gray-400 mt-1">Try resetting the filters or check back later.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {filteredLogs.map((log) => {
              const { device, browser } = parseUserAgent(log.userAgent)
              const hasLocation = log.city && log.city !== 'Unknown'
              const locationText = hasLocation
                ? `${log.city}, ${log.region}, ${log.country}`
                : (log.country && log.country !== 'Unknown' ? log.country : null)
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="card p-4 md:p-5 bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow transition-all duration-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left Info: Icon & Call Context */}
                  <div className="flex items-start gap-4 min-w-0">
                    <div className={`p-3 rounded-xl shrink-0 ${
                      device === 'Mobile' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {device === 'Mobile' ? <FiSmartphone size={20} /> : <FiMonitor size={20} />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-navy-800 text-sm md:text-base">
                          {log.phoneNumber ? `+${log.phoneNumber.replace(/[^0-9]/g, '')}` : 'Unknown Number'}
                        </span>
                        {log.text && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            "{log.text}"
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <FiGlobe size={12} />
                          {log.page || '/'}
                        </span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-medium">
                          {browser} ({device})
                        </span>
                        {locationText && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary-50 text-primary-700 font-semibold" title={`IP: ${log.ip || 'Unknown'}`}>
                            <FiMapPin size={10} />
                            {locationText}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Info: Date & Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50 shrink-0">
                    <div className="text-left sm:text-right">
                      <p className="text-xs font-semibold text-navy-700 flex items-center gap-1.5 justify-start sm:justify-end">
                        <FiClock size={12} className="text-gray-400" />
                        {formatDateTime(log.timestamp)}
                      </p>
                      <p className="text-2xs text-gray-400 mt-0.5">Click Registered</p>
                    </div>
                    {isAdmin() && (
                      <button
                        onClick={() => handleDelete(log.id)}
                        disabled={deletingId === log.id}
                        className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                        title="Delete log entry"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
