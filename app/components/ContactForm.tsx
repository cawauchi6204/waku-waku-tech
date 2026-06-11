"use client"

import { FormEvent, useMemo, useState } from "react"
import { ArrowRight, Mail, Send, Sparkles } from "lucide-react"

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
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-md bg-orange-600 text-white shadow-[0_24px_70px_rgba(234,88,12,0.22)]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <p className="font-mono text-sm font-black uppercase tracking-[0.22em] text-white/75">
                Contact
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                一緒に、ワクワクする未来をつくりましょう。
              </h2>
              <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white/80">
                まだアイデア段階でも大丈夫です。アプリ、システム、Web、運用改善まで、まずは軽く相談してください。
              </p>
              <a
                href="mailto:info@waku-waku-tech.com"
                className="mt-8 inline-flex items-center gap-3 rounded-md bg-white px-6 py-4 text-sm font-black text-orange-700 transition hover:-translate-y-0.5 hover:bg-neutral-950 hover:text-white"
              >
                info@waku-waku-tech.com
                <Mail className="size-4" aria-hidden="true" />
              </a>

              <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/20 pt-6">
                <div>
                  <p className="font-mono text-3xl font-black">App</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/65">Native</p>
                </div>
                <div>
                  <p className="font-mono text-3xl font-black">Web</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/65">Launch</p>
                </div>
                <div>
                  <p className="font-mono text-3xl font-black">Ops</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/65">Grow</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 bg-white p-6 text-neutral-950 sm:p-8 lg:border-l lg:border-t-0">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex items-center gap-3 border-b border-neutral-200 pb-5">
                  <Sparkles className="size-6 text-orange-600" aria-hidden="true" />
                  <div>
                    <h3 className="text-2xl font-black">相談メモを作る</h3>
                    <p className="mt-1 text-sm font-medium text-neutral-600">
                      入力すると、送信用メールの本文を作れます。
                    </p>
                  </div>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-black text-neutral-700">お名前</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="rounded-md border border-neutral-300 px-4 py-3 text-base font-medium outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-black text-neutral-700">メールアドレス</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="rounded-md border border-neutral-300 px-4 py-3 text-base font-medium outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-black text-neutral-700">相談内容</span>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="resize-none rounded-md border border-neutral-300 px-4 py-3 text-base font-medium outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    required
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-neutral-800"
                  >
                    メール文を作る
                    <Send className="size-4" aria-hidden="true" />
                  </button>
                  <a
                    href={prepared ? mailtoHref : "#contact"}
                    aria-disabled={!prepared}
                    className={`inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-black transition ${
                      prepared
                        ? "border-orange-600 text-orange-700 hover:-translate-y-0.5 hover:bg-orange-50"
                        : "pointer-events-none border-neutral-200 text-neutral-400"
                    }`}
                  >
                    メールを開く
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </div>

                {prepared && (
                  <p className="rounded-md border border-lime-200 bg-lime-50 px-4 py-3 text-sm font-bold text-lime-800">
                    相談メモを作りました。メールを開いて送信してください。
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
