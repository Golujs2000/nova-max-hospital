import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiHeart, FiTarget, FiEye,
  FiCheckCircle, FiPhone, FiCalendar, FiArrowRight,
  FiShield, FiStar,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { siteData } from '../data/siteData'

export default function About() {
  return (
    <>
      <SEO
        title={`About Us — ${siteData.name}`}
        description={`Learn about Sarvada Hospito Care (A Unit of Servada Hospito Care Pvt. Ltd.) in Kankarbagh, Patna — an ISO 9001:2020 certified hospital offering advanced laparoscopic surgery, ICU, ICCU, dialysis, orthopedic care, and multi-specialty treatment.`}
        keywords={[
          'about Sarvada Hospito Care Patna',
          'Sarvada Hospito Care Kankarbagh',
          'laparoscopic surgeon Patna',
          'multidepartment hospital Patna Bihar',
          'dialysis centre Patna',
          'icu iccu hospital Patna',
          'outstation patient care Patna',
          'patients from Nepal',
          'patients from Jharkhand',
          'patients from UP'
        ]}
      />

      <main className="flex-1 bg-white">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="page-hero text-center border-b border-navy-800">
          <div className="container-max">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Advanced Surgery. <span className="text-primary-400">Expert Care.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
              Sarvada Hospito Care (A Unit of Servada Hospito Care Pvt. Ltd.) is Patna's trusted multi-specialty healthcare centre, offering advanced laparoscopic surgery, ICU, ICCU, dialysis, orthopedic surgery, cardiology, neurosurgery, gynecology, and emergency care.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link className="btn-accent gap-2 text-base px-8 py-3 font-bold" to="/book-appointment">
                <FiCalendar /> Book Appointment
              </Link>
              <a href={`tel:${siteData.contact.phone}`} className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-[5px] transition-all duration-200 text-base">
                <FiPhone /> Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ── Story ──────────────────────────────────────────────── */}
        <section className="section-padding bg-slate-50 border-b border-gray-100">
          <div className="container-max max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[5px] p-8 sm:p-12 border border-gray-100 shadow-sm"
            >
              {/* Hospital Staff Image */}
              <div className="rounded-[5px] border border-gray-100 overflow-hidden mb-10">
                <img
                  src="/hospital-staff.png"
                  alt="Sarvada Hospito Care — Our Team"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
                Our Story
              </span>
              
              <h2 className="font-heading text-3xl md:text-4xl font-black text-navy-800 leading-tight mb-6">
                Building Trust, <span className="text-primary-600">One Patient at a Time</span>
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed text-base sm:text-lg">
                <p>
                  Sarvada Hospito Care was established at Anand Palace, Bypass Road, Changer, Kankarbagh, Patna with a focused mission — to bring world-class healthcare, advanced laparoscopic surgeries, and multi-specialty treatments to Bihar.
                </p>
                <p>
                  Managed and run by a team of senior Consultant Physicians, Gastro Surgeons, Gynecologists, Cardiologists, and Orthopedicians with decades of collective clinical experience. Our medical expertise is coupled with a genuine concern for our patients' well-being, supported by a staff dedicated to patient comfort and prompt attention.
                </p>
                <p>
                  We are proud to have served over <strong className="text-navy-800">5,000 satisfied patients</strong> and performed more than <strong className="text-navy-800">2,000 successful operations</strong>.
                </p>
                <p>
                  Today, our reputation extends far beyond Patna. We are the preferred healthcare destination for patients traveling from <strong className="text-navy-800">Nepal</strong>, neighboring states like <strong className="text-navy-800">Jharkhand</strong> and <strong className="text-navy-800">Uttar Pradesh (UP)</strong>, as well as all <strong className="text-navy-800">38 districts of Bihar</strong>, seeking trusted laparoscopic surgeries and liver, pancreas, and stone treatments.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium bg-blue-50 border-blue-200 text-blue-700">
                  <FiCheckCircle className="w-4 h-4" /> Laparoscopic Surgery
                </div>
                <div className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium bg-primary-50 border-primary-200 text-primary-700">
                  <FiHeart className="w-4 h-4" /> Stone Treatment
                </div>
                <div className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium bg-teal-50 border-teal-200 text-teal-700">
                  <FiShield className="w-4 h-4" /> Liver & Pancreas Care
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Mission & Vision ─────────────────────────────────── */}

        {/* ── Mission & Vision ─────────────────────────────────── */}
        <section className="section-padding bg-white border-b border-gray-100">
          <div className="container-max">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 leading-tight">Mission & <span className="text-primary-600">Vision</span></h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8 border-t-4 border-t-primary-600 relative overflow-hidden">
                <div className="w-14 h-14 bg-primary-50 border border-primary-100 rounded-[5px] flex items-center justify-center mb-6">
                  <FiTarget className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">To provide expert, evidence-based, and accessible surgical care to every patient in Bihar — using advanced laparoscopic techniques for minimal pain, rapid recovery, and lasting outcomes with the highest standards of safety.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="card p-8 border-t-4 border-t-accent-500 relative overflow-hidden">
                <div className="w-14 h-14 bg-accent-50 border border-accent-100 rounded-[5px] flex items-center justify-center mb-6">
                  <FiEye className="w-7 h-7 text-accent-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">To be Bihar's most trusted surgical centre — where patients receive world-class minimally invasive care, families feel genuinely supported, and every surgery is performed with precision, compassion, and clinical excellence.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="section-padding bg-slate-50 border-t border-gray-200">
          <div className="container-max text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-[5px] mb-4">Get In Touch</span>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 mb-4 leading-tight">Ready to Start <span className="text-primary-600">Your Healing Journey?</span></h2>
              <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">Book an appointment today or call us anytime. Our expert medical team and specialist doctors are here to help.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/book-appointment" className="btn-accent gap-2 text-base px-8 py-4 font-bold rounded-[5px]">
                  <FiCalendar /> Book Appointment
                </Link>
                <a href={`tel:${siteData.contact.phone}`} className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-primary-700 font-semibold rounded-[5px] transition-all duration-200 text-base shadow-sm">
                  <FiPhone /> Call Now
                </a>
                <Link to="/doctors" className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-[5px] transition-all duration-200 text-base shadow-sm">
                  Meet Our Doctors <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
