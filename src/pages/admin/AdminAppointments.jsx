// ─────────────────────────────────────────────────────────────
// pages/admin/AdminAppointments.jsx
// Appointment management page for the admin panel.
// Features: status filter tabs, search by name/phone/booking ID,
// inline status update, reschedule modal, and delete confirmation.
// Uses useMemo for client-side filtering to avoid unnecessary
// Firestore reads on every keystroke.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCalendar, FiSearch, FiTrash2, FiRefreshCw,
  FiChevronDown, FiFilter, FiPhone, FiEye, FiX, FiClock,
  FiCheckCircle, FiInbox,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import {
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  rescheduleAppointment,
} from '../../services/appointments'
import { formatDate, getStatusColor } from '../../utils/helpers'

const STATUSES = ['All', 'pending', 'confirmed', 'cancelled', 'completed']

const TIME_SLOTS = {
  Morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  Afternoon: ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
}

// ── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ appt, onClose }) {
  if (!appt) return null
  const rows = [
    ['Booking ID', appt.bookingId || appt.id?.slice(0, 8).toUpperCase()],
    ['Patient Name', appt.name],
    ['Age / Sex', [appt.age, appt.sex].filter(Boolean).join(' / ') || '—'],
    ["Parent's Name", appt.parentName || '—'],
    ['Doctor', appt.doctorName || '—'],
    ['Phone', appt.phone],
    ['Email', appt.email || '—'],
    ['Address', appt.address || '—'],
    ['Department', appt.department || '—'],
    ['Consultation Mode', appt.mode || 'Offline'],
    ['Appointment Date', appt.date ? formatDate(appt.date) : '—'],
    ['Time Slot', appt.timeSlot || '—'],
    ['Status', appt.status],
    ['Message', appt.message || '—'],
    ['Booked On', appt.createdAt?.seconds ? formatDate(appt.createdAt) : '—'],
  ]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-navy-800">Appointment Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
          {rows.map(([label, value]) => (
            <div key={label} className="flex gap-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-32 shrink-0 pt-0.5">{label}</span>
              <span className={`text-sm text-gray-700 break-words ${label === 'Status' ? `badge ${getStatusColor(value)}` : ''}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="btn-secondary text-sm px-5 py-2">Close</button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Reschedule Modal ──────────────────────────────────────────────────────────
function RescheduleModal({ appt, onClose, onSave }) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(appt?.date || today)
  const [slot, setSlot] = useState(appt?.timeSlot || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!date) return toast.error('Please select a date')
    if (!slot) return toast.error('Please select a time slot')
    setSaving(true)
    await onSave(date, slot)
    setSaving(false)
  }

  if (!appt) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-navy-800">Reschedule Appointment</h2>
            <p className="text-xs text-gray-400 mt-0.5">{appt.name} · {appt.bookingId || appt.id?.slice(0, 8).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Date picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">New Date</label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="input-field py-2.5 text-sm"
            />
          </div>

          {/* Time slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
            <div className="space-y-3">
              {Object.entries(TIME_SLOTS).map(([period, times]) => (
                <div key={period}>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-1.5">{period}</p>
                  <div className="flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSlot(t)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          slot === t
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary text-sm px-5 py-2">Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-sm px-5 py-2 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Confirm Reschedule'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Stat Card Component ───────────────────────────────────────────────────────
function ApptStatCard({ label, value, icon: Icon, colorClass, loading }) {
  return (
    <div className={`card p-4 flex items-center gap-4 border-l-4 ${colorClass}`}>
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-gray-600" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        {loading ? (
          <div className="h-6 w-12 bg-gray-100 animate-pulse rounded mt-1" />
        ) : (
          <p className="text-xl font-bold text-navy-800 leading-tight">{value}</p>
        )}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [viewAppt, setViewAppt] = useState(null)
  const [rescheduleAppt, setRescheduleAppt] = useState(null)

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const data = await getAppointments()
      setAppointments(data)
    } catch {
      toast.error('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAppointments() }, [])

  const filtered = useMemo(() => {
    let list = appointments
    if (filterStatus !== 'All') list = list.filter((a) => a.status === filterStatus)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (a) =>
          a.name?.toLowerCase().includes(q) ||
          a.phone?.includes(q) ||
          a.bookingId?.toLowerCase().includes(q)
      )
    }
    return list
  }, [appointments, filterStatus, search])

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return {
      total: appointments.length,
      pending: appointments.filter(a => a.status === 'pending').length,
      today: appointments.filter(a => a.date === today).length,
      finalized: appointments.filter(a => ['completed', 'cancelled'].includes(a.status)).length,
    }
  }, [appointments])

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      await updateAppointmentStatus(id, newStatus)
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      )
      toast.success('Status updated')
    } catch {
      toast.error('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deleteAppointment(id)
      setAppointments((prev) => prev.filter((a) => a.id !== id))
      toast.success('Appointment deleted')
    } catch {
      toast.error('Failed to delete appointment')
    } finally {
      setDeletingId(null)
    }
  }

  const handleReschedule = async (date, timeSlot) => {
    try {
      await rescheduleAppointment(rescheduleAppt.id, { date, timeSlot })
      setAppointments((prev) =>
        prev.map((a) => (a.id === rescheduleAppt.id ? { ...a, date, timeSlot } : a))
      )
      toast.success('Appointment rescheduled')
      setRescheduleAppt(null)
    } catch {
      toast.error('Failed to reschedule')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Appointments</h1>
          <p className="text-gray-500 text-sm mt-0.5">{filtered.length} record{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <button
          onClick={fetchAppointments}
          className="flex items-center gap-2 btn-secondary text-sm py-2 px-4"
        >
          <FiRefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ApptStatCard
          label="Total Bookings"
          value={stats.total}
          icon={FiCalendar}
          colorClass="border-primary-500"
          loading={loading}
        />
        <ApptStatCard
          label="Pending Today"
          value={stats.pending}
          icon={FiClock}
          colorClass="border-amber-500"
          loading={loading}
        />
        <ApptStatCard
          label="Confirmed Today"
          value={stats.today}
          icon={FiCheckCircle}
          colorClass="border-teal-500"
          loading={loading}
        />
        <ApptStatCard
          label="Finalized"
          value={stats.finalized}
          icon={FiInbox}
          colorClass="border-gray-400"
          loading={loading}
        />
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
          <input
            type="text"
            placeholder="Search by name, phone or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2.5 text-sm"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field pl-9 py-2.5 text-sm pr-8 appearance-none cursor-pointer min-w-[160px]"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <FiCalendar size={36} className="mb-3 opacity-40" />
            <p className="font-medium">No appointments found</p>
            <p className="text-sm mt-1">Try changing your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
            <table className="w-full text-sm min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Booking ID', 'Patient', 'Phone', 'Department', 'Date & Time', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((appt) => (
                  <motion.tr
                    key={appt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3.5 font-mono text-xs text-gray-500 whitespace-nowrap">
                      {appt.bookingId || appt.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="font-medium text-gray-800">{appt.name}</p>
                      {(appt.age || appt.sex) && (
                        <p className="text-xs text-gray-400">
                          {[appt.age, appt.sex].filter(Boolean).join(' / ')}
                        </p>
                      )}
                      {appt.parentName && (
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Parent: {appt.parentName}
                        </p>
                      )}
                      {appt.doctorName && (
                        <p className="text-[11px] text-primary-600 font-semibold mt-0.5">
                          Doctor: {appt.doctorName}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                      <a href={`tel:${appt.phone}`} className="flex items-center gap-1 hover:text-primary-600">
                        <FiPhone size={12} /> {appt.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                      {appt.department || '—'}
                      <div className="text-[10px] uppercase font-bold tracking-wider mt-0.5 text-primary-500">
                        {appt.mode || 'Offline'}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="text-gray-700 text-sm">{formatDate(appt.date || appt.createdAt)}</p>
                      {appt.timeSlot && (
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <FiClock size={11} /> {appt.timeSlot}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`badge ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {/* View */}
                        <button
                          onClick={() => setViewAppt(appt)}
                          title="View details"
                          className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                          <FiEye size={15} />
                        </button>

                        {/* Reschedule */}
                        <button
                          onClick={() => setRescheduleAppt(appt)}
                          title="Reschedule"
                          className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        >
                          <FiCalendar size={15} />
                        </button>

                        {/* Status dropdown */}
                        <select
                          value={appt.status}
                          disabled={updatingId === appt.id}
                          onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-400 cursor-pointer disabled:opacity-50"
                        >
                          {STATUSES.filter((s) => s !== 'All').map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(appt.id)}
                          disabled={deletingId === appt.id}
                          title="Delete"
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {deletingId === appt.id ? (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                          ) : (
                            <FiTrash2 size={15} />
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {viewAppt && <ViewModal appt={viewAppt} onClose={() => setViewAppt(null)} />}
        {rescheduleAppt && (
          <RescheduleModal
            appt={rescheduleAppt}
            onClose={() => setRescheduleAppt(null)}
            onSave={handleReschedule}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
