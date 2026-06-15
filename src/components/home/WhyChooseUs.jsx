import { motion } from 'framer-motion'
import { FiHeart, FiUsers, FiClock, FiCreditCard, FiShield, FiThumbsUp, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const features = [
  { icon: FiHeart,     title: 'Comprehensive Care',    desc: 'Holistic treatment covering all medical specialties under one roof.' },
  { icon: FiUsers,     title: 'Qualified Doctors',     desc: 'Expert physicians and surgeons with proven track records.' },
  { icon: FiClock,     title: '24/7 Emergency',        desc: 'Round-the-clock ICU, emergency trauma and OPD services.' },
  { icon: FiCreditCard,title: 'Affordable Prices',     desc: 'World-class healthcare accessible at reasonable costs.' },
  { icon: FiShield,    title: 'Professional Staff',    desc: 'Trained nurses and dedicated care team always on duty.' },
  { icon: FiThumbsUp,  title: '5000+ Happy Patients',  desc: 'Trusted by thousands of patients across Bihar & beyond.' },
]

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-white">

      {/* Decorative top-right circle */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(25,118,210,0.07) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(41,182,246,0.06) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      <div className="container-max px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">

          {/* Left — Overlapping Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12 relative"
          >
            {/* Blue circle background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-primary-100/70 -z-10" />

            {/* Main large image */}
            <div className="relative">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nova-max-hospital.firebasestorage.app/o/gallery%2F1781112398923_SARVADA%20HOSPITO%20CARE01.webp?alt=media&token=b9f5adf4-1e65-43e0-88e5-db1eb9408a4a"
                alt="Sarvada Hospito Care Facility"
                className="w-full h-[420px] object-cover rounded-3xl shadow-card-hover border-4 border-white"
              />

              {/* Overlapping second image — bottom right */}
              <div className="absolute -bottom-8 -right-6 w-44 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-card-hover z-10">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/nova-max-hospital.firebasestorage.app/o/gallery%2F1781122820016_neemkroli%20baba01.webp?alt=media&token=65aea2b7-ec30-42b6-869a-149501c650f6"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ISO Badge */}
              <div className="absolute -top-5 -left-5 bg-primary-600 text-white rounded-2xl px-5 py-4 shadow-btn text-center z-10">
                <p className="font-heading font-black text-xl leading-none">ISO</p>
                <p className="text-[10px] font-bold tracking-widest text-primary-200 mt-0.5">9001:2020</p>
              </div>

              {/* Floating experience badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white rounded-2xl px-4 py-3 shadow-card-hover border border-primary-100 z-10"
              >
                <p className="font-heading font-black text-2xl text-primary-600 leading-none">2018</p>
                <p className="text-[10px] text-gray-500 font-medium">Est. Year</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-7/12 pb-10 lg:pb-0"
          >
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="font-heading font-black text-navy-800 text-3xl md:text-4xl mb-4 text-left">
              What Makes Us <span className="text-primary-600">Different</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base mb-10 max-w-xl text-left leading-relaxed">
              In this section you can learn more about the qualities that make our medical center stand out. We pride ourselves on delivering comprehensive care, maintaining a highly qualified team, and providing affordable prices.
            </p>

            {/* Features 2x3 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-4 group p-4 rounded-xl hover:bg-primary-50 transition-colors duration-300"
                  >
                    {/* Square icon card */}
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-100 border border-primary-200 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-navy-800 text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-8">
              <Link to="/about" className="btn-primary">
                Learn More About Us <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
