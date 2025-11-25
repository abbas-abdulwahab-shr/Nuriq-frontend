import { useEffect, useId, useRef, useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import microphoneIcon from '/chatIcons/microphone.png'
import micStopIcon from '/chatIcons/micStop.png'

import { useToastFunc } from '@/Hooks/useToastFunc'

// Extend Window interface for speech recognition

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
  const recognitionRef = useRef<any | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [convertedText, setConvertedText] = useState('')
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
      handleTextSubmition()
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
    }, 300)
  }

  const handleClearInput = () => {
    if (spanRef.current) {
      spanRef.current.innerText = ''
    }
  }

  const startListening = () => {
    const SpeechRecognitionrend =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognitionrend) {
      showToast(
        'Error',
        'Speech Recognition is not supported in this browser.',
        'error',
      )
      return
    }

    const recognition = new SpeechRecognitionrend()
    recognition.lang = 'en-US' // Change language if needed
    recognition.interimResults = false // only final results
    recognition.continuous = true
    // recognition.maxAlternatives = 1
    recognitionRef.current = recognition

    let finalTranscript = ''

    recognition.onresult = (event: any) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interim += transcript
        }
      }

      // const speechText = event.results[0][0].transcript
      // spanRef.current!.focus()
      // spanRef.current!.innerText = '' // Clear existing text
      // spanRef.current!.innerText = speechText
      setConvertedText(finalTranscript + interim)
      // spanRef.current!.innerText = finalTranscript + interim
      // handleTextSubmit(speechText)
      // stopListening()
    }

    recognition.onerror = (err: any) => {
      console.error('Speech recognition error:', err)
      showToast(
        'Error',
        'Speech Recognition is not supported in this browser.',
        'error',
      )
      setIsListening(false)
    }

    // recognition.onspeechend = () => {
    //   recognition.start()
    //   setIsListening(true)
    // }

    recognition.start()
    setIsListening(true)
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
      spanRef.current!.focus()
      spanRef.current!.innerText = '' // Clear existing text
      spanRef.current!.innerText = convertedText
    }
  }

  return (
    <div
      id={id}
      className="flex items-center bg-white pt-3 pb-6 px-[64px] sticky bottom-0"
    >
      <div className="flex flex-1 items-center rounded-full border border-gray-300 px-4 py-2">
        <button
          className="mr-2 text-gray-500 hover:text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          onClick={isListening ? stopListening : startListening}
        >
          <img
            src={isListening ? micStopIcon : microphoneIcon}
            alt="Microphone Icon"
            className="w-5 h-5"
          />
          <span>{isListening && 'Listening...........................'}</span>
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
