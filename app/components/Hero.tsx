"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // パーティクル効果（オプション）
    const createParticles = () => {
      const particles = document.getElementById("particles");
      if (!particles) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.classList.add(
          "absolute",
          "rounded-full",
          "bg-blue-400",
          "opacity-50"
        );
        particle.style.width = `${Math.random() * 5 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${
          Math.random() * 10 + 5
        }s linear infinite`;
        particles.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <div
      className="relative pt-24 pb-0 min-h-screen grid-pattern"
      id="mission"
      ref={heroRef}
    >
      {/* パーティクル効果 */}
      <div
        id="particles"
        className="absolute inset-0 z-0 overflow-hidden"
      ></div>

      {/* 背景の都市シルエット */}
      <div className="absolute inset-0 z-0 h-[50vh] overflow-hidden">
        <div className="cyber-gradient absolute inset-0 opacity-10"></div>
        <Image
          src="/city-skyline.svg"
          alt="City Skyline"
          fill
          style={{ objectFit: "cover", objectPosition: "bottom" }}
          priority
          className="opacity-20"
        />
      </div>

      {/* 青い塔 */}
      <div
        className={`relative z-10 flex justify-center pt-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="w-[60px] h-auto mb-2 float pulse">
          <Image
            src="/blue-tower.svg"
            alt="Blue Tower"
            width={60}
            height={160}
            priority
            className="neon-text"
          />
        </div>
      </div>

      {/* 車 */}
      <div
        className={`relative z-10 flex justify-center transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="w-[70px] h-auto mb-6 hover-scale">
          <Image
            src="/car.svg"
            alt="Car"
            width={70}
            height={35}
            priority
            className="neon-text"
          />
        </div>
      </div>

      {/* ミッションラベル */}
      <div
        className={`relative z-10 flex justify-center mb-4 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-xs font-medium text-blue-400 glass-effect px-4 py-1 rounded-full neon-box">
          # Mission
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-700 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 neon-text">
            AI・テクノロジーの力で、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
              ワクワクをつくる
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Creating communities through the power of AI.
          </p>
        </div>
      </div>
    </div>
  );
}
