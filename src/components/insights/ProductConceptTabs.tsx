import { useState } from 'react'

export default function ProductConceptTabs({
  productConcept,
  competitors,
}: {
  productConcept?: any
  competitors?: any
}) {
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
      {tab === 'shared' && (
        <div className="space-y-4">
          {productConcept?.map((p: any) => (
            <div key={p.title} className="flex items-center space-x-4">
              <img
                src={p.image}
                alt={p.title}
                className="h-[80px] w-[112px] rounded-lg object-cover"
              />
              <div>
                <div className="font-semibold mb-4">{p.title}</div>
                <p className="text-sm text-gray-600">
                  {p.key_ingredients.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'competitor' && (
        <div className="space-y-4">
          {competitors?.map((name: string, idx: number) => (
            <div
              key={name}
              className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 text-yellow-800 font-bold text-lg">
                {idx + 1}
              </div>
              <div className="font-medium text-gray-800 text-base">{name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
