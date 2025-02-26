import Image from "next/image"

export default function Company() {
  return (
    <div className="bg-white" id="company">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">会社情報</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src="/placeholder.jpg"
              alt="オフィス"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
            <h3 className="text-xl font-semibold mt-4 mb-2">AIによる都市開発の最前線</h3>
            <p className="text-gray-600">
              最新のAI技術を活用し、都市開発の課題解決に取り組んでいます。
              住民のニーズを的確に捉え、より住みやすい街づくりを支援します。
            </p>
          </div>
          
          <div>
            <Image
              src="/placeholder.jpg"
              alt="ワークスペース"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
            <h3 className="text-xl font-semibold mt-4 mb-2">日本全国の自治体との連携</h3>
            <p className="text-gray-600">
              全国の自治体と連携し、地域特性に合わせたスマートシティソリューションを
              提供しています。地域の課題を解決し、持続可能な発展を支援します。
            </p>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">会社概要</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">会社名</p>
              <p className="font-medium">株式会社CIVIQ</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">設立</p>
              <p className="font-medium">2020年4月1日</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">所在地</p>
              <p className="font-medium">東京都渋谷区神宮前X-X-X</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">代表取締役</p>
              <p className="font-medium">山田 太郎</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">事業内容</p>
              <p className="font-medium">AI技術を活用した都市開発支援、スマートシティソリューションの提供</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

