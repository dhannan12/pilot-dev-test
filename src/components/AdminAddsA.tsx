/**
 * AdminAddsA — Admin interface for adding new accommodations to the website
 *
 * Features: accommodation form, validation, existing listings display, add functionality, admin controls
 *
 * Ticket: SCRUM-1143 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Accommodation {
  id: number
  name: string
  type: string
  description: string
  price: number
  location: string
  amenities: string
  capacity: number
  imageUrl: string
}

const MOCK_ACCOMMODATIONS: Accommodation[] = [
  {
    id: 1,
    name: 'Seaside B&B',
    type: 'Bed & Breakfast',
    description: 'Charming B&B with ocean views and traditional Irish breakfast',
    price: 85,
    location: 'Main Street, Westport',
    amenities: 'WiFi, Breakfast, Parking, Sea View',
    capacity: 4,
    imageUrl: '/images/seaside-bb.jpg'
  },
  {
    id: 2,
    name: 'Castle View Hotel',
    type: 'Hotel',
    description: 'Modern hotel with stunning views of historic castle ruins',
    price: 120,
    location: 'Castle Road, Westport',
    amenities: 'WiFi, Restaurant, Bar, Gym, Parking',
    capacity: 2,
    imageUrl: '/images/castle-view.jpg'
  },
  {
    id: 3,
    name: 'Cozy Cottage Retreat',
    type: 'Self-Catering',
    description: 'Private cottage with full kitchen and garden in peaceful countryside',
    price: 95,
    location: 'Country Lane, Westport',
    amenities: 'Kitchen, Garden, Fireplace, Parking, Pet Friendly',
    capacity: 6,
    imageUrl: '/images/cozy-cottage.jpg'
  },
  {
    id: 4,
    name: 'Harbor Inn',
    type: 'Inn',
    description: 'Traditional Irish inn overlooking the bustling harbor',
    price: 75,
    location: 'Harbor Way, Westport',
    amenities: 'WiFi, Pub, Breakfast, Harbor View',
    capacity: 3,
    imageUrl: '/images/harbor-inn.jpg'
  },
  {
    id: 5,
    name: 'Mountain Lodge',
    type: 'Lodge',
    description: 'Rustic lodge at the base of Croagh Patrick mountain',
    price: 110,
    location: 'Mountain Road, Westport',
    amenities: 'WiFi, Restaurant, Hiking Trails, Mountain View, Sauna',
    capacity: 8,
    imageUrl: '/images/mountain-lodge.jpg'
  },
  {
    id: 6,
    name: 'Town Centre Guesthouse',
    type: 'Guesthouse',
    description: 'Convenient guesthouse in the heart of town near shops and pubs',
    price: 65,
    location: 'Bridge Street, Westport',
    amenities: 'WiFi, Breakfast, Central Location',
    capacity: 2,
    imageUrl: '/images/town-guesthouse.jpg'
  }
]

const ACCOMMODATION_TYPES = [
  'Bed & Breakfast',
  'Hotel',
  'Self-Catering',
  'Inn',
  'Lodge',
  'Guesthouse',
  'Hostel'
]

export default function AdminAddsA() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>(MOCK_ACCOMMODATIONS)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Bed & Breakfast',
    description: '',
    price: '',
    location: '',
    amenities: '',
    capacity: '',
    imageUrl: ''
  })
  const [message, setMessage] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.location) {
      setMessage('Please fill in all required fields')
      return
    }

    const newAccommodation: Accommodation = {
      id: accommodations.length + 1,
      name: formData.name,
      type: formData.type,
      description: formData.description,
      price: parseFloat(formData.price),
      location: formData.location,
      amenities: formData.amenities,
      capacity: parseInt(formData.capacity) || 2,
      imageUrl: formData.imageUrl || '/images/default.jpg'
    }

    setAccommodations(prev => [...prev, newAccommodation])
    setMessage(`Successfully added ${formData.name}!`)
    
    // Reset form
    setFormData({
      name: '',
      type: 'Bed & Breakfast',
      description: '',
      price: '',
      location: '',
      amenities: '',
      capacity: '',
      imageUrl: ''
    })

    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = (id: number) => {
    setAccommodations(prev => prev.filter(acc => acc.id !== id))
    setMessage('Accommodation removed')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div data-testid="adminaddsa" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Accommodation Management
          </h1>
          <p className="text-gray-600">Add and manage accommodations for West Ireland Tourist Town</p>
        </header>

        {message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Accommodation Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Accommodation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  data-testid="adminaddsa-name"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Seaside B&B"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  data-testid="adminaddsa-type"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {ACCOMMODATION_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  data-testid="adminaddsa-description"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the accommodation..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Night (€) *
                  </label>
                  <input
                    data-testid="adminaddsa-price"
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="85"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                    Guest Capacity
                  </label>
                  <input
                    data-testid="adminaddsa-capacity"
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  data-testid="adminaddsa-location"
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Main Street, Westport"
                  required
                />
              </div>

              <div>
                <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">
                  Amenities
                </label>
                <input
                  data-testid="adminaddsa-amenities"
                  type="text"
                  id="amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="WiFi, Breakfast, Parking"
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  data-testid="adminaddsa-imageurl"
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/images/accommodation.jpg"
                />
              </div>

              <button
                data-testid="adminaddsa-submit"
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
              >
                Add Accommodation
              </button>
            </form>
          </div>

          {/* Existing Accommodations List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Current Accommodations ({accommodations.length})
            </h2>
            
            <div data-testid="adminaddsa-list" className="space-y-4 max-h-[800px] overflow-y-auto">
              {accommodations.map(accommodation => (
                <div
                  key={accommodation.id}
                  data-testid="adminaddsa-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {accommodation.name}
                    </h3>
                    <button
                      data-testid="adminaddsa-delete"
                      onClick={() => handleDelete(accommodation.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Type:</span> {accommodation.type}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span> {accommodation.location}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span> €{accommodation.price}/night
                    </p>
                    <p>
                      <span className="font-medium">Capacity:</span> {accommodation.capacity} guests
                    </p>
                    <p className="text-gray-700">{accommodation.description}</p>
                    {accommodation.amenities && (
                      <p>
                        <span className="font-medium">Amenities:</span> {accommodation.amenities}
                      </p>
                    )}
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
