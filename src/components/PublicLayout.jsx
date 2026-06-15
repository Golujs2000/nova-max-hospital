// ─────────────────────────────────────────────────────────────
// components/PublicLayout.jsx
// Shell layout for all public-facing pages.
// Renders Navbar at the top, the matched child route via
// <Outlet />, and Footer at the bottom.
// The flex-col + flex-1 ensures the footer always sticks
// to the bottom even on short pages.
// ─────────────────────────────────────────────────────────────

import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingButtons from './FloatingButtons'
import ScrollToTop from './ScrollToTop'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />

      {/* flex-1 makes the main area grow to fill available height */}
      <main className="flex-1">
        <Outlet /> {/* matched child route renders here */}
      </main>

      <Footer />

      {/* Floating WhatsApp + scroll-to-top */}
      <FloatingButtons />
    </div>
  )
}
