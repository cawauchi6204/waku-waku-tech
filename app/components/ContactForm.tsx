"use client"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    const element = document.getElementById('contact')
    if (element) observer.observe(element)
    
    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // ここにフォーム送信のロジックを実装
    console.log("Form submitted:", { name, email, message })
    
    // 送信成功のシミュレーション
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // フォームをリセット
      setTimeout(() => {
        setName("")
        setEmail("")
        setMessage("")
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="contact-gradient text-white py-24 relative overflow-hidden" id="contact">
      {/* 未来的なグリッドパターン */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className={`mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block px-4 py-1 rounded-full glass-effect mb-6 neon-box">
            <span className="text-sm font-medium text-white"># Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold neon-text-pink mb-6">Contact Us</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            未来のまちづくりについて、お気軽にお問い合わせください。
          </p>
        </div>
        
        <div className={`max-w-xl mx-auto glass-effect-dark p-10 rounded-2xl border border-white/10 neon-box transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}>
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 pulse">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">送信完了</h3>
              <p className="text-blue-100">
                お問い合わせありがとうございます。<br />
                担当者より折り返しご連絡いたします。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-blue-300 mb-2 transition-all duration-300 group-focus-within:text-white">
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
                <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-2 transition-all duration-300 group-focus-within:text-white">
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
                <label htmlFor="message" className="block text-sm font-medium text-blue-300 mb-2 transition-all duration-300 group-focus-within:text-white">
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
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send className="mr-2 h-5 w-5" />
                  )}
                  {isSubmitting ? '送信中...' : '送信する'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

