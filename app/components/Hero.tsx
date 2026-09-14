import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import BauhausStage from "./BauhausStage"

export default function Hero() {
  return (
    <section id="mission" className="hero">
      <div className="page-width hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span aria-hidden="true" />
            DESIGN × TECHNOLOGY
          </p>
          <h1>
            <span>遊び心で、</span>
            <span>その先へ。</span>
          </h1>
          <p className="hero-english" lang="en">
            Make room for wonder.
          </p>
          <div className="hero-description">
            <p>
              アプリ、Web、業務システム。
              <br />
              アイデアの輪郭から、使われ続けるところまで。
              <br />
              私たちは、考え、つくり、育てるチームです。
            </p>
            <Link href="#contact" className="hero-cta">
              プロジェクトを相談する
              <span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <BauhausStage />
        </div>
      </div>
      <div className="page-width hero-foot">
        <p>
          Small ideas. <em>Real possibilities.</em>
        </p>
        <a href="#products">
          つくったものを見る <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
