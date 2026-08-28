/**
 * UnregisteredUserTries — Allows unregistered users to subscribe to discount notifications
 *
 * Features: email subscription form, discount preview, validation feedback, success state, responsive layout
 *
 * Ticket: SCRUM-1249 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface Discount {
  id: number
  title: string
  description: string
  percentage: number
  category: string
  expiresIn: string
}

const MOCK_DISCOUNTS: Discount[] = [
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Get amazing deals on summer collection',
    percentage: 30,
    category: 'Seasonal',
    expiresIn: '3 days'
  },
  {
    id: 2,
    title: 'New Customer Welcome',
    description: 'First-time buyers get exclusive discount',
    percentage: 15,
    category: 'Welcome',
    expiresIn: '7 days'
  },
  {
    id: 3,
    title: 'Flash Friday',
    description: 'Limited time offer on selected items',
    percentage: 25,
    category: 'Flash Sale',
    expiresIn: '1 day'
  },
  {
    id: 4,
    title: 'Loyalty Rewards',
    description: 'Special discount for loyal customers',
    percentage: 20,
    category: 'Loyalty',
    expiresIn: '14 days'
  },
  {
    id: 5,
    title: 'Weekend Special',
    description: 'Weekend-only exclusive discount',
    percentage: 35,
    category: 'Weekend',
    expiresIn: '2 days'
  },
  {
    id: 6,
    title: 'Clearance Sale',
    description: 'Up to 40% off on clearance items',
    percentage: 40,
    category: 'Clearance',
    expiresIn: '5 days'
  }
]

export default function UnregisteredUserTries() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitted(true)
  }

  const handleReset = () => {
    setEmail('')
    setIsSubmitted(false)
    setError('')
  }

  if (isSubmitted) {
    return (
      <section data-testid="unregisteredusertries" className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">You're Subscribed!</h2>
            <p className="text-gray-600 text-lg">
              We've sent a confirmation email to <strong>{email}</strong>
            </p>
          </div>
          <p className="text-gray-700 mb-6">
            You'll now receive exclusive discount notifications directly to your inbox. Don't miss out on amazing deals!
          </p>
          <button
            data-testid="unregisteredusertries-reset"
            onClick={handleReset}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Subscribe Another Email
          </button>
        </div>
      </section>
    )
  }

  return (
    <section data-testid="unregisteredusertries" className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Never Miss a Discount!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive discounts, flash sales, and special offers.
          </p>
        </div>

        {/* Current Discounts Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Current Active Discounts
          </h2>
          <ul data-testid="unregisteredusertries-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_DISCOUNTS.map((discount) => (
              <li
                key={discount.id}
                data-testid="unregisteredusertries-item"
                className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                    {discount.category}
                  </span>
                  <span className="text-3xl font-bold text-purple-600">
                    {discount.percentage}%
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {discount.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {discount.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Expires in {discount.expiresIn}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscription Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Get Notified About New Discounts
            </h2>
            <p className="text-gray-600">
              Join thousands of smart shoppers who save money every day
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="text"
                data-testid="unregisteredusertries-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              data-testid="unregisteredusertries-submit"
              className="w-full px-6 py-4 bg-purple-600 text-white rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Subscribe to Discount Notifications
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>No spam, unsubscribe anytime. We respect your privacy.</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Instant Alerts</h3>
            <p className="text-gray-600 text-sm">Get notified immediately when new discounts go live</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Exclusive Deals</h3>
            <p className="text-gray-600 text-sm">Access subscriber-only discounts and early bird offers</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">No Commitment</h3>
            <p className="text-gray-600 text-sm">Unsubscribe anytime with a single click, no questions asked</p>
          </div>
        </div>
      </div>
    </section>
  )
}
