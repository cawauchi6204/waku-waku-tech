export default function Vision() {
  return (
    <div className="bg-gray-100" id="vision">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              都市のテクノロジーで<br />
              人々の暮らしを<br />
              もっと豊かに。
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              私たちは、AIとテクノロジーの力で地域社会の課題を解決し、
              より便利で持続可能な未来を創造することを目指しています。
              住民一人ひとりのニーズに寄り添い、地域全体の発展に貢献します。
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    01
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">地域社会のデジタル化</h3>
                  <p className="mt-2 text-base text-gray-500">
                    最新のテクノロジーを活用し、地域社会のデジタルトランスフォーメーションを推進します。
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    02
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">持続可能な都市開発</h3>
                  <p className="mt-2 text-base text-gray-500">
                    環境に配慮したスマートシティソリューションで、持続可能な都市開発を支援します。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <blockquote className="text-xl italic text-gray-700">
                "テクノロジーの進化は、人々の生活をより豊かにするためにあります。私たちは常に人間中心の視点を持ち、
                テクノロジーを通じて社会課題の解決に取り組んでいます。"
              </blockquote>
              <div className="mt-4">
                <p className="text-base font-semibold text-gray-900">CIVIQチーム</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

