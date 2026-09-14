const steps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "輪郭を見つける",
    text: "課題を整理し、誰に何を届けるのかを一緒に考えます。",
  },
  {
    number: "02",
    title: "Design & Build",
    subtitle: "触れる形にする",
    text: "小さな試作から、デザインと実装を行き来しながら磨きます。",
  },
  {
    number: "03",
    title: "Launch",
    subtitle: "使う人へ届ける",
    text: "公開、ストア申請、導線まで。届くところまで支えます。",
  },
  {
    number: "04",
    title: "Grow",
    subtitle: "反応から育てる",
    text: "使われ方を見ながら改善し、プロダクトの次を考えます。",
  },
]

export default function Vision() {
  return (
    <section id="process" className="section process-section">
      <div className="page-width">
        <div className="section-index micro">
          <span>03 / OUR APPROACH</span>
          <span>進め方</span>
        </div>
        <div className="process-heading" data-reveal>
          <h2>
            小さく作り、
            <br />
            反応から育てる。
          </h2>
          <p>
            考えるだけでは、見えないことがある。
            <br />
            まず形にして、触れて、また考える。
            <br />
            その繰り返しで、確かな体験へ近づけます。
          </p>
        </div>
        <ol className="process-rail">
          {steps.map((step) => (
            <li key={step.number} data-reveal>
              <span className="process-node" aria-hidden="true" />
              <span className="micro">{step.number}</span>
              <h3>{step.title}</h3>
              <p className="process-subtitle">{step.subtitle}</p>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
