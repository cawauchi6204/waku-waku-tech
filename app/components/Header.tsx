"use client"

import Roll from "./Roll"
import Sound from "./Sound"
import { useEffect, useRef, useState } from "react"

const nav = [
  { href: "#philosophy", label: "Philosophy", jp: "考え方" },
  { href: "#values", label: "Values", jp: "大切にしていること" },
  { href: "#manifesto", label: "Mission", jp: "ミッション" },
  { href: "#company", label: "Company", jp: "会社概要" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.documentElement.dataset.menu = open ? "open" : "closed"
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const desktop = window.matchMedia("(min-width: 901px)")
    const onDesktop = () => desktop.matches && setOpen(false)
    document.addEventListener("keydown", onKey)
    desktop.addEventListener("change", onDesktop)
    return () => {
      document.removeEventListener("keydown", onKey)
      desktop.removeEventListener("change", onDesktop)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="header" data-open={open}>
      <div className="header-inner">
        <a href="#top" className="wordmark" aria-label="WAKU WAKU TECH トップへ" onClick={close}>
          <span className="wordmark-dot" aria-hidden="true" />
          WAKU WAKU TECH
        </a>
        <nav className="header-nav" aria-label="メインナビゲーション">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              <Roll>{item.label}</Roll>
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <Sound />
          <a href="#contact" className="header-cta" data-magnetic="0.3">
            <Roll>Contact</Roll>
          </a>
        </div>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
        </button>
      </div>
      <span className="header-progress" data-progress aria-hidden="true" />

      <nav id="mobile-menu" className="mobile-menu" aria-label="モバイルナビゲーション" hidden={!open}>
        <ol>
          {nav.map((item, i) => (
            <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
              <a href={item.href} onClick={close}>
                <span className="mobile-menu-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="mobile-menu-label">{item.label}</span>
                <span className="mobile-menu-jp">{item.jp}</span>
              </a>
            </li>
          ))}
        </ol>
        <a className="mobile-menu-mail" href="mailto:info@waku-waku-tech.com" onClick={close}>
          info@waku-waku-tech.com
        </a>
      </nav>
    </header>
  )
}
