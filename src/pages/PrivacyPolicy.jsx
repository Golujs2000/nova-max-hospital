import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { siteData } from '../data/siteData'

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect personal information you provide when booking appointments or contacting us, including your name, email address, phone number, and medical information relevant to your appointment request. We also collect anonymous usage data such as page visits to improve our website.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `Your information is used to confirm and manage your appointments, contact you regarding your healthcare queries, send appointment reminders via WhatsApp or SMS, improve our services, and comply with legal and regulatory requirements. We do not sell or share your personal information with third parties for marketing purposes.`,
  },
  {
    title: '3. Data Storage & Security',
    content: `Your data is stored securely on Firebase (Google Cloud) servers with industry-standard encryption. We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.`,
  },
  {
    title: '4. Cookies',
    content: `We use essential cookies to ensure our website functions correctly. We do not use advertising or tracking cookies. You can control cookies through your browser settings, though disabling essential cookies may affect website functionality.`,
  },
  {
    title: '5. Your Rights',
    content: `You have the right to access, correct, or delete your personal data. You may request data deletion by visiting our Data Deletion page or emailing us directly. We will process your request within 30 days.`,
  },
  {
    title: '6. Third-Party Services',
    content: `We use Google Firebase for data storage and authentication, Google Maps for location services, and Meta WhatsApp API for appointment notifications. These services have their own privacy policies.`,
  },
  {
    title: '7. Children\'s Privacy',
    content: `Our website is not directed at children under 13 years of age. We do not knowingly collect personal information from children under 13 without parental consent.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page with an updated date. Your continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '9. Contact Us',
    content: `For any privacy-related queries or requests, please contact our Data Protection Officer at ${siteData.contact.email} or write to us at ${siteData.contact.address}.`,
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy" description={`Read ${siteData.name}'s privacy policy to understand how we collect, use, and protect your personal information.`} />

      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/80">Last updated: January 2025</p>
        </motion.div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gray-600 leading-relaxed mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <strong className="text-navy-800">{siteData.name}</strong> ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
            </p>

            <div className="space-y-8">
              {sections.map(({ title, content }) => (
                <div key={title}>
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-3">{title}</h2>
                  <p className="text-gray-600 leading-relaxed">{content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
