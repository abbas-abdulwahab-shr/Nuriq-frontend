// src/types/google.d.ts
export {}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string
            callback: (response: { credential: string }) => void
            auto_select?: boolean
            cancel_on_tap_outside?: boolean
          }) => void
          renderButton: (
            parent: HTMLElement,
            options?: {
              theme?: string
              size?: string
              shape?: string
              text?: string
              width?: number
            },
          ) => void
          prompt: () => void
          disableAutoSelect?: () => void
        }
      }
    }
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}
