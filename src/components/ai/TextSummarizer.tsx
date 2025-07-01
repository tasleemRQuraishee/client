// src/components/TextSummarizer.tsx

import React, { useState } from 'react'
import axios from 'axios'

const TextSummarizer = () => {
  const [input, setInput] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    if (!input.trim()) return
    setLoading(true)
    setSummary('')

    try {
      const res = await axios.post('http://localhost:4000/api/summarize', { text: input })
      setSummary(res.data.summary)
    } catch (err: any) {
      console.error('❌ Summarizer error:', err.message)
      setSummary('⚠️ Failed to summarize the text.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold text-white mb-4">📝 Text Summarizer</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste or write text to summarize..."
        className="w-full h-48 p-3 rounded bg-gray-800 text-white resize-none mb-4"
      />

      <div className="flex mb-4">
        <button
          onClick={handleSummarize}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </div>

      <div className="bg-gray-900 text-white rounded-lg min-h-[120px] p-4">
        {loading && (
          <div className="flex items-center">
            <div className="loader border-4 border-blue-400 border-t-transparent w-6 h-6 rounded-full animate-spin"></div>
            <span className="ml-2 text-sm text-gray-400">Summarizing...</span>
          </div>
        )}

        {!loading && summary && (
          <div>
            <h3 className="font-semibold mb-2 text-lg">📌 Summary:</h3>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TextSummarizer
