import { Cpu, Database, BarChart } from "lucide-react"

const services = [
  {
    name: "AI開発",
    description: "最先端の機械学習アルゴリズムを使用して、ビジネスに特化したAIソリューションを開発します。",
    icon: Cpu,
  },
  {
    name: "データ分析",
    description: "大規模データセットから有意義な洞察を抽出し、データ駆動型の意思決定をサポートします。",
    icon: Database,
  },
  {
    name: "予測分析",
    description: "過去のデータと高度なアルゴリズムを使用して、将来のトレンドと結果を予測します。",
    icon: BarChart,
  },
]

export default function Services() {
  return (
    <div className="bg-white" id="services">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">サービス</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            AI技術で事業を変革
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            最先端のAI技術を活用し、お客様のビジネスに革新的なソリューションを提供します。
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {services.map((service) => (
              <div key={service.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{service.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{service.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

