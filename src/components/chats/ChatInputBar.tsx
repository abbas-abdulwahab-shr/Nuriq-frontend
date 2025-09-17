import microphoneIcon from '/chatIcons/microphone.png'

export default function ChatInputBar() {
  return (
    <div className="flex items-center bg-white pt-3 pb-6 px-[64px]">
      <div className="flex flex-1 items-center rounded-full border border-gray-300 px-4 py-2">
        <button className="mr-2 text-gray-500 hover:text-gray-700">
          <img src={microphoneIcon} alt="Microphone Icon" />
        </button>
        <span
          contentEditable
          suppressContentEditableWarning
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 max-w-[663px]"
          role="textbox"
          aria-placeholder="What's a trending drink I could make using Sea Moss that Gen Z might love?"
          data-placeholder="What's a trending drink I could make using Sea Moss that Gen Z might love?"
          onFocus={(e) => {
            const el = e.currentTarget
            if (el.textContent === el.getAttribute('data-placeholder')) {
              el.textContent = ''
            }
          }}
          onBlur={(e) => {
            const el = e.currentTarget
            if (!el.textContent) {
              el.textContent = el.getAttribute('data-placeholder') || ''
            }
          }}
          ref={(el) => {
            if (el && !el.textContent) {
              el.textContent = el.getAttribute('data-placeholder') || ''
            }
          }}
        ></span>
      </div>
      <button className="ml-2 rounded-full bg-[#F4DD5F] px-4 py-2 text-gray-900 hover:bg-[#F4DD5F]">
        Send →
      </button>
    </div>
  )
}
