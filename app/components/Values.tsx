const values = [
  {
    no: "01",
    en: "Curiosity",
    title: ["「なぜ？」を、", "面白がる。"],
    body: "当たり前を疑い、小さな違和感に目を向ける。好奇心は、すべてのワクワクの始まりです。",
    scene: 2,
  },
  {
    no: "02",
    en: "Craft",
    title: ["細部に、", "魂を宿す。"],
    body: "触れた瞬間の気持ちよさ、0.1秒の心地よさ。見えないところまで、妥協せずに磨き上げます。",
    scene: 3,
  },
  {
    no: "03",
    en: "Play",
    title: ["遊ぶように、", "つくる。"],
    body: "真剣に、でも楽しく。つくり手がワクワクしていないものは、誰の心も動かせないから。",
    scene: 4,
  },
]

export default function Values() {
  return (
    <div id="values" className="values">
      {values.map((v) => (
        <section
          key={v.no}
          className="chapter"
          data-chapter
          data-scene={v.scene}
          data-x={v.scene === 4 ? "0" : "2.1"}
          data-y={v.scene === 4 ? "-1.1" : "0"}
          data-ym={v.scene === 4 ? "-0.6" : "1.1"}
          data-dim="1"
          data-dimm="0.5"
          data-hud={`Values — ${v.en}`}
          aria-labelledby={`value-${v.no}`}
        >
          <div className="sticky-frame">
            <div className={`chapter-inner ${v.scene === 4 ? "is-centered" : ""}`}>
              <p className="chapter-meta" data-chapter-item>
                <span>{v.no}</span>
                <span className="chapter-rule" aria-hidden="true" />
                <em>{v.en}</em>
              </p>
              <h2 id={`value-${v.no}`} className="chapter-title" data-chapter-item>
                {v.title[0]}
                <br />
                {v.title[1]}
              </h2>
              <p className="chapter-body" data-chapter-item>
                {v.body}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
