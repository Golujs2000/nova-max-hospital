// ─────────────────────────────────────────────────────────────
// App.jsx
// Root router configuration for Nova Max Hospital.
// Defines all public and admin routes.
//
// Route structure:
//   /                  → Public pages wrapped in PublicLayout
//   /admin/login       → Standalone login page (no layout)
//   /admin/*           → Protected admin pages wrapped in AdminLayout
//   *                  → 404 NotFound
// ─────────────────────────────────────────────────────────────

import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useVisitTracker } from './hooks/useVisitTracker'

// Layout & Route Guards
import PublicLayout from './components/PublicLayout'
import ProtectedRoute from './components/ProtectedRoute'

// ── Public Pages ─────────────────────────────────────────────
import Home from './pages/Home'
import About from './pages/About'
import Category from './pages/Category'
import Doctors from './pages/Doctors'
import DoctorProfile from './pages/DoctorProfile'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import ServiceDetail from './pages/ServiceDetail'
// import HospitalServices from './pages/HospitalServices'
import HospitalServiceDetail from './pages/HospitalServiceDetail'
import TreatmentDetail from './pages/TreatmentDetail'
import BookAppointment from './pages/BookAppointment'
import AppointmentSuccess from './pages/AppointmentSuccess'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import DataDeletion from './pages/DataDeletion'
import NotFound from './pages/NotFound'
import DrSinhaBoringCanalRoad from './pages/DrSinhaBoringCanalRoad'

// ── Admin Pages (Lazy Loaded to improve public bundle size & speed) ──
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminAppointments = lazy(() => import('./pages/admin/AdminAppointments'))
const AdminCalls = lazy(() => import('./pages/admin/AdminCalls'))
const AdminTraffic = lazy(() => import('./pages/admin/AdminTraffic'))
const AdminDoctors = lazy(() => import('./pages/admin/AdminDoctors'))
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'))
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'))
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'))
const AdminStaff = lazy(() => import('./pages/admin/AdminStaff'))
const AdminCategory = lazy(() => import('./pages/admin/AdminCategory'))
const AdminTreatments = lazy(() => import('./pages/admin/AdminTreatments'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))

// Inner component so useVisitTracker runs inside BrowserRouter context
function AppRoutes() {
  // Increments visit counter in Firestore once per session
  useVisitTracker()

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-600">Loading Nova Max Portal...</span>
        </div>
      </div>
    }>
      <Routes>
        {/* ── Public Routes (Navbar + Footer) ── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Replaced /services and /hospital-services with the 4 individual pages */}
          <Route path="/hospital-departments" element={<Category categoryName="Hospital Departments" title="Hospital Departments" description="Our clinical and hospital departments providing specialized medical care." />} />
          <Route path="/surgical-services" element={<Category categoryName="Surgical Services" title="Surgical Services" description="Advanced surgical treatments, laparoscopic surgery, and general surgical procedures." />} />
          <Route path="/critical-care" element={<Category categoryName="Critical & Emergency Care" title="Critical & Emergency Care" description="24/7 ICU, ICCU and emergency trauma care facilities managed by expert intensivists." />} />
          <Route path="/facilities-diagnostics" element={<Category categoryNames={["Patient Care Facilities", "Diagnostics"]} title="Facilities & Diagnostics" description="Comprehensive patient care facilities and state-of-the-art laboratory and imaging services." />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/services/:slug/treatment/:treatmentSlug" element={<TreatmentDetail />} />
          {/* <Route path="/hospital-services" element={<HospitalServices />} /> */}
          <Route path="/hospital-services/:slug" element={<HospitalServiceDetail />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:slug" element={<DoctorProfile />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/appointment-success" element={<AppointmentSuccess />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/dr-m-k-sinha-boring-canal-road" element={<DrSinhaBoringCanalRoad />} />
        </Route>

        {/* ── Admin Login (no sidebar layout) ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Protected Admin Routes (requires auth + staff role) ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />  {/* sidebar + header shell */}
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="calls" element={<AdminCalls />} />
          <Route path="traffic" element={<AdminTraffic />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="staff" element={<ProtectedRoute requireAdmin><AdminStaff /></ProtectedRoute>} />
          <Route path="hospital-departments" element={<AdminCategory categoryName="Hospital Departments" title="Hospital Departments" />} />
          <Route path="surgical-services" element={<AdminCategory categoryName="Surgical Services" title="Surgical Services" />} />
          <Route path="critical-care" element={<AdminCategory categoryName="Critical & Emergency Care" title="Critical & Emergency Care" />} />
          <Route path="patient-facilities" element={<AdminCategory categoryName="Patient Care Facilities" title="Patient Care Facilities" />} />
          <Route path="diagnostics" element={<AdminCategory categoryName="Diagnostics" title="Diagnostics" />} />
          <Route path="treatments" element={<AdminTreatments />} />
          <Route path="settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />
        </Route>

        {/* ── 404 Fallback ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
