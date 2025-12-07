/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useState } from 'react'
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router'

import ChatInputBar from '../../../components/chats/ChatInputBar'
import ChatHistorySidebar from '../../../components/chats/ChatHistorySidebar'
import AssistantHeader from '../../../components/chats/assistantHeader'
import TabSwitcher from '../../../components/chats/TabSwitcher'
import ChatMessage from '../../../components/conversationDetails/chatDetails'
import { generateStreamingResponse } from '@/services/chatServices'

import {
  addMessage,
  getConversationBySessionId,
  updateSelectedAgentType,
} from '@/appStore'

type ChatSearchParams = {
  suggestionText: string
}

export const Route = createFileRoute('/_appLayout/assistant/$chatId')({
  component: ChatDetailsComponent,
  validateSearch: (searchParams: ChatSearchParams) => {
    return {
      suggestionText: searchParams.suggestionText ?? undefined,
    }
  },
})

function ChatDetailsComponent() {
  const params = useParams({ strict: false })
  const { suggestionText } = Route.useSearch()

  // console.log(suggestionText)

  const currentConversation = getConversationBySessionId(params.chatId!)
  const [activeTab, setActiveTab] = useState(
    currentConversation?.agentType ?? 'Innovative agent',
  )
  const [typedText, setTypedText] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const [actionTracker, setActionTracker] = useState(0)
  const router = useRouter()

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    updateSelectedAgentType(tab)
  }

  const handleEmittedText = async (text: string) => {
    setIsLoading(true)
    addMessage({
      role: 'user',
      content: text,
      id: `user_${new Date().toISOString()}`,
      sessionId: params.chatId!,
    })
    try {
      const assistantMessage = {
        role: 'assistant',
        content: '',
        id: `assistant_${new Date().toISOString()}`,
        sessionId: params.chatId!,
      }
      await generateStreamingResponse(
        {
          initialPrompt: text,
          agentType: currentConversation?.agentType ?? '',
          conversationId: Number(params.chatId),
        },
        {
          onChunk: (chunk) => {
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
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (suggestionText && suggestionText.trim() !== '' && actionTracker === 0) {
      setTypedText(suggestionText)
      setActionTracker((prev) => prev + 1)
    }
  }, [suggestionText, actionTracker])

  // move activeTab and insightActive to context or global state if needed across pages
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <AssistantHeader />

      {/* Main Content */}
      <main className="flex flex-1 gap-4">
        {/* Left Column: Chat Section */}
        <section className="flex-1 flex flex-col relative">
          {/* Sticky Top Bar */}
          <div className="flex items-center justify-between bg-[#FAF9F6] px-6 py-4 rounded-t-xl">
            <TabSwitcher
              activeTab={activeTab}
              onChange={handleTabChange}
              disabled={true}
            />
            <button
              disabled={(currentConversation?.messages.length ?? 0) <= 1}
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

          <div className="overflow-y-auto px-6 py-10 bg-white">
            <ChatMessage />
          </div>
          {(currentConversation?.messages.length ?? 0) > 0 && (
            <ChatInputBar
              value={typedText}
              isloading={isloading}
              handleTextSubmit={handleEmittedText}
            />
          )}
        </section>

        {/* Right Column: Chat History */}
        <ChatHistorySidebar />
      </main>
    </div>
  )
}
