"use client"

import { useEffect, useState } from "react"

const formatTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date())

// Fixed corner readouts: current chapter, scroll depth and local time in Kawaguchi.
export default function Hud() {
  const [chapter, setChapter] = useState({ index: 0, name: "" })
  const [total, setTotal] = useState(0)
  const [depth, setDepth] = useState(0)
  const [time, setTime] = useState("")
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-hud]"))
    setTotal(sections.length)

    let frame = 0
    const update = () => {
      frame = 0
      const probe = window.innerHeight * 0.5
      let index = 0
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top <= probe) index = i
      })
      setChapter({ index, name: sections[index]?.dataset.hud ?? "" })
      const max = document.documentElement.scrollHeight - window.innerHeight
      setDepth(max > 0 ? Math.round((window.scrollY / max) * 100) : 0)
      setShown(window.scrollY > window.innerHeight * 0.6 && max - window.scrollY > window.innerHeight * 0.5)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    setTime(formatTime())
    const clock = window.setInterval(() => setTime(formatTime()), 1000)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
      window.clearInterval(clock)
    }
  }, [])

  return (
    <div className="hud" data-shown={shown} aria-hidden="true">
      <p className="hud-chapter">
        <span>{String(chapter.index + 1).padStart(2, "0")}</span>
        <i />
        <span>{String(total).padStart(2, "0")}</span>
        <b key={chapter.name}>{chapter.name}</b>
      </p>
      <p className="hud-meta">
        <span>{String(depth).padStart(3, "0")}%</span>
        <span>Kawaguchi, JP {time}</span>
      </p>
    </div>
  )
}
