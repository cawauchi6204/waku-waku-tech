"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* 未来的な背景パターン */}
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            href="/"
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 neon-text hover-scale inline-block"
          >
            WAKU WAKU TECH
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase mb-6 neon-text">
              会社情報
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#company"
                  className="text-base text-blue-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  会社概要
                </Link>
              </li>
              <li>
                <Link
                  href="#vision"
                  className="text-base text-blue-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  ビジョン
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-blue-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-6 neon-text">
              サービス
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#services"
                  className="text-base text-blue-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  地域のデジタル化
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-base text-blue-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  AIデータ分析
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-base text-blue-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  スマートシティ
                </Link>
              </li>
            </ul>
          </div>

          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-sm font-semibold text-pink-400 tracking-wider uppercase mb-6 neon-text">
              お問い合わせ
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              お気軽にお問い合わせください。
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center px-6 py-2 border border-pink-400/50 text-base font-medium rounded-full text-white bg-transparent hover:bg-pink-500/20 transition-all duration-300 neon-box-pink hover-scale"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center">
          <div
            className={`flex space-x-8 mb-6 md:mb-0 transition-all duration-700 delay-700 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Link
              href="#"
              className="text-blue-400 hover:text-white transition-colors duration-300 hover-scale"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link
              href="#"
              className="text-purple-400 hover:text-white transition-colors duration-300 hover-scale"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link
              href="#"
              className="text-pink-400 hover:text-white transition-colors duration-300 hover-scale"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
          <p
            className={`text-base text-blue-100/70 transition-all duration-700 delay-900 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            &copy; 2025 WAKU WAKU TECH Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
