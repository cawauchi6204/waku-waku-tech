import Link from "next/link"

const products = [
  {
    name: "SmartSales AI",
    description: "AIを活用した営業支援ツール。顧客データを分析し、最適な営業戦略を提案します。",
    bgColor: "bg-pink-100",
    textColor: "text-pink-600",
    buttonColor: "bg-pink-500 hover:bg-pink-600",
  },
  {
    name: "AI-SEO",
    description: "AIによるSEO最適化ツール。検索エンジンのアルゴリズムを分析し、効果的なSEO戦略を提案します。",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
  },
  {
    name: "AIコンシェル",
    description: "24時間対応のAIチャットボット。住民からの問い合わせに自動で回答し、行政サービスの効率化を実現します。",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
  },
]

export default function Products() {
  return (
    <div className="bg-white" id="products">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">製品紹介</h2>
        </div>

        <div className="mt-10 space-y-12">
          {products.map((product, index) => (
            <div key={product.name} className={`${product.bgColor} rounded-lg overflow-hidden`}>
              <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-semibold ${product.textColor}`}>{product.name}</h3>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-white">New</span>
                </div>
                <div className="mt-4 text-gray-700">
                  <p>{product.description}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href="#contact"
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white ${product.buttonColor}`}
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

