import { useEffect, useId, useRef } from 'react'
import { Spinner } from '@chakra-ui/react'
import microphoneIcon from '/chatIcons/microphone.png'

import { useToastFunc } from '@/Hooks/useToastFunc'

interface ChatInputBarProps {
  handleTextSubmit: (text: string) => void
  value: string
  isloading: boolean
}

export default function ChatInputBar({
  isloading,
  value,
  handleTextSubmit,
}: ChatInputBarProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const id = useId()
  const { showToast } = useToastFunc()

  useEffect(() => {
    if (spanRef.current && spanRef.current.innerText !== value) {
      spanRef.current.innerText = value
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // maybe submit or something here
    }
  }

  const handleTextSubmition = () => {
    const text = spanRef.current?.innerText
    if (
      text === 'type your message here...' ||
      text!.trim().length === 0 ||
      !text
    ) {
      showToast('Error', 'Please enter a message before sending.', 'error')
      return
    }

    handleTextSubmit(text)
    setTimeout(() => {
      handleClearInput()
    }, 200)
  }

  const handleClearInput = () => {
    if (spanRef.current) {
      spanRef.current.innerText = ''
    }
  }
  return (
    <div id={id} className="flex items-center bg-white pt-3 pb-6 px-[64px]">
      <div className="flex flex-1 items-center rounded-full border border-gray-300 px-4 py-2">
        <button className="mr-2 text-gray-500 hover:text-gray-700">
          <img src={microphoneIcon} alt="Microphone Icon" />
        </button>
        <span
          contentEditable
          ref={spanRef}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 max-w-[663px]"
          role="textbox"
          aria-placeholder="type your message here..."
          data-placeholder="type your message here..."
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
        ></span>
      </div>
      <button
        disabled={isloading}
        onClick={handleTextSubmition}
        className="ml-2 rounded-full bg-[#F4DD5F] px-4 py-2 text-gray-900 hover:bg-[#F4DD5F]"
      >
        Send →
        {isloading && (
          <Spinner
            size="sm"
            thickness="4px"
            speed="0.65s"
            className="ml-3 inline-block align-middle"
          />
        )}
      </button>
    </div>
  )
}
