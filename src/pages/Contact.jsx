// ─────────────────────────────────────────────────────────────
// pages/Contact.jsx
// Contact page with a validated form (honeypot + rate limit)
// that saves submissions to the Firestore `messages` collection.
// Also displays hospital address, phone, email, hours,
// social links, and an embedded Google Map.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { sendMessage } from '../services/messages'
import { validateContactForm, checkHoneypot, checkRateLimit, sanitizeInput } from '../utils/formProtection'
import { siteData } from '../data/siteData'

const initialState = { name: '', email: '', phone: '', subject: '', message: '', _hp: '' }

export default function Contact() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!checkHoneypot(form._hp)) return
    if (!checkRateLimit('contact')) {
      toast.error('Please wait before submitting again.')
      return
    }
    const { valid, errors: errs } = validateContactForm(form)
    if (!valid) { setErrors(errs); return }

    setLoading(true)
    try {
      await sendMessage({
        name: sanitizeInput(form.name),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: sanitizeInput(form.subject),
        message: sanitizeInput(form.message),
      })
      toast.success('Message sent! We\'ll reply within 24 hours.')
      setSent(true)
      setForm(initialState)
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title={`Contact Us — ${siteData.name}`}
        description={`Contact Sarvada Hospito Care, Patna at ${siteData.contact.phone}. Located at ${siteData.contact.address}. Book appointments online.`}
        keywords={['contact Sarvada Hospito Care', 'clinic address Patna', 'Sarvada Hospito Care phone number', 'book surgery appointment Patna']}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'MedicalClinic',
          name: siteData.name,
          url: siteData.url,
          telephone: `+91${siteData.contact.phone}`,
          email: siteData.contact.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Anand palace, Bypass Rd, changer, Kankarbagh',
            addressLocality: 'Patna',
            addressRegion: 'Bihar',
            postalCode: '800020',
            addressCountry: 'IN',
          },
          openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '08:00', closes: '21:00' },
          ],
          hasMap: siteData.mapLink,
        }}
      />

      {/* Hero */}
      <section className="page-hero text-center border-b border-navy-800">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            We're here to help. Reach out for appointments or queries.
          </p>
        </motion.div>
      </section>

      <section className="section-padding bg-slate-50 border-b border-gray-100">
        <div className="container-max grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="section-title mb-8">Get in Touch</h2>

            <div className="space-y-6 mb-8">
              {[
                { icon: FiMapPin, label: 'Our Address', value: siteData.contact.address, href: siteData.mapLink, target: '_blank', rel: 'noopener noreferrer' },
                { 
                  icon: FiPhone, 
                  label: 'Phone Numbers', 
                  value: [
                    siteData.contact.phone,
                    siteData.contact.phone2,
                    siteData.contact.phone3,
                    siteData.contact.phone4
                  ].filter(Boolean),
                  isPhones: true 
                },
                { icon: FiMail, label: 'Email', value: siteData.contact.email, href: `mailto:${siteData.contact.email}` },
                { icon: FiClock, label: 'Hours', value: siteData.contact.hours, href: null },
              ].map(({ icon: Icon, label, value, href, isPhones, ...rest }) => (
                <div key={label} className="flex gap-4 p-5 bg-white rounded-[5px] border border-gray-100 shadow-sm">
                  <div className={`w-12 h-12 rounded-[5px] flex items-center justify-center flex-shrink-0 bg-primary-50`}>
                    <Icon className={`w-5 h-5 text-primary-600`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-0.5">{label}</p>
                    {isPhones ? (
                      <div className="flex flex-col gap-1">
                        {value.map((ph) => (
                          <a key={ph} href={`tel:${ph}`} className="font-medium hover:underline text-navy-800 hover:text-primary-600 block">
                            {ph}
                          </a>
                        ))}
                      </div>
                    ) : href ? (
                      <a href={href} {...rest} className={`font-medium hover:underline text-navy-800 hover:text-primary-600`}>{value}</a>
                    ) : (
                      <p className="font-medium text-navy-800">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: FiFacebook, href: siteData.social.facebook, label: 'Facebook' },
                { icon: FiInstagram, href: siteData.social.instagram, label: 'Instagram' },
                { icon: FiTwitter, href: siteData.social.twitter, label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white border border-gray-200 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 rounded-[5px] flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Map */}
            <div className="mt-8 h-64 rounded-2xl overflow-hidden shadow-card">
              <iframe
                src={siteData.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Sarvada Hospito Care Map"
              />
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="card p-8">
              <h2 className="font-heading font-bold text-navy-800 text-2xl mb-6">Send Us a Message</h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-navy-800 text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="btn-primary">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <input type="text" name="_hp" value={form._hp} onChange={handleChange} className="hidden" tabIndex="-1" />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (Optional)</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile number" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                      <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" className={`input-field ${errors.subject ? 'border-red-400' : ''}`} />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Write your message here…" className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending…</>
                    ) : (
                      <><FiSend /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
