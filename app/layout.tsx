import type { Metadata, Viewport } from "next"
import "lenis/dist/lenis.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "WAKU WAKU TECH — 世の中に、ワクワクを増やす。",
  description:
    "株式会社WAKU WAKU TECHは、テクノロジーで日常に驚きと楽しさを届けるプロダクトカンパニーです。",
  openGraph: {
    title: "WAKU WAKU TECH — 世の中に、ワクワクを増やす。",
    description: "テクノロジーで、日常にもっと驚きと楽しさを。",
    type: "website",
    locale: "ja_JP",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "if(!location.hash){history.scrollRestoration='manual';scrollTo(0,0)}" }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=LINE+Seed+JP:wght@400;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
