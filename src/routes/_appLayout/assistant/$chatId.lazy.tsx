import { useState } from 'react'
import {
  createLazyFileRoute,
  useParams,
  useRouter,
} from '@tanstack/react-router'
import ChatInputBar from '../../../components/chats/ChatInputBar'
import ChatHistorySidebar from '../../../components/chats/ChatHistorySidebar'
import AssistantHeader from '../../../components/chats/assistantHeader'
import TabSwitcher from '../../../components/chats/TabSwitcher'
import ChatMessage from '../../../components/conversationDetails/chatDetails'

export const Route = createLazyFileRoute('/_appLayout/assistant/$chatId')({
  component: ChatDetailsComponent,
})

function ChatDetailsComponent() {
  const [activeTab, setActiveTab] = useState('Innovative agent')
  const [insightActive] = useState(true)
  const params = useParams({ strict: false })
  const router = useRouter()
  // move activeTab and insightActive to context or global state if needed across pages
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <AssistantHeader />

      {/* Main Content */}
      <main className="flex flex-1 gap-4">
        {/* Left Column: Chat Section */}
        <section className="flex-1 flex flex-col">
          {/* Sticky Top Bar */}
          <div className="flex items-center justify-between bg-[#FAF9F6] px-6 py-4 rounded-t-xl">
            <TabSwitcher activeTab={activeTab} onChange={setActiveTab} />
            <button
              disabled={!insightActive}
              onClick={() =>
                router.navigate({
                  to: `/assistant/insight/${params.chatId}`,
                })
              }
              className="text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Insight panel →
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-10 bg-white max-h-[780px]">
            <ChatMessage />
          </div>
          <ChatInputBar />
        </section>

        {/* Right Column: Chat History */}
        <ChatHistorySidebar />
      </main>
    </div>
  )
}
