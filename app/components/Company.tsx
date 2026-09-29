import { ArrowUpRight } from "lucide-react"

const rows = [
  { label: "会社名", value: "株式会社WAKU WAKU TECH" },
  { label: "設立", value: "2023年7月1日" },
  { label: "所在地", value: "埼玉県川口市栄町1-8-6" },
  { label: "代表取締役", value: "河内 達也" },
  { label: "事業内容", value: "自社プロダクトの企画・開発・運営" },
]

export default function Company() {
  return (
    <section id="company" className="company" data-scene="5" data-dim="0.35">
      <div className="company-inner">
        <div className="company-head" data-reveal>
          <p className="kicker">Company</p>
          <h2>会社概要</h2>
        </div>
        <dl className="company-list" data-reveal>
          {rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <a id="contact" className="contact-card" href="mailto:info@waku-waku-tech.com" data-reveal>
          <span className="contact-label">Contact</span>
          <span className="contact-mail">info@waku-waku-tech.com</span>
          <span className="contact-arrow" aria-hidden="true">
            <ArrowUpRight size={22} />
          </span>
        </a>
      </div>
    </section>
  )
}
