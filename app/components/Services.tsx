import { ArrowUpRight } from "lucide-react"

const services = [
  {
    number: "01",
    title: "アプリ制作",
    english: "App development",
    description:
      "毎日起動したくなる、使いやすいプロダクトを。企画・UI設計から実装、ストア申請、リリース後の改善まで。",
    detail: "iOS / Android / Cross Platform",
  },
  {
    number: "02",
    title: "システム開発",
    english: "System development",
    description:
      "現場の流れに合った、無理なく使える仕組みを。管理画面、API、データ基盤まで、業務を理解して設計します。",
    detail: "Business System / API / Admin",
  },
  {
    number: "03",
    title: "Web制作",
    english: "Web design & development",
    description:
      "事業のらしさが伝わる、体験としてのWebサイト。ブランドの整理からデザイン、実装、計測まで支えます。",
    detail: "Corporate / Landing Page / Service",
  },
  {
    number: "04",
    title: "企画・開発・運用",
    english: "Product planning & growth",
    description:
      "小さく試し、反応から次を決める。構想をプロトタイプに変え、公開後もプロダクトの成長に伴走します。",
    detail: "Planning / Prototyping / Operation",
  },
]

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="page-width">
        <div className="section-index micro">
          <span>02 / WHAT WE DO</span>
          <span>できること</span>
        </div>
        <div className="services-layout">
          <div className="services-intro" data-reveal>
            <h2>
              構想から、
              <br />
              使われる
              <br />
              その先まで。
            </h2>
            <p className="section-intro">
              つくるものが決まっていなくても。
              <br />
              最初の問いから、一緒に考えます。
            </p>
            <a className="text-link" href="#contact">
              アイデアを話してみる <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number} data-reveal>
                <span className="service-number">{service.number}</span>
                <div className="service-body">
                  <p className="service-english" lang="en">
                    {service.english}
                  </p>
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <p className="service-detail">{service.detail}</p>
                </div>
                <a
                  className="service-link"
                  href="#contact"
                  aria-label={`${service.title}を相談する`}
                >
                  <ArrowUpRight size={23} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
