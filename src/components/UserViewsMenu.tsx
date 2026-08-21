/**
 * UserViewsMenu — Displays Chinese restaurant menu items for browsing
 *
 * Features: menu categories, item details, pricing, dietary tags, image display
 *
 * Ticket: SCRUM-1058 | Branch: proto/SCRUM-1056
 */

import React, { useState } from 'react'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  spicyLevel?: number
  dietary?: string[]
  popular?: boolean
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Kung Pao Chicken',
    description: 'Spicy stir-fried chicken with peanuts, vegetables, and chili peppers',
    price: 14.99,
    category: 'Main Dishes',
    imageUrl: 'https://via.placeholder.com/150?text=Kung+Pao',
    spicyLevel: 3,
    dietary: ['Gluten-Free Available'],
    popular: true
  },
  {
    id: 2,
    name: 'Sweet and Sour Pork',
    description: 'Crispy pork with bell peppers, pineapple, and sweet and sour sauce',
    price: 13.99,
    category: 'Main Dishes',
    imageUrl: 'https://via.placeholder.com/150?text=Sweet+Sour',
    dietary: [],
    popular: false
  },
  {
    id: 3,
    name: 'Vegetable Spring Rolls',
    description: 'Crispy rolls filled with fresh vegetables and glass noodles (4 pieces)',
    price: 6.99,
    category: 'Appetizers',
    imageUrl: 'https://via.placeholder.com/150?text=Spring+Rolls',
    dietary: ['Vegetarian', 'Vegan Available'],
    popular: true
  },
  {
    id: 4,
    name: 'Beef Chow Mein',
    description: 'Stir-fried noodles with tender beef and mixed vegetables',
    price: 12.99,
    category: 'Noodles',
    imageUrl: 'https://via.placeholder.com/150?text=Chow+Mein',
    dietary: [],
    popular: false
  },
  {
    id: 5,
    name: 'Mapo Tofu',
    description: 'Silky tofu in spicy Sichuan sauce with ground pork and green onions',
    price: 11.99,
    category: 'Main Dishes',
    imageUrl: 'https://via.placeholder.com/150?text=Mapo+Tofu',
    spicyLevel: 4,
    dietary: ['Vegetarian Available'],
    popular: true
  },
  {
    id: 6,
    name: 'Hot and Sour Soup',
    description: 'Traditional soup with mushrooms, bamboo shoots, tofu, and egg',
    price: 5.99,
    category: 'Soups',
    imageUrl: 'https://via.placeholder.com/150?text=Hot+Sour',
    spicyLevel: 2,
    dietary: ['Gluten-Free'],
    popular: false
  },
  {
    id: 7,
    name: 'Yangzhou Fried Rice',
    description: 'Classic fried rice with shrimp, char siu pork, eggs, and vegetables',
    price: 10.99,
    category: 'Rice',
    imageUrl: 'https://via.placeholder.com/150?text=Fried+Rice',
    dietary: [],
    popular: true
  },
  {
    id: 8,
    name: 'General Tso\'s Chicken',
    description: 'Crispy chicken in a sweet and tangy sauce with broccoli',
    price: 14.99,
    category: 'Main Dishes',
    imageUrl: 'https://via.placeholder.com/150?text=General+Tso',
    spicyLevel: 2,
    dietary: [],
    popular: true
  }
]

export default function UserViewsMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const categories = ['All', ...Array.from(new Set(MOCK_MENU_ITEMS.map(item => item.category)))]

  const filteredItems = MOCK_MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const renderSpicyLevel = (level?: number) => {
    if (!level) return null
    return (
      <span className="flex items-center gap-1 text-red-500 text-sm">
        {'🌶️'.repeat(level)}
      </span>
    )
  }

  return (
    <div data-testid="userviewsmenu" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Golden Dragon Restaurant
          </h1>
          <p className="text-gray-600">Authentic Chinese Cuisine</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Menu
              </label>
              <input
                id="search"
                type="text"
                data-testid="userviewsmenu-search"
                placeholder="Search for dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                data-testid="userviewsmenu-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div data-testid="userviewsmenu-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div
                key={item.id}
                data-testid="userviewsmenu-item"
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Item Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.popular && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Popular
                    </span>
                  )}
                </div>

                {/* Item Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    {renderSpicyLevel(item.spicyLevel)}
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Dietary Tags */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.dietary.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price and Category */}
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.category}
                    </span>
                  </div>

                  {/* Add to Order Button */}
                  <button
                    data-testid="userviewsmenu-add-to-order"
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No menu items found. Try adjusting your search or filter.
              </p>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredItems.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{MOCK_MENU_ITEMS.length}</span> menu items
          </p>
        </div>
      </div>
    </div>
  )
}
