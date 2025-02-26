"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bot, LineChart, MessageSquare } from "lucide-react";

const products = [
  {
    name: "AI ATELIER",
    description:
      "CURATED AI ARTWORKS Discover unique pieces created through the harmonious collaboration of artificial intelligence and human curation.",
    gradient: "from-pink-500 to-purple-500",
    icon: <LineChart className="w-6 h-6 text-pink-300" />,
    delay: "delay-100",
  },
  {
    name: "GENSTACK.dev",
    description:
      "AIツールを積極的に導入している先進的な企業を紹介するプラットフォーム",
    gradient: "from-blue-500 to-cyan-500",
    icon: <Bot className="w-6 h-6 text-blue-300" />,
    delay: "delay-300",
  },
  {
    name: "GPT Dojo",
    description: "生成AIの使い方をキャッチアップすることができるサービス",
    gradient: "from-purple-500 to-indigo-500",
    icon: <MessageSquare className="w-6 h-6 text-purple-300" />,
    delay: "delay-500",
  },
];

export default function Products() {
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

    const element = document.getElementById("products");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div
      className="bg-gray-900 grid-pattern relative overflow-hidden"
      id="products"
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
            <span className="text-sm font-medium text-white"># Products</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white neon-text mb-6">
            製品紹介
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`glass-effect-dark border border-white/10 rounded-2xl overflow-hidden hover-scale transition-all duration-700 ${
                product.delay
              } ${
                isVisible
                  ? "opacity-100 transform-none"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${product.gradient}`}></div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${product.gradient}`}
                    >
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {product.name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full glass-effect text-white neon-text">
                    New
                  </span>
                </div>
                <div className="mt-4 text-gray-300">
                  <p>{product.description}</p>
                </div>
                <div className="mt-8">
                  <Link
                    href="#contact"
                    className={`inline-flex items-center px-6 py-2 text-sm font-medium rounded-full bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all duration-300`}
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
