import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFeaturedDoctors } from '../../hooks/useDoctors'
import { FiFacebook, FiTwitter, FiInstagram, FiArrowRight, FiUser } from 'react-icons/fi'

export default function FeaturedDoctors() {
  const { doctors: featured, loading } = useFeaturedDoctors()

  return (
    <section className="py-16 md:py-24 border-t border-primary-100/40" style={{ backgroundColor: '#f0f8ff' }}>
      <div className="container-max px-4 md:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Meet The Team
          </span>
          <h2 className="font-heading font-black text-navy-800 text-3xl md:text-4xl mb-4">
            Our <span className="text-primary-600">Expert Doctors</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Our team of experienced and compassionate doctors are dedicated to providing the highest standard of care for every patient.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-card">
                <div className="w-full h-72 bg-primary-100" />
                <div className="p-5">
                  <div className="w-40 h-5 bg-gray-200 rounded mb-2" />
                  <div className="w-28 h-4 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No featured doctors configured.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featured.slice(0, 3).map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1.5"
              >
                {/* Image area with hover social overlay */}
                <div className="relative overflow-hidden">
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-[280px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-[280px] bg-primary-100 flex items-center justify-center">
                      <FiUser className="w-16 h-16 text-primary-300" />
                    </div>
                  )}
                  {/* Dark overlay + social icons on hover */}
                  <div className="absolute inset-0 bg-primary-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {doc.facebook && (
                      <a href={doc.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-colors shadow-md"
                        onClick={e => e.stopPropagation()}
                      >
                        <FiFacebook className="w-4 h-4" />
                      </a>
                    )}
                    {doc.twitter && (
                      <a href={doc.twitter} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-colors shadow-md"
                        onClick={e => e.stopPropagation()}
                      >
                        <FiTwitter className="w-4 h-4" />
                      </a>
                    )}
                    {doc.instagram && (
                      <a href={doc.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-colors shadow-md"
                        onClick={e => e.stopPropagation()}
                      >
                        <FiInstagram className="w-4 h-4" />
                      </a>
                    )}
                    {/* If no socials, show profile link */}
                    {!doc.facebook && !doc.twitter && !doc.instagram && (
                      <Link to={`/doctors/${doc.slug || doc.id}`}
                        className="inline-flex items-center gap-2 bg-white text-primary-700 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary-600 hover:text-white transition-colors shadow-md"
                        onClick={e => e.stopPropagation()}
                      >
                        View Profile <FiArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                  {/* Specialty badge top */}
                  <div className="absolute top-3 right-3 bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
                    {doc.specialty || 'Specialist'}
                  </div>
                </div>

                {/* Info bar */}
                <div className="p-5 border-t-4 border-primary-600">
                  <Link to={`/doctors/${doc.slug || doc.id}`}>
                    <h3 className="font-heading font-black text-navy-800 text-lg mb-1 hover:text-primary-600 transition-colors">
                      {doc.name}
                    </h3>
                  </Link>
                  {(doc.qualification || doc.experience) && (
                    <p className="text-gray-400 text-xs mb-3">
                      {[doc.qualification, doc.experience ? `${doc.experience}+ yrs exp.` : ''].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <Link to={`/doctors/${doc.slug || doc.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors group/link"
                  >
                    View Profile
                    <FiArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/doctors" className="btn-secondary">
            View All Doctors <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
