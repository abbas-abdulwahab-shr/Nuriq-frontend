import React from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="w-full mb-4">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  )
}
