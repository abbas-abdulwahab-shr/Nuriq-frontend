import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import headerDisplay from '../../public/header.png'
import nuriqLogo from '../../public/Nuriq_logo.png'

const steps = [
  { number: 1, title: 'IDEA', desc: 'discover what you want' },
  { number: 2, title: 'Formulation', desc: 'Gather your gotten ideas' },
  { number: 3, title: 'Validation', desc: 'Verify your enquiry' },
  { number: 4, title: 'Label', desc: 'Put a name on it' },
  { number: 5, title: 'Launch', desc: 'Set timeline to launch' },
]

export default function Header() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <header className="flex items-center justify-between w-full px-8 py-4 bg-white shadow">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src={nuriqLogo} alt="Nuriq Logo" className="h-[90px] w-[90px]" />
      </div>

      {/* Center: Steps */}
      <img src={headerDisplay} alt="Header Display" />

      {/* Right: User Avatar */}
      <div className="flex items-center gap-2">
        <img
          src="https://via.placeholder.com/40"
          alt="user avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <ChevronDown size={18} className="text-gray-600 cursor-pointer" />
      </div>
    </header>
  )
}
