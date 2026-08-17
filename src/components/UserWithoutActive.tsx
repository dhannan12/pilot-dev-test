/**
 * UserWithoutActive — Displays access denied message for users without active membership
 *
 * Features: membership status display, upgrade options, contact support, membership plans, account info
 *
 * Ticket: SCRUM-1036 | Branch: proto/SCRUM-1028
 */

import React from 'react'

interface MembershipPlan {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
}

interface UserInfo {
  id: string
  name: string
  email: string
  lastMembershipEnd: string
  accountStatus: string
}

const MOCK_USER: UserInfo = {
  id: 'user-001',
  name: 'John Smith',
  email: 'john.smith@example.com',
  lastMembershipEnd: '2025-12-15',
  accountStatus: 'Inactive'
}

const MOCK_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-001',
    name: 'Basic Monthly',
    price: 29.99,
    duration: 'per month',
    features: ['Full gym access', 'Locker room access', 'Free WiFi', 'Guest pass (1/month)']
  },
  {
    id: 'plan-002',
    name: 'Premium Monthly',
    price: 49.99,
    duration: 'per month',
    features: ['Full gym access', 'Locker room access', 'Free WiFi', 'Personal training (2 sessions/month)', 'Guest passes (4/month)', 'Free classes']
  },
  {
    id: 'plan-003',
    name: 'Basic Annual',
    price: 299.99,
    duration: 'per year',
    features: ['Full gym access', 'Locker room access', 'Free WiFi', 'Guest passes (2/month)', '2 months free']
  },
  {
    id: 'plan-004',
    name: 'Premium Annual',
    price: 499.99,
    duration: 'per year',
    features: ['Full gym access', 'Locker room access', 'Free WiFi', 'Personal training (4 sessions/month)', 'Unlimited guest passes', 'Free classes', 'Nutrition consultation', '2 months free']
  },
  {
    id: 'plan-005',
    name: 'Student Monthly',
    price: 19.99,
    duration: 'per month',
    features: ['Full gym access', 'Locker room access', 'Free WiFi', 'Valid student ID required']
  }
]

export default function UserWithoutActive() {
  const [selectedPlan, setSelectedPlan] = React.useState<string>('')

  return (
    <div data-testid="userwithoutactive" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Access Denied Alert */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
              <p className="text-red-700 text-lg mb-2">
                You don't have an active membership to access the member dashboard.
              </p>
              <p className="text-red-600">
                Your last membership expired on <span className="font-semibold">{MOCK_USER.lastMembershipEnd}</span>.
                Please renew or purchase a new membership to continue.
              </p>
            </div>
          </div>
        </div>

        {/* User Account Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">{MOCK_USER.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{MOCK_USER.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Status</p>
              <span className="inline-block px-3 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
                {MOCK_USER.accountStatus}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Membership Ended</p>
              <p className="font-medium text-gray-900">{MOCK_USER.lastMembershipEnd}</p>
            </div>
          </div>
        </div>

        {/* Membership Plans */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Available Membership Plans</h3>
          <div data-testid="userwithoutactive-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                data-testid="userwithoutactive-item"
                className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <h4 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-600">${plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.duration}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {selectedPlan === plan.id && (
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              data-testid="userwithoutactive-purchase"
              disabled={!selectedPlan}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                selectedPlan
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {selectedPlan ? 'Purchase Selected Plan' : 'Select a Plan'}
            </button>
            <button
              data-testid="userwithoutactive-compare"
              className="px-8 py-3 rounded-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Compare All Plans
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Need Help?</h3>
          <p className="text-gray-700 mb-4">
            Our support team is here to help you find the perfect membership plan or answer any questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              data-testid="userwithoutactive-contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </button>
            <button
              data-testid="userwithoutactive-faq"
              className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View FAQ
            </button>
            <button
              data-testid="userwithoutactive-callback"
              className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Request Callback
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <button
            data-testid="userwithoutactive-home"
            className="text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
