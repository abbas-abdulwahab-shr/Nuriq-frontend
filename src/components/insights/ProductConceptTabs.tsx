import { useState } from 'react'

const dummyProducts = [
  {
    name: 'Sparkling tonic',
    ingredients: 'Water, ginger, flavor, sodium carbonate',
    image: '/water-sparkling.jpg',
  },
  {
    name: 'Protein snack',
    ingredients: 'Peanuts, Kail, almond, vegetable oil, cashew nut, walnuts',
    image: '/protein-snack.png',
  },
]

export default function ProductConceptTabs() {
  const [tab, setTab] = useState<'shared' | 'competitor'>('shared')

  return (
    <div className="bg-white border border-[#D9D9D9] rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setTab('shared')}
          className={`px-2 py-3 rounded-xl text-sm text-[#312C13] font-medium 
          ${tab === 'shared' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
        >
          Shared product concept
        </button>
        <button
          onClick={() => setTab('competitor')}
          className={`px-2 py-3 rounded-xl text-sm text-[#312C13] font-medium 
          ${tab === 'competitor' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
        >
          Company competitor
        </button>
      </div>
      <div className="space-y-4">
        {dummyProducts.map((p) => (
          <div key={p.name} className="flex items-center space-x-4">
            <img
              src={p.image}
              alt={p.name}
              className="h-[80px] w-[112px] rounded-lg object-cover"
            />
            <div>
              <div className="font-semibold mb-4">{p.name}</div>
              <p className="text-sm text-gray-600">
                Key ingredients : {p.ingredients}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
