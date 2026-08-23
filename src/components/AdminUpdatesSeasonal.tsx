/**
 * AdminUpdatesSeasonal — Admin interface for managing seasonal coffee shop offerings
 *
 * Features: add/edit seasonal items, toggle availability, delete offerings, season-based categorization, price management
 *
 * Ticket: SCRUM-1156 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface SeasonalOffering {
  id: number
  name: string
  season: string
  price: number
  description: string
  available: boolean
}

const mockSeasonalOfferings: SeasonalOffering[] = [
  {
    id: 1,
    name: 'Pumpkin Spice Latte',
    season: 'Fall',
    price: 5.99,
    description: 'Classic fall favorite with pumpkin and warm spices',
    available: true
  },
  {
    id: 2,
    name: 'Peppermint Mocha',
    season: 'Winter',
    price: 6.49,
    description: 'Rich chocolate and refreshing peppermint',
    available: true
  },
  {
    id: 3,
    name: 'Iced Caramel Macchiato',
    season: 'Summer',
    price: 5.49,
    description: 'Refreshing iced coffee with sweet caramel',
    available: true
  },
  {
    id: 4,
    name: 'Cherry Blossom Tea',
    season: 'Spring',
    price: 4.99,
    description: 'Delicate floral tea celebrating spring',
    available: false
  },
  {
    id: 5,
    name: 'Gingerbread Latte',
    season: 'Winter',
    price: 6.29,
    description: 'Warm ginger and molasses with espresso',
    available: true
  }
]

export default function AdminUpdatesSeasonal() {
  const [offerings, setOfferings] = useState<SeasonalOffering[]>(mockSeasonalOfferings)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    season: 'Spring',
    price: '',
    description: '',
    available: true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvailableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      available: e.target.checked
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price || !formData.description) {
      return
    }

    if (editingId !== null) {
      // Update existing offering
      setOfferings(prev => prev.map(offering => 
        offering.id === editingId
          ? {
              ...offering,
              name: formData.name,
              season: formData.season,
              price: parseFloat(formData.price),
              description: formData.description,
              available: formData.available
            }
          : offering
      ))
      setEditingId(null)
    } else {
      // Add new offering
      const newOffering: SeasonalOffering = {
        id: Math.max(...offerings.map(o => o.id), 0) + 1,
        name: formData.name,
        season: formData.season,
        price: parseFloat(formData.price),
        description: formData.description,
        available: formData.available
      }
      setOfferings(prev => [...prev, newOffering])
    }

    // Reset form
    setFormData({
      name: '',
      season: 'Spring',
      price: '',
      description: '',
      available: true
    })
  }

  const handleEdit = (offering: SeasonalOffering) => {
    setEditingId(offering.id)
    setFormData({
      name: offering.name,
      season: offering.season,
      price: offering.price.toString(),
      description: offering.description,
      available: offering.available
    })
  }

  const handleDelete = (id: number) => {
    setOfferings(prev => prev.filter(offering => offering.id !== id))
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({
      name: '',
      season: 'Spring',
      price: '',
      description: '',
      available: true
    })
  }

  const toggleAvailability = (id: number) => {
    setOfferings(prev => prev.map(offering =>
      offering.id === id
        ? { ...offering, available: !offering.available }
        : offering
    ))
  }

  return (
    <div data-testid="adminupdatesseasonal" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Seasonal Offerings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId !== null ? 'Edit Offering' : 'Add New Offering'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  data-testid="adminupdatesseasonal-name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">
                  Season
                </label>
                <select
                  id="season"
                  name="season"
                  data-testid="adminupdatesseasonal-season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  data-testid="adminupdatesseasonal-price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  data-testid="adminupdatesseasonal-description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  data-testid="adminupdatesseasonal-available"
                  checked={formData.available}
                  onChange={handleAvailableChange}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="available" className="ml-2 text-sm font-medium text-gray-700">
                  Available Now
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  data-testid="adminupdatesseasonal-submit"
                  className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                >
                  {editingId !== null ? 'Update Offering' : 'Add Offering'}
                </button>
                {editingId !== null && (
                  <button
                    type="button"
                    data-testid="adminupdatesseasonal-cancel"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Offerings</h2>
            <div data-testid="adminupdatesseasonal-list" className="space-y-3">
              {offerings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No seasonal offerings yet</p>
              ) : (
                offerings.map(offering => (
                  <div
                    key={offering.id}
                    data-testid="adminupdatesseasonal-item"
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{offering.name}</h3>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {offering.season}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            ${offering.price.toFixed(2)}
                          </span>
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                              offering.available
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {offering.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{offering.description}</p>
                    <div className="flex gap-2">
                      <button
                        data-testid="adminupdatesseasonal-edit"
                        onClick={() => handleEdit(offering)}
                        className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        data-testid="adminupdatesseasonal-toggle"
                        onClick={() => toggleAvailability(offering.id)}
                        className="flex-1 bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        Toggle
                      </button>
                      <button
                        data-testid="adminupdatesseasonal-delete"
                        onClick={() => handleDelete(offering.id)}
                        className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
