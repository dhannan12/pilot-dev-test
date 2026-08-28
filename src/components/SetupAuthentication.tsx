/**
 * SetupAuthentication — User authentication and registration interface
 *
 * Features: login form, registration form, form validation, password confirmation, toggle between auth modes
 *
 * Ticket: SCRUM-1252 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface User {
  id: number
  email: string
  username: string
  password: string
  createdAt: string
}

// Mock existing users
const MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    username: 'johndoe',
    password: 'password123',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    username: 'janesmith',
    password: 'securepass456',
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    email: 'mike.wilson@example.com',
    username: 'mikewilson',
    password: 'mypassword789',
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    email: 'sarah.brown@example.com',
    username: 'sarahbrown',
    password: 'brownpass321',
    createdAt: '2024-04-05',
  },
  {
    id: 5,
    email: 'david.lee@example.com',
    username: 'davidlee',
    password: 'leepass654',
    createdAt: '2024-05-12',
  },
]

export default function SetupAuthentication() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    if (!isLogin && !username) {
      setError('Username is required for registration')
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (isLogin) {
      // Mock login validation
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      )
      if (user) {
        setSuccess(`Welcome back, ${user.username}!`)
        // Clear form
        setEmail('')
        setPassword('')
      } else {
        setError('Invalid email or password')
      }
    } else {
      // Mock registration validation
      const emailExists = MOCK_USERS.find((u) => u.email === email)
      const usernameExists = MOCK_USERS.find((u) => u.username === username)

      if (emailExists) {
        setError('Email already registered')
        return
      }

      if (usernameExists) {
        setError('Username already taken')
        return
      }

      setSuccess(`Registration successful! Welcome, ${username}!`)
      // Clear form
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setUsername('')
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setSuccess('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setUsername('')
  }

  return (
    <div data-testid="setupauthentication" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {isLogin
              ? 'Sign in to your account'
              : 'Register for a new account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                data-testid="setupauthentication-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              data-testid="setupauthentication-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              data-testid="setupauthentication-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                data-testid="setupauthentication-confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {error && (
            <div data-testid="setupauthentication-error" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div data-testid="setupauthentication-success" className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            data-testid="setupauthentication-submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              data-testid="setupauthentication-toggle"
              onClick={toggleMode}
              className="ml-2 text-indigo-600 font-medium hover:text-indigo-700"
            >
              {isLogin ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Mock users info for testing */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Test Accounts (Demo Only)
          </h3>
          <div data-testid="setupauthentication-list" className="space-y-2">
            {MOCK_USERS.slice(0, 3).map((user) => (
              <div
                key={user.id}
                data-testid="setupauthentication-item"
                className="text-xs text-gray-600 bg-gray-50 p-2 rounded"
              >
                <div className="font-medium">{user.email}</div>
                <div className="text-gray-500">Password: {user.password}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
