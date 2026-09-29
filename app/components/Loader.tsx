"use client"

import { useEffect, useState } from "react"

export default function Loader() {
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true)
      return
    }
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1100)
      setN(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(step)
      else setTimeout(() => setDone(true), 250)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="loader" data-done={done} aria-hidden="true">
      <div className="loader-inner">
        <span className="loader-name">WAKU WAKU TECH</span>
        <span className="loader-count">{String(n).padStart(3, "0")}</span>
      </div>
      <span className="loader-bar" style={{ transform: `scaleX(${n / 100})` }} />
    </div>
  )
}
