import React from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}

export const SearchBar: React.FC<Props> = ({ value, onChange, disabled }) => {
  const clearTextField = () => {
    onChange('')
  }
  return (
    <div className="w-full mb-4 relative">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed"
      />
      {value.length > 0 && (
        <span
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer inline-block p-2 fs-[18px] font-bold"
          onClick={clearTextField}
        >
          x
        </span>
      )}
    </div>
  )
}
