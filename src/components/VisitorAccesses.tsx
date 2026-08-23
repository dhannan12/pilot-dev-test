/**
 * VisitorAccesses — Welcome landing page for first-time visitors
 *
 * Features: hero welcome section, feature highlights, call-to-action buttons, service previews, mobile-responsive layout
 *
 * Ticket: SCRUM-1155 | Branch: proto/SCRUM-1151
 */

import React from 'react'

interface Feature {
  id: number
  title: string
  description: string
  icon: string
  action: string
}

const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Explore Our Menu',
    description: 'Browse our selection of premium coffees, teas, pastries, and seasonal specials.',
    icon: '☕',
    action: 'View Menu'
  },
  {
    id: 2,
    title: 'Join Rewards Program',
    description: 'Earn points with every purchase and unlock exclusive perks and free drinks.',
    icon: '⭐',
    action: 'Sign Up'
  },
  {
    id: 3,
    title: 'Find Locations',
    description: 'Discover our coffee shops near you with opening hours and directions.',
    icon: '📍',
    action: 'Find Store'
  },
  {
    id: 4,
    title: 'Order Online',
    description: 'Skip the line! Order ahead for pickup or delivery directly from your phone.',
    icon: '🛒',
    action: 'Start Order'
  },
  {
    id: 5,
    title: 'Special Events',
    description: 'Join our coffee tastings, workshops, and community events every month.',
    icon: '🎉',
    action: 'See Events'
  }
]

export default function VisitorAccesses() {
  const [selectedFeature, setSelectedFeature] = React.useState<number | null>(null)

  return (
    <section data-testid="visitoraccesses" className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Coffee Shop! ☕</h1>
          <p className="text-xl mb-8 text-amber-100">
            Your journey to exceptional coffee starts here. Discover premium brews, exclusive rewards, and a community that loves coffee as much as you do.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              data-testid="visitoraccesses-get-started"
              className="bg-white text-amber-900 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors shadow-lg"
            >
              Get Started
            </button>
            <button
              data-testid="visitoraccesses-learn-more"
              className="bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors border-2 border-white"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          What You Can Do Here
        </h2>
        
        <div data-testid="visitoraccesses-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              data-testid="visitoraccesses-item"
              className={`bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-2 ${
                selectedFeature === feature.id ? 'border-amber-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedFeature(feature.id)}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <button
                data-testid={`visitoraccesses-action-${feature.id}`}
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                {feature.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-white py-12 px-6 mt-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div data-testid="visitoraccesses-stat-locations">
              <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
              <div className="text-gray-600">Locations Nationwide</div>
            </div>
            <div data-testid="visitoraccesses-stat-members">
              <div className="text-4xl font-bold text-amber-600 mb-2">100K+</div>
              <div className="text-gray-600">Rewards Members</div>
            </div>
            <div data-testid="visitoraccesses-stat-drinks">
              <div className="text-4xl font-bold text-amber-600 mb-2">1M+</div>
              <div className="text-gray-600">Drinks Served Monthly</div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Stay Connected</h2>
          <p className="text-gray-700 mb-6">
            Subscribe to our newsletter for exclusive offers, new menu items, and coffee tips!
          </p>
          <div className="flex gap-3 max-w-md mx-auto flex-wrap justify-center">
            <input
              type="email"
              data-testid="visitoraccesses-email"
              placeholder="Enter your email"
              className="flex-1 min-w-[200px] px-4 py-3 rounded-lg border-2 border-amber-300 focus:outline-none focus:border-amber-500"
            />
            <button
              data-testid="visitoraccesses-subscribe"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-800 text-white py-8 px-6 text-center">
        <p className="text-lg mb-4">Ready to start your coffee journey?</p>
        <button
          data-testid="visitoraccesses-create-account"
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
        >
          Create Free Account
        </button>
      </div>
    </section>
  )
}
