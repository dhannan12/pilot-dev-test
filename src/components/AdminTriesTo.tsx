/**
 * AdminTriesTo — Admin form for listing a restaurant with dietary information validation
 *
 * Features: restaurant form, dietary info validation, error messaging, restaurant list display, form state management
 *
 * Ticket: SCRUM-1145 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Restaurant {
  id: number
  name: string
  address: string
  cuisine: string
  dietaryInfo: string
  phone: string
}

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: "O'Malley's Seafood House",
    address: "12 Quay Street, Westport",
    cuisine: "Irish Seafood",
    dietaryInfo: "Vegetarian, Vegan, Gluten-free options available",
    phone: "+353 98 12345"
  },
  {
    id: 2,
    name: "The Clew Bay Bistro",
    address: "45 Bridge Street, Westport",
    cuisine: "Modern Irish",
    dietaryInfo: "Vegetarian, Gluten-free, Dairy-free menu available",
    phone: "+353 98 23456"
  },
  {
    id: 3,
    name: "Croagh Patrick Inn",
    address: "8 Main Road, Murrisk",
    cuisine: "Traditional Irish",
    dietaryInfo: "Vegetarian options, coeliac-friendly meals",
    phone: "+353 98 34567"
  },
  {
    id: 4,
    name: "The Atlantic Grill",
    address: "23 Harbour View, Westport",
    cuisine: "Steakhouse",
    dietaryInfo: "Vegetarian, Vegan, Nut-free options",
    phone: "+353 98 45678"
  },
  {
    id: 5,
    name: "Mayo Mediterranean",
    address: "67 Shop Street, Westport",
    cuisine: "Mediterranean",
    dietaryInfo: "Vegetarian, Vegan, Gluten-free, Halal available",
    phone: "+353 98 56789"
  }
]

export default function AdminTriesTo() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(MOCK_RESTAURANTS)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cuisine: '',
    dietaryInfo: '',
    phone: ''
  })
  const [error, setError] = useState<string>('')
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing in dietary info
    if (name === 'dietaryInfo' && value.trim() !== '') {
      setError('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttemptedSubmit(true)

    // Validate dietary information
    if (!formData.dietaryInfo.trim()) {
      setError('Dietary information is required. Please specify available dietary options (e.g., Vegetarian, Vegan, Gluten-free).')
      return
    }

    // All fields required
    if (!formData.name.trim() || !formData.address.trim() || !formData.cuisine.trim() || !formData.phone.trim()) {
      setError('All fields are required.')
      return
    }

    // Success - add restaurant
    const newRestaurant: Restaurant = {
      id: restaurants.length + 1,
      ...formData
    }
    setRestaurants([newRestaurant, ...restaurants])
    setFormData({ name: '', address: '', cuisine: '', dietaryInfo: '', phone: '' })
    setError('')
    setAttemptedSubmit(false)
  }

  return (
    <div data-testid="admintriesto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Restaurant Listing Admin</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Restaurant</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  data-testid="admintriesto-name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter restaurant name"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  data-testid="admintriesto-address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full address"
                />
              </div>

              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine Type *
                </label>
                <input
                  id="cuisine"
                  name="cuisine"
                  type="text"
                  data-testid="admintriesto-cuisine"
                  value={formData.cuisine}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Irish, Italian, Asian"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  data-testid="admintriesto-phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+353 XX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="dietaryInfo" className="block text-sm font-medium text-gray-700 mb-1">
                  Dietary Information *
                </label>
                <textarea
                  id="dietaryInfo"
                  name="dietaryInfo"
                  data-testid="admintriesto-dietaryinfo"
                  value={formData.dietaryInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    attemptedSubmit && !formData.dietaryInfo.trim() ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Specify dietary options: Vegetarian, Vegan, Gluten-free, etc."
                />
                {attemptedSubmit && !formData.dietaryInfo.trim() && (
                  <p className="text-sm text-red-600 mt-1">⚠ This field is required</p>
                )}
              </div>

              {error && (
                <div data-testid="admintriesto-error" className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                data-testid="admintriesto-submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Add Restaurant
              </button>
            </form>
          </div>

          {/* Restaurant List Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Listed Restaurants</h2>
            
            <div data-testid="admintriesto-list" className="space-y-4">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  data-testid="admintriesto-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Address:</span> {restaurant.address}</p>
                    <p><span className="font-medium">Cuisine:</span> {restaurant.cuisine}</p>
                    <p><span className="font-medium">Phone:</span> {restaurant.phone}</p>
                    <p className="pt-2 border-t border-gray-100">
                      <span className="font-medium text-green-700">Dietary Options:</span>{' '}
                      <span className="text-green-600">{restaurant.dietaryInfo}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
