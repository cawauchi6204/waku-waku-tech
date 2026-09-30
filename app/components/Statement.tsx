const lines = [
  ["心が", "動いた", "瞬間、"],
  ["人は", "少しだけ", "前に", "進める。"],
  ["昨日より", "面白い", "今日を。"],
  ["まだ", "誰も", "見たことのない", "明日を。"],
  ["私たちは", "テクノロジーで、"],
  ["その", "きっかけを", "つくり", "続けます。"],
]

export default function Statement() {
  return (
    <section id="philosophy" className="statement" data-scene="1" data-hud="Philosophy">
      <div className="sticky-frame">
        <div className="statement-inner">
          <p className="kicker" data-reveal>
            Philosophy
          </p>
          <h2 className="statement-lead" data-split>
            ワクワクは、
            <br />
            人を動かす。
          </h2>
          <p className="statement-body" data-words>
            {lines.map((line, i) => (
              <span className="statement-line" key={i}>
                {line.map((word, j) => (
                  <span key={j}>{word}</span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
