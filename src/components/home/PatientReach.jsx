import { motion } from 'framer-motion'
import { FiGlobe, FiMap, FiMapPin, FiAward } from 'react-icons/fi'
import { siteData } from '../../data/siteData'

const icons = [FiGlobe, FiMap, FiMapPin, FiAward]

export default function PatientReach() {
  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-primary-100/20 rounded-full blur-[110px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-100/20 rounded-full blur-[100px]" />
      </div>

      <div className="container-max relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <h2 className="font-heading font-black text-navy-800 text-4xl md:text-5xl leading-tight mt-2">
              Trusted Across <span className="text-primary-600">Borders &amp; Districts</span>
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
              {siteData.name} has become a premier healthcare destination. Patients from all 38 districts of Bihar, Deoghar (Jharkhand), and Siliguri (West Bengal) travel to our Patna hospital for comprehensive medical care at our <strong className="text-navy-800 font-bold">state-of-the-art facilities</strong>.
            </p>
          </motion.div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteData.reach.map(({ region, title, description, stat, highlight, color, light }, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-gray-100 hover:border-primary-100 rounded-[24px] p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Glowing Icon Wrapper */}
                  <div className={`w-12 h-12 rounded-xl ${light} flex items-center justify-center mb-5 border transition-all duration-300 group-hover:bg-gradient-to-br ${color} group-hover:text-white group-hover:border-transparent group-hover:shadow-md`}>
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" />
                  </div>

                  <span className="text-[10px] font-bold text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    {highlight}
                  </span>

                  <h3 className="font-heading font-black text-navy-800 text-xl mb-2 group-hover:text-primary-700 transition-colors">
                    {region}
                  </h3>

                  <p className="text-gray-500 text-xs leading-relaxed mb-6">
                    {description}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400">Coverage</span>
                  <span className="text-sm font-bold text-navy-800 group-hover:text-primary-600 transition-colors">
                    {stat}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>


      </div>
    </section>
  )
}
