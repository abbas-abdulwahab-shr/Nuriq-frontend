import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  error?: string
}

export const PasswordInput = ({
  label,
  value,
  onChange,
  name,
  error,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false)

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className={`relative`}>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full rounded-full border px-4 py-2 pr-10 bg-white focus:outline-none ${
            error
              ? 'border-red-500'
              : 'border-gray-300 focus:ring-1 focus:ring-yellow-400'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}
