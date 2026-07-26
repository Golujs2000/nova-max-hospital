import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiClock, FiAward, FiCheckCircle, FiChevronDown, FiActivity, FiShield } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { siteData } from '../data/siteData'
import SEO from '../components/SEO'

export default function DrSinhaBoringCanalRoad() {
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  // Exact coordinates extracted from Google Maps iframe URL
  const latitude = '25.6214119'
  const longitude = '85.1237975'

  const drSinhaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    'name': 'Dr. M. K. Sinha',
    'image': `${siteData.url}/Infrastructure/dr-mk-sinha-portrait.png`,
    'medicalSpecialty': 'Urology',
    'telephone': '+917250520694',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '101, East Boring Canal Road, Near Rajapur Pul, Buddha Colony, Land Mark - HDFC Bank & Siddartha Inn.',
      'addressLocality': 'Patna',
      'addressRegion': 'Bihar',
      'postalCode': '800001',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': latitude,
      'longitude': longitude
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '10:00',
        'closes': '19:00'
      }
    ],
    'url': `${siteData.url}/dr-m-k-sinha-boring-canal-road`,
    'memberOf': {
      '@type': 'Hospital',
      'name': 'Nova Max Hospital',
      'url': siteData.url
    }
  }

  const services = [
    {
      title: 'Kidney Stone Treatment (URS / PCNL / RIRS)',
      description: 'Advanced laser lithotripsy and flexible ureteroscopy (RIRS) for keyhole, pain-free stone removal with fast recovery.',
    },
    {
      title: 'Prostate TURP Surgery',
      description: 'Minimally invasive transurethral resection of the prostate (TURP) for enlarged prostate (BPH) relief and urine flow correction.',
    },
    {
      title: 'Male Sexual Health & Sexology',
      description: 'Confidential treatments for erectile dysfunction, premature ejaculation, low sperm count, and comprehensive psychosexual counseling.',
    },
    {
      title: 'Laparoscopic Surgery',
      description: 'Keyhole operations for gallstones (cholecystectomy), hernia repair, and appendectomy ensuring smaller scars and rapid healing.',
    },
    {
      title: 'UTI & Bladder Disorders',
      description: 'Advanced clinical diagnostics and personalized medical therapies for recurring urinary tract infections and bladder stones.',
    },
    {
      title: 'Phimosis & Hydrocele Surgery',
      description: 'Daycare sutureless circumcision and hydrocele sac removal with immediate discharge and aesthetic surgical results.',
    }
  ]

  const faqs = [
    {
      q: 'Where is Dr. M. K. Sinha’s clinic located in Boring Canal Road?',
      a: 'The clinic is located at 101, East Boring Canal Road, Near Rajapur Pul, Buddha Colony, Patna, Bihar 800001. The landmarks are the HDFC Bank and Siddhartha Inn.',
    },
    {
      q: 'What are the OPD consulting timings for Dr. M. K. Sinha?',
      a: 'Dr. M. K. Sinha is available for consultations from Monday to Saturday, between 10:00 AM and 7:00 PM. It is highly recommended to book an appointment in advance.',
    },
    {
      q: 'What urological surgeries does Dr. Sinha specialize in?',
      a: 'He is a senior specialist in advanced urology. He specializes in laser kidney stone surgery (RIRS, PCNL, URS), prostate surgery (TURP), laparoscopic surgeries (gallstones, hernia), and male sexual health/sexology treatments.',
    },
    {
      q: 'How can I book an appointment with Dr. M. K. Sinha?',
      a: 'You can book an appointment by calling the clinic directly at 07250520694, chatting with us on WhatsApp at +91 93340 97925, or using our online booking form on the Nova Max Hospital portal.',
    },
    {
      q: 'Is there parking available at the Boring Canal Road clinic?',
      a: 'Yes, street parking and clinic-adjacent parking are available near Siddhartha Inn and HDFC Bank for visitors.',
    }
  ]

  return (
    <>
      <SEO
        title="Dr. M. K. Sinha | Best Urologist & Surgeon in Boring Canal Road, Patna"
        description="Consult senior urologist Dr. M. K. Sinha at East Boring Canal Road, Patna. Specializing in kidney stones (RIRS, PCNL), prostate TURP, laparoscopy, and male sexology."
        keywords={[
          'Dr M K Sinha urologist',
          'urologist in Boring Canal Road Patna',
          'best kidney stone doctor Patna',
          'Dr M K Sinha Patna',
          'urology clinic Boring Canal Road',
          'sexologist doctor Boring Canal Road Patna'
        ]}
        excludeHospitalSchema={true}
        jsonLd={drSinhaSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 px-4">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold text-emerald-400">
              <FiAward className="w-4 h-4" /> Senior Consultant Urologist & Surgeon
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Dr. M. K. Sinha
            </h1>
            <p className="text-xl text-gray-300 font-medium">
              Director of Nova Max Hospital | Ex-Sir J.J. Hospital, Mumbai
            </p>
            <p className="text-gray-400 leading-relaxed max-w-xl text-sm md:text-base">
              With over 30 years of medical experience, Dr. M. K. Sinha is Patna's premier specialist for advanced laser kidney stone removal (RIRS, PCNL), prostate correction (TURP), laparoscopic keyhole surgeries, and male sexual health concerns.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="tel:07250520694" className="btn-primary bg-emerald-500 hover:bg-emerald-600 border-none flex items-center gap-2 shadow-lg shadow-emerald-500/20 text-white font-bold">
                <FiPhone className="w-4 h-4" /> Call: 072505 20694
              </a>
              <Link to="/book-appointment" className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-full transition-all flex items-center justify-center shadow-lg hover:scale-105">
                Book Appointment
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
              <img 
                src="/Infrastructure/dr-mk-sinha-portrait.png" 
                alt="Dr. M. K. Sinha"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>
            {/* Stat Floating Badge */}
            <div className="absolute -bottom-6 right-8 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3">
              <div className="font-heading font-black text-3xl">30+</div>
              <div className="text-xs font-semibold leading-tight text-white/95">Years of<br />Clinical Practice</div>
            </div>
          </div>
        </div>
      </section>

      {/* NAP Consistent Card Section */}
      <section className="py-12 bg-slate-50 border-y border-slate-100 px-4">
        <div className="container-max">
          <div className="bg-white rounded-2xl border border-gray-150 p-6 md:p-8 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-heading font-bold text-2xl text-navy-800 flex items-center gap-2">
                <FiShield className="text-emerald-500" /> Clinic Address & Contact (NAP)
              </h2>
              <div className="space-y-3.5 text-gray-600 text-sm md:text-base">
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-800">Address: </strong>
                    101, East Boring Canal Road, Near Rajapur Pul, Buddha Colony, Landmark: HDFC Bank & Siddhartha Inn., Patna, Bihar 800001
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiPhone className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-800">Phone: </strong>
                    <a href="tel:07250520694" className="hover:text-primary-600 font-bold transition-colors">072505 20694</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiClock className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-800">OPD Timings: </strong>
                    Monday – Saturday: 10:00 AM – 7:00 PM (Sunday Closed)
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 justify-end">
              <a 
                href="tel:07250520694" 
                className="btn-primary flex items-center justify-center gap-2 py-3.5 px-6 font-bold"
              >
                <FiPhone className="w-5 h-5" /> Call Clinic Now
              </a>
              <a 
                href={`https://wa.me/${siteData.contact.whatsapp}?text=${encodeURIComponent("Hello Dr. M. K. Sinha, I want to book an appointment at your Boring Canal Road clinic.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl px-6 py-3.5 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-md shadow-emerald-500/10"
              >
                <FaWhatsapp className="w-5 h-5" /> WhatsApp Booking
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white px-4">
        <div className="container-max text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-navy-800 mb-4">
            Specialized Urology & Surgical Services
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Providing state-of-the-art diagnostic evaluations and treatment options for all major urological disorders at Boring Canal Road.
          </p>
        </div>

        <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-50 border border-slate-100 hover:border-primary-200 rounded-2xl p-6 transition-all hover:shadow-card hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <FiActivity className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-navy-800 text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map Embed and Details */}
      <section className="py-16 bg-slate-50 border-t border-slate-100 px-4">
        <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-heading font-black text-3xl text-navy-800">
              Visit Dr. M. K. Sinha's Clinic
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Our clinic at Boring Canal Road is centrally located in Patna, making it easily accessible from Buddha Colony, Rajapur, Kidwaipuri, and Bailey Road. Equipped with basic diagnostic tools, it serves as Dr. Sinha's primary private consultation hub for outpatient urological diagnostics and consultations.
            </p>
            <p className="text-gray-500 leading-relaxed">
              If surgical intervention is recommended (such as laser kidney stone surgery or laparoscopic repair for hernia), patients have the option of undergoing advanced procedures at the fully equipped, state-of-the-art <strong>Nova Max Hospital (Digha, Patna)</strong> under the direct supervision of Dr. Sinha.
            </p>
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
              <p className="text-sm font-semibold text-emerald-800">
                ⭐ Rated 5 Stars on Google Business Profile for Urology and Sexology Care in Patna.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-gray-150 p-3 shadow-card overflow-hidden h-[450px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2843.3392181017084!2d85.1237975!3d25.6214119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5836eb8b635d%3A0x686bd0f1c6353cd2!2sDr%20M%20K%20Sinha%2FUrologist!5e1!3m2!1sen!2sin!4v1784912137946!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Dr. M K Sinha Google Map Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding bg-white px-4">
        <div className="container-max max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-black text-3xl text-navy-800 mb-3">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Get answers to common queries regarding Dr. M. K. Sinha's clinical services, clinic visits, and surgery planning.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <div 
                  key={index}
                  className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-navy-800 hover:text-primary-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <FiChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-primary-600' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-slate-100 pt-4 bg-white">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 bg-navy-900 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-max relative z-10 max-w-2xl space-y-6">
          <h2 className="font-heading font-black text-3xl md:text-4xl">
            Book Your Consultation Today
          </h2>
          <p className="text-gray-300">
            Consult Patna's top urologist Dr. M. K. Sinha at Boring Canal Road. Get expert diagnosis and start your recovery path today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="tel:07250520694" className="btn-primary bg-emerald-500 hover:bg-emerald-600 border-none flex items-center justify-center gap-2 py-3.5 font-bold text-white">
              <FiPhone className="w-4 h-4" /> Call: 072505 20694
            </a>
            <Link to="/book-appointment" className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-7 py-3.5 rounded-full transition-all flex items-center justify-center shadow-lg hover:scale-105">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
