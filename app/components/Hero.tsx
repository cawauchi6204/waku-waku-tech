"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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

    const element = document.getElementById("mission");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div
      className="bg-gray-900 grid-pattern relative overflow-hidden min-h-screen pt-24"
      id="mission"
      ref={heroRef}
    >
      {/* サイバーパンクなグラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20"></div>

      {/* 背景の都市シルエット */}
      <div className="absolute inset-0 z-0 h-[50vh] overflow-hidden">
        <Image
          src="/city-skyline.svg"
          alt="City Skyline"
          fill
          style={{ objectFit: "cover", objectPosition: "bottom" }}
          priority
          className="opacity-20"
        />
      </div>

      {/* 青い塔と車 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div
            className={`transition-all duration-1000 ${
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

          <div
            className={`transition-all duration-1000 delay-300 ${
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

          <div
            className={`mb-16 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-block px-4 py-1 rounded-full glass-effect mb-4 neon-box">
              <span className="text-sm font-medium text-white"># Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white neon-text mb-6 text-center">
              AI・テクノロジーの力で、
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
                ワクワクをつくる
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto text-center">
              Creating communities through the power of AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
