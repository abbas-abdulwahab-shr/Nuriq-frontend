import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import AssistantHeader from '../../../components/chats/assistantHeader'
import TabSwitcher from '../../../components/chats/TabSwitcher'
import ActionCardGrid from '../../../components/chats/ActionCardGrid'
import ChatInputBar from '../../../components/chats/ChatInputBar'
import ChatHistorySidebar from '../../../components/chats/ChatHistorySidebar'

import {
  addMessage,
  createNewChatSession,
  updateSelectedAgentType,
} from '@/appStore'

import {
  createNewChatSessionId,
  generateStreamingResponse,
} from '@/services/chatServices'

export const Route = createLazyFileRoute('/_appLayout/assistant/')({
  component: AssistantIndexPage,
})

function AssistantIndexPage() {
  const [activeTab, setActiveTab] = useState('Innovative agent')
  const [insightActive] = useState(false)
  const [typedText] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    updateSelectedAgentType(tab)
  }

  const handleEmittedText = async (text: string) => {
    // create a new session
    let sessionId = ''
    setIsLoading(true)

    try {
      const response: any = await createNewChatSessionId({
        title: text,
      })
      if (response && response.id) {
        sessionId = response.id

        createNewChatSession(sessionId, activeTab, response.created_at)
        // add user message
        addMessage({
          role: 'user',
          content: text,
          id: `user_${new Date().toISOString()}`,
          sessionId,
        })
        const assistantMessage = {
          role: 'assistant',
          content: '',
          id: `assistant_${new Date().toISOString()}`,
          sessionId,
        }
        await generateStreamingResponse(
          {
            initialPrompt: text,
            agentType: activeTab,
            conversationId: Number(sessionId),
          },
          {
            onChunk: (chunk) => {
              router.navigate({
                to: `/assistant/${sessionId}`,
              })
              if (chunk) {
                assistantMessage.content += chunk
                addMessage({ ...assistantMessage })
              }
            },
            onComplete: (fulltext) => {
              if (fulltext) {
                assistantMessage.content = fulltext
                addMessage({ ...assistantMessage })
              }
            },
            onError: (err) => {
              console.error('Stream error:', err)
            },
          },
        )
      } else {
        console.error('Failed to create chat session', response)
      }
    } catch (error) {
      console.error('Error creating chat session', error)
    } finally {
      setIsLoading(false)
    }
  }

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
            <TabSwitcher
              activeTab={activeTab}
              onChange={handleTabChange}
              disabled={false}
            />
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
          <ChatInputBar
            value={typedText}
            handleTextSubmit={handleEmittedText}
            isloading={isloading}
          />
        </section>

        {/* Right Column: Chat History */}
        <ChatHistorySidebar />
      </main>
    </div>
  )
}
