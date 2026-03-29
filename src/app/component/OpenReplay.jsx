"use client"
import { useEffect } from 'react'

export default function OpenReplay() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let tracker
    const disableSecureMode =
      process.env.NEXT_PUBLIC_OPENREPLAY_DISABLE_SECURE_MODE === 'true' ||
      process.env.NODE_ENV !== 'production'

    import('@openreplay/tracker').then(({ default: Tracker }) => {
      tracker = new Tracker({
        projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY,
        ingestPoint: 'https://api.openreplay.com/ingest',
        capturePerformance: true,
        __DISABLE_SECURE_MODE: disableSecureMode,
      })
      tracker.start()
    })

    return () => {
      tracker?.stop()
    }
  }, [])

  return null
}
