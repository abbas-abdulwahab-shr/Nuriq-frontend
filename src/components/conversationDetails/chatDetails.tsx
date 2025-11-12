/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useParams } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { appStore } from '@/appStore'

export default function ConversationPage() {
  const params = useParams({ strict: false })
  const sessionId = params.chatId

  const conversations = useStore(appStore, (state) =>
    state.conversations.filter(
      (unit) => unit.sessionId?.toString() === sessionId,
    ),
  )

  return (
    <div className="flex flex-col min-h-[460px] bg-white">
      <main className="flex flex-1">
        <section className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {conversations[0].messages?.map((msg, index) => (
              <ChatMessage key={index} role={msg.role} content={msg.content} />
            ))}
          </div>
        </section>

        {/* Optional right sidebar (chat history) can be hidden or reused if needed */}
      </main>
    </div>
  )
}

function ChatMessage({ role, content }: { role: string; content: string }) {
  const isUser = role === 'user'
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${!isUser ? 'border-b border-gray-200 pb-4' : ''}`}
    >
      <div
        className={`prose max-w-lg whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed
        ${
          isUser
            ? 'bg-gray-200 text-gray-800 rounded-br-none'
            : 'bg-transparent text-gray-800 rounded-bl-none'
        }`}
      >
        {/* Tailwind Typography plugin gives nice markdown style */}
        <MarkdownText text={content} />
      </div>
    </div>
  )
}

/* Simple markdown-ish renderer using dangerouslySetInnerHTML for bold & lists */
function MarkdownText({ text }: { text: string }) {
  // Very basic replacements for **bold** and newlines to <br/>;
  // for real markdown use a lib like react-markdown.
  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
