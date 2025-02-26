"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Company() {
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

    const element = document.getElementById("company");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div className="bg-gray-900 relative overflow-hidden" id="company">
      {/* 未来的な背景パターン */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-indigo-900/20"></div>

      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-4 py-1 rounded-full glass-effect mb-6 neon-box">
            <span className="text-sm font-medium text-white"># Company</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white neon-text mb-6">
            会社情報
          </h2>
        </div>

        <div
          className={`mt-16 glass-effect-dark p-8 rounded-2xl border border-white/10 neon-box transition-all duration-1000 delay-500 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-8 text-white neon-text">
            会社概要
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="transition-all duration-300 hover:translate-x-1">
              <p className="text-sm text-blue-300 mb-1">会社名</p>
              <p className="text-lg font-medium text-white">
                株式会社WAKU WAKU TECH
              </p>
            </div>
            <div className="transition-all duration-300 hover:translate-x-1">
              <p className="text-sm text-blue-300 mb-1">設立</p>
              <p className="text-lg font-medium text-white">2023年7月1日</p>
            </div>
            <div className="transition-all duration-300 hover:translate-x-1">
              <p className="text-sm text-blue-300 mb-1">所在地</p>
              <p className="text-lg font-medium text-white">
                埼玉県川口市栄町1-8-6
              </p>
            </div>
            <div className="transition-all duration-300 hover:translate-x-1">
              <p className="text-sm text-blue-300 mb-1">代表取締役</p>
              <p className="text-lg font-medium text-white">河内 達也</p>
            </div>
            <div className="col-span-1 md:col-span-2 transition-all duration-300 hover:translate-x-1">
              <p className="text-sm text-blue-300 mb-1">事業内容</p>
              <p className="text-lg font-medium text-white">
                AI技術を活用したサービスの開発・提供
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
