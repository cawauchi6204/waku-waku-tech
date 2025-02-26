"use client"

import { useState } from "react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここにフォーム送信のロジックを実装
    console.log("Form submitted:", { name, email, message })
    // フォームをリセット
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="contact-gradient text-white py-16" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
        
        <div className="max-w-lg mx-auto bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                お名前
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full bg-white bg-opacity-20 border-0 border-b border-white border-opacity-30 focus:border-white focus:ring-0 text-white placeholder-white placeholder-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                メールアドレス
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-white bg-opacity-20 border-0 border-b border-white border-opacity-30 focus:border-white focus:ring-0 text-white placeholder-white placeholder-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white">
                メッセージ
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full bg-white bg-opacity-20 border-0 border-b border-white border-opacity-30 focus:border-white focus:ring-0 text-white placeholder-white placeholder-opacity-50"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                送信する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

