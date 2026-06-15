// ─────────────────────────────────────────────────────────────
// utils/helpers.js
// Shared utility functions used across the project.
//
//   formatDate / formatDateTime  – Firestore timestamp → string
//   slugify                      – text → URL-safe slug
//   truncate                     – clamp string to N chars
//   getStatusColor               – appointment status → Tailwind classes
//   getInitials                  – full name → 2-letter initials
//   generateBookingId            – unique MH-prefixed booking ref
//   compressImage                – resize + convert to WebP before upload
// ─────────────────────────────────────────────────────────────

import { format } from 'date-fns'

// Format a Firestore Timestamp or JS Date/string to a readable date string
// Handles both Firestore Timestamp objects (.toDate()) and plain date values
export function formatDate(timestamp, fmt = 'dd MMM yyyy') {
  if (!timestamp) return ''
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
  return format(date, fmt)
}

// Format with time component (e.g. "12 Jan 2025, 10:30 AM")
export function formatDateTime(timestamp) {
  return formatDate(timestamp, 'dd MMM yyyy, hh:mm a')
}

// Convert any string to a URL-safe slug (lowercase, hyphens, no special chars)
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')   // remove non-alphanumeric chars
    .replace(/\s+/g, '-')           // spaces → hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens
    .trim()
}

// Truncate a string to n characters and append ellipsis if needed
export function truncate(str, n = 120) {
  if (!str) return ''
  return str.length > n ? str.slice(0, n) + '…' : str
}

// Return Tailwind badge classes for an appointment status value
export function getStatusColor(status) {
  const map = {
    pending:   'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  }
  return map[status] || 'bg-gray-100 text-gray-800'
}

// Extract up to 2 initials from a full name (e.g. "Amit Anand" → "AA")
export function getInitials(name = '') {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Generate a short unique booking ID with "MH" prefix (e.g. "MH1K9Z4P2")
export function generateBookingId() {
  return 'MH' + Date.now().toString(36).toUpperCase()
}

/**
 * Compress an image File using the Canvas API.
 * - Resizes to maxWidth while maintaining aspect ratio
 * - Converts output to WebP for smaller file sizes
 * - Returns a new File object ready for Firebase Storage upload
 *
 * @param {File} file       - Input image file
 * @param {object} options
 * @param {number} options.maxWidth  - Max output width in px (default: 1920)
 * @param {number} options.quality   - WebP quality 0–1 (default: 0.82)
 * @returns {Promise<File>}
 */
export function compressImage(file, { maxWidth = 1920, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      // Scale down if wider than maxWidth, preserve aspect ratio
      let { width, height } = img
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      // Export as WebP blob then wrap in a File
      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error('Compression failed')); return }
          const outName = file.name.replace(/\.[^.]+$/, '') + '.webp'
          resolve(new File([blob], outName, { type: 'image/webp' }))
        },
        'image/webp',
        quality
      )
    }

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')) }
    img.src = url
  })
}
