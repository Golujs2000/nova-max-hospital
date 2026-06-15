// ─────────────────────────────────────────────────────────────
// pages/admin/AdminSettings.jsx
// Site-wide settings editor for the admin panel.
// Reads/writes the single `settings/siteSettings` Firestore doc.
// Fields: contact info, opening hours, social media links,
// announcement bar text, and other configurable site options.
// Uses merge:true so partial saves don't wipe unedited fields.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiSettings, FiPhone, FiMail, FiMapPin, FiGlobe,
  FiInstagram, FiFacebook, FiSave, FiRefreshCw,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getSettings, updateSettings } from '../../services/settings'

const EMPTY_FORM = {
  siteName: 'Nova Max Hospital',
  tagline: 'Your Health, Our Priority',
  phone: '',
  emergencyPhone: '',
  email: '',
  address: '',
  facebookUrl: '',
  instagramUrl: '',
}

const FIELD_GROUPS = [
  {
    title: 'Site Identity',
    icon: FiGlobe,
    fields: [
      { name: 'siteName', label: 'Site Name', placeholder: 'Nova Max Hospital', icon: FiGlobe },
      { name: 'tagline', label: 'Tagline', placeholder: 'Your Health, Our Priority', icon: FiGlobe },
    ],
  },
  {
    title: 'Contact Details',
    icon: FiPhone,
    fields: [
      { name: 'phone', label: 'Contact Phone', placeholder: '7079001600', icon: FiPhone },
      { name: 'emergencyPhone', label: 'Emergency Phone', placeholder: '7079001700', icon: FiPhone },
      { name: 'email', label: 'Email Address', placeholder: 'surgmrityunjay@yahoo.co.in', icon: FiMail, type: 'email' },
      { name: 'address', label: 'Address', placeholder: "Multi-speciality Hospital, opposite Women's ITI College, beside HDFC Bank or Ziom, Digha, Patna, Bihar 800011", icon: FiMapPin },
    ],
  },
  {
    title: 'Social Media',
    icon: FiGlobe,
    fields: [
      { name: 'facebookUrl', label: 'Facebook URL', placeholder: 'https://facebook.com/patnalaprostonecare', icon: FiFacebook },
      { name: 'instagramUrl', label: 'Instagram URL', placeholder: 'https://instagram.com/patnalaprostonecare', icon: FiInstagram },
    ],
  },
]

export default function AdminSettings() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const data = await getSettings()
      setForm((prev) => ({ ...prev, ...data }))
    } catch {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSettings() }, [])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSettings(form)
      setSavedAt(new Date())
      toast.success('Settings saved successfully')
    } catch {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <svg className="animate-spin h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {savedAt
              ? `Last saved: ${savedAt.toLocaleTimeString('en-IN')}`
              : 'Manage your site configuration'}
          </p>
        </div>
        <button onClick={fetchSettings} className="btn-secondary text-sm py-2 px-4 self-start sm:self-auto">
          <FiRefreshCw size={14} /> Reload
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {FIELD_GROUPS.map(({ title, icon: Icon, fields }, gi) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                <Icon size={16} className="text-primary-600" />
              </div>
              <h2 className="font-semibold text-navy-800">{title}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map(({ name, label, placeholder, icon: FieldIcon, type = 'text' }) => (
                <div key={name} className={name === 'address' || name === 'tagline' ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <div className="relative">
                    {FieldIcon && (
                      <FieldIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    )}
                    <input
                      name={name}
                      type={type}
                      value={form[name] || ''}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={`input-field ${FieldIcon ? 'pl-9' : ''}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-8 py-3 disabled:opacity-60"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FiSave size={17} /> Save Settings
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
