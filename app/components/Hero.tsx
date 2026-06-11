import Link from "next/link"
import { ArrowRight } from "lucide-react"
import RocketStage from "./RocketStage"

export default function Hero() {
  return (
    <section id="mission" className="hero-noise relative min-h-[100svh] overflow-hidden bg-[#f6f2ea] pt-[72px] text-[#17120d]">
      <RocketStage />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#17120d]/15" aria-hidden="true" />
      <div className="absolute left-6 top-[94px] hidden h-[calc(100%-140px)] w-px bg-[#17120d]/12 md:block" aria-hidden="true" />
      <div className="absolute bottom-12 right-8 hidden rotate-90 font-line text-xs tracking-[0.5em] text-[#17120d]/45 lg:block">
        SCROLL / LAUNCH / WAKU WAKU
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl grid-cols-1 items-center px-4 py-12 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div className="max-w-4xl">
          <p className="font-line text-sm font-bold tracking-[0.38em] text-[#2d75a5]">
            WAKU WAKU TECH
          </p>

          <h1 className="mt-6 text-[3.35rem] font-black leading-[0.96] tracking-[-0.02em] text-[#17120d] sm:text-[5.2rem] lg:text-[6.6rem]">
            <span className="block whitespace-nowrap">おもしろいを、</span>
            <span className="block whitespace-nowrap">打ち上げる。</span>
          </h1>

          <div className="mt-6 grid gap-5 lg:grid-cols-[0.65fr_1fr] lg:items-start">
            <p className="text-2xl font-black leading-tight sm:text-3xl">
              遅いITを、
              <br />
              遊び心でぶっ壊す。
            </p>
            <p className="max-w-xl text-base font-medium leading-8 text-[#17120d]/72 sm:text-lg">
              企画で止まる。会議で眠る。仕様書だけが太る。そんな流れを変えて、触れるプロダクトを素早く世の中へ。アプリ制作・システム開発・Web制作を、ワクワクする体験として届けます。
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#17120d] px-7 py-4 text-sm font-black text-[#f8f3ea] transition hover:-translate-y-0.5 hover:bg-[#e85b24]"
            >
              打ち上げ相談
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="#products"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#17120d]/20 bg-[#f6f2ea]/70 px-7 py-4 text-sm font-black text-[#17120d] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#17120d] hover:bg-white/80"
            >
              届けたものを見る
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-y border-[#17120d]/15 bg-[#f6f2ea]/70 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-hidden px-4 sm:px-6 lg:px-8">
          <span className="shrink-0 font-line text-xs font-bold uppercase tracking-[0.32em] text-[#e85b24]">
            no slow it
          </span>
          <p className="marquee whitespace-nowrap font-line text-sm font-bold uppercase tracking-[0.28em] text-[#17120d]/66">
            idea to launch / apps / systems / websites / tiny experiments / shipped products / playful operations /
          </p>
        </div>
      </div>
    </section>
  )
}
