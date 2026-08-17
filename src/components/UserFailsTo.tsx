/**
 * UserFailsTo — Error state component demonstrating validation when user fails to select membership type
 *
 * Features: membership selection validation, error messaging, retry mechanism, form state management, user guidance
 *
 * Ticket: SCRUM-1030 | Branch: proto/SCRUM-1028
 */

import { useState } from 'react'

interface MembershipTier {
  id: string
  name: string
  price: number
  description: string
}

const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29.99,
    description: 'Access to gym equipment and facilities'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49.99,
    description: 'Includes group classes and personal training'
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 79.99,
    description: 'Full access with spa and nutrition coaching'
  },
  {
    id: 'family',
    name: 'Family',
    price: 99.99,
    description: 'Up to 4 family members with all benefits'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    price: 39.99,
    description: 'Corporate discount with flexible hours'
  }
]

export default function UserFailsTo() {
  const [selectedMembership, setSelectedMembership] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setHasAttemptedSubmit(true)

    // Validation: check if membership type is selected
    if (!selectedMembership) {
      setShowError(true)
      return
    }

    // If valid, clear error and show success
    setShowError(false)
    alert('Form submitted successfully!')
  }

  const handleMembershipSelect = (tierid: string) => {
    setSelectedMembership(tierid)
    // Clear error when user selects a membership
    if (hasAttemptedSubmit) {
      setShowError(false)
    }
  }

  const handleReset = () => {
    setSelectedMembership('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setHasAttemptedSubmit(false)
    setShowError(false)
  }

  return (
    <section data-testid="userfailsto" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join Our Gym Community
          </h1>
          <p className="text-lg text-gray-600">
            Select your membership plan and start your fitness journey
          </p>
        </div>

        {/* Error Banner - Shows when user fails to select membership */}
        {showError && (
          <div
            data-testid="userfailsto-error-banner"
            className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-md animate-pulse"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold text-red-800">
                  Membership Selection Required
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Please select a membership type before submitting the form. Choose from one of the plans below.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    data-testid="userfailsto-firstname"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    data-testid="userfailsto-lastname"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  data-testid="userfailsto-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Membership Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Select Your Membership
                <span className="text-red-500 ml-1">*</span>
              </h2>
              {hasAttemptedSubmit && !selectedMembership && (
                <p className="text-sm text-red-600 mb-3 font-medium">
                  ⚠ This field is required
                </p>
              )}
              <div data-testid="userfailsto-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MEMBERSHIP_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    data-testid="userfailsto-item"
                    onClick={() => handleMembershipSelect(tier.id)}
                    className={`
                      cursor-pointer border-2 rounded-lg p-5 transition-all duration-200
                      ${
                        selectedMembership === tier.id
                          ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105'
                          : hasAttemptedSubmit && !selectedMembership
                          ? 'border-red-300 bg-red-50 hover:border-red-400'
                          : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {tier.name}
                      </h3>
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${
                            selectedMembership === tier.id
                              ? 'border-indigo-600 bg-indigo-600'
                              : 'border-gray-300'
                          }
                        `}
                      >
                        {selectedMembership === tier.id && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600 mb-2">
                      ${tier.price}
                      <span className="text-sm text-gray-500 font-normal">/month</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                data-testid="userfailsto-reset"
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Reset Form
              </button>
              <button
                type="submit"
                data-testid="userfailsto-submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help choosing? 
            <button
              type="button"
              data-testid="userfailsto-help"
              className="text-indigo-600 hover:text-indigo-800 font-semibold ml-1 underline"
              onClick={() => alert('Contact us at support@gym.com or call 1-800-GYM-HELP')}
            >
              Contact our team
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
