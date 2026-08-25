/**
 * AdminUpdatesSeasonal — Admin panel for managing seasonal coffee shop offerings
 *
 * Features: view seasonal items, add/edit offerings, set availability dates, toggle active status, delete items
 *
 * Ticket: SCRUM-1156 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface SeasonalOffering {
  id: number
  name: string
  description: string
  price: number
  season: string
  startDate: string
  endDate: string
  isActive: boolean
}

const MOCK_SEASONAL_OFFERINGS: SeasonalOffering[] = [
  {
    id: 1,
    name: 'Pumpkin Spice Latte',
    description: 'Classic fall favorite with pumpkin, cinnamon, and nutmeg',
    price: 5.95,
    season: 'Fall',
    startDate: '2026-09-01',
    endDate: '2026-11-30',
    isActive: true,
  },
  {
    id: 2,
    name: 'Peppermint Mocha',
    description: 'Holiday blend of chocolate and peppermint',
    price: 6.25,
    season: 'Winter',
    startDate: '2026-11-15',
    endDate: '2027-01-15',
    isActive: true,
  },
  {
    id: 3,
    name: 'Iced Lavender Honey Latte',
    description: 'Refreshing spring drink with lavender and honey',
    price: 5.75,
    season: 'Spring',
    startDate: '2027-03-01',
    endDate: '2027-05-31',
    isActive: false,
  },
  {
    id: 4,
    name: 'Strawberry Açaí Refresher',
    description: 'Light and fruity summer beverage',
    price: 4.95,
    season: 'Summer',
    startDate: '2027-06-01',
    endDate: '2027-08-31',
    isActive: false,
  },
  {
    id: 5,
    name: 'Maple Pecan Latte',
    description: 'Warm autumn flavors of maple syrup and toasted pecans',
    price: 6.50,
    season: 'Fall',
    startDate: '2026-09-15',
    endDate: '2026-11-15',
    isActive: true,
  },
  {
    id: 6,
    name: 'Gingerbread Latte',
    description: 'Holiday spice blend with ginger and molasses',
    price: 5.95,
    season: 'Winter',
    startDate: '2026-12-01',
    endDate: '2027-01-31',
    isActive: true,
  },
]

export default function AdminUpdatesSeasonal() {
  const [offerings, setOfferings] = useState<SeasonalOffering[]>(MOCK_SEASONAL_OFFERINGS)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<SeasonalOffering>>({
    name: '',
    description: '',
    price: 0,
    season: 'Fall',
    startDate: '',
    endDate: '',
    isActive: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isActive: e.target.checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId !== null) {
      // Update existing offering
      setOfferings(prev =>
        prev.map(item =>
          item.id === editingId
            ? { ...item, ...formData } as SeasonalOffering
            : item
        )
      )
      setEditingId(null)
    } else {
      // Add new offering
      const newOffering: SeasonalOffering = {
        id: Math.max(...offerings.map(o => o.id), 0) + 1,
        name: formData.name || '',
        description: formData.description || '',
        price: formData.price || 0,
        season: formData.season || 'Fall',
        startDate: formData.startDate || '',
        endDate: formData.endDate || '',
        isActive: formData.isActive ?? true,
      }
      setOfferings(prev => [...prev, newOffering])
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: 0,
      season: 'Fall',
      startDate: '',
      endDate: '',
      isActive: true,
    })
  }

  const handleEdit = (offering: SeasonalOffering) => {
    setEditingId(offering.id)
    setFormData(offering)
  }

  const handleDelete = (id: number) => {
    setOfferings(prev => prev.filter(item => item.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setFormData({
        name: '',
        description: '',
        price: 0,
        season: 'Fall',
        startDate: '',
        endDate: '',
        isActive: true,
      })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      price: 0,
      season: 'Fall',
      startDate: '',
      endDate: '',
      isActive: true,
    })
  }

  const toggleActive = (id: number) => {
    setOfferings(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    )
  }

  return (
    <div data-testid="adminupdatesseasonal" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Seasonal Offerings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId !== null ? 'Edit Offering' : 'Add New Offering'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  data-testid="adminupdatesseasonal-name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  data-testid="adminupdatesseasonal-price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={formData.season || 'Fall'}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    data-testid="adminupdatesseasonal-startdate"
                    value={formData.startDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    data-testid="adminupdatesseasonal-enddate"
                    value={formData.endDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  data-testid="adminupdatesseasonal-isactive"
                  checked={formData.isActive ?? true}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  data-testid="adminupdatesseasonal-submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingId !== null ? 'Update Offering' : 'Add Offering'}
                </button>
                
                {editingId !== null && (
                  <button
                    type="button"
                    data-testid="adminupdatesseasonal-cancel"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Offerings</h2>
            
            <div data-testid="adminupdatesseasonal-list" className="space-y-4 max-h-[600px] overflow-y-auto">
              {offerings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No seasonal offerings yet</p>
              ) : (
                offerings.map(offering => (
                  <div
                    key={offering.id}
                    data-testid="adminupdatesseasonal-item"
                    className={`border rounded-lg p-4 ${
                      editingId === offering.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {offering.name}
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              offering.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {offering.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{offering.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mt-3">
                      <div>
                        <span className="font-medium">Price:</span> ${offering.price.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Season:</span> {offering.season}
                      </div>
                      <div>
                        <span className="font-medium">Start:</span> {offering.startDate}
                      </div>
                      <div>
                        <span className="font-medium">End:</span> {offering.endDate}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        data-testid="adminupdatesseasonal-edit"
                        onClick={() => handleEdit(offering)}
                        className="flex-1 bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        data-testid="adminupdatesseasonal-toggle"
                        onClick={() => toggleActive(offering.id)}
                        className="flex-1 bg-yellow-500 text-white text-sm px-3 py-1.5 rounded hover:bg-yellow-600 transition-colors"
                      >
                        {offering.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        data-testid="adminupdatesseasonal-delete"
                        onClick={() => handleDelete(offering.id)}
                        className="flex-1 bg-red-600 text-white text-sm px-3 py-1.5 rounded hover:bg-red-700 transition-colors"
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
