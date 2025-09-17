import { ChevronLeft } from 'lucide-react'
import { useParams, useRouter } from '@tanstack/react-router'

export default function HeaderBar() {
  const router = useRouter()
  const params = useParams({ strict: false })
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => router.navigate({ to: `/assistant/${params.chatId}` })}
        className="flex items-center text-gray-700 hover:text-gray-900"
      >
        <ChevronLeft className="mr-1 h-5 w-5" />
        <div>
          <span className="font-semibold">NURIQ Assistant </span>
          <span className="">/ Insight panel</span>
        </div>
      </button>
    </div>
  )
}
