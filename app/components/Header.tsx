"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              waku-waku-tech
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href="#services" className="text-base font-medium text-gray-500 hover:text-gray-900">
              サービス
            </Link>
            <Link href="#tech-stack" className="text-base font-medium text-gray-500 hover:text-gray-900">
              技術スタック
            </Link>
            <Link href="#case-studies" className="text-base font-medium text-gray-500 hover:text-gray-900">
              事例
            </Link>
            <Link href="#team" className="text-base font-medium text-gray-500 hover:text-gray-900">
              チーム
            </Link>
            <Link href="#contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
              お問い合わせ
            </Link>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#services"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              サービス
            </Link>
            <Link
              href="#tech-stack"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              技術スタック
            </Link>
            <Link
              href="#case-studies"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              事例
            </Link>
            <Link
              href="#team"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              チーム
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

