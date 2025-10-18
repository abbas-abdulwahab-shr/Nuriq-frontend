import { useRouter } from '@tanstack/react-router'
import backIcon from '/chatIcons/back-icon.png'
import starsIcon from '/chatIcons/stars.png'
import AiIcons from '/chatIcons/AI-stars.png'

export default function AssistantHeader() {
  const router = useRouter()

  const handleCreateNewChat = () => {
    router.navigate({ to: '/assistant' })
  }

  const saveConversationToWorkspace = () => {
    // Implement the logic to save the conversation to the workspace
    console.log('Saving conversation to workspace...')
  }
  return (
    <header className="w-full px-6 py-4 space-y-3">
      {/* Top Row – Title */}
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">
        NURiQ Assistant
      </h1>

      {/* Bottom Row – Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 flex items-center gap-2">
            <span>Save to workspace</span>
            <img src={backIcon} alt="Back" />
          </button>
          <button
            onClick={handleCreateNewChat}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 flex items-center gap-2"
          >
            <span>Create new chat</span>
            <img src={starsIcon} alt="AI Icons" />
          </button>
        </div>

        <button
          onClick={saveConversationToWorkspace}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <span>Workspace organizer</span>
          <img src={AiIcons} alt="AI Icons" />
        </button>
      </div>
    </header>
  )
}
