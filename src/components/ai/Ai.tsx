import React from 'react'
import { useNavigate } from 'react-router-dom'

const Ai = () => {
  const navigate = useNavigate()

  const handleCardClick = (path: string) => {
    navigate(path)
  }

  const cards = [
    {
      title: 'Chatbot',
      description: 'Talk to our smart assistant',
      path: '/chatbot',
    },
    {
      title: 'Image Generator',
      description: 'Generate images from text',
      path: '/image-generator',
    },
    {
      title: 'Text Summarizer',
      description: 'Summarize long articles',
      path: '/text-summarizer',
    },
    {
      title: 'Code Creator',
      description: 'Generate code with AI',
      path: '/code-creator',
    },
    {
      title: 'Text Audio',
      description: 'Generate audio with AI',
      path: '/text-audio',
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">AI Tools Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white rounded-2xl p-6 shadow-md transition duration-300"
            onClick={() => handleCardClick(card.path)}
          >
            <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
            <p className="text-sm text-gray-300">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ai
