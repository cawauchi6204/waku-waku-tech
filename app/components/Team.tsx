import { ArrowUpRight } from "lucide-react"

const company = [
  { label: "会社名", value: "株式会社WAKU WAKU TECH" },
  { label: "設立", value: "2023年7月1日" },
  { label: "所在地", value: "埼玉県川口市栄町1-8-6" },
  { label: "代表取締役", value: "河内 達也" },
  {
    label: "事業内容",
    value: "アプリ制作・システム開発・Web制作の企画、開発、運用",
  },
]

export default function Company() {
  return (
    <section id="company" className="section company-section">
      <div className="page-width">
        <div className="section-index micro">
          <span>04 / ABOUT US</span>
          <span>私たちについて</span>
        </div>
        <div className="company-grid">
          <div data-reveal>
            <h2>
              つくる人が、
              <br />
              最後まで。
            </h2>
            <p className="section-intro">
              自社アプリを企画し、開発し、届けてきた経験を、あなたのプロダクトにも。構想から運用まで、つくる人が一貫して向き合います。
            </p>
            <p className="company-location">Based in Kawaguchi, Japan.</p>
          </div>
          <div className="company-ledger" data-reveal>
            <dl>
              {company.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <a className="company-email" href="mailto:info@waku-waku-tech.com">
              <span>info@waku-waku-tech.com</span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
