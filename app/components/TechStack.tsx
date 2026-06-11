import Link from "next/link"
import {
  Bike,
  Camera,
  CircleCheckBig,
  ClipboardCheck,
  CookingPot,
  Dog,
  Dumbbell,
  Grid3X3,
  MoonStar,
  Puzzle,
  TrainFront,
} from "lucide-react"

const apps = [
  {
    name: "Pomo Dog Run",
    description: "犬の散歩をもっと楽しくする、集中タイマーアプリ。",
    category: "ライフスタイル",
    icon: Dog,
    color: "text-orange-600",
    surface: "bg-orange-50",
  },
  {
    name: "3秒献立",
    description: "献立の悩みをすばやく軽くするレシピ提案アプリ。",
    category: "フード",
    icon: CookingPot,
    color: "text-lime-600",
    surface: "bg-lime-50",
  },
  {
    name: "詰めトレ",
    description: "スキマ時間で取り組める学習・トレーニングアプリ。",
    category: "学習",
    icon: ClipboardCheck,
    color: "text-blue-600",
    surface: "bg-blue-50",
  },
  {
    name: "原付免許",
    description: "原付免許の学科試験を効率よく学習するサポートアプリ。",
    category: "教育",
    icon: Bike,
    color: "text-pink-600",
    surface: "bg-pink-50",
  },
  {
    name: "LIFTZ",
    description: "ジムの成果を可視化し、モチベーションを高める記録アプリ。",
    category: "ヘルスケア",
    icon: Dumbbell,
    color: "text-orange-600",
    surface: "bg-orange-50",
  },
  {
    name: "ASD DOJO",
    description: "発達支援領域のトレーニングを支えるプロダクト。",
    category: "ヘルスケア",
    icon: Puzzle,
    color: "text-blue-600",
    surface: "bg-blue-50",
  },
  {
    name: "Sleep Legends",
    description: "睡眠と毎日のリズムを楽しく整えるサポートアプリ。",
    category: "ヘルスケア",
    icon: MoonStar,
    color: "text-indigo-600",
    surface: "bg-indigo-50",
  },
  {
    name: "PomoTrain",
    description: "ポモドーロで集中の出発を後押しする生産性アプリ。",
    category: "生産性",
    icon: TrainFront,
    color: "text-sky-600",
    surface: "bg-sky-50",
  },
  {
    name: "inustagram",
    description: "愛犬との思い出を楽しく記録・共有できるアプリ。",
    category: "ライフスタイル",
    icon: Camera,
    color: "text-amber-700",
    surface: "bg-amber-50",
  },
  {
    name: "DONE",
    description: "やることをサクッと管理するシンプルなタスクアプリ。",
    category: "生産性",
    icon: CircleCheckBig,
    color: "text-emerald-600",
    surface: "bg-emerald-50",
  },
  {
    name: "144types",
    description: "性格タイプを楽しく診断するエンタメ診断アプリ。",
    category: "エンタメ",
    icon: Grid3X3,
    color: "text-fuchsia-600",
    surface: "bg-fuchsia-50",
  },
]

export default function Products() {
  return (
    <section id="products" className="border-b border-[#17120d]/10 bg-[#ebe4d8] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-10 border-b border-[#17120d]/12 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-line text-xs font-bold uppercase tracking-[0.38em] text-[#2d75a5]">
              Product Wall
            </p>
            <h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[#17120d] sm:text-7xl">
              もう、
              <br />
              世に出している。
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg font-medium leading-9 text-[#17120d]/72">
              ワクワクは、言葉だけでは終わらせない。生活、学習、習慣、ヘルスケアまで、自社プロダクトとして作って、出して、磨いてきました。
            </p>
            <Link
              href="https://apps.apple.com/jp/developer/tatsuya-kawauchi/id1716320513"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex text-sm font-black text-[#e85b24] underline-offset-4 hover:underline"
            >
              App Storeですべて見る
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 overflow-hidden border border-[#17120d]/12 bg-[#f6f2ea]/75 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apps.map((app) => {
            const Icon = app.icon
            return (
              <article
                key={app.name}
                className="group min-h-[228px] border-b border-r border-[#17120d]/12 p-6 transition hover:bg-[#fffaf1]"
              >
                <div className={`flex size-14 items-center justify-center rounded-full ${app.surface}`}>
                  <Icon className={`size-9 ${app.color} transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6`} aria-hidden="true" />
                </div>
                <h3 className="mt-7 text-2xl font-black tracking-[-0.01em] text-[#17120d]">{app.name}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-[#17120d]/68">{app.description}</p>
                <p className={`mt-5 font-line text-xs font-black uppercase tracking-[0.22em] ${app.color}`}>
                  {app.category}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
