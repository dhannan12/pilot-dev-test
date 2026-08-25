/**
 * VisitorAccesses — Welcome landing page for first-time visitors to the coffee shop website
 *
 * Features: hero banner, featured drinks showcase, rewards program highlights, location info, call-to-action buttons
 *
 * Ticket: SCRUM-1155 | Branch: proto/SCRUM-1151
 */

import React from 'react'

interface FeaturedDrink {
  id: number
  name: string
  description: string
  price: string
  imageColor: string
}

interface Benefit {
  id: number
  title: string
  description: string
  icon: string
}

interface Location {
  id: number
  name: string
  address: string
  hours: string
}

const featuredDrinks: FeaturedDrink[] = [
  {
    id: 1,
    name: 'Caramel Macchiato',
    description: 'Espresso with vanilla syrup, steamed milk, and caramel drizzle',
    price: '$5.25',
    imageColor: 'bg-amber-100'
  },
  {
    id: 2,
    name: 'Iced Mocha',
    description: 'Rich chocolate and espresso over ice with whipped cream',
    price: '$5.75',
    imageColor: 'bg-amber-200'
  },
  {
    id: 3,
    name: 'Vanilla Latte',
    description: 'Smooth espresso with steamed milk and vanilla syrup',
    price: '$4.95',
    imageColor: 'bg-yellow-100'
  },
  {
    id: 4,
    name: 'Cappuccino',
    description: 'Classic Italian coffee with perfect foam',
    price: '$4.50',
    imageColor: 'bg-orange-100'
  },
  {
    id: 5,
    name: 'Cold Brew',
    description: 'Smooth, bold coffee steeped for 20 hours',
    price: '$4.25',
    imageColor: 'bg-stone-200'
  }
]

const benefits: Benefit[] = [
  {
    id: 1,
    title: 'Earn Rewards',
    description: 'Get 1 point for every dollar spent',
    icon: '⭐'
  },
  {
    id: 2,
    title: 'Free Birthday Drink',
    description: 'Celebrate with a complimentary beverage',
    icon: '🎂'
  },
  {
    id: 3,
    title: 'Mobile Ordering',
    description: 'Order ahead and skip the line',
    icon: '📱'
  },
  {
    id: 4,
    title: 'Exclusive Deals',
    description: 'Members-only promotions and discounts',
    icon: '🎁'
  },
  {
    id: 5,
    title: 'Free Refills',
    description: 'Unlimited hot coffee and tea refills',
    icon: '☕'
  }
]

const locations: Location[] = [
  {
    id: 1,
    name: 'Downtown',
    address: '123 Main Street',
    hours: 'Mon-Fri 6am-8pm, Sat-Sun 7am-9pm'
  },
  {
    id: 2,
    name: 'Westside',
    address: '456 Oak Avenue',
    hours: 'Mon-Sun 6am-10pm'
  },
  {
    id: 3,
    name: 'University District',
    address: '789 College Way',
    hours: 'Mon-Sun 5am-11pm'
  },
  {
    id: 4,
    name: 'Eastgate',
    address: '321 Park Boulevard',
    hours: 'Mon-Fri 6am-9pm, Sat-Sun 7am-10pm'
  },
  {
    id: 5,
    name: 'Airport',
    address: 'Terminal B, Gate 15',
    hours: 'Mon-Sun 4am-10pm'
  }
]

export default function VisitorAccesses() {
  return (
    <div data-testid="visitoraccesses" className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Coffee Shop</h1>
          <p className="text-xl mb-8">Your perfect cup of coffee awaits</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              data-testid="visitoraccesses-join"
              className="bg-white text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors"
            >
              Join Rewards Program
            </button>
            <button 
              data-testid="visitoraccesses-menu"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-700 transition-colors"
            >
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* Featured Drinks Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Featured Drinks</h2>
          <div data-testid="visitoraccesses-drinks-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDrinks.map((drink) => (
              <div 
                key={drink.id}
                data-testid="visitoraccesses-drinks-item"
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`${drink.imageColor} h-48 flex items-center justify-center`}>
                  <span className="text-6xl">☕</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{drink.name}</h3>
                    <span className="text-lg font-semibold text-amber-600">{drink.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{drink.description}</p>
                  <button 
                    data-testid="visitoraccesses-order"
                    className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Join Our Rewards Program</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Sign up today and start earning rewards with every purchase</p>
          <div data-testid="visitoraccesses-benefits-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id}
                data-testid="visitoraccesses-benefits-item"
                className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button 
              data-testid="visitoraccesses-signup"
              className="bg-amber-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Find Us Near You</h2>
          <div data-testid="visitoraccesses-locations-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div 
                key={location.id}
                data-testid="visitoraccesses-locations-item"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-600"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
                <p className="text-gray-600 mb-2">📍 {location.address}</p>
                <p className="text-gray-500 text-sm">🕒 {location.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="mb-6">Subscribe to our newsletter for exclusive offers and updates</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              data-testid="visitoraccesses-email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button 
              data-testid="visitoraccesses-subscribe"
              className="bg-white text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
