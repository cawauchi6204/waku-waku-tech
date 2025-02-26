import Link from "next/link"
import { Facebook, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold text-white">
            CIVIQ
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">会社情報</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#company" className="text-base text-gray-300 hover:text-white">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="#vision" className="text-base text-gray-300 hover:text-white">
                  ビジョン
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-300 hover:text-white">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">サービス</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#services" className="text-base text-gray-300 hover:text-white">
                  地域のデジタル化
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-base text-gray-300 hover:text-white">
                  AIデータ分析
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-base text-gray-300 hover:text-white">
                  スマートシティ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">お問い合わせ</h3>
            <p className="text-gray-300 mb-4">
              お気軽にお問い合わせください。
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-base text-gray-400">
            &copy; 2025 CIVIQ Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

