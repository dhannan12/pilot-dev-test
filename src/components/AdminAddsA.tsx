/**
 * AdminAddsA — Admin interface for adding new accommodations to the website
 *
 * Features: accommodation form, type selection, amenities checkboxes, price input, existing accommodations list
 *
 * Ticket: SCRUM-1143 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Accommodation {
  id: string
  name: string
  type: string
  address: string
  description: string
  pricePerNight: number
  amenities: string[]
  imageUrl: string
  status: 'active' | 'pending' | 'inactive'
}

const MOCK_ACCOMMODATIONS: Accommodation[] = [
  {
    id: '1',
    name: 'Cliffside B&B',
    type: 'Bed & Breakfast',
    address: '12 Ocean View Road, Clifden',
    description: 'Charming B&B with stunning Atlantic views and traditional Irish breakfast',
    pricePerNight: 85,
    amenities: ['WiFi', 'Parking', 'Breakfast'],
    imageUrl: '/images/cliffside-bnb.jpg',
    status: 'active'
  },
  {
    id: '2',
    name: 'Connemara Castle Hotel',
    type: 'Hotel',
    address: '45 Main Street, Letterfrack',
    description: 'Historic castle hotel offering luxury rooms and fine dining',
    pricePerNight: 200,
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Bar', 'Gym'],
    imageUrl: '/images/castle-hotel.jpg',
    status: 'active'
  },
  {
    id: '3',
    name: 'Seaside Cottage',
    type: 'Cottage',
    address: '8 Harbor Lane, Roundstone',
    description: 'Cozy cottage perfect for families, walking distance to beach',
    pricePerNight: 120,
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Garden'],
    imageUrl: '/images/seaside-cottage.jpg',
    status: 'active'
  },
  {
    id: '4',
    name: 'Mountain View Hostel',
    type: 'Hostel',
    address: '23 Galway Road, Clifden',
    description: 'Budget-friendly hostel with dorm and private rooms',
    pricePerNight: 35,
    amenities: ['WiFi', 'Kitchen', 'Lounge'],
    imageUrl: '/images/mountain-hostel.jpg',
    status: 'active'
  },
  {
    id: '5',
    name: 'Harbour House Apartment',
    type: 'Apartment',
    address: '7 Pier Street, Westport',
    description: 'Modern apartment with harbor views and self-catering facilities',
    pricePerNight: 95,
    amenities: ['WiFi', 'Parking', 'Kitchen', 'Balcony'],
    imageUrl: '/images/harbour-apt.jpg',
    status: 'pending'
  },
  {
    id: '6',
    name: 'Celtic Guesthouse',
    type: 'Guesthouse',
    address: '15 Church Street, Clifden',
    description: 'Traditional guesthouse in the heart of Clifden',
    pricePerNight: 75,
    amenities: ['WiFi', 'Parking', 'Breakfast'],
    imageUrl: '/images/celtic-guesthouse.jpg',
    status: 'active'
  }
]

const ACCOMMODATION_TYPES = [
  'Hotel',
  'Bed & Breakfast',
  'Cottage',
  'Apartment',
  'Hostel',
  'Guesthouse'
]

const AVAILABLE_AMENITIES = [
  'WiFi',
  'Parking',
  'Breakfast',
  'Kitchen',
  'Restaurant',
  'Bar',
  'Gym',
  'Pool',
  'Spa',
  'Garden',
  'Balcony',
  'Lounge',
  'Pet Friendly'
]

export default function AdminAddsA() {
  const [accommodations] = useState<Accommodation[]>(MOCK_ACCOMMODATIONS)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    description: '',
    pricePerNight: '',
    amenities: [] as string[],
    imageUrl: ''
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to API
    console.log('New accommodation:', formData)
    // Reset form
    setFormData({
      name: '',
      type: '',
      address: '',
      description: '',
      pricePerNight: '',
      amenities: [],
      imageUrl: ''
    })
  }

  const handleReset = () => {
    setFormData({
      name: '',
      type: '',
      address: '',
      description: '',
      pricePerNight: '',
      amenities: [],
      imageUrl: ''
    })
  }

  return (
    <div data-testid="adminaddsa" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Accommodation Management
          </h1>
          <p className="text-gray-600">Add new accommodations to the website</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Accommodation Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Add New Accommodation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  data-testid="adminaddsa-name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Cliffside B&B"
                />
              </div>

              {/* Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  data-testid="adminaddsa-type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type...</option>
                  {ACCOMMODATION_TYPES.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address *
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  data-testid="adminaddsa-address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 12 Main Street, Clifden"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  data-testid="adminaddsa-description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the accommodation"
                />
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="pricePerNight"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price per Night (€) *
                </label>
                <input
                  id="pricePerNight"
                  name="pricePerNight"
                  type="number"
                  data-testid="adminaddsa-price"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 85"
                />
              </div>

              {/* Image URL */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  data-testid="adminaddsa-imageurl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/images/accommodation.jpg"
                />
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_AMENITIES.map(amenity => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        data-testid={`adminaddsa-amenity-${amenity.toLowerCase().replace(' ', '-')}`}
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  data-testid="adminaddsa-submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                >
                  Add Accommodation
                </button>
                <button
                  type="button"
                  data-testid="adminaddsa-reset"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Existing Accommodations List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Existing Accommodations ({accommodations.length})
            </h2>

            <div data-testid="adminaddsa-list" className="space-y-4">
              {accommodations.map(acc => (
                <div
                  key={acc.id}
                  data-testid="adminaddsa-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {acc.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        acc.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : acc.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {acc.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Type:</span> {acc.type}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Address:</span> {acc.address}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {acc.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-blue-600">
                      €{acc.pricePerNight}/night
                    </p>
                    <div className="flex gap-2">
                      <button
                        data-testid="adminaddsa-edit"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        data-testid="adminaddsa-delete"
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {acc.amenities.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {acc.amenities.map(amenity => (
                        <span
                          key={amenity}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
