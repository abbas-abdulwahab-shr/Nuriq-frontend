import { useState } from 'react'
import sidebarIcon2 from '/sidebar2.png'
import sidebarIcon3 from '/sidebar3.png'
import sidebarIcon4 from '/sidebar4.png'
import sidebarIcon5 from '/sidebar5.png'
import homeIcon from '/homeIcon.png'
import sidebarSettingsIcon from '/sidebar-setting.png'
import { useRouter } from '@tanstack/react-router'

const navTopItems = [
  { icon: homeIcon, label: 'Dashboard', routeName: '/' },
  { icon: sidebarIcon2, label: 'AI Assistant', routeName: '/assistant' },
  { icon: sidebarIcon3, label: 'Marketplace', routeName: '/marketplace' },
  { icon: sidebarIcon4, label: 'Formular', routeName: '/formular' },
  { icon: sidebarIcon5, label: 'Workflow', routeName: '/workflow' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true)
  const router = useRouter()

  const handleNavClick = (routeName: string) => {
    setCollapsed((prev) => !prev)
    router.navigate({ to: routeName })
  }

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-[186px] left-0 h-[calc(100vh-186px)] transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-56'
        } flex flex-col gap-[86px]`}
      >
        {/* Nav items */}
        <ul
          className={`mt-4 space-y-2 flex flex-col justify-center bg-[#FBF4CA] border border-[#F6E37A] ${collapsed ? 'rounded-full' : 'rounded-lg'}`}
        >
          {navTopItems.map((item, index) => {
            return (
              <li
                key={index}
                title={item.label}
                onClick={() => handleNavClick(item.routeName)}
                className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} ${collapsed ? 'gap-0' : 'gap-3'} ${item.label === 'Dashboard' ? 'p-4' : 'p-2'} hover:bg-[#F4DD5F] cursor-pointer ${collapsed ? 'rounded-full' : 'rounded-lg'}`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`${item.label === 'Dashboard' ? 'w-[32px] h-[32px]' : 'w-[48px] h-[48px]'}`}
                />
                {!collapsed && <span>{item.label}</span>}
              </li>
            )
          })}
        </ul>
        <ul
          className={`mt-4 space-y-2 flex flex-col justify-center bg-[#FBF4CA] border border-[#F6E37A] ${collapsed ? 'rounded-full' : 'rounded-lg'}`}
        >
          <li
            onClick={() => handleNavClick('/settings')}
            title={`Settings`}
            className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} ${collapsed ? 'gap-0' : 'gap-3'} p-2 hover:bg-[#F4DD5F] cursor-pointer ${collapsed ? 'rounded-full' : 'rounded-lg'}`}
          >
            <img
              src={sidebarSettingsIcon}
              alt={`Settings`}
              className={`w-[48px] h-[48px]`}
            />
            {!collapsed && <span>{`Settings`}</span>}
          </li>
          <li
            onClick={() => handleNavClick('/login')}
            title={`Logout`}
            className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} ${collapsed ? 'gap-0' : 'gap-3'} p-4 hover:bg-[#F4DD5F] cursor-pointer ${collapsed ? 'rounded-full' : 'rounded-lg'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
            >
              <path
                fill="#EC221F"
                d="M118 216a6 6 0 0 1-6 6H48a6 6 0 0 1-6-6V40a6 6 0 0 1 6-6h64a6 6 0 0 1 0 12H54v164h58a6 6 0 0 1 6 6m110.24-92.24l-40-40a6 6 0 0 0-8.48 8.48L209.51 122H112a6 6 0 0 0 0 12h97.51l-29.75 29.76a6 6 0 1 0 8.48 8.48l40-40a6 6 0 0 0 0-8.48"
              />
            </svg>
            {!collapsed && <span>{`Logout`}</span>}
          </li>
        </ul>
      </div>
    </div>
  )
}
