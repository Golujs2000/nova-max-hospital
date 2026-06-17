import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import {
  FiUser, FiPhone, FiMail, FiMapPin, FiMessageSquare,
  FiActivity, FiClock, FiCheckCircle, FiCalendar, FiAlertCircle, FiChevronDown
} from 'react-icons/fi'
import { createAppointment } from '../../services/appointments'
import { checkHoneypot, checkRateLimit, setRateLimit, sanitizeInput } from '../../utils/formProtection'
import { siteData } from '../../data/siteData'
import { generateBookingId } from '../../utils/helpers'
import { useCategories } from '../../hooks/useCategories'
import { useDoctors } from '../../hooks/useDoctors'

const TIME_SLOTS = [
  { label: '9:00 AM',  period: 'morning' },
  { label: '10:00 AM', period: 'morning' },
  { label: '11:00 AM', period: 'morning' },
  { label: '12:00 PM', period: 'afternoon' },
  { label: '2:00 PM',  period: 'afternoon' },
  { label: '3:00 PM',  period: 'afternoon' },
  { label: '4:00 PM',  period: 'afternoon' },
]

const PERIOD_LABELS = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' }

const SEX_OPTIONS = ['Male', 'Female', 'Other']

const getDefaultDate = () => {
  const d = new Date()
  if (d.getDay() === 0) {
    d.setDate(d.getDate() + 1)
  }
  return d
}

const initialState = {
  name: '', phone: '', email: '', age: '', sex: '',
  address: '', department: '', doctorId: '', doctorName: '', date: getDefaultDate(),
  timeSlot: '', mode: 'Offline', message: '', _hp: '',
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
        {label}{required && <span className="text-primary-500 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inp = (err) =>
  `w-full px-4 py-2.5 rounded-xl border-2 text-sm font-medium text-gray-800 bg-white outline-none transition-all placeholder:text-gray-300 placeholder:font-normal
  ${err
    ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
    : 'border-gray-100 hover:border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
  }`

const isObgynDept = (dept = '') => /gynaec|gynec|obstet|women|maternity/i.test(dept)

export default function AppointmentForm() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { categories: departments } = useCategories()
  const { doctors } = useDoctors()
  const departmentList = departments.length > 0
    ? departments.map((s) => s.name)
    : siteData.departments

  const set = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleChange = (e) => set(e.target.name, e.target.value)

  const validate = () => {
    const e = {}
    if (!form.name.trim())                            e.name       = 'Name is required'
    if (!form.phone.trim())                           e.phone      = 'Phone is required'
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit number'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email   = 'Enter a valid email'
    if (!form.age)                                    e.age        = 'Age is required'
    if (!form.sex)                                    e.sex        = 'Please select'
    if (!form.department)                             e.department = 'Select a department'
    if (!form.doctorId)                               e.doctorId   = 'Select a doctor'
    if (!form.date)                                   e.date       = 'Pick a date'
    if (!form.timeSlot)                               e.timeSlot   = 'Pick a time slot'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const generateWhatsAppLink = (formData, bookingId) => {
    const formattedDate = formData.date 
      ? new Date(formData.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) 
      : ''
    
    const text = `*NOVA MAX HOSPITAL - APPOINTMENT BOOKING*
----------------------------------------
*Booking ID:* ${bookingId}
*Patient Name:* ${formData.name.trim()}
*Age:* ${formData.age}
*Sex:* ${formData.sex}
*Mobile:* ${formData.phone.trim()}
*Department:* ${formData.department}
*Doctor:* ${formData.doctorName || 'Any Specialist'}
*Date:* ${formattedDate}
*Time Slot:* ${formData.timeSlot}
*Mode:* ${formData.mode}
${formData.address.trim() ? `*Address:* ${formData.address.trim()}` : ''}
${formData.message.trim() ? `*Symptoms/Message:* ${formData.message.trim()}` : ''}

Please confirm my appointment slot. Thank you!`

    const whatsappNumber = siteData.contact.whatsapp || '919334097925'
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!checkHoneypot(form._hp)) return
    if (!checkRateLimit('appointment')) { toast.error('Please wait before submitting again.'); return }
    if (!validate()) { toast.error('Please fill all required fields.'); return }

    setLoading(true)
    try {
      const bookingId = generateBookingId()
      await createAppointment({
        bookingId,
        name:       sanitizeInput(form.name),
        phone:      form.phone.trim(),
        email:      form.email.trim(),
        age:        form.age,
        sex:        form.sex,
        address:    sanitizeInput(form.address),
        department: form.department,
        doctorId:   form.doctorId,
        doctorName: form.doctorName,
        date:       form.date?.toISOString(),
        timeSlot:   form.timeSlot,
        mode:       form.mode,
        message:    sanitizeInput(form.message),
      })
      setRateLimit('appointment')
      
      const whatsappUrl = generateWhatsAppLink(form, bookingId)
      
      toast.success('Appointment booked!')
      navigate('/appointment-success', {
        state: { 
          bookingId, 
          name: form.name, 
          department: form.department, 
          doctorId: form.doctorId, 
          doctorName: form.doctorName, 
          date: form.date?.toISOString(), 
          timeSlot: form.timeSlot, 
          mode: form.mode,
          whatsappUrl
        },
      })
      setForm(initialState)
    } catch (err) {
      console.error(err)
      toast.error('Failed to book. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const obgyn = isObgynDept(form.department)

  const isSlotPassed = (slotLabel) => {
    if (!form.date) return false
    const selectedDate = new Date(form.date)
    const today = new Date()
    const isToday = 
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    if (!isToday) return false

    const match = slotLabel.match(/^(\d+):(\d+)\s*(AM|PM)$/i)
    if (!match) return false

    let [_, hours, minutes, ampm] = match
    hours = parseInt(hours, 10)
    minutes = parseInt(minutes, 10)
    if (ampm.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12
    } else if (ampm.toUpperCase() === 'AM' && hours === 12) {
      hours = 0
    }
    const currentHours = today.getHours()
    const currentMinutes = today.getMinutes()
    if (hours < currentHours) return true
    if (hours === currentHours && minutes <= currentMinutes) return true
    return false
  }

  const filteredTimeSlots = TIME_SLOTS.filter((s) => !isSlotPassed(s.label))

  const grouped = filteredTimeSlots.reduce((acc, s) => {
    acc[s.period] = acc[s.period] || []
    acc[s.period].push(s.label)
    return acc
  }, {})

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type="text" name="_hp" value={form._hp} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-card">

        {/* ── LEFT PANEL: Patient Details ──────────────────────────── */}
        <div className="lg:col-span-3 bg-white p-4 sm:p-6 md:p-8 space-y-5">
          <div className="pb-4 border-b border-gray-100">
            <h3 className="font-heading font-bold text-navy-800 text-xl">Patient Information</h3>
            <p className="text-gray-400 text-sm mt-0.5">Fields marked <span className="text-primary-500 font-bold">*</span> are required</p>
          </div>

          {/* Name row */}
          <div className="grid grid-cols-1 gap-4">
            <Field label="Full Name" required error={errors.name}>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Patient's full name"
                  className={`${inp(errors.name)} pl-10`} />
              </div>
            </Field>
          </div>

          {/* Age + Sex row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Age" required error={errors.age}>
              <input name="age" value={form.age} onChange={handleChange}
                placeholder="e.g. 32"
                type="number" min="1" max="120"
                className={inp(errors.age)} />
            </Field>

            <Field label="Sex" required error={errors.sex}>
              <div className="flex gap-2">
                {SEX_OPTIONS.map((s) => (
                  <button
                    key={s} type="button"
                    onClick={() => set('sex', s)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                      form.sex === s
                        ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-primary-300 hover:text-primary-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
          </div>


          {/* Phone */}
          <Field label="Mobile Number" required error={errors.phone}>
            <div className="relative">
              <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="10-digit mobile number"
                inputMode="numeric" maxLength={10}
                className={`${inp(errors.phone)} pl-10`} />
            </div>
          </Field>

          {/* Email optional */}
          <Field label="Email Address (Optional)" error={errors.email}>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com"
                className={`${inp(errors.email)} pl-10`} />
            </div>
          </Field>

          {/* Address */}
          <Field label="Address" error={errors.address}>
            <div className="relative">
              <FiMapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-300" />
              <textarea name="address" value={form.address} onChange={handleChange}
                rows={2} placeholder="Village / Town / City"
                className={`${inp(errors.address)} pl-10 resize-none`} />
            </div>
          </Field>

          {/* Department */}
          <Field label="Department" required error={errors.department}>
            <div className="relative">
              <FiActivity className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 z-10" />
              <select name="department" value={form.department} onChange={handleChange}
                className={`${inp(errors.department)} pl-10 appearance-none cursor-pointer`}>
                <option value="">Select department</option>
                {departmentList.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </Field>

          {/* Doctor Selector */}
          <Field label="Select Doctor" required error={errors.doctorId}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              {doctors.length === 0 ? (
                <div className="text-xs text-gray-400 py-1 sm:col-span-2">Loading doctors...</div>
              ) : (
                doctors.map((doc) => {
                  const isSelected = form.doctorId === doc.id
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => {
                        set('doctorId', doc.id)
                        set('doctorName', doc.name)
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50/50 ring-2 ring-primary-100'
                          : 'border-gray-100 bg-white hover:border-primary-200'
                      }`}
                    >
                      {doc.image ? (
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                          <FiUser className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className={`text-sm font-bold truncate ${isSelected ? 'text-primary-800' : 'text-gray-800'}`}>
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{doc.specialty}</p>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </Field>

          {/* Message */}
          <Field label="Message / Symptoms (Optional)" error={null}>
            <div className="relative">
              <FiMessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-300" />
              <textarea name="message" value={form.message} onChange={handleChange}
                rows={2} placeholder="Describe symptoms or special requirements..."
                className={`${inp(false)} pl-10 resize-none`} />
            </div>
          </Field>
        </div>

        {/* ── RIGHT PANEL: Calendar + Time Slots ───────────────────── */}
        <div className="lg:col-span-2 bg-primary-50 border-t border-primary-100 lg:border-t-0 lg:border-l lg:border-primary-100 p-4 sm:p-6 md:p-7 flex flex-col gap-6">

          {/* Calendar */}
          <div>
            <div className="bg-amber-100/50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-2.5 rounded-lg flex items-start gap-2 mb-4">
              <FiAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Please book your appointment at least <strong>48 hours</strong> in advance.</p>
            </div>
            <p className="text-primary-700 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <FiCalendar className="w-3.5 h-3.5" /> Select Date
              {errors.date && <span className="text-red-500 normal-case font-medium tracking-normal">- {errors.date}</span>}
            </p>
            <div className="rounded-2xl overflow-hidden booking-calendar overflow-x-auto">
              <DatePicker
                selected={form.date}
                onChange={(d) => {
                  set('date', d)
                  set('timeSlot', '') // Reset timeslot when date changes
                }}
                minDate={new Date()}
                filterDate={(date) => date.getDay() !== 0}
                inline
                calendarClassName="booking-cal"
              />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <p className="text-primary-700 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <FiClock className="w-3.5 h-3.5" /> Select Time Slot
              {errors.timeSlot && <span className="text-red-500 normal-case font-medium tracking-normal">- {errors.timeSlot}</span>}
            </p>
            <div className="space-y-3">
              {Object.keys(grouped).length === 0 ? (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200/50 p-3 rounded-xl font-medium flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                  No slots available for today. Please select a future date.
                </p>
              ) : (
                Object.entries(grouped).map(([period, slots]) => (
                  <div key={period}>
                    <p className="text-primary-400 text-xs mb-2">{PERIOD_LABELS[period]}</p>
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot} type="button"
                          onClick={() => set('timeSlot', slot)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                            form.timeSlot === slot
                              ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-105'
                              : 'bg-white text-gray-600 border-primary-200 hover:bg-primary-100 hover:text-primary-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-auto w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-bold text-sm disabled:opacity-60 transition-all shadow-md active:scale-95 ${
              obgyn ? 'bg-rose-500 hover:bg-rose-600' : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Booking...</>
            ) : (
              <><FiCheckCircle className="w-5 h-5 text-white" /> Confirm Appointment</>
            )}
          </button>

          {/* Quick info */}
          <p className="text-gray-500 text-xs font-medium text-center -mt-3">
            Confirmation call within 30 mins · Call Us: {siteData.contact.phone}
          </p>
        </div>
      </div>
    </form>
  )
}
