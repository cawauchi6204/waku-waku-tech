import { ArrowRight } from "lucide-react"

const services = [
  {
    number: "01",
    title: "アプリ制作",
    subtitle: "iOS / Android / Cross Platform",
    description: "思いつきを、毎日起動したくなるプロダクトへ。企画、UI、実装、ストア申請、運用改善まで一気に進めます。",
  },
  {
    number: "02",
    title: "システム開発",
    subtitle: "Business System / API / Admin",
    description: "遅い業務を、迷わず動ける仕組みに変える。現場の流れに合わせて、管理画面やAPI、データ基盤を設計します。",
  },
  {
    number: "03",
    title: "Web制作",
    subtitle: "Corporate / LP / Service Site",
    description: "会社やサービスの面白さを、最初の数秒で伝える。ブランド整理から実装、計測、改善まで面倒を見ます。",
  },
  {
    number: "04",
    title: "企画・開発・運用",
    subtitle: "Planning / Build / Operation",
    description: "会議で止めず、小さく作って大きく学ぶ。リリース後の反応まで見ながら、次のワクワクへ伸ばします。",
  },
]

export default function Services() {
  return (
    <section id="services" className="border-b border-[#17120d]/10 bg-[#f6f2ea] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-line text-xs font-bold uppercase tracking-[0.38em] text-[#2d75a5]">
              Services
            </p>
            <h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[#17120d] sm:text-7xl">
              つくる。
              <br />
              壊す。
              <br />
              もっと面白くする。
            </h2>
          </div>
          <div className="self-end border-l border-[#17120d]/14 pl-6">
            <p className="max-w-2xl text-lg font-medium leading-9 text-[#17120d]/72">
              仕様書を眺めるだけの時間を減らし、触れるものから始めます。速さは雑さではなく、面白い問いに早く到達するための姿勢です。
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-[#17120d]/12">
          {services.map((service) => (
            <article
              key={service.number}
              className="group grid gap-6 border-b border-[#17120d]/12 py-8 transition md:grid-cols-[120px_0.72fr_1fr_48px] md:items-center"
            >
              <p className="font-line text-sm font-bold tracking-[0.32em] text-[#e85b24]">
                {service.number}
              </p>
              <div>
                <h3 className="text-3xl font-black tracking-[-0.01em] text-[#17120d] sm:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-2 font-line text-xs font-bold uppercase tracking-[0.26em] text-[#2d75a5]">
                  {service.subtitle}
                </p>
              </div>
              <p className="max-w-2xl text-base font-medium leading-8 text-[#17120d]/68">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-flex size-11 items-center justify-center rounded-full border border-[#17120d]/18 text-[#17120d] transition group-hover:-translate-y-1 group-hover:border-[#e85b24] group-hover:bg-[#e85b24] group-hover:text-white"
                aria-label={`${service.title}を相談する`}
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
