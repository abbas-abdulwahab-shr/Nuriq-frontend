/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useRef } from 'react'

export function GoogleSignIn({
  handleFederatedLogin,
}: {
  handleFederatedLogin: (token: string) => void
}) {
  const googleSignInDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      })

      window.google.accounts.id.renderButton(
        googleSignInDivRef.current as HTMLElement,
        { theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with' },
      )
    }
  }, [])

  //   function decodeJWT(token: string) {
  //     const base64Url = token.split('.')[1]
  //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split('')
  //         .map(function (c) {
  //           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  //         })
  //         .join(''),
  //     )
  //     return JSON.parse(jsonPayload)
  //   }

  function handleCredentialResponse(response: any) {
    // const responsePayload = decodeJWT(response.credential)
    handleFederatedLogin(response.credential)
  }

  return <div ref={googleSignInDivRef}></div>
}
