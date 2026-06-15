import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiCalendar, FiClock, FiMail, FiUsers,
  FiTrendingUp, FiRefreshCw, FiEye, FiBarChart2, FiActivity,
} from 'react-icons/fi'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, BarElement,
  LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import { useDashboardStats } from '../../hooks/useDashboardStats'
import { getRecentAppointments } from '../../services/appointments'
import { formatDate, getStatusColor } from '../../utils/helpers'

ChartJS.register(
  CategoryScale, LinearScale, PointElement, BarElement,
  LineElement, Title, Tooltip, Legend, Filler,
)

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.35 } }),
}

// ── Stat card component ───────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, iconBg, border, loading, i }) {
  if (loading) {
    return (
      <div className="card p-5 animate-pulse">
        <div className="h-3 bg-gray-100 rounded w-2/3 mb-4" />
        <div className="h-8 bg-gray-100 rounded w-1/3" />
      </div>
    )
  }
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className={`card p-5 border ${border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
          <p className="text-3xl font-bold text-navy-800 mt-1.5">{value ?? 0}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  )
}

// ── Chart options factory ─────────────────────────────────────────────────────
function lineOptions(title) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 11 }, usePointStyle: true, boxWidth: 8 } },
      title: { display: !!title, text: title, font: { size: 13, weight: '600' } },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 }, maxTicksLimit: 10 } },
      y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { precision: 0, font: { size: 10 } } },
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
  }
}

function barOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { precision: 0, font: { size: 10 } } },
    },
  }
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { stats, chartData, loading } = useDashboardStats()
  const [recentAppts, setRecentAppts]   = useState([])
  const [apptLoading, setApptLoading]   = useState(true)
  const [chartView, setChartView]       = useState('30d') // '30d' | '12m'

  useEffect(() => {
    getRecentAppointments(6)
      .then(setRecentAppts)
      .catch(console.error)
      .finally(() => setApptLoading(false))
  }, [])

  // ── Visit stat cards ──────────────────────────────────────────
  const VISIT_CARDS = [
    { label: 'Today Visits',   value: stats.todayVisits,   icon: FiEye,        iconBg: 'bg-teal-50 text-teal-600',   border: 'border-teal-100' },
    { label: 'Monthly Visits', value: stats.monthlyVisits, icon: FiTrendingUp, iconBg: 'bg-cyan-50 text-cyan-600',   border: 'border-cyan-100' },
    { label: 'Yearly Visits',  value: stats.yearlyVisits,  icon: FiBarChart2,  iconBg: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' },
  ]

  // ── Appointment stat cards ────────────────────────────────────
  const APPT_CARDS = [
    { label: 'Today Appointments',   value: stats.todayAppointments,   icon: FiCalendar, iconBg: 'bg-blue-50 text-blue-600',   border: 'border-blue-100' },
    { label: 'Monthly Appointments', value: stats.monthlyAppointments, icon: FiUsers,    iconBg: 'bg-violet-50 text-violet-600', border: 'border-violet-100' },
    { label: 'Pending Appointments', value: stats.pendingAppointments, icon: FiClock,    iconBg: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
  ]

  // ── Chart datasets ────────────────────────────────────────────
  const dailyChartData = {
    labels: chartData.daily.labels,
    datasets: [
      {
        label: 'Appointments',
        data: chartData.daily.appointments,
        borderColor: '#0060b0',
        backgroundColor: 'rgba(0,96,176,0.09)',
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: '#0060b0',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Visits',
        data: chartData.daily.visits,
        borderColor: '#0891b2',
        backgroundColor: 'rgba(8,145,178,0.09)',
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: '#0891b2',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const monthlyChartData = {
    labels: chartData.monthly.labels,
    datasets: [
      {
        label: 'Appointments',
        data: chartData.monthly.appointments,
        backgroundColor: 'rgba(0,96,176,0.75)',
        hoverBackgroundColor: '#0060b0',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
        >
          <FiRefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* ── Visit Stats ── */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <FiEye size={13} /> Site Visits
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {VISIT_CARDS.map((card, i) => (
            <StatCard key={card.label} {...card} loading={loading} i={i} />
          ))}
        </div>
      </div>

      {/* ── Appointment Stats ── */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <FiCalendar size={13} /> Appointments
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {APPT_CARDS.map((card, i) => (
            <StatCard key={card.label} {...card} loading={loading} i={i + 3} />
          ))}
        </div>
      </div>

      {/* ── Charts ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        {/* Chart header + toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-primary-600" size={20} />
            <h2 className="font-semibold text-navy-800 text-lg">
              {chartView === '30d' ? 'Last 30 Days — Appointments & Visits' : 'Last 12 Months — Appointments'}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChartView('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                chartView === '30d'
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-primary-400'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setChartView('12m')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                chartView === '12m'
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-primary-400'
              }`}
            >
              12 Months
            </button>
          </div>
        </div>

        <div className="h-72">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <svg className="animate-spin h-7 w-7 text-primary-400" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          ) : chartView === '30d' ? (
            <Line options={lineOptions()} data={dailyChartData} />
          ) : (
            <Bar options={barOptions()} data={monthlyChartData} />
          )}
        </div>
      </motion.div>

      {/* ── Support Stats Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total Appointments"
          value={stats.totalAppointments}
          icon={FiCalendar}
          iconBg="bg-blue-50 text-blue-600"
          border="border-blue-100"
          loading={loading}
          i={6}
        />
        <StatCard
          label="Unread Messages"
          value={stats.unreadMessages}
          icon={FiMail}
          iconBg="bg-red-50 text-red-600"
          border="border-red-100"
          loading={loading}
          i={7}
        />
        <StatCard
          label="Total Doctors"
          value={stats.totalDoctors}
          icon={FiUsers}
          iconBg="bg-green-50 text-green-600"
          border="border-green-100"
          loading={loading}
          i={8}
        />
        <StatCard
          label="Total Departments"
          value={stats.totalDepartments}
          icon={FiActivity}
          iconBg="bg-rose-50 text-rose-600"
          border="border-rose-100"
          loading={loading}
          i={9}
        />
      </div>

      {/* ── Recent Appointments ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="card p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <FiCalendar className="text-primary-600" size={20} />
          <h2 className="font-semibold text-navy-800 text-lg">Recent Appointments</h2>
        </div>

        {apptLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recentAppts.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <FiCalendar size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No appointments yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Booking ID', 'Patient', 'Department', 'Date', 'Status'].map(h => (
                    <th key={h} className="pb-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentAppts.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 font-mono text-xs text-gray-400">
                      {appt.bookingId || appt.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="py-3 font-medium text-gray-800">{appt.name}</td>
                    <td className="py-3 text-gray-500">{appt.department || '—'}</td>
                    <td className="py-3 text-gray-500 text-xs">
                      {appt.date || formatDate(appt.createdAt)}
                    </td>
                    <td className="py-3">
                      <span className={`badge text-xs ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

    </div>
  )
}
