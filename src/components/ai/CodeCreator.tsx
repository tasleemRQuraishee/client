import React, { useState } from 'react'
import axios from 'axios'

const CodeCreator = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!input.trim()) return
    setLoading(true)
    setCode('')

    try {
      const res = await axios.post('http://localhost:4000/api/code', {
        prompt: input,
      })

      setCode(res.data.code)
    } catch (err: any) {
      console.error('❌ Code generation error:', err.message)
      setCode('// ⚠️ Failed to generate code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold text-white mb-4">💻AI Code Generator</h2>

      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe the code you want..."
        className="w-full p-2 rounded bg-gray-700 text-white mb-4"
      />

      <div className="flex mb-4">
        <button
          onClick={handleGenerate}
          className="bg-green-600 px-4 py-2 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Code'}
        </button>
      </div>

      <div className="bg-gray-900 text-green-300 rounded-lg p-4 h-96 overflow-y-auto">
        {loading ? (
          <div className="flex items-center">
            <div className="loader border-4 border-green-400 border-t-transparent w-6 h-6 rounded-full animate-spin"></div>
            <span className="ml-2 text-sm text-gray-400">Generating code...</span>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap">{code}</pre>
        )}
      </div>
    </div>
  )
}

export default CodeCreator
