export default function Hero() {
  return (
    <section id="top" className="hero" data-scene="0" data-hud="Intro">
      <div className="hero-copy" data-hero-copy>
        <p className="eyebrow" data-hero-fade>
          <span>WAKU WAKU TECH</span>
          <em>— a product company from Japan</em>
        </p>
        <h1 className="hero-title">
          <span className="line-mask">
            <span data-hero-line>世の中に、</span>
          </span>
          <span className="line-mask">
            <span data-hero-line>
              <em className="gradient-text">ワクワク</em>を<br className="mobile-break" />
              増やす。
            </span>
          </span>
        </h1>
        <p className="hero-sub" data-hero-fade>
          テクノロジーで、<br className="mobile-break" />
          日常にもっと驚きと楽しさを。
        </p>
      </div>
      <div className="hero-meta" data-hero-fade>
        <span aria-hidden="true" />
        <a href="#philosophy" className="scroll-cue" aria-label="下へスクロール">
          <i aria-hidden="true" />
          <span>Scroll to explore</span>
        </a>
        <p>
          <span>Press &amp; hold</span>
          <span>to fire the thrusters</span>
        </p>
      </div>
    </section>
  )
}
