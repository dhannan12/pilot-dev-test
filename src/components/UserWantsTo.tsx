/**
 * UserWantsTo — Menu item filtering component for Chinese restaurant takeaway
 *
 * Features: category filter, search by name, spicy level filter, price range filter, dietary restrictions
 *
 * Ticket: SCRUM-1059 | Branch: proto/SCRUM-1056
 */

import { useState } from 'react'

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  description: string
  spicyLevel: number
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Kung Pao Chicken',
    category: 'Main',
    price: 12.99,
    description: 'Spicy stir-fried chicken with peanuts and vegetables',
    spicyLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: '2',
    name: 'Vegetable Spring Rolls',
    category: 'Appetizer',
    price: 5.99,
    description: 'Crispy rolls filled with fresh vegetables',
    spicyLevel: 0,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
  },
  {
    id: '3',
    name: 'Mapo Tofu',
    category: 'Main',
    price: 10.99,
    description: 'Spicy tofu in chili bean sauce',
    spicyLevel: 3,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
  },
  {
    id: '4',
    name: 'Sweet and Sour Pork',
    category: 'Main',
    price: 13.99,
    description: 'Crispy pork with sweet and sour sauce',
    spicyLevel: 0,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: '5',
    name: 'Hot and Sour Soup',
    category: 'Soup',
    price: 4.99,
    description: 'Traditional spicy and tangy soup',
    spicyLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: '6',
    name: 'Fried Rice',
    category: 'Rice',
    price: 7.99,
    description: 'Classic fried rice with egg and vegetables',
    spicyLevel: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: '7',
    name: 'Szechuan Beef',
    category: 'Main',
    price: 14.99,
    description: 'Tender beef in spicy Szechuan sauce',
    spicyLevel: 3,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: '8',
    name: 'Wonton Soup',
    category: 'Soup',
    price: 5.99,
    description: 'Delicate wontons in clear broth',
    spicyLevel: 0,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: '9',
    name: 'Buddha\'s Delight',
    category: 'Main',
    price: 11.99,
    description: 'Mixed vegetables in light sauce',
    spicyLevel: 0,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
  },
  {
    id: '10',
    name: 'General Tso\'s Chicken',
    category: 'Main',
    price: 13.99,
    description: 'Crispy chicken in sweet and spicy sauce',
    spicyLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  },
]

export default function UserWantsTo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [maxSpicyLevel, setMaxSpicyLevel] = useState(3)
  const [maxPrice, setMaxPrice] = useState(20)
  const [showVegetarian, setShowVegetarian] = useState(false)
  const [showVegan, setShowVegan] = useState(false)
  const [showGlutenFree, setShowGlutenFree] = useState(false)

  const categories = ['All', ...Array.from(new Set(MOCK_MENU_ITEMS.map(item => item.category)))]

  const filteredItems = MOCK_MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSpicy = item.spicyLevel <= maxSpicyLevel
    const matchesPrice = item.price <= maxPrice
    const matchesVegetarian = !showVegetarian || item.isVegetarian
    const matchesVegan = !showVegan || item.isVegan
    const matchesGlutenFree = !showGlutenFree || item.isGlutenFree

    return matchesSearch && matchesCategory && matchesSpicy && matchesPrice &&
           matchesVegetarian && matchesVegan && matchesGlutenFree
  })

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setMaxSpicyLevel(3)
    setMaxPrice(20)
    setShowVegetarian(false)
    setShowVegan(false)
    setShowGlutenFree(false)
  }

  const getSpicyIndicator = (level: number) => {
    return '🌶️'.repeat(level) || 'Mild'
  }

  return (
    <div data-testid="userwantsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Filter Menu Items</h1>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="col-span-full">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search by name or description
              </label>
              <input
                id="search"
                type="text"
                data-testid="userwantsto-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., chicken, tofu, soup..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                data-testid="userwantsto-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Spicy Level */}
            <div>
              <label htmlFor="spicy" className="block text-sm font-medium text-gray-700 mb-2">
                Max Spicy Level: {maxSpicyLevel === 0 ? 'Mild' : getSpicyIndicator(maxSpicyLevel)}
              </label>
              <input
                id="spicy"
                type="range"
                data-testid="userwantsto-spicy"
                min="0"
                max="3"
                value={maxSpicyLevel}
                onChange={(e) => setMaxSpicyLevel(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Mild</span>
                <span>Medium</span>
                <span>Hot</span>
                <span>Extra Hot</span>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: ${maxPrice}
              </label>
              <input
                id="price"
                type="range"
                data-testid="userwantsto-price"
                min="0"
                max="20"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$10</span>
                <span>$20</span>
              </div>
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Dietary Restrictions</h3>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  data-testid="userwantsto-vegetarian"
                  checked={showVegetarian}
                  onChange={(e) => setShowVegetarian(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Vegetarian Only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  data-testid="userwantsto-vegan"
                  checked={showVegan}
                  onChange={(e) => setShowVegan(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Vegan Only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  data-testid="userwantsto-glutenfree"
                  checked={showGlutenFree}
                  onChange={(e) => setShowGlutenFree(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Gluten-Free Only</span>
              </label>
            </div>
          </div>

          {/* Reset Button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              data-testid="userwantsto-reset"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-gray-700">
            Showing <span className="font-semibold">{filteredItems.length}</span> of{' '}
            <span className="font-semibold">{MOCK_MENU_ITEMS.length}</span> items
          </p>
        </div>

        {/* Menu Items List */}
        <div data-testid="userwantsto-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">No items match your filters</p>
              <button
                data-testid="userwantsto-clear"
                onClick={handleResetFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                data-testid="userwantsto-item"
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                  <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                    {getSpicyIndicator(item.spicyLevel)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.isVegetarian && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Vegetarian
                    </span>
                  )}
                  {item.isVegan && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Vegan
                    </span>
                  )}
                  {item.isGlutenFree && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Gluten-Free
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
