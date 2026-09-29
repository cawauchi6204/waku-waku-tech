import type { Metadata, Viewport } from "next"
import "lenis/dist/lenis.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "WAKU WAKU TECH — 世の中に、ワクワクを増やす。",
  description:
    "株式会社WAKU WAKU TECHは、テクノロジーで日常に驚きと楽しさを届けるプロダクトカンパニーです。",
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
