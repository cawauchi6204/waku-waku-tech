"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document.documentElement.dataset.motion = reduced ? "reduced" : "full"

    let lenis: Lenis | null = null
    const onTick = (time: number) => lenis?.raf(time * 1000)
    if (!reduced) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true })
      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add(onTick)
      gsap.ticker.lagSmoothing(0)
    }

    // In-page anchor links go through Lenis for a consistent glide.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute("href")
      if (!id || id === "#") return
      const el = document.querySelector<HTMLElement>(id)
      if (!el) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 })
      else el.scrollIntoView()
    }
    document.addEventListener("click", onClick)

    const ctx = gsap.context(() => {
      // Header progress hairline
      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true },
      })

      if (reduced) return

      // Hero: text recedes as you scroll away
      gsap.to("[data-hero-copy]", {
        yPercent: -18,
        opacity: 0,
        scale: 0.94,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom 35%", scrub: true },
      })

      // Hero entrance
      gsap.from("[data-hero-line]", {
        yPercent: 110,
        opacity: 0,
        duration: 1.6,
        ease: "expo.out",
        stagger: 0.12,
        delay: 1.5,
      })
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 16,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.1,
        delay: 2.1,
      })

      // Statement: words light up with scroll
      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((block) => {
        gsap.fromTo(
          block.querySelectorAll("span"),
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: block.closest("section"), start: "top top", end: "bottom bottom", scrub: 0.6 },
          }
        )
      })

      // Values: each chapter fades in and out around its sticky moment
      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
        const items = chapter.querySelectorAll("[data-chapter-item]")
        const tl = gsap.timeline({
          scrollTrigger: { trigger: chapter, start: "top 70%", end: "bottom 30%", scrub: 0.8 },
        })
        tl.fromTo(items, { opacity: 0, y: 60 }, { opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: "power2.out" })
          .to(items, { opacity: 1, duration: 1.6 })
          .to(items, { opacity: 0, y: -50, stagger: 0.05, duration: 1, ease: "power2.in" })
      })

      // Manifesto: giant line slides across
      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((line, i) => {
        gsap.fromTo(
          line,
          { xPercent: i % 2 ? -45 : 5 },
          {
            xPercent: i % 2 ? 5 : -45,
            ease: "none",
            scrollTrigger: { trigger: "#manifesto", start: "top bottom", end: "bottom top", scrub: true },
          }
        )
      })

      // Generic reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        })
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)

    return () => {
      ctx.revert()
      document.removeEventListener("click", onClick)
      gsap.ticker.remove(onTick)
      lenis?.destroy()
    }
  }, [])

  return null
}
