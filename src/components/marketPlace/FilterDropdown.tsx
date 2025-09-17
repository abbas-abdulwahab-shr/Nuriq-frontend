import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Props {
  selected: string | null
  options: Array<string>
  onChange: (value: string) => void
}

export const FilterDropdown: React.FC<Props> = ({
  selected,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 hover:bg-gray-100"
      >
        <span>{selected || 'Filter by'}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-40 rounded-lg border bg-white shadow-md">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
