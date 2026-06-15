const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { onCall, HttpsError } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const axios = require('axios')

admin.initializeApp()

// WhatsApp config — set via Firebase Console → Functions → Edit → Environment variables
// or deploy with: firebase deploy --only functions (after setting vars in .env in functions/)
const WHATSAPP_TOKEN    = { value: () => process.env.WHATSAPP_TOKEN    || '' }
const WHATSAPP_PHONE_ID = { value: () => process.env.WHATSAPP_PHONE_ID || '' }
const HOSPITAL_WHATSAPP = { value: () => process.env.HOSPITAL_WHATSAPP || '' }

/**
 * Callable function to create a staff user via Admin SDK.
 * Only callable by authenticated admins (checked via Firestore role).
 */
exports.createStaffUser = onCall({ enforceAppCheck: false, invoker: 'public' }, async (request) => {
  // Verify caller is authenticated
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in.')
  }

  // Verify caller is an admin
  const callerDoc = await admin.firestore().collection('staff').doc(request.auth.uid).get()
  if (!callerDoc.exists || callerDoc.data().role !== 'admin') {
    throw new HttpsError('permission-denied', 'Only admins can create staff accounts.')
  }

  const { email, password, name, role } = request.data
  if (!email || !password || !name) {
    throw new HttpsError('invalid-argument', 'email, password, and name are required.')
  }

  // Create the Firebase Auth user (does NOT affect caller's session)
  const userRecord = await admin.auth().createUser({ email, password, displayName: name })

  // Write the staff Firestore doc
  await admin.firestore().collection('staff').doc(userRecord.uid).set({
    name,
    email,
    role: role || 'staff',
    uid: userRecord.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  return { uid: userRecord.uid }
})

/**
 * Update a staff member's email and/or password via Admin SDK.
 * Only callable by authenticated admins.
 */
exports.updateStaffCredentials = onCall({ enforceAppCheck: false, invoker: 'public' }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in.')
  }

  const callerDoc = await admin.firestore().collection('staff').doc(request.auth.uid).get()
  if (!callerDoc.exists || callerDoc.data().role !== 'admin') {
    throw new HttpsError('permission-denied', 'Only admins can update staff credentials.')
  }

  const { uid, email, password } = request.data
  if (!uid) throw new HttpsError('invalid-argument', 'uid is required.')
  if (!email && !password) throw new HttpsError('invalid-argument', 'Provide at least email or password.')

  const updates = {}
  if (email)    updates.email = email
  if (password) updates.password = password

  await admin.auth().updateUser(uid, updates)

  // Keep Firestore email in sync if email changed
  if (email) {
    await admin.firestore().collection('staff').doc(uid).update({
      email,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
  }

  return { success: true }
})

/**
 * Triggered when a new appointment document is created in Firestore.
 * Sends WhatsApp notifications to both the hospital and the patient.
 */
exports.onNewAppointment = onDocumentCreated(
  { document: 'appointments/{appointmentId}' },
  async (event) => {
    const snap = event.data
    if (!snap) return

    const data = snap.data()
    const { name, phone, department, date, bookingId, email } = data

    const token = WHATSAPP_TOKEN.value()
    const phoneNumberId = WHATSAPP_PHONE_ID.value()
    const hospitalNumber = HOSPITAL_WHATSAPP.value()
    const apiUrl = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    const formattedDate = date
      ? new Date(date).toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Date TBD'

    // ── Message to HOSPITAL ─────────────────────────────────────────────
    const hospitalMessage = {
      messaging_product: 'whatsapp',
      to: hospitalNumber.replace(/^\+/, ''),
      type: 'text',
      text: {
        body:
          `🏥 *New Appointment Request*\n\n` +
          `📋 Booking ID: *${bookingId || snap.id}*\n` +
          `👤 Patient: *${name}*\n` +
          `📞 Phone: ${phone}\n` +
          `📧 Email: ${email}\n` +
          `🏥 Department: *${department}*\n` +
          `📅 Date: ${formattedDate}\n\n` +
          `Please confirm or call the patient within 30 minutes.`,
      },
    }

    // ── Message to PATIENT ──────────────────────────────────────────────
    const cleanPatientPhone = phone.replace(/\D/g, '')
    const patientPhone = cleanPatientPhone.startsWith('91')
      ? cleanPatientPhone
      : `91${cleanPatientPhone}`

    const patientMessage = {
      messaging_product: 'whatsapp',
      to: patientPhone,
      type: 'text',
      text: {
        body:
          `✅ *Appointment Request Received!*\n\n` +
          `Dear *${name}*,\n\n` +
          `Your appointment request at *Madhav Hospital* has been received.\n\n` +
          `📋 Booking ID: *${bookingId || snap.id}*\n` +
          `🏥 Department: *${department}*\n` +
          `📅 Preferred Date: ${formattedDate}\n\n` +
          `Our team will call you within *30 minutes* to confirm the appointment time.\n\n` +
          `For emergencies, call: *+91 98765 00000*\n\n` +
          `Thank you for choosing Madhav Hospital! 🙏`,
      },
    }

    // Send both messages in parallel
    try {
      await Promise.allSettled([
        axios.post(apiUrl, hospitalMessage, { headers }),
        axios.post(apiUrl, patientMessage, { headers }),
      ])
      console.log(`WhatsApp notifications sent for booking ${bookingId || snap.id}`)
    } catch (error) {
      console.error('WhatsApp notification error:', error.response?.data || error.message)
    }
  }
)

/**
 * Triggered when a new contact message is created.
 * Notifies the hospital via WhatsApp.
 */
exports.onNewContactMessage = onDocumentCreated(
  { document: 'messages/{messageId}' },
  async (event) => {
    const snap = event.data
    if (!snap) return

    const { name, email, subject, message } = snap.data()
    const token = WHATSAPP_TOKEN.value()
    const phoneNumberId = WHATSAPP_PHONE_ID.value()
    const hospitalNumber = HOSPITAL_WHATSAPP.value()

    const body = {
      messaging_product: 'whatsapp',
      to: hospitalNumber.replace(/^\+/, ''),
      type: 'text',
      text: {
        body:
          `📩 *New Contact Message*\n\n` +
          `👤 From: *${name}*\n` +
          `📧 Email: ${email}\n` +
          `📌 Subject: ${subject}\n\n` +
          `💬 Message:\n${message.slice(0, 500)}${message.length > 500 ? '…' : ''}`,
      },
    }

    try {
      await axios.post(
        `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(`Contact message notification sent for message ${snap.id}`)
    } catch (error) {
      console.error('WhatsApp contact notification error:', error.response?.data || error.message)
    }
  }
)
