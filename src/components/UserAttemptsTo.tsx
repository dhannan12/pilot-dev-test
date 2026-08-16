/**
 * UserAttemptsTo — Membership sign-up form with payment method validation
 *
 * Features: membership plan selection, payment method options, form validation, error handling, responsive design
 *
 * Ticket: SCRUM-954 | Branch: proto/SCRUM-951
 */

import { useState } from 'react'

interface MembershipPlan {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
}

interface PaymentMethod {
  id: string
  type: string
  label: string
  icon: string
}

const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29.99,
    duration: 'month',
    features: ['Access to gym floor', 'Locker room access', 'Open 6am-10pm']
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 49.99,
    duration: 'month',
    features: ['All Basic features', 'Group classes', 'Sauna & steam room', 'Open 24/7']
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 79.99,
    duration: 'month',
    features: ['All Standard features', 'Personal trainer session', 'Nutrition consulting', 'Spa access', 'Guest passes']
  },
  {
    id: 'annual-basic',
    name: 'Annual Basic',
    price: 299.99,
    duration: 'year',
    features: ['All Basic features', 'Save 15%', 'No commitment after year']
  },
  {
    id: 'annual-premium',
    name: 'Annual Premium',
    price: 799.99,
    duration: 'year',
    features: ['All Premium features', 'Save 20%', 'Priority booking', 'Free merchandise']
  }
]

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'credit-card', type: 'card', label: 'Credit Card', icon: '💳' },
  { id: 'debit-card', type: 'card', label: 'Debit Card', icon: '💳' },
  { id: 'paypal', type: 'digital', label: 'PayPal', icon: '🅿️' },
  { id: 'apple-pay', type: 'digital', label: 'Apple Pay', icon: '🍎' },
  { id: 'google-pay', type: 'digital', label: 'Google Pay', icon: '🔷' }
]

export default function UserAttemptsTo() {
  const [selectedPlan, setSelectedPlan] = useState<string>('standard')
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!selectedPayment) {
      newErrors.payment = 'Please select a payment method to complete your membership sign-up'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttemptedSubmit(true)

    if (validateForm()) {
      setShowSuccess(true)
      // Reset form
      setTimeout(() => {
        setShowSuccess(false)
        setFirstName('')
        setLastName('')
        setEmail('')
        setSelectedPayment('')
        setAttemptedSubmit(false)
        setErrors({})
      }, 3000)
    }
  }

  const selectedPlanData = MEMBERSHIP_PLANS.find(p => p.id === selectedPlan)

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">Gym Membership Sign-Up</h1>
            <p className="text-indigo-100 text-center mt-2">Join our fitness community today</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-8 mt-6">
              <div className="flex items-center">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <p className="text-green-800 font-semibold">Membership Sign-Up Complete!</p>
                  <p className="text-green-700 text-sm">Welcome to our gym family. Check your email for confirmation.</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    data-testid="userattemptsto-firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    data-testid="userattemptsto-lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    data-testid="userattemptsto-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Membership Plan Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                Choose Your Plan
              </h2>
              <div data-testid="userattemptsto-plan-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MEMBERSHIP_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    data-testid="userattemptsto-plan-item"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? 'border-indigo-600 bg-indigo-50 shadow-md'
                        : 'border-gray-200 hover:border-indigo-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{plan.name}</h3>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === plan.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                        }`}
                      >
                        {selectedPlan === plan.id && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-indigo-600">${plan.price}</span>
                      <span className="text-gray-600 text-sm">/{plan.duration}</span>
                    </div>
                    <ul className="space-y-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                Select Payment Method *
              </h2>
              
              {/* Payment Error - Prominent display when attempted without selection */}
              {attemptedSubmit && errors.payment && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⚠️</span>
                    <div>
                      <p className="text-red-800 font-semibold">Payment Method Required</p>
                      <p className="text-red-700 text-sm">{errors.payment}</p>
                    </div>
                  </div>
                </div>
              )}

              <div data-testid="userattemptsto-payment-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.id}
                    data-testid="userattemptsto-payment-item"
                    onClick={() => {
                      setSelectedPayment(method.id)
                      if (errors.payment) {
                        setErrors({ ...errors, payment: '' })
                      }
                    }}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-indigo-600 bg-indigo-50 shadow-md'
                        : errors.payment && attemptedSubmit
                        ? 'border-red-300 hover:border-red-400'
                        : 'border-gray-200 hover:border-indigo-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{method.icon}</span>
                        <span className="font-semibold text-gray-800">{method.label}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                        }`}
                      >
                        {selectedPayment === method.id && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            {selectedPlanData && (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membership Plan:</span>
                    <span className="font-semibold text-gray-800">{selectedPlanData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Billing Period:</span>
                    <span className="font-semibold text-gray-800">{selectedPlanData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className={`font-semibold ${selectedPayment ? 'text-gray-800' : 'text-red-600'}`}>
                      {selectedPayment ? PAYMENT_METHODS.find(m => m.id === selectedPayment)?.label : 'Not selected'}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total:</span>
                      <span className="text-2xl font-bold text-indigo-600">${selectedPlanData.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                data-testid="userattemptsto-submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Complete Membership Sign-Up
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              * Required fields
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
