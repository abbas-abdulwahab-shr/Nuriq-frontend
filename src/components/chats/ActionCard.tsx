import { useRouter } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'

import {
  createNewChatSessionId,
  generateStreamingResponse,
} from '@/services/chatServices'
import { addMessage, appStore, createNewChatSession } from '@/appStore'

interface ActionCardProps {
  title: string
  description: string
  defaultAiPrompt: string
  loading: boolean
  handleLoading: (loading: boolean) => void
}

export default function ActionCard({
  title,
  description,
  defaultAiPrompt,
  loading,
  handleLoading,
}: ActionCardProps) {
  const router = useRouter()

  const currentAgentType = useStore(
    appStore,
    (state) => state.selectedAgentType,
  )

  const createChatSession = async () => {
    if (loading) return
    // create a new session
    let sessionId = ''
    // const newSessionId =
    //   Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
    // sessionId = newSessionId
    // createNewChatSession(sessionId, currentAgentType)

    // add user message
    handleLoading(true)
    // addMessage({
    //   role: 'user',
    //   content: defaultAiPrompt,
    //   id: `user_${new Date().toISOString()}`,
    //   sessionId,
    // })
    try {
      const response: any = await createNewChatSessionId({
        title: defaultAiPrompt,
      })

      if (response && response.id) {
        sessionId = response.id

        createNewChatSession(sessionId, currentAgentType, response.created_at)

        addMessage({
          role: 'user',
          content: defaultAiPrompt,
          id: `user_${new Date().toISOString()}`,
          sessionId,
        })

        router.navigate({
          to: `/assistant/${sessionId}`,
        })

        const assistantMessage = {
          role: 'assistant',
          content: '',
          id: `assistant_${new Date().toISOString()}`,
          sessionId,
        }
        await generateStreamingResponse(
          {
            initialPrompt: defaultAiPrompt,
            agentType: currentAgentType,
            conversationId: Number(sessionId),
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
      } else {
        console.error('Invalid response from createNewChatSessionId', response)
      }
    } catch (error) {
      console.error('Error creating chat session:', error)
    } finally {
      handleLoading(false)
    }
  }

  return (
    <button
      disabled={loading}
      className={`py-[24px] pl-[24px] flex items-start gap-[13px] rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer max-w-[320px] ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={createChatSession}
    >
      <div className="rounded-lg p-4 not-even:bg-[#D3E5FE] flex items-start justify-center text-indigo-600 font-bold ">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.14915 7.86618C5.93533 7.22474 5.432 6.7214 4.79055 6.50758C4.13774 6.28998 4.13774 5.36659 4.79055 5.14899C5.432 4.93517 5.93534 4.43183 6.14915 3.79039C6.36675 3.13758 7.29014 3.13758 7.50775 3.79039C7.72156 4.43183 8.2249 4.93517 8.86634 5.14899C9.51916 5.36659 9.51916 6.28998 8.86634 6.50758C8.2249 6.7214 7.72156 7.22474 7.50775 7.86618C7.29014 8.51899 6.36675 8.51899 6.14915 7.86618Z"
            fill="#071971"
          />
          <path
            d="M6.29798 20.7325C5.87035 19.4496 4.86367 18.4429 3.58078 18.0153C2.27516 17.5801 2.27516 15.7333 3.58078 15.2981C4.86367 14.8705 5.87035 13.8638 6.29798 12.5809C6.73318 11.2753 8.57996 11.2753 9.01517 12.5809C9.4428 13.8638 10.4495 14.8705 11.7324 15.2981C13.038 15.7333 13.038 17.5801 11.7324 18.0153C10.4495 18.4429 9.4428 19.4496 9.01517 20.7325C8.57996 22.0381 6.73318 22.0381 6.29798 20.7325Z"
            fill="#071971"
          />
          <path
            d="M14.1857 11.2614C15.1478 11.5822 15.9028 12.3372 16.2236 13.2993C16.55 14.2786 17.9351 14.2786 18.2615 13.2993C18.5822 12.3372 19.3372 11.5822 20.2994 11.2614C21.2786 10.935 21.2786 9.54996 20.2994 9.22355C19.3372 8.90283 18.5822 8.14782 18.2615 7.18566C17.9351 6.20644 16.55 6.20644 16.2236 7.18566C15.9028 8.14782 15.1478 8.90283 14.1857 9.22355C13.2064 9.54996 13.2064 10.935 14.1857 11.2614Z"
            fill="#071971"
          />
          <path
            d="M6.14915 7.86618C5.93533 7.22474 5.432 6.7214 4.79055 6.50758C4.13774 6.28998 4.13774 5.36659 4.79055 5.14899C5.432 4.93517 5.93534 4.43183 6.14915 3.79039C6.36675 3.13758 7.29014 3.13758 7.50775 3.79039C7.72156 4.43183 8.2249 4.93517 8.86634 5.14899C9.51916 5.36659 9.51916 6.28998 8.86634 6.50758C8.2249 6.7214 7.72156 7.22474 7.50775 7.86618C7.29014 8.51899 6.36675 8.51899 6.14915 7.86618Z"
            stroke="#071971"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6.29798 20.7325C5.87035 19.4496 4.86367 18.4429 3.58078 18.0153C2.27516 17.5801 2.27516 15.7333 3.58078 15.2981C4.86367 14.8705 5.87035 13.8638 6.29798 12.5809C6.73318 11.2753 8.57996 11.2753 9.01517 12.5809C9.4428 13.8638 10.4495 14.8705 11.7324 15.2981C13.038 15.7333 13.038 17.5801 11.7324 18.0153C10.4495 18.4429 9.4428 19.4496 9.01517 20.7325C8.57996 22.0381 6.73318 22.0381 6.29798 20.7325Z"
            stroke="#071971"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14.1857 11.2614C15.1478 11.5822 15.9028 12.3372 16.2236 13.2993C16.55 14.2786 17.9351 14.2786 18.2615 13.2993C18.5822 12.3372 19.3372 11.5822 20.2994 11.2614C21.2786 10.935 21.2786 9.54996 20.2994 9.22355C19.3372 8.90283 18.5822 8.14782 18.2615 7.18566C17.9351 6.20644 16.55 6.20644 16.2236 7.18566C15.9028 8.14782 15.1478 8.90283 14.1857 9.22355C13.2064 9.54996 13.2064 10.935 14.1857 11.2614Z"
            stroke="#071971"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 text-start">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </button>
  )
}
