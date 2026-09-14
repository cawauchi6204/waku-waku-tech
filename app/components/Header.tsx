"use client"

import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const navItems = [
  { href: "#products", label: "つくったもの", number: "01" },
  { href: "#services", label: "できること", number: "02" },
  { href: "#process", label: "進め方", number: "03" },
  { href: "#company", label: "私たちについて", number: "04" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia("(min-width: 960px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    desktop.addEventListener("change", closeOnDesktop)
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      desktop.removeEventListener("change", closeOnDesktop)
    }
  }, [isMenuOpen])

  return (
    <header className="site-header">
      <div className="header-inner page-width">
        <Link
          href="#mission"
          className="brand"
          aria-label="WAKU WAKU TECH ホーム"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="brand-symbol" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="brand-name">
            waku waku<span>TECH</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="#contact" className="header-contact">
          相談する <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="モバイルナビゲーション"
        hidden={!isMenuOpen}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="micro">{item.number}</span>
            {item.label}
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        ))}
        <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
          <span className="micro">05</span>相談する
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  )
}
