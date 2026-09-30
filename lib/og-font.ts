// Fetches a glyph subset of a Google Font as TrueType for next/og (satori can't read woff2).
export async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`
  try {
    const css = await (await fetch(url)).text()
    const src = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1]
    if (!src) return null
    const res = await fetch(src)
    return res.ok ? await res.arrayBuffer() : null
  } catch {
    return null
  }
}
