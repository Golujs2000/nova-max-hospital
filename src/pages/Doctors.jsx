// ─────────────────────────────────────────────────────────────
// pages/Doctors.jsx
// Doctor listing page with live search by name and filter
// by specialty. Fetches all doctors from Firestore via useDoctors.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useDoctors } from '../hooks/useDoctors'
import { useCategories } from '../hooks/useCategories'
import DoctorCard from '../components/DoctorCard'
import { siteData } from '../data/siteData'

export default function Doctors() {
  const [specialty, setSpecialty] = useState('')
  const [search, setSearch] = useState('')
  const { doctors, loading } = useDoctors()
  const { categories: departments } = useCategories()

  const filtered = doctors.filter((d) => {
    const matchesSearch = !search || d.name.toLowerCase().includes(search.toLowerCase())
    const matchesSpecialty = !specialty ||
      d.specialty === specialty ||
      (Array.isArray(d.specialties) && d.specialties.includes(specialty))
    return matchesSearch && matchesSpecialty
  })

  return (
    <>
      <SEO
        title="Our Doctors"
        description="Meet our team of expert doctors and specialists at Sarvada Hospito Care, Patna. View doctor profiles, specialties, and book appointments online."
        keywords={['doctors in Patna', 'best doctors Patna', 'specialists Patna Bihar', 'hospital doctors Patna']}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Doctors at Sarvada Hospito Care',
          description: 'Meet our team of expert doctors and specialists at Sarvada Hospito Care, Patna, Bihar.',
          url: `${siteData.url}/doctors`,
        }}
      />

      {/* Hero */}
      <section className="page-hero text-center border-b border-navy-800">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Expert Doctors</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Highly qualified surgeons and medical professionals committed to your health and recovery.
          </p>
        </motion.div>
      </section>

      <section className="bg-white border-b border-gray-150 py-5">
        <div className="container-max px-4 md:px-8 flex flex-col sm:flex-row gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor name…"
              className="input-field pl-11 w-full"
            />
          </div>

          {/* Specialty filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="input-field w-full sm:w-auto sm:min-w-[200px]"
            >
              <option value="">All Departments</option>
              {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>

          {(search || specialty) && (
            <button
              onClick={() => { setSearch(''); setSpecialty('') }}
              className="text-sm text-primary-600 font-medium hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Doctors grid */}
      <section className="section-padding bg-section-gradient">
        <div className="container-max">
          {loading ? (
            <div className="flex flex-col gap-4 w-full">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No doctors found matching your search.</p>
              <button onClick={() => { setSearch(''); setSpecialty('') }} className="btn-primary mt-4">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              {filtered.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.06 }}
                >
                  <DoctorCard doc={doc} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
