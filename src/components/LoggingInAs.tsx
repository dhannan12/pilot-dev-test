/**
 * LoggingInAs — Login form for registered users
 *
 * Features: email/password authentication, remember me option, forgot password link, form validation, mock user database
 *
 * Ticket: SCRUM-1238 | Branch: proto/SCRUM-1233
 */

import React, { useState } from 'react'

interface User {
  id: number
  email: string
  password: string
  name: string
}

const MOCK_USERS: User[] = [
  { id: 1, email: 'john.doe@example.com', password: 'password123', name: 'John Doe' },
  { id: 2, email: 'jane.smith@example.com', password: 'secure456', name: 'Jane Smith' },
  { id: 3, email: 'mike.johnson@example.com', password: 'mike2024', name: 'Mike Johnson' },
  { id: 4, email: 'sarah.williams@example.com', password: 'sarah789', name: 'Sarah Williams' },
  { id: 5, email: 'david.brown@example.com', password: 'david321', name: 'David Brown' },
  { id: 6, email: 'emily.davis@example.com', password: 'emily555', name: 'Emily Davis' },
  { id: 7, email: 'chris.wilson@example.com', password: 'chris999', name: 'Chris Wilson' },
]

export default function LoggingInAs() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (user) {
      setSuccess(true)
      setLoggedInUser(user)
      if (rememberMe) {
        console.log('Remember me option enabled')
      }
    } else {
      setError('Invalid email or password')
    }
  }

  const handleLogout = () => {
    setEmail('')
    setPassword('')
    setRememberMe(false)
    setSuccess(false)
    setLoggedInUser(null)
    setError('')
  }

  if (success && loggedInUser) {
    return (
      <div data-testid="logginginas" className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">You are now logged in as:</p>
            <p className="text-xl font-semibold text-blue-600 mt-2">{loggedInUser.name}</p>
            <p className="text-gray-500 text-sm">{loggedInUser.email}</p>
          </div>
          <button
            data-testid="logginginas-logout"
            onClick={handleLogout}
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="logginginas" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              data-testid="logginginas-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              data-testid="logginginas-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                data-testid="logginginas-remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <button
              type="button"
              data-testid="logginginas-forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            data-testid="logginginas-submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Demo Accounts Available:
          </p>
          <div data-testid="logginginas-demo-accounts" className="mt-3 space-y-2">
            {MOCK_USERS.slice(0, 3).map((user) => (
              <div
                key={user.id}
                data-testid="logginginas-demo-account"
                className="text-xs bg-gray-50 p-2 rounded"
              >
                <span className="font-semibold">{user.email}</span> / {user.password}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
