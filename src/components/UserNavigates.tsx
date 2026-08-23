/**
 * UserNavigates — Logged-in user homepage navigation interface
 *
 * Features: user profile display, main navigation menu, homepage dashboard, quick actions, rewards summary
 *
 * Ticket: SCRUM-1159 | Branch: proto/SCRUM-1151
 */

import React from 'react'

interface User {
  id: number
  name: string
  email: string
  rewardPoints: number
  memberSince: string
  avatarColor: string
}

interface NavItem {
  id: number
  label: string
  path: string
  icon: string
  isHome: boolean
}

interface QuickAction {
  id: number
  title: string
  description: string
  icon: string
  action: string
}

const CURRENT_USER: User = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  rewardPoints: 1250,
  memberSince: 'January 2024',
  avatarColor: 'bg-purple-500'
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    label: 'Home',
    path: '/',
    icon: '🏠',
    isHome: true
  },
  {
    id: 2,
    label: 'Menu',
    path: '/menu',
    icon: '☕',
    isHome: false
  },
  {
    id: 3,
    label: 'My Rewards',
    path: '/rewards',
    icon: '⭐',
    isHome: false
  },
  {
    id: 4,
    label: 'Order History',
    path: '/orders',
    icon: '📋',
    isHome: false
  },
  {
    id: 5,
    label: 'Settings',
    path: '/settings',
    icon: '⚙️',
    isHome: false
  }
]

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 1,
    title: 'Order Now',
    description: 'Skip the line and order ahead',
    icon: '🛒',
    action: 'Start Order'
  },
  {
    id: 2,
    title: 'Redeem Rewards',
    description: 'Use your points for free drinks',
    icon: '🎁',
    action: 'Browse Rewards'
  },
  {
    id: 3,
    title: 'Find Store',
    description: 'Locate nearest coffee shop',
    icon: '📍',
    action: 'View Map'
  },
  {
    id: 4,
    title: 'Special Offers',
    description: 'Check today\'s exclusive deals',
    icon: '🔥',
    action: 'See Offers'
  },
  {
    id: 5,
    title: 'Refer Friends',
    description: 'Get bonus points for referrals',
    icon: '👥',
    action: 'Share Link'
  }
]

export default function UserNavigates() {
  const [activeNav, setActiveNav] = React.useState<number>(1) // Home is active
  const [selectedAction, setSelectedAction] = React.useState<number | null>(null)

  return (
    <section data-testid="usernavigates" className="min-h-screen bg-gray-50">
      {/* Header with User Profile */}
      <header className="bg-gradient-to-r from-amber-900 to-orange-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${CURRENT_USER.avatarColor} flex items-center justify-center text-2xl font-bold text-white`}>
                {CURRENT_USER.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-bold">{CURRENT_USER.name}</h1>
                <p className="text-sm text-amber-100">{CURRENT_USER.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold">{CURRENT_USER.rewardPoints}</div>
                <div className="text-xs text-amber-100">Reward Points</div>
              </div>
              <button
                data-testid="usernavigates-profile"
                className="bg-white text-amber-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ul data-testid="usernavigates-list" className="flex gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} data-testid="usernavigates-item">
                <button
                  data-testid={`usernavigates-nav-${item.id}`}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeNav === item.id
                      ? 'text-amber-600 border-b-4 border-amber-600 bg-amber-50'
                      : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content - Homepage Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {CURRENT_USER.name.split(' ')[0]}! ☕
          </h2>
          <p className="text-gray-700 text-lg">
            You've been a valued member since {CURRENT_USER.memberSince}. Ready for your next coffee adventure?
          </p>
        </div>

        {/* Rewards Status Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your Rewards Status</h3>
              <p className="text-gray-600">You have <span className="font-bold text-amber-600">{CURRENT_USER.rewardPoints} points</span></p>
              <p className="text-sm text-gray-500 mt-1">
                Only {2500 - CURRENT_USER.rewardPoints} points away from Gold status!
              </p>
            </div>
            <div className="text-6xl">⭐</div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all"
                style={{ width: `${(CURRENT_USER.rewardPoints / 2500) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
          <div data-testid="usernavigates-actions-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <div
                key={action.id}
                data-testid="usernavigates-action-item"
                onClick={() => setSelectedAction(action.id)}
                className={`bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer border-2 ${
                  selectedAction === action.id ? 'border-amber-500' : 'border-transparent'
                }`}
              >
                <div className="text-5xl mb-4">{action.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{action.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                <button
                  data-testid={`usernavigates-action-${action.id}`}
                  className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  {action.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">☕</span>
                <div>
                  <div className="font-medium text-gray-800">Caramel Macchiato</div>
                  <div className="text-sm text-gray-500">Yesterday, 8:30 AM</div>
                </div>
              </div>
              <div className="text-amber-600 font-semibold">+25 pts</div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥐</span>
                <div>
                  <div className="font-medium text-gray-800">Croissant & Latte</div>
                  <div className="text-sm text-gray-500">2 days ago, 9:15 AM</div>
                </div>
              </div>
              <div className="text-amber-600 font-semibold">+30 pts</div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="font-medium text-gray-800">Redeemed: Free Drink</div>
                  <div className="text-sm text-gray-500">3 days ago</div>
                </div>
              </div>
              <div className="text-red-600 font-semibold">-200 pts</div>
            </div>
          </div>
          <button
            data-testid="usernavigates-view-all"
            className="w-full mt-4 text-amber-600 font-semibold hover:text-amber-700 transition-colors py-2"
          >
            View All Activity →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">
            Need help? <button data-testid="usernavigates-support" className="text-amber-400 hover:text-amber-300 underline">Contact Support</button>
          </p>
        </div>
      </footer>
    </section>
  )
}
