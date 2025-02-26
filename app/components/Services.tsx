export default function Services() {
  return (
    <div className="gradient-bg text-white" id="services">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-2xl font-bold mb-6">あなたの街のデジタルトランスフォーメーションを支援します</h2>
          <p className="text-lg max-w-3xl mx-auto">
            私たちは最先端のAI技術を活用して、地域社会のデジタル化を推進します。
            住民のニーズに合わせたスマートなソリューションで、より便利で持続可能なまちづくりをサポートしています。
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">地域のデジタル化をサポート</h3>
            <p className="text-white text-opacity-90">
              地域社会のデジタルトランスフォーメーションを支援し、
              住民サービスの向上と効率化を実現します。
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">AIを活用したデータ分析</h3>
            <p className="text-white text-opacity-90">
              地域データを分析し、住民ニーズを把握。
              効果的な政策立案と実施をサポートします。
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">スマートシティソリューション</h3>
            <p className="text-white text-opacity-90">
              IoTとAIを組み合わせた先進的なスマートシティ
              ソリューションを提供します。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

