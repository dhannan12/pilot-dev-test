/**
 * UserAccessesThe — Takeaway menu page for Chinese restaurant
 *
 * Features: menu categories, dish listings, prices, descriptions, dietary tags
 *
 * Ticket: SCRUM-1057 | Branch: proto/SCRUM-1056
 */

import React, { useState } from 'react'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  spicy: boolean
  vegetarian: boolean
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Sweet and Sour Chicken',
    description: 'Crispy chicken pieces in tangy sweet and sour sauce with peppers and pineapple',
    price: 12.99,
    category: 'Chicken',
    spicy: false,
    vegetarian: false
  },
  {
    id: 2,
    name: 'Kung Pao Chicken',
    description: 'Stir-fried chicken with peanuts, vegetables, and chili peppers in spicy sauce',
    price: 13.99,
    category: 'Chicken',
    spicy: true,
    vegetarian: false
  },
  {
    id: 3,
    name: 'Beef in Black Bean Sauce',
    description: 'Tender beef slices with peppers and onions in savory black bean sauce',
    price: 14.99,
    category: 'Beef',
    spicy: false,
    vegetarian: false
  },
  {
    id: 4,
    name: 'Szechuan Beef',
    description: 'Spicy stir-fried beef with vegetables in traditional Szechuan sauce',
    price: 15.99,
    category: 'Beef',
    spicy: true,
    vegetarian: false
  },
  {
    id: 5,
    name: 'Vegetable Spring Rolls',
    description: 'Crispy rolls filled with fresh vegetables, served with sweet chili sauce',
    price: 6.99,
    category: 'Appetizers',
    spicy: false,
    vegetarian: true
  },
  {
    id: 6,
    name: 'Prawn Crackers',
    description: 'Traditional crispy prawn crackers, perfect for sharing',
    price: 3.99,
    category: 'Appetizers',
    spicy: false,
    vegetarian: false
  },
  {
    id: 7,
    name: 'Ma Po Tofu',
    description: 'Soft tofu in spicy sauce with minced pork and Szechuan peppercorns',
    price: 11.99,
    category: 'Tofu',
    spicy: true,
    vegetarian: false
  },
  {
    id: 8,
    name: 'Vegetable Chow Mein',
    description: 'Stir-fried noodles with mixed vegetables in light soy sauce',
    price: 10.99,
    category: 'Noodles',
    spicy: false,
    vegetarian: true
  },
  {
    id: 9,
    name: 'Singapore Rice Noodles',
    description: 'Thin rice noodles with curry powder, shrimp, char siu pork, and vegetables',
    price: 13.99,
    category: 'Noodles',
    spicy: true,
    vegetarian: false
  },
  {
    id: 10,
    name: 'Egg Fried Rice',
    description: 'Classic fried rice with eggs, peas, and spring onions',
    price: 8.99,
    category: 'Rice',
    spicy: false,
    vegetarian: true
  }
]

export default function UserAccessesThe() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [showVegetarianOnly, setShowVegetarianOnly] = useState<boolean>(false)

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))]

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory
    const vegetarianMatch = !showVegetarianOnly || item.vegetarian
    return categoryMatch && vegetarianMatch
  })

  return (
    <div data-testid="useraccessesthe" className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-center">Golden Dragon Takeaway</h1>
          <p className="text-center text-red-100 mt-2">Authentic Chinese Cuisine</p>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category-select"
                data-testid="useraccessesthe-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="vegetarian-filter"
                data-testid="useraccessesthe-vegetarian"
                checked={showVegetarianOnly}
                onChange={(e) => setShowVegetarianOnly(e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="vegetarian-filter" className="ml-2 text-sm font-medium text-gray-700">
                Vegetarian Only
              </label>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div data-testid="useraccessesthe-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              data-testid="useraccessesthe-item"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-lg font-bold text-red-600">£{item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.category}
                  </span>
                  {item.spicy && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      🌶️ Spicy
                    </span>
                  )}
                  {item.vegetarian && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      🥬 Vegetarian
                    </span>
                  )}
                </div>
              </div>
              <div className="px-6 pb-4">
                <button
                  data-testid="useraccessesthe-add"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No items found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">Golden Dragon Takeaway • Open Daily 11:00 - 22:00</p>
          <p className="text-xs text-gray-400 mt-2">Call us: 020 1234 5678</p>
        </div>
      </footer>
    </div>
  )
}
