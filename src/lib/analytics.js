const CONTACT_EVENT_CATEGORY = 'Contact Interaction'

function getWindow() {
  if (typeof window === 'undefined') return null
  return window
}

function sendGoogleEvent(action, payload) {
  const win = getWindow()
  if (typeof win?.gtag !== 'function') return
  win.gtag('event', action, payload)
}

function sendOpenReplayEvent(action, payload) {
  const win = getWindow()
  if (!win) return

  const tracker = win.__OPENREPLAY_TRACKER
  tracker?.event?.(action, {
    ...payload,
    category: CONTACT_EVENT_CATEGORY,
  })
}

export function trackContactEngagement({ action, label, value } = {}) {
  if (!action) return

  const payload = {
    event_category: CONTACT_EVENT_CATEGORY,
    ...(label ? { event_label: label } : {}),
    ...(typeof value !== 'undefined' ? { value } : {}),
  }

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
