/**
 * AccessingTheMembers — Members Area access gate for guest users
 *
 * Features: login/signup prompts, members-only benefits preview, exclusive content teasers, call-to-action buttons, guest user messaging
 *
 * Ticket: SCRUM-1234 | Branch: proto/SCRUM-1233
 */

import React, { useState } from 'react'

interface MemberBenefit {
  id: number
  title: string
  description: string
  icon: string
}

const memberBenefits: MemberBenefit[] = [
  {
    id: 1,
    title: 'Exclusive Content',
    description: 'Access premium articles, tutorials, and resources available only to members',
    icon: '📚',
  },
  {
    id: 2,
    title: 'Community Forum',
    description: 'Connect with other members, share ideas, and get support from the community',
    icon: '💬',
  },
  {
    id: 3,
    title: 'Monthly Webinars',
    description: 'Join live sessions with industry experts and get your questions answered',
    icon: '🎓',
  },
  {
    id: 4,
    title: 'Member Discounts',
    description: 'Save 20% on all courses and 15% on partner services and products',
    icon: '💰',
  },
  {
    id: 5,
    title: 'Early Access',
    description: 'Be the first to try new features and access beta programs before public release',
    icon: '⚡',
  },
  {
    id: 6,
    title: 'Resource Library',
    description: 'Download templates, tools, and guides to accelerate your projects',
    icon: '📦',
  },
  {
    id: 7,
    title: 'Member Badge',
    description: 'Display your membership status with a special badge on your profile',
    icon: '🏆',
  },
]

export default function AccessingTheMembers() {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login handling
    console.log('Login attempted with:', email)
  }

  const handleSignup = () => {
    // Mock signup handling
    console.log('Redirecting to signup...')
  }

  return (
    <div data-testid="accessing-the-members" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Members Area
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our exclusive community to unlock premium content, connect with like-minded individuals, and access member-only benefits
          </p>
        </div>

        {/* Access Gate Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-12 text-white text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-3xl font-bold mb-3">Members Only Area</h2>
            <p className="text-lg text-indigo-100 mb-8">
              This content is exclusively available to our members. Sign in to continue or create an account to get started.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                data-testid="accessing-the-members-login"
                onClick={() => setShowLoginForm(!showLoginForm)}
                className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-md min-w-[200px]"
              >
                {showLoginForm ? 'Hide Login' : 'Sign In'}
              </button>
              <button
                data-testid="accessing-the-members-signup"
                onClick={handleSignup}
                className="px-8 py-3 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-900 transition-colors shadow-md min-w-[200px]"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Login Form (conditional) */}
          {showLoginForm && (
            <div className="px-8 py-8 bg-gray-50 border-t border-gray-200">
              <form onSubmit={handleLogin} className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Sign in to your account</h3>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    data-testid="accessing-the-members-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    data-testid="accessing-the-members-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  data-testid="accessing-the-members-submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </button>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    data-testid="accessing-the-members-forgot-password"
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Member Benefits Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            What You Get as a Member
          </h2>
          
          <div data-testid="accessing-the-members-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberBenefits.map((benefit) => (
              <div
                key={benefit.id}
                data-testid="accessing-the-members-item"
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl px-8 py-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Get instant access to all member benefits. Join thousands of members already enjoying exclusive content and community support.
            </p>
            <button
              data-testid="accessing-the-members-cta-signup"
              onClick={handleSignup}
              className="px-10 py-4 bg-white text-indigo-600 font-bold text-lg rounded-lg hover:bg-indigo-50 transition-colors shadow-xl"
            >
              Get Started Today
            </button>
            <p className="text-sm text-indigo-200 mt-4">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
