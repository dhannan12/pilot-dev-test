/**
 * UserNavigates — Navigation bar for logged-in users to navigate to homepage
 *
 * Features: user profile display, homepage link, coffee shop navigation, rewards status, logout
 *
 * Ticket: SCRUM-1159 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  rewardsPoints: number
  memberSince: string
}

interface NavigationItem {
  id: number
  label: string
  href: string
  isHome: boolean
}

const MOCK_USER: User = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  rewardsPoints: 450,
  memberSince: '2024-01-15'
}

const MOCK_NAV_ITEMS: NavigationItem[] = [
  { id: 1, label: 'Home', href: '/', isHome: true },
  { id: 2, label: 'Menu', href: '/menu', isHome: false },
  { id: 3, label: 'Rewards', href: '/rewards', isHome: false },
  { id: 4, label: 'My Orders', href: '/orders', isHome: false },
  { id: 5, label: 'Locations', href: '/locations', isHome: false }
]

export default function UserNavigates() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('/')

  const handleNavigate = (href: string) => {
    setActiveNav(href)
    // In a real app, this would use react-router or similar
    console.log(`Navigating to ${href}`)
  }

  const handleLogout = () => {
    console.log('Logging out...')
    // In a real app, this would clear auth tokens and redirect
  }

  return (
    <nav data-testid="usernavigates" className="bg-gradient-to-r from-amber-900 to-amber-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">☕ BeanHub</h1>
          </div>

          {/* Navigation Links */}
          <div data-testid="usernavigates-list" className="hidden md:block">
            <ul className="flex space-x-4">
              {MOCK_NAV_ITEMS.map((item) => (
                <li key={item.id} data-testid="usernavigates-item">
                  <button
                    data-testid={`usernavigates-nav-${item.label.toLowerCase()}`}
                    onClick={() => handleNavigate(item.href)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeNav === item.href
                        ? 'bg-amber-800 text-white'
                        : 'text-amber-100 hover:bg-amber-800 hover:text-white'
                    } ${item.isHome ? 'ring-2 ring-white' : ''}`}
                  >
                    {item.isHome && '🏠 '}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile Section */}
          <div className="relative">
            <button
              data-testid="usernavigates-user-menu"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-amber-900 font-bold">
                {MOCK_USER.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">{MOCK_USER.name}</p>
                <p className="text-xs text-amber-200">{MOCK_USER.rewardsPoints} pts</p>
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div
                data-testid="usernavigates-dropdown"
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">{MOCK_USER.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{MOCK_USER.email}</p>
                  <p className="text-xs text-amber-600 mt-2">
                    Member since {new Date(MOCK_USER.memberSince).toLocaleDateString()}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    data-testid="usernavigates-profile"
                    onClick={() => handleNavigate('/profile')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    👤 My Profile
                  </button>
                  <button
                    data-testid="usernavigates-rewards"
                    onClick={() => handleNavigate('/rewards')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    ⭐ Rewards ({MOCK_USER.rewardsPoints} points)
                  </button>
                  <button
                    data-testid="usernavigates-settings"
                    onClick={() => handleNavigate('/settings')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    ⚙️ Settings
                  </button>
                </div>

                <div className="border-t border-gray-200 py-1">
                  <button
                    data-testid="usernavigates-logout"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-amber-800 px-4 py-3">
        <ul data-testid="usernavigates-mobile-list" className="space-y-2">
          {MOCK_NAV_ITEMS.map((item) => (
            <li key={item.id} data-testid="usernavigates-mobile-item">
              <button
                data-testid={`usernavigates-mobile-${item.label.toLowerCase()}`}
                onClick={() => handleNavigate(item.href)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeNav === item.href
                    ? 'bg-amber-800 text-white'
                    : 'text-amber-100 hover:bg-amber-800 hover:text-white'
                } ${item.isHome ? 'ring-2 ring-white' : ''}`}
              >
                {item.isHome && '🏠 '}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
