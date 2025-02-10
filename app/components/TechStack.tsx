const technologies = [
  { name: "Next.js", description: "Reactフレームワーク" },
  { name: "TypeScript", description: "静的型付け言語" },
  { name: "Tailwind CSS", description: "CSSフレームワーク" },
  { name: "React", description: "UIライブラリ" },
  { name: "Go", description: "サーバーサイドプログラミング言語" },
  { name: "Dify", description: "AIワークフロー" },
]

export default function TechStack() {
  return (
    <div className="bg-gray-50" id="tech-stack">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">技術スタック</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            最先端のAI技術を活用
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            私たちは常に最新の技術を取り入れ、効率的で革新的なソリューションを提供します。
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {technologies.map((tech) => (
              <div key={tech.name} className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">{tech.name}</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">{tech.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

