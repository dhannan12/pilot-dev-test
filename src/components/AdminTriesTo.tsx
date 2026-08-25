/**
 * AdminTriesTo — Admin form for listing a restaurant without dietary information
 *
 * Features: restaurant form, dietary info validation, error states, admin interface, validation feedback
 *
 * Ticket: SCRUM-1145 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface RestaurantAttempt {
  id: string
  restaurantName: string
  address: string
  phone: string
  cuisine: string
  dietaryInfo: string
  status: 'pending' | 'failed' | 'incomplete'
  errorMessage: string
}

const MOCK_ATTEMPTS: RestaurantAttempt[] = [
  {
    id: '1',
    restaurantName: 'The Galway Grill',
    address: '12 Shop Street, Galway',
    phone: '+353 91 123 456',
    cuisine: 'Irish',
    dietaryInfo: '',
    status: 'failed',
    errorMessage: 'Cannot list restaurant: Dietary information is required'
  },
  {
    id: '2',
    restaurantName: 'Seafood Shack',
    address: '45 Quay Road, Clifden',
    phone: '+353 95 234 567',
    cuisine: 'Seafood',
    dietaryInfo: '',
    status: 'incomplete',
    errorMessage: 'Missing required field: Dietary information'
  },
  {
    id: '3',
    restaurantName: 'West Coast Bistro',
    address: '8 Main Street, Westport',
    phone: '+353 98 345 678',
    cuisine: 'International',
    dietaryInfo: '',
    status: 'failed',
    errorMessage: 'Dietary information must be provided before publishing'
  },
  {
    id: '4',
    restaurantName: "O'Malley's Tavern",
    address: '22 Bridge Street, Galway',
    phone: '+353 91 456 789',
    cuisine: 'Pub Food',
    dietaryInfo: '',
    status: 'pending',
    errorMessage: 'Please add dietary options (vegetarian, vegan, gluten-free, etc.)'
  },
  {
    id: '5',
    restaurantName: 'The Connemara Kitchen',
    address: '15 Market Square, Clifden',
    phone: '+353 95 567 890',
    cuisine: 'Traditional Irish',
    dietaryInfo: '',
    status: 'failed',
    errorMessage: 'Validation error: Dietary information field cannot be empty'
  }
]

export default function AdminTriesTo() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    address: '',
    phone: '',
    cuisine: '',
    dietaryInfo: ''
  })
  const [showError, setShowError] = useState(false)
  const [attempts] = useState<RestaurantAttempt[]>(MOCK_ATTEMPTS)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.dietaryInfo.trim()) {
      setShowError(true)
      return
    }
    
    setShowError(false)
    alert('Restaurant listed successfully!')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (field === 'dietaryInfo' && value.trim()) {
      setShowError(false)
    }
  }

  return (
    <div data-testid="admintriesto" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Restaurant Listing
          </h1>
          <p className="text-gray-600 mb-6">
            Add a new restaurant to the West Ireland directory
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Name *
                </label>
                <input
                  data-testid="admintriesto-restaurantname"
                  type="text"
                  value={formData.restaurantName}
                  onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter restaurant name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  data-testid="admintriesto-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+353 XX XXX XXXX"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                data-testid="admintriesto-address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Street address, Town"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuisine Type *
              </label>
              <select
                data-testid="admintriesto-cuisine"
                value={formData.cuisine}
                onChange={(e) => handleInputChange('cuisine', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select cuisine type</option>
                <option value="Irish">Irish</option>
                <option value="Seafood">Seafood</option>
                <option value="International">International</option>
                <option value="Pub Food">Pub Food</option>
                <option value="Italian">Italian</option>
                <option value="Asian">Asian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Information *
                <span className="text-red-600 ml-1">(Required)</span>
              </label>
              <textarea
                data-testid="admintriesto-dietaryinfo"
                value={formData.dietaryInfo}
                onChange={(e) => handleInputChange('dietaryInfo', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  showError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., Vegetarian options, Vegan menu available, Gluten-free options, Dairy-free available"
                rows={4}
              />
              {showError && (
                <p className="mt-2 text-sm text-red-600">
                  ⚠ Dietary information is required. Please specify available dietary options.
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                List dietary accommodations (vegetarian, vegan, gluten-free, etc.)
              </p>
            </div>

            <div className="flex gap-4">
              <button
                data-testid="admintriesto-submit"
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                List Restaurant
              </button>
              <button
                data-testid="admintriesto-clear"
                type="button"
                onClick={() => {
                  setFormData({
                    restaurantName: '',
                    address: '',
                    phone: '',
                    cuisine: '',
                    dietaryInfo: ''
                  })
                  setShowError(false)
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Failed Listing Attempts
          </h2>
          <p className="text-gray-600 mb-6">
            Restaurants that couldn't be listed due to missing dietary information
          </p>

          <div data-testid="admintriesto-list" className="space-y-4">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                data-testid="admintriesto-item"
                className="border border-red-200 bg-red-50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {attempt.restaurantName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {attempt.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      {attempt.phone} • {attempt.cuisine}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        attempt.status === 'failed' 
                          ? 'bg-red-100 text-red-800'
                          : attempt.status === 'incomplete'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {attempt.status.toUpperCase()}
                      </span>
                      <p className="text-sm text-red-700">
                        {attempt.errorMessage}
                      </p>
                    </div>
                  </div>
                  <button
                    data-testid="admintriesto-retry"
                    className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
