import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { changePasswordFromProfile } from '@/services/profileService'

import { PasswordInput } from '@/components/auth/PasswordInput'
import { PasswordValidationList } from '@/components/auth/PasswordValidationList'

export const Route = createLazyFileRoute('/_authLayout/reset-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [error, setError] = useState('')
  const navigate = useRouter().navigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }
  const mutation = useMutation({
    mutationFn: async (data: {
      old_password: string
      new_password: string
    }) => {
      const response: any = await changePasswordFromProfile(data)
      return response.data
    },
    onSuccess: () => {
      navigate({ to: '/' })
    },
    onError: (reqError: any) => {
      setError(reqError.response?.data?.detail || 'Failed to change password')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirm) {
      setError('Passwords do not match. Please re-enter both fields.')
      return
    }

    mutation.mutate({ old_password: '', new_password: form.password })
  }

  const isMinLength = form.password.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.password)
  const canSubmit =
    isMinLength && hasSpecialChar && form.password === form.confirm

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-8 text-center">
        <h1 className="text-2xl font-semibold mb-1">Set new password</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Your new password must be different to previously used passwords.
        </p>

        <form onSubmit={handleSubmit} className="text-left">
          <PasswordInput
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <PasswordInput
            label="Confirm password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            error={error}
          />

          <PasswordValidationList password={form.password} />

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
    </div>
  )
}
