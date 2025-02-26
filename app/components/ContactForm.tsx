"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

    const element = document.getElementById("contact");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ここにフォーム送信のロジックを実装
    console.log("Form submitted:", { name, email, message });

    // 送信成功のシミュレーション
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // フォームをリセット
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div
      className="bg-gray-900 grid-pattern relative overflow-hidden"
      id="contact"
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
            <span className="text-sm font-medium text-white"># Contact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white neon-text mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            未来のまちづくりについて、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="glass-effect-dark border border-white/10 p-8 rounded-2xl neon-box hover-scale mb-10 lg:mb-0">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                !
              </div>
              <blockquote className="text-2xl text-white leading-relaxed">
                お問い合わせはこちらのフォームから。
                <br />
                24時間以内に返信いたします。
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

          <div
            className={`glass-effect-dark border border-white/10 rounded-2xl overflow-hidden transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform-none"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="p-8">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 pulse">
                    <svg
                      className="w-10 h-10 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    送信完了
                  </h3>
                  <p className="text-blue-100">
                    お問い合わせありがとうございます。
                    <br />
                    担当者より折り返しご連絡いたします。
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-8"
                >
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-blue-300 mb-2 transition-all duration-300 group-focus-within:text-white"
                    >
                      お名前
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full bg-transparent border-0 border-b-2 border-blue-500/30 focus:border-blue-400 focus:ring-0 text-white placeholder-blue-300/50 transition-all duration-300 hover:border-blue-400/50 py-2"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-blue-300 mb-2 transition-all duration-300 group-focus-within:text-white"
                    >
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full bg-transparent border-0 border-b-2 border-blue-500/30 focus:border-blue-400 focus:ring-0 text-white placeholder-blue-300/50 transition-all duration-300 hover:border-blue-400/50 py-2"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-blue-300 mb-2 transition-all duration-300 group-focus-within:text-white"
                    >
                      メッセージ
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="block w-full bg-transparent border-0 border-b-2 border-blue-500/30 focus:border-blue-400 focus:ring-0 text-white placeholder-blue-300/50 transition-all duration-300 hover:border-blue-400/50 py-2"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center items-center py-3 px-6 border border-blue-400 text-base font-medium rounded-full text-white bg-transparent hover:bg-blue-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 neon-box hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <Send className="mr-2 h-5 w-5" />
                      )}
                      {isSubmitting ? "送信中..." : "送信する"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
