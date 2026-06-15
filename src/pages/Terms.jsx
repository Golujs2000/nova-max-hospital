import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { siteData } from '../data/siteData'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using the ${siteData.name} website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.`,
  },
  {
    title: '2. Medical Disclaimer',
    content: 'The information provided on this website is for general informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for medical diagnosis and treatment. In case of a medical emergency, call your local emergency number or our emergency line immediately.',
  },
  {
    title: '3. Appointment Booking',
    content: 'Online appointment requests are subject to doctor availability. Submission of an appointment form does not guarantee confirmation. Our team will confirm your appointment via phone within 30 minutes during working hours. Appointments must be cancelled at least 4 hours in advance to avoid a cancellation fee.',
  },
  {
    title: '4. Intellectual Property',
    content: `All content on this website, including text, images, logos, and graphics, is the property of ${siteData.name} and protected by copyright law. You may not reproduce, distribute, or use our content without prior written permission.`,
  },
  {
    title: '5. Limitation of Liability',
    content: `${siteData.name} shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or our services, to the maximum extent permitted by applicable law.`,
  },
  {
    title: '6. Privacy',
    content: 'Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms by reference.',
  },
  {
    title: '7. Third-Party Links',
    content: 'Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of those websites.',
  },
  {
    title: '8. Governing Law',
    content: 'These Terms are governed by the laws of India and the state of Bihar. Any disputes shall be subject to the exclusive jurisdiction of courts in Patna, Bihar.',
  },
  {
    title: '9. Changes to Terms',
    content: 'We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of the website constitutes acceptance of the modified terms.',
  },
  {
    title: '10. Contact',
    content: `For any questions regarding these Terms, contact us at ${siteData.contact.email}.`,
  },
]

export default function Terms() {
  return (
    <>
      <SEO title="Terms & Conditions" description={`Read ${siteData.name}'s terms and conditions for using our website and services.`} />

      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-white/80">Last updated: January 2025</p>
        </motion.div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {sections.map(({ title, content }) => (
              <div key={title}>
                <h2 className="font-heading font-bold text-navy-800 text-xl mb-3">{title}</h2>
                <p className="text-gray-600 leading-relaxed">{content}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
