import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const apps = [
  {
    id: "6775330252",
    name: "Pomo Dog Run",
    summary: "ポモドーロの集中時間を、世界中の犬が集まるオンラインドッグランに変える集中タイマーアプリ。",
    genre: "仕事効率化",
    price: "無料",
    iconSrc: "/app-icons/6775330252.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/pomo-dog-run/id6775330252?uo=4",
  },
  {
    id: "6770769389",
    name: "3秒献立 - 晩御飯を一瞬で決める",
    summary: "主菜と副菜をタイルから選ぶだけで、予算・調理時間・苦手食材に合う夜ごはん候補をすぐ作れるアプリ。",
    genre: "フード／ドリンク",
    price: "無料",
    iconSrc: "/app-icons/6770769389.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/3%E7%A7%92%E7%8C%AE%E7%AB%8B-%E6%99%A9%E5%BE%A1%E9%A3%AF%E3%82%92%E4%B8%80%E7%9E%AC%E3%81%A7%E6%B1%BA%E3%82%81%E3%82%8B/id6770769389?uo=4",
  },
  {
    id: "6769731690",
    name: "詰めトレ - 級位者のための詰将棋",
    summary: "一手詰から七手詰までを解きながら、級位者が初段を目指すための終盤力を鍛える詰将棋トレーニングアプリ。",
    genre: "ゲーム",
    price: "無料",
    iconSrc: "/app-icons/6769731690.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/%E8%A9%B0%E3%82%81%E3%83%88%E3%83%AC-%E7%B4%9A%E4%BD%8D%E8%80%85%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E8%A9%B0%E5%B0%86%E6%A3%8B/id6769731690?uo=4",
  },
  {
    id: "6766057046",
    name: "原付免許 - ワンコイン問題集",
    summary: "410問の○×問題を5問ずつ解き、法令・標識・通行方法などをテンポよく復習できる原付免許対策アプリ。",
    genre: "教育",
    price: "¥500",
    iconSrc: "/app-icons/6766057046.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/%E5%8E%9F%E4%BB%98%E5%85%8D%E8%A8%B1-%E3%83%AF%E3%83%B3%E3%82%B3%E3%82%A4%E3%83%B3%E5%95%8F%E9%A1%8C%E9%9B%86/id6766057046?uo=4",
  },
  {
    id: "6763892868",
    name: "LIFTZ:筋トレ記録SNS",
    summary: "筋トレ記録を公開・共有し、PRや総重量、セット数などをカードで残せるトレーニングSNS。",
    genre: "ヘルスケア／フィットネス",
    price: "無料",
    iconSrc: "/app-icons/6763892868.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/liftz-%E7%AD%8B%E3%83%88%E3%83%AC%E8%A8%98%E9%8C%B2sns/id6763892868?uo=4",
  },
  {
    id: "6761506378",
    name: "ASD DOJO-会話トレーニング",
    summary: "会話で迷いやすい場面を短いレッスンで整理し、返し方や反応の読み取りを練習する会話トレーニングアプリ。",
    genre: "教育",
    price: "無料",
    iconSrc: "/app-icons/6761506378.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/asd-dojo-%E4%BC%9A%E8%A9%B1%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0/id6761506378?uo=4",
  },
  {
    id: "6760163790",
    name: "Sleep Legends - 眠れる偉人伝 -",
    summary: "歴史上の偉人たちの物語を、おやすみ前の読み聞かせスタイルで届ける睡眠サポートアプリ。",
    genre: "ヘルスケア／フィットネス",
    price: "無料",
    iconSrc: "/app-icons/6760163790.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/sleep-legends-%E7%9C%A0%E3%82%8C%E3%82%8B%E5%81%89%E4%BA%BA%E4%BC%9D/id6760163790?uo=4",
  },
  {
    id: "6759304993",
    name: "PomoTrain",
    summary: "ポモドーロ・テクニックと鉄道旅を組み合わせ、集中するたびに電車が走り出す集中タイマーアプリ。",
    genre: "仕事効率化",
    price: "無料",
    iconSrc: "/app-icons/6759304993.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/pomotrain/id6759304993?uo=4",
  },
  {
    id: "6758990905",
    name: "inustagram - pet sns",
    summary: "ペット写真・動画の共有、GPSおさんぽ記録、毎日のお世話管理までまとめたペット専用SNSアプリ。",
    genre: "ソーシャルネットワーキング",
    price: "無料",
    iconSrc: "/app-icons/6758990905.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/inustagram-pet-sns/id6758990905?uo=4",
  },
  {
    id: "6757388554",
    name: "DONE 66日間で習慣を定着",
    summary: "66日間の習慣形成を、ゲーム感覚で続けるための習慣トラッカーアプリ。",
    genre: "ライフスタイル",
    price: "無料",
    iconSrc: "/app-icons/6757388554.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/done-66%E6%97%A5%E9%96%93%E3%81%A7%E7%BF%92%E6%85%A3%E3%82%92%E5%AE%9A%E7%9D%80/id6757388554?uo=4",
  },
  {
    id: "6756567488",
    name: "144types - 性格診断×相性分析",
    summary: "MBTIとエニアグラムを組み合わせた144通りの性格タイプで、自分や相手との相性を分析するアプリ。",
    genre: "ライフスタイル",
    price: "無料",
    iconSrc: "/app-icons/6756567488.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/144types-%E6%80%A7%E6%A0%BC%E8%A8%BA%E6%96%AD-%E7%9B%B8%E6%80%A7%E5%88%86%E6%9E%90/id6756567488?uo=4",
  },
  {
    id: "6755940930",
    name: "すごい家計簿-封筒機能、レシート読み取り機能搭載簡単家計管理",
    summary: "レシート撮影でAIが自動入力し、封筒家計簿で予算管理までできる家計管理アプリ。",
    genre: "ファイナンス",
    price: "無料",
    iconSrc: "/app-icons/6755940930.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/%E3%81%99%E3%81%94%E3%81%84%E5%AE%B6%E8%A8%88%E7%B0%BF-%E5%B0%81%E7%AD%92%E6%A9%9F%E8%83%BD-%E3%83%AC%E3%82%B7%E3%83%BC%E3%83%88%E8%AA%AD%E3%81%BF%E5%8F%96%E3%82%8A%E6%A9%9F%E8%83%BD%E6%90%AD%E8%BC%89%E7%B0%A1%E5%8D%98%E5%AE%B6%E8%A8%88%E7%AE%A1%E7%90%86/id6755940930?uo=4",
  },
  {
    id: "6755507316",
    name: "おかんカロリー計算 - おかんが応援する楽しい食事記録アプリ",
    summary: "AI写真解析で食事記録ができ、カロリー・PFC・体重・ヘルスケア連携までまとめて管理するアプリ。",
    genre: "ヘルスケア／フィットネス",
    price: "無料",
    iconSrc: "/app-icons/6755507316.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/%E3%81%8A%E3%81%8B%E3%82%93%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC%E8%A8%88%E7%AE%97-%E3%81%8A%E3%81%8B%E3%82%93%E3%81%8C%E5%BF%9C%E6%8F%B4%E3%81%99%E3%82%8B%E6%A5%BD%E3%81%97%E3%81%84%E9%A3%9F%E4%BA%8B%E8%A8%98%E9%8C%B2%E3%82%A2%E3%83%97%E3%83%AA/id6755507316?uo=4",
  },
  {
    id: "6754470241",
    name: "らくらくパスワード手帳",
    summary: "紙の手帳のようにパスワードを見やすく整理し、4桁番号でアプリを保護するパスワード管理アプリ。",
    genre: "ユーティリティ",
    price: "無料",
    iconSrc: "/app-icons/6754470241.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/%E3%82%89%E3%81%8F%E3%82%89%E3%81%8F%E3%83%91%E3%82%B9%E3%83%AF%E3%83%BC%E3%83%89%E6%89%8B%E5%B8%B3/id6754470241?uo=4",
  },
  {
    id: "6754192045",
    name: "ご祝儀なぞり書きPro",
    summary: "テンプレを選んでなぞるだけで、ご祝儀袋の表書きをまっすぐ美しく整えられるアプリ。",
    genre: "ユーティリティ",
    price: "¥980",
    iconSrc: "/app-icons/6754192045.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/%E3%81%94%E7%A5%9D%E5%84%80%E3%81%AA%E3%81%9E%E3%82%8A%E6%9B%B8%E3%81%8Dpro/id6754192045?uo=4",
  },
  {
    id: "6754216536",
    name: "3色シンプル家計簿",
    summary: "消費・浪費・投資の3分類で、支出のムダを見える化するシンプルな家計簿アプリ。",
    genre: "ライフスタイル",
    price: "無料",
    iconSrc: "/app-icons/6754216536.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/3%E8%89%B2%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E5%AE%B6%E8%A8%88%E7%B0%BF/id6754216536?uo=4",
  },
  {
    id: "6753102930",
    name: "断捨離村",
    summary: "毎日の「1日1捨」を楽しく続け、手放したものを可視化して部屋と心を軽くする断捨離アプリ。",
    genre: "ライフスタイル",
    price: "無料",
    iconSrc: "/app-icons/6753102930.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/%E6%96%AD%E6%8D%A8%E9%9B%A2%E6%9D%91/id6753102930?uo=4",
  },
  {
    id: "6748904388",
    name: "Zen Mind Note",
    summary: "1分でA4メモを10枚書く思考トレーニングを、タイマー・テンプレ・進捗で支えるメモアプリ。",
    genre: "仕事効率化",
    price: "無料",
    iconSrc: "/app-icons/6748904388.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/zen-mind-note/id6748904388?uo=4",
  },
  {
    id: "6471965537",
    name: "chinta!",
    summary: "動画を通じて物件の内外装を確認し、スワイプ操作で家探しを進められる不動産探索アプリ。",
    genre: "ナビゲーション",
    price: "無料",
    iconSrc: "/app-icons/6471965537.jpg",
    appStoreUrl: "https://apps.apple.com/jp/app/chinta/id6471965537?uo=4",
  },
]

export default function Products() {
  return (
    <section id="products" className="border-b border-[#17120d]/10 bg-[#ebe4d8] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-10 border-b border-[#17120d]/12 pb-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="font-line text-xs font-bold uppercase tracking-[0.38em] text-[#2d75a5]">
              App Store Proof
            </p>
            <h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[#17120d] sm:text-7xl">
              ぜんぶ、
              <br />
              世に出している。
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg font-medium leading-9 text-[#17120d]/72">
              Apple公式で確認できた19アプリを、正式名称・概要・アイコン付きで掲載。生活、学習、習慣、ヘルスケア、SNS、ユーティリティまで、作って出して磨いてきた証拠です。
            </p>
            <Link
              href="https://apps.apple.com/jp/developer/tatsuya-kawauchi/id1716320513"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#e85b24] underline-offset-4 hover:underline"
            >
              App Storeですべて見る
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 overflow-hidden border border-[#17120d]/12 bg-[#f6f2ea]/75 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {apps.map((app, index) => (
            <Link
              key={app.id}
              href={app.appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[330px] flex-col border-b border-r border-[#17120d]/12 p-6 transition hover:bg-[#fffaf1]"
            >
              <div className="flex items-start justify-between gap-4">
                <img
                  src={app.iconSrc}
                  alt={`${app.name} icon`}
                  loading="eager"
                  decoding="async"
                  className="size-20 shrink-0 rounded-[22%] border border-[#17120d]/10 object-cover shadow-[0_12px_28px_rgba(23,18,13,0.10)] transition duration-300 group-hover:-translate-y-1 group-hover:rotate-2"
                />
                <div className="flex flex-col items-end gap-2 text-right">
                  <span className="font-line text-[11px] font-black tracking-[0.24em] text-[#17120d]/38">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-[#17120d]/12 px-3 py-1 text-xs font-black text-[#17120d]/62">
                    {app.price}
                  </span>
                </div>
              </div>

              <h3 className="mt-7 break-words text-[1.55rem] font-black leading-tight tracking-[-0.01em] text-[#17120d] sm:text-[1.7rem]">
                {app.name}
              </h3>
              <p className="mt-4 text-sm font-medium leading-7 text-[#17120d]/68">
                {app.summary}
              </p>
              <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                <p className="font-line text-xs font-black uppercase tracking-[0.18em] text-[#2d75a5]">
                  {app.genre}
                </p>
                <ArrowUpRight
                  className="size-5 shrink-0 text-[#e85b24] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
