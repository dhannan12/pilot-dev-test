/**
 * RegisteredUsersShould — Rewards points tracker for registered coffee shop customers
 *
 * Features: points balance display, transaction history, available rewards, membership tier status, redeem functionality
 *
 * Ticket: SCRUM-1152 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface Transaction {
  id: string
  date: string
  type: 'earned' | 'redeemed'
  points: number
  description: string
}

interface Reward {
  id: string
  name: string
  pointsCost: number
  description: string
  available: boolean
}

interface UserProfile {
  name: string
  email: string
  memberSince: string
  currentPoints: number
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
}

// Mock user profile data
const mockUser: UserProfile = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  memberSince: '2024-01-15',
  currentPoints: 450,
  tier: 'Gold'
}

// Mock transaction history (minimum 5 items)
const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    date: '2026-08-22',
    type: 'earned',
    points: 25,
    description: 'Purchase: Large Cappuccino + Croissant'
  },
  {
    id: 'txn-002',
    date: '2026-08-20',
    type: 'earned',
    points: 15,
    description: 'Purchase: Espresso'
  },
  {
    id: 'txn-003',
    date: '2026-08-18',
    type: 'redeemed',
    points: -100,
    description: 'Redeemed: Free Medium Coffee'
  },
  {
    id: 'txn-004',
    date: '2026-08-15',
    type: 'earned',
    points: 30,
    description: 'Purchase: Cold Brew + Muffin'
  },
  {
    id: 'txn-005',
    date: '2026-08-12',
    type: 'earned',
    points: 20,
    description: 'Purchase: Latte'
  },
  {
    id: 'txn-006',
    date: '2026-08-10',
    type: 'earned',
    points: 50,
    description: 'Bonus: Birthday Points'
  },
  {
    id: 'txn-007',
    date: '2026-08-08',
    type: 'earned',
    points: 35,
    description: 'Purchase: Mocha + Sandwich'
  }
]

// Mock available rewards (minimum 5 items)
const mockRewards: Reward[] = [
  {
    id: 'rwd-001',
    name: 'Free Small Coffee',
    pointsCost: 50,
    description: 'Any small hot or iced coffee',
    available: true
  },
  {
    id: 'rwd-002',
    name: 'Free Medium Coffee',
    pointsCost: 100,
    description: 'Any medium hot or iced coffee',
    available: true
  },
  {
    id: 'rwd-003',
    name: 'Free Pastry',
    pointsCost: 75,
    description: 'Choice of croissant, muffin, or cookie',
    available: true
  },
  {
    id: 'rwd-004',
    name: 'Free Large Specialty Drink',
    pointsCost: 200,
    description: 'Any large specialty beverage',
    available: true
  },
  {
    id: 'rwd-005',
    name: '$5 Off Purchase',
    pointsCost: 150,
    description: 'Valid on any order over $10',
    available: true
  },
  {
    id: 'rwd-006',
    name: 'Free Sandwich',
    pointsCost: 250,
    description: 'Any sandwich or wrap',
    available: true
  },
  {
    id: 'rwd-007',
    name: '$10 Off Purchase',
    pointsCost: 500,
    description: 'Valid on any order',
    available: false
  }
]

export default function RegisteredUsersShould() {
  const [user] = useState<UserProfile>(mockUser)
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [rewards] = useState<Reward[]>(mockRewards)
  const [activeTab, setActiveTab] = useState<'transactions' | 'rewards'>('transactions')

  const getTierColor = (tier: string): string => {
    switch (tier) {
      case 'Bronze':
        return 'text-amber-700 bg-amber-100'
      case 'Silver':
        return 'text-gray-700 bg-gray-200'
      case 'Gold':
        return 'text-yellow-600 bg-yellow-100'
      case 'Platinum':
        return 'text-purple-700 bg-purple-100'
      default:
        return 'text-gray-700 bg-gray-100'
    }
  }

  const handleRedeem = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId)
    if (reward && user.currentPoints >= reward.pointsCost) {
      alert(`Redeeming: ${reward.name} for ${reward.pointsCost} points`)
    }
  }

  return (
    <div data-testid="registeredusersshould" className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <div className={`px-4 py-2 rounded-full font-semibold ${getTierColor(user.tier)}`}>
              {user.tier} Member
            </div>
          </div>

          {/* Points Display */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Current Points Balance</p>
                <p data-testid="registeredusersshould-points-balance" className="text-5xl font-bold">{user.currentPoints}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Member Since</p>
                <p className="text-lg font-semibold">{new Date(user.memberSince).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-2xl shadow-lg">
          <div className="flex border-b border-gray-200">
            <button
              data-testid="registeredusersshould-tab-transactions"
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 px-6 py-4 text-lg font-semibold transition-colors ${
                activeTab === 'transactions'
                  ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Transaction History
            </button>
            <button
              data-testid="registeredusersshould-tab-rewards"
              onClick={() => setActiveTab('rewards')}
              className={`flex-1 px-6 py-4 text-lg font-semibold transition-colors ${
                activeTab === 'rewards'
                  ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Available Rewards
            </button>
          </div>

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div data-testid="registeredusersshould-transactions-section" className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div data-testid="registeredusersshould-list" className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    data-testid="registeredusersshould-item"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div className={`text-lg font-bold ${
                      transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div data-testid="registeredusersshould-rewards-section" className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Redeem Your Points</h2>
              <div data-testid="registeredusersshould-rewards-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => {
                  const canAfford = user.currentPoints >= reward.pointsCost
                  return (
                    <div
                      key={reward.id}
                      data-testid="registeredusersshould-reward-card"
                      className={`p-5 rounded-lg border-2 transition-all ${
                        canAfford
                          ? 'border-amber-300 bg-white hover:border-amber-500 hover:shadow-md'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{reward.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          canAfford ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {reward.pointsCost} pts
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                      <button
                        data-testid={`registeredusersshould-redeem-${reward.id}`}
                        onClick={() => handleRedeem(reward.id)}
                        disabled={!canAfford}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                          canAfford
                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem Now' : 'Not Enough Points'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6 text-center">
          <p className="text-gray-600 text-sm">
            Earn 1 point for every $1 spent. Points never expire!
          </p>
        </div>
      </div>
    </div>
  )
}
