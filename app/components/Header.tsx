const nav = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#values", label: "Values" },
  { href: "#manifesto", label: "Mission" },
  { href: "#company", label: "Company" },
]

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#top" className="wordmark" aria-label="WAKU WAKU TECH トップへ">
          <span className="wordmark-dot" aria-hidden="true" />
          WAKU WAKU TECH
        </a>
        <nav className="header-nav" aria-label="メインナビゲーション">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="header-cta">
          Contact
        </a>
      </div>
      <span className="header-progress" data-progress aria-hidden="true" />
    </header>
  )
}
