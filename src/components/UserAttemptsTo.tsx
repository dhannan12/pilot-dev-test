/**
 * UserAttemptsTo — Displays membership portal access screen when user is not logged in
 *
 * Features: authentication prompt, locked portal sections display, login form, membership benefits preview, access denied message
 *
 * Ticket: SCRUM-1243 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface PortalSection {
  id: number
  name: string
  description: string
  icon: string
}

const PORTAL_SECTIONS: PortalSection[] = [
  {
    id: 1,
    name: 'Member Dashboard',
    description: 'View your membership status, points, and rewards',
    icon: '📊'
  },
  {
    id: 2,
    name: 'Exclusive Deals',
    description: 'Access members-only discounts and promotions',
    icon: '🎁'
  },
  {
    id: 3,
    name: 'Order History',
    description: 'Track your past orders and manage returns',
    icon: '📦'
  },
  {
    id: 4,
    name: 'VIP Events',
    description: 'Get early access to sales and special events',
    icon: '🌟'
  },
  {
    id: 5,
    name: 'Personal Stylist',
    description: 'Connect with your dedicated fashion consultant',
    icon: '👔'
  },
  {
    id: 6,
    name: 'Loyalty Rewards',
    description: 'Redeem points and track your loyalty benefits',
    icon: '💎'
  }
]

export default function UserAttemptsTo() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login handler - no actual authentication
    alert('Login functionality requires backend integration')
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <span className="text-4xl">🔒</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Membership Portal Access Required
          </h1>
          <p className="text-xl text-gray-600">
            Please log in to access your membership benefits and exclusive features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Login Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In to Continue</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username or Email
                </label>
                <input
                  id="username"
                  type="text"
                  data-testid="userattemptsto-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  data-testid="userattemptsto-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    data-testid="userattemptsto-remember"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  data-testid="userattemptsto-forgot"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                data-testid="userattemptsto-submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  data-testid="userattemptsto-signup"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign up now
                </button>
              </p>
            </div>
          </div>

          {/* Benefits Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Join Our Membership?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Exclusive Discounts</h3>
                  <p className="text-sm text-gray-700">Save up to 30% on all purchases</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                  <p className="text-sm text-gray-700">On all orders over $50</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Priority Support</h3>
                  <p className="text-sm text-gray-700">24/7 dedicated customer service</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Early Access</h3>
                  <p className="text-sm text-gray-700">Be first to shop new collections</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Locked Portal Sections */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Membership Portal Features</h2>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              🔒 Login Required
            </span>
          </div>
          
          <div data-testid="userattemptsto-list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTAL_SECTIONS.map((section) => (
              <div
                key={section.id}
                data-testid="userattemptsto-item"
                className="relative border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors opacity-60"
              >
                <div className="absolute top-4 right-4 text-2xl">🔒</div>
                <div className="text-4xl mb-3">{section.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{section.name}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
                <div className="mt-4">
                  <button
                    data-testid="userattemptsto-section"
                    disabled
                    className="text-sm text-gray-400 cursor-not-allowed"
                  >
                    Access Locked →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Having trouble signing in?{' '}
            <button
              data-testid="userattemptsto-help"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
