interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const mockMessages: Array<Message> = [
  {
    id: 1,
    role: 'user',
    content: 'Hello',
  },
  { id: 2, role: 'assistant', content: 'Hi there, how can I help you?' },
  {
    id: 3,
    role: 'user',
    content:
      "What's a trending drink I could make using Sea Moss that Gen Z might love?",
  },
  {
    id: 4,
    role: 'assistant',
    content: `✨ **Product Concept:**  
Sparkling Sea Moss Lemon Glow Tonic  
A lightly carbonated wellness drink infused with sea moss gel, fresh lemon, and monk fruit sweetener.

📌 **Why It Works for Gen Z:**  
- Aesthetic Appeal: Vibrant pale yellow with visible sparkle — TikTok-friendly.  
- Health Focus: Taps into “Glow from Within” and “Gut Health” trends.  
- Low-Calorie: Monk fruit sweetener keeps it sugar-free without sacrificing taste.  
- Vegan & Sustainable: Plant-based ingredients align with Gen Z values.`,
  },
]

export default function ConversationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-1">
        <section className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {mockMessages.map((msg) => (
              <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
            ))}
          </div>
        </section>

        {/* Optional right sidebar (chat history) can be hidden or reused if needed */}
      </main>
    </div>
  )
}

function ChatMessage({
  role,
  content,
}: {
  role: 'user' | 'assistant'
  content: string
}) {
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
