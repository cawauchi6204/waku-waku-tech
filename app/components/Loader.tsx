"use client"

import { useEffect, useState } from "react"

const letters = "WAKU WAKU".split("")

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
    let timer = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1300)
      setN(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(step)
      else timer = window.setTimeout(() => setDone(true), 320)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div className="loader" data-done={done} aria-hidden="true">
      <div className="loader-word">
        {letters.map((ch, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </div>
      <div className="loader-foot">
        <span>Assembling a small universe</span>
        <span className="loader-count">{String(n).padStart(3, "0")}</span>
      </div>
      <span className="loader-bar" style={{ transform: `scaleX(${n / 100})` }} />
    </div>
  )
}
