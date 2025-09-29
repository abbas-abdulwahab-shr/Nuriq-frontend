import { createLazyFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export const Route = createLazyFileRoute('/_authLayout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: replace with your auth logic
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
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full rounded-full border border-gray-300 px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              placeholder="••••••••"
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
          <a href="#" className="font-medium text-yellow-600 hover:underline">
            Forgot password
          </a>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-yellow-400 py-2 text-lg font-semibold text-gray-900 transition hover:bg-yellow-500"
        >
          Sign in
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="mx-2 text-sm text-gray-400">or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Google sign-in */}
      <button
        onClick={() => {}}
        className="flex w-full items-center justify-center space-x-3 rounded-full border border-gray-300 py-2 text-gray-700 hover:bg-gray-50"
      >
        <FcGoogle className="text-xl" />
        <span>Sign in with Google</span>
      </button>

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
