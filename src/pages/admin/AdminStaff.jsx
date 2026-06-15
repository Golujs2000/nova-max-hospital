import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus, FiTrash2, FiX, FiShield, FiRefreshCw,
  FiUsers, FiEdit2, FiSearch, FiUser, FiMail,
  FiLock, FiAlertTriangle, FiUserCheck, FiUserX, FiSend, FiEye, FiEyeOff,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import {
  getStaff, createStaffMember, updateStaffMember, deleteStaffMember,
  updateStaffCredentials, sendStaffPasswordReset,
} from '../../services/staff'
import { formatDate, getInitials } from '../../utils/helpers'
import { useAuth } from '../../context/AuthContext'

const EMPTY_FORM = { name: '', email: '', password: '', role: 'staff' }

const ROLE_CONFIG = {
  admin: {
    label: 'Admin',
    classes: 'bg-purple-100 text-purple-700 border border-purple-200',
    icon: <FiShield size={11} />,
  },
  staff: {
    label: 'Staff',
    classes: 'bg-blue-100 text-blue-700 border border-blue-200',
    icon: <FiUser size={11} />,
  },
}

const AVATAR_COLORS = [
  'bg-violet-100 text-violet-700',
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-indigo-100 text-indigo-700',
]

function avatarColor(name = '') {
  const code = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return AVATAR_COLORS[code % AVATAR_COLORS.length]
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-navy-800">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  )
}

// ── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ member, onConfirm, onCancel, deleting }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <FiAlertTriangle size={24} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-navy-800 mb-1">Remove Staff Member?</h3>
        <p className="text-sm text-gray-500 mb-5">
          This will remove <span className="font-semibold text-gray-700">{member.name}</span>'s
          record. Their Firebase Auth account will remain.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-secondary flex-1 justify-center py-2.5 text-sm">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-[5px] transition-all text-sm disabled:opacity-60"
          >
            {deleting ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <FiTrash2 size={14} />
            )}
            Remove
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Add / Edit Modal ─────────────────────────────────────────────────────────
function StaffModal({ editingMember, onClose, onSaved }) {
  const [form, setForm] = useState(
    editingMember
      ? { name: editingMember.name || '', email: editingMember.email || '', password: '', role: editingMember.role || 'staff' }
      : EMPTY_FORM
  )
  const [saving, setSaving] = useState(false)
  const [sendingReset, setSendingReset] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const isEdit = !!editingMember

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { toast.error('Name is required'); return }
    if (!form.email.trim()) { toast.error('Email is required'); return }
    if (!isEdit && !form.password) { toast.error('Password is required for new staff'); return }
    if (form.password && form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }

    setSaving(true)
    try {
      if (isEdit) {
        const emailChanged = form.email.trim() !== editingMember.email
        const passwordChanged = !!form.password

        // Always update name/role in Firestore
        await updateStaffMember(editingMember.id, { name: form.name.trim(), role: form.role })

        // Update credentials via Cloud Function if email or password changed
        if (emailChanged || passwordChanged) {
          await updateStaffCredentials({
            uid: editingMember.uid || editingMember.id,
            ...(emailChanged && { email: form.email.trim() }),
            ...(passwordChanged && { password: form.password }),
          })
        }
        toast.success('Staff member updated')
      } else {
        await createStaffMember({ ...form, name: form.name.trim() })
        toast.success('Staff member created')
      }
      onSaved()
    } catch (err) {
      const msg =
        err.code === 'auth/email-already-in-use' ? 'Email already in use' :
        err.code === 'auth/weak-password' ? 'Password must be at least 6 characters' :
        err.message || 'Failed to save'
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleSendReset = async () => {
    setSendingReset(true)
    try {
      await sendStaffPasswordReset(editingMember.email)
      toast.success(`Reset email sent to ${editingMember.email}`)
    } catch (err) {
      toast.error(err.message || 'Failed to send reset email')
    } finally {
      setSendingReset(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 16, opacity: 0 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-navy-800">
              {isEdit ? 'Edit Staff Member' : 'Add Staff Member'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEdit ? 'Update details, role, or credentials' : 'Create a new staff account'}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <FiX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
            <div className="relative">
              <FiUser size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="input-field pl-9"
                placeholder="e.g. Dr. Priya Sharma"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
            <div className="relative">
              <FiMail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="input-field pl-9"
                placeholder="staff@novamaxhospital.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password {isEdit ? <span className="text-gray-400 font-normal">(leave blank to keep)</span> : '*'}
            </label>
            <div className="relative">
              <FiLock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                required={!isEdit}
                minLength={isEdit ? undefined : 6}
                className="input-field pl-9 pr-10"
                placeholder={isEdit ? '••••••••' : 'Minimum 6 characters'}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
            {isEdit && (
              <button
                type="button"
                onClick={handleSendReset}
                disabled={sendingReset}
                className="mt-1.5 flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 disabled:opacity-50 transition-colors"
              >
                {sendingReset
                  ? <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                  : <FiSend size={11} />
                }
                Send password reset email
              </button>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <div className="grid grid-cols-2 gap-3">
              {['staff', 'admin'].map((r) => {
                const cfg = ROLE_CONFIG[r]
                return (
                  <label
                    key={r}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      form.role === r
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input type="radio" name="role" value={r} checked={form.role === r} onChange={handleChange} className="sr-only" />
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.classes}`}>
                      {cfg.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{cfg.label}</p>
                      <p className="text-xs text-gray-400">{r === 'admin' ? 'Full access' : 'Limited access'}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center py-2.5 text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 justify-center py-2.5 text-sm disabled:opacity-60"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving…
                </span>
              ) : isEdit ? 'Save Changes' : 'Create Member'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function AdminStaff() {
  const { isAdmin } = useAuth()
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [deletingMember, setDeletingMember] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchStaff = async () => {
    setLoading(true)
    try {
      setStaff(await getStaff())
    } catch {
      toast.error('Failed to load staff')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStaff() }, [])

  const handleSaved = async () => {
    await fetchStaff()
    setAddModalOpen(false)
    setEditingMember(null)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingMember) return
    setDeleteLoading(true)
    try {
      await deleteStaffMember(deletingMember.id)
      setStaff((prev) => prev.filter((s) => s.id !== deletingMember.id))
      toast.success('Staff member removed')
    } catch {
      toast.error('Failed to remove staff member')
    } finally {
      setDeleteLoading(false)
      setDeletingMember(null)
    }
  }

  // Stats
  const totalAdmins = staff.filter((s) => s.role === 'admin').length
  const totalStaff = staff.filter((s) => s.role === 'staff').length

  // Filtered list
  const filtered = useMemo(() => {
    return staff.filter((s) => {
      const matchesSearch =
        !search ||
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.email?.toLowerCase().includes(search.toLowerCase())
      const matchesRole = roleFilter === 'all' || s.role === roleFilter
      return matchesSearch && matchesRole
    })
  }, [staff, search, roleFilter])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Staff Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage clinic staff accounts and roles</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchStaff}
            disabled={loading}
            title="Refresh"
            className="btn-secondary text-sm py-2 px-3 disabled:opacity-60"
          >
            <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          {isAdmin() && (
            <button onClick={() => setAddModalOpen(true)} className="btn-primary text-sm py-2 px-4">
              <FiPlus size={15} /> Add Staff
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<FiUsers size={20} className="text-primary-600" />}
          label="Total Members"
          value={staff.length}
          color="bg-primary-50"
        />
        <StatCard
          icon={<FiShield size={20} className="text-purple-600" />}
          label="Admins"
          value={totalAdmins}
          color="bg-purple-50"
        />
        <StatCard
          icon={<FiUserCheck size={20} className="text-blue-600" />}
          label="Staff"
          value={totalStaff}
          color="bg-blue-50"
        />
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="input-field pl-9 py-2.5 text-sm"
          />
        </div>
        {/* Role filter */}
        <div className="flex gap-2">
          {['all', 'admin', 'staff'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 rounded-[5px] text-sm font-medium border transition-all ${
                roleFilter === r
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400 hover:text-primary-600'
              }`}
            >
              {r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <svg className="animate-spin h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FiUserX size={36} className="mb-3 opacity-40" />
            <p className="font-medium text-gray-500">
              {staff.length === 0 ? 'No staff members yet' : 'No results found'}
            </p>
            {staff.length === 0 && isAdmin() && (
              <button
                onClick={() => setAddModalOpen(true)}
                className="btn-primary mt-4 text-sm py-2 px-4"
              >
                <FiPlus size={15} /> Add First Staff Member
              </button>
            )}
            {staff.length > 0 && (
              <button
                onClick={() => { setSearch(''); setRoleFilter('all') }}
                className="mt-3 text-sm text-primary-600 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Member', 'Email', 'Role', 'Joined', ...(isAdmin() ? ['Actions'] : [])].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left font-semibold text-gray-500 text-xs uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode="popLayout">
                  {filtered.map((member) => {
                    const cfg = ROLE_CONFIG[member.role] || ROLE_CONFIG.staff
                    return (
                      <motion.tr
                        key={member.id}
                        layout
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        {/* Name + avatar */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-semibold text-xs ${avatarColor(member.name)}`}>
                              {getInitials(member.name) || 'S'}
                            </div>
                            <span className="font-medium text-gray-800">{member.name}</span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-5 py-4 text-gray-500">{member.email}</td>

                        {/* Role badge */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.classes}`}>
                            {cfg.icon}
                            {cfg.label}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                          {formatDate(member.createdAt)}
                        </td>

                        {/* Actions */}
                        {isAdmin() && (
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setEditingMember(member)}
                                title="Edit"
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                              >
                                <FiEdit2 size={14} />
                              </button>
                              <button
                                onClick={() => setDeletingMember(member)}
                                title="Remove"
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </td>
                        )}
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </tbody>
            </table>

            {/* Footer count */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
              <p className="text-xs text-gray-400">
                Showing {filtered.length} of {staff.length} member{staff.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {(addModalOpen || editingMember) && (
          <StaffModal
            key="staff-modal"
            editingMember={editingMember}
            onClose={() => { setAddModalOpen(false); setEditingMember(null) }}
            onSaved={handleSaved}
          />
        )}
        {deletingMember && (
          <DeleteModal
            key="delete-modal"
            member={deletingMember}
            deleting={deleteLoading}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeletingMember(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
