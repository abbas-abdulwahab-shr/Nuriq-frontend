import { useState } from 'react'
import ActionCard from './ActionCard'

const cards = [
  {
    title: 'Conceptions',
    description: 'Help me to create a new recipe',
    defaultAiPrompt:
      'I want to develop a new product based on trending natural needs. Can you suggest concepts, key ingredients and steps to create a unique and successful recipe?., let discuss',
  },
  {
    title: 'Formular Improvements',
    description: 'Discuss improvements to recipe',
    defaultAiPrompt:
      'I want to improve an existing product formula. Can you suggest enhancements based on what I currently have, key ingredients, and steps to optimize the recipe?., let discuss',
  },
  {
    title: 'Regulatory Alerts',
    description: 'Let discuss regulatory alerts',
    defaultAiPrompt:
      'I want to stay updated on regulatory changes. Can we discuss and you provide insights and alerts related to product regulations?, let discuss',
  },
  {
    title: 'Ingredients search',
    description: 'Help me search for ingredients',
    defaultAiPrompt:
      'I want to search for specific ingredients. Can you assist me in finding the right ones based on my requirements?, let discuss',
  },
]

export default function ActionCardGrid() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading)
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mx-[146px] mb-[64px]">
      {cards.map((card) => (
        <ActionCard
          key={card.title}
          {...card}
          loading={isLoading}
          handleLoading={handleLoading}
        />
      ))}
    </div>
  )
}
