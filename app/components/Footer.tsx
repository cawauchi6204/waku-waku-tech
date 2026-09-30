import Roll from "./Roll"
const links = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#values", label: "Values" },
  { href: "#manifesto", label: "Mission" },
  { href: "#company", label: "Company" },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <p className="footer-tagline">
          世の中に、
          <br />
          ワクワクを増やす。
        </p>
        <nav className="footer-nav" aria-label="フッターナビゲーション">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              <Roll>{l.label}</Roll>
            </a>
          ))}
        </nav>
        <div className="footer-nav">
          <a href="mailto:info@waku-waku-tech.com">
            <Roll>Mail ↗</Roll>
          </a>
        </div>
      </div>
      <p className="footer-mark" aria-hidden="true" data-footer-mark>
        {"waku waku".split("").map((ch, i) => (
          <span key={i}>{ch === " " ? " " : ch}</span>
        ))}
        <b>.</b>
      </p>
      <div className="footer-bar">
        <p>© 2023–2026 WAKU WAKU TECH Inc.</p>
        <p className="footer-made">Made with curiosity in Kawaguchi.</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
