"use client"
import { useEffect, useRef } from 'react'

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('sr-visible')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('sr-visible')
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold, once])

  return (
    <div
      ref={ref}
      className={`sr-init sr-${animation} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

export function ScrollRevealGroup({
  children,
  className = '',
  animation = 'fade-up',
  stagger = 120,
  duration = 700,
  threshold = 0.1,
  once = true,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const items = container.querySelectorAll('.sr-item')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            item.style.transitionDelay = `${i * stagger}ms`
            item.style.transitionDuration = `${duration}ms`
            item.classList.add('sr-visible')
          })
          if (once) observer.unobserve(container)
        } else if (!once) {
          items.forEach((item) => {
            item.classList.remove('sr-visible')
          })
        }
      },
      { threshold }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [stagger, duration, threshold, once])

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className={`sr-item sr-init sr-${animation}`}>
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
