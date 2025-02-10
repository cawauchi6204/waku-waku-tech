const team = [
  {
    name: "山田 太郎",
    role: "CEO & AIリサーチャー",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "佐藤 花子",
    role: "CTO & 機械学習エンジニア",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "鈴木 一郎",
    role: "データサイエンティスト",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function Team() {
  return (
    <div className="bg-gray-50" id="team">
      {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">チーム</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            私たちのエキスパートチーム
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            AI技術の最前線で活躍する専門家たちが、革新的なソリューションを提供します。
          </p>
        </div>

        <div className="mt-10">
          <ul className="space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8">
            {team.map((member) => (
              <li key={member.name}>
                <div className="space-y-4">
                  <img className="object-cover shadow-lg rounded-lg" src={member.image || "/placeholder.svg"} alt="" />
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>{member.name}</h3>
                      <p className="text-indigo-600">{member.role}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  )
}

