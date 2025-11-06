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
  const reqformData = new FormData()
  reqformData.append('message', data.initialPrompt)
  reqformData.append('agent_type', data.agentType.toLowerCase().split(' ')[0])
  reqformData.append('conversation_id', data.conversationId.toString())
  try {
    const response = await fetch(`${baseURL}/chat`, {
      method: 'POST',
      headers: {
        Accept: 'text/event-stream',
        Authorization: `Bearer ${JSON.parse(token!)}`,
      },
      body: reqformData,
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

export const generateInsightsFromChat = ({
  conversationId,
}: {
  conversationId: number
}) => {
  return apiGetClient(`/insight-portal`, {
    params: { conversation_id: conversationId },
  })
}

export const createNewChatSessionId = ({ title }: { title: string }) => {
  return apiPostClient(`/chat/conversations`, { title })
}
