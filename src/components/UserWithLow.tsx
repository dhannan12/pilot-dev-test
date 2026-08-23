/**
 * UserWithLow — Simple, accessible interface for users with low tech comfort to access coffee origin information
 *
 * Features: Large text, clear buttons, simple layout, high contrast, easy navigation
 *
 * Ticket: SCRUM-1157 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface Coffee {
  id: number
  name: string
  origin: string
  country: string
  region: string
  description: string
  flavor: string
}

const coffeeData: Coffee[] = [
  {
    id: 1,
    name: 'Morning Blend',
    origin: 'Ethiopian Highlands',
    country: 'Ethiopia',
    region: 'Yirgacheffe',
    description: 'Smooth and bright coffee from the birthplace of coffee.',
    flavor: 'Fruity with floral notes'
  },
  {
    id: 2,
    name: 'Dark Roast Supreme',
    origin: 'Colombian Mountains',
    country: 'Colombia',
    region: 'Antioquia',
    description: 'Rich and bold coffee from high mountain regions.',
    flavor: 'Chocolate and nutty'
  },
  {
    id: 3,
    name: 'Smooth Sunrise',
    origin: 'Brazilian Valleys',
    country: 'Brazil',
    region: 'Minas Gerais',
    description: 'Mild and smooth coffee perfect for any time of day.',
    flavor: 'Sweet and caramel'
  },
  {
    id: 4,
    name: 'Island Paradise',
    origin: 'Hawaiian Slopes',
    country: 'USA',
    region: 'Kona',
    description: 'Premium coffee grown on volcanic slopes with ocean breezes.',
    flavor: 'Balanced and sweet'
  },
  {
    id: 5,
    name: 'Classic Medium',
    origin: 'Costa Rican Hills',
    country: 'Costa Rica',
    region: 'Tarrazu',
    description: 'Well-balanced coffee with clean, crisp flavor.',
    flavor: 'Citrus and honey'
  },
  {
    id: 6,
    name: 'Espresso Special',
    origin: 'Guatemalan Highlands',
    country: 'Guatemala',
    region: 'Antigua',
    description: 'Full-bodied coffee perfect for espresso lovers.',
    flavor: 'Rich and smoky'
  }
]

export default function UserWithLow() {
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null)
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div data-testid="userwithlow" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with help */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coffee Origin Information
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            Learn where our coffees come from
          </p>
          <button
            data-testid="userwithlow-help-toggle"
            onClick={() => setShowHelp(!showHelp)}
            className="text-xl bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {showHelp ? 'Hide Help' : 'Need Help?'}
          </button>

          {showHelp && (
            <div data-testid="userwithlow-help-panel" className="mt-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                How to Use This Page
              </h2>
              <ul className="text-xl text-gray-800 space-y-3">
                <li className="flex items-start">
                  <span className="font-bold mr-3">1.</span>
                  <span>Browse the coffee cards below</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">2.</span>
                  <span>Click on any coffee to see more details</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">3.</span>
                  <span>Click "Close Details" to go back to the list</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Detail view when coffee is selected */}
        {selectedCoffee && (
          <div data-testid="userwithlow-detail-panel" className="bg-white rounded-lg shadow-lg p-8 mb-6 border-4 border-blue-500">
            <button
              data-testid="userwithlow-close-detail"
              onClick={() => setSelectedCoffee(null)}
              className="mb-6 text-xl bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              ← Close Details
            </button>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {selectedCoffee.name}
            </h2>

            <div className="space-y-6 text-xl">
              <div className="border-l-4 border-blue-500 pl-6">
                <p className="font-bold text-gray-700 mb-2">Origin:</p>
                <p className="text-2xl text-gray-900">{selectedCoffee.origin}</p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <p className="font-bold text-gray-700 mb-2">Country:</p>
                <p className="text-2xl text-gray-900">{selectedCoffee.country}</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <p className="font-bold text-gray-700 mb-2">Region:</p>
                <p className="text-2xl text-gray-900">{selectedCoffee.region}</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <p className="font-bold text-gray-700 mb-2">Description:</p>
                <p className="text-2xl text-gray-900">{selectedCoffee.description}</p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <p className="font-bold text-gray-700 mb-2">Flavor:</p>
                <p className="text-2xl text-gray-900">{selectedCoffee.flavor}</p>
              </div>
            </div>
          </div>
        )}

        {/* Coffee list */}
        <div data-testid="userwithlow-list" className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Available Coffees ({coffeeData.length})
          </h2>
          
          {coffeeData.map((coffee) => (
            <div
              key={coffee.id}
              data-testid="userwithlow-item"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      {coffee.name}
                    </h3>
                    <p className="text-xl text-gray-700 mb-2">
                      <span className="font-semibold">From:</span> {coffee.origin}
                    </p>
                    <p className="text-xl text-gray-700">
                      <span className="font-semibold">Country:</span> {coffee.country}
                    </p>
                  </div>
                  <button
                    data-testid="userwithlow-view-details"
                    onClick={() => setSelectedCoffee(coffee)}
                    className="text-xl bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer help text */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <p className="text-xl text-gray-700 text-center">
            Questions? Click the "Need Help?" button at the top
          </p>
        </div>
      </div>
    </div>
  )
}
