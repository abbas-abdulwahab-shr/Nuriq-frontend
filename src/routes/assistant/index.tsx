import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import AssistantHeader from '../../components/chats/assistantHeader'
import TabSwitcher from '../../components/chats/TabSwitcher'
import ActionCardGrid from '../../components/chats/ActionCardGrid'
import ChatInputBar from '../../components/chats/ChatInputBar'
import ChatHistorySidebar from '../../components/chats/ChatHistorySidebar'

export const Route = createFileRoute('/assistant/')({
  component: AssistantIndexPage,
})

function AssistantIndexPage() {
  const [activeTab, setActiveTab] = useState('Innovative agent')
  const [insightActive, setInsightActive] = useState(false)

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
              className="text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Insight panel →
            </button>
          </div>

          {/* Greeting & Action Cards */}
          <div className="flex-1 overflow-y-auto px-6 py-10 bg-white max-h-[780px]">
            <div className="text-center">
              <p className="text-gray-600 text-lg mt-[64px] mb-6">
                Hi there, 👋
              </p>
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-[48px]">
                How can I help you
              </h2>
            </div>
            <ActionCardGrid />
          </div>

          {/* Chat Input */}
          <ChatInputBar />
        </section>

        {/* Right Column: Chat History */}
        <ChatHistorySidebar />
      </main>
    </div>
  )
}
