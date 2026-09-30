"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

// Custom cursor + magnetic targets. Only for fine pointers with motion allowed.
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return

    document.documentElement.dataset.cursor = "custom"
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" })

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      el.dataset.visible = "true"
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      const labelled = target.closest<HTMLElement>("[data-cursor-label]")
      const interactive = target.closest("a, button, [role='button'], input, textarea")
      el.dataset.state = labelled ? "label" : interactive ? "link" : "idle"
      if (label.current) label.current.textContent = labelled?.dataset.cursorLabel ?? ""
    }
    const onLeave = () => (el.dataset.visible = "false")
    const onDown = () => (el.dataset.pressed = "true")
    const onUp = () => (el.dataset.pressed = "false")

    window.addEventListener("pointermove", onMove)
    document.addEventListener("pointerover", onOver)
    document.documentElement.addEventListener("pointerleave", onLeave)
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)

    // Magnetic elements drift toward the pointer while hovered.
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"))
    const cleanups = magnets.map((m) => {
      const strength = Number(m.dataset.magnetic || 0.35)
      const mx = gsap.quickTo(m, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" })
      const my = gsap.quickTo(m, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" })
      const move = (e: PointerEvent) => {
        const r = m.getBoundingClientRect()
        mx((e.clientX - (r.left + r.width / 2)) * strength)
        my((e.clientY - (r.top + r.height / 2)) * strength)
      }
      const leave = () => {
        mx(0)
        my(0)
      }
      m.addEventListener("pointermove", move)
      m.addEventListener("pointerleave", leave)
      return () => {
        m.removeEventListener("pointermove", move)
        m.removeEventListener("pointerleave", leave)
      }
    })

    return () => {
      delete document.documentElement.dataset.cursor
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <div ref={root} className="cursor" data-state="idle" data-visible="false" aria-hidden="true">
      <span className="cursor-ring">
        <span ref={label} className="cursor-label" />
      </span>
      <span className="cursor-dot" />
    </div>
  )
}
