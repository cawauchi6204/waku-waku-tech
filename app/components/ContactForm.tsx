"use client"

import { type FormEvent, useMemo, useState } from "react"
import { ArrowUpRight, Check } from "lucide-react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [prepared, setPrepared] = useState(false)
  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("WAKU WAKU TECHへの相談")
    const body = encodeURIComponent(
      `お名前: ${name}\nメール: ${email}\n\n相談内容:\n${message}`
    )
    return `mailto:info@waku-waku-tech.com?subject=${subject}&body=${body}`
  }, [email, message, name])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPrepared(true)
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="page-width">
        <div className="section-index micro">
          <span>05 / START A CONVERSATION</span>
          <span>お問い合わせ</span>
        </div>
        <div className="contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="contact-display">
              Let’s make
              <br />
              something <em>matter.</em>
            </p>
            <h2>
              まだ輪郭のない、
              <br />
              アイデアから。
            </h2>
            <p className="section-intro">
              つくりたいもの、変えたいこと。
              <br />
              まとまっていなくてもかまいません。
              <br />
              まずは、話すところから始めましょう。
            </p>
            <a className="contact-email" href="mailto:info@waku-waku-tech.com">
              info@waku-waku-tech.com{" "}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            onChange={() => setPrepared(false)}
          >
            <div className="form-heading">
              <h3>相談メモを作る</h3>
              <p>入力した内容から、送信用のメールを準備します。</p>
            </div>
            <label>
              <span>
                <i className="micro">01</i>お名前 <small>必須</small>
              </span>
              <input
                name="name"
                autoComplete="name"
                placeholder="山田 太郎"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <label>
              <span>
                <i className="micro">02</i>メールアドレス <small>必須</small>
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              <span>
                <i className="micro">03</i>相談内容 <small>必須</small>
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="つくりたいもの、困っていることなど、自由にお聞かせください。"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </label>
            <div className="form-actions">
              <button type="submit" className="button button-dark">
                メール文を作る <ArrowUpRight size={18} aria-hidden="true" />
              </button>
              {prepared && (
                <a className="button button-outline" href={mailtoHref}>
                  メールを開く <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
            </div>
            <div aria-live="polite" className="form-status">
              {prepared ? (
                <p>
                  <Check size={17} aria-hidden="true" />
                  相談メモを作りました。「メールを開く」から送信してください。
                </p>
              ) : (
                <p>
                  このフォームから直接送信はされません。メールアプリが開きます。
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
