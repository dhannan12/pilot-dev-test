/**
 * UserWithLow — User with low tech comfort level attempts to access exclusive content
 *
 * Features: user profile display, exclusive content access attempt, upgrade prompt, simple navigation, accessibility-focused design
 *
 * Ticket: SCRUM-1248 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface ContentItem {
  id: number
  title: string
  description: string
  isExclusive: boolean
  category: string
}

interface UserProfile {
  name: string
  techComfortLevel: string
  membershipType: string
  joinDate: string
}

const mockUser: UserProfile = {
  name: 'Jane Smith',
  techComfortLevel: 'Low',
  membershipType: 'Basic',
  joinDate: '2024-01-15'
}

const mockContent: ContentItem[] = [
  {
    id: 1,
    title: 'Getting Started Guide',
    description: 'Easy step-by-step instructions for beginners',
    isExclusive: false,
    category: 'Tutorials'
  },
  {
    id: 2,
    title: 'Premium Winter Collection',
    description: 'Exclusive access to our latest winter fashion line',
    isExclusive: true,
    category: 'Collections'
  },
  {
    id: 3,
    title: 'Basic Style Tips',
    description: 'Simple styling advice for everyday wear',
    isExclusive: false,
    category: 'Tips'
  },
  {
    id: 4,
    title: 'VIP Designer Showcase',
    description: 'Early access to designer pieces and limited editions',
    isExclusive: true,
    category: 'Collections'
  },
  {
    id: 5,
    title: 'Community Forum',
    description: 'Connect with other fashion enthusiasts',
    isExclusive: false,
    category: 'Community'
  },
  {
    id: 6,
    title: 'Personal Styling Service',
    description: 'One-on-one consultation with professional stylists',
    isExclusive: true,
    category: 'Services'
  },
  {
    id: 7,
    title: 'Size Guide',
    description: 'Find your perfect fit with our sizing charts',
    isExclusive: false,
    category: 'Help'
  }
]

export default function UserWithLow() {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handleContentClick = (item: ContentItem) => {
    if (item.isExclusive) {
      setSelectedItem(item)
      setShowUpgradeModal(true)
    } else {
      setSelectedItem(item)
      setShowUpgradeModal(false)
    }
  }

  const handleCloseModal = () => {
    setShowUpgradeModal(false)
    setSelectedItem(null)
  }

  return (
    <div data-testid="userwithlow" className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {mockUser.name}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Member since {new Date(mockUser.joinDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {mockUser.membershipType} Member
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Tech Comfort: {mockUser.techComfortLevel}
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            data-testid="userwithlow-nav-home"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Home
          </button>
          <button
            data-testid="userwithlow-nav-browse"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Browse
          </button>
          <button
            data-testid="userwithlow-nav-help"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Help
          </button>
          <button
            data-testid="userwithlow-nav-upgrade"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto"
          >
            Upgrade to Premium
          </button>
        </div>
      </nav>

      {/* Content Grid */}
      <main>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse Content</h2>
        <ul data-testid="userwithlow-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockContent.map((item) => (
            <li
              key={item.id}
              data-testid="userwithlow-item"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {item.category}
                </span>
                {item.isExclusive && (
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Premium
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <button
                data-testid="userwithlow-access"
                onClick={() => handleContentClick(item)}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  item.isExclusive
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {item.isExclusive ? 'View Details' : 'Access Now'}
              </button>
            </li>
          ))}
        </ul>
      </main>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedItem && (
        <div
          data-testid="userwithlow-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Premium Content</h3>
              <button
                data-testid="userwithlow-close"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-amber-900 mb-1">Premium Content Locked</p>
                    <p className="text-sm text-amber-800">
                      This content is only available to Premium members.
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">{selectedItem.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{selectedItem.description}</p>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">Upgrade to Premium</p>
                <ul className="text-sm text-blue-800 space-y-1 mb-3">
                  <li>✓ Access all exclusive content</li>
                  <li>✓ Personal styling service</li>
                  <li>✓ Early access to new collections</li>
                  <li>✓ Priority customer support</li>
                </ul>
                <p className="text-xs text-blue-700">Starting at $9.99/month</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                data-testid="userwithlow-cancel"
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Maybe Later
              </button>
              <button
                data-testid="userwithlow-upgrade"
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
