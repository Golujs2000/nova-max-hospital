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
  FiInstagram, FiFacebook, FiSave, FiRefreshCw, FiDatabase,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getSettings, updateSettings } from '../../services/settings'
import { seedDepartmentsAndServices, seedFirestore } from '../../data/seedData'

const EMPTY_FORM = {
  siteName: 'Sarvada Hospito Care',
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
      { name: 'siteName', label: 'Site Name', placeholder: 'Sarvada Hospito Care', icon: FiGlobe },
      { name: 'tagline', label: 'Tagline', placeholder: 'Your Health, Our Priority', icon: FiGlobe },
    ],
  },
  {
    title: 'Contact Details',
    icon: FiPhone,
    fields: [
      { name: 'phone', label: 'Contact Phone', placeholder: '7079001600', icon: FiPhone },
      { name: 'emergencyPhone', label: 'Emergency Phone', placeholder: '7079001700', icon: FiPhone },
      { name: 'email', label: 'Email Address', placeholder: 'sarvadahospitocarepatna@gmail.com', icon: FiMail, type: 'email' },
      { name: 'address', label: 'Address', placeholder: 'Anand palace, Bypass Rd, changer, Kankarbagh, Patna, Bihar 800020', icon: FiMapPin },
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
  const [seedingClinical, setSeedingClinical] = useState(false)
  const [seedingFull, setSeedingFull] = useState(false)
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

  const handleSeedClinical = async () => {
    if (!window.confirm('WARNING: This will RESET all 36 Departments and 72 Treatments to their factory defaults. Any manual changes to categories or treatments will be LOST. Continue?')) return
    setSeedingClinical(true)
    try {
      await seedDepartmentsAndServices()
      toast.success('Clinical dataset refreshed successfully!')
    } catch (err) {
      toast.error('Seeding failed: ' + err.message)
    } finally {
      setSeedingClinical(false)
    }
  }

  const handleSeedFull = async () => {
    if (!window.confirm('WARNING: This will RESET default Doctors and Blogs to their defaults. Any manual changes to doctor profiles or blog posts will be LOST. Continue?')) return
    setSeedingFull(true)
    try {
      await seedFirestore()
      toast.success('Doctor and Blog data reset successfully!')
    } catch (err) {
      toast.error('Full seeding failed: ' + err.message)
    } finally {
      setSeedingFull(false)
    }
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

      {/* Database Management Tools */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="card p-6 border-dashed border-2 border-amber-200 bg-amber-50/40"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <FiDatabase size={18} className="text-amber-600" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-navy-800 mb-1">Clinical Database Tools</h2>
            <p className="text-sm text-gray-500 mb-6">
              Use these tools to reset or refresh your clinical content and site defaults. 
              <span className="text-amber-700 font-medium"> Actions are destructive and overwrite existing database records.</span>
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Clinical Dataset Button */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-navy-800 uppercase tracking-wider">Clinical Content</p>
                <button
                  type="button"
                  onClick={handleSeedClinical}
                  disabled={seedingClinical}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  {seedingClinical ? (
                    <><FiRefreshCw size={15} className="animate-spin" /> Updating Treatments…</>
                  ) : (
                    <><FiDatabase size={15} /> Refresh Clinical Dataset</>
                  )}
                </button>
                <p className="text-[10px] text-gray-400 italic">Resets 36 Departments & 72 Treatments. Overwrites existing data (preserves custom thumbnails).</p>
              </div>

              {/* Full Site Reset Button */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-navy-800 uppercase tracking-wider">Site-wide Defaults</p>
                <button
                  type="button"
                  onClick={handleSeedFull}
                  disabled={seedingFull}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-navy-600 hover:bg-navy-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  {seedingFull ? (
                    <><FiRefreshCw size={15} className="animate-spin" /> Resetting Data…</>
                  ) : (
                    <><FiDatabase size={15} /> Seed Doctors & Blogs</>
                  )}
                </button>
                <p className="text-[10px] text-gray-400 italic">Resets Doctor profile and Blog posts. Overwrites existing data.</p>
              </div>
            </div>


          </div>
        </div>
      </motion.div>

    </div>
  )
}
