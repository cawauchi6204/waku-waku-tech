import { Building2, Mail, MapPin, UserRound } from "lucide-react"

const company = [
  { label: "会社名", value: "株式会社WAKU WAKU TECH" },
  { label: "設立", value: "2023年7月1日" },
  { label: "所在地", value: "埼玉県川口市栄町1-8-6" },
  { label: "代表取締役", value: "河内 達也" },
  { label: "事業内容", value: "アプリ制作・システム開発・Web制作の企画、開発、運用" },
]

export default function Company() {
  return (
    <section id="company" className="border-y border-neutral-200 bg-neutral-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="font-mono text-sm font-black uppercase tracking-[0.22em] text-orange-600">
              Studio
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
              小さく速く、でもちゃんと強いチーム。
            </h2>
            <p className="mt-6 text-base font-medium leading-8 text-neutral-700">
              自社アプリを作って、出して、磨いてきた経験を、クライアントのプロダクトにも持ち込みます。面白いアイデアを、現実に動くサービスへ。
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-md border border-neutral-200 bg-white p-4">
                <Building2 className="size-6 text-blue-600" aria-hidden="true" />
                <p className="mt-3 text-sm font-black text-neutral-950">企画から運用まで</p>
              </div>
              <div className="rounded-md border border-neutral-200 bg-white p-4">
                <UserRound className="size-6 text-orange-600" aria-hidden="true" />
                <p className="mt-3 text-sm font-black text-neutral-950">Founder-led</p>
              </div>
              <div className="rounded-md border border-neutral-200 bg-white p-4">
                <MapPin className="size-6 text-lime-600" aria-hidden="true" />
                <p className="mt-3 text-sm font-black text-neutral-950">埼玉県川口市</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 bg-neutral-950 px-6 py-4 text-white">
              <p className="font-mono text-sm font-black uppercase tracking-[0.2em] text-lime-300">
                Company Ledger
              </p>
            </div>
            <dl>
              {company.map((item) => (
                <div key={item.label} className="grid gap-2 border-b border-neutral-200 px-6 py-5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-8">
                  <dt className="font-mono text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
                    {item.label}
                  </dt>
                  <dd className="text-base font-black text-neutral-950">{item.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="mailto:info@waku-waku-tech.com"
              className="flex items-center justify-between gap-4 border-t border-neutral-200 bg-orange-600 px-6 py-5 text-white transition hover:bg-orange-500"
            >
              <span>
                <span className="block font-mono text-xs font-black uppercase tracking-[0.2em] text-white/70">
                  Contact
                </span>
                <span className="mt-1 block text-lg font-black">info@waku-waku-tech.com</span>
              </span>
              <Mail className="size-6" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
