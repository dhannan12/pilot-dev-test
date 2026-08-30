/**
 * MemberPaysAnnual — Annual membership fee payment interface
 *
 * Features: membership tier selection, fee calculation, payment method, confirmation
 *
 * Ticket: SCRUM-1267 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface MembershipTier {
  id: string
  name: string
  annualFee: number
  benefits: string[]
}

interface Member {
  id: string
  name: string
  email: string
  currentTier: string
}

const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'basic',
    name: 'Basic Membership',
    annualFee: 299,
    benefits: ['Access to gym facilities', 'Locker room access', 'Free parking']
  },
  {
    id: 'premium',
    name: 'Premium Membership',
    annualFee: 599,
    benefits: ['All Basic benefits', 'Group classes', 'Swimming pool access', 'Sauna access']
  },
  {
    id: 'elite',
    name: 'Elite Membership',
    annualFee: 999,
    benefits: ['All Premium benefits', 'Personal trainer sessions', 'Nutrition consultation', 'Priority booking']
  },
  {
    id: 'family',
    name: 'Family Membership',
    annualFee: 1499,
    benefits: ['Up to 4 family members', 'All Elite benefits', 'Kids club access', 'Family events']
  },
  {
    id: 'corporate',
    name: 'Corporate Membership',
    annualFee: 799,
    benefits: ['All Premium benefits', 'Corporate wellness program', 'Flexible hours', 'Team building events']
  }
]

const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com', currentTier: 'basic' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@example.com', currentTier: 'premium' },
  { id: '3', name: 'Michael Brown', email: 'mbrown@example.com', currentTier: 'elite' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@example.com', currentTier: 'family' },
  { id: '5', name: 'Robert Wilson', email: 'r.wilson@example.com', currentTier: 'corporate' }
]

const PAYMENT_METHODS = [
  { id: 'credit', name: 'Credit Card' },
  { id: 'debit', name: 'Debit Card' },
  { id: 'bank', name: 'Bank Transfer' },
  { id: 'paypal', name: 'PayPal' }
]

export default function MemberPaysAnnual() {
  const [selectedMember, setSelectedMember] = useState<string>(MOCK_MEMBERS[0].id)
  const [selectedTier, setSelectedTier] = useState<string>('basic')
  const [paymentMethod, setPaymentMethod] = useState<string>('credit')
  const [cardNumber, setCardNumber] = useState<string>('')
  const [cardExpiry, setCardExpiry] = useState<string>('')
  const [cardCvv, setCardCvv] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [paymentComplete, setPaymentComplete] = useState<boolean>(false)

  const currentMember = MOCK_MEMBERS.find(m => m.id === selectedMember)
  const currentTierData = MEMBERSHIP_TIERS.find(t => t.id === selectedTier)

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentComplete(true)
    }, 2000)
  }

  const handleReset = () => {
    setPaymentComplete(false)
    setCardNumber('')
    setCardExpiry('')
    setCardCvv('')
  }

  if (paymentComplete) {
    return (
      <div data-testid="memberpaysannual" className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Your annual membership has been renewed.</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
              <p className="text-gray-600">Member: {currentMember?.name}</p>
              <p className="text-gray-600">Membership: {currentTierData?.name}</p>
              <p className="text-gray-600">Amount Paid: ${currentTierData?.annualFee}</p>
              <p className="text-gray-600">Payment Method: {PAYMENT_METHODS.find(p => p.id === paymentMethod)?.name}</p>
            </div>
            
            <button
              data-testid="memberpaysannual-new-payment"
              onClick={handleReset}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Make Another Payment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="memberpaysannual" className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Annual Membership Payment</h1>
          <p className="text-gray-600 mb-8">Renew your annual membership and continue enjoying our facilities</p>

          <form onSubmit={handlePayment}>
            {/* Member Selection */}
            <div className="mb-6">
              <label htmlFor="member-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Member
              </label>
              <select
                id="member-select"
                data-testid="memberpaysannual-member"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {MOCK_MEMBERS.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Membership Tier Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Membership Tier
              </label>
              <div data-testid="memberpaysannual-list" className="space-y-3">
                {MEMBERSHIP_TIERS.map(tier => (
                  <div
                    key={tier.id}
                    data-testid="memberpaysannual-item"
                    onClick={() => setSelectedTier(tier.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTier === tier.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{tier.name}</h3>
                        <p className="text-2xl font-bold text-blue-600">${tier.annualFee}/year</p>
                      </div>
                      <input
                        type="radio"
                        data-testid={`memberpaysannual-tier-${tier.id}`}
                        checked={selectedTier === tier.id}
                        onChange={() => setSelectedTier(tier.id)}
                        className="mt-1"
                      />
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                id="payment-method"
                data-testid="memberpaysannual-payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {PAYMENT_METHODS.map(method => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Card Details (shown for credit/debit) */}
            {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
              <div className="mb-6 space-y-4">
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    id="card-number"
                    data-testid="memberpaysannual-card-number"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      id="card-expiry"
                      data-testid="memberpaysannual-card-expiry"
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      id="card-cvv"
                      data-testid="memberpaysannual-card-cvv"
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Membership Type:</span>
                  <span className="font-medium">{currentTierData?.name}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Billing Period:</span>
                  <span className="font-medium">Annual (12 months)</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Member:</span>
                  <span className="font-medium">{currentMember?.name}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">${currentTierData?.annualFee}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                data-testid="memberpaysannual-submit"
                disabled={isProcessing}
                className={`flex-1 py-3 px-6 rounded-lg text-white font-semibold transition-all ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isProcessing ? 'Processing...' : `Pay $${currentTierData?.annualFee}`}
              </button>
              <button
                type="button"
                data-testid="memberpaysannual-cancel"
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
