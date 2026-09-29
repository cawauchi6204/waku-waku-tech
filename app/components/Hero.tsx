export default function Hero() {
  return (
    <section id="top" className="hero" data-scene="0" data-y="0.62" data-ym="0.9" data-dim="1">
      <div className="hero-copy" data-hero-copy>
        <p className="eyebrow" data-hero-fade>
          WAKU WAKU TECH
        </p>
        <h1 className="hero-title">
          <span className="line-mask">
            <span data-hero-line>世の中に、</span>
          </span>
          <span className="line-mask">
            <span data-hero-line>
              <em className="gradient-text">ワクワク</em>を増やす。
            </span>
          </span>
        </h1>
        <p className="hero-sub" data-hero-fade>
          テクノロジーで、日常にもっと驚きと楽しさを。
        </p>
      </div>
      <a href="#philosophy" className="scroll-cue" data-hero-fade aria-label="下へスクロール">
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
}
