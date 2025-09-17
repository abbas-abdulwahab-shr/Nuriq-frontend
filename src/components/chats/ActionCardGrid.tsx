import ActionCard from './ActionCard'

const cards = [
  {
    title: 'Conceptions',
    description: 'Help me to create a new recipe',
    id: '1',
  },
  {
    title: 'Formular Improvements',
    description: 'Help me to create a new recipe',
    id: '2',
  },
  {
    title: 'Regulatory Alerts',
    description: 'Help me to create a new recipe',
    id: '3',
  },
  {
    title: 'Ingredients search',
    description: 'Help me to create a new recipe',
    id: '4',
  },
]

export default function ActionCardGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mx-[146px] mb-[64px]">
      {cards.map((card) => (
        <ActionCard key={card.title} {...card} id={card.id} />
      ))}
    </div>
  )
}
