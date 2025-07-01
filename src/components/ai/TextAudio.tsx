


import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TextAudio = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0)

  // Ensure voices load properly
  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices()
      if (synthVoices.length > 0) {
        const englishVoices = synthVoices.filter(voice => voice.lang.startsWith('en'))
        setVoices(englishVoices)
      }
    }

    if (typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadVoices
      loadVoices()
    }
  }, [])

  const speak = (text: string) => {
    if (!text || voices.length === 0) {
      console.warn('No voices loaded or text is empty.')
      return
    }

    window.speechSynthesis.cancel() // Cancel any current speech before speaking

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.voice = voices[currentVoiceIndex]
    utterance.rate = 1
    window.speechSynthesis.speak(utterance)
  }

  const pauseSpeaking = () => window.speechSynthesis.pause()
  const continueSpeaking = () => window.speechSynthesis.resume()
  const cancelSpeaking = () => window.speechSynthesis.cancel()

  const changeVoice = () => {
    setCurrentVoiceIndex((prevIndex) => (prevIndex + 1) % voices.length)
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:4000/api/chat', {
        message: input,
      })

      const botReply = res.data.reply
      const botMsg = { role: 'bot', content: botReply }

      setMessages(prev => [...prev, botMsg])
      speak(botReply)
    } catch (err: any) {
      const errorMsg = '⚠️ Failed to get response from AI.'
      setMessages(prev => [...prev, { role: 'bot', content: errorMsg }])
      speak(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold text-white mb-4">🗣️ AI Chatbot with Voice</h2>

      <div className="bg-gray-900 text-white rounded-lg h-96 overflow-y-auto p-4 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
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

      <div className="flex mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-l bg-gray-700 text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 text-white"
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>

      <div className="flex gap-2">
        <button onClick={pauseSpeaking} className="bg-yellow-600 px-4 py-1 rounded text-white">
          Pause
        </button>
        <button onClick={continueSpeaking} className="bg-green-600 px-4 py-1 rounded text-white">
          Continue
        </button>
        <button onClick={cancelSpeaking} className="bg-red-600 px-4 py-1 rounded text-white">
          Stop
        </button>
        <button onClick={changeVoice} className="bg-purple-600 px-4 py-1 rounded text-white">
          Change Voice
        </button>
      </div>

      {voices.length > 0 && (
        <p className="text-sm text-gray-400 mt-2">
          🎙 Current voice: <strong>{voices[currentVoiceIndex]?.name}</strong>
        </p>
      )}
    </div>
  )
}

export default TextAudio
