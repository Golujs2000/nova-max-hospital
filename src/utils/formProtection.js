// ─────────────────────────────────────────────────────────────
// utils/formProtection.js
// Client-side spam and abuse protection for public forms.
//
//   checkHoneypot        – rejects bots that fill hidden fields
//   checkRateLimit       – prevents multiple submits within 1 min
//   setRateLimit         – records submission timestamp
//   validateEmail        – basic RFC-style email check
//   validatePhone        – Indian 10-digit mobile number check
//   sanitizeInput        – strips HTML tags and trims input
//   validateAppointmentForm – full appointment form validation
//   validateContactForm     – full contact form validation
// ─────────────────────────────────────────────────────────────

const RATE_LIMIT_KEY = 'mh_form_'
const RATE_LIMIT_MS = 60 * 1000 // 1 minute cooldown between submissions

// Returns true if the honeypot field is empty (human), false if filled (bot)
export function checkHoneypot(honeypotValue) {
  return !honeypotValue || honeypotValue.trim() === ''
}

// Returns true if enough time has passed since the last submission for this form
// formId should be a unique string per form (e.g. 'appointment', 'contact')
export function checkRateLimit(formId) {
  const key = RATE_LIMIT_KEY + formId
  const last = localStorage.getItem(key)
  return !(last && Date.now() - parseInt(last) < RATE_LIMIT_MS)
}

// Save the current timestamp to localStorage as the last submission time
export function setRateLimit(formId) {
  localStorage.setItem(RATE_LIMIT_KEY + formId, Date.now().toString())
}

// Standard email format check
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Indian mobile number: starts with 6-9, exactly 10 digits
export function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''))
}

// Strip < > characters (basic XSS prevention) and limit length to 1000 chars
export function sanitizeInput(str) {
  return str.replace(/[<>]/g, '').trim().slice(0, 1000)
}

// Validate the appointment booking form fields
// Returns { valid: boolean, errors: { field: message } }
export function validateAppointmentForm(data) {
  const errors = {}
  if (!data.name || data.name.trim().length < 2) errors.name = 'Please enter a valid name'
  if (!validateEmail(data.email)) errors.email = 'Please enter a valid email'
  if (!validatePhone(data.phone)) errors.phone = 'Please enter a valid 10-digit mobile number'
  if (!data.department) errors.department = 'Please select a department'
  if (!data.date) errors.date = 'Please select an appointment date'
  return { valid: Object.keys(errors).length === 0, errors }
}

// Validate the contact form fields
// Returns { valid: boolean, errors: { field: message } }
export function validateContactForm(data) {
  const errors = {}
  if (!data.name || data.name.trim().length < 2) errors.name = 'Please enter your name'
  if (!validateEmail(data.email)) errors.email = 'Please enter a valid email'
  if (!data.subject || data.subject.trim().length < 3) errors.subject = 'Please enter a subject'
  if (!data.message || data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters'
  return { valid: Object.keys(errors).length === 0, errors }
}
