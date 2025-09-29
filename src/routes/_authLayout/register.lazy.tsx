import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    // e.g., validate and send data to API
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
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            required
            className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            placeholder="Enter your full name"
            value={form.fullname}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>

          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            required
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="btn btn-primary mt-6 bg-amber-400 py-2 px-4 rounded-full"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  )
}
