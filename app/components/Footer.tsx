import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const footerLinks = [
  {
    title: "事業内容",
    links: [
      { href: "#services", label: "アプリ制作" },
      { href: "#services", label: "システム開発" },
      { href: "#services", label: "Web制作" },
      { href: "#process", label: "企画・開発・運用" },
    ],
  },
  {
    title: "開発実績",
    links: [
      { href: "#products", label: "すべての実績" },
      { href: "https://apps.apple.com/jp/developer/tatsuya-kawauchi/id1716320513", label: "App Store" },
    ],
  },
  {
    title: "会社情報",
    links: [
      { href: "#company", label: "会社概要" },
      { href: "#contact", label: "お問い合わせ" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.05fr_1.2fr_0.75fr]">
          <div>
            <Link href="#mission" className="inline-flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-md bg-white text-lg font-black text-neutral-950">
                W
              </span>
              <span className="text-2xl font-black tracking-tight">WAKU WAKU TECH</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm font-medium leading-7 text-white/65">
              世の中にワクワクを増やす。遅いITを置き去りにして、アイデアを面白いプロダクトへ。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-xs font-black uppercase tracking-[0.2em] text-lime-300">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white"
                      >
                        {link.label}
                        {link.href.startsWith("http") && <ArrowUpRight className="size-3" aria-hidden="true" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-md border border-white/10 bg-white/5 p-5">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-orange-300">
              Contact
            </p>
            <a
              href="mailto:info@waku-waku-tech.com"
              className="mt-3 block break-all text-lg font-black text-white transition hover:text-orange-200"
            >
              info@waku-waku-tech.com
            </a>
            <Link
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-orange-600 px-4 py-3 text-sm font-black text-white transition hover:bg-orange-500"
            >
              相談する
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs font-bold text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 WAKU WAKU TECH Inc. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.18em]">Build fast. Build fun.</p>
        </div>
      </div>
    </footer>
  )
}
