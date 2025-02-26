"use client";

import { useEffect, useState, useRef } from "react";

// パーティクルアニメーションのためのコンポーネント
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-400"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 5 + 1}px`,
            height: `${Math.random() * 5 + 1}px`,
            opacity: Math.random() * 0.5 + 0.3,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

// AIの脳を表現するSVGコンポーネント
const AiBrain = () => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle
        cx="100"
        cy="100"
        r="80"
        stroke="#00c3ff"
        strokeWidth="2"
        strokeDasharray="5 5"
        className="animate-spin-slow"
      />
      <circle
        cx="100"
        cy="100"
        r="60"
        stroke="#ff00aa"
        strokeWidth="2"
        strokeDasharray="10 5"
        className="animate-reverse-spin"
      />
      <path
        d="M70,100 Q100,70 130,100 Q100,130 70,100 Z"
        stroke="#00c3ff"
        strokeWidth="3"
        fill="none"
        className="pulse"
      />
      <path
        d="M60,80 Q100,40 140,80 Q100,120 60,80 Z"
        stroke="#ff00aa"
        strokeWidth="2"
        fill="none"
        className="pulse"
      />
      <circle cx="100" cy="100" r="10" fill="#00c3ff" className="pulse" />

      {/* 接続線 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 100 + 10 * Math.cos(angle);
        const y1 = 100 + 10 * Math.sin(angle);
        const x2 = 100 + 60 * Math.cos(angle);
        const y2 = 100 + 60 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i % 2 === 0 ? "#00c3ff" : "#ff00aa"}
            strokeWidth="1"
            strokeDasharray="3 3"
            className="pulse"
          />
        );
      })}
    </svg>
  );
};

// デジタル回路を表現するSVGコンポーネント
const DigitalCircuit = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0 w-full h-32 opacity-20"
    >
      <path
        d="M0,50 L50,50 L70,30 L100,70 L130,30 L160,70 L190,30 L220,70 L250,30 L280,70 L310,30 L340,70 L370,50 L400,50"
        stroke="#00c3ff"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5 5"
        className="animate-pulse"
      />
      <path
        d="M0,70 L30,70 L60,30 L90,70 L120,30 L150,70 L180,30 L210,70 L240,30 L270,70 L300,30 L330,70 L360,30 L400,30"
        stroke="#ff00aa"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5 5"
        className="animate-pulse"
      />
    </svg>
  );
};

// 3Dキューブを表現するSVGコンポーネント
const Cube3D = () => {
  return (
    <div className="relative w-32 h-32 transform-gpu animate-float">
      <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 前面 */}
        <path
          d="M32,32 L96,32 L96,96 L32,96 Z"
          fill="rgba(0, 195, 255, 0.2)"
          stroke="#00c3ff"
          strokeWidth="2"
        />
        {/* 上面 */}
        <path
          d="M32,32 L64,16 L128,16 L96,32 Z"
          fill="rgba(255, 0, 170, 0.2)"
          stroke="#ff00aa"
          strokeWidth="2"
        />
        {/* 側面 */}
        <path
          d="M96,32 L128,16 L128,80 L96,96 Z"
          fill="rgba(255, 255, 255, 0.1)"
          stroke="#ffffff"
          strokeWidth="2"
        />
        {/* 内部線 */}
        <path
          d="M48,48 L80,48 L80,80 L48,80 Z"
          stroke="#00c3ff"
          strokeWidth="1"
          strokeDasharray="2 2"
          fill="none"
        />
        <path
          d="M48,48 L64,32 L96,32 L80,48 Z"
          stroke="#ff00aa"
          strokeWidth="1"
          strokeDasharray="2 2"
          fill="none"
        />
        <path
          d="M80,48 L96,32 L96,64 L80,80 Z"
          stroke="#ffffff"
          strokeWidth="1"
          strokeDasharray="2 2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden min-h-screen pt-24 bg-gray-900"
      id="mission"
      ref={heroRef}
    >
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/40 z-0"></div>

      {/* グリッドパターン */}
      <div className="absolute inset-0 grid-pattern z-0"></div>

      {/* パーティクル */}
      <Particles />

      {/* デジタル回路 */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-0">
        <DigitalCircuit />
      </div>

      {/* マウスに追従するグロー効果 */}
      <div
        className="absolute w-96 h-96 rounded-full radial-gradient pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 195, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transform: "translate(0, 0)",
          transition: "background 0.3s ease",
        }}
      ></div>

      {/* メインコンテンツ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* テキストコンテンツ */}
          <div
            className={`md:w-1/2 text-center md:text-left mb-12 md:mb-0 opacity-0 animate-fade-in-up`}
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <div className="inline-block px-4 py-1 rounded-full glass-effect mb-6 neon-box">
              <span className="text-sm font-medium text-white">
                # WAKU WAKU TECH
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="block text-white neon-text mb-2">
                AI・テクノロジーの力で
                <br />
                ワクワクする未来を創造する
              </span>
            </h1>

            <p className="text-xl text-blue-100 max-w-xl mb-8">
              最先端のAIとテクノロジーを駆使して、人々の生活に革新と感動をもたらします。
              <span className="block mt-2 text-blue-200 font-light">
                Creating exciting futures through the power of AI and
                technology.
              </span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40">
                サービスを見る
              </button>
              <button className="px-6 py-3 rounded-lg bg-transparent border border-blue-400 text-white font-medium hover:bg-blue-900/20 transition-all duration-300">
                お問い合わせ
              </button>
            </div>
          </div>

          {/* ビジュアル要素 */}
          <div
            className={`md:w-1/2 flex justify-center relative opacity-0 scale-90 animate-fade-in-up`}
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* 中央のAI脳 */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-48 h-48 md:w-64 md:h-64">
                  <AiBrain />
                </div>
              </div>

              {/* 周囲を回る3Dキューブ */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10">
                <Cube3D />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 z-10">
                <Cube3D />
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/4 z-10">
                <Cube3D />
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 z-10">
                <Cube3D />
              </div>

              {/* 背景の光る円 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl z-0"></div>
            </div>
          </div>
        </div>

        {/* スクロールダウン指示 */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in-up`}
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          <span className="text-blue-300 text-sm mb-2">
            スクロールして詳細を見る
          </span>
          <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-blue-300 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
