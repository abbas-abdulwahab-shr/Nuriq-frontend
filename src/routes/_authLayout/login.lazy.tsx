import { Link, createLazyFileRoute, useRouter } from '@tanstack/react-router'
import React, { useState } from 'react'
import { Spinner } from '@chakra-ui/react'

import { GoogleSignIn } from '@/components/auth/GoogleSignIn'

import { customLogin, federatedLogin } from '@/services/authServices'
import { useToastFunc } from '@/Hooks/useToastFunc'
import { loginToStore } from '@/appStore'

export const Route = createLazyFileRoute('/_authLayout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToastFunc()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const [loginForm, setLoginForm] = useState({
    loginEmail: '',
    loginPassword: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = loginForm.loginEmail.trim()
    const password = loginForm.loginPassword.trim()
    // Simple email regex for validation

    if (!email) {
      showToast('Error', 'Please enter a valid email address.', 'error')
      return
    }

    if (!password) {
      showToast('Error', 'Please enter your password.', 'error')
      return
    }

    const payload = { email, password }
    setIsLoading(true)

    try {
      const response: any = await customLogin(payload)

      if (response) {
        showToast('Login', response.message || 'Login successful!', 'success')
        loginToStore(response.data.access_token)
        setLoginForm({
          loginEmail: '',
          loginPassword: '',
        })
        router.navigate({ to: '/' })
      }
    } catch (error: any) {
      showToast(
        'Login error',
        error.response.data.detail || 'An error occurred during login.',
        'error',
      )
      router.navigate({ to: '/' })
    } finally {
      setIsLoading(false)
    }
  }

  const federatedLoginFunc = async (token: string) => {
    if (!token) {
      showToast('Login error', 'No token received from Google.', 'error')
      return
    }

    setIsLoading(true)
    try {
      const response: any = await federatedLogin(token)

      if (response) {
        showToast('Login', response.message || 'Login successful!', 'success')
        loginToStore(response.data.access_token)
        router.navigate({ to: '/' })
      }
    } catch (error: any) {
      showToast(
        'Login error',
        error.response.data.detail || 'An error occurred during login.',
        'error',
      )
      router.navigate({ to: '/' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRouteForgotPassword = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault()
    router.navigate({ to: '/forgot-password' })
  }

  return (
    <div className="">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Log in to your account
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Please enter your details.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
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
            value={loginForm.loginEmail}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="loginPassword"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              name="loginPassword"
              id="loginPassword"
              className="w-full rounded-full bg-white border border-gray-300 px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              placeholder="••••••••"
              autoComplete="current-password"
              value={loginForm.loginPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-300"
            />
            <span className="text-gray-700">Remember me</span>
          </label>
          <a
            href="#"
            onClick={handleRouteForgotPassword}
            className="font-medium text-yellow-600 hover:underline"
          >
            Forgot password
          </a>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-yellow-400 py-2 text-lg font-semibold text-gray-900 transition hover:bg-yellow-500"
        >
          Sign in
          {isLoading && (
            <Spinner
              size="sm"
              thickness="4px"
              speed="0.65s"
              className="ml-3 inline-block align-middle"
            />
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="mx-2 text-sm text-gray-400">or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <GoogleSignIn handleFederatedLogin={federatedLoginFunc} />

      {/* Sign up link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
