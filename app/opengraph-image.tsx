import { ImageResponse } from "next/og"
import { loadGoogleFont } from "@/lib/og-font"
import { SITE } from "@/lib/site"

export const alt = `${SITE.name}｜${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const GRADIENT = "linear-gradient(100deg, #ffd29a 0%, #ff8a3d 35%, #ff5a1f 60%, #ff2d6f 100%)"

// Deterministic star field so the card echoes the particle universe.
const stars = Array.from({ length: 260 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453
  const b = Math.sin(i * 78.233) * 12345.6789
  const r = a - Math.floor(a)
  const t = b - Math.floor(b)
  const angle = t * Math.PI * 2
  const dist = Math.pow(r, 0.6) * 260
  return {
    x: 600 + Math.cos(angle) * dist * 1.25,
    y: 190 + Math.sin(angle) * dist * 0.62,
    s: 1.5 + (i % 7 === 0 ? 2.5 : r * 1.5),
    o: 0.25 + (1 - r) * 0.6,
    ember: i % 9 === 0,
  }
})

export default async function OpengraphImage() {
  const jp = "世の中に、ワクワクを増やす。"
  const latin = "WAKU TECH Make the world more exciting. waku-waku-tech.com"
  const [display, sans] = await Promise.all([
    loadGoogleFont("LINE Seed JP", 800, jp),
    loadGoogleFont("Inter Tight", 700, latin),
  ])
  const fonts = [
    display && { name: "LINE Seed JP", data: display, weight: 800 as const },
    sans && { name: "Inter Tight", data: sans, weight: 700 as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 800 | 700 }[]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 72px 70px",
          background: "radial-gradient(55% 50% at 50% 30%, rgba(255,90,31,0.16), #000 75%)",
          color: "#f5f5f7",
          fontFamily: "Inter Tight",
          position: "relative",
        }}
      >
        {stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.s,
              height: s.s,
              borderRadius: 999,
              background: s.ember ? "#ff5a1f" : "#fff5eb",
              opacity: s.o,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 56,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            letterSpacing: 5,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 999, background: GRADIENT }} />
          WAKU WAKU TECH
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "LINE Seed JP",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1.12,
          }}
        >
          <span>世の中に、</span>
          <div style={{ display: "flex" }}>
            <span style={{ backgroundImage: GRADIENT, backgroundClip: "text", color: "transparent" }}>ワクワク</span>
            <span>を増やす。</span>
          </div>
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: "#a1a1a6", letterSpacing: 0.5 }}>
          Make the world more exciting.
        </div>
        <div style={{ position: "absolute", bottom: 40, right: 56, fontSize: 16, color: "#6e6e73", letterSpacing: 2 }}>
          waku-waku-tech.com
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
