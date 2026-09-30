import type { Metadata, Viewport } from "next"
import "lenis/dist/lenis.css"
import "./globals.css"
import { SITE } from "@/lib/site"

const title = `${SITE.name}｜${SITE.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s｜${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: SITE.description,
    url: "/",
    siteName: SITE.name,
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      alternateName: ["ワクワクテック", SITE.legalName],
      inLanguage: "ja",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      logo: `${SITE.url}/apple-icon`,
      slogan: SITE.tagline,
      email: SITE.email,
      foundingDate: SITE.foundingDate,
      address: {
        "@type": "PostalAddress",
        postalCode: SITE.address.postalCode,
        addressRegion: SITE.address.region,
        addressLocality: SITE.address.locality,
        streetAddress: SITE.address.street,
        addressCountry: "JP",
      },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "if(!location.hash){history.scrollRestoration='manual';scrollTo(0,0)}" }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
