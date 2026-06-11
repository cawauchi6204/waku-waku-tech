"use client"

import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const navItems = [
  { href: "#services", label: "できること" },
  { href: "#products", label: "開発実績" },
  { href: "#process", label: "進め方" },
  { href: "#company", label: "会社情報" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#17120d]/10 bg-[#f6f2ea]/94 backdrop-blur"
          : "border-transparent bg-[#f6f2ea]/72 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#mission" className="group flex items-center gap-3" aria-label="WAKU WAKU TECH home">
          <span className="flex size-9 items-center justify-center rounded-full border border-[#17120d]/20 bg-[#17120d] text-lg font-black text-[#f8f3ea] transition-transform duration-300 group-hover:-rotate-6">
            W
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-black tracking-tight text-[#17120d] sm:text-lg">
              WAKU WAKU TECH
            </span>
            <span className="mt-1 hidden text-[11px] font-bold uppercase tracking-[0.3em] text-[#2d75a5] sm:block">
              launch the fun
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-[#17120d]/72 transition-colors hover:text-[#e85b24]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-[#17120d]/20 bg-[#17120d] px-5 py-2.5 text-sm font-black text-[#f8f3ea] transition hover:-translate-y-0.5 hover:border-[#e85b24] hover:bg-[#e85b24] md:inline-flex"
          >
            相談する
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#17120d]/15 bg-[#f8f3ea] text-[#17120d] md:hidden"
            aria-label="メニューを開閉"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#17120d]/10 bg-[#f6f2ea] px-4 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full px-3 py-3 text-sm font-black text-[#17120d] transition hover:bg-white/70 hover:text-[#e85b24]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#17120d] px-4 py-3 text-sm font-black text-[#f8f3ea]"
            >
              相談する
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
