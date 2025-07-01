import React, { useState } from 'react'
import axios from 'axios'

const ImageGenerator = () => {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    if (!input.trim()) return

    setLoading(true)
    setImageUrl('')

    try {
      const res = await axios.post('http://localhost:4000/api/image', {
        prompt: input,
      })

      setImageUrl(res.data.imageUrl)
    } catch (err: any) {
      console.error('❌ Image generation error:', err.message)
      setImageUrl('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold text-white mb-4">AI Image Generator</h2>

      <div className="bg-gray-900 text-white rounded-lg h-96 flex justify-center items-center p-4 mb-4">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="loader border-4 border-green-400 border-t-transparent w-6 h-6 rounded-full animate-spin"></div>
            <span className="mt-2 text-sm text-gray-400">Generating...</span>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Generated" className="max-h-full max-w-full rounded" />
        ) : (
          <p className="text-gray-500">Enter a prompt to generate an image.</p>
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter image prompt..."
          className="flex-1 p-2 rounded-l bg-gray-700 text-white"
        />
        <button
          onClick={generateImage}
          className="bg-green-600 px-4 text-white rounded-r"
          disabled={loading}
        >
          {loading ? '...' : 'Generate'}
        </button>
      </div>
    </div>
  )
}

export default ImageGenerator
