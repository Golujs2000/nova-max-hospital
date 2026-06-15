// ─────────────────────────────────────────────────────────────
// hooks/useDashboardStats.js
// Fetches all real dashboard statistics in parallel:
//   - Visit counts  : today / this month / this year
//   - Appointments  : today / this month / pending / total
//   - Support stats : unread messages, total doctors
//   - Chart data    : real per-day counts for last 30 days (appointments + visits)
//   - Monthly chart : real per-month appointment counts for last 12 months
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

// ── Date key helpers ──────────────────────────────────────────
function toDayKey(d)   { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}` }
function toMonthKey(d) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}` }
function toYearKey(d)  { return `${d.getFullYear()}` }
function pad(n)        { return String(n).padStart(2, '0') }

// Safely convert a Firestore Timestamp or string to a JS Date
function toDate(val) {
  if (!val) return null
  return val?.toDate ? val.toDate() : new Date(val)
}

export function useDashboardStats() {
  const [stats, setStats] = useState({
    // Visits
    todayVisits: 0,
    monthlyVisits: 0,
    yearlyVisits: 0,
    // Appointments
    todayAppointments: 0,
    monthlyAppointments: 0,
    pendingAppointments: 0,
    totalAppointments: 0,
    // Other
    unreadMessages: 0,
    totalDoctors: 0,
    totalDepartments: 0,
  })

  const [chartData, setChartData] = useState({
    // 30-day line chart (appointments + visits)
    daily: { labels: [], appointments: [], visits: [] },
    // 12-month bar chart (appointments only)
    monthly: { labels: [], appointments: [] },
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const now     = new Date()
        const todayKey   = toDayKey(now)
        const thisMonth  = toMonthKey(now)
        const thisYear   = toYearKey(now)

        // ── Build date arrays ─────────────────────────────────
        // Last 30 days (for daily chart)
        const last30Dates = Array.from({ length: 30 }, (_, i) => {
          const d = new Date(now)
          d.setDate(d.getDate() - (29 - i))
          return d
        })
        const last30Keys = last30Dates.map(toDayKey)

        // Last 12 months (for monthly chart)
        const last12Dates = Array.from({ length: 12 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1)
          return d
        })
        const last12Keys = last12Dates.map(toMonthKey)

        // ── Fetch base collections ────────────────────────────
        const [apptSnap, msgSnap, docSnap, hospSnap, surgSnap] = await Promise.all([
          getDocs(collection(db, 'appointments')),
          getDocs(collection(db, 'messages')),
          getDocs(collection(db, 'doctors')),
          getDocs(collection(db, 'hospitalDepartments')),
          getDocs(collection(db, 'surgicalServices')),
        ])

        const appointments = apptSnap.docs.map(d => ({ id: d.id, ...d.data() }))
        const messages     = msgSnap.docs.map(d => d.data())

        // ── Fetch visit stat docs ─────────────────────────────
        const [todayVisitDoc, monthlyVisitDoc, yearlyVisitDoc] = await Promise.all([
          getDoc(doc(db, 'siteStats', `daily_${todayKey}`)),
          getDoc(doc(db, 'siteStats', `monthly_${thisMonth}`)),
          getDoc(doc(db, 'siteStats', `yearly_${thisYear}`)),
        ])

        // Daily visit docs for chart (30 reads)
        const dailyVisitDocs = await Promise.all(
          last30Keys.map(k => getDoc(doc(db, 'siteStats', `daily_${k}`)))
        )

        // ── Appointment grouping ──────────────────────────────
        // Index by createdAt day key
        const apptByDay   = Object.fromEntries(last30Keys.map(k => [k, 0]))
        const apptByMonth = Object.fromEntries(last12Keys.map(k => [k, 0]))

        appointments.forEach(a => {
          const d = toDate(a.createdAt)
          if (!d) return
          const dk = toDayKey(d)
          const mk = toMonthKey(d)
          if (apptByDay[dk]   !== undefined) apptByDay[dk]++
          if (apptByMonth[mk] !== undefined) apptByMonth[mk]++
        })

        // Today / this month counts (use appointment `date` field if present,
        // otherwise fall back to createdAt)
        const todayAppts = appointments.filter(a => {
          // `date` field is the scheduled date (string like "2025-01-14")
          if (a.date) {
            const dStr = typeof a.date === 'string' ? a.date.slice(0, 10) : toDayKey(toDate(a.date))
            return dStr === todayKey
          }
          const d = toDate(a.createdAt)
          return d ? toDayKey(d) === todayKey : false
        })

        const monthlyAppts = appointments.filter(a => {
          const d = toDate(a.createdAt)
          return d ? toMonthKey(d) === thisMonth : false
        })

        // ── Visit counts ──────────────────────────────────────
        const count = docSnap => (docSnap.exists() ? (docSnap.data().count ?? 0) : 0)

        // ── Set state ─────────────────────────────────────────
        setStats({
          todayVisits:          count(todayVisitDoc),
          monthlyVisits:        count(monthlyVisitDoc),
          yearlyVisits:         count(yearlyVisitDoc),
          todayAppointments:    todayAppts.length,
          monthlyAppointments:  monthlyAppts.length,
          pendingAppointments:  appointments.filter(a => a.status === 'pending').length,
          totalAppointments:    appointments.length,
          unreadMessages:       messages.filter(m => !m.read).length,
          totalDoctors:         docSnap.size,
          totalDepartments:    hospSnap.size + surgSnap.size,
        })

        setChartData({
          daily: {
            labels:       last30Dates.map(d => d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })),
            appointments: last30Keys.map(k => apptByDay[k]),
            visits:       dailyVisitDocs.map(d => count(d)),
          },
          monthly: {
            labels:       last12Dates.map(d => d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })),
            appointments: last12Keys.map(k => apptByMonth[k]),
          },
        })
      } catch (err) {
        console.error('Dashboard stats error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return { stats, chartData, loading }
}
