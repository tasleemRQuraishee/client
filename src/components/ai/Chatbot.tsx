


import React, { useState } from 'react'
import axios from 'axios'

const Chatbot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [loading, setLoading] = useState(false) // <-- loading state

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { role: 'user', content: input }
    setMessages([...messages, userMsg])
    setInput('')
    setLoading(true) // start loader

    try {
      const res = await axios.post('http://localhost:4000/api/chat', {
        message: input,
      })

      const botMsg = { role: 'bot', content: res.data.reply }
      setMessages(prev => [...prev, botMsg])
    } catch (err: any) {
      console.error('❌ Chatbot error:', err.message)
      setMessages(prev => [
        ...prev,
        { role: 'bot', content: '⚠️ Failed to get response from AI.' },
      ])
    } finally {
      setLoading(false) // stop loader
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold text-white mb-4">🤖AI Chatbot</h2>

      <div className="bg-gray-900 text-white rounded-lg h-96 overflow-y-auto p-4 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span className="inline-block bg-gray-700 p-2 rounded">{msg.content}</span>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start items-center mt-2">
            <div className="loader border-4 border-blue-400 border-t-transparent w-6 h-6 rounded-full animate-spin"></div>
            <span className="ml-2 text-sm text-gray-400">Typing...</span>
          </div>
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-l bg-gray-700 text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 text-white rounded-r"
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default Chatbot
