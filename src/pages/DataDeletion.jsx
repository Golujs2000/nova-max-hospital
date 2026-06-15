import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiTrash2, FiMail, FiPhone, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { siteData } from '../data/siteData'
import { sendMessage } from '../services/messages'
import { validateEmail, sanitizeInput } from '../utils/formProtection'

export default function DataDeletion() {
  const [form, setForm] = useState({ name: '', email: '', reason: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!validateEmail(form.email)) errs.email = 'Valid email required'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await sendMessage({
        name: sanitizeInput(form.name),
        email: form.email.trim(),
        subject: 'DATA DELETION REQUEST',
        message: `Data deletion request from ${form.name} (${form.email}). Reason: ${form.reason || 'Not specified'}`,
        phone: '',
      })
      setSubmitted(true)
      toast.success('Deletion request submitted. We\'ll process it within 30 days.')
    } catch {
      toast.error('Failed to submit. Please email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Data Deletion Request" description={`Submit a request to delete your personal data from ${siteData.name}'s systems.`} />

      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Data Deletion Request</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            You have the right to request deletion of your personal data. We will process your request within 30 days.
          </p>
        </motion.div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Info box */}
            <div className="flex gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl mb-8">
              <FiAlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Before submitting a deletion request</p>
                <p>Deleting your data means we will remove your appointment records, contact history, and personal details from our systems. This action is irreversible. Active medical records required by law may be retained for up to 5 years.</p>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-10 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrash2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-heading font-bold text-navy-800 text-xl mb-2">Request Submitted</h2>
                <p className="text-gray-500 mb-2">We've received your data deletion request.</p>
                <p className="text-gray-500 text-sm">We will process your request within <strong>30 days</strong> and send a confirmation to <strong>{form.email}</strong>.</p>
              </motion.div>
            ) : (
              <div className="card p-8">
                <h2 className="font-heading font-bold text-navy-800 text-xl mb-6">Submit Deletion Request</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="As registered with us" className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email used when booking with us" className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason (Optional)</label>
                    <textarea name="reason" value={form.reason} onChange={handleChange} rows={3} placeholder="Let us know why you're requesting deletion…" className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center bg-red-600 hover:bg-red-700 disabled:opacity-60">
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting…</>
                    ) : (
                      <><FiTrash2 /> Submit Deletion Request</>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-500">
                  <p className="mb-2">Or contact us directly:</p>
                  <div className="flex flex-col gap-2">
                    <a href={`mailto:${siteData.contact.email}`} className="flex items-center gap-2 hover:text-primary-600">
                      <FiMail className="w-4 h-4" /> {siteData.contact.email}
                    </a>
                    <a href={`tel:${siteData.contact.phone}`} className="flex items-center gap-2 hover:text-primary-600">
                      <FiPhone className="w-4 h-4" /> {siteData.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}
