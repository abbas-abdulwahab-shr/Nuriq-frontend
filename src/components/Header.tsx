import { ChevronDown } from 'lucide-react'
// import brainIcon from '/brain-icon.png'
// import bulbIcon from '/bulb-icon.png'
// import funnelIcon from '/funnel-icon.png'
// import launchIcon from '/launch-icon.png'
// import labelIcon from '/label-icon.png'
import nuricLogo from '/nuriq-logo.png'
import profileImg from '/profileImg.jpg'

import { useUserDetails } from '@/Hooks/useUser'

// const steps = [
//   { title: 'IDEA', desc: 'discover what you want', icon: bulbIcon },
//   {
//     title: 'Formulation',
//     desc: 'Gather your gotten ideas',
//     icon: funnelIcon,
//   },
//   {
//     title: 'Validation',
//     desc: 'Verify your enquiry',
//     icon: brainIcon,
//   },
//   { title: 'Label', desc: 'Put a name on it', icon: labelIcon },
//   {
//     title: 'Launch',
//     desc: 'Set timeline to launch',
//     icon: launchIcon,
//   },
// ]

export default function Header() {
  const { userDetails } = useUserDetails()
  return (
    <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-[48px] pt-[20px] pb-[16px] bg-white shadow">
      {/* Left: Logo */}
      <div className="flex flex-col items-center">
        <img src={nuricLogo} alt="nuric logo" className="h-[64px] w-[64px]" />
        <span className="font-extrabold text-xl text-[#000000]">NURiQ</span>
      </div>

      {/* Center: Steps */}

      {/* Right: User Avatar */}

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={profileImg}
            alt="user avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <ChevronDown size={18} className="text-gray-600 cursor-pointer" />
        </div>
        <span>{userDetails?.full_name}</span>
      </div>
      {/* 
      <img src={line1} alt="" className="absolute left-[20%]" /> */}
    </header>
  )
}
