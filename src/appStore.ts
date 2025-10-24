import { Store } from '@tanstack/react-store'
import {
  clearAllConversations,
  isTokenValid,
  loadConversations,
  saveConversations,
} from './utils/utils'

// Define the shape of your user data
interface User {
  id: string
  name: string
  email: string
}

interface ChatDetails {
  agentType: string
  sessionId: string | null
  messages: Array<{ role: string; content: string; id: string }>
  created_at: string
}

interface AppState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  conversations: Array<ChatDetails>
  selectedAgentType: string
  lastCreatedFormularId: string | null
  lastCreatedMarkettingInfo: any | null
  forgotPasswordEmail: string | null
}

export const appStore = new Store<AppState>({
  user: null,
  token: null,
  isAuthenticated: false,
  conversations: [],
  selectedAgentType: 'Innovative agent',
  lastCreatedFormularId: null,
  lastCreatedMarkettingInfo: null,
  forgotPasswordEmail: null,
})

// Create actions for the store
export const loginToStore = (token: string) => {
  appStore.setState((prev) => ({
    ...prev,
    token,
    isAuthenticated: true,
  }))
  // persist to localStorage
  localStorage.setItem('accessToken', JSON.stringify(token))
}
// persist to localStorage

export const logoutFromStore = () => {
  appStore.setState((prev) => ({
    ...prev,
    token: null,
    isAuthenticated: false,
  }))
  // remove from localStorage
  localStorage.removeItem('accessToken')
}

export const updateForgotPasswordEmail = (email: string) => {
  appStore.setState((prev) => ({
    ...prev,
    forgotPasswordEmail: email,
  }))
  localStorage.setItem('forgotPasswordEmail', email)
}

export const updateFormularId = (formularId: string) => {
  appStore.setState((prev) => ({
    ...prev,
    lastCreatedFormularId: formularId,
  }))
  localStorage.setItem('lastCreatedFormularId', formularId)
}

export const updateMarkettingInfo = (info: any) => {
  appStore.setState((prev) => ({
    ...prev,
    lastCreatedMarkettingInfo: info,
  }))
  localStorage.setItem('lastCreatedMarkettingInfo', JSON.stringify(info))
}

export const updateSelectedAgentType = (agentType: string) => {
  appStore.setState((prev) => ({
    ...prev,
    selectedAgentType: agentType,
  }))
}

export const createNewChatSession = (
  sessionId: string,
  agentType: string,
  created_at: string,
) => {
  appStore.setState((prev) => ({
    ...prev,
    conversations: [
      ...prev.conversations,
      { agentType, sessionId, messages: [], created_at },
    ],
  }))
}

export const addMessage = ({
  id,
  role,
  content,
  sessionId,
}: {
  id: string
  role: string
  content: string
  sessionId: string
}) => {
  appStore.setState((prev) => ({
    ...prev,
    conversations: prev.conversations.map((conv) => {
      if (conv.sessionId == sessionId) {
        const existingMessageIndex = conv.messages.findIndex(
          (msg) => msg.id === id,
        )

        if (existingMessageIndex !== -1) {
          // Update existing message
          return {
            ...conv,
            messages: conv.messages.map((msg) =>
              msg.id === id ? { ...msg, content, role } : msg,
            ),
          }
        } else {
          // Add new message
          return {
            ...conv,
            messages: [...conv.messages, { id, role, content }],
          }
        }
      }
      return conv
    }),
  }))
}

export const clearMessages = (sessionId: string) => {
  appStore.setState((prev) => ({
    ...prev,
    conversations: prev.conversations.map((conv) =>
      conv.sessionId == sessionId ? { ...conv, messages: [] } : conv,
    ),
  }))
}

export const clearAllChatSessions = () => {
  clearAllConversations()
  appStore.setState((prev) => ({
    ...prev,
    conversations: [],
  }))
}

// Helper function to get messages for a specific session
export const getMessagesBySessionId = (sessionId: string) => {
  const state = appStore.state
  const conversation = state.conversations.find(
    (conv) => conv.sessionId == sessionId,
  )
  return conversation?.messages || []
}

// Helper function to get conversation by sessionId
export const getConversationBySessionId = (sessionId: string) => {
  const state = appStore.state
  return state.conversations.find((conv) => conv.sessionId == sessionId)
}

// --- Persistence Layer ---

// Auto-save conversations when they change
appStore.subscribe((state) => {
  // Save only when conversations change
  if (state.currentVal.conversations !== state.prevVal.conversations) {
    saveConversations(state.currentVal.conversations).catch(console.error)
  }
})

// Load conversations from DB on app start
loadConversations()
  .then((data) => {
    if (data.length > 0) {
      appStore.setState((prev) => ({
        ...prev,
        conversations: data,
      }))
    }
  })
  .catch(console.error)

// On app start, check for saved user
const savedToken = localStorage.getItem('accessToken')
const formularId = localStorage.getItem('lastCreatedFormularId')
const markettingInfo = localStorage.getItem('lastCreatedMarkettingInfo')
const forgotPasswordEmail = localStorage.getItem('forgotPasswordEmail')

if (forgotPasswordEmail) {
  appStore.setState((prev) => ({
    ...prev,
    forgotPasswordEmail: forgotPasswordEmail,
  }))
}

if (formularId) {
  appStore.setState((prev) => ({
    ...prev,
    lastCreatedFormularId: formularId,
  }))
}

if (markettingInfo) {
  appStore.setState((prev) => ({
    ...prev,
    lastCreatedMarkettingInfo: JSON.parse(markettingInfo),
  }))
}

const isValidToken = savedToken ? isTokenValid(savedToken) : false
if (savedToken && isValidToken) {
  //   const parsed = JSON.parse(savedToken)
  appStore.setState((prev) => ({
    ...prev,
    token: savedToken,
    isAuthenticated: true,
  }))
} else {
  logoutFromStore()
}
