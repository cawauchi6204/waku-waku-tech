import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative" id="mission">
      {/* 背景の都市シルエット */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/city-skyline.svg"
          alt="City Skyline"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      {/* メインコンテンツ */}
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="/blue-tower.svg"
              alt="Blue Tower"
              width={80}
              height={160}
              priority
            />
          </div>
          <div className="flex justify-center mb-8">
            <Image
              src="/car.svg"
              alt="Car"
              width={100}
              height={50}
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI・テクノロジーの力で、<br />
            ミライのまちをつくる。
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Creating communities through the power of AI.
          </p>
        </div>
      </div>
    </div>
  )
}

