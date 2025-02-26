"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">CIVIQ</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#mission" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              ミッション
            </Link>
            <Link href="#services" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              サービス
            </Link>
            <Link href="#products" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              製品
            </Link>
            <Link href="#vision" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              ビジョン
            </Link>
            <Link href="#company" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              会社情報
            </Link>
          </nav>
          <div className="flex items-center">
            <Link
              href="#contact"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              お問い合わせ
            </Link>
            <div className="md:hidden ml-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#mission"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              ミッション
            </Link>
            <Link
              href="#services"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              サービス
            </Link>
            <Link
              href="#products"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              製品
            </Link>
            <Link
              href="#vision"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              ビジョン
            </Link>
            <Link
              href="#company"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              会社情報
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

