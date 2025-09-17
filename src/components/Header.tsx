import { ChevronDown } from 'lucide-react'
import brainIcon from '/brain-icon.png'
import bulbIcon from '/bulb-icon.png'
import funnelIcon from '/funnel-icon.png'
import launchIcon from '/launch-icon.png'
import labelIcon from '/label-icon.png'
import line1 from '/Line1.png'
import nuricLogo from '/nuriq-logo.png'
import profileImg from '/profileImg.jpg'

const steps = [
  { title: 'IDEA', desc: 'discover what you want', icon: bulbIcon },
  {
    title: 'Formulation',
    desc: 'Gather your gotten ideas',
    icon: funnelIcon,
  },
  {
    title: 'Validation',
    desc: 'Verify your enquiry',
    icon: brainIcon,
  },
  { title: 'Label', desc: 'Put a name on it', icon: labelIcon },
  {
    title: 'Launch',
    desc: 'Set timeline to launch',
    icon: launchIcon,
  },
]

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-[48px] pt-[20px] pb-[16px] bg-white shadow">
      {/* Left: Logo */}
      <div className="flex flex-col items-center">
        <img src={nuricLogo} alt="nuric logo" className="h-[64px] w-[64px]" />
        <span className="font-extrabold text-xl text-[#000000]">NURiQ</span>
      </div>

      {/* Center: Steps */}

      <div className="relative flex items-center gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-center">
            <div className="absolute -top-[4px] -left-[10px] bg-black h-[36px] w-[36px] flex items-center justify-center text-white text-[16px] font-medium rounded-full ">
              {index + 1}
            </div>
            {/* Step Circle */}
            <div
              className="px-[4px] pt-[8px] flex justify-center items-start rounded-full transition h-[102px] w-[102px] bg-white/30 backdrop-blur-xs text-gray-600 border border-gray-300 z-10 shadow-lg"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={step.icon}
                  alt=""
                  className="mb-1.5 h-[18px] w-[18px]"
                />
                <span className="text-[13px] font-medium text-[#1A1A1A]">
                  {step.title}
                </span>
                <span className="text-[10px] text-center leading-[160%] text-[#6C6C6C]">
                  {step.desc}
                </span>
              </div>
            </div>

            {/* Connector Line */}
          </div>
        ))}
      </div>

      {/* Right: User Avatar */}
      <div className="flex items-center gap-2">
        <img
          src={profileImg}
          alt="user avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <ChevronDown size={18} className="text-gray-600 cursor-pointer" />
      </div>

      <img src={line1} alt="" className="absolute left-[20%]" />
    </header>
  )
}
