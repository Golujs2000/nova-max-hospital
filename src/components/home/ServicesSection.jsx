import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiActivity, FiArrowRight } from 'react-icons/fi'
import { useCategories } from '../../hooks/useCategories'
import { siteSpecialties } from '../../data/siteData'

const TABS = ['All', 'Hospital Departments', 'Surgical Services']

export default function ServicesSection() {
  const { categories: dbDepartments, loading: dbLoading } = useCategories()
  const [activeTab, setActiveTab] = useState('All')

  const departments = dbDepartments.length > 0 ? dbDepartments : siteSpecialties
  const loading = dbDepartments.length > 0 ? false : dbLoading

  const filtered = departments.filter(d => {
    if (activeTab === 'All') return d.category === 'Surgical Services' || d.category === 'Hospital Departments'
    return d.category === activeTab
  })

  return (
    <section className="py-16 md:py-24 border-y border-primary-100/40" style={{ backgroundColor: '#e8f4fd' }}>
      <div className="container-max px-4 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Our Specialties
          </span>
          <h2 className="font-heading font-black text-navy-900 text-3xl md:text-4xl mb-4">
            Our Healthcare <span className="text-primary-600">Services</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Comprehensive care across multiple medical disciplines. Each department is equipped with advanced infrastructure and led by experienced specialists.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                activeTab === tab
                  ? 'bg-primary-600 text-white border-primary-600 shadow-btn'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400 hover:text-primary-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-card animate-pulse">
                <div className="w-14 h-14 rounded-xl bg-primary-100 mb-4" />
                <div className="w-32 h-4 bg-gray-200 rounded mb-2" />
                <div className="w-full h-3 bg-gray-100 rounded mb-1" />
                <div className="w-3/4 h-3 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filtered.map((spec, i) => {
                const isUrl = spec.icon && (spec.icon.startsWith('http') || spec.icon.startsWith('/') || spec.icon.includes('.'))
                return (
                  <motion.div
                    key={spec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <Link
                      to={`/services/${spec.slug || spec.id}`}
                      className="flex flex-col bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-primary-100/60 hover:border-primary-300 hover:-translate-y-1.5 group h-full"
                    >
                      {/* Square icon */}
                      <div className="w-14 h-14 mb-4 flex items-center justify-center bg-primary-50 rounded-xl group-hover:bg-primary-600 transition-all duration-300 border border-primary-100 group-hover:border-primary-600 group-hover:shadow-btn">
                        {spec.icon ? (
                          isUrl ? (
                            <img
                              src={spec.icon}
                              alt={spec.name}
                              className="w-8 h-8 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                            />
                          ) : (
                            <span className="text-2xl">{spec.icon}</span>
                          )
                        ) : (
                          <FiActivity className="w-7 h-7 text-primary-500 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-navy-800 text-base mb-2 group-hover:text-primary-600 transition-colors">
                        {spec.name}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 flex-1 mb-3">
                        {spec.description || 'Expert medical treatment and comprehensive care for a rapid recovery.'}
                      </p>

                      {/* Treatments count badge */}
                      {Array.isArray(spec.treatments) && spec.treatments.length > 0 && (
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                          <span className="text-[10px] text-gray-400 font-medium">
                            {spec.treatments.length} Treatment{spec.treatments.length !== 1 ? 's' : ''}
                          </span>
                          <span className="text-xs text-primary-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Explore <FiArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/hospital-departments" className="btn-primary">
            View All Departments <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
