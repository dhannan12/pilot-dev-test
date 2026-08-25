/**
 * RegisteredUsersShould — Allows registered users to track their rewards points
 *
 * Features: points balance display, transaction history, tier status, earned/spent tracking, redemption options
 *
 * Ticket: SCRUM-1152 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface Transaction {
  id: string
  date: string
  description: string
  points: number
  type: 'earned' | 'spent'
}

interface RewardsTier {
  name: string
  minPoints: number
  color: string
}

const mockTransactions: Transaction[] = [
  { id: 'txn-001', date: '2026-08-20', description: 'Coffee purchase - Large Latte', points: 15, type: 'earned' },
  { id: 'txn-002', date: '2026-08-18', description: 'Redeemed free pastry', points: -50, type: 'spent' },
  { id: 'txn-003', date: '2026-08-15', description: 'Coffee purchase - Cappuccino', points: 12, type: 'earned' },
  { id: 'txn-004', date: '2026-08-12', description: 'Birthday bonus', points: 100, type: 'earned' },
  { id: 'txn-005', date: '2026-08-10', description: 'Coffee purchase - Espresso', points: 8, type: 'earned' },
  { id: 'txn-006', date: '2026-08-08', description: 'Referral bonus', points: 50, type: 'earned' },
  { id: 'txn-007', date: '2026-08-05', description: 'Redeemed free coffee', points: -100, type: 'spent' },
  { id: 'txn-008', date: '2026-08-02', description: 'Coffee purchase - Americano', points: 10, type: 'earned' }
]

const rewardsTiers: RewardsTier[] = [
  { name: 'Bronze', minPoints: 0, color: 'bg-amber-600' },
  { name: 'Silver', minPoints: 100, color: 'bg-gray-400' },
  { name: 'Gold', minPoints: 250, color: 'bg-yellow-500' },
  { name: 'Platinum', minPoints: 500, color: 'bg-purple-600' }
]

export default function RegisteredUsersShould() {
  const [filter, setFilter] = useState<'all' | 'earned' | 'spent'>('all')
  
  const totalPoints = mockTransactions.reduce((sum, txn) => sum + txn.points, 0)
  const earnedPoints = mockTransactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.points, 0)
  const spentPoints = Math.abs(mockTransactions.filter(t => t.type === 'spent').reduce((sum, t) => sum + t.points, 0))
  
  const currentTier = [...rewardsTiers].reverse().find(tier => totalPoints >= tier.minPoints) || rewardsTiers[0]
  const nextTier = rewardsTiers.find(tier => tier.minPoints > totalPoints)
  
  const filteredTransactions = filter === 'all' 
    ? mockTransactions 
    : mockTransactions.filter(t => t.type === filter)

  return (
    <section data-testid="registeredusersshould" className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Rewards</h1>
          <p className="text-gray-600">Track your points and redeem rewards</p>
        </div>

        {/* Points Summary Card */}
        <div data-testid="registeredusersshould-summary" className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <p className="text-sm text-green-800 font-semibold mb-1">Available Points</p>
              <p data-testid="registeredusersshould-total-points" className="text-4xl font-bold text-green-600">{totalPoints}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <p className="text-sm text-blue-800 font-semibold mb-1">Earned</p>
              <p data-testid="registeredusersshould-earned-points" className="text-4xl font-bold text-blue-600">+{earnedPoints}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
              <p className="text-sm text-red-800 font-semibold mb-1">Redeemed</p>
              <p data-testid="registeredusersshould-spent-points" className="text-4xl font-bold text-red-600">-{spentPoints}</p>
            </div>
          </div>
        </div>

        {/* Tier Status Card */}
        <div data-testid="registeredusersshould-tier" className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rewards Tier</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className={`${currentTier.color} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
              {currentTier.name.charAt(0)}
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{currentTier.name} Member</p>
              {nextTier && (
                <p className="text-sm text-gray-600">
                  {nextTier.minPoints - totalPoints} points to {nextTier.name}
                </p>
              )}
            </div>
          </div>
          {nextTier && (
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((totalPoints / nextTier.minPoints) * 100, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div data-testid="registeredusersshould-history" className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
            <div className="flex gap-2">
              <button
                data-testid="registeredusersshould-filter-all"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                data-testid="registeredusersshould-filter-earned"
                onClick={() => setFilter('earned')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'earned' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Earned
              </button>
              <button
                data-testid="registeredusersshould-filter-spent"
                onClick={() => setFilter('spent')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'spent' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Redeemed
              </button>
            </div>
          </div>

          <ul data-testid="registeredusersshould-list" className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <li 
                key={transaction.id}
                data-testid="registeredusersshould-item"
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div className={`text-xl font-bold ${
                  transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Redeem Options */}
        <div data-testid="registeredusersshould-redeem" className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Redeem Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div data-testid="registeredusersshould-reward-card" className="border-2 border-gray-200 rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800 mb-1">Free Coffee</h3>
              <p className="text-sm text-gray-600 mb-2">Any size, any flavor</p>
              <p className="text-amber-600 font-bold">100 points</p>
              <button 
                data-testid="registeredusersshould-redeem-coffee"
                className="mt-3 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Redeem
              </button>
            </div>
            <div data-testid="registeredusersshould-reward-card" className="border-2 border-gray-200 rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800 mb-1">Free Pastry</h3>
              <p className="text-sm text-gray-600 mb-2">Choose from daily selection</p>
              <p className="text-amber-600 font-bold">50 points</p>
              <button 
                data-testid="registeredusersshould-redeem-pastry"
                className="mt-3 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Redeem
              </button>
            </div>
            <div data-testid="registeredusersshould-reward-card" className="border-2 border-gray-200 rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800 mb-1">$5 Off</h3>
              <p className="text-sm text-gray-600 mb-2">Any purchase over $10</p>
              <p className="text-amber-600 font-bold">200 points</p>
              <button 
                data-testid="registeredusersshould-redeem-discount"
                className="mt-3 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Redeem
              </button>
            </div>
            <div data-testid="registeredusersshould-reward-card" className="border-2 border-gray-200 rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800 mb-1">Merchandise</h3>
              <p className="text-sm text-gray-600 mb-2">Branded mug or tumbler</p>
              <p className="text-amber-600 font-bold">300 points</p>
              <button 
                data-testid="registeredusersshould-redeem-merch"
                className="mt-3 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
