import React from 'react'

interface Props {
  categories: Array<string>
  selected: string
  onSelect: (c: string) => void
}

export const Filters: React.FC<Props> = ({
  categories,
  selected,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded-full px-4 py-1 border ${
            selected === cat
              ? 'bg-black text-white border-black'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
