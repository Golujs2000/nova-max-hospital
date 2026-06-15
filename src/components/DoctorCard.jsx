import { Link } from 'react-router-dom'
import { FiClock, FiCalendar, FiAward, FiChevronRight } from 'react-icons/fi'
import { getInitials } from '../utils/helpers'

const DAYS_SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const DAYS_FULL  = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const isObgyn = (doc) =>
  /gynaec|gynec|obstet|women|maternity/i.test(doc.specialty || '') ||
  (Array.isArray(doc.specialties) && doc.specialties.some(s => /gynaec|gynec|obstet|women|maternity/i.test(s)))

export default function DoctorCard({ doc, accent }) {
  const resolvedAccent = accent ?? (isObgyn(doc) ? 'rose' : 'primary')
  const isOb = resolvedAccent === 'rose'

  return (
    <div className="bg-white rounded-[5px] border border-gray-100 shadow-sm hover:shadow-md overflow-hidden flex flex-col md:flex-row group hover:-translate-y-1 transition-all duration-300 p-4 md:p-6 gap-4 md:gap-8 w-full">

      {/* Left Column — Portrait & Buttons */}
      <div className="w-full md:w-[240px] shrink-0 flex flex-col gap-4">
        <div className="w-full aspect-[4/3] md:aspect-[4/5] bg-slate-50 overflow-hidden rounded-[5px] border border-gray-100 relative flex items-center justify-center shrink-0">
          {doc.image ? (
            <img
              src={doc.image}
              alt={doc.name}
              loading="lazy"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center py-10">
              <div className={`w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center shadow-md`}>
                <span className="font-bold text-white text-3xl">{getInitials(doc.name)}</span>
              </div>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full">
          <Link
            to={`/book-appointment?doctor=${encodeURIComponent(doc.name)}&dept=${encodeURIComponent(doc.specialty)}`}
            className="w-full text-center py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-[5px] text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <FiCalendar className="w-3.5 h-3.5" /> Book Appointment
          </Link>
          <Link
            to={`/doctors/${doc.slug || doc.id}`}
            className="w-full text-center py-3 border border-primary-600 text-primary-600 hover:bg-primary-50 font-bold rounded-[5px] text-xs transition-all flex items-center justify-center gap-1.5"
          >
            View Profile <FiChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Right Column — Info */}
      <div className="flex-1 flex flex-col min-w-0 w-full justify-between py-1">
        <div>
          {/* Header line with Specialty tag */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider ${isOb ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-cyan-50 border border-cyan-200 text-cyan-700'}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOb ? 'bg-rose-500' : 'bg-cyan-500'}`} />
                {doc.specialty}
              </span>
              {doc.experience && (
                <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  <FiAward className="w-3.5 h-3.5" />
                  {doc.experience}+ Yrs Exp
                </span>
              )}
            </div>
            {doc.consultationFee && (
              <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-[5px]">
                Fee: ₹{doc.consultationFee}
              </span>
            )}
          </div>

          <h2 className="font-heading font-black text-navy-800 text-2xl md:text-3xl leading-tight mb-2 tracking-tight group-hover:text-primary-600 transition-colors">
            {doc.name}
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            {doc.bio
              ? doc.bio.length > 180
                ? doc.bio.slice(0, 177) + '...'
                : doc.bio
              : `${doc.experience ? doc.experience + '+ years' : ''} ${doc.experience ? 'of expertise in ' : 'Expert in '}${doc.specialty}. View profile for full qualifications and experience details.`.trim()
            }
          </p>

          {/* Quick Info Highlights */}
          <div className="bg-slate-50 border border-gray-100 rounded-[5px] p-4 mb-4">
            <ul className="text-xs font-bold text-navy-800 space-y-2.5">
              {doc.qualification && (
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  <span>Qualification: {doc.qualification.split(',')[0]}</span>
                </li>
              )}
              {doc.currentPosition && (
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  <span>Current: {doc.currentPosition.split(/,\s*(.+)/)[0]}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Footer row — Timings */}
        {doc.availableTime && (
          <div className="pt-4 border-t border-gray-100 w-full">
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <FiClock className="w-4 h-4 text-primary-500 shrink-0" />
              <div>
                <p className="font-semibold text-navy-800">OPD Timings</p>
                <p className="text-gray-500 mt-0.5">
                  {doc.availableTime} 
                  {Array.isArray(doc.availableDays) && doc.availableDays.length > 0 && (
                    <span className="text-primary-500 font-bold ml-1.5">
                      ({DAYS_SHORT.map((s, i) => doc.availableDays.includes(DAYS_FULL[i]) ? s : null).filter(Boolean).join(', ')})
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
