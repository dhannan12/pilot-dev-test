/**
 * UserChecksAllergen — Display allergen information for menu items
 *
 * Features: allergen filtering, detailed allergen info, searchable dishes, safety warnings, allergen badges
 *
 * Ticket: SCRUM-1063 | Branch: proto/SCRUM-1056
 */

import { useState } from 'react'

interface MenuItem {
  id: number
  name: string
  category: string
  description: string
  allergens: string[]
  price: number
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Kung Pao Chicken',
    category: 'Main Course',
    description: 'Spicy stir-fried chicken with peanuts and vegetables',
    allergens: ['Peanuts', 'Soy', 'Gluten'],
    price: 12.99
  },
  {
    id: 2,
    name: 'Sweet and Sour Pork',
    category: 'Main Course',
    description: 'Crispy pork with bell peppers in tangy sauce',
    allergens: ['Gluten', 'Eggs'],
    price: 11.99
  },
  {
    id: 3,
    name: 'Vegetable Spring Rolls',
    category: 'Appetizer',
    description: 'Crispy rolls filled with fresh vegetables',
    allergens: ['Gluten', 'Soy'],
    price: 5.99
  },
  {
    id: 4,
    name: 'Seafood Fried Rice',
    category: 'Rice & Noodles',
    description: 'Fried rice with shrimp, scallops, and vegetables',
    allergens: ['Shellfish', 'Eggs', 'Soy'],
    price: 13.99
  },
  {
    id: 5,
    name: 'Mapo Tofu',
    category: 'Main Course',
    description: 'Spicy tofu with minced pork in Sichuan sauce',
    allergens: ['Soy'],
    price: 10.99
  },
  {
    id: 6,
    name: 'Cashew Chicken',
    category: 'Main Course',
    description: 'Tender chicken stir-fried with cashews and vegetables',
    allergens: ['Tree Nuts', 'Soy', 'Gluten'],
    price: 12.49
  },
  {
    id: 7,
    name: 'Egg Drop Soup',
    category: 'Soup',
    description: 'Traditional Chinese soup with egg ribbons',
    allergens: ['Eggs'],
    price: 4.99
  },
  {
    id: 8,
    name: 'Sesame Prawn Toast',
    category: 'Appetizer',
    description: 'Crispy toast topped with prawn paste and sesame seeds',
    allergens: ['Shellfish', 'Gluten', 'Eggs', 'Sesame'],
    price: 6.99
  }
]

const ALL_ALLERGENS = [
  'Peanuts',
  'Tree Nuts',
  'Shellfish',
  'Gluten',
  'Eggs',
  'Soy',
  'Sesame',
  'Dairy',
  'Fish'
]

export default function UserChecksAllergen() {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    )
  }

  const filteredItems = MOCK_MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAllergenFilter = selectedAllergens.length === 0 ||
      !item.allergens.some(allergen => selectedAllergens.includes(allergen))
    
    return matchesSearch && matchesAllergenFilter
  })

  const clearFilters = () => {
    setSelectedAllergens([])
    setSearchTerm('')
  }

  return (
    <div data-testid="userchecksallergen" className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Allergen Information
          </h1>
          <p className="text-gray-600">
            Filter menu items by allergens to find safe dining options
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> If you have severe allergies, please inform our staff. While we take precautions, cross-contamination may occur in our kitchen.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Allergen Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Filter Allergens
                </h2>
                {selectedAllergens.length > 0 && (
                  <button
                    data-testid="userchecksallergen-clear"
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Select allergens to exclude from results
              </p>

              <div data-testid="userchecksallergen-list" className="space-y-2">
                {ALL_ALLERGENS.map(allergen => (
                  <label
                    key={allergen}
                    data-testid="userchecksallergen-item"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      data-testid={`userchecksallergen-checkbox-${allergen.toLowerCase()}`}
                      checked={selectedAllergens.includes(allergen)}
                      onChange={() => toggleAllergen(allergen)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium">
                      {allergen}
                    </span>
                  </label>
                ))}
              </div>

              {selectedAllergens.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">
                    Active filters:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAllergens.map(allergen => (
                      <span
                        key={allergen}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <input
                type="text"
                data-testid="userchecksallergen-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search dishes..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredItems.length} of {MOCK_MENU_ITEMS.length} dishes
                {selectedAllergens.length > 0 && (
                  <span className="text-red-600 font-medium">
                    {' '}(excluding {selectedAllergens.join(', ')})
                  </span>
                )}
              </p>
            </div>

            {/* Menu Items Grid */}
            <div data-testid="userchecksallergen-menu-list" className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No dishes found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your filters or search term
                  </p>
                </div>
              ) : (
                filteredItems.map(item => (
                  <div
                    key={item.id}
                    data-testid="userchecksallergen-menu-item"
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <span className="text-xl font-bold text-red-600">
                        £{item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>

                    {/* Allergen Badges */}
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">
                        CONTAINS ALLERGENS:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.allergens.map(allergen => (
                          <span
                            key={allergen}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              selectedAllergens.includes(allergen)
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {selectedAllergens.includes(allergen) && (
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            )}
                            {allergen}
                          </span>
                        ))}
                      </div>
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
