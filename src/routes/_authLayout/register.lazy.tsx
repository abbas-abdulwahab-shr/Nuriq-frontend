import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'

import { customSignUp } from '@/services/authServices'
import { useToastFunc } from '@/Hooks/useToastFunc'

export const Route = createLazyFileRoute('/_authLayout/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToastFunc()
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const sanitize = (str: string) =>
    str.replace(
      /[<>&"'`]/g,
      (c) =>
        ({
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;',
          "'": '&#x27;',
          '`': '&#x60;',
        })[c] || c,
    )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const sanitizedFullname = sanitize(form.fullname.trim())
    const sanitizedEmail = sanitize(form.email.trim())

    if (!sanitizedFullname) {
      showToast('Error', 'Full name is required.', 'error')
      return
    }

    if (
      !sanitizedEmail ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(sanitizedEmail)
    ) {
      showToast('Error', 'Please enter a valid email address.', 'error')
      return
    }

    if (!form.country) {
      showToast('Error', 'Please select your country.', 'error')
      return
    }
    if (form.password.length < 6) {
      showToast('Error', 'Password must be at least 6 characters.', 'error')
      return
    }
    if (form.password !== form.confirmPassword) {
      showToast('Error', 'Passwords do not match.', 'error')
      return
    }
    // Proceed with registration logic here

    const payload = {
      full_name: sanitizedFullname,
      email: sanitizedEmail,
      password: form.password,
    }

    setIsLoading(true)

    try {
      const response = await customSignUp(payload)

      if (response) {
        showToast('Registration Successful', 'You can now log in.', 'success')
        setForm({
          fullname: '',
          email: '',
          country: '',
          password: '',
          confirmPassword: '',
        })
        router.navigate({ to: '/login' })
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      showToast(
        'Registration error',
        error.response.data.detail || 'An error occurred during registration.',
        'error',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Please fill in the details to create your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{}}
        className="w-full grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <div className="col-span-1 md:col-span-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="fullname"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className="mt-1 w-full bg-white rounded-full border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            placeholder="Enter your full name"
            value={form.fullname}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 w-full bg-white rounded-full border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="country"
          >
            Country
          </label>

          <select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="mt-1 w-full bg-white rounded-full border border-gray-300 px-4 py-2 text-gray-900 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            required
            autoComplete="country-name"
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="mt-1 w-full rounded-full bg-white border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="mt-1 w-full rounded-full bg-white border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="btn btn-primary mt-6 bg-amber-400 py-2 px-4 rounded-full"
          type="submit"
          disabled={isLoading}
        >
          Register
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
    </div>
  )
}
