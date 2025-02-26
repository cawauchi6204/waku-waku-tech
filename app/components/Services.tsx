"use client";

import { useState, useEffect } from "react";
import { Zap, Database, Building } from "lucide-react";

const services = [
  {
    name: "業務効率化AI導入支援",
    description: "煩雑な業務プロセスをAIで自動化し、コスト削減と生産性向上を同時に実現します。",
    gradient: "from-blue-500 to-cyan-500",
    icon: <Zap className="w-6 h-6 text-blue-300" />,
    delay: "delay-100",
  },
  {
    name: "MVP実装",
    description: "最短距離でサービスを開発します。",
    gradient: "from-purple-500 to-pink-500",
    icon: <Database className="w-6 h-6 text-purple-300" />,
    delay: "delay-300",
  },
  {
    name: "自社サービス開発",
    description: "AIを使用してこれまでになかったサービスを開発します。",
    gradient: "from-pink-500 to-red-500",
    icon: <Building className="w-6 h-6 text-pink-300" />,
    delay: "delay-500",
  },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("services");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div
      className="bg-gray-900 grid-pattern relative overflow-hidden"
      id="services"
    >
      {/* サイバーパンクなグラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20"></div>

      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`lg:text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-4 py-1 rounded-full glass-effect mb-4 neon-box">
            <span className="text-sm font-medium text-white"># Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white neon-text mb-6">
            最先端AIで企業の未来を切り拓く
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            我々のAI技術で、あなたのビジネスを次のレベルへ。革新的なソリューションで競争力を高めます。
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`glass-effect-dark border border-white/10 rounded-2xl overflow-hidden hover-scale transition-all duration-700 ${
                service.delay
              } ${
                isVisible
                  ? "opacity-100 transform-none"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${service.gradient}`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {service.name}
                  </h3>
                </div>
                <div className="mt-4 text-gray-300">
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
