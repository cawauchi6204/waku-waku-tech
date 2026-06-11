import { ArrowRight, Code2, Lightbulb, Rocket, TrendingUp } from "lucide-react"

const process = [
  {
    number: "01",
    title: "Idea",
    text: "課題とワクワクの種を見つけ、最初に作るべき芯を決めます。",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Build",
    text: "プロトタイプを素早く形にし、会議ではなく実物で前に進めます。",
    icon: Code2,
  },
  {
    number: "03",
    title: "Ship",
    text: "ユーザーに届く状態まで仕上げ、公開・申請・導線まで支えます。",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Grow",
    text: "反応を見ながら改善し、面白さと成果が伸びる運用へつなげます。",
    icon: TrendingUp,
  },
]

const promises = [
  "長い要件定義で止めない",
  "使う人の気持ちを後回しにしない",
  "作って終わりにしない",
]

export default function Vision() {
  return (
    <section id="process" className="bg-[#f6f2ea] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-[#17120d]/12 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-line text-xs font-bold uppercase tracking-[0.38em] text-[#2d75a5]">
              Process
            </p>
            <h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[#17120d] sm:text-7xl">
              面白いを、
              <br />
              止めずに出す。
            </h2>
          </div>
          <p className="max-w-2xl text-lg font-medium leading-9 text-[#17120d]/72 lg:justify-self-end">
            企画だけ、開発だけ、公開だけで終わらない。WAKU WAKU TECHは、ユーザーに届く瞬間まで一緒に走るチームです。
          </p>
        </div>

        <div className="grid grid-cols-1 border-b border-[#17120d]/12 lg:grid-cols-4">
          {process.map((step, index) => {
            const Icon = step.icon
            return (
              <article key={step.title} className="relative border-[#17120d]/12 py-8 lg:border-r lg:px-7 lg:last:border-r-0">
                {index < process.length - 1 && (
                  <ArrowRight className="absolute right-5 top-12 hidden size-5 text-[#17120d]/22 lg:block" aria-hidden="true" />
                )}
                <div className="flex items-start justify-between gap-4">
                  <p className="font-line text-3xl font-black text-[#2d75a5]">{step.number}</p>
                  <Icon className="size-10 text-[#e85b24]" aria-hidden="true" />
                </div>
                <h3 className="mt-8 font-line text-3xl font-black text-[#17120d]">{step.title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-[#17120d]/68">{step.text}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-14 overflow-hidden bg-[#17120d] text-[#f8f3ea]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <p className="font-line text-xs font-bold uppercase tracking-[0.38em] text-[#e85b24]">
                Break the slow
              </p>
              <h3 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.02em] sm:text-6xl">
                壊すのは、システムじゃない。遅さの習慣だ。
              </h3>
              <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-[#f8f3ea]/72">
                「いつか作る」を「今日触れる」に変える。小さく試して、すぐ学んで、ちゃんと届ける。そんな軽さと熱量で、会社のITをもっと面白くします。
              </p>
            </div>
            <div className="border-t border-white/10 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <p className="font-line text-xs font-bold uppercase tracking-[0.38em] text-[#99c96b]">
                Our promise
              </p>
              <ul className="mt-6 flex flex-col gap-5">
                {promises.map((promise, index) => (
                  <li key={promise} className="flex items-center gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#99c96b] font-line text-sm font-black text-[#17120d]">
                      {index + 1}
                    </span>
                    <span className="text-lg font-black">{promise}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
