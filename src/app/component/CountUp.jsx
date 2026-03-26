"use client"
import { useEffect, useRef, useState, useCallback } from 'react'

function AnimatedNumber({ value, suffix = '', duration = 2000 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    const start = performance.now()
    const end = value

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [value, duration])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animate()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Emergency Support' },
  { value: 500, suffix: '+', label: 'Parts in Stock' },
  { value: 1000, suffix: '+', label: 'Happy Clients' },
]

export default function StatsCounter() {
  return (
    <section className="py-20 px-6 bg-white/50 border-y border-slate-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center group"
            >
              <div className="relative inline-block mb-3">
                <p className="text-5xl md:text-6xl font-black text-[#5ba3b5] tracking-tighter transition-transform duration-300 group-hover:scale-110">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={500 + i * 200}
                  />
                </p>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-gradient-to-r from-[#5ba3b5] to-[#7ab8c7] opacity-60 group-hover:w-12 transition-all duration-300" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
