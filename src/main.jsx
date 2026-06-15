// ─────────────────────────────────────────────────────────────
// main.jsx
// React application entry point.
// Mounts the app with global providers in order:
//   HelmetProvider  – manages <head> tags / SEO per page
//   AuthProvider    – Firebase auth state + role context
//   App             – router and page tree
//   Toaster         – global toast notification system
// ─────────────────────────────────────────────────────────────

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* HelmetProvider enables per-page <title> and meta tag management */}
    <HelmetProvider>
      {/* AuthProvider makes user/role available throughout the app */}
      <AuthProvider>
        <App />

        {/* Global toast notifications — shown top-right */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#0060b0', secondary: '#fff' } },
          }}
        />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
)
