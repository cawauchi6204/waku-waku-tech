"use client";

import { useState, useEffect } from "react";
import { Sparkles, Zap } from "lucide-react";

export default function Vision() {
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

    const element = document.getElementById("vision");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div className="bg-gray-900 relative overflow-hidden" id="vision">
      {/* 未来的な背景パターン */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30"></div>

      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block px-4 py-1 rounded-full glass-effect mb-6 neon-box">
              <span className="text-sm font-medium text-white"># Vision</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 neon-text">
                AIの活用で
                <br />
                人々の暮らしを
                <br />
                もっとワクワクさせる。
              </span>
            </h2>
            <p className="mt-6 text-xl text-blue-100 leading-relaxed">
              私たちは、AIとテクノロジーの力で地域社会の課題を解決し、
              より便利で持続可能な未来を創造することを目指しています。
              住民一人ひとりのニーズに寄り添い、地域全体の発展に貢献します。
            </p>
            <div className="mt-12 space-y-8">
              <div
                className={`flex items-start transition-all duration-700 delay-300 ${
                  isVisible
                    ? "opacity-100 transform-none"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-500/20 text-white neon-box">
                    <Sparkles className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-white">
                    地域社会のデジタル化
                  </h3>
                  <p className="mt-3 text-lg text-blue-100/80">
                    最新のテクノロジーを活用し、地域社会のデジタルトランスフォーメーションを推進します。
                  </p>
                </div>
              </div>
              <div
                className={`flex items-start transition-all duration-700 delay-500 ${
                  isVisible
                    ? "opacity-100 transform-none"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-purple-500/20 text-white neon-box">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-white">
                    持続可能な都市開発
                  </h3>
                  <p className="mt-3 text-lg text-blue-100/80">
                    環境に配慮したスマートシティソリューションで、持続可能な都市開発を支援します。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`mt-16 lg:mt-0 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="glass-effect-dark border border-white/10 p-8 rounded-2xl neon-box hover-scale">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                "
              </div>
              <blockquote className="text-2xl text-white leading-relaxed">
                テクノロジーの進化は、人々の生活をより豊かにするためにあります。私たちは常に人間中心の視点を持ち、
                テクノロジーを通じて社会課題の解決に取り組んでいます。
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50"></div>
                <p className="mx-4 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  WAKU WAKU TECH
                </p>
                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
