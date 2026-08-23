/**
 * UserAttemptsTo — Display reward redemption attempt with insufficient purchases error
 *
 * Features: user purchase tracking, reward listing, redemption validation, error messaging, purchase progress indicator
 *
 * Ticket: SCRUM-1153 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface Reward {
  id: string
  name: string
  requiredPurchases: number
  description: string
  value: string
}

interface User {
  id: string
  name: string
  email: string
  currentPurchases: number
}

const mockUser: User = {
  id: 'user-001',
  name: 'Sarah Johnson',
  email: 'sarah.j@email.com',
  currentPurchases: 3
}

const mockRewards: Reward[] = [
  {
    id: 'reward-001',
    name: 'Free Coffee',
    requiredPurchases: 5,
    description: 'Get any size coffee for free',
    value: '$4.50'
  },
  {
    id: 'reward-002',
    name: 'Free Pastry',
    requiredPurchases: 8,
    description: 'Choose any pastry from our selection',
    value: '$3.50'
  },
  {
    id: 'reward-003',
    name: 'Free Sandwich',
    requiredPurchases: 10,
    description: 'Any sandwich or wrap from the menu',
    value: '$7.50'
  },
  {
    id: 'reward-004',
    name: 'Free Specialty Drink',
    requiredPurchases: 12,
    description: 'Any specialty drink including lattes and frappes',
    value: '$6.00'
  },
  {
    id: 'reward-005',
    name: 'Free Meal Combo',
    requiredPurchases: 15,
    description: 'Coffee, sandwich, and pastry combo',
    value: '$12.00'
  }
]

export default function UserAttemptsTo() {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [attemptedRedemption, setAttemptedRedemption] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleRewardSelect = (reward: Reward) => {
    setSelectedReward(reward)
    setAttemptedRedemption(false)
    setErrorMessage('')
  }

  const handleRedeemAttempt = () => {
    if (!selectedReward) {
      setErrorMessage('Please select a reward to redeem')
      setAttemptedRedemption(true)
      return
    }

    if (mockUser.currentPurchases < selectedReward.requiredPurchases) {
      const purchasesNeeded = selectedReward.requiredPurchases - mockUser.currentPurchases
      setErrorMessage(
        `Insufficient purchases! You need ${purchasesNeeded} more purchase${purchasesNeeded > 1 ? 's' : ''} to redeem this reward.`
      )
      setAttemptedRedemption(true)
    } else {
      setErrorMessage('')
      setAttemptedRedemption(true)
    }
  }

  const calculateProgress = (requiredPurchases: number) => {
    return Math.min((mockUser.currentPurchases / requiredPurchases) * 100, 100)
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Coffee Rewards Program</h1>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Welcome back, <span className="font-semibold">{mockUser.name}</span></p>
              <p className="text-sm text-gray-500">{mockUser.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Current Purchases</p>
              <p className="text-4xl font-bold text-amber-600">{mockUser.currentPurchases}</p>
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Rewards</h2>
          <div data-testid="userattemptsto-list" className="space-y-4">
            {mockRewards.map((reward) => {
              const progress = calculateProgress(reward.requiredPurchases)
              const isEligible = mockUser.currentPurchases >= reward.requiredPurchases
              const isSelected = selectedReward?.id === reward.id

              return (
                <div
                  key={reward.id}
                  data-testid="userattemptsto-item"
                  onClick={() => handleRewardSelect(reward)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{reward.name}</h3>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded">
                        {reward.value}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        Requires {reward.requiredPurchases} purchases
                      </span>
                      {isEligible ? (
                        <span className="text-green-600 font-semibold">✓ Eligible</span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          {reward.requiredPurchases - mockUser.currentPurchases} more needed
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all ${
                          isEligible ? 'bg-green-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Redemption Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Redeem Reward</h2>
          
          {selectedReward ? (
            <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-gray-600 mb-1">Selected Reward:</p>
              <p className="text-lg font-semibold text-gray-800">{selectedReward.name}</p>
              <p className="text-sm text-gray-600">
                Requires {selectedReward.requiredPurchases} purchases (You have {mockUser.currentPurchases})
              </p>
            </div>
          ) : (
            <p className="text-gray-600 mb-4">Please select a reward from the list above</p>
          )}

          <button
            data-testid="userattemptsto-redeem"
            onClick={handleRedeemAttempt}
            disabled={!selectedReward}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              selectedReward
                ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Redeem Selected Reward
          </button>

          {attemptedRedemption && errorMessage && (
            <div
              data-testid="userattemptsto-error"
              className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded"
            >
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-red-500 mr-3 flex-shrink-0"
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
                  <h3 className="text-red-800 font-semibold mb-1">Redemption Failed</h3>
                  <p className="text-red-700">{errorMessage}</p>
                  {selectedReward && mockUser.currentPurchases < selectedReward.requiredPurchases && (
                    <p className="text-sm text-red-600 mt-2">
                      Keep shopping! You're {calculateProgress(selectedReward.requiredPurchases).toFixed(0)}% of the way there.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {attemptedRedemption && !errorMessage && selectedReward && (
            <div
              data-testid="userattemptsto-success"
              className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded"
            >
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="text-green-800 font-semibold mb-1">Success!</h3>
                  <p className="text-green-700">Your reward has been redeemed successfully.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
