// ─────────────────────────────────────────────────────────────
// pages/admin/AdminMessages.jsx
// Contact message inbox for the admin panel.
// Displays all messages newest-first; clicking a message expands
// the full content and marks it as read.
// Unread messages are highlighted and counted in AdminLayout.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMail, FiTrash2, FiRefreshCw, FiChevronDown,
  FiChevronUp, FiCheckCircle, FiAlertCircle,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getMessages, markMessageRead, deleteMessage } from '../../services/messages'
import { formatDateTime } from '../../utils/helpers'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [filterUnread, setFilterUnread] = useState(false)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      setMessages(await getMessages())
    } catch {
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMessages() }, [])

  const handleExpand = async (msg) => {
    if (expandedId === msg.id) {
      setExpandedId(null)
      return
    }
    setExpandedId(msg.id)
    if (!msg.read) {
      try {
        await markMessageRead(msg.id)
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
        )
      } catch { /* silent */ }
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    setDeletingId(id)
    try {
      await deleteMessage(id)
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (expandedId === id) setExpandedId(null)
      toast.success('Message deleted')
    } catch {
      toast.error('Failed to delete message')
    } finally {
      setDeletingId(null)
    }
  }

  const displayed = filterUnread ? messages.filter((m) => !m.read) : messages
  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Messages</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {unreadCount} unread · {messages.length} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterUnread((p) => !p)}
            className={`flex items-center gap-2 text-sm py-2 px-4 rounded-xl border font-medium transition-colors ${
              filterUnread
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400'
            }`}
          >
            <FiAlertCircle size={14} />
            {filterUnread ? 'Show All' : 'Unread Only'}
          </button>
          <button onClick={fetchMessages} className="btn-secondary text-sm py-2 px-4">
            <FiRefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-gray-400">
          <FiMail size={40} className="mb-3 opacity-40" />
          <p className="font-medium">{filterUnread ? 'No unread messages' : 'No messages yet'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((msg) => {
            const isExpanded = expandedId === msg.id
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card overflow-hidden border-l-4 transition-all ${
                  !msg.read
                    ? 'border-l-primary-500 bg-blue-50/30'
                    : 'border-l-transparent'
                }`}
              >
                {/* Header Row */}
                <div
                  className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleExpand(msg)}
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                    !msg.read ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {msg.name?.[0]?.toUpperCase() || 'M'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-semibold text-sm ${!msg.read ? 'text-navy-800' : 'text-gray-700'}`}>
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <span className="badge bg-primary-100 text-primary-700 text-xs">New</span>
                      )}
                      <span className="text-gray-400 text-xs ml-auto whitespace-nowrap">
                        {formatDateTime(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{msg.email}</p>
                    {msg.subject && (
                      <p className={`text-sm mt-1 truncate ${!msg.read ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                        {msg.subject}
                      </p>
                    )}
                    {!isExpanded && msg.message && (
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{msg.message}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {msg.read ? (
                      <FiCheckCircle size={15} className="text-green-400" title="Read" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                    )}
                    {isExpanded ? <FiChevronUp size={16} className="text-gray-400" /> : <FiChevronDown size={16} className="text-gray-400" />}
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 ml-13">
                        <div className="bg-gray-50 rounded-xl p-4 ml-0">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {msg.message}
                          </p>
                          {msg.phone && (
                            <p className="text-xs text-gray-500 mt-3">
                              Phone: <a href={`tel:${msg.phone}`} className="text-primary-600 hover:underline">{msg.phone}</a>
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Your message'}`}
                            className="text-xs text-primary-600 hover:text-primary-800 font-medium hover:underline"
                          >
                            Reply via Email
                          </a>
                          <button
                            onClick={() => handleDelete(msg.id)}
                            disabled={deletingId === msg.id}
                            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium ml-auto disabled:opacity-50"
                          >
                            <FiTrash2 size={13} />
                            {deletingId === msg.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
