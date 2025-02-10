const caseStudies = [
  {
    title: "製造業の予知保全",
    description: "AIを活用して機械の故障を予測し、ダウンタイムを80%削減しました。",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "金融機関の不正検知",
    description: "機械学習モデルにより、不正取引の検出率を95%向上させました。",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "小売業の需要予測",
    description: "AIによる需要予測で在庫管理を最適化し、売上を30%増加させました。",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CaseStudies() {
  return (
    <div id="case-studies">
      {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"> */}
        {/* <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">事例紹介</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">成功事例</p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            私たちのAIソリューションがどのようにビジネスを変革したか、実際の事例をご紹介します。
          </p>
        </div> */}

        {/* <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {caseStudies.map((study) => (
              <div key={study.title} className="relative">
                <div className="h-64 w-full overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full object-cover"
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                  />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">{study.title}</h3>
                <p className="mt-2 text-base text-gray-500">{study.description}</p>
              </div>
            ))}
          </div>
        </div> */}
      {/* </div> */}
    </div>
  )
}

