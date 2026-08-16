/**
 * UserSelectsA — Membership type selection during sign-up
 *
 * Features: membership cards, plan comparison, price display, feature highlights, selection UI
 *
 * Ticket: SCRUM-953 | Branch: proto/SCRUM-951
 */

import React, { useState } from 'react'

interface MembershipType {
  id: string
  name: string
  price: number
  billingPeriod: 'monthly' | 'annual'
  features: string[]
  recommended?: boolean
  popular?: boolean
}

const MEMBERSHIP_TYPES: MembershipType[] = [
  {
    id: 'basic',
    name: 'Basic Membership',
    price: 29.99,
    billingPeriod: 'monthly',
    features: [
      'Access to gym floor',
      'Standard equipment access',
      'Locker room access',
      'Free fitness assessment',
      'Member mobile app'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Membership',
    price: 49.99,
    billingPeriod: 'monthly',
    popular: true,
    features: [
      'All Basic features',
      'Unlimited group classes',
      'Guest privileges (2 per month)',
      'Towel service',
      'Pool and sauna access',
      '10% discount on personal training'
    ]
  },
  {
    id: 'elite',
    name: 'Elite Membership',
    price: 79.99,
    billingPeriod: 'monthly',
    recommended: true,
    features: [
      'All Premium features',
      'Unlimited guest privileges',
      'Priority class booking',
      '2 personal training sessions/month',
      'Nutrition consultation',
      'Spa services discount (20%)',
      'Free parking'
    ]
  },
  {
    id: 'student',
    name: 'Student Membership',
    price: 19.99,
    billingPeriod: 'monthly',
    features: [
      'Access to gym floor',
      'Standard equipment access',
      'Locker room access',
      'Valid student ID required',
      'Member mobile app'
    ]
  },
  {
    id: 'annual-premium',
    name: 'Annual Premium',
    price: 499.99,
    billingPeriod: 'annual',
    features: [
      'All Premium features',
      'Save $100 per year',
      'Priority support',
      'Free membership freeze (1 month/year)',
      'Exclusive member events'
    ]
  }
]

export default function UserSelectsA() {
  const [selectedMembership, setSelectedMembership] = useState<string | null>(null)
  const [step, setStep] = useState<'selection' | 'confirmation'>('selection')

  const handleSelectMembership = (membershipId: string) => {
    setSelectedMembership(membershipId)
  }

  const handleContinue = () => {
    if (selectedMembership) {
      setStep('confirmation')
    }
  }

  const handleBack = () => {
    setStep('selection')
  }

  const handleConfirm = () => {
    // In a real app, this would proceed to payment/registration
    alert(`Membership ${selectedMembership} confirmed! Proceeding to registration...`)
  }

  const selectedPlan = MEMBERSHIP_TYPES.find(m => m.id === selectedMembership)

  if (step === 'confirmation' && selectedPlan) {
    return (
      <div data-testid="userselectsa" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Confirm Your Selection
            </h1>
            <p className="text-gray-600 mb-8">
              Review your membership choice before continuing
            </p>

            <div className="border-2 border-indigo-500 rounded-lg p-6 mb-8 bg-indigo-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPlan.name}</h2>
                  {selectedPlan.popular && (
                    <span className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full mt-2">
                      Most Popular
                    </span>
                  )}
                  {selectedPlan.recommended && (
                    <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full mt-2">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-600">
                    ${selectedPlan.price}
                  </div>
                  <div className="text-sm text-gray-600">per {selectedPlan.billingPeriod === 'monthly' ? 'month' : 'year'}</div>
                </div>
              </div>

              <div className="border-t border-indigo-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Included Features:</h3>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                data-testid="userselectsa-back"
                onClick={handleBack}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Selection
              </button>
              <button
                data-testid="userselectsa-confirm"
                onClick={handleConfirm}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="userselectsa" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Membership
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the membership plan that best fits your fitness goals and lifestyle
          </p>
        </div>

        <div data-testid="userselectsa-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {MEMBERSHIP_TYPES.map((membership) => (
            <div
              key={membership.id}
              data-testid="userselectsa-item"
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                selectedMembership === membership.id
                  ? 'ring-4 ring-indigo-500 transform scale-105'
                  : 'hover:shadow-xl'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {membership.name}
                    </h3>
                    {membership.popular && (
                      <span className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                    {membership.recommended && (
                      <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <input
                    type="radio"
                    data-testid={`userselectsa-radio-${membership.id}`}
                    name="membership"
                    checked={selectedMembership === membership.id}
                    onChange={() => handleSelectMembership(membership.id)}
                    className="w-5 h-5 text-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    ${membership.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    per {membership.billingPeriod === 'monthly' ? 'month' : 'year'}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {membership.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  data-testid={`userselectsa-select-${membership.id}`}
                  onClick={() => handleSelectMembership(membership.id)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    selectedMembership === membership.id
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedMembership === membership.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            data-testid="userselectsa-continue"
            onClick={handleContinue}
            disabled={!selectedMembership}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
              selectedMembership
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Registration
          </button>
          {!selectedMembership && (
            <p className="text-sm text-gray-600 mt-3">
              Please select a membership plan to continue
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
