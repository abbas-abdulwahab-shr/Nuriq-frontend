interface TabSwitcherProps {
  activeTab: string
  onChange: (tab: string) => void
}

export default function TabSwitcher({ activeTab, onChange }: TabSwitcherProps) {
  const tabs = ['Innovative agent', 'Compliance agent']

  return (
    <div className="flex space-x-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-2 text-[18px] transition-colors rounded-t-lg ${
            activeTab === tab
              ? 'text-[#312C13] font-bold'
              : 'text-[#6C6C6C] font-medium hover:text-[#312C13]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
