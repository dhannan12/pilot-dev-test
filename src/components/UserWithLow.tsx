/**
 * UserWithLow — Simple interface for accessing coffee origin information designed for low tech comfort users
 *
 * Features: Large clear buttons, simple navigation, coffee origin details, easy-to-read layout, step-by-step guidance
 *
 * Ticket: SCRUM-1157 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface CoffeeOrigin {
  id: number
  name: string
  country: string
  region: string
  description: string
  flavorNotes: string[]
  roastLevel: string
  altitude: string
}

const COFFEE_ORIGINS: CoffeeOrigin[] = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    country: 'Ethiopia',
    region: 'Yirgacheffe',
    description: 'A bright and floral coffee from the birthplace of coffee. Known for its tea-like body and distinctive citrus notes.',
    flavorNotes: ['Lemon', 'Bergamot', 'Floral', 'Black Tea'],
    roastLevel: 'Light',
    altitude: '1,700 - 2,200 meters'
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    country: 'Colombia',
    region: 'Huila',
    description: 'A smooth, well-balanced coffee with medium body. Perfect for those who enjoy a classic coffee taste.',
    flavorNotes: ['Caramel', 'Nuts', 'Cocoa', 'Apple'],
    roastLevel: 'Medium',
    altitude: '1,500 - 2,000 meters'
  },
  {
    id: 3,
    name: 'Brazilian Santos',
    country: 'Brazil',
    region: 'São Paulo',
    description: 'A mild and sweet coffee with low acidity. Great for everyday drinking and perfect for beginners.',
    flavorNotes: ['Chocolate', 'Peanut', 'Caramel', 'Low Acidity'],
    roastLevel: 'Medium',
    altitude: '800 - 1,200 meters'
  },
  {
    id: 4,
    name: 'Guatemalan Antigua',
    country: 'Guatemala',
    region: 'Antigua',
    description: 'A full-bodied coffee with rich, complex flavors. Grown in volcanic soil for a unique taste.',
    flavorNotes: ['Dark Chocolate', 'Spice', 'Smoke', 'Cocoa'],
    roastLevel: 'Medium-Dark',
    altitude: '1,500 - 1,700 meters'
  },
  {
    id: 5,
    name: 'Kenyan AA',
    country: 'Kenya',
    region: 'Nyeri',
    description: 'A bold and bright coffee with wine-like acidity. One of the most distinctive coffees in the world.',
    flavorNotes: ['Blackberry', 'Grapefruit', 'Wine', 'Tomato'],
    roastLevel: 'Medium',
    altitude: '1,400 - 2,000 meters'
  },
  {
    id: 6,
    name: 'Sumatran Mandheling',
    country: 'Indonesia',
    region: 'Sumatra',
    description: 'A heavy-bodied coffee with earthy and herbal notes. Perfect for those who like strong, bold flavors.',
    flavorNotes: ['Earth', 'Cedar', 'Tobacco', 'Dark Chocolate'],
    roastLevel: 'Dark',
    altitude: '750 - 1,500 meters'
  }
]

export default function UserWithLow() {
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeOrigin | null>(null)

  const handleSelectCoffee = (coffee: CoffeeOrigin) => {
    setSelectedCoffee(coffee)
  }

  const handleBackToList = () => {
    setSelectedCoffee(null)
  }

  return (
    <div data-testid="userwithlow" className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-3">
            Coffee Origins
          </h1>
          <p className="text-2xl text-amber-800">
            Learn where your coffee comes from
          </p>
        </header>

        {/* Detail View */}
        {selectedCoffee ? (
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <button
              data-testid="userwithlow-back"
              onClick={handleBackToList}
              className="mb-6 px-8 py-4 bg-amber-600 text-white text-xl font-semibold rounded-2xl hover:bg-amber-700 transition-colors"
            >
              ← Back to All Coffees
            </button>

            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-amber-900 mb-2">
                  {selectedCoffee.name}
                </h2>
                <p className="text-2xl text-amber-700">
                  {selectedCoffee.country} - {selectedCoffee.region}
                </p>
              </div>

              <div className="border-t-4 border-amber-200 pt-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-3">
                  About This Coffee
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {selectedCoffee.description}
                </p>
              </div>

              <div className="border-t-4 border-amber-200 pt-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-3">
                  Flavor Notes
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedCoffee.flavorNotes.map((note, index) => (
                    <span
                      key={index}
                      className="px-6 py-3 bg-amber-100 text-amber-900 rounded-full text-xl font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t-4 border-amber-200 pt-6">
                <div className="bg-amber-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">
                    Roast Level
                  </h3>
                  <p className="text-2xl text-amber-800 font-semibold">
                    {selectedCoffee.roastLevel}
                  </p>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">
                    Growing Altitude
                  </h3>
                  <p className="text-2xl text-amber-800 font-semibold">
                    {selectedCoffee.altitude}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div>
            <p className="text-center text-2xl text-amber-800 mb-8">
              Click on any coffee to learn more about it
            </p>

            <div
              data-testid="userwithlow-list"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {COFFEE_ORIGINS.map((coffee) => (
                <button
                  key={coffee.id}
                  data-testid="userwithlow-item"
                  onClick={() => handleSelectCoffee(coffee)}
                  className="bg-white rounded-3xl shadow-lg p-8 text-left hover:shadow-2xl hover:scale-105 transition-all duration-200"
                >
                  <h2 className="text-3xl font-bold text-amber-900 mb-3">
                    {coffee.name}
                  </h2>
                  <p className="text-xl text-amber-700 mb-4">
                    📍 {coffee.country}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {coffee.flavorNotes.slice(0, 3).map((note, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-base"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg text-gray-600">
                    Click to learn more →
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
