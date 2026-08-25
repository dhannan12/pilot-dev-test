/**
 * UserAttemptsTo — Reward redemption interface showing insufficient purchase validation
 *
 * Features: Reward display, purchase tracking, redemption validation, error messaging, status feedback
 *
 * Ticket: SCRUM-1153 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface Reward {
  id: string
  name: string
  description: string
  requiredPurchases: number
  available: boolean
}

interface UserStatus {
  userId: string
  userName: string
  totalPurchases: number
}

const mockRewards: Reward[] = [
  {
    id: 'r1',
    name: 'Free Coffee',
    description: 'Redeem for any size coffee',
    requiredPurchases: 5,
    available: true
  },
  {
    id: 'r2',
    name: 'Free Pastry',
    description: 'Choose any pastry from our bakery',
    requiredPurchases: 8,
    available: true
  },
  {
    id: 'r3',
    name: 'Free Sandwich',
    description: 'Any sandwich from our lunch menu',
    requiredPurchases: 10,
    available: true
  },
  {
    id: 'r4',
    name: 'Premium Latte',
    description: 'Specialty latte with any milk option',
    requiredPurchases: 12,
    available: true
  },
  {
    id: 'r5',
    name: 'Coffee Bundle',
    description: '2 coffees and 2 pastries',
    requiredPurchases: 15,
    available: true
  }
]

const mockUserStatus: UserStatus = {
  userId: 'u123',
  userName: 'Sarah Johnson',
  totalPurchases: 3
}

export default function UserAttemptsTo() {
  const [userStatus] = useState<UserStatus>(mockUserStatus)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [selectedReward, setSelectedReward] = useState<string | null>(null)

  const handleRedeemAttempt = (reward: Reward) => {
    setSelectedReward(reward.id)
    
    if (userStatus.totalPurchases < reward.requiredPurchases) {
      const shortfall = reward.requiredPurchases - userStatus.totalPurchases
      setErrorMessage(
        `Cannot redeem "${reward.name}". You need ${shortfall} more purchase${shortfall > 1 ? 's' : ''} (${userStatus.totalPurchases}/${reward.requiredPurchases}).`
      )
    } else {
      setErrorMessage('')
      setSelectedReward(null)
    }
  }

  const handleClearError = () => {
    setErrorMessage('')
    setSelectedReward(null)
  }

  return (
    <section data-testid="userattemptsto" className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards Redemption</h1>
        <p className="text-gray-600">
          Welcome back, <span className="font-semibold">{userStatus.userName}</span>
        </p>
      </div>

      {/* User Status Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Purchase Status</h2>
            <p className="text-gray-600">Keep earning to unlock more rewards!</p>
          </div>
          <div className="text-center bg-white rounded-lg px-6 py-4 border-2 border-amber-400">
            <div className="text-4xl font-bold text-amber-600" data-testid="userattemptsto-purchase-count">
              {userStatus.totalPurchases}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Purchases</div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div 
          data-testid="userattemptsto-error" 
          className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 flex items-start justify-between"
        >
          <div className="flex items-start">
            <svg 
              className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                clipRule="evenodd" 
              />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-red-900 mb-1">Insufficient Purchases</h3>
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
          <button
            data-testid="userattemptsto-clear-error"
            onClick={handleClearError}
            className="text-red-500 hover:text-red-700 font-semibold text-sm ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Rewards List */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Rewards</h2>
        <p className="text-gray-600 mb-6">
          Select a reward below to attempt redemption
        </p>
      </div>

      <div data-testid="userattemptsto-list" className="grid gap-4 md:grid-cols-2">
        {mockRewards.map((reward) => {
          const isEligible = userStatus.totalPurchases >= reward.requiredPurchases
          const isSelected = selectedReward === reward.id

          return (
            <div
              key={reward.id}
              data-testid="userattemptsto-item"
              className={`border rounded-lg p-5 transition-all ${
                isSelected
                  ? 'border-red-400 bg-red-50'
                  : isEligible
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {reward.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                </div>
                {isEligible && (
                  <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded">
                    ELIGIBLE
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Required: </span>
                  <span className={`font-semibold ${isEligible ? 'text-green-600' : 'text-gray-900'}`}>
                    {reward.requiredPurchases} purchases
                  </span>
                </div>

                <button
                  data-testid="userattemptsto-redeem"
                  onClick={() => handleRedeemAttempt(reward)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    isEligible
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  {isEligible ? 'Redeem Now' : 'Try Redeem'}
                </button>
              </div>

              {!isEligible && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center text-xs text-gray-600">
                    <span>
                      {reward.requiredPurchases - userStatus.totalPurchases} more purchase
                      {reward.requiredPurchases - userStatus.totalPurchases > 1 ? 's' : ''} needed
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Help Text */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">How It Works</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Make purchases to increase your reward eligibility</li>
          <li>Try redeeming any reward to see if you qualify</li>
          <li>Eligible rewards show a green badge and can be redeemed immediately</li>
          <li>Ineligible attempts will show how many more purchases you need</li>
        </ul>
      </div>
    </section>
  )
}
