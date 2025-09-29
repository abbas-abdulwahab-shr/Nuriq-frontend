interface Props {
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | Date) => void
  totalWeeks?: number
}

export default function CustomToolbar({ onNavigate, totalWeeks = 6 }: Props) {
  const weeks = Array.from({ length: totalWeeks }, (_, i) => `Week ${i + 1}`)

  return (
    <div className="rbc-toolbar flex justify-between items-center px-4 py-2 bg-white border-b">
      <div className="flex space-x-2">
        <button
          onClick={() => onNavigate('PREV')}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          ‹
        </button>
        <button
          onClick={() => onNavigate('NEXT')}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          ›
        </button>
      </div>

      <div className="flex space-x-6 text-sm font-medium">
        {weeks.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
    </div>
  )
}
