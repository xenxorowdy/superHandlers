const CONTACT_EVENT_CATEGORY = 'Contact Interaction'

function sendGoogleEvent(action, payload) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  window.gtag('event', action, payload)
}

function sendOpenReplayEvent(action, payload) {
  if (typeof window === 'undefined') return
  const tracker = window.__OPENREPLAY_TRACKER
  tracker?.event?.(action, {
    ...payload,
    category: CONTACT_EVENT_CATEGORY,
  })
}

export function trackContactEngagement({ action, label, value } = {}) {
  if (!action) return

  const payload = {
    event_category: CONTACT_EVENT_CATEGORY,
  }

  if (label) payload.event_label = label
  if (typeof value !== 'undefined') payload.value = value

  sendGoogleEvent(action, payload)
  sendOpenReplayEvent(action, payload)
}

export function trackCallClick(label) {
  trackContactEngagement({ action: 'contact_call', label })
}

export function trackEmailClick(label) {
  trackContactEngagement({ action: 'contact_email', label })
}

export function trackFormSubmission(label) {
  trackContactEngagement({ action: 'contact_form_submitted', label })
}
