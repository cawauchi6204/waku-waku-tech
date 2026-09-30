export default function Manifesto() {
  return (
    <section id="manifesto" className="manifesto" data-scene="5" data-dim="0.7" data-hud="Mission">
      <div className="marquee" aria-hidden="true">
        <p data-marquee>Make the world more exciting — Make the world</p>
        <p data-marquee className="serif">
          more wonder, every day — more wonder, every day —
        </p>
      </div>
      <div className="manifesto-copy">
        <p className="kicker" data-reveal>
          Mission
        </p>
        <h2 data-split>
          ワクワクの総量を、
          <br />
          この世界に増やしていく。
        </h2>
        <p data-reveal>
          誰かの毎日に、ひとつ楽しみが増える。それが重なれば、世界はきっと少しだけ明るくなる。私たちは、そのためにプロダクトをつくっています。
        </p>
      </div>
    </section>
  )
}
