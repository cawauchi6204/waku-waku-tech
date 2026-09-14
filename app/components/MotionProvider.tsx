"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"

const MotionContext = createContext({ paused: false, toggle: () => {} })

export function useMotion() {
  return useContext(MotionContext)
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setPaused(preference.matches)
    updatePreference()
    preference.addEventListener("change", updatePreference)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    root.current?.querySelectorAll("[data-reveal]").forEach((element) => {
      if (
        element.getBoundingClientRect().top > window.innerHeight &&
        !preference.matches
      ) {
        element.setAttribute("data-reveal", "pending")
        observer.observe(element)
      }
    })
    return () => {
      preference.removeEventListener("change", updatePreference)
      observer.disconnect()
    }
  }, [])

  return (
    <MotionContext.Provider
      value={{ paused, toggle: () => setPaused((value) => !value) }}
    >
      <div
        ref={root}
        className="site-shell"
        data-motion={paused ? "paused" : "playing"}
      >
        {children}
      </div>
    </MotionContext.Provider>
  )
}
