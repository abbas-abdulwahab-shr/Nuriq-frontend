// import { useEffect, useState } from 'react'
import { useStore } from '@tanstack/react-store'
import { useRouter } from '@tanstack/react-router'

// import { fetchChatHistory } from '@/services/chatServices'
// import { useToastFunc } from '@/Hooks/useToastFunc'
import { appStore, clearAllChatSessions } from '@/appStore'

export default function ChatHistorySidebar() {
  const allConversations = useStore(appStore, (state) => state.conversations)
  const router = useRouter()

  // const [conversationHistory, setConversationHistory] = useState([])
  // const [loadingHistory, setLoadingHistory] = useState(false)
  // const { showToast } = useToastFunc()

  // useEffect(() => {
  //   const fetchChatHistoryFunc = async () => {
  //     setLoadingHistory(true)
  //     try {
  //       const response: any = await fetchChatHistory()
  //       console.log(response)
  //       const formattedHistory = response.data?.map((item: any) => ({
  //         id: item.id,
  //         text:
  //           item.messages[0].content.length > 40
  //             ? item.messages[0].content.slice(0, 40) + '...'
  //             : item.messages[0].content,
  //         time: new Date(item.created_at).toLocaleString(),
  //       }))
  //       setConversationHistory(formattedHistory)
  //     } catch (error: any) {
  //       console.error(error.response.data.detail)
  //       showToast('Error', error.response.data.detail, 'error')
  //     } finally {
  //       setLoadingHistory(false)
  //     }
  //   }
  //   fetchChatHistoryFunc()
  // }, [])

  const handleroutingToChat = (sessionId: string) => {
    router.navigate({ to: `/assistant/${sessionId}` })
  }

  const handleChatDeletion = () => {
    clearAllChatSessions()
    router.navigate({ to: `/assistant` })
  }

  return (
    <aside className="bg-white w-full sm:w-72 flex flex-col rounded-t-xl max-h-[680px] overflow-y-scroll sticky top-[148px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Chat History</h2>
        {allConversations.length > 0 && (
          <button
            role="button"
            onClick={handleChatDeletion}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>
      <div className="overflow-y-auto flex-1">
        {allConversations.length > 0 &&
          allConversations
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            )
            .map((item: any, index) => (
              <div
                key={index}
                className="px-4 py-3 border-b border-gray-100"
                onClick={() => handleroutingToChat(item.sessionId)}
              >
                <p className="text-xs text-gray-800">
                  {item.messages[item.messages.length - 1].content.length > 80
                    ? item.messages[item.messages.length - 1].content.slice(
                        0,
                        80,
                      ) + '...'
                    : item.messages[item.messages.length - 1].content}
                </p>
                <p className="mt-1 text-xs text-gray-500 font-black">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString()
                    : 'from server'}
                </p>
              </div>
            ))}
        {allConversations.length === 0 && (
          <div className="px-4 py-3 text-gray-500">
            No chat history available.
          </div>
        )}
      </div>
    </aside>
  )
}
