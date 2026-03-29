"use client"
import { useEffect } from 'react'

export default function OpenReplay() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    import('@openreplay/tracker').then(({ default: Tracker }) => {
      const tracker = new Tracker({
        projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY,
        ingestPoint: "https://api.openreplay.com/ingest",
        capturePerformance: true,
        __DISABLE_SECURE_MODE: false,
      })
      tracker.start()
    })
  }, [])

  return null
}
