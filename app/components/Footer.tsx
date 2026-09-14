import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-top">
          <p>株式会社WAKU WAKU TECH</p>
          <Link href="#mission">
            Back to top <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <Link
          href="#mission"
          className="footer-wordmark"
          aria-label="WAKU WAKU TECH ホーム"
        >
          waku waku<span>tech.</span>
        </Link>
        <div className="footer-bottom">
          <p>© 2026 WAKU WAKU TECH</p>
          <nav aria-label="フッターナビゲーション">
            <Link href="#products">つくったもの</Link>
            <Link href="#services">できること</Link>
            <Link href="#company">会社情報</Link>
            <a
              href="https://apps.apple.com/jp/developer/tatsuya-kawauchi/id1716320513"
              target="_blank"
              rel="noreferrer"
            >
              App Store ↗
            </a>
          </nav>
          <span>Design with curiosity.</span>
        </div>
      </div>
    </footer>
  )
}
