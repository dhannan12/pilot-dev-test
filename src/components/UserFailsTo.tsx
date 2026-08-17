/**
 * UserFailsTo — Error state component demonstrating validation when user fails to select a payment method
 *
 * Features: payment method selection validation, error messaging, retry mechanism, form state management, user guidance
 *
 * Ticket: SCRUM-1031 | Branch: proto/SCRUM-1028
 */

import { useState } from 'react'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string
}

interface OrderSummary {
  id: string
  item: string
  price: number
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    description: 'Visa, Mastercard, Amex',
    icon: '💳'
  },
  {
    id: 'debit-card',
    name: 'Debit Card',
    description: 'Direct bank payment',
    icon: '🏦'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Fast and secure',
    icon: '🅿️'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    description: 'One-tap payment',
    icon: '🍎'
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    description: 'Quick checkout',
    icon: '🔷'
  }
]

const ORDER_ITEMS: OrderSummary[] = [
  { id: '1', item: 'Premium Gym Membership', price: 49.99 },
  { id: '2', item: 'Personal Training Session (3x)', price: 120.00 },
  { id: '3', item: 'Locker Rental', price: 15.00 },
  { id: '4', item: 'Gym Bag & Towel Set', price: 35.00 },
  { id: '5', item: 'Registration Fee', price: 25.00 }
]

export default function UserFailsTo() {
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const [billingName, setBillingName] = useState<string>('')
  const [billingEmail, setBillingEmail] = useState<string>('')
  const [billingAddress, setBillingAddress] = useState<string>('')
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)

  const totalAmount = ORDER_ITEMS.reduce((sum, item) => sum + item.price, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setHasAttemptedSubmit(true)

    // Validation: check if payment method is selected
    if (!selectedPayment) {
      setShowError(true)
      return
    }

    // If valid, clear error and show success
    setShowError(false)
    alert('Payment submitted successfully!')
  }

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId)
    // Clear error when user selects a payment method
    if (hasAttemptedSubmit) {
      setShowError(false)
    }
  }

  const handleReset = () => {
    setSelectedPayment('')
    setBillingName('')
    setBillingEmail('')
    setBillingAddress('')
    setHasAttemptedSubmit(false)
    setShowError(false)
  }

  return (
    <section data-testid="userfailsto" className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-lg text-gray-600">
            Review your order and select a payment method
          </p>
        </div>

        {/* Error Banner - Shows when user fails to select payment method */}
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
                  Payment Method Required
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Please select a payment method before completing your purchase. Choose from one of the options below.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit}>
                {/* Billing Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Billing Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="billingName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="billingName"
                        data-testid="userfailsto-billingname"
                        type="text"
                        value={billingName}
                        onChange={(e) => setBillingName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="billingEmail"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="billingEmail"
                        data-testid="userfailsto-billingemail"
                        type="email"
                        value={billingEmail}
                        onChange={(e) => setBillingEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="billingAddress"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Billing Address
                      </label>
                      <textarea
                        id="billingAddress"
                        data-testid="userfailsto-billingaddress"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                        placeholder="Enter your billing address"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Select Payment Method
                    <span className="text-red-500 ml-1">*</span>
                  </h2>
                  {hasAttemptedSubmit && !selectedPayment && (
                    <p className="text-sm text-red-600 mb-3 font-medium">
                      ⚠ This field is required
                    </p>
                  )}
                  <div data-testid="userfailsto-list" className="space-y-3">
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        data-testid="userfailsto-item"
                        onClick={() => handlePaymentSelect(method.id)}
                        className={`
                          cursor-pointer border-2 rounded-lg p-4 transition-all duration-200 flex items-center
                          ${
                            selectedPayment === method.id
                              ? 'border-teal-600 bg-teal-50 shadow-lg'
                              : hasAttemptedSubmit && !selectedPayment
                              ? 'border-red-300 bg-red-50 hover:border-red-400'
                              : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                          }
                        `}
                      >
                        <div className="text-3xl mr-4">{method.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {method.description}
                          </p>
                        </div>
                        <div
                          className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${
                              selectedPayment === method.id
                                ? 'border-teal-600 bg-teal-600'
                                : 'border-gray-300'
                            }
                          `}
                        >
                          {selectedPayment === method.id && (
                            <svg
                              className="w-4 h-4 text-white"
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
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Complete Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                {ORDER_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start pb-3 border-b border-gray-200"
                  >
                    <span className="text-sm text-gray-700 flex-1 pr-2">
                      {item.item}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-gray-300 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-teal-600">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  All prices in USD. Taxes calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help with payment? 
            <button
              type="button"
              data-testid="userfailsto-help"
              className="text-teal-600 hover:text-teal-800 font-semibold ml-1 underline"
              onClick={() => alert('Contact us at billing@gym.com or call 1-800-GYM-BILL')}
            >
              Contact support
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
