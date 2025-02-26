"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect-dark py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white neon-text hover-scale">WAKU WAKU TECH</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#mission" className="text-sm font-medium text-white hover:text-blue-300 transition-colors duration-300">
              ミッション
            </Link>
            <Link href="#services" className="text-sm font-medium text-white hover:text-blue-300 transition-colors duration-300">
              サービス
            </Link>
            <Link href="#products" className="text-sm font-medium text-white hover:text-blue-300 transition-colors duration-300">
              製品
            </Link>
            <Link href="#vision" className="text-sm font-medium text-white hover:text-blue-300 transition-colors duration-300">
              ビジョン
            </Link>
            <Link href="#company" className="text-sm font-medium text-white hover:text-blue-300 transition-colors duration-300">
              会社情報
            </Link>
          </nav>
          <div className="flex items-center">
            <Link
              href="#contact"
              className="hidden md:inline-flex items-center px-5 py-2 text-sm font-medium rounded-full text-white bg-transparent border border-pink-500 hover:bg-pink-500/20 transition-all duration-300 neon-box-pink"
            >
              お問い合わせ
            </Link>
            <div className="md:hidden ml-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-effect-dark rounded-b-lg">
            <Link
              href="#mission"
              className="block px-3 py-2 text-base font-medium text-white hover:text-blue-300 hover:bg-blue-900/30 rounded-md transition-colors duration-300"
            >
              ミッション
            </Link>
            <Link
              href="#services"
              className="block px-3 py-2 text-base font-medium text-white hover:text-blue-300 hover:bg-blue-900/30 rounded-md transition-colors duration-300"
            >
              サービス
            </Link>
            <Link
              href="#products"
              className="block px-3 py-2 text-base font-medium text-white hover:text-blue-300 hover:bg-blue-900/30 rounded-md transition-colors duration-300"
            >
              製品
            </Link>
            <Link
              href="#vision"
              className="block px-3 py-2 text-base font-medium text-white hover:text-blue-300 hover:bg-blue-900/30 rounded-md transition-colors duration-300"
            >
              ビジョン
            </Link>
            <Link
              href="#company"
              className="block px-3 py-2 text-base font-medium text-white hover:text-blue-300 hover:bg-blue-900/30 rounded-md transition-colors duration-300"
            >
              会社情報
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 text-base font-medium text-white hover:text-blue-300 hover:bg-blue-900/30 rounded-md transition-colors duration-300"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

