/**
 * UserSelects — Filter and display clothing catalog with category selection
 *
 * Features: category filtering (work, casual, formal, sport), catalog display, filter state management, responsive grid layout, mock clothing data
 *
 * Ticket: SCRUM-1246 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface ClothingItem {
  id: number
  name: string
  category: string
  price: number
  description: string
}

const mockCatalog: ClothingItem[] = [
  {
    id: 1,
    name: 'Classic Blazer',
    category: 'work',
    price: 129.99,
    description: 'Professional navy blazer perfect for office wear'
  },
  {
    id: 2,
    name: 'Tailored Trousers',
    category: 'work',
    price: 79.99,
    description: 'Slim-fit dress pants for business meetings'
  },
  {
    id: 3,
    name: 'Oxford Dress Shirt',
    category: 'work',
    price: 49.99,
    description: 'Crisp white shirt for formal occasions'
  },
  {
    id: 4,
    name: 'Pencil Skirt',
    category: 'work',
    price: 59.99,
    description: 'Elegant black pencil skirt for professional settings'
  },
  {
    id: 5,
    name: 'Leather Work Bag',
    category: 'work',
    price: 149.99,
    description: 'Sophisticated briefcase for daily commute'
  },
  {
    id: 6,
    name: 'Casual T-Shirt',
    category: 'casual',
    price: 24.99,
    description: 'Comfortable cotton tee for everyday wear'
  },
  {
    id: 7,
    name: 'Denim Jeans',
    category: 'casual',
    price: 69.99,
    description: 'Classic blue jeans with modern fit'
  },
  {
    id: 8,
    name: 'Evening Gown',
    category: 'formal',
    price: 299.99,
    description: 'Elegant floor-length dress for special events'
  },
  {
    id: 9,
    name: 'Running Shorts',
    category: 'sport',
    price: 34.99,
    description: 'Breathable athletic shorts for workouts'
  },
  {
    id: 10,
    name: 'Sports Jacket',
    category: 'sport',
    price: 89.99,
    description: 'Windproof jacket for outdoor activities'
  }
]

export default function UserSelects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'work', 'casual', 'formal', 'sport']

  const filteredItems = selectedCategory === 'all'
    ? mockCatalog
    : mockCatalog.filter(item => item.category === selectedCategory)

  return (
    <section data-testid="userselects" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Clothing Catalog</h1>
        
        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              data-testid={`userselects-${category}`}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` in "${selectedCategory}" category`}
        </div>

        {/* Catalog Grid */}
        <ul data-testid="userselects-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <li
              key={item.id}
              data-testid="userselects-item"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full capitalize">
                  {item.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-2xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No items found in this category.
          </div>
        )}
      </div>
    </section>
  )
}
