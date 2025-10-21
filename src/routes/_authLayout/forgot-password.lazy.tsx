import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { useToastFunc } from '@/Hooks/useToastFunc'
import { requestForgotPassword } from '@/services/authServices'

export const Route = createLazyFileRoute('/_authLayout/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const [form, setForm] = useState({ loginEmail: '' })
  const [displayEmailField, setDisplayEmailField] = useState(true)
  const navigate = useRouter().navigate
  const { showToast } = useToastFunc()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response: any = await requestForgotPassword(email)
      console.log('reset email response', response)

      return response.data
    },
    onSuccess: () => {
      showToast('Success', 'Reset code sent to email.', 'success')
      setDisplayEmailField(false)
    },
    onError: (reqError: any) => {
      showToast(
        'Error',
        reqError.response?.data?.detail || 'Failed to change password',
        'error',
      )
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (form.loginEmail.trim().length <= 0) {
      showToast('Error', 'Please enter a valid email address.', 'error')
      return
    }

    mutation.mutate(form.loginEmail)
  }

  const canSubmit = form.loginEmail.trim().length > 0

  return (
    <div className="flex flex-col items-center justify-center">
      {displayEmailField && (
        <div className="w-full max-w-md px-8 text-center">
          <h2 className="text-2xl font-semibold mb-1">Forgot password?</h2>
          <p className="text-gray-500 mb-6 text-sm">
            No worries, we’ll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit} className="text-left">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="loginEmail"
              >
                Email
              </label>
              <input
                type="email"
                name="loginEmail"
                id="loginEmail"
                required
                className="mt-1 w-full rounded-full bg-white border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                placeholder="Enter your email"
                value={form.loginEmail}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit || mutation.isPending}
              className={`mt-6 w-full rounded-full py-2 font-medium transition-colors ${
                canSubmit
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                  : 'bg-yellow-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {mutation.isPending ? 'Resetting...' : 'Reset password'}
            </button>
          </form>

          <button
            onClick={() => navigate({ to: '/login' })}
            className="mt-4 text-sm text-gray-600 hover:underline"
          >
            ← Back to log in
          </button>
        </div>
      )}

      {!displayEmailField && (
        <div className="w-full max-w-md px-8 text-center">
          <h2 className="text-2xl font-semibold mb-1">Check your email</h2>
          <p className="text-gray-500 mb-6 text-sm">
            We sent a password reset link to {form.loginEmail}.
          </p>
          <button
            onClick={() => navigate({ to: '/login' })}
            className="mt-4 rounded-full bg-yellow-400 px-8 py-2 text-black hover:bg-yellow-500"
          >
            Back to log in
          </button>
        </div>
      )}
    </div>
  )
}
