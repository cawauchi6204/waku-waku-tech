"use client";

import { useState, useEffect } from "react";
import { Zap, Database, Building } from "lucide-react";

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
      className="cyber-gradient text-white relative overflow-hidden"
      id="services"
    >
      {/* グリッドパターンオーバーレイ */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`lg:text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-4 py-1 rounded-full glass-effect mb-4 neon-box">
            <span className="text-sm font-medium"># Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text-pink">
            最先端AIで企業の未来を切り拓く
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            我々のAI技術で、あなたのビジネスを次のレベルへ。革新的なソリューションで競争力を高めます。
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div
            className={`glass-effect-dark p-8 rounded-2xl border border-blue-400/20 hover-scale transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-500/20 mb-6 neon-box">
              <Zap className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              業務効率化AI導入支援
            </h3>
            <p className="text-white text-opacity-90 leading-relaxed">
              煩雑な業務プロセスをAIで自動化し、
              コスト削減と生産性向上を同時に実現します。
            </p>
          </div>

          <div
            className={`glass-effect-dark p-8 rounded-2xl border border-purple-400/20 hover-scale transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-purple-500/20 mb-6 neon-box">
              <Database className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              MVP実装
            </h3>
            <p className="text-white text-opacity-90 leading-relaxed">
              最短距離でサービスを開発します。
            </p>
          </div>

          <div
            className={`glass-effect-dark p-8 rounded-2xl border border-pink-400/20 hover-scale transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-pink-500/20 mb-6 neon-box">
              <Building className="w-7 h-7 text-pink-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-300">
              自社サービス開発
            </h3>
            <p className="text-white text-opacity-90 leading-relaxed">
              AIを使用してこれまでになかったサービスを開発します。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
