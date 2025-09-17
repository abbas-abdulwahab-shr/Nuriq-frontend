const historyItems = [
  {
    id: 1,
    text: 'Can I make sugar from yeast?',
    time: '12th Aug, 2025 19:45pm',
  },
  {
    id: 2,
    text: 'Can I make sugar from yeast?',
    time: '12th Aug, 2025 19:45pm',
  },
  {
    id: 3,
    text: 'Can I make sugar from yeast?',
    time: '12th Aug, 2025 19:45pm',
  },
]

export default function ChatHistorySidebar() {
  return (
    <aside className="bg-white w-full sm:w-72 flex flex-col rounded-t-xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Chat History</h2>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Clear
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        {historyItems.map((item) => (
          <div key={item.id} className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-800">{item.text}</p>
            <p className="mt-1 text-xs text-gray-500">{item.time}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}
