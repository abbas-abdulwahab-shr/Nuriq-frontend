import React from 'react'

interface Props {
  options: Array<string>
  selected: string
  onSelect: (v: string) => void
}

export const IndustryDropdown: React.FC<Props> = ({
  options,
  selected,
  onSelect,
}) => {
  return (
    <select
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-1 mb-4"
    >
      <option value="">All industry</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}
