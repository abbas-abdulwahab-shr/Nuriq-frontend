/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { apiGetClient, apiPostClient } from './apiClients'

const baseURL = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('accessToken')
// SSE function to handle streaming responses

export interface StreamCallbacks {
  onChunk?: (chunk: string) => void
  onComplete?: (fulltext: string) => void
  onError?: (error: Error) => void
}

export const fetchChatHistory = () => {
  return apiGetClient(`/chat/history`)
}

export const generateStreamingResponse = async (
  data: {
    initialPrompt: string
    agentType: string
    conversationId: number
  },
  callbacks?: StreamCallbacks,
) => {
  try {
    const response = await fetch(`${baseURL}/chat`, {
      method: 'POST',
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token!)}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: data.initialPrompt,
          },
        ],
        agent_type: data.agentType,
        conversation_id: data.conversationId,
      }),
    })
    if (!response.ok) {
      const text = await response.text()
      throw new Error(text || `Request failed with status ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error('No readable stream found in response')

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      buffer += chunk

      // emit partial chunks (line-by-line or as JSON if applicable)
      callbacks?.onChunk?.(chunk)
    }
    callbacks?.onComplete?.(buffer)
  } catch (error: any) {
    callbacks?.onError?.(error)
  }
}

export const generateInsightsFromChat = () => {
  return apiGetClient(`/insight-portal`)
}

export const createNewChatSessionId = ({ title }: { title: string }) => {
  return apiPostClient(`/chat/conversations`, { title })
}
