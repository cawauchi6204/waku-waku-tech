import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "WAKU WAKU TECH | 世の中にワクワクを増やす",
  description:
    "株式会社WAKU WAKU TECHは、アプリ制作・システム開発・Web制作を企画から開発、運用まで一気通貫で支援します。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
